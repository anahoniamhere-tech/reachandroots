import { 
  db, auth, collection, getDocs, query, where, writeBatch, doc
} from '../lib/firebase';
import { Order, TicketTier } from '../types';
import { TICKET_TIERS, EVENT_DAYS } from '../constants';

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

export const AdminService = {
  async getSalesReport() {
    const path = 'orders';
    try {
      const ordersSnap = await getDocs(collection(db, path));
      const orders = ordersSnap.docs.map(d => d.data() as Order);
      
      const revenue = orders.reduce((acc, curr) => acc + curr.totalPrice, 0);
      const salesByTier = orders.reduce((acc: Record<string, number>, curr) => {
        acc[curr.tierId] = (acc[curr.tierId] || 0) + curr.quantity;
        return acc;
      }, {});

      return {
        totalOrders: orders.length,
        totalRevenue: revenue,
        salesByTier
      };
    } catch (error) {
      handleFirestoreError(error, 'LIST', path);
      return { totalOrders: 0, totalRevenue: 0, salesByTier: {} };
    }
  },

  async isSeeded() {
    const path = 'ticketTiers';
    try {
      const q = query(collection(db, path));
      const snapshot = await getDocs(q);
      return !snapshot.empty;
    } catch (error) {
      handleFirestoreError(error, 'LIST', path);
      return false;
    }
  },

  async getCommunityJoins() {
    const path = 'registrations';
    try {
      const snap = await getDocs(collection(db, path));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (error) {
      handleFirestoreError(error, 'LIST', path);
      return [];
    }
  },

  async getTicketBuyers() {
    const path = 'orders';
    try {
      const snap = await getDocs(collection(db, path));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (error) {
      handleFirestoreError(error, 'LIST', path);
      return [];
    }
  },

  async seedDatabase() {
    const batch = writeBatch(db);
    
    try {
      // Seed Tiers
      TICKET_TIERS.forEach(tier => {
        const tierRef = doc(db, 'ticketTiers', tier.id);
        batch.set(tierRef, tier);
      });

      // Seed Inventory
      TICKET_TIERS.forEach(tier => {
        if (tier.duration === 'single') {
          EVENT_DAYS.forEach(day => {
            const invRef = doc(db, 'inventory', `${tier.id}_${day.id}`);
            batch.set(invRef, {
              tierId: tier.id,
              day: day.id,
              available: Math.floor(tier.capacity / 3),
              held: 0
            });
          });
        } else {
          const invRef = doc(db, 'inventory', `${tier.id}_all`);
          batch.set(invRef, {
            tierId: tier.id,
            day: 'all',
            available: tier.capacity,
            held: 0
          });
        }
      });

      await batch.commit();
      console.log('Database seeded successfully');
    } catch (error) {
      handleFirestoreError(error, 'WRITE', 'batch_seed');
    }
  }
};
