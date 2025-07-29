// "use client";

// import Link from "next/link";

// export default function DashboardPage() {
//   // These would come from real backend/user data
//   const cardsOwned = 42;
//   const tradesInProgress = 3;
//   const unreadNotifications = 2;
//   const username = "AshKetchum";

//   return (
//     <main className="min-h-screen flex flex-col items-center py-10">
//       <div className="w-full max-w-3xl bg-white/95 border border-indigo-100 rounded-xl shadow-xl p-8 mb-10">
//         <h1 className="text-3xl font-bold mb-2 text-indigo-900">Hi, {username}!</h1>
//         <p className="text-lg mb-6 text-gray-700">Welcome to your dashboard — here’s your Pokémon trading activity at a glance:</p>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
//           <div className="flex flex-col items-center">
//             <span className="text-4xl font-extrabold text-indigo-600">{cardsOwned}</span>
//             <span className="font-medium text-sm text-gray-600">Cards Owned</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <span className="text-4xl font-extrabold text-emerald-600">{tradesInProgress}</span>
//             <span className="font-medium text-sm text-gray-600">Trades in Progress</span>
//           </div>
//           <div className="flex flex-col items-center">
//             <span className="text-4xl font-extrabold text-purple-600">{unreadNotifications}</span>
//             <span className="font-medium text-sm text-gray-600">Notifications</span>
//           </div>
//         </div>
//         <div className="flex flex-wrap gap-4 justify-center">
//           <Link href="/inventory">
//             <button className="bg-indigo-600 px-7 py-2 rounded text-white font-semibold shadow hover:bg-indigo-700 transition">My Inventory</button>
//           </Link>
//           <Link href="/trades">
//             <button className="bg-emerald-600 px-7 py-2 rounded text-white font-semibold shadow hover:bg-emerald-700 transition">Trades</button>
//           </Link>
//           <Link href="/notifications">
//             <button className="bg-purple-600 px-7 py-2 rounded text-white font-semibold shadow hover:bg-purple-700 transition">Notifications</button>
//           </Link>
//           <Link href="/inventory/add">
//             <button className="bg-blue-500 px-7 py-2 rounded text-white font-semibold shadow hover:bg-blue-600 transition">Add Card</button>
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFireAlt, FaExchangeAlt } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";

import logo from "@/../public/your-logo.png";

export default function DashboardPage() {
  // Static placeholder user data
  const cardsOwned = 42;
  const tradesInProgress = 3;
  const unreadNotifications = 2;
  const username = "AshKetchum";

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#23272e] via-[#636468] to-[#aeb1b7] flex">
      {/* --- Side Navigation --- */}
      <aside className="hidden lg:flex flex-col justify-between bg-black/70 w-60 p-6 border-r border-zinc-800 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-10">
            {/* <Image src= {logo} alt="Platform Logo" width={44} height={44} className="rounded-xl bg-white" /> */}
            <span className="text-2xl font-extrabold text-yellow-400 tracking-wide">PokeArcanum</span>
          </div>
          <nav className="flex flex-col gap-4">
            <Link href="/dashboard" className="dashboard-nav-link text-indigo-200 font-bold bg-gradient-to-r from-yellow-600 via-orange-400 to-pink-400 bg-clip-text text-transparent">🏠 Dashboard</Link>
            <Link href="/profile" className="dashboard-nav-link text-zinc-300">👤 Profile</Link>
            <Link href="/inventory" className="dashboard-nav-link text-zinc-300">📦 Inventory</Link>
            <Link href="/trades" className="dashboard-nav-link text-zinc-300">🔁 Trades</Link>
            <Link href="/notifications" className="dashboard-nav-link text-zinc-300">🔔 Notifications {unreadNotifications > 0 && <span className="ml-2 bg-fuchsia-600 text-xs px-2 py-0.5 rounded font-bold">{unreadNotifications}</span>}</Link>
          </nav>
        </div>
        {/* You could put theme switch/account avatar down here */}
        <div className="text-sm text-zinc-500">
          <span className="font-mono">Collector: </span>
          <span className="text-yellow-200 font-semibold">{username}</span>
        </div>
      </aside>


      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col min-h-screen relative">
        {/* Header Bar */}
        <header className="flex items-center gap-4 px-4 md:px-10 py-5 justify-between bg-white/70 border-b border-zinc-300 shadow">
          <div className="flex items-center gap-4">
            <span className="text-xl md:text-2xl font-extrabold text-zinc-800 tracking-widest">Hi, <span className="text-yellow-800">{username}</span>!</span>
          </div>
          {/* (actions like notifications, avatar, settings could go here) */}
        </header>

        {/* Dashboard - 2 Col Layout */}
        <section className="flex-1 w-full flex flex-col md:flex-row gap-6 px-3 md:px-10 py-6 md:py-9 overflow-x-auto">
          
          {/* Left: Stat Widgets */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Stat cards */}
              <motion.div
                layout
                className="bg-gradient-to-br from-yellow-200 via-white to-orange-100 border-2 border-yellow-400 shadow-lg rounded-2xl px-5 py-8 flex flex-col items-center"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring" }}
              >
                <FaFireAlt className="text-4xl text-orange-500 drop-shadow-xl mb-1" />
                                <span className="text-4xl font-extrabold text-yellow-700 mt-1">{cardsOwned}</span>
                <span className="font-semibold text-md text-yellow-800 mt-2">Cards Owned</span>
              </motion.div>

              <motion.div
                layout
                className="bg-gradient-to-br from-emerald-100 via-white to-cyan-100 border-2 border-emerald-400 shadow-lg rounded-2xl px-5 py-8 flex flex-col items-center"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring" }}
              >
                <FaExchangeAlt className="text-4xl text-emerald-600 drop-shadow-xl mb-1" />
                <span className="text-4xl font-extrabold text-emerald-700 mt-1">{tradesInProgress}</span>
                <span className="font-semibold text-md text-emerald-900 mt-2">Trades in Progress</span>
              </motion.div>

                            <motion.div
                layout
                className="bg-gradient-to-br from-pink-100 via-white to-fuchsia-100 border-2 border-fuchsia-300 shadow-lg rounded-2xl px-5 py-8 flex flex-col items-center"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring" }}
              >
                <MdNotificationsActive className="text-4xl text-fuchsia-500 drop-shadow-xl mb-1" />
                <span className="text-4xl font-extrabold text-fuchsia-700 mt-1">{unreadNotifications}</span>
                <span className="font-semibold text-md text-fuchsia-800 mt-2">Notifications</span>
              </motion.div>
            </div>
            
            {/* Extra dashboard widgets can be added here, e.g., recent trades */}
            <div className="mt-8">
              <div className="bg-white/80 rounded-2xl shadow-lg border border-zinc-200 px-6 py-6 flex flex-col gap-3">
                <h2 className="text-xl font-black text-zinc-800 mb-2 tracking-wide">Recent Trades</h2>
                <div className="text-zinc-500 italic">
                  {/* Placeholder – populate with actual user trade feed */}
                  You haven't made any trades recently. As soon as you do, your latest deal will show up here!
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quick Action Buttons & (future) widgets */}
          <div className="flex flex-col gap-5 w-full md:w-[320px] max-w-full">
            {/* Quick access buttons */}
            <div className="bg-gradient-to-br from-zinc-50 via-yellow-100 to-pink-50 border border-yellow-300 shadow-lg rounded-2xl px-4 py-6 flex flex-col gap-4">
              <Link href="/inventory">
                <button className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white font-bold rounded-lg py-3 shadow hover:scale-105 active:scale-100 transition">My Inventory</button>
              </Link>
              <Link href="/trades">
                <button className="w-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 text-white font-bold rounded-lg py-3 shadow hover:scale-105 active:scale-100 transition">Trades</button>
              </Link>
              <Link href="/notifications">
                <button className="w-full bg-gradient-to-r from-fuchsia-400 via-pink-400 to-rose-400 text-white font-bold rounded-lg py-3 shadow hover:scale-105 active:scale-100 transition">Notifications</button>
              </Link>
              <Link href="/inventory/add">
                <button className="w-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-white font-bold rounded-lg py-3 shadow hover:scale-105 active:scale-100 transition">Add Card</button>
              </Link>
            </div>
            {/* Placeholder for future dashboard widgets – "Card Collection Preview", "Events", etc. */}
            <div className="bg-white/80 border border-zinc-200 rounded-2xl shadow px-6 py-6 text-center text-zinc-400 font-semibold flex-1">
              {/* Example future expansion space */}
              <span>More cool widgets coming soon!</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}