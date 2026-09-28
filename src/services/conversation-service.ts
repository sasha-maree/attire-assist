import { createMockReply } from "@/ai/mock-ai";
import { mockShopAdapter } from "@/integrations/attire-rentz/mock-shop-adapter";
import type { ChatReply } from "@/types/chat";

export async function createChatReply(
    shopId: string,
): Promise<ChatReply | null> {
    const shop = await mockShopAdapter.getShopById(shopId);

    if (shop === null) {
        return null;
    }

    return createMockReply(shop);
}