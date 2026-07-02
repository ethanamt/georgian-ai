"use client";

import Link from "next/link";
import { User, Zap, BookOpen } from "lucide-react";

interface HeaderProps {
  streakDays?: number;
}

export function Header({ streakDays }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-2.5">
        <Link href="/today" className="group flex items-center gap-2">
          <div className="card-gradient flex size-8 items-center justify-center rounded-lg text-sm font-bold text-primary-foreground shadow-button">
            G
          </div>
          <span className="text-base font-heading font-semibold tracking-tight">
            Georgian AI
          </span>
        </Link>
        <div className="flex items-center gap-2.5">
          {streakDays !== undefined && (
            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
              <Zap className="size-3.5" />
              <span>{streakDays}</span>
            </div>
          )}
          <Link
            href="/profile"
            className="flex size-8 items-center justify-center rounded-full bg-muted transition-colors hover:bg-secondary"
          >
            <User className="size-4 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </header>
  );
}
