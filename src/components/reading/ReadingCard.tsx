"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";

interface ReadingCardProps {
  georgian: string;
  transliteration: string;
  french: string;
  showTranslation?: boolean;
}

export function ReadingCard({
  georgian,
  transliteration,
  french,
  showTranslation: initialShow = true,
}: ReadingCardProps) {
  const [showTranslation, setShowTranslation] = useState(initialShow);

  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(georgian);
      utterance.lang = "ka";
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <p className="georgian-text text-lg leading-relaxed flex-1">
          {georgian}
        </p>
        <button
          onClick={handleSpeak}
          className="shrink-0 p-1.5 rounded-full hover:bg-muted transition-colors"
        >
          <Volume2 className="size-4 text-primary" />
        </button>
      </div>
      <p className="text-sm italic text-muted-foreground">{transliteration}</p>
      {showTranslation && (
        <p className="text-sm font-medium text-foreground/80 border-t border-border pt-2">
          {french}
        </p>
      )}
    </div>
  );
}
