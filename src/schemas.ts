import { z } from "zod";

export const EventDaySchema = z.enum(["Friday", "Saturday", "Sunday", "all"]);

export const BuyerInfoSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Invalid phone number"),
  country: z.string().min(2),
  city: z.string().min(2),
  language: z.string().default("en"),
});

export const VipDetailsSchema = z.object({
  dietaryPreference: z.string().optional(),
  welcomeKitName: z.string().optional(),
});

export const OrderSchema = z.object({
  tierId: z.string(),
  day: EventDaySchema,
  quantity: z.number().int().positive().max(10),
  buyerInfo: BuyerInfoSchema,
  vipDetails: VipDetailsSchema.optional(),
});

export type ValidatedOrder = z.infer<typeof OrderSchema>;
