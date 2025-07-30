// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";

// type BulkCard = {
//   name: string;
//   type: string;
//   rarity: string;
//   hp: string;
//   imageFile?: File;
// };

// export default function BulkUploadPage() {
//   const [cards, setCards] = useState<BulkCard[]>([]);
//   const [csvFile, setCsvFile] = useState<File | null>(null);

//   // Parse uploaded CSV (name,type,rarity,hp)
//   function handleCSVChange(e: React.ChangeEvent<HTMLInputElement>) {
//     if (!e.target.files?.[0]) return;
//     const file = e.target.files[0];
//     setCsvFile(file);

//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const text = evt.target?.result as string;
//       const rows = text.trim().split("\n");
//       const header = rows[0].split(",");
//       const newCards: BulkCard[] = rows.slice(1).map(row => {
//         const values = row.split(",");
//         return {
//           name: values[0],
//           type: values[1],
//           rarity: values[2],
//           hp: values[3] || ""
//         };
//       });
//       setCards(newCards);
//     };
//     reader.readAsText(file);
//   }

//   // Match image files to cards by order
//   function handleImagesChange(e: React.ChangeEvent<HTMLInputElement>) {
//     if (!e.target.files) return;
//     const imgFiles = Array.from(e.target.files);
//     setCards(cards =>
//       cards.map((card, idx) => ({
//         ...card,
//         imageFile: imgFiles[idx] || undefined,
//       }))
//     );
//   }

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     // Here, you'd send `cards` with their `imageFile` to your backend
//     alert(`(Demo) Prepared to upload ${cards.length} cards with images!`);
//   }

//   return (
//     <main className="min-h-screen py-10 flex flex-col items-center">
//       <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8 border border-indigo-100">
//         <h1 className="text-2xl font-extrabold mb-2 text-center text-indigo-900">Bulk Upload Cards</h1>
//         <p className="text-gray-700 text-center mb-6">
//           Upload a CSV file (<span className="font-mono">name,type,rarity,hp</span>) and select matching images.<br />
//           Images are matched by order to cards in the CSV (first file = first card, etc.).
//         </p>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center">
//           <div>
//             <label className="block mb-1 font-semibold text-indigo-700">CSV File:</label>
//             <input
//               type="file"
//               accept=".csv,.txt"
//               required
//               onChange={handleCSVChange}
//               className="block"
//             />
//           </div>
//           <div>
//             <label className="block mb-1 font-semibold text-indigo-700">Card Images:</label>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               required
//               onChange={handleImagesChange}
//               disabled={cards.length === 0}
//               className="block"
//             />
//           </div>
//           <Button type="submit" className="w-48" disabled={cards.length === 0}>
//             Upload Cards
//           </Button>
//         </form>
//         {cards.length > 0 && (
//           <div className="mt-8">
//             <h2 className="text-lg font-bold mb-3">Preview</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {cards.map((card, idx) => (
//                 <div key={idx} className="p-4 bg-indigo-50 rounded shadow flex flex-col items-center">
//                   <span className="font-semibold">{card.name}</span>
//                   <span className="text-xs text-gray-600">{card.type} | {card.rarity} | HP: {card.hp}</span>
//                   {card.imageFile && (
//                     <img
//                       src={URL.createObjectURL(card.imageFile)}
//                       alt={card.name}
//                       className="w-32 h-40 object-cover rounded mt-2 border"
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }


"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FaUpload } from "react-icons/fa";

type BulkCard = {
  name: string;
  type: string;
  rarity: string;
  hp: string;
  imageFile?: File;
  errors?: string[];
};

type ParseResult = {
  cards: BulkCard[];
  errors: string[];
};

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB

function parseCSV(csv: string): ParseResult {
  const lines = csv.trim().replace(/\r/g, '').split("\n");
  if (lines.length < 2) {
    return { cards: [], errors: ["CSV must have at least one card row."] };
  }

  const headers = lines[0].split(",").map(h => h.trim());
  const required = ["name", "type", "rarity", "hp"];
  const missing = required.filter(field => !headers.includes(field));
  if (missing.length) {
    return { cards: [], errors: [`Missing required columns: ${missing.join(", ")}`] };
  }

  const idx = (field: string) => headers.indexOf(field);

  const cards: BulkCard[] = [];
  const seen = new Set();
  let errors: string[] = [];

  for (let i = 1; i < lines.length; ++i) {
    const values = lines[i].split(",").map(v => v.trim());
    const obj: BulkCard = {
      name: values[idx("name")] || "",
      type: values[idx("type")] || "",
      rarity: values[idx("rarity")] || "",
      hp: values[idx("hp")] || "",
    };
    obj.errors = [];
    if (!obj.name) obj.errors.push("Missing name");
    if (!obj.type) obj.errors.push("Missing type");
    if (!obj.rarity) obj.errors.push("Missing rarity");
    if (!obj.hp) obj.errors.push("Missing HP");

    if (seen.has(obj.name + obj.type)) obj.errors.push("Duplicate card name/type");
    seen.add(obj.name + obj.type);

    cards.push(obj);
  }
  if (cards.length === 0) errors.push("No valid cards in CSV.");
  return { cards, errors };
}

export default function BulkUploadPage() {
  const [cards, setCards] = useState<BulkCard[]>([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvError, setCsvError] = useState<string | null>(null);
  const [imgError, setImgError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function csvFileName() {
    return csvFile ? csvFile.name : "No file chosen";
  }

  function imagesSelectedCount() {
    const count = cards.filter(c => c.imageFile).length;
    return count > 0 ? `${count} selected` : "No images chosen";
  }

  function handleCSVChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCsvError(null);
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setCsvFile(file);
    if (!file.name.match(/\.csv$/i)) {
      setCsvError("File must be a CSV (.csv)");
      return;
    }
    const reader = new FileReader();
    reader.onload = evt => {
      const text = evt.target?.result as string;
      const { cards: parsedCards, errors } = parseCSV(text);
      setCards(parsedCards);
      setCsvError(errors.join("; ") || null);
    };
    reader.readAsText(file);
  }

  function handleImagesChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImgError(null);
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    for (const f of files) {
      if (!f.type.match(/^image\/(jpeg|png|jpg|png)$/i)) {
        setImgError("Only JPG/PNG images are allowed.");
        return;
      }
      if (f.size > MAX_IMAGE_SIZE) {
        setImgError(`Image '${f.name}' is too large (max 2MB each).`);
        return;
      }
    }
    setCards(cards => cards.map((card, idx) => ({
      ...card,
      imageFile: files[idx] || undefined,
    })));
  }

  function handleCardImageChange(idx: number, file?: File) {
    setImgError(null);
    if (file && (!file.type.match(/^image\/(jpeg|png|jpg|png)$/i) || file.size > MAX_IMAGE_SIZE)) {
      setImgError("Invalid image. Only JPG/PNG ≤ 2MB.");
      return;
    }
    setCards(cards => cards.map((card, i) =>
      i === idx ? { ...card, imageFile: file } : card
    ));
  }

  function resetAll() {
    setCards([]);
    setCsvFile(null);
    setCsvError(null);
    setImgError(null);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);

    for (const card of cards) {
      card.errors = [];
      if (!card.name) card.errors.push("Missing name");
      if (!card.type) card.errors.push("Missing type");
      if (!card.rarity) card.errors.push("Missing rarity");
      if (!card.hp) card.errors.push("Missing HP");
      if (!card.imageFile) card.errors.push("Missing image");
    }

    const invalidCards = cards.filter(card => card.errors && card.errors.length);
    if (invalidCards.length) {
      setUploading(false);
      setCsvError("Please fix card errors before submitting.");
      return;
    }

    setTimeout(() => {
      alert(`Uploaded ${cards.length} cards!`);
      resetAll();
    }, 1200);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-fuchsia-100 flex flex-col items-center py-12 px-3">
      <div className="w-full max-w-3xl bg-white/90 border-4 border-yellow-200 rounded-3xl shadow-2xl px-6 md:px-10 py-10 flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-yellow-700 mb-2 uppercase tracking-wide drop-shadow">
          Bulk Upload Cards
        </h1>
        <p className="mb-6 text-zinc-700 text-center">
          Upload a CSV (<span className="font-mono">name,type,rarity,hp</span>)&nbsp;
          and select matching images.<br />
          Images must be JPG/PNG, each ≤ 2MB.<br />
          <span className="font-semibold text-orange-700">Drag and drop to reorder images below if needed.</span>
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full items-center">
          <div className="w-full">
            <label className="block mb-1 font-semibold text-yellow-800">CSV File:</label>
            <div className="flex items-center gap-3">
              <label
                htmlFor="csv-input"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 text-white font-bold cursor-pointer shadow hover:bg-yellow-500 transition border-2 border-yellow-500"
              >
                <FaUpload />
                Choose CSV
              </label>
              <input
                ref={fileInputRef}
                id="csv-input"
                type="file"
                accept=".csv"
                required
                onChange={handleCSVChange}
                className="hidden"
                disabled={uploading}
              />
              <span className="text-xs text-zinc-700 font-mono py-1">
                {csvFileName()}
              </span>
            </div>
            {csvError && <div className="mt-1 text-red-600 text-sm">{csvError}</div>}
          </div>

          <div className="w-full">
            <label className="block mb-1 font-semibold text-yellow-800">Card Images:</label>
            <div className="flex items-center gap-3">
              <label
                htmlFor="image-input"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 text-white font-bold cursor-pointer shadow hover:bg-teal-600 transition border-2 border-teal-600"
              >
                <FaUpload />
                Choose Images
              </label>
              <input
                id="image-input"
                type="file"
                accept="image/*"
                multiple
                required
                onChange={handleImagesChange}
                disabled={cards.length === 0 || uploading}
                className="hidden"
              />
              <span className="text-xs text-zinc-700 font-mono py-1">
                {imagesSelectedCount()}
              </span>
            </div>
            {imgError && <div className="mt-1 text-red-600 text-sm">{imgError}</div>}
          </div>

          <div className="flex gap-3 w-full justify-center">
            <Button type="submit" className="w-48" disabled={cards.length === 0 || uploading}>
              {uploading ? "Uploading..." : "Upload Cards"}
            </Button>
            <Button type="button" className="w-48 border border-yellow-300 bg-gray-100 text-zinc-700 hover:bg-gray-200" onClick={resetAll} disabled={uploading}>
              Reset
            </Button>
          </div>
        </form>

        {/* PREVIEW */}
        {cards.length > 0 && (
          <div className="mt-10 w-full">
            <h2 className="text-lg font-extrabold mb-4 text-yellow-800">Preview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {cards.map((card, idx) => (
                <div key={idx} className={`p-4 bg-gradient-to-br from-yellow-50 via-orange-50 to-fuchsia-50 border rounded-xl shadow flex flex-col items-center
                  ${card.errors && card.errors.length ? "border-red-400" : "border-yellow-100"}
                `}>
                  <span className="font-bold text-yellow-700">{card.name}</span>
                  <span className="text-xs text-gray-600">
                    {card.type} | {card.rarity} | HP: {card.hp}
                  </span>
                  <label className="mt-2 text-xs text-gray-600">Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="block"
                    disabled={uploading}
                    onChange={e => {
                      if (!e.target.files || !e.target.files[0]) return;
                      handleCardImageChange(idx, e.target.files[0])
                    }}
                  />
                  {card.imageFile && (
                    <img
                      src={URL.createObjectURL(card.imageFile)}
                      alt={card.name}
                      className="w-28 h-36 object-cover rounded mt-2 border border-yellow-200 shadow"
                    />
                  )}
                  {card.errors && card.errors.length > 0 && (
                    <div className="mt-2 text-xs text-red-500 text-center">
                      {card.errors.map((err, i) => <div key={i}>{err}</div>)}
                    </div>
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