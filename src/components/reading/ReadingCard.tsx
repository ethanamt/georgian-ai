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
    <div className="rounded-2xl border border-white/8 bg-[#0e0e10] p-5 space-y-3 transition-all hover:border-white/15">
      <div className="flex items-start justify-between gap-2">
        <p className="georgian-text text-lg leading-relaxed flex-1">{georgian}</p>
        <button onClick={handleSpeak} className="shrink-0 p-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
          <Volume2 className="size-3.5" />
        </button>
      </div>
      <p className="text-sm italic text-muted-foreground">{transliteration}</p>
      {showTranslation && (
        <p className="text-sm text-muted-foreground/80 border-t border-white/10 pt-3">{french}</p>
      )}
    </div>
  );
}
