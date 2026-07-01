"use client";

import { useState, useCallback } from "react";
import { Volume2, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

interface ListeningExerciseProps {
  text: string;
  translation: string;
  questions: Question[];
}

export function ListeningExercise({
  text,
  translation,
  questions,
}: ListeningExerciseProps) {
  const [playing, setPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handlePlay = useCallback(() => {
    if (playing) {
      window.speechSynthesis?.cancel();
      setPlaying(false);
      return;
    }
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ka";
      utterance.rate = 0.7;
      utterance.onend = () => setPlaying(false);
      window.speechSynthesis.speak(utterance);
      setPlaying(true);
    }
  }, [text, playing]);

  const handleSelect = (qIdx: number, optIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmit = () => setSubmitted(true);

  const score = submitted
    ? questions.filter((q, i) => answers[i] === q.correctIndex).length
    : 0;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <button
          onClick={handlePlay}
          className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity"
        >
          {playing ? (
            <Pause className="size-6" />
          ) : (
            <Volume2 className="size-6" />
          )}
        </button>
        <p className="text-sm text-muted-foreground">
          {playing ? "Lecture en cours..." : "Appuyez pour écouter"}
        </p>
        {showTranslation && (
          <p className="text-sm italic text-muted-foreground border-t border-border pt-3">
            {translation}
          </p>
        )}
        {!showTranslation && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTranslation(true)}
            className="text-xs"
          >
            Afficher la traduction
          </Button>
        )}
      </div>

      <div className="space-y-4 border-t border-border pt-4">
        <p className="text-sm font-medium text-muted-foreground">
          Compréhension orale
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
              {score === questions.length ? "Parfait !" : "Réécoutez et réessayez"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
