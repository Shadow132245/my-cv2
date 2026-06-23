"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const { user, profile, isAdmin, signInWithGoogle, logout, loading } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Hassan<span className="text-indigo-600">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/projects", label: "Projects" },
            { href: "/request", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link
              href="/chat"
              className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Messages
            </Link>
          )}
          {isAdmin && (
            <Link
              href="/admin"
              className="px-3 py-2 text-sm font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 rounded-lg transition-colors"
            >
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/chat"
                className="hidden sm:block text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition-colors"
              >
                {profile?.name}
              </Link>
              {profile?.photoURL && (
                <img
                  src={profile.photoURL}
                  alt=""
                  className="w-8 h-8 rounded-full ring-2 ring-gray-200 dark:ring-gray-800"
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
