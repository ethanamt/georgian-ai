import { describe, it, expect } from "vitest";
import alphabetData from "@/content/alphabet/data.json";

describe("Alphabet data", () => {
  it("has exactly 33 letters", () => {
    expect(alphabetData.letters).toHaveLength(33);
  });

  it("has 5 vowels", () => {
    const vowels = alphabetData.letters.filter((l) => l.type === "vowel");
    expect(vowels).toHaveLength(5);
  });

  it("has 28 consonants", () => {
    const consonants = alphabetData.letters.filter((l) => l.type === "consonant");
    expect(consonants).toHaveLength(28);
  });

  it("has 5 ejective consonants (კ, პ, ტ, წ, ჭ)", () => {
    const ejectives = alphabetData.letters.filter((l) =>
      ["კ", "პ", "ტ", "წ", "ჭ"].includes(l.georgian)
    );
    expect(ejectives).toHaveLength(5);
  });

  it.each(alphabetData.letters)("letter $georgian has required fields", (letter) => {
    expect(letter.georgian).toBeTruthy();
    expect(letter.transliteration).toBeTruthy();
    expect(letter.ipa).toBeTruthy();
    expect(letter.name).toBeTruthy();
    expect(letter.type).toMatch(/^(vowel|consonant)$/);
    expect(letter.difficulty).toBeGreaterThanOrEqual(1);
    expect(letter.difficulty).toBeLessThanOrEqual(5);
  });

  it("has 3 letter groups", () => {
    expect(alphabetData.groups).toHaveLength(3);
    const names = alphabetData.groups.map((g) => g.name);
    expect(names).toContain("Voyelles");
    expect(names).toContain("Consonnes simples");
    expect(names).toContain("Éjectives");
  });
});
