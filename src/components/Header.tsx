"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { href: "/", text: "Home" },
  { href: "/marketplace", text: "Marketplace" },
  { href: "/pokemon-legends", text: "Pokemon Legends" },
  { href: "/about", text: "About Us" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-slate-600 text-white shadow sticky top-0 z-50" style={{fontFamily: "'Golos Text', sans-serif",}}>
      <nav className="container mx-auto flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-2xl text-amber-300 tracking-tight mr-2 md:mr-4 xl:mr-6"
        >
          <img src="https://mafustorage.blob.core.windows.net/pokearcanumblob/pokearcanum-logo/your-logo.png" alt="PokéArcanum" className="h-12 w-auto" />
          <span>PokéArcanum</span>
        </Link>


        <ul className="hidden md:flex items-center gap-0.5 md:gap-0.5 lg:gap-2 xl:gap-4 text-xs md:text-xs lg:text-base whitespace-nowrap ml-3 md:ml-5 lg:ml-8">
          {navLinks.map(link => (
            <li key={link.text}>
              <Link
                href={link.href}
                className="px-1 md:px-1 lg:px-2 py-1 hover:bg-slate-500 rounded transition"
              >
                {link.text}
              </Link>
            </li>
          ))}
          {!isAuthenticated ? (
            <>
              <li>
                <Link href="/sign-up">
                  <Button size="sm" className="ml-0.5 lg:ml-2 text-xs lg:text-sm">
                    Sign Up
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/sign-in">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-slate-950 ml-0.5 text-xs lg:text-sm"
                  >
                    Sign In
                  </Button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/dashboard">
                  <Button
                    size="sm"
                    className="ml-0.5 lg:ml-2 text-xs lg:text-sm bg-yellow-400 text-black hover:bg-yellow-500"
                  >
                    {user?.userName || "My Account"}
                  </Button>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    window.location.href = "/";
                  }}
                  className="ml-0.5 lg:ml-2 text-xs lg:text-sm bg-red-500 text-white hover:bg-red-600 px-3 py-1.5 rounded"
                >
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>


        {/* Hamburger button (mobile only) */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded hover:bg-slate-500 transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Open menu"
        >
          <span className="sr-only">Open menu</span>
          {/* Hamburger icon */}
          <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* MOBILE SIDEBAR-MENU */}
        {mobileMenuOpen && (
          <div
            className={`fixed inset-0 z-40 md:hidden flex justify-end`}
          >
            {/* Overlay with fade-in transition */}
            <div
              className={`absolute inset-0 bg-slate-950/70 transition-opacity duration-300`}
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transitionProperty: "opacity",
              }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Side Drawer with slide-in effect */}
            <nav
              // We mount it always, but animate translateX for slide
              className={`relative bg-slate-700 w-60 h-full p-6 shadow-lg flex flex-col
                transition-transform duration-300
                ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
                `}
              style={{
                right: 0,
                transform: mobileMenuOpen ? "translateX(0%)" : "translateX(100%)",
                transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="self-end mb-6"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                {/* X icon */}
                <svg className="h-8 w-8 text-slate-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Nav Links */}
              <ul className="flex-1 flex flex-col gap-4">
                {navLinks.map(link => (
                  <li key={link.text}>
                    <Link
                      href={link.href}
                      className="block text-base px-2 py-2 rounded hover:bg-slate-500 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
                {!isAuthenticated ? (
                  <>
                    <li>
                      <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                        <Button size="sm" className="w-full mt-3">
                          Sign Up
                        </Button>
                      </Link>
                    </li>
                    <li>
                      <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-slate-950 mt-1"
                        >
                          Sign In
                        </Button>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                        <Button
                          size="sm"
                          className="w-full mt-3 bg-yellow-400 text-black hover:bg-yellow-500"
                        >
                          {user?.userName || "My Account"}
                        </Button>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                          window.location.href = "/";
                        }}
                        className="w-full mt-3 bg-red-500 text-white py-2 rounded hover:bg-red-600 font-bold"
                      >
                        Log Out
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        )}
      </nav>
    </header>
  );
}