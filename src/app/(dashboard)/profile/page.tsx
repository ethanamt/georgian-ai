import { getUser } from "@/server/actions/auth";
import { signOut } from "@/server/actions/auth";
import { getUserProgress } from "@/server/actions/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XPBar } from "@/components/gamification/XPBar";
import { AchievementBadge } from "@/components/gamification/AchievementBadge";
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

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-8">
      <h1 className="text-3xl font-heading font-semibold">Profil</h1>

      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg">Compte</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4 pt-0 text-sm">
          <div>
            <span className="text-muted-foreground">Email : </span>
            {user?.email}
          </div>
          {progress && (
            <>
              <div>
                <span className="text-muted-foreground">Streak : </span>
                {progress.streakDays} jours
              </div>
              <div>
                <span className="text-muted-foreground">Mots appris : </span>
                {progress.wordsKnown}
              </div>
              <div>
                <span className="text-muted-foreground">Temps total : </span>
                {progress.totalTimeMinutes} min
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg">Niveau</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <XPBar xp={xp} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg">Succès</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-2 gap-2">
            {achievements.map((a) => (
              <AchievementBadge
                key={a.id}
                icon={a.icon}
                title={a.title}
                description={a.description}
                unlocked={false}
                compact
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <form action={signOut}>
        <Button variant="outline" className="w-full">
          Se déconnecter
        </Button>
      </form>
    </div>
  );
}
