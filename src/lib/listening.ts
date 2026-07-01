import data from "@/content/listening/data.json";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

interface ListeningExercise {
  id: string;
  title: string;
  level: string;
  order: number;
  estimatedMinutes: number;
  georgianText: string;
  translation: string;
  questions: Question[];
}

const listeningData = data as { exercises: ListeningExercise[] };

export function getListeningExercises(): ListeningExercise[] {
  return listeningData.exercises.sort((a, b) => a.order - b.order);
}

export function getListeningExercise(id: string): ListeningExercise | undefined {
  return listeningData.exercises.find((e) => e.id === id);
}
