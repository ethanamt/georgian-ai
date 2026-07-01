import data from "@/content/achievements/data.json";

export interface Achievement {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  conditionType: string;
  conditionValue: number;
  xpReward: number;
}

export interface Level {
  level: number;
  xpRequired: number;
  title: string;
}

const achievementData = data as { achievements: Achievement[]; levels: Level[] };

export function getAchievements(): Achievement[] {
  return achievementData.achievements;
}

export function getLevels(): Level[] {
  return achievementData.levels;
}

export function getLevel(xp: number): Level {
  const levels = getLevels();
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].xpRequired) return levels[i];
  }
  return levels[0];
}

export function getNextLevel(xp: number): Level | null {
  const levels = getLevels();
  const current = getLevel(xp);
  const idx = levels.findIndex((l) => l.level === current.level);
  return idx < levels.length - 1 ? levels[idx + 1] : null;
}
