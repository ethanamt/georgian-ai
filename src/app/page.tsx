import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-heading font-bold tracking-tight">
        Georgian AI
      </h1>
      <p className="mt-3 text-lg text-muted-foreground max-w-sm">
        15 minutes par jour pour apprendre le géorgien
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/login">
          <Button>Se connecter</Button>
        </Link>
        <Link href="/register">
          <Button variant="outline">S&apos;inscrire</Button>
        </Link>
      </div>
    </div>
  );
}
