import { 
  db, auth, collection, doc, getDoc, getDocs, setDoc, updateDoc, 
  increment, query, where, onSnapshot, serverTimestamp, runTransaction 
} from '../lib/firebase';
import { TicketTier, Order, Inventory, OperationType } from '../types';

// Helper for errors as required by Firebase Instructions
interface FirestoreErrorInfo {
  error: string;
  operationType: string;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: string, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const TicketService = {
  // Fetch active ticket tiers
  async getTiers(): Promise<TicketTier[]> {
    const path = 'ticketTiers';
    try {
      const q = query(collection(db, path), where('status', '==', 'active'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TicketTier));
    } catch (error) {
      handleFirestoreError(error, 'LIST', path);
      return [];
    }
  },

  // Real-time inventory listener
  subscribeToInventory(callback: (inv: Inventory[]) => void) {
    const path = 'inventory';
    const q = collection(db, path);
    return onSnapshot(q, (snapshot) => {
      const inv = snapshot.docs.map(doc => doc.data() as Inventory);
      callback(inv);
    }, (error) => {
      handleFirestoreError(error, 'LIST', path);
    });
  },

  // Create Order via Secure Backend API
  async placeOrder(orderData: Partial<Order>): Promise<string> {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Must be logged in to place an order");
      const idToken = await user.getIdToken();

      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          tierId: orderData.tierId,
          quantity: orderData.quantity,
          day: orderData.day,
          buyerInfo: orderData.buyerInfo,
          vipDetails: orderData.vipDetails
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Checkout failed");
      }

      const result = await response.json();
      return result.orderId;
    } catch (error) {
      console.error("Order placement failed:", error);
      throw error;
    }
  }
};
