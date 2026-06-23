"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  GoogleAuthProvider,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getFirebaseApp } from "@/lib/firebase";
import type { UserProfile } from "@/types";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const { auth, db } = getFirebaseApp();
      if (!auth || !db) { setLoading(false); return; }

      const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
        try {
          setUser(firebaseUser);
          if (firebaseUser) {
            const ref = doc(db, "users", firebaseUser.uid);
            const snap = await getDoc(ref);
            if (snap.exists()) {
              setProfile(snap.data() as UserProfile);
            } else {
              const newProfile: UserProfile = {
                uid: firebaseUser.uid,
                name: firebaseUser.displayName || "",
                email: firebaseUser.email || "",
                photoURL: firebaseUser.photoURL || "",
                role: "client",
                createdAt: Date.now(),
              };
              await setDoc(ref, newProfile);
              setProfile(newProfile);
            }
          } else {
            setProfile(null);
          }
        } catch (e) {
          console.error("Auth state error:", e);
        } finally {
          setLoading(false);
        }
      });
      return () => unsub();
    } catch (e) {
      console.error("Auth init error:", e);
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = async () => {
    try {
      const { auth } = getFirebaseApp();
      if (!auth) {
        alert("Firebase not configured. Check console for details.");
        return;
      }
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (e: any) {
      console.error("Sign-in error:", e);
      alert("Sign-in failed: " + (e?.message || "Unknown error"));
    }
  };

  const logout = async () => {
    const { auth } = getFirebaseApp();
    if (!auth) return;
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAdmin: profile?.role === "admin",
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
