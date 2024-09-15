import { z } from "zod";

// Define product type schema (currently limited to "hat")
export const ProductTypeSchema = z.enum([
  "Embroidered Bark Hat",
]);

// Define product types (mapped to type values)
export const ProductTypes = [
  {
    value: "hat",
    label: "Embroidered Bark Hat" as const,
  },
] as const;

// Schema for product information validation
export const ProductInfoSchema = z.object({
  type: z.enum(["hat"]), // Restricted to "hat" for now
  imageUri: z.string().url(),
  name: z.string().min(1).max(100),
  description: z.string().max(500),
  quantity: z.union([
    z.number().int().min(1).max(3), // Allowing up to 3 items per order
    z
      .string()
      .regex(/^[1-3]$/)
      .transform(Number),
  ]),
  unitPrice: z.union([
    z.number().positive(), // Unit price must be positive
    z
      .string()
      .regex(/^\d+(\.\d+)?$/)
      .transform(Number),
  ]),
  email: z.string().email(), // Valid email format required
  account: z.string(), // Account field for user details
});

// Schema for shipping details validation
export const ShippingDetailsSchema = z.object({
  shippingName: z.string().min(1), // Name cannot be empty
  shippingEmail: z.string().email(), // Must be a valid email
  shippingPhone: z
    .string()
    .regex(/^[\d\-+()\s]*$/) // Optional: only allowing digits, spaces, and common phone symbols
    .nullable()
    .optional(), // Nullable and optional phone field
  shippingAddress: z.string().min(1), // Address cannot be empty
  shippingCity: z.string().min(1),
  shippingStateProvince: z.string().min(1),
  shippingCountryRegion: z.string().min(1),
  shippingZipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, "Invalid Zip Code") // US-based Zip Code validation, adjust for other regions
    .min(1), // At least 1 character required
});

// Infer types for use in TypeScript
export type ProductType = z.infer<typeof ProductTypeSchema>;
export type ProductInfo = z.infer<typeof ProductInfoSchema>;
export type ShippingInfo = z.infer<typeof ShippingDetailsSchema>;
