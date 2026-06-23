"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useConversations } from "@/hooks/useChat";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export function ChatListPage() {
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const { conversations, loading } = useConversations();

  if (authLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
        <FadeIn>
          <h1 className="text-3xl font-bold mb-2">Sign in to view messages</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            You need to sign in with Google to access your conversations.
          </p>
          <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28">
      <FadeIn>
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
          Inbox
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-8">Messages</h1>
      </FadeIn>

      {loading ? (
        <div className="text-center py-16 text-gray-400">
          {conversations.length === 0 ? (
            <p>No conversations yet.</p>
          ) : (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
              ))}
            </div>
          )}
        </div>
      ) : conversations.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-800/50">
          <svg className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          <p className="text-gray-500 dark:text-gray-400 mb-4">No conversations yet.</p>
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
              className="block p-4 sm:p-5 rounded-xl border border-gray-200/50 dark:border-gray-800/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors bg-white dark:bg-gray-900"
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  {conv.clientName}
                  {conv.unreadCount > 0 && (
                    <span className="ml-2 text-xs bg-indigo-600 text-white px-1.5 py-0.5 rounded-full">
                      {conv.unreadCount}
                    </span>
                  )}
                </h3>
                <span className="text-xs text-gray-400">
                  {new Date(conv.lastMessageAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mb-2">
                {conv.lastMessage}
              </p>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  {conv.projectType || "General"}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    conv.status === "new"
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
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
