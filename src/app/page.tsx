import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 items-center pb-14">
      {/* Hero Section */}
      <section className="w-full max-w-5xl bg-white/90 backdrop-blur shadow-xl rounded-xl mt-16 mb-8 p-8 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-emerald-400 to-purple-500 text-transparent bg-clip-text mb-3">
          Turn Your Cards Into Connections
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 font-medium max-w-2xl">
          The easiest and safest way to buy, sell, and trade Pokémon cards worldwide.<br />
          Grow your collection, negotiate deals, and join a trusted TCG community!
        </p>
        <div className="flex flex-wrap items-center gap-4 justify-center mb-3">
          <Link href="/signup">
            <Button size="lg" className="w-32 font-semibold bg-gradient-to-tr from-indigo-500 to-blue-400 hover:from-blue-600 hover:to-indigo-400 text-white">
              Get Started
            </Button>
          </Link>
          <Link href="/marketplace">
            <Button variant="outline" size="lg" className="w-36 font-semibold border-indigo-400">
              Browse Marketplace
            </Button>
          </Link>
        </div>
        <Badge className="mt-5 px-5 py-1 text-md bg-emerald-100 text-emerald-600 border-emerald-300">
          Always free to explore!
        </Badge>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-md border-indigo-100 bg-indigo-50/60">
            <CardHeader>
              <CardTitle>Safe Trading</CardTitle>
              <CardDescription>
                Secure in-app messaging and user ratings for peace-of-mind deals.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-4">
              <span className="text-3xl">🛡️</span>
            </CardContent>
          </Card>
          <Card className="shadow-md border-indigo-100 bg-indigo-50/60">
            <CardHeader>
              <CardTitle>Live Bidding</CardTitle>
              <CardDescription>
                Sell instantly or auction your rarest cards to the highest bidder.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-4">
              <span className="text-3xl">🔨</span>
            </CardContent>
          </Card>
          <Card className="shadow-md border-indigo-100 bg-indigo-50/60">
            <CardHeader>
              <CardTitle>Bulk Managing</CardTitle>
              <CardDescription>
                Add, edit, or import dozens of cards at once, hassle-free.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-4">
              <span className="text-3xl">📦</span>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-4xl rounded-xl bg-white/80 shadow-lg py-10 px-6 md:px-14 mt-8 mb-10">
        <h2 className="text-2xl font-bold text-indigo-900 mb-6 text-center">How It Works</h2>
        <ol className="list-decimal space-y-4 ml-5 text-left text-gray-700">
          <li>
            <b>Register & Build Your Collection:</b> Add your cards or import them in bulk with a single click.
          </li>
          <li>
            <b>List, Bid or Trade:</b> Sell at your price, open for bids, or send/receive trade requests.
          </li>
          <li>
            <b>Chat with Traders:</b> Negotiate and finalize deals via secure, instant chat.
          </li>
          <li>
            <b>Rate Experiences:</b> After every trade or sale, rate your partner and build trust.
          </li>
        </ol>
      </section>

      {/* Marketplace Preview/CTA (optional) */}
      <section className="max-w-xl w-full mx-auto text-center mb-12">
        <h3 className="font-bold text-xl text-indigo-800 mb-3">Ready to explore top trades?</h3>
        <Link href="/marketplace">
          <Button variant="secondary" className="w-64 text-lg">Discover Cards Now</Button>
        </Link>
      </section>
    </main>
  );
}