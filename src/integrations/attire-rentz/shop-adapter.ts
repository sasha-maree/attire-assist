import type { Shop } from "@/types/shop";

export interface ShopAdapter {
    listShops(): Promise<Shop[]>;
    getShopById(id: string): Promise<Shop | null>;
}