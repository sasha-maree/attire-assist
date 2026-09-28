import type { ShopFaq } from "@/types/faq";

// Fictional information for the local demo only.
export const mockFaqs: ShopFaq[] = [
    {
        id: "velvet-fitting",
        shopId: "velvet-rentals",
        question: "Do you offer fittings?",
        answer: "We offer fittings by appointment. Contact our staff to arrange one.",
    },
    {
        id: "velvet-delivery",
        shopId: "velvet-rentals",
        question: "Do you offer delivery?",
        answer: "We currently offer in-store collection only.",
    },
    {
        id: "classic-fitting",
        shopId: "classic-closet",
        question: "Do you offer fittings?",
        answer: "We offer walk-in fittings during shop opening hours.",
    },
    {
        id: "classic-delivery",
        shopId: "classic-closet",
        question: "Do you offer delivery?",
        answer: "Delivery may be arranged. Contact our staff to confirm coverage and fees.",
    },
];