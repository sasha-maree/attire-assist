import { expect, test } from "vitest";
import type { ShopFaq } from "@/types/faq";
import { matchFaq } from "./match-faq";

const faqs: ShopFaq[] = [
    {
        id: "test-fitting",
        shopId: "test-shop",
        question: "Do you offer fittings?",
        answer: "Fittings are available by appointment.",
    },
];

test("matches a question despite capitalization and extra spaces", () => {
    const result = matchFaq("  DO YOU   offer fittings?  ", faqs);

    expect(result).toEqual(faqs[0]);
});

test("returns null for an unknown question", () => {
    const result = matchFaq("Can I buy a wedding dress?", faqs);

    expect(result).toBeNull();
});

test("does not guess when the meaning is different", () => {
    const result = matchFaq("Do you offer free fittings?", faqs);

    expect(result).toBeNull();
});

test("returns null when there are no FAQs", () => {
    expect(matchFaq("Do you offer fittings?", [])).toBeNull();
});