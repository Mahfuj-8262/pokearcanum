// src/app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Shadcn button

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 items-center p-0 md:p-8">
      {/* Hero Section */}
      <section className="w-full max-w-4xl bg-white/90 backdrop-blur shadow-xl rounded-xl mt-16 mb-8 p-8 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-emerald-400 to-purple-500 text-transparent bg-clip-text mb-3">
          PokeArcanum
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 font-medium max-w-2xl">
          Buy, sell, and trade your Pokémon cards with fans & collectors worldwide.<br />
          The easiest way to grow your collection, bid, and connect!
        </p>
        {/* Call to Actions */}
        <div className="flex flex-wrap items-center gap-4 justify-center mb-3">
          <Link href="/signup">
            <Button size="lg" className="w-32 font-semibold bg-gradient-to-tr from-indigo-500 to-blue-400 hover:from-blue-600 hover:to-indigo-400 text-white">
              Sign Up
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="w-32 font-semibold border-indigo-400">
              Log in
            </Button>
          </Link>
          <Link href="/marketplace">
            <Button variant="secondary" size="lg" className="w-40 font-semibold">
              Browse Marketplace
            </Button>
          </Link>
        </div>
        <p className="text-[13px] text-gray-500 mt-2">
          No account? You can still explore!
        </p>
      </section>
      {/* Features Section */}
      <section className="w-full max-w-4xl bg-indigo-50/80 backdrop-blur-sm rounded-xl shadow-md p-8 text-center grid grid-cols-1 md:grid-cols-3 gap-7 mb-6">
        <div>
          <div className="mb-3 flex justify-center">
            <svg width={36} height={36} fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-indigo-500">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 20v-2a2 2 0 00-2-2h-2.5a..."/>
              {/* You could use a Shadcn or react-icon here */}
            </svg>
          </div>
          <h2 className="font-bold text-lg mb-1">Safe Trading</h2>
          <p className="text-sm text-gray-700">Built-in chat and ratings for safe, secure trades.</p>
        </div>
        <div>
          <div className="mb-3 flex justify-center">
            <svg width={36} height={36} fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-emerald-500">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 1" />
            </svg>
          </div>
          <h2 className="font-bold text-lg mb-1">Bidding & Auction</h2>
          <p className="text-sm text-gray-700">Sell instantly or run a live auction – your choice.</p>
        </div>
        <div>
          <div className="mb-3 flex justify-center">
            <svg width={36} height={36} fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-500">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5l4.5 15m-9 0L12 4.5z" />
            </svg>
          </div>
          <h2 className="font-bold text-lg mb-1">Bulk Manage</h2>
          <p className="text-sm text-gray-700">Add, delete, or import cards with ease, no hassle.</p>
        </div>
      </section>
      <footer className="text-gray-600 text-[13px] mb-4 mt-auto">
        &copy; {new Date().getFullYear()} PokeArcanum. Built with 💙 for TCG fans.
      </footer>
    </main>
  );
}