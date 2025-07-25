"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import { RotatableCard } from "@/components/RotatableCard";

const posters = [
  "/posters/poster1.png",
  "/posters/poster2.png",
  "/posters/poster3.png",
  // add more as needed
];

export default function PosterCarousel() {
  const [curr, setCurr] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurr(c => (c + 1) % posters.length), 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    // PosterCarousel.tsx
    <section className="w-full m-0 p-0 relative">
    <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden shadow-lg">
        <Image
        src={posters[curr]}
        alt={`Poster ${curr + 1}`}
        fill
        className="object-cover object-center transition-all duration-700"
        priority
        sizes="100vw"
        />

        <div className="absolute top-1/2 right-10 transform -translate-y-1/2 z-30 hidden md:block">
          <RotatableCard
            front="/rotating/pikachu.png"
            back="/rotating/back.png"
            width={240}
            height={340}
          />
        </div>


        <div className="absolute left-1/2 bottom-5 -translate-x-1/2 flex gap-2 z-20">
        {posters.map((_, idx) => (
            <button
            key={idx}
            className={`w-3 h-3 rounded-full transition ${
                curr === idx ? "bg-amber-300 scale-110" : "bg-amber-100"
            }`}
            aria-label={`Show poster ${idx + 1}`}
            onClick={() => setCurr(idx)}
            />
        ))}
        </div>
    </div>
    </section>
  );
}