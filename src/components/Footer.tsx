import Link from "next/link";
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaXTwitter,
  FaPinterest,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-900 shadow-inner" style={{fontFamily: "'Golos Text', sans-serif",}}>
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-10 md:gap-16">
        {/* Links */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="text-2xl text-indigo-700 font-bold mb-2">PokéArcanum</div>
          <ul className="space-y-1 text-gray-200">
            <li>
              <Link href="/about" className="hover:text-amber-300 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-300 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-amber-300 transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-amber-300 transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        {/* Social & Copyright */}
        <div className="flex-1 flex flex-col items-center md:items-end gap-2">
          <div className="font-semibold mb-2 text-gray-300">Follow us:</div>
          <div className="flex gap-4 text-2xl">
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:text-blue-400 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://youtube.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:text-red-500 transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:text-pink-400 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:text-white transition-colors"
              aria-label="X/Twitter"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://pinterest.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:text-red-400 transition-colors"
              aria-label="Pinterest"
            >
              <FaPinterest />
            </a>
          </div>
          <small className="text-xs text-gray-400 mt-2 text-center md:text-right">
            &copy; {new Date().getFullYear()} PokéArcanum
          </small>
        </div>
      </div>
    </footer>
  );
}