"use client";

import { useEffect, useState } from "react";
import CardPreview, { CardPreviewProps } from "@/components/CardPreview";
import PosterCarousel from "@/components/PosterCarousel";
import { getMarketplace } from "@/lib/api";
import { getAllMarketplaces } from "@/lib/api";

import { Luckiest_Guy } from "next/font/google";
const luckiestGuy = Luckiest_Guy({ subsets: ["latin"], weight: "400" });

const marketplacePosters = [
  "https://mafustorage.blob.core.windows.net/pokearcanumblob/marketplace-posters/poster1.png",
  "https://mafustorage.blob.core.windows.net/pokearcanumblob/marketplace-posters/poster2.jpg",
];

const marketplaceCaption = (
  <div className={`flex flex-col items-start ${luckiestGuy.className}`}>
    <span className="text-4xl sm:text-6xl text-white font-extrabold tracking-wide drop-shadow uppercase mb-1"
      style={{ WebkitTextStroke: "1.5px #23272e", lineHeight: "1.08" }}
    >
      Marketplace
    </span>
    <span className="text-xl sm:text-3xl font-bold text-white drop-shadow"
      style={{ WebkitTextStroke: "0.7px #23272e" }}
    >
      Buy. Sell. Trade.
    </span>
    <span className="mt-3 text-xl sm:text-3xl font-extrabold text-white uppercase italic tracking-widest drop-shadow"
      style={{ WebkitTextStroke: "0.8px #23272e" }}
    >
      Let the trading begin!
    </span>
  </div>
);

const filters = ["All", "Ultra Rare", "Rare Holo", "Common", "Electric"];
const CARDS_PER_PAGE = 50;

export default function MarketplacePage() {
  const [allCards, setAllCards] = useState<CardPreviewProps[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardPreviewProps[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const marketplaces = await getAllMarketplaces();

        const mappedCards: CardPreviewProps[] = marketplaces.map((m: any) => ({
          id: String(m.id),
          name: m.card.cardName,
          imageUrl: m.card.link,
          type: m.card.type,
          rarity: m.card.rarity,
          price: m.price,
        }));

        setAllCards(mappedCards);
        setFilteredCards(mappedCards);
      } catch (err) {
        console.error("Error fetching marketplace:", err);
      }
    };

    fetchCards();
  }, []);

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
    if (filter === "All") {
      setFilteredCards(allCards);
    } else {
      const filtered = allCards.filter(
        (c) =>
          c.rarity.toLowerCase().includes(filter.toLowerCase()) ||
          c.type.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredCards(filtered);
    }
  };

  const startIdx = (currentPage - 1) * CARDS_PER_PAGE;
  const visibleCards = filteredCards.slice(startIdx, startIdx + CARDS_PER_PAGE);

  return (
    <main className="min-h-screen w-full py-0 pb-12">
      <section className="w-full m-0 p-0">
        <PosterCarousel
          posters={marketplacePosters}
          rotatingCard={{
            front: "https://mafustorage.blob.core.windows.net/pokearcanumblob/marketplace-rotating/front.png",
            back: "https://mafustorage.blob.core.windows.net/pokearcanumblob/marketplace-rotating/back.png",
          }}
          showRotatingCard={true}
          caption={marketplaceCaption}
        />
      </section>

      <nav className="sticky top-0 z-10 bg-zinc-800/70 backdrop-blur border-b border-zinc-700 mb-8">
        <div className="max-w-5xl mx-auto flex gap-3 justify-center text-xs sm:text-sm font-semibold py-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilter(filter)}
              className={`px-4 py-1 rounded-full transition ${
                activeFilter === filter
                  ? "bg-yellow-400 text-zinc-900 shadow"
                  : "bg-zinc-700 text-zinc-100 border border-yellow-400 hover:bg-yellow-400 hover:text-zinc-900"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-6xl w-full mx-auto px-2 sm:px-4">
        <h1 className="text-4xl font-extrabold mb-2 text-center text-yellow-300 drop-shadow tracking-tight">
          Pokémon Card Marketplace
        </h1>
        <p className="text-lg text-center text-yellow-200 mb-10">
          Discover & trade Pokémon cards
        </p>

        {visibleCards.length === 0 ? (
          <div className="text-center text-gray-400 text-xl py-20 italic">
            No cards found for "{activeFilter}"
          </div>
        ) : (
          <div className="grid gap-7 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {visibleCards.map((card) => (
              <div
                key={card.id}
                className="bg-white/10 rounded-xl shadow-xl shadow-zinc-900/30 border border-zinc-700 
                           hover:scale-[1.03] hover:shadow-amber-300/30 transition backdrop-blur"
              >
                <CardPreview {...card} />
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-yellow-400 text-zinc-900"
                      : "bg-zinc-700 text-zinc-100 hover:bg-yellow-400 hover:text-zinc-900"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}