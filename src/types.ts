export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export type EventDay = "Friday" | "Saturday" | "Sunday";

export interface TicketTier {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: "single" | "3-day" | "2-day";
  isVip: boolean;
  includes: string[];
  excludes: string[];
  capacity: number;
  soldCount: number;
  badge?: string;
  wristband: string;
  status: "active" | "sold-out" | "paused";
  sortOrder: number;
}

export interface Inventory {
  tierId: string;
  day: EventDay | "all";
  available: number;
  held: number;
}

export interface BuyerInfo {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  language: string;
}

export interface VipDetails {
  dietaryPreference?: string;
  welcomeKitName?: string;
}

export interface Order {
  id?: string;
  userId?: string;
  tierId: string;
  day: EventDay | "all";
  quantity: number;
  totalPrice: number;
  buyerInfo: BuyerInfo;
  vipDetails?: VipDetails;
  status: "pending" | "paid" | "cancelled" | "failed";
  whishReceiptUrl?: string;
  paymentStatus?: 'paid' | 'unpaid' | 'pending';
  paymentMethod?: 'cash' | 'whish';
  whatsappSent?: boolean;
  createdAt: string;
  paymentId?: string;
  qrCode?: string;
  checkedIn?: boolean;
}

export interface WaitlistEntry {
  tierId: string;
  day: EventDay | "all";
  email: string;
  name: string;
  createdAt: string;
}
