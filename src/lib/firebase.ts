import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocFromServer,
  getDocs, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  onSnapshot, 
  increment, 
  serverTimestamp, 
  runTransaction, 
  writeBatch 
} from 'firebase/firestore';
import { 
  getAuth, 
  onAuthStateChanged as fbOnAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider,
  signOut as fbSignOut, 
  User 
} from 'firebase/auth';

const firebaseConfig = {
  projectId: "gen-lang-client-0920193719",
  appId: "1:260399646277:web:8fbcd7dee926f0fe0ac52c",
  apiKey: "AIzaSyDJvBLFGz4RB1kGJ9V9kILKjH4dA3GTwX8",
  authDomain: "gen-lang-client-0920193719.firebaseapp.com",
  storageBucket: "gen-lang-client-0920193719.firebasestorage.app",
  messagingSenderId: "260399646277",
};

const app = initializeApp(firebaseConfig);

let appCheck;
if (typeof window !== 'undefined') {
  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6LcenT4tAAAAAEDXtuLJxxjW57zW2TLIOPYvjvBr'),
    isTokenAutoRefreshEnabled: true
  });
}

const realAuth = getAuth(app);
export const db = getFirestore(app, "ai-studio-38f5b8a6-3fca-4b7f-a650-42c5c99a4936");

export const auth = realAuth;
export const onAuthStateChanged = fbOnAuthStateChanged;
export const signOut = () => fbSignOut(realAuth);

export {
  signInWithEmailAndPassword,
  collection,
  doc,
  getDoc,
  getDocFromServer,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  increment,
  serverTimestamp,
  runTransaction,
  writeBatch
};

export const submitRegistration = async (data: any): Promise<void> => {
  try {
    const registrationsRef = collection(db, 'registrations');
    await setDoc(doc(registrationsRef), {
      ...data,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export type { User };

export const signInWithGoogle = async (emailHint?: string): Promise<any> => {
  const provider = new GoogleAuthProvider();
  if (emailHint) {
    provider.setCustomParameters({
      login_hint: emailHint
    });
  }
  return signInWithPopup(realAuth, provider);
};
