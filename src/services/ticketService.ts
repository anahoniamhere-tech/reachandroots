import { 
  collection, doc, getDoc, getDocs, setDoc, updateDoc, 
  increment, query, where, onSnapshot, serverTimestamp, runTransaction 
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
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

  // Create Order with Transaction for Inventory Isolation
  async placeOrder(orderData: Partial<Order>): Promise<string> {
    const orderId = doc(collection(db, 'orders')).id;
    const inventoryPath = `inventory/${orderData.tierId}_${orderData.day}`;
    const tierPath = `ticketTiers/${orderData.tierId}`;

    try {
      await runTransaction(db, async (transaction) => {
        const invRef = doc(db, 'inventory', `${orderData.tierId}_${orderData.day}`);
        const tierRef = doc(db, 'ticketTiers', orderData.tierId!);
        
        const invSnap = await transaction.get(invRef);
        const tierSnap = await transaction.get(tierRef);

        if (!invSnap.exists()) throw new Error("Inventory record not found");
        const invData = invSnap.data() as Inventory;
        
        if (invData.available < orderData.quantity!) {
          throw new Error("Sold out or insufficient stock");
        }

        // Update inventory
        transaction.update(invRef, {
          available: increment(-orderData.quantity!)
        });

        // Update tier sold count
        transaction.update(tierRef, {
          soldCount: increment(orderData.quantity!)
        });

        // Create order
        const orderRef = doc(db, 'orders', orderId);
        transaction.set(orderRef, {
          ...orderData,
          status: 'paid', // For demo, we mark as paid immediately
          createdAt: new Date().toISOString(),
          paymentId: `mock_${Date.now()}`
        });
      });

      return orderId;
    } catch (error) {
      handleFirestoreError(error, 'WRITE', 'orders');
      throw error;
    }
  }
};
