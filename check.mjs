import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const app = initializeApp({
  apiKey: "AIzaSyDJvBLFGz4RB1kGJ9V9kILKjH4dA3GTwX8",
  projectId: "ai-studio-38f5b8a6-3fca-4b7f-a650-42c5c99a4936",
});

const db = getFirestore(app);

async function check() {
  const snap = await getDocs(collection(db, 'orders'));
  const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  console.log(`Total orders: ${docs.length}`);
  
  const boushra = docs.filter(d => 
    JSON.stringify(d).toLowerCase().includes('boush') ||
    JSON.stringify(d).toLowerCase().includes('bush')
  );
  
  console.log('Boushra records:');
  console.log(JSON.stringify(boushra, null, 2));
}

check().catch(console.error).finally(() => process.exit(0));
