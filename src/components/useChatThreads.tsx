"use client";

import { createContext, useContext, useState } from "react";

type Message = { fromMe: boolean; text: string; date: string; };
type Thread = { partnerId: string; partnerName: string; messages: Message[]; };

const initialThreads: Thread[] = [
  {
    partnerId: "ash",
    partnerName: "Ash Ketchum",
    messages: [
      { fromMe: false, text: "Hey! Ready to trade?", date: "2024-06-01 15:30" },
      { fromMe: true,  text: "Absolutely! Sending you details.", date: "2024-06-01 15:31" },
      { fromMe: false, text: "Thanks for the trade!", date: "2024-06-01 15:42" }
    ]
  },
  {
    partnerId: "misty",
    partnerName: "Misty",
    messages: [
      { fromMe: true,  text: "Deal? I can swap Gyarados and Slowpoke.", date: "2024-06-02 09:10" },
      { fromMe: false, text: "Deal! Let's swap tomorrow.", date: "2024-06-02 09:17" }
    ]
  }
];

type ChatContextType = {
  threads: Thread[];
  sendMessage: (partnerId: string, text: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatThreadsProvider({ children }: { children: React.ReactNode }) {
  const [threads, setThreads] = useState<Thread[]>(initialThreads);

  function sendMessage(partnerId: string, text: string) {
    setThreads(ths =>
      ths.map(t =>
        t.partnerId === partnerId
          ? {
              ...t,
              messages: [
                ...t.messages,
                { fromMe: true, text, date: new Date().toISOString() }
              ]
            }
          : t
      )
    );
  }

  return (
    <ChatContext.Provider value={{ threads, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatThreads() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatThreads must be used within ChatThreadsProvider");
  return ctx;
}