"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";

interface QCMOption {
  id: string;
  label: string;
}

interface QCMProps {
  question: string;
  georgianText?: string;
  options: QCMOption[];
  correctId: string;
  onAnswer: (correct: boolean) => void;
  explanation?: string;
}

export function QCM({
  question,
  georgianText,
  options,
  correctId,
  onAnswer,
  explanation,
}: QCMProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (id: string) => {
    if (answered) return;
    setSelectedId(id);
  };

  const handleValidate = () => {
    if (!selectedId || answered) return;
    setAnswered(true);
    const correct = selectedId === correctId;
    setTimeout(() => onAnswer(correct), 1200);
  };

  const handleSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ka";
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">{question}</p>
        {georgianText && (
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl georgian-text">{georgianText}</span>
            <button
              onClick={() => handleSpeak(georgianText)}
              className="p-1 rounded-full hover:bg-muted transition-colors"
            >
              <Volume2 className="size-4 text-primary" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          const isCorrect = opt.id === correctId;
          let variant: "default" | "outline" | "secondary" = "outline";
          if (answered && isSelected && isCorrect) variant = "default";
          else if (answered && isSelected && !isCorrect)
            variant = "secondary";

          return (
            <Button
              key={opt.id}
              variant={variant}
              className={`justify-start h-auto py-3 px-4 transition-all ${
                answered && isCorrect && !isSelected
                  ? "ring-2 ring-green-500/50"
                  : ""
              }`}
              onClick={() => handleSelect(opt.id)}
              disabled={answered}
            >
              {opt.label}
            </Button>
          );
        })}
      </div>

      {!answered && (
        <Button
          className="w-full"
          size="lg"
          onClick={handleValidate}
          disabled={!selectedId}
        >
          Valider
        </Button>
      )}

      {answered && explanation && (
        <p className="text-sm text-center text-muted-foreground">
          {explanation}
        </p>
      )}
    </div>
  );
}
