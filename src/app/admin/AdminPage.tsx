"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useConversations } from "@/hooks/useChat";
import { Button } from "@/components/ui/Button";

export function AdminPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { conversations } = useConversations();

  if (authLoading) return <div className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-500">Loading...</div>;

  if (!user || !isAdmin) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-gray-500">You do not have admin access.</p>
      </div>
    );
  }

  const newCount = conversations.filter((c) => c.status === "new").length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800">
          <p className="text-2xl font-bold text-indigo-600">{conversations.length}</p>
          <p className="text-sm text-gray-500">Total Conversations</p>
        </div>
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800">
          <p className="text-2xl font-bold text-green-600">{newCount}</p>
          <p className="text-sm text-gray-500">New Requests</p>
        </div>
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800">
          <p className="text-2xl font-bold text-blue-600">{conversations.length - newCount}</p>
          <p className="text-sm text-gray-500">In Progress / Completed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/projects"
          className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-500 transition-colors"
        >
          <h2 className="text-lg font-semibold mb-1">Manage Projects</h2>
          <p className="text-sm text-gray-500">Add, edit, or remove portfolio projects.</p>
        </Link>
        <Link
          href="/admin/terms"
          className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-500 transition-colors"
        >
          <h2 className="text-lg font-semibold mb-1">Terms of Service</h2>
          <p className="text-sm text-gray-500">Edit the terms of service page.</p>
        </Link>
        <Link
          href="/chat"
          className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-500 transition-colors"
        >
          <h2 className="text-lg font-semibold mb-1">Conversations</h2>
          <p className="text-sm text-gray-500">View and respond to client messages.</p>
        </Link>
      </div>
    </div>
  );
}
