"use client"

import PosterCarousel from "@/components/PosterCarousel";
import TopCardsSection from "@/components/TopCardsSection";
import DashboardStats from "@/components/DashboardStats";
import HowItWorks from "@/components/HowItWorks";

import { motion, useMotionValue, animate } from "framer-motion";

import { Luckiest_Guy } from "next/font/google";
const luckiestGuy = Luckiest_Guy({ subsets: ["latin"], weight: "400" });

const homePosters = [
  // "/posters/poster1.png",
  // "/posters/poster2.jpg",
  // "/posters/poster3.png",
  // "/posters/poster4.jpg"
  { image: "/posters/poster1.png", caption: "Legendary Collection" },
  { image: "/posters/poster2.jpg", caption: "Ultra Rare Charizard!" },
  { image: "/posters/poster3.png" }, // No caption, will fallback
  "/posters/poster4.jpg", // String is OK, just no caption
];


//  const customCaption = (
//     <div className="flex flex-col items-start">
//       <span className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg">
//         Welcome
//       </span>
//       <span className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold drop-shadow-md mt-2">
//         to the heaven
//       </span>
//       <span className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold drop-shadow-md mt-2">
//         of Pokemon Cards!
//       </span>
//       <span className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold drop-shadow-md mt-1">
//         Ready to dive?
//       </span>
//     </div>
//   );

const customCaption = (
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
      Welcome
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
      to the heaven
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
      of Pokemon Cards!
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
      Ready to dive?
    </span>
  </div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-zinc-700 via-zinc-500 to-zinc-400">
      {/* <Header /> */}
      
      <PosterCarousel 
        posters={homePosters}
        rotatingCard={{
            front: "/rotating/pikachu.png",
            back: "/rotating/back.png"
          }}
          showRotatingCard={true}  
          
          caption={customCaption}                   
      />
      
      <main className="flex-1 w-full max-w-[1320px] mx-auto px-2 md:px-8 space-y-14">
        
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          viewport={{ once: true, amount: 0.45 }}
        >
          <TopCardsSection />
        </motion.div>


        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: "tween" }}
          viewport={{ once: true, amount: 0.45 }}
        >
          <DashboardStats />
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, type: "spring" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <HowItWorks />
        </motion.div>
        
      </main>
      {/* <Footer /> */}
    </div>
  );
}