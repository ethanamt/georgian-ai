import { describe, it, expect } from "vitest";
import achievementData from "@/content/achievements/data.json";

describe("Achievement data", () => {
  it("has 7 achievements", () => {
    expect(achievementData.achievements).toHaveLength(7);
  });

  it("has 10 XP levels", () => {
    expect(achievementData.levels).toHaveLength(10);
  });

  it.each(achievementData.achievements)("achievement $id has required fields", (a) => {
    expect(a.id).toBeTruthy();
    expect(a.title).toBeTruthy();
    expect(a.description).toBeTruthy();
    expect(a.icon).toBeTruthy();
    expect(a.xpReward).toBeGreaterThan(0);
  });

  it("levels have increasing XP requirements", () => {
    for (let i = 1; i < achievementData.levels.length; i++) {
      expect(achievementData.levels[i].xpRequired).toBeGreaterThan(
        achievementData.levels[i - 1].xpRequired,
      );
    }
  });
});
