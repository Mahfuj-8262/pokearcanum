"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type CardFormProps = {
  onSubmit?: (data: any) => void;
  initialData?: Partial<CardInput>;
  submitText?: string;
};

type CardInput = {
  name: string;
  type: string;
  rarity: string;
  hp: number;
  imageUrl: string;
  description?: string;
};

const typeOptions = ["Fire", "Water", "Electric", "Grass", "Psychic", "Fighting", "Dark", "Steel", "Fairy", "Dragon"];
const rarityOptions = ["Common", "Uncommon", "Rare", "Ultra Rare", "Secret Rare"];

export default function CardForm({
  onSubmit,
  initialData = {},
  submitText = "Add Card"
}: CardFormProps) {
  const [form, setForm] = useState<CardInput>({
    name: initialData.name || "",
    type: initialData.type || "",
    rarity: initialData.rarity || "",
    hp: initialData.hp || 0,
    imageUrl: initialData.imageUrl || "",
    description: initialData.description || "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "hp" ? Number(value) : value });
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
    alert(`(Demo) Card "${form.name}" added!`);
    // Reset or redirect as needed in real app
  }

  return (
    <form
      className="bg-white/95 p-8 rounded-lg shadow-xl w-full max-w-lg border border-indigo-100 flex flex-col gap-5"
      onSubmit={handleFormSubmit}
    >
      <h2 className="font-extrabold text-2xl mb-2 text-indigo-700">Add New Card</h2>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        placeholder="Card Name"
        className="rounded px-4 py-2 border border-indigo-200 focus:border-indigo-500 text-lg"
      />
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        required
        className="rounded px-4 py-2 border border-indigo-200 focus:border-indigo-500 text-lg"
      >
        <option value="">Type</option>
        {typeOptions.map(option => (
          <option value={option} key={option}>{option}</option>
        ))}
      </select>
      <select
        name="rarity"
        value={form.rarity}
        onChange={handleChange}
        required
        className="rounded px-4 py-2 border border-indigo-200 focus:border-indigo-500 text-lg"
      >
        <option value="">Rarity</option>
        {rarityOptions.map(option => (
          <option value={option} key={option}>{option}</option>
        ))}
      </select>
      <input
        name="hp"
        value={form.hp}
        onChange={handleChange}
        required
        type="number"
        placeholder="HP (Hit Points)"
        min={0}
        className="rounded px-4 py-2 border border-indigo-200 focus:border-indigo-500 text-lg"
      />
      <input
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        required
        placeholder="Image URL"
        className="rounded px-4 py-2 border border-indigo-200 focus:border-indigo-500 text-lg"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description/Notes (optional)"
        rows={3}
        className="rounded px-4 py-2 border border-indigo-200 focus:border-indigo-500 text-lg resize-y"
      />
      <Button type="submit" className="w-full text-lg">{submitText}</Button>
    </form>
  );
}