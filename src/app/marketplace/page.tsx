import CardPreview, { CardPreviewProps } from "@/components/CardPreview";

const mockCards: CardPreviewProps[] = [
  {
    id: "1",
    name: "Charizard",
    imageUrl: "https://images.pokemontcg.io/base1/4.png",
    type: "Fire",
    rarity: "Ultra Rare",
    price: 12000,
  },
  {
    id: "2",
    name: "Pikachu",
    imageUrl: "https://images.pokemontcg.io/base1/58.png",
    type: "Electric",
    rarity: "Common",
    price: 250,
  },
  {
    id: "3",
    name: "Blastoise",
    imageUrl: "https://images.pokemontcg.io/base1/2.png",
    type: "Water",
    rarity: "Rare",
    price: 8700,
  },
  // ...more cards!
];

export default function MarketplacePage() {
  // For search/filter features, use useState and filter the list (to be added later!)
  return (
    <main className="min-h-screen  py-12 px-3 flex flex-col items-center">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-extrabold mb-4 text-center text-blue-900">Marketplace</h1>
        <p className="text-lg text-center text-gray-600 mb-8">Explore cards for trade, auction, or instant purchase.</p>
        {/* --- Filter/Search UI can be added here --- */}

        <div className="grid gap-7 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {mockCards.map(card => (
            <CardPreview key={card.id} {...card} />
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-10 mb-3 text-center">
          (Feature demo: Cards shown are mock data. Connect to backend later!)
        </p>
      </div>
    </main>
  );
}