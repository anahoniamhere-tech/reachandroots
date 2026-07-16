import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  projectId: "gen-lang-client-0920193719",
  appId: "1:260399646277:web:8fbcd7dee926f0fe0ac52c",
  apiKey: "AIzaSyDJvBLFGz4RB1kGJ9V9kILKjH4dA3GTwX8",
  authDomain: "gen-lang-client-0920193719.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-38f5b8a6-3fca-4b7f-a650-42c5c99a4936");

async function runTest() {
  console.log("Submitting test entry...");
  const data = {
    fullName: "Test User",
    city: "Tripoli",
    email: "test@example.com",
    whatsapp: "+961000000",
    roles: ["Writer/poet"],
    goals: ["Learn new skills"],
    activityTypes: ["In-person meetups in Tripoli"],
    whatsappConsent: false,
    dataConsent: true,
    createdAt: serverTimestamp()
  };

  const docRef = await addDoc(collection(db, "community"), data);
  console.log("Test doc successfully created with ID:", docRef.id);
  process.exit(0);
}

runTest().catch(e => {
  console.error("Test failed:", e);
  process.exit(1);
});
