import type { ChatReply } from "@/types/chat";
import type { Shop } from "@/types/shop";

export function createMockReply(shop: Shop): ChatReply {
    return {
        text:
            `Demo reply: I'm the automated assistant for ${shop.name} ` +
            `in ${shop.city}. ${shop.description} ` +
            `Question answering is not connected yet.`,
        mode: "mock",
    };
}