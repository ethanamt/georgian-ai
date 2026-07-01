import { describe, it, expect } from "vitest";
import { updateCard, type SrsCard } from "@/lib/srs/sm2";

const makeCard = (overrides: Partial<SrsCard> = {}): SrsCard => ({
  easeFactor: 2.5,
  intervalDays: 0,
  repetitions: 0,
  dueDate: new Date(),
  ...overrides,
});

describe("updateCard (SM-2)", () => {
  it("first review with quality 5: interval=1, repetitions=1", () => {
    const result = updateCard(makeCard(), 5);
    expect(result.intervalDays).toBe(1);
    expect(result.repetitions).toBe(1);
  });

  it("second review quality 4: interval=6, repetitions=2", () => {
    let card = makeCard({ intervalDays: 1, repetitions: 1 });
    card = updateCard(card, 4);
    expect(card.intervalDays).toBe(6);
    expect(card.repetitions).toBe(2);
  });

  it("resets on failed review (quality < 3)", () => {
    const card = makeCard({ intervalDays: 6, repetitions: 5, easeFactor: 2.5 });
    const result = updateCard(card, 1);
    expect(result.repetitions).toBe(0);
    expect(result.intervalDays).toBe(1);
  });

  it("clamps ease factor to minimum 1.3", () => {
    const card = makeCard({ easeFactor: 1.3 });
    const result = updateCard(card, 0);
    expect(result.easeFactor).toBeGreaterThanOrEqual(1.3);
  });

  it("multiplies interval by ease factor after second repetition", () => {
    const card = makeCard({ intervalDays: 10, repetitions: 2, easeFactor: 2.0 });
    const result = updateCard(card, 4);
    expect(result.intervalDays).toBe(20);
  });

  it("increments dueDate by interval", () => {
    const today = new Date("2026-07-01");
    const result = updateCard(makeCard(), 5, today);
    const expected = new Date("2026-07-02");
    expect(result.dueDate).toEqual(expected);
  });
});
