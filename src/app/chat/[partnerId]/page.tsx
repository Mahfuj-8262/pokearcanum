"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useChatThreads } from "@/components/useChatThreads";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function ChatThreadPage() {
  const params = useParams();
  const partnerId = params.partnerid as string;
  const { threads, sendMessage } = useChatThreads();
  const thread = threads.find(t => t.partnerId === partnerId);

  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [thread?.messages]);

  if (!thread) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-fuchsia-100 flex flex-col items-center justify-center py-12 px-3">
        <div className="max-w-lg w-full bg-white/90 rounded-3xl shadow-2xl border-4 border-yellow-200 px-8 py-10 text-center">
          <h1 className="text-2xl font-bold mb-3 text-yellow-700">Chat Not Found</h1>
          <p className="text-zinc-600 mb-8">No conversation with this trader exists.</p>
          <Link href="/chat" className="text-yellow-700 underline hover:text-yellow-900 font-bold">
            Back to Chats
          </Link>
        </div>
      </main>
    );
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sendMessage(partnerId, newMessage.trim());
    setNewMessage("");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-fuchsia-100 flex flex-col items-center py-12 px-3">
      <div className="max-w-lg w-full bg-white/90 rounded-3xl shadow-2xl border-4 border-yellow-200 px-4 md:px-8 py-10 flex flex-col">
        <div className="flex items-center gap-3 mb-7">
          <span className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-300 text-white text-xl font-black border-2 border-yellow-400 shadow">
            {initials(thread.partnerName)}
          </span>
          <span className="font-bold text-yellow-800 text-lg">{thread.partnerName}</span>
          <Link href="/chat" className="ml-auto bg-yellow-100 border border-yellow-300 rounded-lg px-3 py-1 text-xs font-bold text-yellow-700 hover:bg-yellow-200 transition">Back</Link>
        </div>
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto bg-yellow-50 border-2 border-yellow-100 rounded-xl px-3 py-4 mb-4 space-y-3 max-h-96 min-h-[18rem]"
        >
          {thread.messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}>
              <div className={`px-4 py-2 rounded-2xl max-w-[70%] text-base shadow
                ${msg.fromMe
                  ? "bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-100 text-right text-yellow-900"
                  : "bg-gradient-to-br from-amber-100 via-rose-50 to-white text-yellow-800 border border-yellow-200"
                }
              `}>
                <span className="whitespace-pre-line">{msg.text}</span>
                <div className="text-xs text-gray-500 mt-1">{new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            </div>
          ))}
        </div>
        <form className="flex gap-2 mt-2" onSubmit={handleSend}>
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg border-2 border-yellow-200 focus:border-yellow-600"
            autoFocus
          />
          <button
            type="submit"
            className="bg-yellow-500 px-6 py-2 rounded-lg text-white font-bold shadow hover:bg-yellow-600 transition disabled:opacity-60"
            disabled={!newMessage.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}