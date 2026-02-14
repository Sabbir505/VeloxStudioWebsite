import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION = 'users';

const LOCAL_STORAGE_KEY_PREFIX = 'velox:cv-forge:usageCount:';

const getLocalUsageCount = (uid: string): number => {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = window.localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}${uid}`);
    const parsed = raw ? Number(raw) : 0;
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  } catch {
    return 0;
  }
};

const setLocalUsageCount = (uid: string, count: number) => {
  if (typeof window === 'undefined') return;
  try {
    const safeCount = Number.isFinite(count) && count > 0 ? Math.floor(count) : 0;
    window.localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${uid}`, String(safeCount));
  } catch {
    // ignore
  }
};

export const firestoreService = {
  /** Get the current usage count for a user */
  async getUsageCount(uid: string): Promise<number> {
    try {
      const userRef = doc(db, COLLECTION, uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const count = snap.data().usageCount || 0;
        setLocalUsageCount(uid, count);
        return count;
      }
      return getLocalUsageCount(uid);
    } catch (error) {
      console.warn('Firestore getUsageCount failed:', error);
      return getLocalUsageCount(uid);
    }
  },

  /** Increment the usage count by 1 and return the new count */
  async incrementUsage(uid: string): Promise<number> {
    try {
      const userRef = doc(db, COLLECTION, uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const currentCount = snap.data().usageCount || 0;
        const newCount = currentCount + 1;
        await updateDoc(userRef, {
          usageCount: increment(1),
          lastUsedAt: serverTimestamp(),
        });
        setLocalUsageCount(uid, newCount);
        return newCount;
      } else {
        // Create the doc if it doesn't exist
        await setDoc(userRef, {
          plan: 'free',
          usageCount: 1,
          createdAt: serverTimestamp(),
          lastUsedAt: serverTimestamp(),
        });
        setLocalUsageCount(uid, 1);
        return 1;
      }
    } catch (error) {
      console.warn('Firestore incrementUsage failed:', error);
      const next = getLocalUsageCount(uid) + 1;
      setLocalUsageCount(uid, next);
      return next;
    }
  },

  /** Check if user can perform an action (under limit) */
  async canPerformAction(uid: string, maxActions: number): Promise<boolean> {
    const count = await this.getUsageCount(uid);
    return count < maxActions;
  },
};
