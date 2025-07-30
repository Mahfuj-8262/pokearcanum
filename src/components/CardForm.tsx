"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FaUpload, FaCheckCircle } from "react-icons/fa";

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
  description?: string;
  imageFile?: File | null;
};

const typeOptions = [
  "Fire", "Water", "Electric", "Grass", "Psychic",
  "Fighting", "Dark", "Steel", "Fairy", "Dragon"
];
const rarityOptions = [
  "Common", "Uncommon", "Rare", "Ultra Rare", "Secret Rare"
];

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

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
    description: initialData.description || "",
    imageFile: null,
  });

  const [imageError, setImageError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: name === "hp" ? Number(value) : value,
    }));
  }

  function handleHpChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Only allow number on input (without spinner)
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setForm(f => ({
      ...f,
      hp: rawValue === "" ? 0 : Number(rawValue),
    }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImageError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setForm(f => ({ ...f, imageFile: null }));
      setPreviewUrl(null);
      return;
    }
    if (!file.type.match(/^image\/(jpeg|png|jpg)$/i)) {
      setImageError("Only JPG/PNG images are allowed.");
      setForm(f => ({ ...f, imageFile: null }));
      setPreviewUrl(null);
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("Image is too large (max 2MB).");
      setForm(f => ({ ...f, imageFile: null }));
      setPreviewUrl(null);
      return;
    }
    setForm(f => ({ ...f, imageFile: file }));
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    if (!form.name || !form.type || !form.rarity || !form.hp) {
      setSubmitting(false);
      alert("Fill all required fields!");
      return;
    }
    if (!form.imageFile) {
      setSubmitting(false);
      setImageError("Image is required.");
      return;
    }

    if (onSubmit) onSubmit(form);

    setTimeout(() => {
      setSubmitting(false);
      alert(`(Demo) Card "${form.name}" added!`);
    }, 1200);
  }

  function clearImage() {
    setForm(f => ({ ...f, imageFile: null }));
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setImageError(null);
  }

  return (
    <form
      className="bg-white/95 p-8 rounded-lg shadow-xl w-full max-w-lg border border-yellow-200 flex flex-col gap-5"
      onSubmit={handleFormSubmit}
      encType="multipart/form-data"
    >
      <h2 className="font-extrabold text-2xl mb-2 text-yellow-700">Add New Card</h2>
      
      <div>
        <label htmlFor="card-name" className="block font-semibold mb-1 text-yellow-700">Card Name <span className="text-red-500">*</span></label>
        <input
          id="card-name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Charizard"
          className="rounded px-4 py-2 border border-yellow-200 focus:border-yellow-500 text-lg w-full"
          disabled={submitting}
        />
      </div>

      <div>
        <label htmlFor="card-type" className="block font-semibold mb-1 text-yellow-700">Type <span className="text-red-500">*</span></label>
        <select
          id="card-type"
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className="rounded px-4 py-2 border border-yellow-200 focus:border-yellow-500 text-lg w-full"
          disabled={submitting}
        >
          <option value="">Select Type</option>
          {typeOptions.map(option => (
            <option value={option} key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="card-rarity" className="block font-semibold mb-1 text-yellow-700">Rarity <span className="text-red-500">*</span></label>
        <select
          id="card-rarity"
          name="rarity"
          value={form.rarity}
          onChange={handleChange}
          required
          className="rounded px-4 py-2 border border-yellow-200 focus:border-yellow-500 text-lg w-full"
          disabled={submitting}
        >
          <option value="">Select Rarity</option>
          {rarityOptions.map(option => (
            <option value={option} key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="card-hp" className="block font-semibold mb-1 text-yellow-700">HP (Hit Points) <span className="text-red-500">*</span></label>
        <input
          id="card-hp"
          name="hp"
          inputMode="numeric"
          pattern="[0-9]*"
          value={form.hp === 0 ? "" : form.hp}
          onChange={handleHpChange}
          required
          type="text"
          placeholder="e.g. 120"
          className="rounded px-4 py-2 border border-yellow-200 focus:border-yellow-500 text-lg w-full appearance-none"
          disabled={submitting}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="card-description" className="block font-semibold mb-1 text-yellow-700">Description/Notes</label>
        <textarea
          id="card-description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description/Notes (optional)"
          rows={3}
          className="rounded px-4 py-2 border border-yellow-200 focus:border-yellow-500 text-lg resize-y w-full"
          disabled={submitting}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 text-yellow-700">
          Card Image <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-3">
          <label
            htmlFor="card-image"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 text-white font-bold cursor-pointer shadow hover:bg-yellow-500 transition border-2 border-yellow-500"
          >
            <FaUpload />
            {form.imageFile ? "Change Image" : "Upload Image"}
          </label>
          <input
            ref={fileInputRef}
            id="card-image"
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            style={{ display: "none" }}
            onChange={handleImageChange}
            disabled={submitting}
          />
          {form.imageFile &&
            <button
              type="button"
              className="ml-2 px-2 py-1 text-xs bg-gray-200 border border-gray-400 rounded hover:bg-red-100 text-red-600"
              onClick={clearImage}
              disabled={submitting}
            >
              Remove
            </button>
          }
        </div>
        {previewUrl && (
          <div className="flex items-center gap-2 mt-2">
            <img
              src={previewUrl}
              alt="Card Preview"
              className="w-24 h-32 object-cover rounded border border-yellow-300 shadow"
            />
            <span className="flex items-center gap-1 text-green-600 font-semibold">
              <FaCheckCircle /> Ready
            </span>
          </div>
        )}
        {imageError &&
          <div className="text-red-600 text-sm mt-1">{imageError}</div>
        }
      </div>

      <Button type="submit" className="w-full text-lg" disabled={submitting}>
        {submitting ? "Adding..." : submitText}
      </Button>
    </form>
  );
}