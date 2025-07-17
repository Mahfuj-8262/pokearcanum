"use client";

import Link from "next/link";

const fakeThreads = [
  {
    partnerId: "ash",
    partnerAvatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    partnerName: "Ash Ketchum",
    lastMessage: "Thanks for the trade!",
    lastDate: "2024-06-01 15:42"
  },
  {
    partnerId: "misty",
    partnerAvatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/120.png",
    partnerName: "Misty",
    lastMessage: "Deal! Let's swap tomorrow.",
    lastDate: "2024-06-02 09:17"
  }
];

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-teal-100 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl border border-indigo-100 p-7">
        <h1 className="text-2xl font-bold mb-5 text-indigo-900">Chats</h1>
        {fakeThreads.length === 0 ? (
          <div className="text-center text-gray-500 py-20 text-xl">No chats yet.</div>
        ) : (
          <ul className="flex flex-col gap-5">
            {fakeThreads.map(thread => (
              <li key={thread.partnerId}>
                <Link href={`/chat/${thread.partnerId}`} className="flex items-center group gap-4 p-3 rounded-lg transition bg-indigo-50 hover:bg-indigo-100 border border-indigo-100">
                  <img src={thread.partnerAvatar} className="w-12 h-12 rounded-full border" alt={thread.partnerName} />
                  <div className="flex flex-col flex-1">
                    <span className="font-bold text-indigo-800 group-hover:text-indigo-900">{thread.partnerName}</span>
                    <span className="text-gray-600 text-sm truncate">{thread.lastMessage}</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-auto">{new Date(thread.lastDate).toLocaleDateString()}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}