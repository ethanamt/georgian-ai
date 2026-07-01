export const dynamic = "force-dynamic";

import { getUser } from "@/server/actions/auth";
import { getUserProgress } from "@/server/actions/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function TodayPage() {
  const user = await getUser();
  const progress = await getUserProgress();

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-heading font-semibold">
          Bonjour{user?.email ? `, ${user.email.split("@")[0]}` : ""}
        </h1>
        <p className="text-muted-foreground">
          Prêt pour votre session du jour ?
        </p>
      </div>

      {progress && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Streak
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold">{progress.streakDays}</p>
                <p className="text-xs text-muted-foreground">jours de suite</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Mots appris
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold">{progress.wordsKnown}</p>
                <p className="text-xs text-muted-foreground">mots</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Lettres maîtrisées
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold">{progress.lettersMastered}</p>
                <p className="text-xs text-muted-foreground">/ 33 lettres</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  À réviser
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold">{progress.dueCards}</p>
                <p className="text-xs text-muted-foreground">cartes dues</p>
              </CardContent>
            </Card>
          </div>

          <Link href="/review">
            <Button size="lg" className="w-full text-lg">
              Réviser maintenant ({progress.dueCards})
            </Button>
          </Link>

          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
      Compétences
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(progress.skillScores).map(([skill, score]) => (
                <div key={skill}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="capitalize">{skill}</span>
                    <span className="text-muted-foreground">{score}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
