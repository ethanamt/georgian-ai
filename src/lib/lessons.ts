import data from "@/content/lessons/data.json";

interface SectionBase {
  type: string;
  title?: string;
}

interface TextSection extends SectionBase {
  type: "text";
  content: string;
}

interface ConjugationSection extends SectionBase {
  type: "conjugation";
  header: string[];
  rows: string[][];
}

interface ExampleSection extends SectionBase {
  type: "example";
  georgian: string;
  transliteration: string;
  french: string;
}

interface NoteSection extends SectionBase {
  type: "note";
  content: string;
}

interface ComparisonSection extends SectionBase {
  type: "comparison";
  header?: string;
  rows: string[][];
}

interface TableSection extends SectionBase {
  type: "table";
  header: string[];
  rows: string[][];
}

interface ListSection extends SectionBase {
  type: "list";
  items: string[];
}

export type LessonSection =
  | TextSection
  | ConjugationSection
  | ExampleSection
  | NoteSection
  | ComparisonSection
  | TableSection
  | ListSection;

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  level: string;
  order: number;
  estimatedMinutes: number;
  sections: LessonSection[];
}

const lessonData = data as { lessons: Lesson[] };

export function getLessons(): Lesson[] {
  return lessonData.lessons.sort((a, b) => a.order - b.order);
}

export function getLesson(slug: string): Lesson | undefined {
  return lessonData.lessons.find((l) => l.slug === slug);
}

export function getNextLesson(slug: string): Lesson | undefined {
  const lessons = getLessons();
  const idx = lessons.findIndex((l) => l.slug === slug);
  return idx >= 0 && idx < lessons.length - 1 ? lessons[idx + 1] : undefined;
}

export function getPrevLesson(slug: string): Lesson | undefined {
  const lessons = getLessons();
  const idx = lessons.findIndex((l) => l.slug === slug);
  return idx > 0 ? lessons[idx - 1] : undefined;
}
