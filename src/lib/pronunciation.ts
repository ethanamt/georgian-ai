import data from "@/content/pronunciation/data.json";

interface PronWord {
  georgian: string;
  transliteration: string;
  french: string;
}

interface PronExercise {
  id: string;
  title: string;
  level: string;
  order: number;
  words: PronWord[];
}

const pronData = data as { exercises: PronExercise[] };

export function getPronExercises(): PronExercise[] {
  return pronData.exercises.sort((a, b) => a.order - b.order);
}

export function getPronExercise(id: string): PronExercise | undefined {
  return pronData.exercises.find((e) => e.id === id);
}
