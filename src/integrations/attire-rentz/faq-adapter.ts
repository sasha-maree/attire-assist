import type { ShopFaq } from "@/types/faq";

export interface FaqAdapter {
    listFaqsByShopId(shopId: string): Promise<ShopFaq[]>;
}