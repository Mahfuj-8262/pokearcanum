// app/about/page.tsx
"use client";

import Image from "next/image";
import logo from "@/../public/your-logo.png"

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-8">
      <div className="mb-8 text-center">
        <Image
          src={logo}
          alt="Pokémon Card Trading Logo"
          width={200}
          height={100}
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl font-extrabold text-yellow-500 mb-2 drop-shadow-lg">
          About PokéArcanum
        </h1>
        <p className="text-lg text-gray-100 max-w-xl mx-auto">
          Welcome to Pokémon Card Trader — the ultimate playground for Pokémon card collectors and traders!
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-amber-300 mb-2">Our Mission</h2>
        <p className="text-gray-100">
          Our goal is to bring together Pokémon enthusiasts from around the globe. Whether you're just starting out or you're a seasoned collector, our platform is built to help you trade, discover, and showcase your favorite Pokémon cards with ease and security.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-amber-300 mb-2">Why Trade With Us?</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-100">
          <li>🗃️ Catalog thousands of cards, from Base Set to the latest releases.</li>
          <li>🤝 Trade safely using verified user accounts and secure trade mechanisms.</li>
          <li>🔍 Search and filter to find the exact cards you want.</li>
          <li>🛡️ A friendly, community-focused experience for all fans.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-amber-300 mb-2">Meet the Team</h2>
        <p className="text-gray-100">
          Pokémon Card Trader was created by lifelong fans, collectors, and developers passionate about bringing more joy to the Pokémon TCG community. Whether you're in it for fun, for the thrill of a good trade, or for building the ultimate collection, we’re here to support your journey!
        </p>
      </section>

      <div className="mt-12 text-center">
        <p className="font-medium text-gray-100">
          Got feedback or want to get in touch? Contact us at
          <a href="mailto:hello@pokecards.com" className="text-indigo-700 hover:underline ml-1">
            hello@pokecards.com
          </a>
        </p>
      </div>
    </div>
  );
}