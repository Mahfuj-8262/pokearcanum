"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { RotatableCard } from "@/components/RotatableCard";

const posters = [
  "/posters/poster1.png",
  "/posters/poster2.jpg",
  "/posters/poster3.png",
  "/posters/poster4.jpg"
];

// --- Responsive size hook, inside the same file ---
function useCardSize() {
  const [size, setSize] = useState({ width: 110, height: 160 });
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) { // lg and up
        setSize({ width: 240, height: 340 });
      } else if (window.innerWidth >= 768) { // md
        setSize({ width: 180, height: 260 });
      } else if (window.innerWidth >= 640) { // sm
        setSize({ width: 140, height: 200 });
      } else { // mobile/xs
        setSize({ width: 110, height: 160 });
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
}

export default function PosterCarousel() {
  const [curr, setCurr] = useState(0);
  const { width: cardWidth, height: cardHeight } = useCardSize();

  useEffect(() => {
    const timer = setInterval(() => setCurr(c => (c + 1) % posters.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full m-0 p-0 relative">
      <div className="relative w-full rounded-none sm:rounded-2xl h-[340px] xs:h-[420px] sm:h-[530px] md:h-[670px] lg:h-[800px] overflow-hidden shadow-lg">
        <Image
          src={posters[curr]}
          alt={`Poster ${curr + 1}`}
          fill
          className="object-cover object-center w-full h-full transition-all duration-700"
          priority
          sizes="100vw"
        />

        <div className="absolute top-1/2 right-2 md:right-10 -translate-y-1/2 z-30 block">
          <RotatableCard
            front="/rotating/pikachu.png"
            back="/rotating/back.png"
            width={cardWidth}
            height={cardHeight}
          />
        </div>

        <div className="absolute left-1/2 bottom-4 -translate-x-1/2 flex gap-2 z-20">
          {posters.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Show poster ${idx + 1}`}
              onClick={() => setCurr(idx)}
              className={`
                transition-all duration-300 rounded-lg outline-none cursor-pointer
                ${curr === idx
                  ? "w-10 h-2 bg-amber-300"
                  : "w-4 h-2 bg-amber-100 opacity-70"}
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}