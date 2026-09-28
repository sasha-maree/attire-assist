import { expect, test } from "vitest";
import { mockFaqAdapter } from "./mock-faq-adapter";

test("returns only the requested shop's FAQs", async () => {
    const faqs = await mockFaqAdapter.listFaqsByShopId("velvet-rentals");

    expect(faqs.map((faq) => faq.id)).toEqual([
        "velvet-fitting",
        "velvet-delivery",
    ]);

    expect(faqs.every((faq) => faq.shopId === "velvet-rentals")).toBe(true);
});

test("returns an empty list for an unknown shop", async () => {
    const faqs = await mockFaqAdapter.listFaqsByShopId("unknown-shop");

    expect(faqs).toEqual([]);
});