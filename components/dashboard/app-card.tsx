"use client";

import { ExternalLink, Download, Trash2, Globe, Eye, Sparkles, Monitor, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DashboardApp } from "@/types/generator";

interface AppCardProps {
  app: DashboardApp;
  onOpenDetails?: () => void;
  onOpen?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
}

export function AppCard({ app, onOpenDetails, onOpen, onDownload, onDelete }: AppCardProps) {
  const appearanceBadge =
    app.config.appearance === "dark" ? (
      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700">
        <Moon className="h-2.5 w-2.5 text-zinc-300" /> Dark
      </span>
    ) : app.config.appearance === "light" ? (
      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-900 border border-zinc-300">
        <Sun className="h-2.5 w-2.5 text-zinc-700" /> Light
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted text-foreground border border-border">
        <Monitor className="h-2.5 w-2.5 text-foreground" /> System
      </span>
    );

  return (
    <div className="group relative rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm p-5 transition-all duration-300 hover:border-foreground/30 hover:shadow-xl flex flex-col justify-between overflow-hidden">
      {/* Top Section */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted/60 text-foreground border border-border/60 shadow-sm transition-transform group-hover:scale-105">
              <Globe className="h-5.5 w-5.5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2 group-hover:text-foreground transition-colors">
                {app.name}
              </h3>
              <p className="text-xs font-mono text-muted-foreground truncate max-w-[200px] sm:max-w-[220px]">
                {app.url}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="text-[11px] font-mono text-muted-foreground">
              {app.createdAt}
            </span>
            {appearanceBadge}
          </div>
        </div>

        {/* Specs tag line */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2 text-[11px] font-mono text-muted-foreground border-t border-border/40 pt-3">
          <span className="bg-muted/50 px-2 py-0.5 rounded border border-border/40 text-foreground font-semibold">
            {app.config.width || 1280} × {app.config.height || 800}
          </span>
          <span className="bg-muted/50 px-2 py-0.5 rounded border border-border/40">
            v{app.version || "1.0.0"}
          </span>
          {app.config.alwaysOnTop && (
            <span className="bg-muted text-foreground px-2 py-0.5 rounded border border-border font-semibold">
              Always-on-top
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="mt-4 pt-2 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenDetails}
          className="flex-1 text-xs font-semibold rounded-xl hover:border-foreground/40"
        >
          <Eye className="h-3.5 w-3.5 text-foreground" />
          Details
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onOpen}
          className="h-9 w-9 p-0 rounded-xl"
          title="Open Target Web URL"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onDownload}
          className="h-9 w-9 p-0 rounded-xl text-foreground border-border hover:bg-accent"
          title="Download Desktop App Package"
        >
          <Download className="h-3.5 w-3.5" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="h-9 w-9 p-0 rounded-xl text-destructive hover:bg-destructive/10"
          title="Delete App"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

