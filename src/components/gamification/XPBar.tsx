"use client";

import { getLevel, getNextLevel } from "@/lib/achievements";
import { Progress } from "@/components/ui/progress";

interface XPBarProps {
  xp: number;
}

export function XPBar({ xp }: XPBarProps) {
  const currentLevel = getLevel(xp);
  const nextLevel = getNextLevel(xp);

  if (!nextLevel) {
    return (
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="font-medium">{currentLevel.title}</span>
          <span className="text-muted-foreground">Niveau max</span>
        </div>
        <Progress value={100} className="h-2" />
      </div>
    );
  }

  const currentXp = xp - currentLevel.xpRequired;
  const neededXp = nextLevel.xpRequired - currentLevel.xpRequired;
  const progress = Math.min(100, (currentXp / neededXp) * 100);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="font-medium">{currentLevel.title}</span>
        <span className="text-muted-foreground">
          Niv. {currentLevel.level}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>{xp} XP</span>
        <span>{nextLevel.xpRequired - xp} XP → {nextLevel.title}</span>
      </div>
    </div>
  );
}
