import { mockFaqs } from "@/data/mock-faqs";
import type { FaqAdapter } from "./faq-adapter";

export const mockFaqAdapter: FaqAdapter = {
    async listFaqsByShopId(shopId) {
        return mockFaqs
            .filter((faq) => faq.shopId === shopId)
            .map((faq) => ({ ...faq }));
    },
};