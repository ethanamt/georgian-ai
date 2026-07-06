"use client";

import { useState, useCallback } from "react";
import Flashcard from "./Flashcard";
import { reviewCard } from "@/server/actions/srs";
import type { SRSReviewResult } from "@/types";
import type { GeorgianLetter } from "@/types/alphabet";
import { getAlphabet } from "@/lib/alphabet";
import { motion, AnimatePresence } from "framer-motion";
import { VepkhiMascot } from "@/components/mascot/VepkhiMascot";
import { MascotState } from "@/components/mascot/vepkhi.states";
import { useMascotController } from "@/components/mascot/useMascotController";

interface ReviewSessionProps {
  cards: SRSReviewResult[];
}

export function ReviewSession({ cards }: ReviewSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [results, setResults] = useState<{ cardId: string; quality: number }[]>([]);
  const [streak, setStreak] = useState(0);
  const mascot = useMascotController(MascotState.Idle);

  const alphabet = getAlphabet();
  const getLetter = (vocabId: string): GeorgianLetter | undefined =>
    alphabet.find((l) => l.id === vocabId);

  const currentCard = cards[currentIndex];
  const currentLetter = currentCard ? getLetter(currentCard.vocabularyId) : undefined;

  const handleRate = useCallback(async (quality: number) => {
    if (!currentCard) return;

    try { await reviewCard(currentCard.cardId, quality); } catch {}

    setResults((prev) => [...prev, { cardId: currentCard.cardId, quality }]);

    // quality >= 4 = correct (Bien/Facile), <= 3 = incorrect (Encore/Difficile)
    if (quality >= 4) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      mascot.reactTo("correct", newStreak);
    } else {
      setStreak(0);
      mascot.reactTo("incorrect");
    }

    if (currentIndex < cards.length - 1) {
      setTimeout(() => setCurrentIndex((i) => i + 1), 600);
    } else {
      setTimeout(() => {
        setCompleted(true);
        mascot.reactTo("complete");
      }, 600);
    }
  }, [currentCard, currentIndex, cards.length, streak, mascot]);

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
      <div className="text-center py-12 space-y-6">
        <VepkhiMascot state={MascotState.LevelUp} size="lg" />
        <p className="font-heading text-xl font-bold">Révision terminée</p>
        <p className="text-sm text-muted-foreground">
          {results.length} carte{results.length > 1 ? "s" : ""} révisée{results.length > 1 ? "s" : ""}
        </p>
        <button
          onClick={() => { setCurrentIndex(0); setCompleted(false); setResults([]); setStreak(0); mascot.setState(MascotState.Idle); }}
          className="rounded-full border border-white/15 px-6 py-2.5 text-sm transition-all hover:bg-white/5"
        >
          Recommencer
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Vepkhi corner */}
      <div className="absolute -top-12 right-0 z-10">
        <VepkhiMascot state={mascot.state} size="sm" />
      </div>

      {/* Streak indicator */}
      {streak >= 3 && (
        <div className="absolute -top-10 left-0 z-10">
          <div className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-muted-foreground">
            {streak} →
          </div>
        </div>
      )}

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
    </div>
  );
}
