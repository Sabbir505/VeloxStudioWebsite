import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDQVGg4QjP2AFroCatQRhGwNMwekY7F3d0",
  authDomain: "cursor-for-ui.firebaseapp.com",
  projectId: "cursor-for-ui",
  storageBucket: "cursor-for-ui.firebasestorage.app",
  messagingSenderId: "161291780663",
  appId: "1:161291780663:web:ee6ae9ef59f68bbb0f35b2",
  measurementId: "G-TZPKD4XMG7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
