import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCuhyClf1xDGkc-hyHhrc2CCh3a1h9AeSo",
  authDomain: "market-insight-analyzer.firebaseapp.com",
  projectId: "market-insight-analyzer",
  storageBucket: "market-insight-analyzer.firebasestorage.app",
  messagingSenderId: "793243121660",
  appId: "1:793243121660:web:3b667082d8b9fdbe486479",
  measurementId: "G-TS2WC0VZVF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
