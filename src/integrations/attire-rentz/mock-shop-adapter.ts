import { mockShops } from "@/data/mock-shops";
import type { ShopAdapter } from "./shop-adapter";

export const mockShopAdapter: ShopAdapter = {
    async listShops() {
        return mockShops.map((shop) => ({ ...shop }));
    },

    async getShopById(id) {
        const shop = mockShops.find((shop) => shop.id === id);

        return shop ? { ...shop } : null;
    },
};