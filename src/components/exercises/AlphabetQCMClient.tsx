"use client";

import { useMemo } from "react";
import type { GeorgianLetter } from "@/types/alphabet";
import { QCM } from "./QCM";
import { ExerciseSession } from "./ExerciseSession";

interface AlphabetQCMClientProps {
  letters: GeorgianLetter[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function AlphabetQCMClient({ letters }: AlphabetQCMClientProps) {
  const exercises = useMemo(() => {
    const selected = shuffle(letters).slice(0, 10);
    return selected.map((correct) => {
      const distractors = shuffle(
        letters.filter((l) => l.id !== correct.id)
      ).slice(0, 3);
      const options = shuffle([
        { id: correct.id, label: correct.name },
        ...distractors.map((d) => ({ id: d.id, label: d.name })),
      ]);
      return { correct, options };
    });
  }, [letters]);

  const handleComplete = (score: number, total: number) => {
    // Could save to Supabase here
  };

  return (
    <ExerciseSession totalExercises={exercises.length} onComplete={handleComplete}>
      {({ onAnswer, exerciseIndex }) => {
        const ex = exercises[exerciseIndex];
        if (!ex) return null;
        return (
          <QCM
            question="Quel est le nom de cette lettre ?"
            georgianText={ex.correct.georgian}
            options={ex.options}
            correctId={ex.correct.id}
            onAnswer={onAnswer}
            explanation={`${ex.correct.name} — ${ex.correct.transliteration} (${ex.correct.ipa})`}
          />
        );
      }}
    </ExerciseSession>
  );
}
