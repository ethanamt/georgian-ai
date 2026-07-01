export const dynamic = "force-dynamic";

import { getUser } from "@/server/actions/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SettingsPage() {
  const user = await getUser();

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-8">
      <h1 className="text-3xl font-heading font-semibold">Réglages</h1>

      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg">Compte</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-4 pt-0 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email</span>
            <span>{user?.email}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg">Préférences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4 pt-0 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Thème</span>
            <span>Clair / Sombre (auto)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Langue d&apos;interface</span>
            <span>Français</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Audio automatique</span>
            <span>Activé</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
