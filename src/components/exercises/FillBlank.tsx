"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FillBlankProps {
  sentence: string;
  blankLabel: string;
  correctAnswer: string;
  hint?: string;
  onAnswer: (correct: boolean) => void;
}

export function FillBlank({
  sentence,
  blankLabel,
  correctAnswer,
  hint,
  onAnswer,
}: FillBlankProps) {
  const [value, setValue] = useState("");
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const correct = value.trim().toLowerCase() === correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setAnswered(true);
    setTimeout(() => onAnswer(correct), 1000);
  };

  const parts = sentence.split("___");

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-3">{blankLabel}</p>
        <p className="text-xl georgian-text leading-relaxed">
          {parts[0]}
          <span
            className={`inline-block min-w-[80px] border-b-2 px-2 mx-1 ${
              answered
                ? isCorrect
                  ? "border-green-500 text-green-600"
                  : "border-red-500 text-red-600"
                : "border-primary/50"
            }`}
          >
            {answered ? correctAnswer : value || "..."}
          </span>
          {parts[1]}
        </p>
      </div>

      {!answered && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Écrivez en géorgien..."
              className="text-center georgian-text text-lg"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              autoFocus
            />
          </div>
          {hint && (
            <p className="text-xs text-center text-muted-foreground">
              💡 {hint}
            </p>
          )}
          <Button
            className="w-full"
            size="lg"
            onClick={handleSubmit}
            disabled={!value.trim()}
          >
            Vérifier
          </Button>
        </div>
      )}

      {answered && (
        <p className="text-center text-sm text-muted-foreground">
          {isCorrect ? "✓ Correct !" : `✗ Réponse : ${correctAnswer}`}
        </p>
      )}
    </div>
  );
}
