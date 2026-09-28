import type { ShopFaq } from "@/types/faq";

function normalizeQuestion(text: string): string {
    return text.trim().toLowerCase().replace(/\s+/g, " ");
}

export function matchFaq(
    message: string,
    faqs: ShopFaq[],
): ShopFaq | null {
    const question = normalizeQuestion(message);

    return (
        faqs.find(
            (faq) => normalizeQuestion(faq.question) === question,
        ) ?? null
    );
}