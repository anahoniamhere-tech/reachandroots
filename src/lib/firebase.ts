// Mock Firebase Auth and Firestore Service
// Decouples application from remote Firebase dependencies, storing all state locally in localStorage.

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  emailVerified?: boolean;
}

// Mock database container
export const db = {
  firestoreDatabaseId: 'mock-db'
};

// --- Mock Auth ---
let currentUser: User | null = null;
const authListeners: ((user: User | null) => void)[] = [];

try {
  const savedUser = localStorage.getItem('rr_mock_user');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }
} catch (e) {
  console.warn('Failed to load mock user from localStorage', e);
}

export const auth = {
  get currentUser() {
    return currentUser;
  }
};

export const onAuthStateChanged = (authObj: any, callback: (user: User | null) => void) => {
  authListeners.push(callback);
  // Call immediately with the current state
  callback(currentUser);
  return () => {
    const idx = authListeners.indexOf(callback);
    if (idx !== -1) {
      authListeners.splice(idx, 1);
    }
  };
};

export const signInWithPasscode = async (passcode: string): Promise<User> => {
  // Normalize passcode comparison
  if (passcode.trim().toUpperCase() === 'RR666') {
    const user: User = {
      uid: 'RR666',
      email: 'RR666',
      displayName: 'Administrator RR666',
      emailVerified: true
    };
    currentUser = user;
    localStorage.setItem('rr_mock_user', JSON.stringify(user));
    
    // Notify all auth listeners
    authListeners.forEach(cb => cb(user));
    return user;
  } else {
    throw new Error('Invalid access code');
  }
};

export const signOut = async (authObj?: any): Promise<void> => {
  currentUser = null;
  localStorage.removeItem('rr_mock_user');
  authListeners.forEach(cb => cb(null));
};

export const GoogleAuthProvider = class {};

// --- Mock Firestore ---
class MockDocRef {
  constructor(public collectionName: string, public id: string) {}
}

class MockCollectionRef {
  constructor(public collectionName: string) {}
}

class MockDocSnapshot {
  constructor(public ref: MockDocRef, private dataVal: any) {}
  get id() {
    return this.ref.id;
  }
  exists() {
    return this.dataVal !== undefined && this.dataVal !== null;
  }
  data() {
    return this.dataVal;
  }
}

class MockQuerySnapshot {
  constructor(public docs: MockDocSnapshot[]) {}
  get empty() {
    return this.docs.length === 0;
  }
}

class MockQuery {
  constructor(public collectionRef: MockCollectionRef, public constraints: any[]) {}
}

// Local Storage helpers
function getLocalCollection(name: string): Record<string, any> {
  try {
    const val = localStorage.getItem(`rr_db_${name}`);
    return val ? JSON.parse(val) : {};
  } catch (e) {
    return {};
  }
}

function saveLocalCollection(name: string, data: Record<string, any>) {
  localStorage.setItem(`rr_db_${name}`, JSON.stringify(data));
}

// Firestore operations
export const collection = (dbObj: any, path: string) => {
  return new MockCollectionRef(path);
};

export const doc = (dbOrColl: any, pathOrId?: string, id?: string) => {
  if (dbOrColl instanceof MockCollectionRef) {
    const collName = dbOrColl.collectionName;
    const docId = pathOrId || Math.random().toString(36).substring(2, 11);
    return new MockDocRef(collName, docId);
  } else {
    const collName = pathOrId!;
    const docId = id!;
    return new MockDocRef(collName, docId);
  }
};

export const getDoc = async (docRef: MockDocRef) => {
  const coll = getLocalCollection(docRef.collectionName);
  return new MockDocSnapshot(docRef, coll[docRef.id]);
};

export const getDocFromServer = async (docRef: MockDocRef) => {
  return getDoc(docRef);
};

export const getDocs = async (queryRef: any) => {
  let collName = '';
  let constraints: any[] = [];
  
  if (queryRef instanceof MockCollectionRef) {
    collName = queryRef.collectionName;
  } else if (queryRef instanceof MockQuery) {
    collName = queryRef.collectionRef.collectionName;
    constraints = queryRef.constraints;
  }
  
  const coll = getLocalCollection(collName);
  let docs = Object.keys(coll).map(id => new MockDocSnapshot(new MockDocRef(collName, id), coll[id]));
  
  // Apply where filtering
  for (const c of constraints) {
    docs = docs.filter(docSnap => {
      const d = docSnap.data();
      if (!d) return false;
      const fieldVal = d[c.field];
      if (c.op === '==') {
        return fieldVal === c.value;
      }
      return true;
    });
  }
  
  return new MockQuerySnapshot(docs);
};

export const query = (collectionRef: MockCollectionRef, ...constraints: any[]) => {
  return new MockQuery(collectionRef, constraints);
};

export const where = (field: string, op: string, value: any) => {
  return { field, op, value };
};

export const onSnapshot = (queryOrCollectionRef: any, onNext: (snapshot: MockQuerySnapshot) => void, onError?: (error: any) => void) => {
  // Execute immediately
  getDocs(queryOrCollectionRef).then(snapshot => {
    onNext(snapshot);
  }).catch(err => {
    if (onError) onError(err);
  });
  
  // Listen for database changes to propagate reactive updates
  const handler = () => {
    getDocs(queryOrCollectionRef).then(snapshot => {
      onNext(snapshot);
    });
  };
  
  window.addEventListener('rr_db_update', handler);
  return () => {
    window.removeEventListener('rr_db_update', handler);
  };
};

export const increment = (n: number) => {
  return { __type: 'increment', value: n };
};

export const serverTimestamp = () => new Date().toISOString();

export const setDoc = async (docRef: MockDocRef, data: any) => {
  const coll = getLocalCollection(docRef.collectionName);
  coll[docRef.id] = { ...data };
  saveLocalCollection(docRef.collectionName, coll);
  window.dispatchEvent(new Event('rr_db_update'));
};

export const updateDoc = async (docRef: MockDocRef, data: any) => {
  const coll = getLocalCollection(docRef.collectionName);
  const existing = coll[docRef.id] || {};
  for (const key of Object.keys(data)) {
    const val = data[key];
    if (val && val.__type === 'increment') {
      existing[key] = (Number(existing[key]) || 0) + val.value;
    } else {
      existing[key] = val;
    }
  }
  coll[docRef.id] = existing;
  saveLocalCollection(docRef.collectionName, coll);
  window.dispatchEvent(new Event('rr_db_update'));
};

class MockTransaction {
  private updates: { ref: MockDocRef; data: any; type: 'set' | 'update' }[] = [];
  
  async get(docRef: MockDocRef) {
    return getDoc(docRef);
  }
  
  set(docRef: MockDocRef, data: any) {
    this.updates.push({ ref: docRef, data, type: 'set' });
  }
  
  update(docRef: MockDocRef, data: any) {
    this.updates.push({ ref: docRef, data, type: 'update' });
  }
  
  async commitAll() {
    for (const item of this.updates) {
      if (item.type === 'set') {
        await setDoc(item.ref, item.data);
      } else {
        await updateDoc(item.ref, item.data);
      }
    }
  }
}

export const runTransaction = async (dbObj: any, updateFunction: (transaction: MockTransaction) => Promise<any>) => {
  const transaction = new MockTransaction();
  const result = await updateFunction(transaction);
  await transaction.commitAll();
  return result;
};

class MockBatch {
  private operations: (() => Promise<void>)[] = [];
  
  set(docRef: MockDocRef, data: any) {
    this.operations.push(() => setDoc(docRef, data));
  }
  
  update(docRef: MockDocRef, data: any) {
    this.operations.push(() => updateDoc(docRef, data));
  }
  
  async commit() {
    for (const op of this.operations) {
      await op();
    }
  }
}

export const writeBatch = (dbObj: any) => {
  return new MockBatch();
};
