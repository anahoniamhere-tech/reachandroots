import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  projectId: "gen-lang-client-0920193719",
  appId: "1:260399646277:web:8fbcd7dee926f0fe0ac52c",
  apiKey: "AIzaSyDJvBLFGz4RB1kGJ9V9kILKjH4dA3GTwX8",
  authDomain: "gen-lang-client-0920193719.firebaseapp.com",
  storageBucket: "gen-lang-client-0920193719.firebasestorage.app",
  messagingSenderId: "260399646277",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-38f5b8a6-3fca-4b7f-a650-42c5c99a4936");

async function run() {
  const querySnapshot = await getDocs(collection(db, "orders"));
  let count = 0;
  for (const document of querySnapshot.docs) {
    const data = document.data();
    if (data.tierId === "Single Workshop 2" || data.totalPrice === 25) {
      await updateDoc(doc(db, "orders", document.id), {
        totalPrice: 20,
        tierId: "Single Workshop: Mind Programming"
      });
      console.log("Updated document", document.id, "for", data.email);
      count++;
    }
  }
  console.log("Total updated:", count);
  process.exit(0);
}

run().catch(console.error);
