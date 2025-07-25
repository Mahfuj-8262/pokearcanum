import Link from "next/link";
import Image from "next/image";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import logo from "@/../public/your-logo.png"; // Place your logo in public/your-logo.png

export default function Header() {
  return (
    <header className="bg-slate-600 text-white shadow sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between py-3 px-8">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-2xl text-amber-300 tracking-tight">
          <Image src={logo} alt="PokéArcanum" height={48} />
          <span>PokéArcanum</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem><Link href="/" className="px-2 py-1">Home</Link></NavigationMenuItem>
            <NavigationMenuItem><Link href="/marketplace" className="px-2 py-1">Marketplace</Link></NavigationMenuItem>
            <NavigationMenuItem><Link href="/pokemon-legends" className="px-2 py-1">Pokemon Legends</Link></NavigationMenuItem>
            <NavigationMenuItem><Link href="/about" className="px-2 py-1">About Us</Link></NavigationMenuItem>
            <NavigationMenuItem><Link href="/signup" className="px-2 py-1"><Button size="sm">Sign Up</Button></Link></NavigationMenuItem>
            <NavigationMenuItem><Link href="/login" className="px-2 py-1"><Button size="sm" variant="outline" className="text-slate-950">Sign In</Button></Link></NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  );
}