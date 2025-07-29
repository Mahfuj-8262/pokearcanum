
// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { RotatableCard } from "@/components/RotatableCard";

// // Poster can be just a string or an object with optional caption
// type PosterItem =
//   | string
//   | { image: string; caption?: string };

// type PosterCarouselProps = {
//   posters: PosterItem[];
//   rotatingCard?: { front: string; back: string }; // Optional rotating card images
//   showRotatingCard?: boolean;                    // Whether to show it (default false)
//   caption?: string | React.ReactNode;            // Optional caption for left-side
// };

// // Responsive card size hook (unchanged)
// function useCardSize() {
//   const [size, setSize] = useState({ width: 110, height: 160 });
//   useEffect(() => {
//     function handleResize() {
//       if (window.innerWidth >= 1024) { // lg and up
//         setSize({ width: 240, height: 340 });
//       } else if (window.innerWidth >= 768) { // md
//         setSize({ width: 180, height: 260 });
//       } else if (window.innerWidth >= 640) { // sm
//         setSize({ width: 140, height: 200 });
//       } else { // mobile/xs
//         setSize({ width: 110, height: 160 });
//       }
//     }
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   return size;
// }

// export default function PosterCarousel({
//   posters,
//   rotatingCard,
//   showRotatingCard = false,
//   caption
// }: PosterCarouselProps) {
//   const [curr, setCurr] = useState(0);
//   const { width: cardWidth, height: cardHeight } = useCardSize();

//   useEffect(() => {
//     const timer = setInterval(() => setCurr(c => (c + 1) % posters.length), 4000);
//     return () => clearInterval(timer);
//   }, [posters.length]);

//   if (!posters || posters.length === 0) return null;

//   // Support string[] or PosterItem[]
//   function getPoster(idx: number): { image: string; caption?: string; } {
//     const p = posters[idx];
//     if (typeof p === 'string') return { image: p, caption: undefined };
//     return p;
//   }
//   const currPoster = getPoster(curr);

//   return (
//     <section className="w-full m-0 p-0 relative">
//       <div className="relative w-full rounded-none h-[340px] xs:h-[420px] sm:h-[530px] md:h-[670px] lg:h-[800px] overflow-hidden shadow-lg">
//         <Image
//           src={currPoster.image}
//           alt={`Poster ${curr + 1}`}
//           fill
//           className="object-cover object-center w-full h-full transition-all duration-700"
//           priority
//           sizes="100vw"
//         />

//         {/* ---- Left-side Caption/Text Overlay ---- */}
//         {(caption || currPoster.caption) && (
//           <div
//             className="absolute left-5 md:left-12 top-1/2 -translate-y-1/2 z-20
//                        bg-black/60 rounded-xl px-5 py-4 md:px-8 md:py-6 max-w-[70vw] md:max-w-[20rem]
//                        text-white font-bold text-lg md:text-2xl shadow-lg
//                        flex flex-col justify-center items-start
//                        backdrop-blur-sm"
//           >
//             {/* Render prop caption, else poster object caption */}
//             {caption || currPoster.caption}
//           </div>
//         )}

//         {/* ---- Right-side Rotating Card (optional) ---- */}
//         {showRotatingCard && rotatingCard && (
//           <div className="absolute top-1/2 right-2 md:right-10 -translate-y-1/2 z-30 block">
//             <RotatableCard
//               front={rotatingCard.front}
//               back={rotatingCard.back}
//               width={cardWidth}
//               height={cardHeight}
//             />
//           </div>
//         )}

//         {/* --- Pagination dots --- */}
//         <div className="absolute left-1/2 bottom-4 -translate-x-1/2 flex gap-2 z-20">
//           {posters.map((_, idx) => (
//             <button
//               key={idx}
//               aria-label={`Show poster ${idx + 1}`}
//               onClick={() => setCurr(idx)}
//               className={`
//                 transition-all duration-300 rounded-lg outline-none cursor-pointer
//                 ${curr === idx
//                   ? "w-10 h-2 bg-amber-300"
//                   : "w-4 h-2 bg-amber-100 opacity-70"}
//               `}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


////////////////////////////////////////


// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { RotatableCard } from "@/components/RotatableCard";
// import { motion } from "framer-motion";

// // --- Typing effect hook (NEW, see above) ---
// function useTypewriter(text: string, speed = 55) {
//   const [display, setDisplay] = useState('');

//   useEffect(() => {
//     // Only animate if text is a non-empty string
//     if (typeof text !== "string" || !text) {
//       setDisplay('');
//       return;
//     }

//     let unsubscribed = false;
//     setDisplay('');
//     let i = 0;
//     const interval = setInterval(() => {
//       if (unsubscribed) return;
//       setDisplay(prev => prev + text[i]);
//       i++;
//       if (i >= text.length) clearInterval(interval);
//     }, speed);

//     return () => {
//       unsubscribed = true;
//       clearInterval(interval);
//     };
//   }, [text, speed]);

//   // If typewriter "lags" and text is already fully available, ensure it's shown:
//   useEffect(() => {
//     if (typeof text === "string" && text.length > 0 && display.length > text.length) {
//       setDisplay(text);
//     }
//     // eslint-disable-next-line
//   }, [text]); // run when text changes

//   return display;
// }

// // --- Type and props (UNCHANGED, with typingEffect new prop) ---
// type PosterItem =
//   | string
//   | { image: string; caption?: string };

// type PosterCarouselProps = {
//   posters: PosterItem[];
//   rotatingCard?: { front: string; back: string }; // Optional rotating card images
//   showRotatingCard?: boolean;                    // Whether to show it (default false)
//   caption?: string | React.ReactNode;            // Optional caption for left-side
//   typingEffect?: boolean;                        // NEW: animate typing if true (default false)
// };

// // --- Responsive card size hook (unchanged) ---
// function useCardSize() {
//   const [size, setSize] = useState({ width: 110, height: 160 });
//   useEffect(() => {
//     function handleResize() {
//       if (window.innerWidth >= 1024) { // lg and up
//         setSize({ width: 240, height: 340 });
//       } else if (window.innerWidth >= 768) { // md
//         setSize({ width: 180, height: 260 });
//       } else if (window.innerWidth >= 640) { // sm
//         setSize({ width: 140, height: 200 });
//       } else { // mobile/xs
//         setSize({ width: 110, height: 160 });
//       }
//     }
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   return size;
// }

// export default function PosterCarousel({
//   posters,
//   rotatingCard,
//   showRotatingCard = false,
//   caption,
//   typingEffect = false, // <-- default: off
// }: PosterCarouselProps) {
//   const [curr, setCurr] = useState(0);
//   const { width: cardWidth, height: cardHeight } = useCardSize();

//   useEffect(() => {
//     const timer = setInterval(() => setCurr(c => (c + 1) % posters.length), 4000);
//     return () => clearInterval(timer);
//   }, [posters.length]);

//   if (!posters || posters.length === 0) return null;

//   function getPoster(idx: number): { image: string; caption?: string; } {
//     const p = posters[idx];
//     if (typeof p === 'string') return { image: p, caption: undefined };
//     return p;
//   }
//   const currPoster = getPoster(curr);
//   let leftText = typeof caption === 'string'
//   ? caption
//   : typeof currPoster.caption === 'string'
//     ? currPoster.caption
//     : "";

// // Only run typing effect for string content
// let animatedText = leftText;
// if (typingEffect && typeof leftText === "string") {
//   animatedText = useTypewriter(leftText);
// }

//   return (
//     <section className="w-full m-0 p-0 relative">
//       <div className="relative w-full rounded-none h-[340px] xs:h-[420px] sm:h-[530px] md:h-[670px] lg:h-[800px] overflow-hidden shadow-lg">
//         <Image
//           src={currPoster.image}
//           alt={`Poster ${curr + 1}`}
//           fill
//           className="object-cover object-center w-full h-full transition-all duration-700"
//           priority
//           sizes="100vw"
//         />

//         {/* Left-side Caption/Text Overlay (Big, welcoming, pop-in and/or typing if enabled, NO bg) */}
//         {leftText && (
//           <motion.div
//             initial={{ opacity: 0, y: 56, scale: 0.97 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 0.72, type: "spring", bounce: 0.45 }}
//             className="
//                 absolute left-5 md:left-12 top-1/2 -translate-y-1/2 z-20
//                 pointer-events-none select-none
//                 text-white
//                 font-extrabold
//                 text-3xl xs:text-4xl sm:text-5xl md:text-6xl
//                 max-w-[80vw] md:max-w-[22rem]
//                 leading-tight tracking-tight
//                 drop-shadow-[0_4px_28px_rgba(0,0,0,0.8)]
//                 [text-shadow:0_2px_14px_rgba(0,0,0,0.85),0_0_8px_#ffffff40,0_2px_8px_#18181b90]
//                 font-[Baloo_2,Comic_Sans_MS,cursive]
//               "
//           >
//             {animatedText}
//           </motion.div>
//         )}

//         {/* ---- Right-side Rotating Card (optional, unchanged) ---- */}
//         {showRotatingCard && rotatingCard && (
//           <div className="absolute top-1/2 right-2 md:right-10 -translate-y-1/2 z-30 block">
//             <RotatableCard
//               front={rotatingCard.front}
//               back={rotatingCard.back}
//               width={cardWidth}
//               height={cardHeight}
//             />
//           </div>
//         )}

//         {/* --- Pagination dots (unchanged) --- */}
//         <div className="absolute left-1/2 bottom-4 -translate-x-1/2 flex gap-2 z-20">
//           {posters.map((_, idx) => (
//             <button
//               key={idx}
//               aria-label={`Show poster ${idx + 1}`}
//               onClick={() => setCurr(idx)}
//               className={`
//                 transition-all duration-300 rounded-lg outline-none cursor-pointer
//                 ${curr === idx
//                   ? "w-10 h-2 bg-amber-300"
//                   : "w-4 h-2 bg-amber-100 opacity-70"}
//               `}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { RotatableCard } from "@/components/RotatableCard";

// Poster can be just a string or an object with optional caption
type PosterItem =
  | string
  | { image: string; caption?: string };

type PosterCarouselProps = {
  posters: PosterItem[];
  rotatingCard?: { front: string; back: string }; // Optional rotating card images
  showRotatingCard?: boolean;                    // Whether to show it (default false)
  caption?: string | React.ReactNode;            // Optional caption for left-side (string or JSX)
};

// Responsive card size hook (unchanged)
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

  // Support string[] or PosterItem[]
  function getPoster(idx: number): { image: string; caption?: string; } {
    const p = posters[idx];
    if (typeof p === 'string') return { image: p, caption: undefined };
    return p;
  }
  const currPoster = getPoster(curr);

  // Determine the caption to display (prop takes precedence)
  const displayCaption = caption || currPoster.caption;

  return (
    <section className="w-full m-0 p-0 relative">
      <div className="relative w-full rounded-none h-[340px] xs:h-[420px] sm:h-[530px] md:h-[670px] lg:h-[800px] overflow-hidden shadow-lg">
        <Image
          src={currPoster.image}
          alt={`Poster ${curr + 1}`}
          fill
          className="object-cover object-center w-full h-full transition-all duration-700"
          priority
          sizes="100vw"
        />

        {/* ---- Left-side Caption/Text Overlay ---- */}
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

        {/* ---- Right-side Rotating Card (optional) ---- */}
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

        {/* --- Pagination dots --- */}
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