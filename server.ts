import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import QRCode from "qrcode";
import { z } from "zod";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import firebaseConfig from "./firebase-applet-config.json" with { type: "json" };
import nodemailer from "nodemailer";

// Initialize Firebase Admin (Using Default Credentials or Config)
// In a real production environment, you'd use a service account key
if (!admin.apps.length) {
  try {
    admin.initializeApp();
  } catch (error) {
    console.error("Firebase Admin initialization failed. Ensure you are in a supported environment.", error);
  }
}

const db = admin.apps.length ? getFirestore(firebaseConfig.firestoreDatabaseId) : null;

// Outbound Mail Transporter Setup (Hostinger SMTP)
const mailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.hostinger.com",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: (process.env.SMTP_PORT || "465") === "465",
  auth: {
    user: process.env.SMTP_USER || "contact@rootsandreach.org",
    pass: process.env.SMTP_PASS || "",
  },
});

// Validation Schemas
const OrderRequestSchema = z.object({
  tierId: z.string(),
  quantity: z.number().int().positive().max(10),
  day: z.string(),
  buyerInfo: z.object({
    fullName: z.string(),
    email: z.string().email(),
  }),
});

const SendEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  html: z.string().min(1),
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Services ---

const InventoryService = {
  async checkAvailability(tierId: string, day: string, quantity: number) {
    if (!db) return true; // Fallback for demo
    const invRef = db.collection("inventory").doc(`${tierId}_${day}`);
    const doc = await invRef.get();
    if (!doc.exists) return false;
    const data = doc.data();
    return data && data.available >= quantity;
  },

  async decremenentInventory(tierId: string, day: string, quantity: number) {
    if (!db) return;
    const invRef = db.collection("inventory").doc(`${tierId}_${day}`);
    await invRef.update({
      available: admin.firestore.FieldValue.increment(-quantity)
    });
  }
};

const PaymentService = {
  async createCheckoutSession(orderData: any) {
    // Mocking Stripe Checkout Session
    const id = `sess_${Math.random().toString(36).substring(7)}`;
    return {
      id,
      url: `/checkout/success?session_id=${id}`,
    };
  }
};

const ReportingService = {
  async getDailySnapshot() {
    if (!db) return { totalOrders: 0, revenue: 0 };
    const orders = await db.collection("orders").get();
    let revenue = 0;
    orders.forEach(doc => {
      revenue += doc.data().totalPrice || 0;
    });
    return {
      totalOrders: orders.size,
      revenue
    };
  }
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      adminInitialized: !!db,
      firebaseEnv: {
        projectId: process.env.GOOGLE_CLOUD_PROJECT || "not set",
        hasDefaultCredentials: !!process.env.GOOGLE_APPLICATION_CREDENTIALS
      }
    });
  });

  // 1. Checkout Session Creation (Inventory Guarded)
  app.post("/api/checkout/create-session", async (req, res) => {
    try {
      const validated = OrderRequestSchema.parse(req.body);
      
      const available = await InventoryService.checkAvailability(
        validated.tierId, 
        validated.day, 
        validated.quantity
      );

      if (!available) {
        return res.status(400).json({ error: "Inventory not available" });
      }

      const session = await PaymentService.createCheckoutSession(validated);
      res.json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      }
      res.status(500).json({ error: "Checkout initialization failed" });
    }
  });

  // 2. Webhook Handler (Mock)
  app.post("/api/webhooks/payment", async (req, res) => {
    // In production, verify Stripe signature
    const event = req.body;
    console.log("[Webhook] Received event:", event.type);
    
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      // Finalize order in DB, send email, etc.
      console.log("[Webhook] Finalizing order for session:", session.id);
    }
    
    res.json({ received: true });
  });

  // 3. Reporting Endpoint
  app.get("/api/admin/report", async (req, res) => {
    try {
      const report = await ReportingService.getDailySnapshot();
      res.json(report);
    } catch (error) {
      res.status(500).json({ error: "Reporting failed" });
    }
  });

  // 4. Send Creator Invitation Email (Admin API)
  app.post("/api/admin/send-email", async (req, res) => {
    try {
      // Security Check
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Missing or invalid authorization token" });
      }
      
      const idToken = authHeader.split('Bearer ')[1];
      let decodedToken;
      try {
        decodedToken = await admin.auth().verifyIdToken(idToken);
      } catch (authError) {
        return res.status(401).json({ error: "Unauthorized access" });
      }

      // Check if user is admin
      if (db) {
        const adminDoc = await db.collection('admins').doc(decodedToken.uid).get();
        const isAnahon = decodedToken.email === 'anahoniamhere@gmail.com' && decodedToken.email_verified;
        
        if (!adminDoc.exists && !isAnahon) {
          return res.status(403).json({ error: "Forbidden: Admin access required" });
        }
      } else {
        return res.status(500).json({ error: "Database not initialized" });
      }

      const validated = SendEmailSchema.parse(req.body);
      
      if (!process.env.SMTP_PASS) {
        console.warn("SMTP_PASS is not configured. Email sending will be simulated.");
        return res.status(200).json({ 
          success: true, 
          simulated: true, 
          message: "Email sending simulated because SMTP_PASS is not set." 
        });
      }

      await mailTransporter.sendMail({
        from: `"Roots & Reach" <${process.env.SMTP_USER || "contact@rootsandreach.org"}>`,
        to: validated.to,
        subject: validated.subject,
        html: validated.html,
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Failed to send email:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      }
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to send email" });
    }
  });

  // QR Code Generation
  app.get("/api/tickets/qr/:code", async (req, res) => {
    try {
      const { code } = req.params;
      const buffer = await QRCode.toBuffer(code);
      res.type("image/png").send(buffer);
    } catch (error) {
      res.status(500).send("Failed to generate QR code");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
