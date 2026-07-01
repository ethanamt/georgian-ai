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
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background safe-area-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around py-1">
        {items.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors"
            >
              <Icon
                className={`size-5 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-[10px] ${
                  isActive
                    ? "font-medium text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
