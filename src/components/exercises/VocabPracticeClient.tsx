"use client";

import { useMemo } from "react";
import { QCM } from "./QCM";
import { ExerciseSession } from "./ExerciseSession";

interface VocabWord {
  id: string;
  georgian: string;
  french: string;
  difficulty: number;
}

interface VocabPracticeClientProps {
  words: VocabWord[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getAllWordsFlat(words: VocabWord[]): VocabWord[] {
  return words;
}

export function VocabPracticeClient({ words }: VocabPracticeClientProps) {
  const allWords = useMemo(() => getAllWordsFlat(words), [words]);

  const exercises = useMemo(() => {
    const selected = shuffle(allWords).slice(0, Math.min(10, allWords.length));
    return selected.map((correct) => {
      const distractors = shuffle(
        allWords.filter((w) => w.id !== correct.id)
      ).slice(0, 3);
      const options = shuffle([
        { id: correct.id, label: correct.french },
        ...distractors.map((d) => ({ id: d.id, label: d.french })),
      ]);
      return { correct, options };
    });
  }, [allWords]);

  const handleComplete = (_score: number, _total: number) => {};

  if (exercises.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        Pas assez de mots pour un exercice
      </p>
    );
  }

  return (
    <ExerciseSession totalExercises={exercises.length} onComplete={handleComplete}>
      {({ onAnswer, exerciseIndex }) => {
        const ex = exercises[exerciseIndex];
        if (!ex) return null;
        return (
          <QCM
            question="Que signifie ce mot ?"
            georgianText={ex.correct.georgian}
            options={ex.options}
            correctId={ex.correct.id}
            onAnswer={onAnswer}
            explanation={`${ex.correct.georgian} = ${ex.correct.french}`}
          />
        );
      }}
    </ExerciseSession>
  );
}
