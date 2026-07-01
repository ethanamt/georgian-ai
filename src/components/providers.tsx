"use client";

import { createBrowserClient } from "@supabase/ssr";
import { createContext, useContext, useState } from "react";
import { Toaster } from "@/components/ui/sonner";

const SupabaseContext = createContext<ReturnType<
  typeof createBrowserClient
> | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
      <Toaster />
    </SupabaseContext.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) throw new Error("useSupabase must be used within Providers");
  return context;
};
