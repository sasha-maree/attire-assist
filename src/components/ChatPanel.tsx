"use client";

import {useState} from "react";

type ChatPanelProps = {
    shopName: string;
};

type ChatMessage = {
    id: string;
    text: string;
};

export default function ChatPanel({shopName}: ChatPanelProps) {
    const [draft, setDraft] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    function sendMessage() {
        const text = draft.trim();

        if (text.length === 0) {
            return;
        }

        const message: ChatMessage = {
            id: crypto.randomUUID(),
            text,
        };

        setMessages((previous) => [...previous, message]);
        setDraft("");
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
                Automated assistant demo. Replies are not connected yet.
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
                                <p className="text-xs font-semibold text-teal-400">You</p>
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
                        className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-white"
                    />
                </label>

                <button
                    type="submit"
                    disabled={draft.trim().length === 0}
                    className="mt-3 rounded-lg bg-teal-400 px-4 py-2 font-medium text-slate-950 hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Send
                </button>
            </form>
        </section>
    );
}