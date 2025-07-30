"use client";

import CardForm from "@/components/CardForm";
import { FaPlus } from "react-icons/fa";

export default function AddCardPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-50 to-fuchsia-100 py-12 px-3">
      <div className="w-full max-w-xl bg-white/90 border-4 border-yellow-200 rounded-3xl shadow-2xl px-6 md:px-10 py-10 flex flex-col items-center">
        <div className="flex flex-col items-center mb-4">
          <div className="bg-yellow-400 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg mb-2">
            <FaPlus className="text-2xl" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-yellow-700 mb-1 uppercase tracking-wide drop-shadow">
            Add Card
          </h1>
          <p className="text-zinc-700 text-center mb-2">
            Fill in the details and upload an image to add a new card to your inventory.
          </p>
        </div>
        <CardForm />
      </div>
    </main>
  );
}