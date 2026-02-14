import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface User {
  email: string;
  name: string;
  id: string;
}

const USERS_COLLECTION = 'users';

const createUserDoc = async (uid: string, email: string, name: string) => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email,
      name,
      plan: 'free',
      usageCount: 0,
      createdAt: new Date().toISOString(),
    });
  }
};

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return { id: cred.user.uid, email: cred.user.email || '', name: cred.user.displayName || '' };
  },

  signup: async (email: string, password: string, name: string): Promise<User> => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await createUserDoc(cred.user.uid, email, name);
    return { id: cred.user.uid, email: cred.user.email || '', name };
  },

  loginWithGoogle: async (): Promise<User> => {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    await createUserDoc(cred.user.uid, cred.user.email || '', cred.user.displayName || '');
    return { id: cred.user.uid, email: cred.user.email || '', name: cred.user.displayName || '' };
  },

  loginWithGithub: async (): Promise<User> => {
    const provider = new GithubAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    await createUserDoc(cred.user.uid, cred.user.email || '', cred.user.displayName || '');
    return { id: cred.user.uid, email: cred.user.email || '', name: cred.user.displayName || '' };
  },

  resetPassword: async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email);
  },

  logout: async (): Promise<void> => {
    await signOut(auth);
  },

  onAuthChanged: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        callback({ id: fbUser.uid, email: fbUser.email || '', name: fbUser.displayName || '' });
      } else {
        callback(null);
      }
    });
  },
};
