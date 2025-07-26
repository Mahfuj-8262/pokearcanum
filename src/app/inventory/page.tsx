"use client";

import Link from "next/link";
import CardPreview, { CardPreviewProps } from "@/components/CardPreview";

const myCards: CardPreviewProps[] = [
  {
    id: "1",
    name: "Charizard",
    imageUrl: "https://images.pokemontcg.io/base1/4.png",
    type: "Fire",
    rarity: "Ultra Rare",
    price: 0, // Not listed yet
  },
  {
    id: "2",
    name: "Pikachu",
    imageUrl: "https://images.pokemontcg.io/base1/58.png",
    type: "Electric",
    rarity: "Common",
    price: 0,
  },
  // ...more cards
];

export default function InventoryPage() {
  return (
    <main className="min-h-screen py-12 px-3 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <div className="flex flex-wrap items-center justify-between mb-8 gap-3">
          <h1 className="text-3xl font-bold text-indigo-900">My Inventory</h1>
          <div className="flex gap-2">
            <Link href="/inventory/add">
              <button className="bg-indigo-600 hover:bg-indigo-700 transition px-5 py-2 rounded text-white font-semibold shadow">Add Card</button>
            </Link>
            <Link href="/inventory/bulk-upload">
              <button className="bg-teal-500 hover:bg-teal-600 transition px-5 py-2 rounded text-white font-semibold shadow">Bulk Upload</button>
            </Link>
          </div>
        </div>
        {/* Cards Collection Grid */}
        <div className="grid gap-7 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {myCards.length === 0 ? (
            <div className="col-span-full my-16 text-center text-gray-500 text-xl">
              No cards yet. Click "Add Card" to start your collection!
            </div>
          ) : (
            myCards.map(card => (
              <div key={card.id} className="relative group">
                <CardPreview {...card} />
                {/* Inventory controls overlay (edit/delete) */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <Link href={`/inventory/edit/${card.id}`}>
                    <button title="Edit" className="bg-white border border-indigo-300 rounded p-1 hover:bg-indigo-100">
                      ✏️
                    </button>
                  </Link>
                  <button title="Delete" className="bg-white border border-red-400 rounded p-1 hover:bg-red-100 text-red-500">
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}