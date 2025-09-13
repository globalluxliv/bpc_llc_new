// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Make sure Storage rules that require auth can be satisfied.
export async function ensureFirebaseAnon() {
  if (!auth.currentUser) {
    try {
      await signInAnonymously(auth);
    } catch {
      // ignore; if your rules allow unauth writes you won't need this
    }
  }
}
