// "use client";

// const user = {
//   username: "AshKetchum",
//   email: "ash@poke.com",
//   avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
//   joined: "2024-01-10",
//   stats: {
//     cards: 38,
//     trades: 12,
//     averageRating: 4.8,
//   },
//   ratings: [
//     {
//       from: "Misty",
//       stars: 5,
//       comment: "Great trading partner! Super fast and friendly 😊",
//       date: "2024-05-29",
//     },
//     {
//       from: "Brock",
//       stars: 4,
//       comment: "Smooth trade. Would trade again!",
//       date: "2024-06-05",
//     },
//   ]
// };

// function StarBar({ stars }: { stars: number }) {
//   return (
//     <span className="text-amber-400">
//       {"★".repeat(Math.round(stars)) + "☆".repeat(5 - Math.round(stars))}
//     </span>
//   )
// }

// export default function ProfilePage() {
//   return (
//     <main className="min-h-screen py-12 px-3 flex flex-col items-center">
//       <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl border border-indigo-100 p-8">
//         <div className="flex items-center gap-6">
//           <img src={user.avatar} alt={user.username} className="w-20 h-20 rounded-full border" />
//           <div>
//             <h1 className="text-2xl font-bold text-indigo-800">{user.username}</h1>
//             <p className="text-gray-600">{user.email}</p>
//             <div className="text-xs text-gray-500 mt-1">
//               Joined: {new Date(user.joined).toLocaleDateString()}
//             </div>
//           </div>
//         </div>
//         <div className="flex gap-12 mt-8 justify-center text-center">
//           <div>
//             <span className="text-indigo-700 font-bold text-2xl">{user.stats.cards}</span>
//             <div className="text-gray-500">Cards</div>
//           </div>
//           <div>
//             <span className="text-indigo-700 font-bold text-2xl">{user.stats.trades}</span>
//             <div className="text-gray-500">Trades</div>
//           </div>
//           <div>
//             <span className="text-indigo-700 font-bold text-2xl flex items-center justify-center gap-2">
//               {user.stats.averageRating.toFixed(1)}
//               <StarBar stars={user.stats.averageRating} />
//             </span>
//             <div className="text-gray-500">Avg. Rating</div>
//           </div>
//         </div>
//         <div className="mt-10">
//           <h2 className="text-lg font-bold mb-2 text-indigo-900">Feedback</h2>
//           {user.ratings.length === 0 ? (
//             <div className="text-gray-500 italic">No feedback yet.</div>
//           ) : (
//             <ul className="flex flex-col gap-4">
//               {user.ratings.map((r, i) =>
//                 <li key={i} className="bg-indigo-50 rounded p-4 border border-indigo-100">
//                   <div className="flex items-center mb-1 gap-2">
//                     <b className="text-indigo-800">{r.from}</b>
//                     <StarBar stars={r.stars} />
//                     <span className="text-xs ml-auto text-gray-500">{new Date(r.date).toLocaleDateString()}</span>
//                   </div>
//                   <div className="text-gray-700 text-sm">{r.comment}</div>
//                 </li>
//               )}
//             </ul>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }


"use client";

import { FaStar, FaRegStar, FaRegEdit, FaIdBadge, FaIdCard, FaExchangeAlt } from "react-icons/fa";

const user = {
  username: "AshKetchum",
  email: "ash@poke.com",
  joined: "2024-01-10",
  stats: {
    cards: 38,
    trades: 12,
    averageRating: 4.8,
  },
  ratings: [
    {
      from: "Misty",
      stars: 5,
      comment: "Great trading partner! Super fast and friendly 😊",
      date: "2024-05-29",
    },
        {
      from: "Brock",
      stars: 4,
      comment: "Smooth trade. Would trade again!",
      date: "2024-06-05",
    },
  ]
};

function StarBar({ stars }: { stars: number }) {
  return (
    <span>
      {[1,2,3,4,5].map(n =>
        n <= Math.round(stars)
        ? <FaStar key={n} className="inline text-amber-400 mr-0.5" />
        : <FaRegStar key={n} className="inline text-amber-200 mr-0.5" />
      )}
    </span>
  )
}

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-fuchsia-100 flex items-center justify-center py-12 px-2">
      <div className="w-full max-w-2xl bg-gradient-to-br from-white via-yellow-50 to-rose-50 border-4 border-yellow-300 rounded-[2.5rem] shadow-2xl flex flex-col items-center py-10 px-2 md:px-8 relative">
        
        {/* CARD HEADER */}
        <div className="relative flex flex-col items-center w-full mb-2">
          <h1 className="text-2xl md:text-3xl font-extrabold mt-1 tracking-wide text-center text-zinc-800 drop-shadow">
            {user.username}
          </h1>
          <span className="text-md font-mono text-zinc-600">{user.email}</span>
          <div className="text-xs text-gray-500 mb-2">
            Joined: {new Date(user.joined).toLocaleDateString()}
          </div>
          {/* Optional edit button */}
          <button
            type="button"
            className="absolute top-0 right-0 md:top-2 md:right-2 text-yellow-500 hover:text-yellow-700 transition"
            title="Edit Profile"
          >
            <FaRegEdit className="text-lg" />
          </button>
        </div>

                {/* STATS */}
        <div className="flex flex-row gap-4 md:gap-12 mt-7 mb-3 justify-center w-full">
          <div className="flex flex-col items-center bg-yellow-100 border border-yellow-200 rounded-xl px-6 py-2 shadow">
            <FaIdCard className="text-yellow-400 text-xl mb-1" />
            <span className="text-yellow-700 font-bold text-xl">{user.stats.cards}</span>
            <div className="text-gray-500 tracking-wide text-xs font-medium">Cards</div>
          </div>
          <div className="flex flex-col items-center bg-indigo-100 border border-indigo-200 rounded-xl px-6 py-2 shadow">
            <FaExchangeAlt className="text-indigo-400 text-xl mb-1" />
            <span className="text-indigo-700 font-bold text-xl">{user.stats.trades}</span>
            <div className="text-gray-500 tracking-wide text-xs font-medium">Trades</div>
          </div>
          <div className="flex flex-col items-center bg-amber-100 border border-amber-200 rounded-xl px-6 py-2 shadow">
            <FaIdBadge className="text-amber-400 text-xl mb-1" />
            <span className="text-amber-700 font-bold text-xl flex gap-2 items-center">
              {user.stats.averageRating.toFixed(1)}
            </span>
            <StarBar stars={user.stats.averageRating} />
            <div className="text-gray-500 tracking-wide text-xs font-medium">Avg. Rating</div>
          </div>
        </div>

        {/* FEEDBACK */}
        <div className="w-full mt-8">
          <h2 className="text-xl font-black mb-3 text-zinc-700 uppercase tracking-wide">Feedback</h2>
          {user.ratings.length === 0 ? (
            <div className="text-gray-400 italic text-center">No feedback yet.</div>
          ) : (
            <ul className="flex flex-col gap-5">
              {user.ratings.map((r, i) =>
                <li key={i} className="bg-gradient-to-r from-yellow-100 via-orange-50 to-fuchsia-50 border border-yellow-200 rounded-lg p-4 shadow flex flex-col">
                  <div className="flex items-center mb-1 gap-2">
                    <b className="text-indigo-800">{r.from}</b>
                    <StarBar stars={r.stars} />
                    <span className="text-xs ml-auto text-gray-500">{new Date(r.date).toLocaleDateString()}</span>
                  </div>
                  <div className="text-gray-700 text-sm">{r.comment}</div>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}