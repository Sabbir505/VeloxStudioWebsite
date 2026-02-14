import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB02KVy_9vZ6SH3k1RLXNYFOqGu0g5157U",
  authDomain: "cryptochart-ai.firebaseapp.com",
  projectId: "cryptochart-ai",
  storageBucket: "cryptochart-ai.firebasestorage.app",
  messagingSenderId: "1051444190882",
  appId: "1:1051444190882:web:a6579c72ef4c2c6c3141fb",
  measurementId: "G-KV7NMNYMVE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
