export interface GeorgianLetter {
  id: string;
  order: number;
  georgian: string;
  name: string;
  transliteration: string;
  ipa: string;
  type: "vowel" | "consonant";
  wordExample: string;
  wordTransliteration: string;
  wordFrench: string;
  strokeCount: number;
  difficulty: number;
  audioFile: string;
  similarTo: string[];
}

export interface LetterGroup {
  name: string;
  letters: string[];
  description: string;
}

export interface AlphabetData {
  name: string;
  description: string;
  totalLetters: number;
  letters: GeorgianLetter[];
  groups: LetterGroup[];
}
