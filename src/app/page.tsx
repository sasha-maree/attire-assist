import ShopCard from "@/components/ShopCard";
import { mockShopAdapter } from "@/integrations/attire-rentz/mock-shop-adapter";
import { env } from "@/config/env";

export default async function Home() {
    const shops = await mockShopAdapter.listShops();

    return (
        <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
            <div className="mx-auto max-w-2xl">
                <p className="text-sm font-medium text-teal-400">
                    Your clothing rental assistant
                </p>

                <h1 className="mt-4 text-4xl font-bold">
                    Attire Assist
                </h1>

                <p className="mt-6 text-lg text-slate-300">
                    Find shop information, explore rental options, and connect
                    with staff.
                </p>

                <p className="mt-4 rounded-lg border border-slate-700 p-3 text-sm text-slate-300">
                    Configured AI mode: {env.aiMode}. Chat replies are not connected yet.
                </p>

                {shops.map((shop) => (
                    <ShopCard
                        key={shop.id}
                        name={shop.name}
                        city={shop.city}
                        description={shop.description}
                    />
                ))}
            </div>
        </main>
    );
}