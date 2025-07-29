// "use client";

// import Link from "next/link";

// // Mock demo notifications
// const notifications = [
//   {
//     id: "n1",
//     type: "trade_offer",
//     read: false,
//     title: "New Trade Offer",
//     description: "Brock made a trade offer on your Charizard card.",
//     link: "/marketplace/charizard",
//     date: "2024-06-13T10:13:00Z"
//   },
//   {
//     id: "n2",
//     type: "bid",
//     read: false,
//     title: "Bid Placed",
//     description: "Misty placed a bid on your Blastoise card.",
//     link: "/marketplace/blastoise",
//     date: "2024-06-14T08:41:00Z"
//   },
//   {
//     id: "n3",
//     type: "trade_status",
//     read: true,
//     title: "Trade Completed",
//     description: "Your trade with Ash for Pikachu is completed.",
//     link: "/trades",
//     date: "2024-06-08T16:05:00Z"
//   },
// ];

// export default function NotificationsPage() {
//   return (
//     <main className="min-h-screen py-12 px-3 flex flex-col items-center">
//       <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl border border-indigo-100 p-7">
//         <h1 className="text-2xl font-bold mb-5 text-indigo-900">Notifications</h1>
//         {notifications.length === 0 ? (
//           <div className="text-center text-gray-500 py-24 text-xl">No notifications yet.</div>
//         ) : (
//           <ul className="flex flex-col gap-3">
//             {notifications.map(n => (
//               <li key={n.id}>
//                 <Link href={n.link} className="block p-5 rounded-lg border transition
//                    bg-indigo-50 hover:bg-indigo-100 border-indigo-100
//                    flex flex-col gap-1 relative
//                    "
//                 >
//                   {!n.read && (
//                     <span className="absolute right-3 top-3 bg-emerald-500 w-2 h-2 rounded-full" />
//                   )}
//                   <span className="font-bold text-indigo-800">{n.title}</span>
//                   <span className="text-gray-700">{n.description}</span>
//                   <span className="text-xs text-right text-gray-500 mt-1">{new Date(n.date).toLocaleString()}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </main>
//   );
// }

"use client";

import Link from "next/link";
import { FaExchangeAlt, FaGavel, FaCheckCircle } from "react-icons/fa";

const notifications = [
  {
    id: "n1",
    type: "trade_offer",
    read: false,
    title: "New Trade Offer",
    description: "Brock made a trade offer on your Charizard card.",
    link: "/marketplace/charizard",
    date: "2024-06-13T10:13:00Z"
  },
  {
    id: "n2",
    type: "bid",
    read: false,
    title: "Bid Placed",
    description: "Misty placed a bid on your Blastoise card.",
    link: "/marketplace/blastoise",
    date: "2024-06-14T08:41:00Z"
  },
  {
    id: "n3",
    type: "trade_status",
    read: true,
    title: "Trade Completed",
    description: "Your trade with Ash for Pikachu is completed.",
        link: "/trades",
    date: "2024-06-08T16:05:00Z"
  },
];

function NotificationIcon({ type }: { type: string }) {
  if (type === "trade_offer") return <FaExchangeAlt className="text-yellow-500 text-xl mr-2" />;
  if (type === "bid") return <FaGavel className="text-indigo-500 text-xl mr-2" />;
  if (type === "trade_status") return <FaCheckCircle className="text-emerald-500 text-xl mr-2" />;
  return null;
}

export default function NotificationsPage() {
  return (
    <main className="min-h-screen py-12 px-3 flex flex-col items-center bg-gradient-to-br from-yellow-100 via-orange-50 to-fuchsia-100">
      <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl border-4 border-yellow-200 p-7">
        <h1 className="text-2xl font-extrabold mb-7 text-yellow-700 tracking-wide drop-shadow uppercase">Notifications</h1>
        {notifications.length === 0 ? (
          <div className="text-center text-gray-400 py-32 text-xl italic">No notifications yet.</div>
        ) : (
          <ul className="flex flex-col gap-4">
            {notifications.map(n => (
              <li key={n.id}>
                <Link
                  href={n.link}
                  className={`relative group flex items-start gap-3 p-5 rounded-xl border-2 transition
                    ${n.read
                      ? "bg-gray-50 border-gray-200"
                      : "bg-gradient-to-r from-yellow-100 via-orange-50 to-fuchsia-50 border-yellow-300"}
                    hover:bg-yellow-50`}
                >
                  <div className="mt-1">
                    <NotificationIcon type={n.type} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-zinc-800 text-lg leading-tight">{n.title}</div>
                    <div className="text-gray-700">{n.description}</div>
                    <div className="text-xs text-right text-gray-500 font-mono mt-1">
                      {new Date(n.date).toLocaleString()}
                    </div>
                  </div>
                  {!n.read && (
                    <span className="absolute top-3 right-3 bg-emerald-500 w-3 h-3 rounded-full ring-2 ring-white animate-pulse" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}