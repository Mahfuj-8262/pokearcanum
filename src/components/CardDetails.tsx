export interface CardDetailsProps {
  name: string;
  imageUrl: string;
  type: string;
  rarity: string;
  hp?: number;
  attacks?: { name: string; damage: number }[];
  price: number;
  seller: string;
  description?: string;
}

export default function CardDetails(props: CardDetailsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-lg p-8 border border-indigo-100">
      <div className="flex-shrink-0">
        <img
          src={props.imageUrl}
          alt={props.name}
          className="w-64 h-80 object-cover rounded-lg shadow border border-indigo-50"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-4xl font-extrabold mb-2 text-blue-900">{props.name}</h2>
        <div className="flex gap-4 mb-4">
          <span className="px-3 py-1 bg-indigo-100 rounded text-indigo-700 font-semibold">{props.type}</span>
          <span className="px-3 py-1 bg-purple-100 rounded text-purple-700 font-semibold">{props.rarity}</span>
        </div>
        <div className="mb-2 text-lg font-medium text-gray-800">Seller: <span className="font-bold text-indigo-700">{props.seller}</span></div>
        <div className="mb-2 text-xl font-bold text-green-700">৳{props.price}</div>
        {props.hp !== undefined && (
          <div className="mb-2">HP: <b>{props.hp}</b></div>
        )}
        {props.attacks && (
          <div className="mb-3">
            <b>Attacks:</b>
            <ul className="list-disc ml-5">
              {props.attacks.map((atk, i) => (
                <li key={i}>{atk.name} — <span className="font-semibold">{atk.damage} dmg</span></li>
              ))}
            </ul>
          </div>
        )}
        {props.description && (
          <div className="mb-4">
            <i className="text-gray-600">{props.description}</i>
          </div>
        )}
        {/* <div className="flex gap-3 mt-4">
          <button className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded text-white font-bold shadow">Buy</button>
          <button className="bg-purple-600 hover:bg-purple-700 transition px-5 py-2 rounded text-white font-bold shadow">Bid</button>
          <button className="bg-emerald-500 hover:bg-emerald-600 transition px-5 py-2 rounded text-white font-bold shadow">Request Trade</button>
        </div> */}
      </div>
    </div>
  );
}