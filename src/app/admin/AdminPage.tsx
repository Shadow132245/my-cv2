"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useConversations } from "@/hooks/useChat";
import { FadeIn } from "@/components/ui/FadeIn";

export function AdminPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { conversations } = useConversations();

  if (authLoading) return <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center text-gray-500">Loading...</div>;

  if (!user || !isAdmin) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
        <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
        <p className="text-gray-500">You do not have admin access.</p>
      </div>
    );
  }

  const newCount = conversations.filter((c) => c.status === "new").length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
      <FadeIn>
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
          Admin
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-8">Dashboard</h1>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-white dark:bg-gray-900">
            <p className="text-3xl font-bold text-indigo-600">{conversations.length}</p>
            <p className="text-sm text-gray-500 mt-1">Total Conversations</p>
          </div>
          <div className="p-5 rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-white dark:bg-gray-900">
            <p className="text-3xl font-bold text-emerald-600">{newCount}</p>
            <p className="text-sm text-gray-500 mt-1">New Requests</p>
          </div>
          <div className="p-5 rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-white dark:bg-gray-900">
            <p className="text-3xl font-bold text-blue-600">{conversations.length - newCount}</p>
            <p className="text-sm text-gray-500 mt-1">Active / Completed</p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={150}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/projects"
            className="p-5 rounded-xl border border-gray-200/50 dark:border-gray-800/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors bg-white dark:bg-gray-900"
          >
            <h2 className="font-semibold mb-1">Manage Projects</h2>
            <p className="text-sm text-gray-500">Add, edit, or remove portfolio projects.</p>
          </Link>
          <Link
            href="/admin/terms"
            className="p-5 rounded-xl border border-gray-200/50 dark:border-gray-800/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors bg-white dark:bg-gray-900"
          >
            <h2 className="font-semibold mb-1">Terms of Service</h2>
            <p className="text-sm text-gray-500">Edit the terms of service page.</p>
          </Link>
          <Link
            href="/chat"
            className="p-5 rounded-xl border border-gray-200/50 dark:border-gray-800/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors bg-white dark:bg-gray-900"
          >
            <h2 className="font-semibold mb-1">Conversations</h2>
            <p className="text-sm text-gray-500">View and respond to client messages.</p>
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
