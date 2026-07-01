"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MatchPair {
  id: string;
  left: string;
  right: string;
}

interface MatchingProps {
  pairs: MatchPair[];
  onComplete: (score: number, total: number) => void;
}

export function Matching({ pairs, onComplete }: MatchingProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<string[]>([]);

  const handleLeftClick = (id: string) => {
    if (matched[id]) return;
    setSelectedLeft(id);
  };

  const handleRightClick = (rightLabel: string) => {
    if (!selectedLeft) return;
    const pair = pairs.find((p) => p.id === selectedLeft);
    if (!pair) return;

    const isCorrect = pair.right === rightLabel;
    if (isCorrect) {
      setMatched((prev) => ({ ...prev, [selectedLeft]: rightLabel }));
      setSelectedLeft(null);
      setErrors([]);

      if (Object.keys(matched).length + 1 === pairs.length) {
        setTimeout(() => onComplete(Object.keys(matched).length + 1, pairs.length), 500);
      }
    } else {
      setErrors((prev) => [...prev, selectedLeft]);
      setTimeout(() => {
        setErrors([]);
        setSelectedLeft(null);
      }, 600);
    }
  };

  const unpairedRight = pairs.filter(
    (p) => !Object.values(matched).includes(p.right)
  );

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center">
        Associez chaque élément
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          {pairs.map((pair) => {
            const isSelected = selectedLeft === pair.id;
            const isMatched = !!matched[pair.id];
            const isError = errors.includes(pair.id);
            return (
              <button
                key={pair.id}
                onClick={() => handleLeftClick(pair.id)}
                disabled={isMatched}
                className={`w-full rounded-xl border px-4 py-3 text-center transition-all georgian-text text-lg ${
                  isMatched
                    ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                    : isError
                      ? "border-red-500 bg-red-50 dark:bg-red-950/20 animate-shake"
                      : isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/50"
                }`}
              >
                {pair.left}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {unpairedRight.map((pair) => (
            <button
              key={pair.id}
              onClick={() => handleRightClick(pair.right)}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-center transition-all hover:border-primary/50"
            >
              {pair.right}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
