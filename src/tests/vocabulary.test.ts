import { describe, it, expect } from "vitest";
import vocabData from "@/content/vocabulary/data.json";

describe("Vocabulary data", () => {
  it("has at least 70 words", () => {
    const totalWords = vocabData.categories.reduce(
      (sum, cat) => sum + cat.words.length,
      0,
    );
    expect(totalWords).toBeGreaterThanOrEqual(70);
  });

  it.each(vocabData.categories)("category $name has words with required fields", (category) => {
    expect(category.id).toBeTruthy();
    expect(category.name).toBeTruthy();
    expect(category.words.length).toBeGreaterThan(0);
    for (const word of category.words) {
      expect(word.georgian).toBeTruthy();
      expect(word.french).toBeTruthy();
      expect(word.transliteration).toBeTruthy();
    }
  });
});
