import { mockShopAdapter } from "@/integrations/attire-rentz/mock-shop-adapter";
import { mockFaqAdapter } from "@/integrations/attire-rentz/mock-faq-adapter";
import type { ChatReply } from "@/types/chat";
import { matchFaq } from "./match-faq";

export async function createChatReply(
    shopId: string,
    message: string,
): Promise<ChatReply | null> {
    const shop = await mockShopAdapter.getShopById(shopId);

    if (shop === null) {
        return null;
    }

    const faqs = await mockFaqAdapter.listFaqsByShopId(shop.id);
    const faq = matchFaq(message, faqs);

    if (faq !== null) {
        return {
            text: `Demo reply from ${shop.name}: ${faq.answer}`,
            mode: "mock",
        };
    }

    return {
        text:
            `Demo reply from ${shop.name}: I don't have an answer ` +
            `to that question in this shop's FAQs. Please contact the shop's staff. ` +
            `This demo has not sent them your message.`,
        mode: "mock",
    };
}