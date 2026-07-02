"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { GeorgianLetter } from "@/types/alphabet";
import { Volume2 } from "lucide-react";

interface FlashcardProps {
  letter: GeorgianLetter;
  onRate?: (quality: number) => void;
  showRating?: boolean;
}

export default function Flashcard({
  letter,
  onRate,
  showRating = true,
}: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(letter.georgian);
      utterance.lang = "ka";
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <motion.div
        className="relative aspect-[3/4] cursor-pointer rounded-2xl border border-white/8 bg-[#0e0e10]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-7xl georgian-text mb-4">{letter.georgian}</span>
          <p className="text-xs text-muted-foreground">Cliquez pour voir</p>
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-2xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="font-heading text-2xl font-bold mb-1">{letter.name}</span>
          <span className="text-sm text-muted-foreground mb-1">{letter.transliteration}</span>
          <span className="text-xs text-muted-foreground mb-4">{letter.ipa}</span>
          <div className="text-center">
            <p className="text-xl georgian-text">{letter.wordExample}</p>
            <p className="text-xs text-muted-foreground">{letter.wordFrench}</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleSpeak(); }}
            className="mt-4 p-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
          >
            <Volume2 className="size-4" />
          </button>
        </div>
      </motion.div>

      {showRating && onRate && flipped && (
        <div className="mt-6 flex gap-2">
          <button onClick={() => onRate(1)} className="flex-1 rounded-full border border-white/10 py-3 text-xs transition-colors hover:bg-white/5">Encore</button>
          <button onClick={() => onRate(3)} className="flex-1 rounded-full border border-white/10 py-3 text-xs transition-colors hover:bg-white/5">Difficile</button>
          <button onClick={() => onRate(4)} className="flex-1 rounded-full border border-white/10 py-3 text-xs transition-colors hover:bg-white/5">Bien</button>
          <button onClick={() => onRate(5)} className="flex-1 rounded-full bg-white py-3 text-xs font-bold text-black transition-all hover:scale-[1.02]">Facile</button>
        </div>
      )}
    </div>
  );
}
