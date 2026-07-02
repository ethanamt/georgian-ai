"use client";

import Link from "next/link";
import { User } from "lucide-react";

interface HeaderProps {
  streakDays?: number;
}

export function Header({ streakDays }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 glass">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
        <Link href="/today" className="font-heading text-base font-extrabold tracking-tight">
          G<span className="text-muted-foreground">.</span>
        </Link>
        <div className="flex items-center gap-4">
          {streakDays !== undefined && (
            <span className="text-xs text-muted-foreground">{streakDays}j</span>
          )}
          <Link
            href="/profile"
            className="flex size-8 items-center justify-center rounded-full border border-white/10 transition-colors hover:bg-white/5"
          >
            <User className="size-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
