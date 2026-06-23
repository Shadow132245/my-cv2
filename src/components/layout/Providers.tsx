"use client";

import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

function AntiDevtools() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === "U")
      ) {
        e.preventDefault();
      }
    };
    const ctx = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", ctx);
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("contextmenu", ctx);
      document.removeEventListener("keydown", handler);
    };
  }, []);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AntiDevtools />
      {children}
    </AuthProvider>
  );
}
