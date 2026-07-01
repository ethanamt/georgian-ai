"use client";

import { useState } from "react";
import type { GeorgianLetter } from "@/types/alphabet";
import { Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LetterDetailProps {
  letter: GeorgianLetter;
}

export function LetterDetail({ letter }: LetterDetailProps) {
  const [open, setOpen] = useState(false);

  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(letter.georgian);
      utterance.lang = "ka";
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="aspect-square rounded-xl border border-border bg-card hover:shadow-md transition-shadow flex items-center justify-center"
      >
        <span className="text-2xl georgian-text">{letter.georgian}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="text-6xl georgian-text">
                  {letter.georgian}
                </span>
                <div>
                  <p className="text-xl font-heading font-semibold">
                    {letter.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {letter.transliteration} — {letter.ipa}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                    {letter.type === "vowel" ? "Voyelle" : "Consonne"}
                  </span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                    Difficulté {letter.difficulty}/3
                  </span>
                </div>
                <div className="mt-2 text-center">
                  <p className="text-xl georgian-text">{letter.wordExample}</p>
                  <p className="text-sm text-muted-foreground">
                    {letter.wordTransliteration} — {letter.wordFrench}
                  </p>
                </div>
                <button
                  onClick={handleSpeak}
                  className="mt-2 p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <Volume2 className="size-5 text-primary" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
