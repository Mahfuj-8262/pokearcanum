import Link from "next/link";

export interface CardPreviewProps {
  id: string;
  name: string;
  imageUrl: string;
  type: string;
  rarity: string;
  price: number; // for sale price, adjust as needed
}

export default function CardPreview(props: CardPreviewProps) {
  return (
    <Link
      href={`/marketplace/${props.id}`}
      className="group block shadow-lg rounded-lg bg-white/90 border border-indigo-100 hover:border-indigo-400 transition-all p-3"
    >
      <img
        src={props.imageUrl}
        alt={props.name}
        className="w-full h-40 object-cover rounded-md mb-2 group-hover:scale-105 transition-transform"
      />
      <h3 className="font-bold text-lg text-blue-800 group-hover:text-indigo-700">{props.name}</h3>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs rounded px-2 py-0.5 bg-indigo-50 text-indigo-700">{props.type}</span>
        <span className="text-xs rounded px-2 py-0.5 bg-purple-50 text-purple-700">{props.rarity}</span>
      </div>
      <div className="mt-2 font-semibold text-green-700 text-base">৳{props.price}</div>
    </Link>
  );
}