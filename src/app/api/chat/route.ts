import { createChatReply } from "@/services/conversation-service";

export async function POST(request: Request) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return Response.json(
            { error: "Invalid JSON." },
            { status: 400 },
        );
    }

    if (
        typeof body !== "object" ||
        body === null ||
        !("shopId" in body) ||
        typeof body.shopId !== "string" ||
        body.shopId.trim().length === 0 ||
        !("message" in body) ||
        typeof body.message !== "string" ||
        body.message.trim().length === 0 ||
        body.message.length > 1000
    ) {
        return Response.json(
            { error: "Provide a shop ID and a message of 1–1000 characters." },
            { status: 400 },
        );
    }

    const reply = await createChatReply(body.shopId, body.message);

    if (reply === null) {
        return Response.json(
            { error: "Shop not found." },
            { status: 404 },
        );
    }

    return Response.json(reply);
}