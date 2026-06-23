"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const { user, profile, isAdmin, signInWithGoogle, logout, loading } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          Hassan
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-indigo-600 transition-colors">About</Link>
          <Link href="/projects" className="hover:text-indigo-600 transition-colors">Projects</Link>
          <Link href="/request" className="hover:text-indigo-600 transition-colors">Hire Me</Link>
          {user && (
            <Link href="/chat" className="hover:text-indigo-600 transition-colors">Messages</Link>
          )}
          {isAdmin && (
            <Link href="/admin" className="hover:text-indigo-600 transition-colors">Admin</Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
                {profile?.name}
              </span>
              {profile?.photoURL && (
                <img
                  src={profile.photoURL}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
              )}
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={signInWithGoogle}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
