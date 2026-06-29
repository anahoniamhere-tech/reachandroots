import { initializeApp } from 'firebase/app';
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

const realAuth = getAuth(app);
export const db = getFirestore(app, "ai-studio-38f5b8a6-3fca-4b7f-a650-42c5c99a4936");

// Mock auth state
let currentUser: User | null = null;
const authListeners: ((user: User | null) => void)[] = [];

try {
  const savedUser = localStorage.getItem('rr_mock_user');
  if (savedUser) {
    currentUser = JSON.parse(savedUser) as User;
  }
} catch (e) {
  console.warn('Failed to load mock user from localStorage', e);
}

// Wrapper for auth to return our mock user or fallback
export const auth = new Proxy(realAuth, {
  get(target, prop) {
    if (prop === 'currentUser') {
      return currentUser || target.currentUser;
    }
    const val = Reflect.get(target, prop);
    if (typeof val === 'function') {
      return val.bind(target);
    }
    return val;
  }
}) as any;

// Custom onAuthStateChanged
export const onAuthStateChanged = (authObj: any, callback: (user: User | null) => void) => {
  authListeners.push(callback);
  callback(currentUser || realAuth.currentUser);

  const unsubscribeReal = fbOnAuthStateChanged(realAuth, (user) => {
    if (!currentUser) {
      callback(user);
    }
  });

  return () => {
    unsubscribeReal();
    const idx = authListeners.indexOf(callback);
    if (idx !== -1) {
      authListeners.splice(idx, 1);
    }
  };
};

// Custom signOut
export const signOut = async (authObj?: any): Promise<void> => {
  currentUser = null;
  localStorage.removeItem('rr_mock_user');
  await fbSignOut(realAuth);
  authListeners.forEach(cb => cb(null));
};

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

export const signInWithPasscode = async (passcode: string): Promise<User> => {
  if (passcode.trim().toUpperCase() === 'RR666') {
    const user = {
      uid: 'anahoniamhere',
      email: 'anahoniamhere@gmail.com',
      displayName: 'Administrator',
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: '',
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => 'mock-admin-token-RR666',
      getIdTokenResult: async () => ({ token: 'mock-admin-token-RR666', signInProvider: null, claims: {}, authTime: '', issuedAtTime: '', expirationTime: '' }),
      reload: async () => {},
      toJSON: () => ({})
    } as unknown as User;
    
    currentUser = user;
    localStorage.setItem('rr_mock_user', JSON.stringify(user));
    
    // Notify all auth listeners
    authListeners.forEach(cb => cb(user));
    return user;
  } else {
    throw new Error('Invalid access code');
  }
};

