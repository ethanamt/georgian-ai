export const dynamic = "force-dynamic";

import { getUser, signOut } from "@/server/actions/auth";
import { getUserProgress } from "@/server/actions/progress";
import { getAchievements } from "@/lib/achievements";

export default async function ProfilePage() {
  const user = await getUser();
  const progress = await getUserProgress();
  const achievements = getAchievements();

  const xp = progress
    ? progress.wordsKnown * 10 +
      progress.lettersMastered * 15 +
      progress.streakDays * 5 +
      progress.totalTimeMinutes
    : 0;

  const levels = [0, 100, 250, 500, 1000, 2000, 3500, 5000];
  const level = levels.findIndex((l) => xp < l);
  const currentLevel = level === -1 ? levels.length : level;
  const xpStart = levels[currentLevel - 1] || 0;
  const xpEnd = levels[currentLevel] || xpStart + 500;
  const progressPct = ((xp - xpStart) / (xpEnd - xpStart)) * 100;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-8">
      <h1 className="font-heading text-2xl font-bold tracking-tight">Profil</h1>

      <div className="rounded-2xl border border-white/6 bg-[#0e0e10] p-6">
        <p className="text-xs text-muted-foreground mb-0.5">Email</p>
        <p className="text-sm">{user?.email}</p>
        {progress && (
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Streak</p>
              <p className="font-heading text-xl font-bold">{progress.streakDays}</p>
              <p className="text-xs text-muted-foreground">jours</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Mots</p>
              <p className="font-heading text-xl font-bold">{progress.wordsKnown}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Temps</p>
              <p className="font-heading text-xl font-bold">{progress.totalTimeMinutes}</p>
              <p className="text-xs text-muted-foreground">min</p>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-white/6 bg-[#0e0e10] p-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
          Niveau {currentLevel}
        </p>
        <div className="h-1.5 rounded-full bg-white/5">
          <div className="h-full rounded-full bg-white" style={{ width: `${Math.min(progressPct, 100)}%` }} />
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{xp} XP</p>
      </div>

      <div>
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
          Succès
        </p>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((a) => (
            <div key={a.id} className="rounded-2xl border border-white/6 bg-[#0e0e10] p-5">
              <p className="font-heading text-sm font-semibold">{a.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
            </div>
          ))}
        </div>
      </div>

      <form action={signOut}>
        <button
          type="submit"
          className="w-full rounded-full border border-white/15 px-6 py-3 text-sm font-medium transition-all hover:bg-white/5 hover:scale-[1.02]"
        >
          Se déconnecter
        </button>
      </form>
    </div>
  );
}
