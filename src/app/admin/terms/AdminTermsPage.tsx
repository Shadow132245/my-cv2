"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getFirebaseApp } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/Input";

export function AdminTermsPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [content, setContent] = useState("");
  const [version, setVersion] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    const { db } = getFirebaseApp();
    if (!db) return;
    getDoc(doc(db, "terms", "latest")).then((snap) => {
      if (snap.exists()) {
        setContent(snap.data().content || "");
        setVersion(snap.data().version || 1);
      }
      setLoading(false);
    });
  }, [isAdmin]);

  const handleSave = async () => {
    const { db } = getFirebaseApp();
    if (!db) return;
    setSaving(true);
    try {
      await setDoc(doc(db, "terms", "latest"), {
        content,
        version: version + 1,
        updatedAt: Date.now(),
        publishedAt: Date.now(),
      });
      setVersion((v) => v + 1);
    } catch (err) {
      console.error("save error", err);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) return <div className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-500">Loading...</div>;
  if (!user || !isAdmin) return <div className="max-w-4xl mx-auto px-4 py-16 text-center"><h1 className="text-2xl font-bold">Access Denied</h1></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-6">Version {version}</p>

      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[400px] font-mono text-sm"
      />

      <div className="mt-4">
        <Button onClick={handleSave} loading={saving}>
          Save & Publish
        </Button>
      </div>
    </div>
  );
}
