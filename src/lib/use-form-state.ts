"use client";

import { useState, useCallback } from "react";

type ServerAction = (
  prevState: { error: string | null; success: boolean },
  formData: FormData
) => Promise<{ error: string | null; success: boolean }>;

export function useFormState(action: ServerAction) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const formAction = useCallback(
    async (formData: FormData) => {
      setPending(true);
      setError(null);
      try {
        const result = await action({ error: null, success: false }, formData);
        if (result.success) {
          window.location.href = "/today";
        } else {
          setError(result.error);
        }
      } catch {
        setError("Erreur serveur");
      } finally {
        setPending(false);
      }
    },
    [action]
  );

  return [error, formAction, pending] as const;
}
