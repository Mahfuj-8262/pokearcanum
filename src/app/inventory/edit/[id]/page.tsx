"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMarketplaceById, updateMarketplace } from "@/lib/api";

export default function EditCardPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [form, setForm] = useState({
    price: 0,
    status: 1,
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const data = await getMarketplaceById(id);
        setForm({
          price: data.price,
          status: data.status,
          description: data.card?.description ?? "",
        });
      } catch {
        setMsg("Failed to load card details.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCard();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMarketplace(id, {
        price: Number(form.price),
        status: Number(form.status),
        description: form.description,
      });
      setMsg("Card updated successfully.");
      router.push("/inventory");
    } catch (err: any) {
      setMsg(`Failed: ${err.message}`);
    }
  };

  if (loading) return <p className="text-center p-10">Loading...</p>;

  return (
    <main className="min-h-screen flex flex-col items-center bg-yellow-50 py-12">
      <div className="w-full max-w-lg bg-white border shadow rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-yellow-700">Edit Card</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="font-semibold">Price</span>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded"
            />
          </label>
          <label className="flex flex-col">
            <span className="font-semibold">Description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="border px-3 py-2 rounded"
            />
          </label>
          <label className="flex flex-col">
            <span className="font-semibold">Status</span>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            >
              <option value={1}>Available</option>
              <option value={3}>Sold</option>
            </select>
          </label>
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-5 py-2 rounded transition"
          >
            Save Changes
          </button>
        </form>
        {msg && (
          <p
            className={`mt-4 text-center ${
              msg.startsWith("Card updated") ? "text-green-600" : "text-red-600"
            }`}
          >
            {msg}
          </p>
        )}
      </div>
    </main>
  );
}