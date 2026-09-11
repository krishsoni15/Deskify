import type { GeneratorConfig, DashboardApp } from "@/types/generator";

const STORAGE_KEY = "deskify_user_apps";

export function getSavedApps(): DashboardApp[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveAppToStorage(config: GeneratorConfig): DashboardApp {
  const existing = getSavedApps();
  const id = `app-${Date.now()}`;
  const now = new Date();
  const createdAt = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const newApp: DashboardApp = {
    id,
    name: config.name,
    url: config.url,
    version: config.version,
    createdAt,
    config,
  };

  const updated = [newApp, ...existing];

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save app to localStorage", e);
    }
  }

  return newApp;
}

export function removeAppFromStorage(id: string): DashboardApp[] {
  const existing = getSavedApps();
  const updated = existing.filter((app) => app.id !== id);

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to remove app from localStorage", e);
    }
  }

  return updated;
}
