import { ChatThreadsProvider } from "@/components/useChatThreads";
export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return <ChatThreadsProvider>{children}</ChatThreadsProvider>;
}