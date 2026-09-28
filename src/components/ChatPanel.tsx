"use client";

import {useState} from "react";

type ChatPanelProps = {
    shopId: string;
    shopName: string;
};

type ChatMessage = {
    id: string;
    role: "user" | "assistant";
    text: string;
};

export default function ChatPanel({shopId, shopName}: ChatPanelProps) {
    const [draft, setDraft] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function sendMessage() {
        const text = draft.trim();

        if (isSending || text.length === 0) {
            return;
        }

        setIsSending(true);
        setError(null);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ shopId, message: text }),
            });

            if (!response.ok) {
                throw new Error("Chat request failed.");
            }

            const reply: unknown = await response.json();

            if (
                typeof reply !== "object" ||
                reply === null ||
                !("text" in reply) ||
                typeof reply.text !== "string" ||
                !("mode" in reply) ||
                reply.mode !== "mock"
            ) {
                throw new Error("Unexpected reply format.");
            }

            const userMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: "user",
                text,
            };

            const assistantMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: "assistant",
                text: reply.text,
            };

            setMessages((previous) => [
                ...previous,
                userMessage,
                assistantMessage,
            ]);
            setDraft("");
        } catch {
            setError("Could not get a demo reply. Please try Send again.");
        } finally {
            setIsSending(false);
        }
    }

    return (
        <section
            aria-label={`Chat with ${shopName}`}
            className="mt-4 rounded-xl border border-slate-700 bg-slate-900 p-4"
        >
            <h3 className="text-lg font-semibold">
                {shopName} assistant
            </h3>

            <p className="mt-1 text-sm text-slate-400">
                Automated assistant demo. Replies use fixed wording, not live AI.
            </p>

            <div
                role="log"
                aria-label={`Messages with ${shopName}`}
                className="mt-4 max-h-80 min-h-32 overflow-y-auto rounded-lg bg-slate-800 p-4"
            >
                {messages.length === 0 ? (
                    <p className="text-sm text-slate-400">
                        Your messages will appear here.
                    </p>
                ) : (
                    <ul className="space-y-3">
                        {messages.map((message) => (
                            <li
                                key={message.id}
                                className="rounded-lg bg-slate-700 p-3"
                            >
                                <p className="text-xs font-semibold text-teal-400">
                                    {message.role === "user" ? "You" : "Assistant · Demo"}
                                </p>
                                <p className="mt-1 whitespace-pre-wrap break-words text-white">
                                    {message.text}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    sendMessage();
                }}
            >
                <label className="mt-4 block">
                    <span className="text-sm text-slate-300">Your message</span>

                    <input
                        type="text"
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        placeholder="Type a message..."
                        maxLength={1000}
                        disabled={isSending}
                        className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-white"
                    />
                </label>

                <button
                    type="submit"
                    disabled={isSending || draft.trim().length === 0}
                    className="mt-3 rounded-lg bg-teal-400 px-4 py-2 font-medium text-slate-950 hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSending ? "Sending..." : "Send"}
                </button>
            </form>
            {isSending && (
                <p role="status" className="mt-3 text-sm text-slate-400">
                    Waiting for a demo reply...
                </p>
            )}

            {error && (
                <p role="alert" className="mt-3 text-sm text-red-400">
                    {error}
                </p>
            )}
        </section>
    );
}