"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { GeorgianLetter } from "@/types/alphabet";
import { Button } from "@/components/ui/button";
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
    <div className="perspective-[1000px] w-full max-w-sm mx-auto">
      <motion.div
        className="relative aspect-[3/4] cursor-pointer"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl border border-border bg-card shadow-lg flex flex-col items-center justify-center p-6"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-7xl georgian-text mb-4">
            {letter.georgian}
          </span>
          <p className="text-sm text-muted-foreground">Cliquez pour voir</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl border border-border bg-card shadow-lg flex flex-col items-center justify-center p-6"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="text-3xl font-heading font-semibold mb-1">
            {letter.name}
          </span>
          <span className="text-lg text-muted-foreground mb-1">
            {letter.transliteration}
          </span>
          <span className="text-sm text-muted-foreground mb-4">
            {letter.ipa}
          </span>
          <div className="text-center">
            <p className="text-2xl georgian-text">{letter.wordExample}</p>
            <p className="text-sm text-muted-foreground">
              {letter.wordFrench}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSpeak();
            }}
            className="mt-4 p-2 rounded-full hover:bg-muted transition-colors"
          >
            <Volume2 className="size-5 text-primary" />
          </button>
        </div>
      </motion.div>

      {showRating && onRate && flipped && (
        <div className="mt-6 flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRate(1)}
          >
            Encore
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRate(3)}
          >
            Difficile
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRate(4)}
          >
            Bien
          </Button>
          <Button
            size="sm"
            onClick={() => onRate(5)}
          >
            Facile
          </Button>
        </div>
      )}
    </div>
  );
}
