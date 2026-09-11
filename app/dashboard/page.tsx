"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Monitor, Sparkles } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { buttonVariants } from "@/components/ui/button";
import { AppCard } from "@/components/dashboard/app-card";
import { AppDetailModal } from "@/components/dashboard/app-detail-modal";
import { getSavedApps, removeAppFromStorage } from "@/lib/storage";
import type { DashboardApp } from "@/types/generator";

const DEMO_APPS: DashboardApp[] = [
  {
    id: "demo-1",
    name: "Linear Desktop",
    url: "https://linear.app",
    version: "1.0.0",
    createdAt: "Sep 12, 2026",
    config: {
      url: "https://linear.app",
      name: "Linear Desktop",
      appId: "com.deskify.linear",
      version: "1.0.0",
      author: "Deskify",
      description: "Linear issue tracking wrapped into a native desktop app",
      icon: null,
      width: 1380,
      height: 900,
      resizable: true,
      maximized: false,
      devTools: false,
      alwaysOnTop: true,
      appearance: "dark",
    },
  },
  {
    id: "demo-2",
    name: "Excalidraw Workspace",
    url: "https://excalidraw.com",
    version: "1.0.0",
    createdAt: "Sep 12, 2026",
    config: {
      url: "https://excalidraw.com",
      name: "Excalidraw Workspace",
      appId: "com.deskify.excalidraw",
      version: "1.0.0",
      author: "Deskify",
      description: "Infinite virtual whiteboard desktop wrapper",
      icon: null,
      width: 1280,
      height: 800,
      resizable: true,
      maximized: true,
      devTools: false,
      alwaysOnTop: false,
      appearance: "system",
    },
  },
];

export default function DashboardPage() {
  const [apps, setApps] = useState<DashboardApp[]>([]);
  const [selectedApp, setSelectedApp] = useState<DashboardApp | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    const saved = getSavedApps();
    if (saved.length > 0) {
      setApps(saved);
      setShowDemo(false);
    } else {
      setApps(DEMO_APPS);
      setShowDemo(true);
    }
  }, []);

  const isEmpty = apps.length === 0;

  const handleDelete = (id: string) => {
    if (id.startsWith("demo-")) {
      setApps((prev) => prev.filter((a) => a.id !== id));
    } else {
      const updated = removeAppFromStorage(id);
      setApps(updated.length > 0 ? updated : DEMO_APPS);
      if (updated.length === 0) setShowDemo(true);
    }
  };

  const handleDownloadSingle = async (app: DashboardApp) => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(app.config),
      });
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const filename =
        response.headers.get("X-Filename") ||
        `${app.name.toLowerCase().replace(/\s+/g, "-")}-desktop.zip`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert("Failed to trigger download package.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-4rem)] relative overflow-hidden bg-transparent">
        {/* Ambient background spotlight */}
        <div className="absolute top-10 left-1/3 h-[350px] w-[500px] rounded-full bg-primary/5 blur-[130px] pointer-events-none -z-10" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b border-border/60 pb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
                <Monitor className="h-7 w-7 text-primary" />
                Desktop Application Vault
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                Manage, inspect, and 1-click download your generated Electron desktop app packages.
              </p>
            </div>

            <div className="relative group shrink-0">
              <div className="absolute -inset-0.5 rounded-xl bg-zinc-950/15 dark:bg-white/20 opacity-50 blur-xs transition group-hover:opacity-100 pointer-events-none" />
              <Link
                href="/create"
                className={buttonVariants({
                  size: "lg",
                  variant: "gradient",
                  className: "relative font-bold text-xs sm:text-sm px-5 rounded-xl shadow-lg flex items-center gap-2",
                })}
              >
                <Plus className="h-4 w-4" />
                <span>Create New App</span>
              </Link>
            </div>
          </div>

          {/* Demo banner */}
          {showDemo && apps.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-2xl border border-primary/30 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs backdrop-blur-sm"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  Showing starter sample apps. Generate your custom desktop app on the Create page to save permanently.
                </span>
              </div>
              <button
                onClick={() => setShowDemo(false)}
                className="text-xs font-mono font-semibold text-primary hover:underline shrink-0"
              >
                Dismiss Sample
              </button>
            </motion.div>
          )}

          {/* Apps grid or empty state */}
          {isEmpty ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center text-center py-20 rounded-3xl border border-dashed border-border/80 bg-card/40 p-8 backdrop-blur-xs"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-inner mb-4">
                <Monitor className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold text-foreground">No desktop apps generated yet.</h2>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-md">
                Convert any web experience into a standalone Electron application wrapper in seconds.
              </p>
              <div className="mt-6">
                <Link
                  href="/create"
                  className={buttonVariants({
                    size: "lg",
                    variant: "gradient",
                    className: "relative font-extrabold px-6 rounded-xl",
                  })}
                >
                  Create Your First Desktop App →
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2"
            >
              {apps.map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  onOpenDetails={() => setSelectedApp(app)}
                  onOpen={() => window.open(app.url, "_blank")}
                  onDownload={() => handleDownloadSingle(app)}
                  onDelete={() => handleDelete(app.id)}
                />
              ))}
            </motion.div>
          )}
        </div>
      </main>

      {/* App Detail Inspection Modal */}
      <AppDetailModal
        app={selectedApp}
        isOpen={Boolean(selectedApp)}
        onClose={() => setSelectedApp(null)}
        onDelete={handleDelete}
      />
    </>
  );
}

