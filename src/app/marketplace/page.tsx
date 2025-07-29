"use client";

import CardPreview, { CardPreviewProps } from "@/components/CardPreview";
import PosterCarousel from "@/components/PosterCarousel";

import { Luckiest_Guy } from "next/font/google";
const luckiestGuy = Luckiest_Guy({ subsets: ["latin"], weight: "400" });

const marketplacePosters = [
  "/marketplacePoster/poster1.png",
  "/marketplacePoster/poster2.jpg",
  // "/marketplace/poster3.jpg",
  // "/marketplace/poster4.jpg",
];

const marketplaceCaption = (
  <div className={`flex flex-col items-start ${luckiestGuy.className}`}>
    <span
      className="
        text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl
        text-white
        font-extrabold
        tracking-wide
        drop-shadow-[0_4px_16px_rgba(0,0,0,.7)]
        uppercase
        mb-1
      "
      style={{
        WebkitTextStroke: '1.5px #23272e',
        lineHeight: '1.08',
      }}
    >
      Marketplace
    </span>
    <span
      className="
        mt-1
        text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl
        font-bold
        text-white
        tracking-wider
        drop-shadow-[0_2px_10px_rgba(0,0,0,.7)]
      "
      style={{
        WebkitTextStroke: '0.7px #23272e',
      }}
    >
      Buy. Sell. Trade.
    </span>
    <span
      className="
        text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl
        font-bold
        text-white
        tracking-wider
        drop-shadow-[0_2px_10px_rgba(0,0,0,.7)]
      "
      style={{
        WebkitTextStroke: '0.7px #23272e',
      }}
    >
      Discover rare cards & new collections!
    </span>
    <span
      className="
        mt-3
        text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl
        font-extrabold
        text-white
        uppercase
        italic
        tracking-widest
        drop-shadow-[0_2px_12px_rgba(30,30,40,0.84)]
      "
      style={{
        WebkitTextStroke: '0.8px #23272e',
      }}
    >
      Let the trading begin!
    </span>
  </div>
);

const mockCards: CardPreviewProps[] = [
  // ... same 20 cards as given above ...
  { id: "1", name: "Charizard", imageUrl: "https://images.pokemontcg.io/base1/4.png", type: "Fire", rarity: "Ultra Rare", price: 12000 },
  { id: "2", name: "Pikachu", imageUrl: "https://images.pokemontcg.io/base1/58.png", type: "Electric", rarity: "Common", price: 250 },
  { id: "3", name: "Blastoise", imageUrl: "https://images.pokemontcg.io/base1/2.png", type: "Water", rarity: "Rare", price: 8700 },
  { id: "4", name: "Venusaur", imageUrl: "https://images.pokemontcg.io/base1/15.png", type: "Grass", rarity: "Rare Holo", price: 9000 },
  { id: "5", name: "Gyarados", imageUrl: "https://images.pokemontcg.io/base1/6.png", type: "Water", rarity: "Rare Holo", price: 8100 },
  { id: "6", name: "Mewtwo", imageUrl: "https://images.pokemontcg.io/base1/10.png", type: "Psychic", rarity: "Rare", price: 6800 },
  { id: "7", name: "Zapdos", imageUrl: "https://images.pokemontcg.io/base1/16.png", type: "Electric", rarity: "Rare Holo", price: 7200 },
  { id: "8", name: "Alakazam", imageUrl: "https://images.pokemontcg.io/base1/1.png", type: "Psychic", rarity: "Rare Holo", price: 7100 },
  { id: "9", name: "Machamp", imageUrl: "https://images.pokemontcg.io/base1/8.png", type: "Fighting", rarity: "Rare Holo", price: 5600 },
  { id: "10", name: "Jigglypuff", imageUrl: "https://images.pokemontcg.io/base1/54.png", type: "Fairy", rarity: "Common", price: 340 },
  { id: "11", name: "Gengar", imageUrl: "https://images.pokemontcg.io/base1/29.png", type: "Ghost", rarity: "Rare", price: 5300 },
  { id: "12", name: "Snorlax", imageUrl: "https://images.pokemontcg.io/base1/14.png", type: "Normal", rarity: "Rare", price: 4900 },
  { id: "13", name: "Dragonite", imageUrl: "https://images.pokemontcg.io/base2/4.png", type: "Dragon", rarity: "Rare Holo", price: 10000 },
  { id: "14", name: "Flareon", imageUrl: "https://images.pokemontcg.io/base2/3.png", type: "Fire", rarity: "Rare", price: 3900 },
  { id: "15", name: "Vaporeon", imageUrl: "https://images.pokemontcg.io/base2/12.png", type: "Water", rarity: "Rare", price: 4300 },
  { id: "16", name: "Lapras", imageUrl: "https://images.pokemontcg.io/base2/10.png", type: "Water", rarity: "Rare", price: 4200 },
  { id: "17", name: "Ditto", imageUrl: "https://images.pokemontcg.io/base2/8.png", type: "Normal", rarity: "Rare", price: 2100 },
  { id: "18", name: "Pidgeot", imageUrl: "https://images.pokemontcg.io/base2/15.png", type: "Flying", rarity: "Rare", price: 3100 },
  { id: "19", name: "Raichu", imageUrl: "https://images.pokemontcg.io/base1/14.png", type: "Electric", rarity: "Rare Holo", price: 4900 },
  { id: "20", name: "Eevee", imageUrl: "https://images.pokemontcg.io/base1/55.png", type: "Normal", rarity: "Common", price: 700 },
];

export default function MarketplacePage() {
  return (
    <main className="min-h-screen w-full py-0 pb-12">
      {/* Carousel (no background; blend with site background) */}
      <section className="w-full m-0 p-0">
        <PosterCarousel 
          posters={marketplacePosters}
          rotatingCard={{
            front: "/marketPlaceRotating/front.png",
            back: "/marketPlaceRotating/back.png"
          }}
          showRotatingCard={true}
          caption={marketplaceCaption} // Or leave empty for only per-poster captions 
          //typingEffect = {true}                  
        />
      </section>
      
      {/* Sticky glass-filter bar for contrast */}
      <nav className="sticky top-0 z-10 bg-zinc-800/70 backdrop-blur border-b border-zinc-700 mb-8">
        <div className="max-w-5xl mx-auto flex gap-3 justify-center text-xs sm:text-sm font-semibold py-2">
          <button className="px-4 py-1 rounded-full bg-yellow-400 text-zinc-900 shadow hover:bg-yellow-300 transition">All</button>
          <button className="px-4 py-1 rounded-full bg-zinc-700 text-zinc-100 border border-yellow-400 hover:bg-yellow-400 hover:text-zinc-900 transition">Ultra Rare</button>
          <button className="px-4 py-1 rounded-full bg-zinc-700 text-zinc-100 border border-yellow-400 hover:bg-yellow-400 hover:text-zinc-900 transition">Rare Holo</button>
          <button className="px-4 py-1 rounded-full bg-zinc-700 text-zinc-100 border border-yellow-400 hover:bg-yellow-400 hover:text-zinc-900 transition">Common</button>
          <button className="px-4 py-1 rounded-full bg-zinc-700 text-zinc-100 border border-yellow-400 hover:bg-yellow-400 hover:text-zinc-900 transition">Electric</button>
        </div>
      </nav>

      <div className="max-w-6xl w-full mx-auto px-2 sm:px-4">
        <h1 className="text-4xl font-extrabold mb-2 text-center text-yellow-300 drop-shadow tracking-tight">
          Pokémon Card Marketplace
        </h1>
        <p className="text-lg text-center text-yellow-200 mb-10">
          The best place to discover, trade, auction, or purchase Pokémon cards.
        </p>
        {/* Card grid */}
        <div className="grid gap-7 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {mockCards.map(card => (
            <div
              key={card.id}
              className="bg-white/10 rounded-xl shadow-xl shadow-zinc-900/30 border border-zinc-700
                hover:scale-[1.03] hover:shadow-amber-300/30 transition
                backdrop-blur"
            >
              <CardPreview {...card} />
            </div>
          ))}
        </div>
        <p className="text-xs text-zinc-400 mt-10 mb-3 text-center">
          (Feature demo: Cards shown are mock data. Real trading coming soon!)
        </p>
      </div>
    </main>
  );
}