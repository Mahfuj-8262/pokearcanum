import Link from "next/link";
import { FaFacebook, FaYoutube, FaInstagram, FaXTwitter, FaPinterest } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-900 bg-neutral-800 shadow-inner ">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-10">
        {/* Left : links */}
        <div>
          <div className="text-2xl text-indigo-700 font-bold mb-2">PokéArcanum</div>
          <ul className="space-y-1 text-gray-700">
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            {/* Add more as needed */}
          </ul>
        </div>
        {/* Right : social */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="font-semibold mb-2 text-gray-700">Follow us:</div>
          <div className="flex gap-4 text-2xl text-indigo-600">
            <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://youtube.com/yourpage" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://x.com/yourpage" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
            <a href="https://pinterest.com/yourpage" target="_blank" rel="noopener noreferrer"><FaPinterest /></a>
          </div>
          <small className="text-xs text-gray-400 mt-2">&copy; {new Date().getFullYear()} PokeArcanum</small>
        </div>
      </div>
    </footer>
  );
}