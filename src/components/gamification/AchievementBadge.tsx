"use client";

import { Award } from "lucide-react";

interface AchievementBadgeProps {
  icon: string;
  title: string;
  description: string;
  unlocked?: boolean;
  compact?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  "book-open": <Award className="size-5" />,
  zap: <Award className="size-5" />,
  alphabet: <Award className="size-5" />,
  book: <Award className="size-5" />,
  "refresh-cw": <Award className="size-5" />,
  target: <Award className="size-5" />,
};

export function AchievementBadge({
  icon,
  title,
  description,
  unlocked = false,
  compact = false,
}: AchievementBadgeProps) {
  if (compact) {
    return (
      <div
        className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${
          unlocked
            ? "border-primary/30 bg-primary/5"
            : "border-border opacity-50"
        }`}
      >
        <div
          className={`shrink-0 ${
            unlocked ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {iconMap[icon] || <Award className="size-5" />}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium truncate">{title}</p>
          <p className="text-[10px] text-muted-foreground truncate">
            {unlocked ? description : "🔒 Verrouillé"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border p-4 text-center transition-all ${
        unlocked
          ? "border-primary/30 bg-primary/5"
          : "border-border opacity-50"
      }`}
    >
      <div
        className={`mx-auto mb-2 flex size-10 items-center justify-center rounded-full ${
          unlocked ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}
      >
        {iconMap[icon] || <Award className="size-5" />}
      </div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">
        {unlocked ? description : "🔒 Verrouillé"}
      </p>
    </div>
  );
}
