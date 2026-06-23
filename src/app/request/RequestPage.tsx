"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { getFirebaseApp } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";

export function RequestPage() {
  const { user, signInWithGoogle } = useAuth();
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
    if (!db) { setError("Firebase not available"); return; }

    setSubmitting(true);
    try {
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
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Start a Project</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Tell me about your idea. I&apos;ll get back to you within 24 hours.
      </p>

      {!user && (
        <div className="mb-8 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20">
          <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-3">
            Sign in with Google to track your project request and use the
            real-time chat.
          </p>
          <Button size="sm" onClick={signInWithGoogle}>
            Sign in with Google
          </Button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
        <Input
          label="Project Type"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          placeholder="e.g. Web App, Desktop App, API, Mobile"
        />
        <Input
          label="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="e.g. $1,000 - $5,000"
        />
        <TextArea
          label="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your project idea, requirements, and timeline..."
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button type="submit" loading={submitting} size="lg">
          Submit Request
        </Button>
      </form>
    </div>
  );
}
