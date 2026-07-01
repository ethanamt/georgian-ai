import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
      <WifiOff className="size-16 text-muted-foreground" />
      <h1 className="font-serif text-2xl font-semibold">Hors ligne</h1>
      <p className="max-w-sm text-muted-foreground">
        Vous êtes actuellement hors ligne. Reconnectez-vous pour continuer
        votre apprentissage du géorgien.
      </p>
    </div>
  );
}
