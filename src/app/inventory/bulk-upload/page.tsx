"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type BulkCard = {
  name: string;
  type: string;
  rarity: string;
  hp: string;
  imageFile?: File;
};

export default function BulkUploadPage() {
  const [cards, setCards] = useState<BulkCard[]>([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  // Parse uploaded CSV (name,type,rarity,hp)
  function handleCSVChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setCsvFile(file);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      const rows = text.trim().split("\n");
      const header = rows[0].split(",");
      const newCards: BulkCard[] = rows.slice(1).map(row => {
        const values = row.split(",");
        return {
          name: values[0],
          type: values[1],
          rarity: values[2],
          hp: values[3] || ""
        };
      });
      setCards(newCards);
    };
    reader.readAsText(file);
  }

  // Match image files to cards by order
  function handleImagesChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const imgFiles = Array.from(e.target.files);
    setCards(cards =>
      cards.map((card, idx) => ({
        ...card,
        imageFile: imgFiles[idx] || undefined,
      }))
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Here, you'd send `cards` with their `imageFile` to your backend
    alert(`(Demo) Prepared to upload ${cards.length} cards with images!`);
  }

  return (
    <main className="min-h-screen py-10 flex flex-col bg-gradient-to-br from-teal-50 to-indigo-100 items-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8 border border-indigo-100">
        <h1 className="text-2xl font-extrabold mb-2 text-center text-indigo-900">Bulk Upload Cards</h1>
        <p className="text-gray-700 text-center mb-6">
          Upload a CSV file (<span className="font-mono">name,type,rarity,hp</span>) and select matching images.<br />
          Images are matched by order to cards in the CSV (first file = first card, etc.).
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center">
          <div>
            <label className="block mb-1 font-semibold text-indigo-700">CSV File:</label>
            <input
              type="file"
              accept=".csv,.txt"
              required
              onChange={handleCSVChange}
              className="block"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-indigo-700">Card Images:</label>
            <input
              type="file"
              accept="image/*"
              multiple
              required
              onChange={handleImagesChange}
              disabled={cards.length === 0}
              className="block"
            />
          </div>
          <Button type="submit" className="w-48" disabled={cards.length === 0}>
            Upload Cards
          </Button>
        </form>
        {cards.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-3">Preview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards.map((card, idx) => (
                <div key={idx} className="p-4 bg-indigo-50 rounded shadow flex flex-col items-center">
                  <span className="font-semibold">{card.name}</span>
                  <span className="text-xs text-gray-600">{card.type} | {card.rarity} | HP: {card.hp}</span>
                  {card.imageFile && (
                    <img
                      src={URL.createObjectURL(card.imageFile)}
                      alt={card.name}
                      className="w-32 h-40 object-cover rounded mt-2 border"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}