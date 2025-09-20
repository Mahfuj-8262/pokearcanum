"use client";
import { useState, useEffect } from "react";
import { RotatableCard } from "@/components/RotatableCard";

type PosterItem =
  | string
  | { image: string; caption?: string };

type PosterCarouselProps = {
  posters: PosterItem[];
  rotatingCard?: { front: string; back: string };
  showRotatingCard?: boolean;       
  caption?: string | React.ReactNode;   
};

function useCardSize() {
  const [size, setSize] = useState({ width: 110, height: 160 });
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) { 
        setSize({ width: 240, height: 340 });
      } else if (window.innerWidth >= 768) { 
        setSize({ width: 180, height: 260 });
      } else if (window.innerWidth >= 640) { 
        setSize({ width: 140, height: 200 });
      } else { 
        setSize({ width: 110, height: 160 });
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
}

export default function PosterCarousel({
  posters,
  rotatingCard,
  showRotatingCard = false,
  caption
}: PosterCarouselProps) {
  const [curr, setCurr] = useState(0);
  const { width: cardWidth, height: cardHeight } = useCardSize();

  useEffect(() => {
    const timer = setInterval(() => setCurr(c => (c + 1) % posters.length), 4000);
    return () => clearInterval(timer);
  }, [posters.length]);

  if (!posters || posters.length === 0) return null;

  function getPoster(idx: number): { image: string; caption?: string; } {
    const p = posters[idx];
    if (typeof p === 'string') return { image: p, caption: undefined };
    return p;
  }
  const currPoster = getPoster(curr);

  const displayCaption = caption || currPoster.caption;

  return (
    <section className="w-full m-0 p-0 relative">
      <div className="relative w-full rounded-none h-[340px] xs:h-[420px] sm:h-[530px] md:h-[670px] lg:h-[800px] overflow-hidden shadow-lg">
        <img
          src={currPoster.image}
          alt={`Poster ${curr + 1}`}
          draggable={false}
          className="object-cover object-center w-full h-full transition-all duration-700"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0
          }}
        />

        {displayCaption && (
          <div
            className="absolute left-3 xs:left-5 sm:left-8 md:left-12 top-1/2 -translate-y-1/2 z-20
                       max-w-[80vw] sm:max-w-[60vw] md:max-w-[40vw] lg:max-w-[30vw]
                       text-white font-bold 
                       flex flex-col justify-center items-start"
          >
            {displayCaption}
          </div>
        )}

        {showRotatingCard && rotatingCard && (
          <div className="absolute top-1/2 right-2 md:right-10 -translate-y-1/2 z-30 block">
            <RotatableCard
              front={rotatingCard.front}
              back={rotatingCard.back}
              width={cardWidth}
              height={cardHeight}
            />
          </div>
        )}

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