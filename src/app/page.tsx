import ShopCard from "@/components/ShopCard";

export default function Home() {
    const shops = [
        {
            id: "velvet-rentals",
            name: "Velvet Rentals",
            city: "Colombo",
            description: "Outfits for weddings, celebrations, and special occasions.",
        },
        {
            id: "classic-closet",
            name: "Classic Closet",
            city: "Kandy",
            description: "Suits and formalwear for your special occasions.",
        },
    ];
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