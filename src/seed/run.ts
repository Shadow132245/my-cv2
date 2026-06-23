/**
 * Seed script: Run once to populate Firestore with initial data.
 * Usage: npx ts-node --compiler-options '{"module":"commonjs"}' src/seed/run.ts
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { seedProjects } from "./projects";

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || "",
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || "",
    privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
  }),
});

const db = getFirestore(app);

async function seed() {
  console.log("Seeding projects...");
  const batch = db.batch();
  for (const p of seedProjects) {
    const ref = db.collection("projects").doc();
    batch.set(ref, { ...p, createdAt: Date.now(), updatedAt: Date.now() });
  }
  await batch.commit();
  console.log(`Seeded ${seedProjects.length} projects.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
