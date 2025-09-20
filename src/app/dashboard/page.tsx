"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFireAlt } from "react-icons/fa";

import ProtectedRoute from "@/components/ProtectedRoute";
import { getMarketplace, getTrades } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

type Trade = {
  id: number;
  time: string;
  amount: number;
  buyer: { userName: string };
  seller: { userName: string };
  marketplace: { card: { cardName: string; link: string } };
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [cardsOwned, setCardsOwned] = useState<number>(0);
  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const marketplaces = await getMarketplace();
        setCardsOwned(marketplaces?.length ?? 0);

        const trades = await getTrades();
        const sorted = trades
          .sort((a: Trade, b: Trade) => new Date(b.time).getTime() - new Date(a.time).getTime())
          .slice(0, 3);
        setRecentTrades(sorted);
      } catch (err) {
        console.error("Dashboard fetch error: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading your data...</div>;

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-gradient-to-br from-[#23272e] via-[#636468] to-[#aeb1b7] flex">
        
        {/* ... sidebar code unchanged ... */}

        <main className="flex-1 flex flex-col min-h-screen relative">
          {/* Header */}
          <header className="flex items-center gap-4 px-4 md:px-10 py-5 justify-between bg-white/70 border-b border-zinc-300 shadow">
            <div className="flex items-center gap-4">
              <span className="text-xl md:text-2xl font-extrabold text-zinc-800 tracking-widest">
                Hi, <span className="text-yellow-800">{user?.userName}</span>!
              </span>
            </div>
          </header>

          <section className="flex-1 w-full flex flex-col md:flex-row gap-6 px-3 md:px-10 py-6 md:py-9">
  
            {/* LEFT COLUMN → stats + recent trades */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <motion.div
                  layout
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring" }}
                  className="bg-gradient-to-br from-yellow-200 via-white to-orange-100 
                            border-2 border-yellow-400 shadow-lg rounded-2xl 
                            px-5 py-8 flex flex-col items-center"
                >
                  <FaFireAlt className="text-4xl text-orange-500 mb-1" />
                  <span className="text-4xl font-extrabold text-yellow-700 mt-1">
                    {cardsOwned}
                  </span>
                  <span className="font-semibold text-md text-yellow-800 mt-2">
                    Cards Owned
                  </span>
                </motion.div>
              </div>

              {/* Recent Trades section */}
              <div className="bg-white/80 rounded-2xl shadow-lg border border-zinc-200 px-6 py-6 flex flex-col gap-3">
                <h2 className="text-xl font-black text-zinc-800 mb-2 tracking-wide">
                  Recent Trades
                </h2>

                {recentTrades.length === 0 ? (
                  <div className="text-zinc-500 italic">
                    You haven’t made any trades yet.
                  </div>
                ) : (
                  <ul className="flex flex-col gap-4">
                    {recentTrades.map((trade) => {
                      const card = trade.marketplace.card;
                      const partner =
                        trade.buyer?.userName === user?.userName
                          ? trade.seller?.userName
                          : trade.buyer?.userName;

                      return (
                        <li
                          key={trade.id}
                          className="flex items-center gap-4 border-b pb-3 last:border-0"
                        >
                          <img
                            src={card?.link}
                            alt={card?.cardName}
                            className="w-12 h-16 object-cover rounded border"
                          />
                          <div className="flex-1">
                            <div className="font-semibold">{card?.cardName}</div>
                            <div className="text-sm text-gray-600">
                              With <span className="font-bold">{partner}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(trade.time).toLocaleDateString()}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN → Quick Actions */}
            <div className="flex flex-col gap-5 w-full md:w-[320px] max-w-full">
              <div className="bg-gradient-to-br from-zinc-50 via-yellow-100 to-pink-50 
                              border border-yellow-300 shadow-lg rounded-2xl 
                              px-4 py-6 flex flex-col gap-4">

                <Link href="/profile">
                  <button className="w-full bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-500 
                                    text-white font-bold rounded-lg py-3 shadow 
                                    hover:scale-105 active:scale-100 transition">
                    Profile
                  </button>
                </Link>

                <Link href="/trades">
                  <button className="w-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 
                                    text-white font-bold rounded-lg py-3 shadow 
                                    hover:scale-105 active:scale-100 transition">
                    Trades
                  </button>
                </Link>

                <Link href="/inventory">
                  <button className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 
                                    text-white font-bold rounded-lg py-3 shadow 
                                    hover:scale-105 active:scale-100 transition">
                    My Inventory
                  </button>
                </Link>

                <Link href="/inventory/add">
                  <button className="w-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 
                                    text-white font-bold rounded-lg py-3 shadow 
                                    hover:scale-105 active:scale-100 transition">
                    Add Card
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { FaFireAlt } from "react-icons/fa";

// import ProtectedRoute from "@/components/ProtectedRoute";
// import { getMarketplace } from "@/lib/api"; // ✅ updated to fetch from marketplace
// import { useAuth } from "@/context/AuthContext";

// export default function DashboardPage() {
//   const { user } = useAuth();
//   const [cardsOwned, setCardsOwned] = useState<number>(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const marketplaces = await getMarketplace();
//         setCardsOwned(marketplaces?.length ?? 0);
//       } catch (err) {
//         console.error("Dashboard fetch error: ", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div className="p-8 text-center">Loading your data...</div>;

//   return (
//     <ProtectedRoute>
//       <div className="min-h-screen w-full bg-gradient-to-br from-[#23272e] via-[#636468] to-[#aeb1b7] flex">
        
//         {/* --- Side Navigation --- */}
//         <aside className="hidden lg:flex flex-col justify-between bg-black/70 w-60 p-6 border-r border-zinc-800 shadow-2xl">
//           <div>
//             <div className="flex items-center gap-2 mb-10">
//               <span className="text-2xl font-extrabold text-yellow-400 tracking-wide">
//                 PokeArcanum
//               </span>
//             </div>
//             <nav className="flex flex-col gap-4">
//               <Link
//                 href="/dashboard"
//                 className="dashboard-nav-link text-indigo-200 font-bold"
//               >
//                 Dashboard
//               </Link>
//               <Link href="/profile" className="dashboard-nav-link text-zinc-300">
//                 Profile
//               </Link>
//               <Link
//                 href="/inventory"
//                 className="dashboard-nav-link text-zinc-300"
//               >
//                 Inventory
//               </Link>
//               <Link href="/trades" className="dashboard-nav-link text-zinc-300">
//                 Trades
//               </Link>
//             </nav>
//           </div>
//           <div className="text-sm text-zinc-500">
//             <span className="font-mono">Collector: </span>
//             <span className="text-yellow-200 font-semibold">
//               {user?.userName}
//             </span>
//           </div>
//         </aside>

//         {/* --- Main Content --- */}
//         <main className="flex-1 flex flex-col min-h-screen relative">
//           <header className="flex items-center gap-4 px-4 md:px-10 py-5 justify-between bg-white/70 border-b border-zinc-300 shadow">
//             <div className="flex items-center gap-4">
//               <span className="text-xl md:text-2xl font-extrabold text-zinc-800 tracking-widest">
//                 Hi, <span className="text-yellow-800">{user?.userName}</span>!
//               </span>
//             </div>
//           </header>

//           <section className="flex-1 w-full flex flex-col md:flex-row gap-6 px-3 md:px-10 py-6 md:py-9 overflow-x-auto">
            
//             {/* Left: Stat Widgets */}
//             <div className="flex-1 flex flex-col gap-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
//                 {/* Cards Owned widget */}
//                 <motion.div
//                   layout
//                   whileHover={{ scale: 1.04 }}
//                   transition={{ type: "spring" }}
//                   className="bg-gradient-to-br from-yellow-200 via-white to-orange-100 
//                             border-2 border-yellow-400 shadow-lg rounded-2xl 
//                             px-5 py-8 flex flex-col items-center"
//                 >
//                   <FaFireAlt className="text-4xl text-orange-500 mb-1" />
//                   <span className="text-4xl font-extrabold text-yellow-700 mt-1">
//                     {cardsOwned}
//                   </span>
//                   <span className="font-semibold text-md text-yellow-800 mt-2">
//                     Cards Owned
//                   </span>
//                 </motion.div>
//               </div>

//               {/* Recent trades section */}
//               <div className="mt-8">
//                 <div className="bg-white/80 rounded-2xl shadow-lg border border-zinc-200 px-6 py-6 flex flex-col gap-3">
//                   <h2 className="text-xl font-black text-zinc-800 mb-2 tracking-wide">
//                     Recent Trades
//                   </h2>
//                   <div className="text-zinc-500 italic">
//                     This is a showcase – your latest deals will show up here if
//                     you implement trades later.
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right-hand side quick actions */}
//             <div className="flex flex-col gap-5 w-full md:w-[320px] max-w-full">
//               <div className="bg-gradient-to-br from-zinc-50 via-yellow-100 to-pink-50 
//                               border border-yellow-300 shadow-lg rounded-2xl 
//                               px-4 py-6 flex flex-col gap-4">
//                 <Link href="/inventory">
//                   <button className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 
//                                     text-white font-bold rounded-lg py-3 
//                                     shadow hover:scale-105 active:scale-100 transition">
//                     My Inventory
//                   </button>
//                 </Link>
//                 <Link href="/trades">
//                   <button className="w-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 
//                                     text-white font-bold rounded-lg py-3 
//                                     shadow hover:scale-105 active:scale-100 transition">
//                     Trades
//                   </button>
//                 </Link>
//                 <Link href="/inventory/add">
//                   <button className="w-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 
//                                     text-white font-bold rounded-lg py-3 
//                                     shadow hover:scale-105 active:scale-100 transition">
//                     Add Card
//                   </button>
//                 </Link>
//               </div>
//               <div className="bg-white/80 border border-zinc-200 rounded-2xl shadow 
//                               px-6 py-6 text-center text-zinc-400 font-semibold flex-1">
//                 <span>More showcase widgets coming soon!</span>
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>
//     </ProtectedRoute>
//   );
// }