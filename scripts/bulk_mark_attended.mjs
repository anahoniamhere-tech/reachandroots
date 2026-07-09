import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// Initialize Firebase Admin (assuming default application credentials or a service account key)
// In a real scenario, you'd load the service account key here, but since this is running locally,
// you might need to point to the service account JSON.
// For now, we'll assume the environment is set up or we can provide the path.

// The list of attendees from the screenshots (case-insensitive fuzzy match)
const attendedNames = [
  "Layal nabouch",
  "Bouchra dardasawi",
  "Iman Ammar",
  "Amira hamdan",
  "Mirna sanusi",
  "Abir sanusi",
  "Raed hamze",
  "Moustafa kanouj",
  "Soumaya Hamze",
  "Rehab Aboud",
  "Ahmad Melhem",
  // "Fatima Mourad", // Not checked in screenshot, assuming no-show
  "Hanan Assoum",
  "Sara salim",
  "Mohamad Ibrahim",
  "Abdallah tahan",
  "Malak sarmout",
  "Khadija tahan",
  "Raghad sedik",
  "Hanady sayed",
  "Suraya al saadi",
  "Rayan hwala",
  "Banane manan",
  "Moustafa hammoud",
  "Rim Amoun",
  "Noura Amoun",
  "Hana ghourani",
  "Reina kanawati",
  "Amal ibrahim"
];

async function main() {
  try {
    // If you have a service account key, uncomment and use it:
    // const serviceAccount = JSON.parse(readFileSync('./service-account.json', 'utf8'));
    // initializeApp({ credential: cert(serviceAccount) });
    
    // Otherwise, assuming GOOGLE_APPLICATION_CREDENTIALS is set
    initializeApp();
    const db = getFirestore();
    
    console.log("Fetching orders from Firestore...");
    const ordersSnap = await db.collection('orders').get();
    
    let matchedCount = 0;
    const batch = db.batch();
    
    ordersSnap.forEach(doc => {
      const data = doc.data();
      const buyerName = (data.customerInfo?.name || data.name || data.buyerInfo?.fullName || "").toLowerCase();
      
      const isAttended = attendedNames.some(name => {
        // Simple fuzzy match: check if the normalized names match or if one contains the other
        const normalizedTarget = name.toLowerCase().trim();
        return buyerName === normalizedTarget || 
               buyerName.includes(normalizedTarget) || 
               normalizedTarget.includes(buyerName);
      });
      
      if (isAttended) {
        console.log(`Matching order for: ${data.customerInfo?.name || data.name}`);
        batch.update(doc.ref, { 
          attended: true, 
          attendedAt: new Date().toISOString() 
        });
        matchedCount++;
      }
    });
    
    if (matchedCount > 0) {
      console.log(`Found ${matchedCount} matching orders. Committing updates...`);
      await batch.commit();
      console.log("Updates committed successfully.");
    } else {
      console.log("No matching orders found to update.");
    }
  } catch (error) {
    console.error("Error executing bulk update:", error);
  }
}

main();
