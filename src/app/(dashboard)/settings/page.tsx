export const dynamic = "force-dynamic";

import { getUser } from "@/server/actions/auth";

export default async function SettingsPage() {
  const user = await getUser();

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-8">
      <h1 className="font-heading text-2xl font-bold tracking-tight">Réglages</h1>
      <div className="divide-y divide-white/6 rounded-2xl border border-white/6 bg-[#0e0e10]">
        <div className="flex justify-between px-6 py-4">
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="text-sm">{user?.email}</p>
        </div>
        <div className="flex justify-between px-6 py-4">
          <p className="text-sm text-muted-foreground">Thème</p>
          <p className="text-sm">Sombre</p>
        </div>
        <div className="flex justify-between px-6 py-4">
          <p className="text-sm text-muted-foreground">Langue</p>
          <p className="text-sm">Français</p>
        </div>
        <div className="flex justify-between px-6 py-4">
          <p className="text-sm text-muted-foreground">Audio auto.</p>
          <p className="text-sm">Activé</p>
        </div>
      </div>
    </div>
  );
}
