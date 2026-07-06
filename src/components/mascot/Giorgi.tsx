"use client";

import { useState, useCallback, useRef } from "react";

interface GiorgiProps {
  size?: number;
  className?: string;
  mood?: "idle" | "happy" | "think" | "celebrate" | "wave";
  showTip?: boolean;
}

const tips = [
  "Les Géorgiens écrivent de gauche à droite comme en français !",
  "ა (a) se prononce comme dans « arbre »",
  "Le géorgien a 33 lettres, pas de majuscules.",
  "En géorgien, le verbe se met à la fin de la phrase.",
  "ის (is) signifie il OU elle, pas de genre grammatical.",
  "მე (me) = je, mais on l'omet souvent à l'oral.",
  "Les nombres de 1 à 10 : ერთი, ორი, სამი, ოთხი, ხუთი, ექვსი, შვიდი, რვა, ცხრა, ათი",
  "Petit conseil : 15 min par jour, c'est mieux que 2h une fois par semaine.",
  "Salutation de base : გამარჯობა (gamardjoba) = Bonjour",
  "Merci se dit : გმადლობთ (gmadlobt)",
];

const moods = {
  idle: {
    eyes: `<circle cx="22" cy="28" r="3.5" fill="white"/><circle cx="42" cy="28" r="3.5" fill="white"/><circle cx="23" cy="27" r="1.5" fill="#070708"/><circle cx="43" cy="27" r="1.5" fill="#070708"/>`,
    mouth: `<path d="M26 38 Q32 42 38 38" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    brows: ``,
  },
  happy: {
    eyes: `<path d="M18 26 Q22 21 26 26" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M38 26 Q42 21 46 26" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    mouth: `<path d="M24 38 Q32 46 40 38" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    brows: ``,
  },
  think: {
    eyes: `<circle cx="22" cy="28" r="3" fill="white"/><circle cx="42" cy="28" r="3" fill="white"/><circle cx="23" cy="27" r="1.5" fill="#070708"/><circle cx="43" cy="27" r="1.5" fill="#070708"/>`,
    mouth: `<path d="M26 40 Q32 37 38 40" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    brows: `<path d="M16 20 Q22 16 28 20" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M36 20 Q42 16 48 20" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
  },
  celebrate: {
    eyes: `<path d="M18 26 Q22 22 26 26" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M38 26 Q42 22 46 26" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    mouth: `<path d="M24 36 Q32 44 40 36" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    brows: ``,
  },
  wave: {
    eyes: `<circle cx="22" cy="28" r="3.5" fill="white"/><circle cx="42" cy="28" r="3.5" fill="white"/><circle cx="23" cy="27" r="1.5" fill="#070708"/><circle cx="43" cy="27" r="1.5" fill="#070708"/>`,
    mouth: `<path d="M26 38 Q32 42 38 38" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    brows: ``,
  },
};

export function Giorgi({ size = 80, className = "", mood = "idle", showTip = false }: GiorgiProps) {
  const [currentMood, setCurrentMood] = useState(mood);
  const [tip, setTip] = useState<string | null>(null);
  const [showBubble, setShowBubble] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleClick = useCallback(() => {
    setCurrentMood("happy");
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
    setShowBubble(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowBubble(false);
      setCurrentMood("idle");
    }, 4000);
  }, []);

  const m = moods[currentMood] || moods.idle;

  return (
    <div className={`relative inline-flex ${className}`}>
      <button
        onClick={handleClick}
        className="cursor-pointer bg-transparent border-none p-0 outline-none transition-transform active:scale-90 hover:scale-105"
        aria-label="Cliquez sur Giorgi pour un conseil"
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          className="drop-shadow-[0_0_12px_rgba(255,255,255,0.06)]"
        >
          {/* Glow */}
          <circle cx="32" cy="32" r="30" stroke="white" strokeWidth="0.5" opacity="0.15" />

          {/* Body */}
          <ellipse cx="32" cy="50" rx="12" ry="8" fill="#0e0e10" stroke="white" strokeWidth="1.5" />

          {/* Chokha sash */}
          <rect x="24" y="46" width="16" height="3" rx="1.5" fill="white" opacity="0.15" />

          {/* Head */}
          <circle cx="32" cy="30" r="16" fill="#0e0e10" stroke="white" strokeWidth="1.5" />

          {/* Papakhi hat */}
          {currentMood === "celebrate" ? (
            <>
              <ellipse cx="32" cy="17" rx="14" ry="6" fill="white" />
              <ellipse cx="32" cy="17" rx="14" ry="6" fill="white" opacity="0.8" />
              <text x="32" y="20" textAnchor="middle" fill="#070708" fontSize="8" fontWeight="700">★</text>
            </>
          ) : (
            <ellipse cx="32" cy="17" rx="14" ry="6" fill="white" opacity="0.9" />
          )}

          {/* Brows */}
          {m.brows && <g dangerouslySetInnerHTML={{ __html: m.brows }} />}

          {/* Eyes */}
          <g dangerouslySetInnerHTML={{ __html: m.eyes }} />

          {/* Mouth */}
          <g dangerouslySetInnerHTML={{ __html: m.mouth }} />

          {/* Blush */}
          <circle cx="18" cy="34" r="3" fill="white" opacity="0.08" />
          <circle cx="46" cy="34" r="3" fill="white" opacity="0.08" />

          {/* Wave arm */}
          {currentMood === "wave" && (
            <g>
              <path d="M14 42 Q8 32 10 24" stroke="white" strokeWidth="2.5" fill="none" stroke-linecap="round">
                <animateTransform attributeName="transform" type="rotate" values="-10 14 42;10 14 42;-10 14 42" dur="1s" repeatCount="indefinite" />
              </path>
              <path d="M10 24 L8 20" stroke="white" strokeWidth="2.5" fill="none" stroke-linecap="round">
                <animateTransform attributeName="transform" type="rotate" values="-10 14 42;10 14 42;-10 14 42" dur="1s" repeatCount="indefinite" />
              </path>
            </g>
          )}

          {/* Celebrate stars */}
          {currentMood === "celebrate" && (
            <g>
              <text x="8" y="16" textAnchor="middle" fill="white" fontSize="6">✦</text>
              <text x="56" y="20" textAnchor="middle" fill="white" fontSize="4">✦</text>
              <text x="12" y="44" textAnchor="middle" fill="white" fontSize="3">✦</text>
              <animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="0.5s" repeatCount="indefinite" />
            </g>
          )}

          {/* Idle bounce */}
          {currentMood === "idle" && (
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="3s" repeatCount="indefinite" />
          )}
        </svg>
      </button>

      {/* Speech bubble */}
      {showBubble && tip && (
        <div className="absolute -top-2 left-full ml-2 z-50 animate-fade-in" style={{ width: "max(180px, 12vw)" }}>
          <div className="relative rounded-xl border border-white/10 bg-[#0e0e10] px-3 py-2 text-[11px] leading-relaxed text-muted-foreground shadow-lg">
            <div className="absolute left-0 top-3 -translate-x-1.5 rotate-45 size-2.5 border-l border-b border-white/10 bg-[#0e0e10]" />
            {tip}
          </div>
        </div>
      )}
    </div>
  );
}
