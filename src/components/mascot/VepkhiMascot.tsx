"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MascotState, pickMessage } from "./vepkhi.states";

interface VepkhiMascotProps {
  state: MascotState;
  size?: "sm" | "lg";
  className?: string;
  onAnimationEnd?: () => void;
}

const DIMENSIONS = { sm: 80, lg: 240 };

function HeadPaths({ state }: { state: MascotState }) {
  const earLeft = state === MascotState.Incorrect || state === MascotState.Struggling
    ? "M22 16 L18 6 L26 12 Z"
    : "M22 16 L18 4 L26 12 Z";
  const earRight = state === MascotState.Incorrect || state === MascotState.Struggling
    ? "M42 16 L46 6 L38 12 Z"
    : "M42 16 L46 4 L38 12 Z";

  return (
    <g>
      <motion.path
        d={earLeft}
        fill="none"
        stroke="white"
        strokeWidth="2"
        animate={{ d: earLeft }}
        transition={{ duration: 0.3 }}
      />
      <motion.path
        d={earRight}
        fill="none"
        stroke="white"
        strokeWidth="2"
        animate={{ d: earRight }}
        transition={{ duration: 0.3 }}
      />
      <path d="M22 18 Q16 28 18 40 Q18 52 32 56 Q46 52 46 40 Q48 28 42 18 Z" fill="#0e0e10" stroke="white" strokeWidth="1.5" />
      <path d="M24 28 L22 36" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 28 L42 36" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="28" cy="22" r="1.5" fill="white" opacity="0.4" />
      <circle cx="36" cy="20" r="1.5" fill="white" opacity="0.4" />
      <circle cx="32" cy="20" r="1" fill="white" opacity="0.3" />
      <circle cx="26" cy="48" r="1" fill="white" opacity="0.3" />
      <circle cx="38" cy="48" r="1" fill="white" opacity="0.3" />
      <path d="M20 38 L8 34" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M20 40 L6 40" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M20 42 L8 46" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M44 38 L56 34" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M44 40 L58 40" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M44 42 L56 46" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <motion.path
        d="M30 44 L34 44 L32 47 Z"
        fill="white"
        animate={state === MascotState.Speaking ? { scaleY: 0.6, translateY: 2 } : { scaleY: 1, translateY: 0 }}
        transition={{ duration: 0.15, repeat: state === MascotState.Speaking ? Infinity : 0, repeatType: "reverse" }}
        style={{ transformOrigin: "32px 45px" }}
      />
    </g>
  );
}

function EyesPaths({ state }: { state: MascotState }) {
  if (state === MascotState.Idle) {
    return (
      <g>
        <motion.g animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.48, 0.52, 1] }} style={{ transformOrigin: "26px 32px" }}>
          <circle cx="26" cy="32" r="3" fill="white" />
        </motion.g>
        <motion.g animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.48, 0.52, 1] }} style={{ transformOrigin: "38px 32px" }}>
          <circle cx="38" cy="32" r="3" fill="white" />
        </motion.g>
      </g>
    );
  }
  if (state === MascotState.Listening) {
    return (
      <g>
        <ellipse cx="26" cy="32" rx="2.5" ry="3.5" fill="white" />
        <ellipse cx="38" cy="32" rx="2.5" ry="3.5" fill="white" />
        <circle cx="26" cy="32" r="1" fill="#070708" />
        <circle cx="38" cy="32" r="1" fill="#070708" />
        <path d="M24 28 Q26 26 28 28" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
        <path d="M36 28 Q38 26 40 28" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
      </g>
    );
  }
  if (state === MascotState.Correct || state === MascotState.Streak) {
    return (
      <g>
        <path d="M23 32 Q26 29 29 32" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M35 32 Q38 29 41 32" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    );
  }
  if (state === MascotState.Incorrect || state === MascotState.Struggling) {
    return (
      <g>
        <circle cx="25" cy="33" r="2.5" fill="white" opacity="0.8" />
        <circle cx="39" cy="33" r="2.5" fill="white" opacity="0.8" />
        <circle cx="25" cy="33" r="1" fill="#070708" />
        <circle cx="39" cy="33" r="1" fill="#070708" />
        <path d="M24 36 Q26 38 28 36" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
        <path d="M36 36 Q38 38 40 36" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
      </g>
    );
  }
  return (
    <g>
      <circle cx="26" cy="32" r="3" fill="white" />
      <circle cx="38" cy="32" r="3" fill="white" />
      <circle cx="27" cy="31" r="1.2" fill="#070708" />
      <circle cx="39" cy="31" r="1.2" fill="#070708" />
    </g>
  );
}

function TailPath({ state }: { state: MascotState }) {
  const baseD = "M58 50 Q64 48 66 42 Q68 36 64 32";
  const liftD = "M58 46 Q66 42 68 34 Q70 28 66 24";
  const lowerD = "M58 52 Q62 52 64 48 Q66 44 62 42";
  const wagD = "M58 50 Q66 44 68 38 Q70 32 66 30";
  let target = baseD;
  if (state === MascotState.Streak || state === MascotState.LevelUp) target = liftD;
  else if (state === MascotState.Incorrect || state === MascotState.Struggling) target = lowerD;
  else if (state === MascotState.Correct) target = wagD;
  return <motion.path d={target} fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" animate={{ d: target }} transition={{ duration: 0.4, ease: "easeOut" }} />;
}

function BodyPath({ state }: { state: MascotState }) {
  const sitD = "M22 54 Q22 72 32 74 Q42 72 42 54 Z";
  const proudD = "M22 52 Q22 68 32 70 Q42 68 42 52 Z";
  const lowerD = "M24 56 Q24 74 32 76 Q40 74 40 56 Z";
  let target = sitD;
  if (state === MascotState.Streak || state === MascotState.LevelUp) target = proudD;
  else if (state === MascotState.Incorrect || state === MascotState.Struggling) target = lowerD;
  return <motion.path d={target} fill="#0e0e10" stroke="white" strokeWidth="1.5" animate={{ d: target }} transition={{ duration: 0.4, ease: "easeOut" }} />;
}

function BreathingBadge({ state }: { state: MascotState }) {
  if (state === MascotState.Speaking) {
    return (
      <motion.circle cx="32" cy="50" r="28" fill="none" stroke="white" strokeWidth="0.5" opacity="0.15"
        animate={{ r: [28, 32, 28], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
    );
  }
  if (state === MascotState.Listening) {
    return (
      <motion.circle cx="32" cy="50" r="28" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"
        animate={{ r: [28, 30, 28] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    );
  }
  return null;
}

export function VepkhiMascot({ state, size = "sm", className = "", onAnimationEnd }: VepkhiMascotProps) {
  const dim = DIMENSIONS[size];
  const message = pickMessage(state);

  return (
    <div className={`relative inline-flex ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          onAnimationComplete={onAnimationEnd}
        >
          <svg width={dim} height={dim} viewBox="0 0 72 72" fill="none" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.04)]">
            {state === MascotState.Idle && (
              <motion.g animate={{ translateY: [0, -1.5, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
                <BreathingBadge state={state} />
                <TailPath state={state} />
                <BodyPath state={state} />
                <HeadPaths state={state} />
                <EyesPaths state={state} />
              </motion.g>
            )}
            {state !== MascotState.Idle && (
              <motion.g
                animate={
                  state === MascotState.Streak || state === MascotState.LevelUp ? { translateY: -2 }
                  : state === MascotState.Incorrect || state === MascotState.Struggling ? { translateY: 1 }
                  : {}
                }
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <BreathingBadge state={state} />
                <TailPath state={state} />
                <BodyPath state={state} />
                <HeadPaths state={state} />
                <EyesPaths state={state} />
                {state === MascotState.LevelUp && (
                  <g opacity="0.6">
                    <motion.text x="8" y="16" textAnchor="middle" fill="white" fontSize="7"
                      animate={{ y: [16, 10, 16], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}>◆</motion.text>
                    <motion.text x="56" y="14" textAnchor="middle" fill="white" fontSize="5"
                      animate={{ y: [14, 8, 14], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}>◆</motion.text>
                  </g>
                )}
              </motion.g>
            )}
          </svg>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-1 left-full ml-2 z-50 w-40 pointer-events-none"
          >
            <div className="rounded-xl border border-white/10 bg-[#0e0e10]/95 backdrop-blur px-3 py-2 text-[11px] leading-relaxed text-muted-foreground shadow-lg">
              <div className="absolute left-0 top-3 -translate-x-1.5 rotate-45 size-2.5 border-l border-b border-white/10 bg-[#0e0e10]" />
              {message.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
