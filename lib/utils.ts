import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function generateAppId(name: string): string {
  const slug = slugify(name).replace(/-/g, "");
  return `com.deskify.${slug || "app"}`;
}

export function extractNameFromUrl(urlStr: string): string {
  try {
    if (!urlStr) return "";
    const formattedUrl = urlStr.match(/^https?:\/\//i) ? urlStr : `https://${urlStr}`;
    const parsed = new URL(formattedUrl);
    const host = parsed.hostname.replace(/^www\./, "");
    const parts = host.split(".");
    if (parts.length === 0 || !parts[0]) return "";
    const name = parts[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return "";
  }
}

export function getFaviconUrl(urlStr: string): string {
  try {
    if (!urlStr) return "";
    const formattedUrl = urlStr.match(/^https?:\/\//i) ? urlStr : `https://${urlStr}`;
    const parsed = new URL(formattedUrl);
    if (!parsed.hostname || parsed.hostname.length < 3) return "";
    return `https://www.google.com/s2/favicons?domain=${parsed.hostname}&sz=128`;
  } catch {
    return "";
  }
}

