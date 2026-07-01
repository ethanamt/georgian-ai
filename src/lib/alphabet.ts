import data from "@/content/alphabet/data.json";
import type { AlphabetData, GeorgianLetter } from "@/types/alphabet";

const alphabetData = data as AlphabetData;

export function getAlphabet(): GeorgianLetter[] {
  return alphabetData.letters;
}

export function getLetterByGeorgian(ch: string): GeorgianLetter | undefined {
  return alphabetData.letters.find((l) => l.georgian === ch);
}

export function getLetterById(id: string): GeorgianLetter | undefined {
  return alphabetData.letters.find((l) => l.id === id);
}

export function getTotalLetters(): number {
  return alphabetData.totalLetters;
}

export function getGroups() {
  return alphabetData.groups;
}
