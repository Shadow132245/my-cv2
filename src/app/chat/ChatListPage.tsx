"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useConversations } from "@/hooks/useChat";
import { Button } from "@/components/ui/Button";

export function ChatListPage() {
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const { conversations, loading } = useConversations();

  if (authLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Sign in to view messages</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          You need to sign in with Google to access your conversations.
        </p>
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      ) : conversations.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="mb-4">No conversations yet.</p>
          <Link href="/request">
            <Button>Start a Project Request</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {conversations.map((conv) => (
            <Link
              key={conv.id}
              href={`/chat/${conv.id}`}
              className="block p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-indigo-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">
                    {conv.clientName}
                    {conv.unreadCount > 0 && (
                      <span className="ml-2 text-xs bg-indigo-600 text-white px-1.5 py-0.5 rounded-full">
                        {conv.unreadCount}
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                    {conv.lastMessage}
                  </p>
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(conv.lastMessageAt).toLocaleDateString()}
                </div>
              </div>
              <div className="mt-1 flex gap-2">
                <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
                  {conv.projectType || "General"}
                </span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded ${
                    conv.status === "new"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                      : conv.status === "in_progress"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                  }`}
                >
                  {conv.status.replace("_", " ")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
