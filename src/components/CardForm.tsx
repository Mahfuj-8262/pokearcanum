"use client";

import { useState } from "react";
import { postMarketplace } from "@/lib/api";

export default function CardForm() {
  const [form, setForm] = useState({
    cardName: "",
    hp: 0,
    rarity: "",
    type: "",
    description: "",
    price: 0,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setImageFile(e.target.files[0]);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!imageFile) {
  //     setMsg("❌ Please select an image to upload.");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     setMsg(null);

  //     // 1️⃣ Upload file to backend → which puts into Azure Blob
  //     const fileData = new FormData();
  //     fileData.append("file", imageFile);

  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/Marketplace`,
  //       {
  //         method: "POST",
  //         body: fileData,
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
  //         },
  //       }
  //     );

  //     if (!res.ok) throw new Error("Image upload failed.");
  //     const { url } = await res.json(); // backend returns { url: blobUrl }

  //     // 2️⃣ Send card + marketplace data using `postMarketplace`
  //     await postMarketplace({
  //       ...form,
  //       link: url, // ✅ use Azure Blob URL
  //     });

  //     setMsg("✅ Card successfully added to your inventory and marketplace.");
  //     // Reset form
  //     setForm({
  //       cardName: "",
  //       hp: 0,
  //       rarity: "",
  //       type: "",
  //       description: "",
  //       price: 0,
  //       status: 1,
  //     });
  //     setImageFile(null);
  //   } catch (err: any) {
  //     console.error(err);
  //     setMsg(`❌ Failed: ${err.message}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setMsg("❌ Please select an image to upload.");
      return;
    }

    try {
      setLoading(true);
      setMsg(null);

      const formData = new FormData();
      formData.append("CardName", form.cardName);
      formData.append("Hp", form.hp.toString());
      formData.append("Rarity", form.rarity);
      formData.append("Type", form.type);
      formData.append("Description", form.description);
      formData.append("Price", form.price.toString());
      //formData.append("Status", form.status.toString());
      formData.append("imageFile", imageFile); // must match controller param name

      const res = await fetch(
        //`${}/Marketplace`,
        `https://pokearcanumbe-f7f9dnazeffebph9.southeastasia-01.azurewebsites.net/api/Marketplace`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
            // ❌ Do NOT set Content-Type, the browser will handle it for multipart
          },
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error(await res.text());
      }

      await res.json();

      setMsg("✅ Card successfully added to your inventory and marketplace.");
      setForm({
        cardName: "",
        hp: 0,
        rarity: "",
        type: "",
        description: "",
        price: 0,
        // status: 1,
      });
      setImageFile(null);
    } catch (err: any) {
      console.error(err);
      setMsg(`❌ Failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-4"
      encType="multipart/form-data"
    >
      {/* Card Name */}
      <input
        type="text"
        name="cardName"
        placeholder="Card Name"
        value={form.cardName}
        onChange={handleChange}
        required
        className="border px-3 py-2 rounded"
      />

      {/* HP */}
      <input
        type="number"
        name="hp"
        placeholder="HP"
        value={form.hp}
        onChange={handleChange}
        required
        className="border px-3 py-2 rounded"
      />

      {/* Rarity */}
      <select
        name="rarity"
        value={form.rarity}
        onChange={handleChange}
        required
        className="border px-3 py-2 rounded"
      >
        <option value="">Select Rarity</option>
        <option>Common</option>
        <option>Uncommon</option>
        <option>Rare</option>
        <option>Ultra Rare</option>
        <option>Secret Rare</option>
      </select>

      {/* Type */}
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        required
        className="border px-3 py-2 rounded"
      >
        <option value="">Select Type</option>
        <option>Fire</option>
        <option>Water</option>
        <option>Electric</option>
        <option>Grass</option>
        <option>Psychic</option>
        <option>Dark</option>
        <option>Steel</option>
        <option>Fairy</option>
        <option>Dragon</option>
      </select>

      {/* Description */}
      <textarea
        name="description"
        placeholder="Card description / notes"
        value={form.description}
        onChange={handleChange}
        rows={3}
        className="border px-3 py-2 rounded"
      />

      {/* Price */}
      <input
        type="number"
        name="price"
        placeholder="Listing Price"
        value={form.price}
        onChange={handleChange}
        required
        className="border px-3 py-2 rounded"
      />

      {/* File Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required
        className="border px-3 py-2 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-5 py-2 rounded transition"
      >
        {loading ? "Adding..." : "Add Card"}
      </button>

      {msg && (
        <p
          className={`text-sm text-center mt-2 ${
            msg.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {msg}
        </p>
      )}
    </form>
  );
}