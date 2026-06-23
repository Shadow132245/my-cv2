import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/firebase-admin";
import { seedProjects } from "@/seed/projects";

export async function POST() {
  const { adminDb } = getAdmin();
  if (!adminDb) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 500 });
  }

  try {
    const batch = adminDb.batch();
    for (const p of seedProjects) {
      const ref = adminDb.collection("projects").doc();
      batch.set(ref, { ...p, createdAt: Date.now(), updatedAt: Date.now() });
    }
    await batch.commit();

    return NextResponse.json({ success: true, count: seedProjects.length });
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
