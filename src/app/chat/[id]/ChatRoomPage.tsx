"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useChat, sendMessage, parseMediaUrls } from "@/hooks/useChat";
import { Button } from "@/components/ui/Button";

export function ChatRoomPage({ conversationId }: { conversationId: string }) {
  const { user, profile, isAdmin, loading: authLoading } = useAuth();
  const { messages, loading: msgsLoading } = useChat(conversationId);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (authLoading) return <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center text-gray-500">Loading...</div>;
  if (!user) {
    router.push("/chat");
    return null;
  }

  const handleSend = async () => {
    if (!text.trim()) return;
    setSending(true);
    try {
      const { text: cleanText, media } = parseMediaUrls(text.trim());
      await sendMessage(
        conversationId,
        cleanText || (media.length > 0 ? "" : text.trim()),
        user.uid,
        profile?.name || "User",
        isAdmin ? "admin" : "client",
        media.length > 0 ? media.map((m) => ({ ...m, name: m.url.split("/").pop() || "" })) : undefined
      );
      setText("");
    } catch (err) {
      console.error("send error", err);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="rounded-xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden flex flex-col h-[70vh] bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {msgsLoading ? (
            <div className="text-center text-gray-400 text-sm py-12">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-400 text-sm py-12">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((msg) => {
              const isMine = msg.senderId === user.uid;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${
                      isMine
                        ? "bg-indigo-600 text-white rounded-br-md"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md"
                    }`}
                  >
                    {!isMine && (
                      <p className="text-xs font-medium opacity-70 mb-1">{msg.senderName}</p>
                    )}
                    {msg.text && <p className="leading-relaxed">{msg.text}</p>}
                    {msg.files?.map((f, i) => (
                      <div key={i} className="mt-2">
                        {f.type === "image" ? (
                          <img
                            src={f.url}
                            alt={f.name}
                            className="max-w-full rounded-lg max-h-64 object-cover"
                          />
                        ) : (
                          <video
                            src={f.url}
                            controls
                            className="max-w-full rounded-lg max-h-64"
                          />
                        )}
                      </div>
                    ))}
                    <p
                      className={`text-xs mt-1.5 ${
                        isMine ? "text-indigo-200" : "text-gray-400"
                      }`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-gray-200/50 dark:border-gray-800/50 p-4 flex items-center gap-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (paste image/video URL to embed)"
            rows={1}
            className="flex-1 px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-shadow"
          />
          <Button
            size="sm"
            onClick={handleSend}
            disabled={!text.trim() || sending}
            loading={sending}
          >
            Send
          </Button>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-3 text-center">
        Tip: Paste an image URL (.jpg, .png, .gif) or video URL (.mp4) to embed it
      </p>
    </div>
  );
}
