"use client";

import Link from "next/link";

export default function DashboardPage() {
  // These would come from real backend/user data
  const cardsOwned = 42;
  const tradesInProgress = 3;
  const unreadNotifications = 2;
  const username = "AshKetchum";

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex flex-col items-center py-10">
      <div className="w-full max-w-3xl bg-white/95 border border-indigo-100 rounded-xl shadow-xl p-8 mb-10">
        <h1 className="text-3xl font-bold mb-2 text-indigo-900">Hi, {username}!</h1>
        <p className="text-lg mb-6 text-gray-700">Welcome to your dashboard — here’s your Pokémon trading activity at a glance:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-extrabold text-indigo-600">{cardsOwned}</span>
            <span className="font-medium text-sm text-gray-600">Cards Owned</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-extrabold text-emerald-600">{tradesInProgress}</span>
            <span className="font-medium text-sm text-gray-600">Trades in Progress</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-extrabold text-purple-600">{unreadNotifications}</span>
            <span className="font-medium text-sm text-gray-600">Notifications</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/inventory">
            <button className="bg-indigo-600 px-7 py-2 rounded text-white font-semibold shadow hover:bg-indigo-700 transition">My Inventory</button>
          </Link>
          <Link href="/trades">
            <button className="bg-emerald-600 px-7 py-2 rounded text-white font-semibold shadow hover:bg-emerald-700 transition">Trades</button>
          </Link>
          <Link href="/notifications">
            <button className="bg-purple-600 px-7 py-2 rounded text-white font-semibold shadow hover:bg-purple-700 transition">Notifications</button>
          </Link>
          <Link href="/inventory/add">
            <button className="bg-blue-500 px-7 py-2 rounded text-white font-semibold shadow hover:bg-blue-600 transition">Add Card</button>
          </Link>
        </div>
      </div>
    </main>
  );
}