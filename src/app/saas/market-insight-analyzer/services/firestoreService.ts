import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const USERS_COLLECTION = 'users';

const LOCAL_STORAGE_KEY_PREFIX = 'velox:market-insight-analyzer:usageCount:';

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
  getUsageCount: async (uid: string): Promise<number> => {
    try {
      const userRef = doc(db, USERS_COLLECTION, uid);
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

  incrementUsage: async (uid: string): Promise<number> => {
    const userRef = doc(db, USERS_COLLECTION, uid);
    try {
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const current = snap.data().usageCount || 0;
        const next = current + 1;
        setLocalUsageCount(uid, next);
        await updateDoc(userRef, {
          usageCount: increment(1),
          lastUsedAt: serverTimestamp(),
        });
        return next;
      }

      // Create the doc if it doesn't exist
      await setDoc(userRef, {
        plan: 'free',
        usageCount: 1,
        createdAt: serverTimestamp(),
        lastUsedAt: serverTimestamp(),
      });
      setLocalUsageCount(uid, 1);
      return 1;
    } catch (error) {
      console.warn('Firestore incrementUsage failed:', error);
      const next = getLocalUsageCount(uid) + 1;
      setLocalUsageCount(uid, next);
      return next;
    }
  },

  canPerformAction: async (uid: string, maxActions: number): Promise<boolean> => {
    const count = await firestoreService.getUsageCount(uid);
    return count < maxActions;
  },
};
