"use client";

import {useState} from "react";
import type { Shop } from "@/types/shop";
import ChatPanel from "@/components/ChatPanel";

type ShopCardProps = Pick<Shop, "id"| "name" | "city" | "description">;

export default function ShopCard({
                                     id,
                                     name,
                                     city,
                                     description,
                                 }: ShopCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <section className="mt-10 rounded-2xl border border-slate-700 p-6">
            <p className="text-xs uppercase tracking-wide text-teal-400">
                Fictional demo shop
            </p>

            <h2 className="mt-3 text-2xl font-semibold">{name}</h2>

            <p className="mt-2 text-sm text-slate-400">{city}</p>

            <p className="mt-4 text-slate-300">{description}</p>

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                className="mt-6 rounded-lg bg-teal-400 px-4 py-2 font-medium text-slate-950 hover:bg-teal-300"
            >
                {isOpen ? "Close assistant" : "Ask assistant"}
            </button>

            {isOpen && <ChatPanel shopId={id} shopName={name} />}
        </section>
    );
}