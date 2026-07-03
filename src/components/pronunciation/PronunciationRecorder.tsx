"use client";

import { useState, useRef, useCallback } from "react";
import { Mic, Square, Volume2, Check, X, AlertTriangle } from "lucide-react";

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
  const [error, setError] = useState<string | null>(null);
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
    setError(null);
    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setError("Reconnaissance vocale non supportée. Essayez Chrome ou Edge.");
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "ka-GE";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    let timedOut = true;
    const timeout = setTimeout(() => {
      if (timedOut) {
        recognition.stop();
        setError("Aucune parole détectée. Parlez à voix haute dans le micro.");
        setRecording(false);
      }
    }, 8000);

    recognition.onresult = (event: any) => {
      timedOut = false;
      clearTimeout(timeout);
      if (!event.results?.[0]?.[0]) return;
      const spoken = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence ?? 1;
      const expectedWords = expectedText.split(/\s+/);
      const spokenWords = spoken.split(/\s+/);

      let correctCount = 0;
      for (const sw of spokenWords) {
        if (expectedWords.some((ew) => ew.toLowerCase() === sw.toLowerCase())) {
          correctCount++;
        }
      }

      const score = Math.round((correctCount / expectedWords.length) * 100 * confidence);
      setResult({ spoken, score, wordsCorrect: correctCount, wordsTotal: expectedWords.length });
      onResult?.(score, spoken);
      setRecording(false);
    };

    recognition.onerror = (event: any) => {
      timedOut = false;
      clearTimeout(timeout);
      const msg = event.error === "language-not-supported"
        ? "Le géorgien n'est pas supporté par votre navigateur. Essayez Chrome avec le pack de langue géorgien installé."
        : event.error === "no-speech"
        ? "Aucune parole détectée."
        : event.error === "aborted"
        ? "Enregistrement interrompu."
        : event.error === "audio-capture"
        ? "Micro introuvable."
        : "Erreur: " + event.error;
      setError(msg);
      setRecording(false);
    };

    recognition.onend = () => setRecording(false);

    try {
      recognitionRef.current = recognition;
      recognition.start();
      setRecording(true);
      setResult(null);
    } catch (e) {
      setError("Impossible de démarrer la reconnaissance vocale.");
      setRecording(false);
    }
  }, [expectedText, onResult]);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setRecording(false);
  }, []);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-white/8 bg-[#0e0e10] p-6 text-center space-y-3">
        <p className="text-3xl georgian-text">{expectedText}</p>
        <p className="text-sm text-muted-foreground italic">{expectedTransliteration}</p>
        <button
          onClick={handleSpeak}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-xs text-muted-foreground transition-all hover:border-white/30 hover:text-foreground"
        >
          <Volume2 className="size-3" />
          Écouter la prononciation
        </button>
      </div>

      <div className="flex justify-center gap-3">
        {!recording ? (
          <button
            onClick={startRecording}
            disabled={!!result}
            className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_24px_rgba(255,255,255,.1)] disabled:opacity-50"
          >
            <Mic className="size-4 inline mr-2" />
            Enregistrer
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium transition-all hover:bg-white/5"
          >
            <Square className="size-4 inline mr-2" />
            Arrêter
          </button>
        )}
        {result && (
          <button
            onClick={() => setResult(null)}
            className="rounded-full border border-white/10 px-6 py-3 text-sm transition-all hover:border-white/30"
          >
            Réessayer
          </button>
        )}
      </div>

      {recording && (
        <div className="flex items-center justify-center gap-2 text-sm text-red-400">
          <span className="size-2 rounded-full bg-red-400 animate-pulse" />
          Enregistrement...
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-2xl border border-white/10 bg-[#0e0e10] p-4 text-sm text-muted-foreground">
          <AlertTriangle className="size-4 shrink-0 mt-0.5 text-warning" />
          {error}
        </div>
      )}

      {result && (
        <div className="rounded-2xl border border-white/8 bg-[#0e0e10] p-6 text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="font-heading text-3xl font-bold">{result.score}%</span>
            {result.score >= 80 ? (
              <Check className="size-5 text-green-500" />
            ) : (
              <X className="size-5 text-red-500" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {result.wordsCorrect}/{result.wordsTotal} mots reconnus
          </p>
          {result.spoken && (
            <div className="text-sm">
              <span className="text-muted-foreground">Vous avez dit : </span>
              <span className="georgian-text">{result.spoken}</span>
            </div>
          )}
          {result.score < 80 && (
            <p className="text-xs text-muted-foreground">
              Réécoutez le modèle et essayez de répéter plus lentement.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
