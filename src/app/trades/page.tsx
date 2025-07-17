"use client";

import Link from "next/link";

// Demo mock data
const trades = [
  {
    id: "t1",
    card: {
      name: "Charizard",
      imageUrl: "https://images.pokemontcg.io/base1/4.png",
    },
    partner: "Misty",
    type: "Purchased",
    status: "Completed",
    date: "2024-06-01",
    rated: false,
  },
  {
    id: "t2",
    card: {
      name: "Blastoise",
      imageUrl: "https://images.pokemontcg.io/base1/2.png",
    },
    partner: "Brock",
    type: "Trade",
    status: "In Progress",
    date: "2024-06-11",
    rated: false,
  },
  {
    id: "t3",
    card: {
      name: "Pikachu",
      imageUrl: "https://images.pokemontcg.io/base1/58.png",
    },
    partner: "Ash",
    type: "Sold",
    status: "Completed",
    date: "2024-05-17",
    rated: true,
  },
];

export default function TradesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12">
      <div className="max-w-4xl mx-auto rounded-xl shadow-xl bg-white/95 border border-indigo-100 p-8">
        <h1 className="text-3xl font-bold mb-7 text-indigo-900">Transaction History</h1>
        {trades.length === 0 ? (
          <div className="text-center text-gray-500 py-20 text-xl">No trades yet.</div>
        ) : (
          <div className="flex flex-col gap-6">
            {trades.map(trade => (
              <div
                key={trade.id}
                className="flex flex-col sm:flex-row gap-7 sm:items-center bg-indigo-50 rounded-lg shadow-sm border border-indigo-100 px-4 py-3"
              >
                <img
                  src={trade.card.imageUrl}
                  alt={trade.card.name}
                  className="w-20 h-28 object-cover rounded border"
                />
                <div className="flex-1">
                  <div className="font-semibold text-lg">{trade.card.name}</div>
                  <div className="text-sm text-gray-700">
                    {trade.type} with <span className="font-bold">{trade.partner}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {trade.status} &middot; {new Date(trade.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  {!trade.rated && trade.status === "Completed" && (
                    <Link href={`/trades/${trade.id}/rate`}>
                      <button className="px-4 py-1 bg-emerald-600 hover:bg-emerald-700 rounded text-white font-bold shadow">
                        Rate User
                      </button>
                    </Link>
                  )}
                  <Link href={`/chat?with=${trade.partner}`}>
                    <button className="px-4 py-1 bg-indigo-500 hover:bg-indigo-600 rounded text-white font-semibold shadow">
                      Chat
                    </button>
                  </Link>
                  <Link href={`/marketplace/${trade.card.name.toLowerCase()}`}>
                    <button className="text-xs text-indigo-700 underline hover:text-indigo-900 mt-2">View Card</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}