import { z } from "zod";

const BLOCKED_PROTOCOLS = ["javascript:", "file:", "data:", "blob:", "ftp:"];

export const urlSchema = z
  .string()
  .min(1, "URL is required")
  .refine(
    (val) => {
      try {
        const url = new URL(val);
        return ["http:", "https:"].includes(url.protocol);
      } catch {
        return false;
      }
    },
    { message: "Please enter a valid HTTP or HTTPS URL" }
  )
  .refine(
    (val) => {
      const lower = val.toLowerCase().trim();
      return !BLOCKED_PROTOCOLS.some((p) => lower.startsWith(p));
    },
    { message: "This URL protocol is not supported" }
  );

export const nameSchema = z
  .string()
  .min(1, "Application name is required")
  .max(100, "Application name is too long")
  .refine((val) => val.trim().length > 0, {
    message: "Application name cannot be empty",
  });

export const versionSchema = z
  .string()
  .regex(/^\d+\.\d+\.\d+$/, "Version must be in format X.Y.Z (e.g. 1.0.0)");

export const dimensionSchema = z
  .number()
  .int("Must be a whole number")
  .min(200, "Minimum dimension is 200px")
  .max(7680, "Maximum dimension is 7680px");

export const generateRequestSchema = z.object({
  url: urlSchema,
  name: nameSchema,
  appId: z.string().min(1).max(200),
  version: versionSchema,
  author: z.string().max(200).default(""),
  description: z.string().max(1000).default(""),
  icon: z.string().nullable().default(null),
  width: dimensionSchema.default(1280),
  height: dimensionSchema.default(800),
  resizable: z.boolean().default(true),
  maximized: z.boolean().default(false),
  devTools: z.boolean().default(false),
  alwaysOnTop: z.boolean().default(false),
  appearance: z.enum(["system", "light", "dark"]).default("system"),
});

export type GenerateRequestInput = z.infer<typeof generateRequestSchema>;

export function validateUrl(url: string): { valid: boolean; error?: string } {
  const result = urlSchema.safeParse(url);
  if (result.success) {
    return { valid: true };
  }
  return { valid: false, error: result.error.issues[0]?.message };
}
