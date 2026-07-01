"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ExerciseSessionProps {
  children: (props: {
    onAnswer: (correct: boolean) => void;
    exerciseIndex: number;
  }) => React.ReactNode;
  totalExercises: number;
  onComplete: (score: number, total: number) => void;
}

export function ExerciseSession({
  children,
  totalExercises,
  onComplete,
}: ExerciseSessionProps) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = useCallback(
    (correct: boolean) => {
      if (correct) setScore((s) => s + 1);

      if (index < totalExercises - 1) {
        setTimeout(() => setIndex((i) => i + 1), 800);
      } else {
        setTimeout(() => {
          setFinished(true);
          onComplete(correct ? score + 1 : score, totalExercises);
        }, 800);
      }
    },
    [index, score, totalExercises, onComplete]
  );

  if (finished) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-2xl font-heading font-semibold">
          Exercice terminé !
        </p>
        <p className="text-4xl font-bold text-primary">
          {score}/{totalExercises}
        </p>
        <p className="text-muted-foreground">
          {score === totalExercises
            ? "Parfait !"
            : score >= totalExercises / 2
              ? "Bon travail !"
              : "Continuez à vous entraîner !"}
        </p>
        <Button onClick={() => { setIndex(0); setScore(0); setFinished(false); }}>
          Recommencer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            {index + 1} / {totalExercises}
          </span>
          <span>
            {score} bon
            {score > 1 ? "s" : ""}
          </span>
        </div>
        <Progress value={((index + 1) / totalExercises) * 100} className="h-1.5" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
        >
          {children({ onAnswer: handleAnswer, exerciseIndex: index })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
