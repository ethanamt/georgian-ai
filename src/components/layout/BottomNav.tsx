"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, RefreshCw, User } from "lucide-react";

const items = [
  { href: "/today", label: "Aujourd'hui", icon: Home },
  { href: "/lessons", label: "Leçons", icon: BookOpen },
  { href: "/review", label: "Révision", icon: RefreshCw },
  { href: "/profile", label: "Profil", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0e0e10]/95 backdrop-blur-2xl border-t border-white/6 safe-area-bottom">
      <div className="mx-auto flex max-w-2xl items-center justify-around">
        {items.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-1 flex-col items-center gap-1 py-3 transition-colors ${
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="size-4" />
              <span className="text-[9px] font-medium uppercase tracking-widest">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
