import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";

const firebaseConfig = {
  projectId: "gen-lang-client-0920193719",
  appId: "1:260399646277:web:8fbcd7dee926f0fe0ac52c",
  apiKey: "AIzaSyDJvBLFGz4RB1kGJ9V9kILKjH4dA3GTwX8",
  authDomain: "gen-lang-client-0920193719.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-38f5b8a6-3fca-4b7f-a650-42c5c99a4936");

async function check() {
  const q = query(collection(db, "community"), orderBy("createdAt", "desc"), limit(1));
  const snap = await getDocs(q);
  snap.forEach(doc => {
    console.log("LATEST_DOC_ID:", doc.id);
    console.log("Data:", doc.data());
  });
  process.exit(0);
}

check().catch(console.error);
