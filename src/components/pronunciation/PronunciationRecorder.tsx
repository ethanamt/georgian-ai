"use client";

import { useState, useRef, useCallback } from "react";
import { Mic, Square, Volume2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PronunciationRecorderProps {
  expectedText: string;
  expectedTransliteration: string;
  onResult?: (score: number, spoken: string) => void;
}

export function PronunciationRecorder({
  expectedText,
  expectedTransliteration,
  onResult,
}: PronunciationRecorderProps) {
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState<{
    spoken: string;
    score: number;
    wordsCorrect: number;
    wordsTotal: number;
  } | null>(null);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  const handleSpeak = useCallback(() => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(expectedText);
      utterance.lang = "ka";
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  }, [expectedText]);

  const startRecording = useCallback(() => {
    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      alert("La reconnaissance vocale n'est pas supportée par ce navigateur.");
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "ka-GE";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const spoken = event.results[0][0].transcript;
      const expectedWords = expectedText.split(/\s+/);
      const spokenWords = spoken.split(/\s+/);

      let correctCount = 0;
      for (const sw of spokenWords) {
        if (expectedWords.some((ew) => ew.toLowerCase() === sw.toLowerCase())) {
          correctCount++;
        }
      }

      const score = Math.round((correctCount / expectedWords.length) * 100);
      setResult({ spoken, score, wordsCorrect: correctCount, wordsTotal: expectedWords.length });
      onResult?.(score, spoken);
      setRecording(false);
    };

    recognition.onerror = () => setRecording(false);
    recognition.onend = () => setRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
    setRecording(true);
    setResult(null);
  }, [expectedText, onResult]);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setRecording(false);
  }, []);

  return (
    <div className="space-y-4 text-center">
      <div className="space-y-2">
        <p className="text-3xl georgian-text">{expectedText}</p>
        <p className="text-sm text-muted-foreground italic">
          {expectedTransliteration}
        </p>
        <button
          onClick={handleSpeak}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Volume2 className="size-3" />
          Écouter la prononciation
        </button>
      </div>

      <div className="flex justify-center gap-3">
        {!recording ? (
          <Button
            onClick={startRecording}
            size="lg"
            className="gap-2"
            disabled={!!result}
          >
            <Mic className="size-5" />
            Enregistrer
          </Button>
        ) : (
          <Button
            onClick={stopRecording}
            variant="secondary"
            size="lg"
            className="gap-2 animate-pulse"
          >
            <Square className="size-5" />
            Arrêter
          </Button>
        )}
        {result && (
          <Button
            variant="outline"
            size="lg"
            onClick={() => setResult(null)}
          >
            Réessayer
          </Button>
        )}
      </div>

      {recording && (
        <div className="flex items-center justify-center gap-2 text-sm text-red-500">
          <span className="size-2 rounded-full bg-red-500 animate-pulse" />
          Enregistrement en cours...
        </div>
      )}

      {result && (
        <div className="space-y-3 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold">{result.score}%</span>
            {result.score >= 80 ? (
              <Check className="size-5 text-green-500" />
            ) : (
              <X className="size-5 text-red-500" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {result.wordsCorrect}/{result.wordsTotal} mots reconnus correctement
          </p>
          <div className="text-sm">
            <span className="text-muted-foreground">Vous avez dit : </span>
            <span className="georgian-text">{result.spoken}</span>
          </div>
          {result.score < 80 && (
            <p className="text-xs text-muted-foreground">
              💡 Réécoutez le modèle et essayez de répéter plus lentement.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
