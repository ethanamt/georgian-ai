"use client";

import Link from "next/link";
import { User, Zap } from "lucide-react";

interface HeaderProps {
  streakDays?: number;
}

export function Header({ streakDays }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
        <Link href="/today" className="text-lg font-heading font-semibold">
          Georgian AI
        </Link>
        <div className="flex items-center gap-3">
          {streakDays !== undefined && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Zap className="size-4 text-amber-500" />
              <span>{streakDays}</span>
            </div>
          )}
          <Link href="/profile">
            <div className="flex size-8 items-center justify-center rounded-full bg-muted">
              <User className="size-4 text-muted-foreground" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
