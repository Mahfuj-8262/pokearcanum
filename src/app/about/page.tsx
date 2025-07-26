// app/about/page.tsx
"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-8">
      <div className="mb-8 text-center">
        <Image
          src="/pokemon-logo.png"
          alt="Pokémon Card Trading Logo"
          width={180}
          height={70}
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl font-extrabold text-yellow-500 mb-2 drop-shadow-lg">
          About Pokémon Card Trader
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Welcome to Pokémon Card Trader — the ultimate playground for Pokémon card collectors and traders!
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-700 mb-2">Our Mission</h2>
        <p className="text-gray-800">
          Our goal is to bring together Pokémon enthusiasts from around the globe. Whether you're just starting out or you're a seasoned collector, our platform is built to help you trade, discover, and showcase your favorite Pokémon cards with ease and security.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-700 mb-2">Why Trade With Us?</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-800">
          <li>🗃️ Catalog thousands of cards, from Base Set to the latest releases.</li>
          <li>🤝 Trade safely using verified user accounts and secure trade mechanisms.</li>
          <li>🔍 Search and filter to find the exact cards you want.</li>
          <li>🛡️ A friendly, community-focused experience for all fans.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-700 mb-2">Meet the Team</h2>
        <p className="text-gray-800">
          Pokémon Card Trader was created by lifelong fans, collectors, and developers passionate about bringing more joy to the Pokémon TCG community. Whether you're in it for fun, for the thrill of a good trade, or for building the ultimate collection, we’re here to support your journey!
        </p>
      </section>

      <div className="mt-12 text-center">
        <p className="font-medium text-gray-600">
          Got feedback or want to get in touch? Contact us at
          <a href="mailto:hello@pokecards.com" className="text-blue-500 hover:underline ml-1">
            hello@pokecards.com
          </a>
        </p>
      </div>
    </div>
  );
}