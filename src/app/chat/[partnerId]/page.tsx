"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Demo chat history
const demoMessages = [
  { fromMe: false, text: "Hi! Thanks for reaching out." },
  { fromMe: true, text: "Hi! Interested in your Blastoise card." },
  { fromMe: false, text: "Sure! Want to trade or buy?" }
];

export default function ChatThreadPage() {
  const params = useParams<{ partnerId: string }>();
  const [messages, setMessages] = useState(demoMessages);
  const [input, setInput] = useState("");

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { fromMe: true, text: input }]);
      setInput("");
    }
  }

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl border border-indigo-100 flex flex-col h-[70vh]">
        <div className="px-7 py-5 border-b border-indigo-100">
          <h2 className="text-lg font-bold">Chat with {params.partnerId}</h2>
        </div>
        <div className="flex-1 overflow-y-auto px-7 py-3 space-y-2 bg-indigo-50 flex flex-col">
          {messages.map((m, i) =>
            <div
              key={i}
              className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm mb-1 ${
                m.fromMe 
                    ? "self-end bg-indigo-200 text-indigo-900"
                    : "self-start bg-teal-100 text-gray-800"
              }`}
            >
              {m.text}
            </div>
          )}
        </div>
        <form
          onSubmit={sendMessage}
          className="px-7 py-3 border-t border-indigo-100 flex gap-2 bg-white"
        >
          <input
            className="border rounded px-4 py-2 flex-1"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <Button type="submit" disabled={!input.trim()}>Send</Button>
        </form>
      </div>
    </main>
  );
}