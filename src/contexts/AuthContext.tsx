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
  signInWithCredential,
  GoogleAuthProvider,
  signOut,
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
    const { auth, db } = getFirebaseApp();
    if (!auth || !db) { setLoading(false); return; }

    // Handle server-side OAuth result: Google ID token in URL
    const params = new URLSearchParams(window.location.search);
    const googleIdToken = params.get("g_token");
    const authError = params.get("auth_error");

    if (authError) {
      const messages: Record<string, string> = {
        access_denied: "Sign-in was cancelled or denied.",
        server_config: "Server auth not configured yet. Ask the developer to check setup.",
        token_exchange: "Failed to complete sign-in (token exchange).",
        no_id_token: "No ID token received from Google.",
        server_error: "Server error during sign-in.",
      };
      alert(messages[authError] || "Sign-in failed: " + authError);
      window.history.replaceState({}, "", window.location.pathname);
    }

    if (googleIdToken) {
      window.history.replaceState({}, "", window.location.pathname);
      signInWithCredential(auth, GoogleAuthProvider.credential(googleIdToken))
        .then(() => console.log("Sign-in via server OAuth successful"))
        .catch((e) => {
          console.error("Server OAuth sign-in error:", e);
          if (e?.code === "auth/unauthorized-domain") {
            alert("Domain not authorized. Add it in Firebase Console > Authentication > Settings > Authorized domains.");
          } else if (e?.code === "auth/operation-not-allowed") {
            alert("Google sign-in not enabled. Enable it in Firebase Console > Authentication > Sign-in method.");
          } else if (e?.code === "auth/invalid-credential") {
            alert("Invalid Google credential. Make sure the same Firebase project is used for OAuth and client config.");
          } else {
            alert("Sign-in failed: " + (e?.message || "Unknown error"));
          }
        });
    }

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
  }, []);

  const signInWithGoogle = () => {
    window.location.href = "/api/auth/login";
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
