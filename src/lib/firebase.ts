import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

let app: any = null;
let authInstance: any = null;
let dbInstance: any = null;
let storageInstance: any = null;

function getFirebaseApp() {
  if (typeof window === "undefined") return { auth: null, db: null, storage: null };

  if (!app) {
    try {
      const config = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      };

      if (!config.apiKey) return { auth: null, db: null, storage: null };

      app = getApps().length === 0 ? initializeApp(config) : getApps()[0];
      authInstance = getAuth(app);
      dbInstance = getFirestore(app);
      storageInstance = getStorage(app);
    } catch (e) {
      console.error("Firebase init error:", e);
      return { auth: null, db: null, storage: null };
    }
  }

  return { auth: authInstance, db: dbInstance, storage: storageInstance };
}

export { getFirebaseApp };
