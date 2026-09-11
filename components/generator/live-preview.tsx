"use client";

import { Monitor, Sun, Moon, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface LivePreviewProps {
  name: string;
  url: string;
  width: number;
  height: number;
  icon: string | null;
  appearance?: "system" | "light" | "dark";
}

export function LivePreview({
  name,
  url,
  width,
  height,
  icon,
  appearance = "system",
}: LivePreviewProps) {
  const displayName = name || "My Website";
  const displayUrl = url || "https://example.com";

  // Calculate aspect ratio for preview (capped)
  const aspectRatio = Math.min(Math.max(width / height, 0.5), 2.5);

  const isLight = appearance === "light";
  const isDark = appearance === "dark";

  return (
    <div className="sticky top-24">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Monitor className="h-3.5 w-3.5 text-primary" />
            Live Preview
          </h3>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-muted text-foreground border border-border">
            {appearance === "light" && <Sun className="h-3 w-3" />}
            {appearance === "dark" && <Moon className="h-3 w-3" />}
            {appearance === "system" && <Monitor className="h-3 w-3" />}
            <span className="capitalize">{appearance} Mode</span>
          </span>
        </div>

        {/* Desktop Window Frame */}
        <div
          className={cn(
            "rounded-xl border transition-all duration-300 overflow-hidden shadow-2xl relative group",
            isLight
              ? "border-slate-300 bg-slate-50 text-slate-900 shadow-slate-300/40"
              : isDark
              ? "border-slate-800 bg-slate-950 text-slate-100 shadow-black/40 ring-1 ring-zinc-800"
              : "border-border bg-card text-card-foreground shadow-lg"
          )}
        >
          {/* Outer glow line */}
          <div className="absolute inset-0 bg-gradient-to-tr from-foreground/5 via-transparent to-transparent pointer-events-none" />

          {/* Title bar */}
          <div
            className={cn(
              "flex items-center gap-3 border-b px-4 py-2.5 transition-colors duration-300",
              isLight
                ? "bg-slate-200/80 border-slate-300 text-slate-700"
                : isDark
                ? "bg-slate-900/90 border-slate-800 text-slate-300"
                : "bg-muted/60 border-border text-muted-foreground"
            )}
          >
            <div className="flex gap-2 items-center">
              <div className="h-3 w-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-xs" />
              <div className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-xs" />
              <div className="h-3 w-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-xs" />
            </div>
            <div className="flex items-center gap-2 flex-1 justify-center">
              {icon ? (
                <img src={icon} alt="" className="h-4 w-4 rounded object-cover shadow-sm" />
              ) : (
                <Monitor className="h-3 w-3 text-foreground" />
              )}
              <span className="text-xs font-bold truncate max-w-44">
                {displayName}
              </span>
            </div>
            <div className="w-12 text-right">
              <ShieldCheck className="h-3.5 w-3.5 text-foreground ml-auto opacity-70" />
            </div>
          </div>

          {/* Content Canvas */}
          <div
            className={cn(
              "relative transition-all duration-300 flex flex-col",
              isLight
                ? "bg-white"
                : isDark
                ? "bg-slate-900"
                : "bg-gradient-to-br from-muted/30 to-muted/60"
            )}
            style={{ aspectRatio }}
          >
            {/* URL bar mock */}
            <div className="p-3">
              <div
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-3 py-1.5 backdrop-blur-md shadow-sm transition-colors",
                  isLight
                    ? "bg-slate-100/90 border-slate-200 text-slate-600"
                    : isDark
                    ? "bg-slate-950/80 border-slate-800 text-slate-400"
                    : "bg-background/80 border-border text-muted-foreground"
                )}
              >
                <div className="h-2 w-2 rounded-full bg-foreground animate-pulse" />
                <span className="text-[10px] font-mono truncate flex-1">
                  {displayUrl}
                </span>
                <span className="text-[9px] font-mono font-semibold text-foreground uppercase">
                  HTTPS
                </span>
              </div>
            </div>

            {/* Simulated Web App UI */}
            <div className="flex items-center justify-center flex-1 px-6 pb-6">
              <div className="text-center space-y-3 w-full max-w-xs">
                <div
                  className={cn(
                    "mx-auto h-12 w-12 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105",
                    isDark ? "bg-zinc-800 text-zinc-100 border border-zinc-700" : "bg-muted text-foreground border border-border"
                  )}
                >
                  {icon ? (
                    <img src={icon} alt="" className="h-7 w-7 rounded-lg object-cover shadow" />
                  ) : (
                    <Monitor className="h-6 w-6" />
                  )}
                </div>
                <div className="space-y-1.5">
                  <div
                    className={cn(
                      "h-3 w-3/4 mx-auto rounded",
                      isLight ? "bg-slate-300" : isDark ? "bg-slate-700" : "bg-foreground/15"
                    )}
                  />
                  <div
                    className={cn(
                      "h-2 w-1/2 mx-auto rounded",
                      isLight ? "bg-slate-200" : isDark ? "bg-slate-800" : "bg-foreground/10"
                    )}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div
                    className={cn(
                      "h-7 rounded-lg border transition-colors",
                      isLight
                        ? "bg-slate-100 border-slate-200"
                        : isDark
                        ? "bg-slate-800/60 border-slate-700/60"
                        : "bg-muted/40 border-border/40"
                    )}
                  />
                  <div
                    className={cn(
                      "h-7 rounded-lg border transition-colors",
                      isLight
                        ? "bg-slate-100 border-slate-200"
                        : isDark
                        ? "bg-slate-800/60 border-slate-700/60"
                        : "bg-muted/40 border-border/40"
                    )}
                  />
                  <div
                    className={cn(
                      "h-7 rounded-lg border transition-colors",
                      isLight
                        ? "bg-slate-100 border-slate-200"
                        : isDark
                        ? "bg-zinc-800 border-zinc-700"
                        : "bg-muted border-border"
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Window Metrics */}
        <div className="flex items-center justify-between px-1 text-[11px] font-mono text-muted-foreground">
          <span>Window Frame</span>
          <span className="font-bold text-foreground">
            {width} × {height} px
          </span>
        </div>
      </div>
    </div>
  );
}

