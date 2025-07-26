import CardDetails from "@/components/CardDetails";

// Demo mock data for now (replace with real fetch later)
const mockCard = {
  name: "Charizard",
  imageUrl: "https://images.pokemontcg.io/base1/4.png",
  type: "Fire",
  rarity: "Ultra Rare",
  price: 12000,
  seller: "AshKetchum",
  hp: 120,
  attacks: [
    { name: "Fire Spin", damage: 100 },
    { name: "Flamethrower", damage: 60 }
  ],
  description: "An extremely rare and valuable card, in excellent condition.",
};

export default function CardDetailPage() {
  // You'd fetch the card by ID (from params) here and show loading/error in a real app
  return (
    <main className="min-h-screen py-16 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <CardDetails {...mockCard} />
      </div>
    </main>
  );
}