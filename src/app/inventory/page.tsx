"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CardPreview, { CardPreviewProps } from "@/components/CardPreview";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getMarketplace, deleteMarketplace } from "@/lib/api"; // ✅ fetch from backend

export default function InventoryPage() {
  const [cards, setCards] = useState<CardPreviewProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const marketplaces = await getMarketplace(); // ✅ gets only current user listings
        const mapped: CardPreviewProps[] = marketplaces.map((m: any) => ({
          id: String(m.id),
          name: m.card.cardName,
          imageUrl: m.card.link,
          type: m.card.type,
          rarity: m.card.rarity,
          price: m.price,
        }));
        setCards(mapped);
      } catch (err) {
        console.error("Error loading inventory:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this card?")) return;
    try {
      await deleteMarketplace(Number(id));
      setCards((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete card.");
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-fuchsia-100 flex flex-col items-center py-12 px-3">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between mb-10 gap-3">
            <h1 className="text-3xl font-extrabold text-yellow-700 drop-shadow tracking-tight uppercase">
              My Inventory
            </h1>
            <div className="flex gap-2">
              <Link href="/inventory/add">
                <button className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 hover:brightness-110 transition px-5 py-2 rounded-xl text-white font-bold shadow">
                  Add Card
                </button>
              </Link>
            </div>
          </div>

          {/* Cards Collection Grid */}
          {loading ? (
            <div className="col-span-full my-24 text-center text-gray-600 text-lg">
              Loading your cards...
            </div>
          ) : cards.length === 0 ? (
            <div className="col-span-full my-24 text-center text-gray-400 text-xl italic">
              No cards yet. Click "Add Card" to start your collection!
            </div>
          ) : (
            <div className="grid gap-7 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="relative group transition-all hover:scale-105 hover:z-10"
                >
                  <CardPreview {...card} />

                  {/* Hover overlay actions */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <Link href={`/inventory/edit/${card.id}`}>
                      <button
                        title="Edit"
                        className="bg-white border border-yellow-400 rounded-full p-1 shadow hover:bg-yellow-100"
                      >
                        ✏️
                      </button>
                    </Link>
                    <button
                      title="Delete"
                      onClick={() => handleDelete(card.id)}
                      className="bg-white border border-pink-400 rounded-full p-1 shadow hover:bg-pink-100 text-pink-500"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}