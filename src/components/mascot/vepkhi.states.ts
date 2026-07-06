export enum MascotState {
  Idle = "idle",
  Listening = "listening",
  Correct = "correct",
  Incorrect = "incorrect",
  Streak = "streak",
  Struggling = "struggling",
  LevelUp = "levelUp",
  Speaking = "speaking",
}

export interface MascotTransition {
  from: MascotState;
  to: MascotState;
  priority: number;
  durationMs: number;
}

/** Higher priority = wins when multiple triggers fire at once */
const STATE_PRIORITY: Record<MascotState, number> = {
  [MascotState.Idle]: 0,
  [MascotState.Listening]: 2,
  [MascotState.Correct]: 4,
  [MascotState.Incorrect]: 4,
  [MascotState.Streak]: 6,
  [MascotState.Struggling]: 5,
  [MascotState.LevelUp]: 8,
  [MascotState.Speaking]: 3,
};

/** How long an auto-clearing state stays before returning to Idle */
const STATE_DURATION: Record<MascotState, number> = {
  [MascotState.Idle]: Infinity,
  [MascotState.Listening]: Infinity,
  [MascotState.Correct]: 1500,
  [MascotState.Incorrect]: 2000,
  [MascotState.Streak]: 2500,
  [MascotState.Struggling]: 3500,
  [MascotState.LevelUp]: 4000,
  [MascotState.Speaking]: Infinity,
};

export interface MascotMessage {
  text: string;
  lang: "fr" | "ka";
}

/** Textes d'accompagnement — ton sobre, adulte, jamais infantilisant */
export const MASCOT_MESSAGES: Partial<Record<MascotState, MascotMessage[]>> = {
  [MascotState.Correct]: [
    { text: "Bien vu.", lang: "fr" },
    { text: "C'est ça.", lang: "fr" },
    { text: "სწორია.", lang: "ka" },
    { text: "Enchaînons.", lang: "fr" },
  ],
  [MascotState.Incorrect]: [
    { text: "Pas loin.", lang: "fr" },
    { text: "On recommence.", lang: "fr" },
    { text: "ცადე ისევ.", lang: "ka" },
    { text: "La prochaine fois.", lang: "fr" },
  ],
  [MascotState.Streak]: [
    { text: "Série en cours.", lang: "fr" },
    { text: "Vous enchaînez.", lang: "fr" },
    { text: "ძალიან კარგი.", lang: "ka" },
  ],
  [MascotState.Struggling]: [
    { text: "Ce n'est pas le plus facile.", lang: "fr" },
    { text: "Essayons autrement.", lang: "fr" },
    { text: "Prenez votre temps.", lang: "fr" },
  ],
  [MascotState.LevelUp]: [
    { text: "Palier franchi.", lang: "fr" },
    { text: "Complété.", lang: "fr" },
    { text: "დასრულებულია.", lang: "ka" },
  ],
};

export function getMascotPriority(state: MascotState): number {
  return STATE_PRIORITY[state];
}

export function getMascotDuration(state: MascotState): number {
  return STATE_DURATION[state];
}

export function pickMessage(state: MascotState): MascotMessage | null {
  const msgs = MASCOT_MESSAGES[state];
  if (!msgs?.length) return null;
  return msgs[Math.floor(Math.random() * msgs.length)];
}

export function resolvePriority(
  current: MascotState,
  incoming: MascotState,
): MascotState {
  return STATE_PRIORITY[incoming] >= STATE_PRIORITY[current]
    ? incoming
    : current;
}
