import "server-only";

let adminApp: any = null;
let adminDb: any = null;

function getAdmin() {
  if (adminApp) return { adminApp, adminDb };

  try {
    const { initializeApp, getApps, cert } = require("firebase-admin/app");
    const { getFirestore } = require("firebase-admin/firestore");

    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
      console.warn("Firebase Admin: missing credentials, running in limited mode");
      return { adminApp: null, adminDb: null };
    }

    const app =
      getApps().length === 0
        ? initializeApp({
            credential: cert({
              projectId,
              clientEmail,
              privateKey: privateKey.replace(/\\n/g, "\n"),
            }),
          })
        : getApps()[0];

    adminApp = app;
    adminDb = getFirestore(app);
  } catch (e) {
    console.warn("Firebase Admin init failed:", e);
  }

  return { adminApp, adminDb };
}

export { getAdmin };
