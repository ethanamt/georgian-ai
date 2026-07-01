import data from "@/content/vocabulary/data.json";

interface VocabWord {
  id: string;
  georgian: string;
  transliteration: string;
  french: string;
  difficulty: number;
}

interface VocabCategory {
  id: string;
  name: string;
  icon: string;
  words: VocabWord[];
}

const vocabData = data as { categories: VocabCategory[] };

export function getCategories(): VocabCategory[] {
  return vocabData.categories;
}

export function getCategory(id: string): VocabCategory | undefined {
  return vocabData.categories.find((c) => c.id === id);
}

export function getAllWords(): VocabWord[] {
  return vocabData.categories.flatMap((c) => c.words);
}
