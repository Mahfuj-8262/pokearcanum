"use client"

import PosterCarousel from "@/components/PosterCarousel";
import TopCardsSection from "@/components/TopCardsSection";
import DashboardStats from "@/components/DashboardStats";
import HowItWorks from "@/components/HowItWorks";

import { motion, useMotionValue, animate } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-zinc-700 via-zinc-500 to-zinc-400">
      {/* <Header /> */}
      
      <PosterCarousel />
      
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