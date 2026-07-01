export const APP_NAME = "Georgian AI";
export const APP_VERSION = "0.1.0";

export const DAILY_GOAL_DEFAULT_MINUTES = 15;

export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export const EXERCISE_TYPES = {
  QCM: "qcm",
  MATCHING: "matching",
  DRAGDROP: "dragdrop",
  FILLBLANK: "fillblank",
  PRONUNCIATION: "pronunciation",
  WRITING: "writing",
  LISTENING: "listening",
  CONVERSATION: "conversation",
} as const;

export const SKILLS = {
  READING: "reading",
  WRITING: "writing",
  LISTENING: "listening",
  SPEAKING: "speaking",
  GRAMMAR: "grammar",
  VOCABULARY: "vocabulary",
} as const;

export const AUDIO_SPEEDS = {
  SLOW: "slow",
  NORMAL: "normal",
  FAST: "fast",
} as const;

export const NAVIGATION_ITEMS = [
  { label: "Aujourd'hui", href: "/today", icon: "Calendar" },
  { label: "Leçons", href: "/lessons", icon: "BookOpen" },
  { label: "Révision", href: "/review", icon: "RotateCcw" },
  { label: "Progression", href: "/progress", icon: "TrendingUp" },
  { label: "Profil", href: "/profile", icon: "User" },
] as const;

export const ALPHABET_TOTAL_LETTERS = 33;
