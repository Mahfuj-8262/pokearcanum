import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  return (
    <header className="w-full bg-white/80 backdrop-blur sticky top-0 z-50 shadow">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-2xl text-indigo-700 tracking-tight">
          <span>🃏</span> PokeArcanum
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/marketplace" className="px-4 py-2 text-indigo-700 hover:text-indigo-900 transition">Marketplace</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/signup">
                <Button size="sm" className="ml-6">Sign Up</Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/login">
                <Button variant="outline" size="sm">Log In</Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  );
}