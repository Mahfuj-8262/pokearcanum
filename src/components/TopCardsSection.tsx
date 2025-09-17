"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTopCards } from "@/lib/api";

type TopCard = {
  id: number;
  name: string;
  imageUrl: string;
};

export default function TopCardsSection() {
  const [topCards, setTopCards] = useState<TopCard[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getTopCards();
        // Map backend Marketplace/Card model to frontend
        const mapped: TopCard[] = data.map((c: any) => ({
          id: c.id,
          name: c.card.cardName,
          imageUrl: c.card.link,
        }));
        setTopCards(mapped);
      } catch (err) {
        console.error("Failed to load top cards", err);
      }
    };
    fetchCards();
  }, []);

  return (
    <section className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-orange-400">
          Top Cards
        </h2>

        {/* Responsive Grid/Scroller */}
        <div
          className="
          relative 
          flex gap-4 md:gap-6 
          overflow-x-auto 
          md:grid md:grid-cols-5
          scroll-smooth
          pb-2 md:pb-0
          "
          style={{
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
          }}
        >
          {topCards.map((card, idx) => (
            <div
              key={card.id}
              className="
                min-w-[65vw] max-w-[80vw] sm:min-w-[200px] sm:max-w-[220px] 
                flex-1 flex flex-col 
                relative rounded-[1.2rem] bg-stone-400 shadow-md
                px-4 py-5 items-center justify-between 
                scroll-snap-align-center
                md:min-w-0 md:max-w-none
              "
              style={{
                overflow: "hidden",
              }}
            >
              {/* Card Image */}
              <img
                src={card.imageUrl}
                alt={card.name}
                className="w-[86%] max-w-[185px] h-auto aspect-[3/4] object-contain mb-3"
              />

              {/* Card Name */}
              <span
                className="text-lg md:text-xl font-extrabold uppercase tracking-wider text-center w-full"
                style={{
                  color: "#ffe066",
                  textShadow:
                    "1px 2px 2px #2b2d42, 0 1px 5px #000a",
                  letterSpacing: "0.06em",
                  lineHeight: 1.1,
                  marginTop: "0.5rem",
                }}
              >
                {card.name}
              </span>

              {/* Arrow overlay (Show only for last card) */}
              {idx === topCards.length - 1 && (
                <div className="absolute top-0 right-0 h-full flex items-center pr-2 z-20">
                  {/* Fading background */}
                  <div
                    className="absolute top-0 right-0 h-full w-28 md:w-32 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.93) 66%, #fff 98%)",
                    }}
                  />
                  {/* Arrow button */}
                  <Link
                    href="/marketplace"
                    className="flex flex-col items-center justify-center z-10"
                  >
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


// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";

// const mockCards = [
//   { id: 1, name: "Rayquaza", image: "/cards/rayquaza.png" },
//   { id: 2, name: "Pikachu", image: "/cards/pikachu.png" },
//   { id: 3, name: "Blastoise", image: "/cards/blastoise.png" },
//   { id: 4, name: "Mewtwo", image: "/cards/mewtwo.png" },
//   { id: 5, name: "Venusaur", image: "/cards/venusaur.png" },
// ];

// export default function TopCardsSection() {
//   return (
//     <section className="w-full py-10">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2
//           className="text-3xl font-bold mb-6 text-orange-400"
          
//         >
//           Top Cards
//         </h2>
//         {/* Responsive Grid/Scroller */}
//         <div
//           className="
//           relative 
//           flex gap-4 md:gap-6 
//           overflow-x-auto 
//           md:grid md:grid-cols-5 md:gap-6
//           scroll-smooth
//           pb-2 md:pb-0
//           "
//           style={{
//             WebkitOverflowScrolling: "touch",
//             scrollSnapType: "x mandatory",
//           }}
//         >
//           {mockCards.map((card, idx) => (
//             <div
//               key={card.id}
//               className="
//                 min-w-[65vw] max-w-[80vw] sm:min-w-[200px] sm:max-w-[220px] 
//                 flex-1 flex flex-col 
//                 relative rounded-[1.2rem] bg-stone-400 shadow-md
//                 px-4 py-5 items-center justify-between 
//                 scroll-snap-align-center
//                 md:min-w-0 md:max-w-none
//               "
//               style={{
//                 overflow: "hidden",
//               }}
//             >
//               {/* Card Image */}
//               <Image
//                 src={card.image}
//                 alt={card.name}
//                 width={180}
//                 height={230}
//                 className="w-[86%] max-w-[185px] h-auto aspect-[3/4] object-contain mb-3"
//                 priority
//               />
//               {/* Card Name */}
//               <span
//                 className="text-lg md:text-xl font-extrabold uppercase tracking-wider text-center w-full"
//                 style={{
//                   color: "#ffe066",
//                   textShadow:
//                     "1px 2px 2px #2b2d42, 0 1px 5px #000a",
//                   letterSpacing: "0.06em",
//                   lineHeight: 1.1,
//                   marginTop: "0.5rem",
//                 }}
//               >
//                 {card.name}
//               </span>
//               {/* Arrow overlay (Show only for last card) */}
//               {idx === mockCards.length - 1 && (
//                 <div className="absolute top-0 right-0 h-full flex items-center pr-2 z-20">
//                   {/* Fading background */}
//                   <div
//                     className="absolute top-0 right-0 h-full w-28 md:w-32 pointer-events-none"
//                     style={{
//                       background:
//                         "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.93) 66%, #fff 98%)",
//                     }}
//                   />
//                   {/* Arrow button */}
//                   <Link
//                     href="/marketplace"
//                     className="flex flex-col items-center justify-center z-10"
//                   >
//                     <Button
//                       size="icon"
//                       variant="secondary"
//                       className="rounded-full h-12 w-12 md:h-14 md:w-14 bg-white shadow text-black flex items-center justify-center"
//                       aria-label="View more cards"
//                     >
//                       <span className="text-3xl">&#8594;</span>
//                     </Button>
//                     <span className="block text-xs md:text-sm mt-2 text-indigo-700 font-bold text-center">
//                       More
//                     </span>
//                   </Link>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }