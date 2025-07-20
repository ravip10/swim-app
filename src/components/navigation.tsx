"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Target,
  Search
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: TrendingUp },
  { name: "Swimmers", href: "/swimmers", icon: Users },
  { name: "Meets", href: "/meets", icon: Trophy },
  { name: "Rankings", href: "/rankings", icon: BarChart3 },
  { name: "Standards", href: "/standards", icon: Target },
  { name: "Search", href: "/search", icon: Search },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">ST</span>
              </div>
              <span className="font-semibold text-lg">SwimTracker</span>
            </Link>
            <Badge variant="outline" className="hidden sm:inline-flex text-xs">
              Beta
            </Badge>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center space-x-2 h-9"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-9">
              Import Data
            </Button>
            <Button size="sm" className="h-9">
              Add Swimmer
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
} 