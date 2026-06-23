"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getFirebaseApp } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { FadeIn } from "@/components/ui/FadeIn";

export function RequestPage() {
  const { user, isAdmin, signInWithGoogle, loading: authLoading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !description) {
      setError("Name, email, and description are required.");
      return;
    }

    const { db } = getFirebaseApp();
    if (!db) { setError("Firebase not configured yet."); return; }

    setSubmitting(true);
    try {
      if (!isAdmin) {
        const since = Date.now() - 24 * 60 * 60 * 1000;
        const q = query(
          collection(db, "conversations"),
          where("clientEmail", "==", email)
        );
        const snap = await getDocs(q);
        const hasRecent = snap.docs.some((d) => d.data().createdAt >= since);
        if (hasRecent) {
          setError("You can only send one request per day. Please wait 24 hours.");
          setSubmitting(false);
          return;
        }
      }

      const docRef = await addDoc(collection(db, "conversations"), {
        clientId: user?.uid || "anonymous",
        clientName: name,
        clientEmail: email,
        projectType,
        budget,
        description,
        status: "new",
        lastMessage: description.slice(0, 100),
        lastMessageAt: Date.now(),
        unreadCount: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      if (user) {
        router.push(`/chat/${docRef.id}`);
      } else {
        router.push("/");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 md:py-28">
      <FadeIn>
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
          Contact
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-2">
          Start a Project
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          Tell me about your idea. I&apos;ll get back to you within 24 hours.
        </p>
      </FadeIn>

      {!authLoading && !user && (
        <FadeIn delay={100}>
          <div className="mb-10 p-5 rounded-xl border border-indigo-200/50 dark:border-indigo-800/50 bg-indigo-50/50 dark:bg-indigo-900/10">
            <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-3">
              Sign in with Google to track your project and use the real-time chat.
            </p>
            <Button size="sm" onClick={signInWithGoogle}>
              Sign in with Google
            </Button>
          </div>
        </FadeIn>
      )}

      <FadeIn delay={150}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Project Type"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              placeholder="e.g. Web App, Desktop, API"
            />
            <Input
              label="Budget Range"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g. $1,000 - $5,000"
            />
          </div>
          <TextArea
            label="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your project idea, requirements, and timeline..."
          />

          {error && (
            <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">{error}</p>
          )}

          <div className="pt-2">
            <Button type="submit" loading={submitting} size="lg">
              Submit Request
            </Button>
          </div>
        </form>
      </FadeIn>
    </div>
  );
}
