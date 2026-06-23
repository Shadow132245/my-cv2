"use client";

import { useAuthContext } from "@/contexts/AuthContext";

export function useAuth() {
  return useAuthContext();
}

export function useRequireAuth() {
  const { user, loading } = useAuth();
  return { user, loading, signedIn: !!user };
}

export function useRequireAdmin() {
  const { user, isAdmin, loading } = useAuth();
  return { user, isAdmin, loading, authorized: !!user && isAdmin };
}
