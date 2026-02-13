import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import { User } from '../types';

// Convert Firebase user to app User
function toAppUser(fbUser: FirebaseUser): User {
  return {
    id: fbUser.uid,
    email: fbUser.email || '',
    name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
  };
}

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const authService = {
  // ─── Email + Password ─────────────────────────────────────
  async login(email: string, password: string): Promise<User> {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return toAppUser(cred.user);
  },

  async signup(email: string, password: string, name: string): Promise<User> {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });

    // Create Firestore user doc
    await setDoc(doc(db, 'users', cred.user.uid), {
      email,
      name,
      plan: 'free',
      createdAt: serverTimestamp(),
    });

    return toAppUser(cred.user);
  },

  // ─── OAuth Providers ──────────────────────────────────────
  async loginWithGoogle(): Promise<User> {
    const cred = await signInWithPopup(auth, googleProvider);
    // Create/update user doc on first OAuth login
    const userRef = doc(db, 'users', cred.user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        email: cred.user.email,
        name: cred.user.displayName || '',
        plan: 'free',
        createdAt: serverTimestamp(),
      });
    }
    return toAppUser(cred.user);
  },

  async loginWithGithub(): Promise<User> {
    const cred = await signInWithPopup(auth, githubProvider);
    const userRef = doc(db, 'users', cred.user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        email: cred.user.email,
        name: cred.user.displayName || '',
        plan: 'free',
        createdAt: serverTimestamp(),
      });
    }
    return toAppUser(cred.user);
  },

  // ─── Password Reset ───────────────────────────────────────
  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  },

  // ─── Session ──────────────────────────────────────────────
  logout(): Promise<void> {
    return signOut(auth);
  },

  getCurrentUser(): User | null {
    const fbUser = auth.currentUser;
    return fbUser ? toAppUser(fbUser) : null;
  },

  /** Subscribe to auth state changes. Returns unsubscribe fn. */
  onAuthChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, (fbUser) => {
      callback(fbUser ? toAppUser(fbUser) : null);
    });
  },
};