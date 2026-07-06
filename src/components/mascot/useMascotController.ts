"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  MascotState,
  getMascotDuration,
  resolvePriority,
} from "./vepkhi.states";

export interface MascotController {
  state: MascotState;
  message: string | null;
  setState: (state: MascotState) => void;
  reactTo: (event: "correct" | "incorrect" | "start" | "complete", streak?: number) => void;
  onEnd: () => void;
}

export function useMascotController(
  initial: MascotState = MascotState.Idle,
): MascotController {
  const [state, setState] = useState<MascotState>(initial);
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
  }, []);

  const safeSetState = useCallback(
    (next: MascotState) => {
      clearTimers();
      setState((prev) => {
        const resolved = resolvePriority(prev, next);

        const { MASCOT_MESSAGES } = require("./vepkhi.states");
        const msgs = MASCOT_MESSAGES[resolved];
        if (msgs?.length) {
          const m = msgs[Math.floor(Math.random() * msgs.length)];
          setMessage(m.text);
          if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
          messageTimerRef.current = setTimeout(() => setMessage(null), getMascotDuration(resolved));
        }

        const dur = getMascotDuration(resolved);
        if (dur !== Infinity && dur > 0) {
          timerRef.current = setTimeout(() => {
            setState(MascotState.Idle);
          }, dur);
        }

        return resolved;
      });
    },
    [clearTimers],
  );

  const reactTo = useCallback(
    (event: "correct" | "incorrect" | "start" | "complete", streak?: number) => {
      switch (event) {
        case "correct":
          if (streak && streak >= 3) {
            safeSetState(MascotState.Streak);
          } else {
            safeSetState(MascotState.Correct);
          }
          break;
        case "incorrect":
          safeSetState(MascotState.Incorrect);
          break;
        case "start":
          safeSetState(MascotState.Listening);
          break;
        case "complete":
          safeSetState(MascotState.LevelUp);
          break;
      }
    },
    [safeSetState],
  );

  const onEnd = useCallback(() => {
    clearTimers();
    setState(MascotState.Idle);
    setMessage(null);
  }, [clearTimers]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  return { state, message, setState: safeSetState, reactTo, onEnd };
}
