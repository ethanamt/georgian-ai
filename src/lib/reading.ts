import data from "@/content/reading/data.json";

interface Paragraph {
  georgian: string;
  transliteration: string;
  french: string;
  audioSlow: boolean;
}

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

interface ReadingText {
  id: string;
  title: string;
  titleFr: string;
  level: string;
  order: number;
  estimatedMinutes: number;
  vocabularyIds: string[];
  paragraphs: Paragraph[];
  questions: Question[];
}

const readingData = data as { texts: ReadingText[] };

export function getReadingTexts(): ReadingText[] {
  return readingData.texts.sort((a, b) => a.order - b.order);
}

export function getReadingText(id: string): ReadingText | undefined {
  return readingData.texts.find((t) => t.id === id);
}
