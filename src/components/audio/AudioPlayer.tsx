"use client";

import { useState, useRef } from "react";
import { Volume2, Pause } from "lucide-react";

interface AudioPlayerProps {
  text: string;
  lang?: string;
}

export default function AudioPlayer({
  text,
  lang = "ka",
}: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handlePlay = () => {
    if (playing && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;
      utterance.onend = () => setPlaying(false);
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setPlaying(true);
    }
  };

  return (
    <button
      onClick={handlePlay}
      className="p-2 rounded-full hover:bg-muted transition-colors"
    >
      {playing ? (
        <Pause className="size-5 text-primary" />
      ) : (
        <Volume2 className="size-5 text-primary" />
      )}
    </button>
  );
}
