"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Download,
  Trash2,
  Globe,
  Monitor,
  Maximize2,
  Sun,
  Moon,
  Code2,
  Terminal,
  Calendar,
  Sparkles,
  Loader2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DashboardApp } from "@/types/generator";

interface AppDetailModalProps {
  app: DashboardApp | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export function AppDetailModal({ app, isOpen, onClose, onDelete }: AppDetailModalProps) {
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);

  if (!app) return null;

  const handleDownload = async () => {
    setDownloading(true);
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
    } catch (err) {
      console.error(err);
      alert("Failed to download app package.");
    } finally {
      setDownloading(false);
    }
  };

  const handleReconfigure = () => {
    const encoded = encodeURIComponent(app.config.url);
    onClose();
    router.push(`/create?url=${encoded}`);
  };

  const appearanceLabel =
    app.config.appearance === "dark"
      ? "Dark Theme"
      : app.config.appearance === "light"
      ? "Light Theme"
      : "System Auto";

  const appearanceIcon =
    app.config.appearance === "dark" ? (
      <Moon className="h-3.5 w-3.5 text-foreground" />
    ) : app.config.appearance === "light" ? (
      <Sun className="h-3.5 w-3.5 text-foreground" />
    ) : (
      <Monitor className="h-3.5 w-3.5 text-foreground" />
    );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Ambient Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-2xl ring-1 ring-white/10"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-foreground border border-border/60 shadow-md">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                    {app.name}
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-muted text-foreground border border-border">
                      v{app.version || "1.0.0"}
                    </span>
                  </h2>
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 mt-0.5"
                  >
                    <span>{app.url}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Config Overview Grid */}
            <div className="py-5 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {/* Package ID */}
                <div className="p-3 rounded-xl border border-border/60 bg-muted/30 flex flex-col justify-between">
                  <span className="text-muted-foreground font-mono text-[10px] uppercase tracking-wider flex items-center gap-1">
                    <Code2 className="h-3 w-3 text-foreground" /> App ID
                  </span>
                  <span className="font-mono text-foreground font-semibold truncate mt-1">
                    {app.config.appId || "com.deskify.app"}
                  </span>
                </div>

                {/* Dimensions */}
                <div className="p-3 rounded-xl border border-border/60 bg-muted/30 flex flex-col justify-between">
                  <span className="text-muted-foreground font-mono text-[10px] uppercase tracking-wider flex items-center gap-1">
                    <Maximize2 className="h-3 w-3 text-foreground" /> Window Size
                  </span>
                  <span className="font-mono text-foreground font-semibold mt-1">
                    {app.config.width} × {app.config.height} px
                  </span>
                </div>

                {/* Theme */}
                <div className="p-3 rounded-xl border border-border/60 bg-muted/30 flex flex-col justify-between">
                  <span className="text-muted-foreground font-mono text-[10px] uppercase tracking-wider flex items-center gap-1">
                    {appearanceIcon} Appearance
                  </span>
                  <span className="font-semibold text-foreground mt-1 flex items-center gap-1">
                    {appearanceLabel}
                  </span>
                </div>
              </div>

              {/* Settings Flags */}
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground pb-1 border-b border-border/40">
                  <span className="flex items-center gap-1.5 text-foreground font-semibold">
                    <ShieldCheck className="h-3.5 w-3.5 text-foreground" /> Desktop Features Configured:
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" /> Created {app.createdAt}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2
                      className={`h-3.5 w-3.5 ${
                        app.config.resizable ? "text-foreground" : "text-muted-foreground/40"
                      }`}
                    />
                    <span>Resizable Window: {app.config.resizable ? "Enabled" : "Fixed"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2
                      className={`h-3.5 w-3.5 ${
                        app.config.alwaysOnTop ? "text-foreground" : "text-muted-foreground/40"
                      }`}
                    />
                    <span>Always On Top: {app.config.alwaysOnTop ? "Yes" : "No"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2
                      className={`h-3.5 w-3.5 ${
                        app.config.devTools ? "text-foreground" : "text-muted-foreground/40"
                      }`}
                    />
                    <span>Developer Tools: {app.config.devTools ? "Enabled" : "Disabled"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2
                      className={`h-3.5 w-3.5 ${
                        app.config.maximized ? "text-foreground" : "text-muted-foreground/40"
                      }`}
                    />
                    <span>Start Maximized: {app.config.maximized ? "Yes" : "No"}</span>
                  </div>
                </div>
              </div>

              {/* Developer Command Preview */}
              <div className="rounded-xl border border-border bg-zinc-950 p-3 text-xs font-mono">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-zinc-200" /> Launch Command
                  </span>
                  <span className="text-[10px] text-zinc-500">Universal Electron Package</span>
                </div>
                <div className="bg-black/60 p-2 rounded text-zinc-100 overflow-x-auto text-[11px]">
                  <code>
                    cd {app.name.toLowerCase().replace(/\s+/g, "-")}-desktop && npm start
                  </code>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/60 pt-4">
              <button
                onClick={() => {
                  onDelete(app.id);
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 text-xs text-destructive hover:text-destructive/80 font-medium px-2 py-1.5 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete from Storage
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" onClick={handleReconfigure} className="flex-1 sm:flex-initial">
                  <Sparkles className="h-3.5 w-3.5 text-foreground" />
                  Re-configure
                </Button>

                <div className="relative group flex-1 sm:flex-initial">
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-zinc-300 via-white to-zinc-400 opacity-40 blur-xs transition group-hover:opacity-80 pointer-events-none" />
                  <Button
                    size="sm"
                    variant="gradient"
                    onClick={handleDownload}
                    disabled={downloading}
                    className="relative w-full font-bold px-4 text-xs flex items-center justify-center gap-1.5 shadow-md"
                  >
                    {downloading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-950" />
                    ) : (
                      <Download className="h-3.5 w-3.5 text-zinc-950" />
                    )}
                    <span>{downloading ? "Building ZIP..." : "Download ZIP"}</span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
