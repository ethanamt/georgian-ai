"use client";

import { useState } from "react";
import type { GeorgianLetter } from "@/types/alphabet";
import { WritingCanvas } from "./WritingCanvas";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Volume2 } from "lucide-react";

interface WritingPracticeProps {
  letters: GeorgianLetter[];
}

export function WritingPractice({ letters }: WritingPracticeProps) {
  const [index, setIndex] = useState(0);
  const current = letters[index];
  const hasPrev = index > 0;
  const hasNext = index < letters.length - 1;

  const handleSpeak = () => {
    if (!current || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(current.georgian);
    utterance.lang = "ka";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  if (!current) return null;

  return (
    <div className="flex flex-col min-h-[60vh]">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          <span className="text-5xl georgian-text">{current.georgian}</span>
          <button
            onClick={handleSpeak}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <Volume2 className="size-5 text-primary" />
          </button>
        </div>
        <p className="text-lg font-heading font-semibold">{current.name}</p>
        <p className="text-sm text-muted-foreground">
          {current.transliteration} — {current.ipa}
        </p>
      </div>

      <div className="flex-1" />

      <WritingCanvas key={current.id} guideLetter={current.georgian} />

      <div className="flex-1" />

      <div className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="gap-1"
        >
          <ArrowLeft className="size-4" />
          Précédent
        </Button>
        <span className="text-xs text-muted-foreground">
          {index + 1} / {letters.length}
        </span>
        <Button
          size="sm"
          onClick={() => setIndex((i) => Math.min(letters.length - 1, i + 1))}
          disabled={index === letters.length - 1}
          className="gap-1"
        >
          Suivant
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
