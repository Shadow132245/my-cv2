import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  limit,
} from "firebase/firestore";
import { getFirebaseApp } from "@/lib/firebase";
import type { Conversation, Message } from "@/types";
import { useAuth } from "./useAuth";

export function useConversations() {
  const { user, isAdmin } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { db } = getFirebaseApp();
    if (!db || !user) {
      setConversations([]);
      setLoading(false);
      return;
    }

    const constraints: any[] = isAdmin
      ? [orderBy("lastMessageAt", "desc")]
      : [
          where("clientId", "==", user.uid),
          orderBy("lastMessageAt", "desc"),
        ];

    const q = query(collection(db, "conversations"), ...constraints);
    const unsub = onSnapshot(q, (snapshot) => {
      const list: Conversation[] = [];
      snapshot.forEach((d) =>
        list.push({ id: d.id, ...d.data() } as Conversation)
      );
      setConversations(list);
      setLoading(false);
    });
    return () => unsub();
  }, [user, isAdmin]);

  return { conversations, loading };
}

export function useChat(conversationId: string | undefined) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { db } = getFirebaseApp();
    if (!db || !conversationId) {
      setLoading(false);
      return;
    }
    const q = query(
      collection(db, "conversations", conversationId, "messages"),
      orderBy("createdAt", "asc"),
      limit(200)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const list: Message[] = [];
      snapshot.forEach((d) =>
        list.push({ id: d.id, ...d.data() } as Message)
      );
      setMessages(list);
      setLoading(false);
    });
    return () => unsub();
  }, [conversationId]);

  return { messages, loading };
}

export async function sendMessage(
  conversationId: string,
  text: string,
  senderId: string,
  senderName: string,
  senderRole: "client" | "admin",
  files?: { url: string; type: "image" | "video"; name: string }[]
) {
  const { db } = getFirebaseApp();
  if (!db) throw new Error("Firebase not available");
  const msgRef = collection(db, "conversations", conversationId, "messages");
  await addDoc(msgRef, {
    senderId,
    senderName,
    senderRole,
    text,
    files: files || [],
    createdAt: Date.now(),
  });
  await updateDoc(doc(db, "conversations", conversationId), {
    lastMessage: text || (files ? `[${files[0].type}]` : ""),
    lastMessageAt: Date.now(),
  });
}

const IMAGE_EXT = /\.(jpe?g|png|gif|bmp|webp|svg)(\?.*)?$/i;
const VIDEO_EXT = /\.(mp4|webm|ogg|mov|avi|mkv)(\?.*)?$/i;
const URL_RE = /(https?:\/\/[^\s]+)/g;

export function parseMediaUrls(text: string): {
  text: string;
  media: { url: string; type: "image" | "video" }[];
} {
  const media: { url: string; type: "image" | "video" }[] = [];
  const parts = text.split(URL_RE);
  const newParts = parts.map((part) => {
    if (URL_RE.test(part)) {
      const url = part.trim();
      if (IMAGE_EXT.test(url)) {
        media.push({ url, type: "image" });
        return "";
      }
      if (VIDEO_EXT.test(url)) {
        media.push({ url, type: "video" });
        return "";
      }
    }
    return part;
  });
  return { text: newParts.join("").trim(), media };
}
