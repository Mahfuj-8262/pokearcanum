"use client";

import { useRouter } from "next/navigation";
import { useChatThreads } from "@/components/useChatThreads"; 

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function ChatPage() {
  const router = useRouter();
  const { threads } = useChatThreads();

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-fuchsia-100 py-12 px-3 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white/90 rounded-3xl shadow-2xl border-4 border-yellow-200 p-7">
        <h1 className="text-2xl font-extrabold mb-7 text-yellow-700 tracking-wide drop-shadow uppercase">Chats</h1>
        {threads.length === 0 ? (
          <div className="text-center text-gray-400 py-20 text-xl italic">No chats yet.</div>
        ) : (
          <ul className="flex flex-col gap-5">
            {threads.map(thread => (
              <li key={thread.partnerId}>
                <button
                  onClick={() => router.push(`/chat/${thread.partnerId}`)}
                  className="w-full flex items-center group gap-4 p-4 rounded-xl transition bg-gradient-to-r from-yellow-50 via-orange-50 to-fuchsia-50 hover:bg-yellow-100 border-2 border-yellow-100"
                >
                  <span className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-300 text-white text-xl font-black border-2 border-yellow-400 shadow">
                    {initials(thread.partnerName)}
                  </span>
                  <div className="flex flex-col flex-1">
                    <span className="font-bold text-yellow-700 group-hover:text-yellow-800">{thread.partnerName}</span>
                    <span className="text-gray-600 text-sm truncate">{thread.messages.at(-1)?.text ?? ""}</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-auto">{thread.messages.at(-1) && new Date(thread.messages.at(-1)!.date).toLocaleDateString()}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}