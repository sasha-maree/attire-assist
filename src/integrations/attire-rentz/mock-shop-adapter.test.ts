import { expect, test } from "vitest";
import { mockShopAdapter } from "./mock-shop-adapter";

test("returns the shop matching the requested ID", async () => {
    const shop = await mockShopAdapter.getShopById("classic-closet");

    expect(shop).toEqual({
        id: "classic-closet",
        name: "Classic Closet",
        city: "Kandy",
        description: "Suits and formalwear for your special occasions.",
    });
});

test("returns null when the shop ID does not exist", async () => {
    const shop = await mockShopAdapter.getShopById("unknown-shop");

    expect(shop).toBeNull();
});

test("changing a returned shop does not change stored mock data", async () => {
    const shop = await mockShopAdapter.getShopById("velvet-rentals");

    if (shop === null) {
        throw new Error("Expected the fictional shop to exist");
    }

    shop.name = "Changed name";

    const fetchedAgain = await mockShopAdapter.getShopById("velvet-rentals");

    expect(fetchedAgain?.name).toBe("Velvet Rentals");
});