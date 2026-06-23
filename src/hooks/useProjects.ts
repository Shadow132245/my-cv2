import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { getFirebaseApp } from "@/lib/firebase";
import type { Project } from "@/types";

export function useProjects(options?: { featured?: boolean; category?: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { db } = getFirebaseApp();
    if (!db) return;
    const constraints: any[] = [orderBy("order", "asc")];
    if (options?.featured) constraints.push(where("featured", "==", true));
    if (options?.category) constraints.push(where("category", "==", options.category));

    const q = query(collection(db, "projects"), ...constraints);
    const unsub = onSnapshot(q, (snapshot) => {
      const list: Project[] = [];
      snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as Project));
      setProjects(list);
      setLoading(false);
    });
    return () => unsub();
  }, [options?.featured, options?.category]);

  return { projects, loading };
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { db } = getFirebaseApp();
  if (!db) return null;
  const snap = await getDocs(
    query(collection(db, "projects"), where("slug", "==", slug))
  );
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Project;
}
