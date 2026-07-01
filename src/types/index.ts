export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type ExerciseType =
  | "qcm"
  | "matching"
  | "dragdrop"
  | "fillblank"
  | "pronunciation"
  | "writing"
  | "listening"
  | "conversation";
export type SkillType =
  | "reading"
  | "writing"
  | "listening"
  | "speaking"
  | "grammar"
  | "vocabulary";
export type CardStatus = "new" | "learning" | "review" | "mastered";
export type SessionStatus = "active" | "paused" | "completed" | "abandoned";

export interface Profile {
  id: string;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  nativeLanguage: string;
  targetLevel: CEFRLevel;
  dailyGoalMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string;
  level: CEFRLevel;
  orderIndex: number;
  estimatedMinutes: number | null;
  createdAt: string;
}

export interface Vocabulary {
  id: string;
  lessonId: string | null;
  georgian: string;
  transliteration: string;
  french: string;
  audioUrl: string | null;
  difficulty: number;
  tags: string[];
}

export interface Exercise {
  id: string;
  unitId: string;
  type: ExerciseType;
  question: Record<string, unknown>;
  correctAnswer: Record<string, unknown>;
  difficulty: number;
  hints: Record<string, unknown> | null;
  maxAttempts: number;
}

export interface SRSCard {
  id: string;
  userId: string;
  vocabularyId: string;
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  nextReview: string;
  lastReviewed: string | null;
  status: CardStatus;
}

export interface SRSReviewResult {
  cardId: string;
  vocabularyId: string;
  georgian: string;
  transliteration: string;
  french: string;
  status: CardStatus;
  nextReview: string;
}

export interface Session {
  id: string;
  userId: string;
  startedAt: string;
  endedAt: string | null;
  durationSeconds: number;
  exercisesCompleted: number;
  exercisesCorrect: number;
  status: SessionStatus;
}

export interface PronunciationAttempt {
  id: string;
  userId: string;
  vocabularyId: string | null;
  audioUrl: string | null;
  confidenceScore: number | null;
  feedback: string | null;
  createdAt: string;
}

export interface WritingAttempt {
  id: string;
  userId: string;
  vocabularyId: string | null;
  strokeData: Record<string, unknown>;
  accuracyScore: number | null;
  feedback: string | null;
  createdAt: string;
}

export interface ConversationMessage {
  role: "system" | "user" | "assistant";
  content: string;
  audioUrl?: string;
}

export interface GrammarCorrection {
  original: string;
  corrected: string;
  explanation: string;
  ruleReference: string;
}

export interface UserProgress {
  wordsKnown: number;
  lettersMastered: number;
  dueCards: number;
  totalTimeMinutes: number;
  streakDays: number;
  skillScores: Record<SkillType, number>;
}

export interface Achievement {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string | null;
  conditionType: string;
  conditionValue: number;
}

export interface ApiResponse<T> {
  data: T | null;
  error: { code: string; message: string } | null;
}

export interface SM2Result {
  newEaseFactor: number;
  newInterval: number;
  newRepetitions: number;
  nextReviewDate: string;
}
