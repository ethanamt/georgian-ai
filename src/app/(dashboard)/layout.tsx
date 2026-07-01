import { getUser } from "@/server/actions/auth";
import { getUserProgress } from "@/server/actions/progress";
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) redirect("/login");

  const progress = await getUserProgress();

  return (
    <div className="min-h-screen bg-background">
      <Header streakDays={progress?.streakDays} />
      <main className="pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
