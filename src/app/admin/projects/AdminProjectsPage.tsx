"use client";

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { getFirebaseApp } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import type { Project } from "@/types";

export function AdminProjectsPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [images, setImages] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [category, setCategory] = useState("Web");
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    const { db } = getFirebaseApp();
    if (!db) return;
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    getDocs(q).then((snap) => {
      const list: Project[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Project));
      setProjects(list);
      setLoading(false);
    });
  }, [isAdmin]);

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setDescription("");
    setLongDescription("");
    setTechStack("");
    setImages("");
    setGithubUrl("");
    setLiveUrl("");
    setCategory("Web");
    setFeatured(false);
    setOrder(0);
    setEditing(null);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setTitle(p.title);
    setSlug(p.slug);
    setDescription(p.description);
    setLongDescription(p.longDescription || "");
    setTechStack(p.techStack.join(", "));
    setImages(p.images.join("\n"));
    setGithubUrl(p.githubUrl || "");
    setLiveUrl(p.liveUrl || "");
    setCategory(p.category);
    setFeatured(p.featured);
    setOrder(p.order);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !description) return;
    setSaving(true);

    const data = {
      title,
      slug,
      description,
      longDescription,
      techStack: techStack.split(",").map((s) => s.trim()).filter(Boolean),
      images: images.split("\n").map((s) => s.trim()).filter(Boolean),
      githubUrl,
      liveUrl,
      category,
      featured,
      order: Number(order),
      updatedAt: Date.now(),
    };

    try {
      const { db } = getFirebaseApp();
      if (!db) return;
      if (editing) {
        await updateDoc(doc(db, "projects", editing.id), data);
      } else {
        await addDoc(collection(db, "projects"), {
          ...data,
          createdAt: Date.now(),
        });
      }
      resetForm();
      setShowForm(false);
      const q = query(collection(db, "projects"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      const list: Project[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Project));
      setProjects(list);
    } catch (err) {
      console.error("save error", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    const { db } = getFirebaseApp();
    if (!db) return;
    await deleteDoc(doc(db, "projects", id));
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  if (authLoading || loading) return <div className="max-w-6xl mx-auto px-4 py-16 text-center text-gray-500">Loading...</div>;
  if (!user || !isAdmin) return <div className="max-w-6xl mx-auto px-4 py-16 text-center"><h1 className="text-2xl font-bold">Access Denied</h1></div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Button onClick={() => { resetForm(); setShowForm(!showForm); }}>
          {showForm ? "Cancel" : "Add Project"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="mb-8 p-6 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <Input label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} required placeholder="my-project-slug" />
            <Input label="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <Input label="Order" type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
          </div>
          <TextArea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <TextArea label="Long Description" value={longDescription} onChange={(e) => setLongDescription(e.target.value)} />
          <Input label="Tech Stack (comma-separated)" value={techStack} onChange={(e) => setTechStack(e.target.value)} />
          <TextArea label="Image URLs (one per line)" value={images} onChange={(e) => setImages(e.target.value)} />
          <Input label="GitHub URL" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
          <Input label="Live URL" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            Featured project
          </label>
          <Button type="submit" loading={saving}>
            {editing ? "Update" : "Create"} Project
          </Button>
        </form>
      )}

      <div className="space-y-2">
        {projects.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800">
            <div>
              <h3 className="font-medium">{p.title}</h3>
              <p className="text-sm text-gray-500">{p.category} · {p.techStack.join(", ")}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => openEdit(p)}>Edit</Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>Delete</Button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-center text-gray-500 py-8">No projects yet. Add your first project!</p>
        )}
      </div>
    </div>
  );
}
