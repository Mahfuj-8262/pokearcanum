import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const mockCards = [
  { id: 1, name: "Rayquaza", image: "/cards/rayquaza.png" },
  { id: 2, name: "Pikachu", image: "/cards/pikachu.png" },
  { id: 3, name: "Blastoise", image: "/cards/blastoise.png" },
  { id: 4, name: "Mewtwo", image: "/cards/mewtwo.png" },
  { id: 5, name: "Venusaur", image: "/cards/venusaur.png" },
//   { id: 6, name: "Blastoise", image: "/cards/blastoise.png" },
//   { id: 7, name: "Mewtwo", image: "/cards/mewtwo.png" },
//   { id: 8, name: "Venusaur", image: "/cards/venusaur.png" },
];

export default function TopCardsSection() {
  return (
    <section className="w-full py-10 ">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-orange-400" style={{fontFamily: "'Luckiest Guy', 'Comic Sans MS', cursive, sans-serif"}}>Top Cards</h2>
        {/* CARD GRID */}
        <div className="relative flex flex-row gap-4 md:gap-6 items-stretch">
          {mockCards.map((card, idx) => (
            <div
              key={card.id}
              className="
                flex-1
                min-w-0
                relative
                flex
                flex-col
                rounded-[1.2rem]
                bg-stone-400
                shadow-md
                px-4 py-5
                items-center
                justify-between
                "
              style={{
                overflow: "hidden",
              }}
            >
              {/* Card image */}
              <Image
                src={card.image}
                alt={card.name}
                width={180}
                height={230}
                className="w-[90%] max-w-[180px] h-auto aspect-[3/4] object-contain mb-3"
                priority
              />
              {/* Name (Pokémon style) */}
              <span
                className="text-lg md:text-xl font-extrabold uppercase tracking-wider text-center w-full"
                style={{
                  color: "#ffe066",
                  textShadow: "1px 2px 2px #2b2d42, 0 1px 5px #000a",
                  fontFamily: "'Luckiest Guy', 'Comic Sans MS', cursive, sans-serif",
                  letterSpacing: "0.06em",
                  lineHeight: 1.1,
                  marginTop: "0.5rem",
                }}
              >
                {card.name}
              </span>
              {/* Arrow overlay */}
              {idx === 4 && (
                <div className="absolute top-0 right-0 h-full flex items-center pr-2 z-20">
                  {/* Fading background */}
                  <div className="absolute top-0 right-0 h-full w-28 md:w-32 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.93) 65%, #fff 98%)",
                    }}
                  />
                  {/* Arrow button */}
                  <Link href="/marketplace" className="flex flex-col items-center justify-center z-10">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full h-12 w-12 md:h-14 md:w-14 bg-white shadow text-black flex items-center justify-center"
                      aria-label="View more cards"
                    >
                      <span className="text-3xl">&#8594;</span>
                    </Button>
                    <span className="block text-xs md:text-sm mt-2 text-indigo-700 font-bold text-center">
                      More
                    </span>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}