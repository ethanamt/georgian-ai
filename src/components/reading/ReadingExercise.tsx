"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

interface ReadingExerciseProps {
  questions: Question[];
}

export function ReadingExercise({ questions }: ReadingExerciseProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIdx: number, optIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = submitted
    ? questions.filter((q, i) => answers[i] === q.correctIndex).length
    : 0;

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-muted-foreground">
        Compréhension du texte
      </p>

      {questions.map((q, qIdx) => {
        const selected = answers[qIdx];
        const isCorrect = selected === q.correctIndex;
        const showResult = submitted && selected !== undefined;

        return (
          <div key={qIdx} className="space-y-2">
            <p className="text-sm font-medium">{q.question}</p>
            <div className="grid grid-cols-1 gap-1.5">
              {q.options.map((opt, oIdx) => {
                const isSelected = selected === oIdx;
                let variant: "default" | "outline" | "secondary" = "outline";
                if (showResult && isSelected && isCorrect) variant = "default";
                else if (showResult && isSelected && !isCorrect)
                  variant = "secondary";

                return (
                  <Button
                    key={oIdx}
                    variant={variant}
                    size="sm"
                    className={`justify-start h-auto py-2 ${
                      showResult && oIdx === q.correctIndex && !isSelected
                        ? "ring-2 ring-green-500/50"
                        : ""
                    }`}
                    onClick={() => handleSelect(qIdx, oIdx)}
                    disabled={submitted}
                  >
                    {showResult && oIdx === q.correctIndex && (
                      <Check className="size-3.5 mr-1.5 text-green-600" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <X className="size-3.5 mr-1.5 text-red-600" />
                    )}
                    {opt}
                  </Button>
                );
              })}
            </div>
          </div>
        );
      })}

      {!submitted && (
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < questions.length}
        >
          Vérifier les réponses
        </Button>
      )}

      {submitted && (
        <div className="text-center py-3">
          <p className="text-lg font-heading font-semibold">
            {score}/{questions.length}
          </p>
          <p className="text-sm text-muted-foreground">
            {score === questions.length
              ? "Parfait !"
              : "Revenez au texte et réessayez"}
          </p>
        </div>
      )}
    </div>
  );
}
