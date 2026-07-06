"use client";

import { useState } from "react";
import Flashcard from "./Flashcard";
import { reviewCard } from "@/server/actions/srs";
import type { SRSReviewResult } from "@/types";
import type { GeorgianLetter } from "@/types/alphabet";
import { getAlphabet } from "@/lib/alphabet";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewSessionProps {
  cards: SRSReviewResult[];
}

export function ReviewSession({ cards }: ReviewSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [results, setResults] = useState<{ cardId: string; quality: number }[]>([]);

  const alphabet = getAlphabet();
  const getLetter = (vocabId: string): GeorgianLetter | undefined =>
    alphabet.find((l) => l.id === vocabId);

  const currentCard = cards[currentIndex];
  const currentLetter = currentCard ? getLetter(currentCard.vocabularyId) : undefined;

  const handleRate = async (quality: number) => {
    if (!currentCard) return;
    try { await reviewCard(currentCard.cardId, quality); } catch {}
    setResults((prev) => [...prev, { cardId: currentCard.cardId, quality }]);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCompleted(true);
    }
  };

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-muted-foreground">Aucune carte à réviser aujourd&apos;hui.</p>
        <p className="text-xs text-muted-foreground mt-1">Revenez plus tard ou apprenez de nouvelles lettres.</p>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="font-heading text-xl font-bold">Révision terminée</p>
        <p className="text-sm text-muted-foreground">
          {results.length} carte{results.length > 1 ? "s" : ""} révisée{results.length > 1 ? "s" : ""}
        </p>
        <button
          onClick={() => { setCurrentIndex(0); setCompleted(false); setResults([]); }}
          className="rounded-full border border-white/15 px-6 py-2.5 text-sm transition-all hover:bg-white/5"
        >
          Recommencer
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.2 }}
      >
        {currentLetter ? (
          <Flashcard letter={currentLetter} onRate={handleRate} />
        ) : (
          <div className="text-center py-12">
            <p className="text-sm text-muted-foreground">Carte non trouvée</p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
