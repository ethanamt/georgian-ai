"use client";

interface GiorgiProps {
  size?: number;
  className?: string;
  variant?: "wave" | "happy" | "think" | "teach";
}

export function Giorgi({ size = 80, className = "", variant = "wave" }: GiorgiProps) {
  const eyes = variant === "happy"
    ? `<path d="M22 32 Q26 28 30 32" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>
       <path d="M42 32 Q46 28 50 32" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>`
    : variant === "think"
    ? `<circle cx="26" cy="30" r="2.5" fill="white"/>
       <circle cx="46" cy="30" r="2.5" fill="white"/>
       <circle cx="36" cy="22" r="6" fill="none" stroke="white" stroke-width="1.5" stroke-dasharray="3 2"/>`
    : `<circle cx="26" cy="32" r="3" fill="white"/>
       <circle cx="46" cy="32" r="3" fill="white"/>
       <circle cx="27" cy="31" r="1" fill="#070708"/>
       <circle cx="47" cy="31" r="1" fill="#070708"/>`;

  const mouth = variant === "happy"
    ? `<path d="M30 42 Q36 48 42 42" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>`
    : variant === "think"
    ? `<path d="M30 44 Q36 40 42 44" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round"/>`
    : `<path d="M32 42 Q36 46 40 42" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>`;

  const arm = variant === "wave"
    ? `<path d="M10 48 Q4 38 6 28" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round"/>
       <path d="M6 28 L4 24" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round"/>`
    : `<path d="M12 48 Q8 44 10 40" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      className={className}
      aria-label="Giorgi"
    >
      <circle cx="36" cy="36" r="30" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" />
      <circle cx="36" cy="34" r="18" fill="#0e0e10" stroke="white" strokeWidth="1.5" />
      <g dangerouslySetInnerHTML={{ __html: eyes }} />
      <g dangerouslySetInnerHTML={{ __html: mouth }} />
      <g dangerouslySetInnerHTML={{ __html: arm }} />
      {variant === "teach" && (
        <text x="36" y="62" textAnchor="middle" fill="white" fontSize="8" fontFamily="inherit" fontWeight="600">
          გ
        </text>
      )}
    </svg>
  );
}
