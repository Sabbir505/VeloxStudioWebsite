import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBsP9tJJTc4v-APbJ_i9O5PYOUr6SW0Jro",
  authDomain: "cv-forge-5c58d.firebaseapp.com",
  projectId: "cv-forge-5c58d",
  storageBucket: "cv-forge-5c58d.firebasestorage.app",
  messagingSenderId: "306363842236",
  appId: "1:306363842236:web:bde2a019783bab3dbd9ab9",
  measurementId: "G-6MKD2L0YSF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
