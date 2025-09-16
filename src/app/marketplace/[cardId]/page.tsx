"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CardDetails from "@/components/CardDetails";
import { getMarketplaceById, postTrade } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function CardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const cardId = Number(params.cardId);

  const [card, setCard] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [buying, setBuying] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        setLoading(true);
        const data = await getMarketplaceById(cardId);

        setCard({
          id: data.id,
          name: data.card.cardName,
          imageUrl: data.card.link,
          type: data.card.type,
          rarity: data.card.rarity,
          price: data.price,
          seller: data.user?.userName,
          hp: data.card.hp,
          description: data.card.description,
          attacks: [], // placeholder
        });
      } catch (err) {
        console.error("Error fetching card:", err);
        setError("Failed to load card details.");
      } finally {
        setLoading(false);
      }
    };

    if (cardId) fetchCard();
  }, [cardId]);

  async function handleBuyCard() {
    if (!isAuthenticated) {
      alert("Please sign in to buy cards.");
      router.push("/sign-in");
      return;
    }

    try {
      setBuying(true);
      await postTrade(card.id);
      alert(`You have successfully purchased ${card.name}!`);
      router.push("/trades?success=1");
    } catch (err) {
      console.error("Buy card error:", err);
      alert("Failed to complete purchase.");
    } finally {
      setBuying(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-yellow-300 font-bold text-xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 font-bold">
        {error}
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-400 italic">
        Card not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen py-16 flex flex-col items-center bg-gradient-to-br from-yellow-50 via-orange-50 to-fuchsia-100">
      <div className="w-full max-w-4xl bg-white/80 rounded-2xl shadow-xl border border-yellow-200 p-8">
        
        {/* ⚠ Demo Only Banner */}
        <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded shadow">
          <p className="text-yellow-700 font-semibold">
            ⚠ Note: This project is for <span className="underline">showcase/demo</span> only.
          </p>
          <p className="text-sm text-yellow-800">
            No payment system is implemented. Clicking <strong>“Buy Card”</strong> will instantly mark the card as yours.
          </p>
        </div>

        {/* Card details */}
        <CardDetails {...card} />

        {/* Action buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleBuyCard}
            disabled={buying}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white font-bold rounded-xl shadow hover:scale-105 active:scale-95 transition disabled:opacity-50"
          >
            {buying ? "Processing..." : `Buy for $${card.price}`}
          </button>
        </div>
      </div>
    </main>
  );
}