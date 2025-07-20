import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-indigo-100 py-6 text-center text-gray-600 text-sm bg-white/80 shadow">
      &copy; {new Date().getFullYear()} PokeArcanum. Built with 💙 for TCG fans.
      &bull; <Link href="/about" className="underline hover:text-indigo-700">About</Link>
      &bull; <Link href="/contact" className="underline hover:text-indigo-700">Contact</Link>
    </footer>
  );
}