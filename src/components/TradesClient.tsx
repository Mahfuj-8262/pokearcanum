"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getTrades } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

type Trade = {
  id: number;
  amount: number;
  time: string;
  buyer: { userName: string };
  seller: { userName: string };
  marketplace: {
    id: number;
    price: number;
    status: number;
    card: { 
      id: number;
      cardName: string;
      link: string;
      rarity: string;
      type: string;
      description: string;
      hp: number;
    };
  };
};

export default function TradesClient() {
  const { user } = useAuth();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const tradeSuccess = searchParams.get("success"); // ✅ will now work properly

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const data = await getTrades();
        setTrades(data || []);
      } catch (err) {
        console.error("Error fetching trades:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrades();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading trades...</div>;

  return (
    <div className="max-w-4xl mx-auto rounded-xl shadow-xl bg-white/95 border border-indigo-100 p-8">
      <h1 className="text-3xl font-bold mb-7 text-indigo-900">Transaction History</h1>

      {/* ✅ Success banner if redirected after buy */}
      {tradeSuccess && (
        <div className="mb-6 p-4 bg-emerald-100 border-l-4 border-emerald-600 rounded shadow">
          <p className="text-emerald-800 font-semibold">
            ✅ Purchase Successful! The card has been added to your collection.
          </p>
        </div>
      )}

      {trades.length === 0 ? (
        <div className="text-center text-gray-500 py-20 text-xl">No trades yet.</div>
      ) : (
        <div className="flex flex-col gap-6">
          {trades.map((trade) => {
            const card = trade.marketplace.card;
            const partner =
              trade.buyer?.userName === user?.userName
                ? trade.seller?.userName
                : trade.buyer?.userName;

            return (
              <div
                key={trade.id}
                className="flex flex-col sm:flex-row gap-7 sm:items-center bg-indigo-50 rounded-lg shadow-sm border border-indigo-100 px-4 py-3"
              >
                <img
                  src={card.link}
                  alt={card.cardName}
                  className="w-20 h-28 object-cover rounded border"
                />
                <div className="flex-1">
                  <div className="font-semibold text-lg">{card.cardName}</div>
                  <div className="text-sm text-gray-700">
                    Traded with <span className="font-bold">{partner}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(trade.time).toLocaleDateString()} · $
                    {trade.amount.toFixed(2)}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Link href={`/chat?with=${partner}`}>
                    <button className="px-4 py-1 bg-indigo-500 hover:bg-indigo-600 rounded text-white font-semibold shadow">
                      Chat
                    </button>
                  </Link>
                  <Link href={`/marketplace/${trade.marketplace.id}`}>
                    <button className="text-xs text-indigo-700 underline hover:text-indigo-900 mt-2">
                      View Card
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}