"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Download,
  Plus,
  Copy,
  Check,
  Terminal,
  FolderArchive,
  FileCode,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";
import type { GeneratorConfig } from "@/types/generator";

interface SuccessScreenProps {
  config: GeneratorConfig;
  onDownload: () => void;
  onCreateAnother: () => void;
}

type Tab = "linux" | "mac" | "windows" | "developer";

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.12-1.95.99-3.09-1 .04-2.17.67-2.88 1.5-.64.75-1.19 1.93-1.04 3.06 1.11.09 2.26-.64 2.93-1.47z" />
    </svg>
  );
}

function WindowsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.8" />
    </svg>
  );
}

function LinuxIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.38 2.016c-2.454 0-3.329 1.916-3.329 3.518 0 1.246.331 3.528-.492 4.417-.823.889-2.062 1.233-2.738 2.115-.675.882-.716 2.378-.363 3.255.353.877.925 1.558 1.942 2.025.267.766.702 1.83 1.577 2.234 1.155.534 3.32.404 4.542.064.912.449 2.766.527 3.737.039.697-.35 1.077-1.32 1.341-2.088.948-.485 1.493-1.127 1.821-1.977.327-.85.35-2.317-.282-3.178-.632-.861-1.841-1.222-2.628-2.083-.787-.861-.433-3.084-.433-4.305 0-1.602-.875-3.518-3.329-3.518z" />
    </svg>
  );
}

export function SuccessScreen({ config, onDownload, onCreateAnother }: SuccessScreenProps) {
  const [activeTab, setActiveTab] = useState<Tab>("linux");
  const [copiedDevCmd, setCopiedDevCmd] = useState(false);
  const [copiedBuildCmd, setCopiedBuildCmd] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes("mac")) {
        setActiveTab("mac");
      } else if (ua.includes("win")) {
        setActiveTab("windows");
      } else {
        setActiveTab("linux");
      }
    }
  }, []);

  const slug = slugify(config.name) || "desktop-app";
  const folderName = `${slug}-desktop`;

  const devCmd = `cd ${folderName} && npm install && npm start`;
  const buildCmd = `cd ${folderName} && npm install && npx electron-builder`;

  const handleCopy = (text: string, setFn: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center text-center py-2 max-w-xl mx-auto"
    >
      {/* Animated Checkmark Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-foreground ring-1 ring-border shadow-lg">
          <CheckCircle2 className="h-8 w-8" />
        </div>
      </motion.div>

      <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
        Your desktop app is ready.
      </h2>

      <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
        We've generated the complete Electron desktop app project for <strong className="text-foreground">{config.name || "your website"}</strong>.
      </p>

      {/* Main Download Button */}
      <div className="mt-6 w-full max-w-md">
        <Button
          size="lg"
          variant="gradient"
          onClick={onDownload}
          className="w-full h-14 text-base font-extrabold shadow-xl rounded-2xl group transition-all duration-200"
        >
          <Download className="h-5 w-5 mr-2.5 transition-transform group-hover:translate-y-0.5" />
          <span>Download Universal Package (.ZIP)</span>
        </Button>

        {/* Clean feature list under button */}
        <div className="mt-3 flex items-center justify-center gap-3 text-xs font-medium text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-foreground" /> All-in-One ZIP
          </span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-foreground" /> 1-Click Launchers
          </span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-foreground" /> Full Source Code
          </span>
        </div>
      </div>

      {/* OS Guide Navigation Tabs */}
      <div className="mt-8 w-full text-left">
        <div className="flex items-center justify-between border-b border-border mb-4">
          <button
            onClick={() => setActiveTab("linux")}
            className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === "linux"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <LinuxIcon className="h-3.5 w-3.5" />
            Linux Guide
          </button>

          <button
            onClick={() => setActiveTab("mac")}
            className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === "mac"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <AppleIcon className="h-3.5 w-3.5" />
            macOS Guide
          </button>

          <button
            onClick={() => setActiveTab("windows")}
            className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === "windows"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <WindowsIcon className="h-3.5 w-3.5" />
            Windows Guide
          </button>

          <button
            onClick={() => setActiveTab("developer")}
            className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === "developer"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            Developer Code
          </button>
        </div>

        {/* Tab Content Cards */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          {activeTab === "linux" && (
            <div className="space-y-3">
              <h3 className="font-bold text-xs flex items-center gap-2 text-foreground">
                <LinuxIcon className="h-3.5 w-3.5 text-muted-foreground" />
                How to Run on Linux:
              </h3>
              <ol className="space-y-2.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-foreground font-bold text-[10px]">1</span>
                  <span className="pt-0.5">Extract <code className="font-mono text-foreground font-semibold bg-muted px-1.5 py-0.5 rounded border border-border">{folderName}.zip</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-foreground font-bold text-[10px]">2</span>
                  <span className="pt-0.5">Right-click <code className="font-mono text-foreground font-semibold bg-muted px-1.5 py-0.5 rounded border border-border">Run-Linux.sh</code> → select <strong>"Run as a Program"</strong> (or run <button onClick={() => handleCopy("bash Run-Linux.sh", setCopiedDevCmd)} className="inline-flex items-center gap-1 font-mono text-foreground font-semibold bg-muted hover:bg-muted/80 px-1.5 py-0.5 rounded border border-border transition-colors cursor-pointer" title="Click to copy command"><code>bash Run-Linux.sh</code>{copiedDevCmd ? <Check className="h-3 w-3 inline text-foreground ml-0.5" /> : <Copy className="h-3 w-3 inline ml-0.5 opacity-60" />}</button> in terminal).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-foreground font-bold text-[10px]">3</span>
                  <span className="pt-0.5 font-medium text-foreground">Your desktop app window launches automatically!</span>
                </li>
              </ol>
            </div>
          )}

          {activeTab === "mac" && (
            <div className="space-y-3">
              <h3 className="font-bold text-xs flex items-center gap-2 text-foreground">
                <AppleIcon className="h-3.5 w-3.5 text-muted-foreground" />
                How to Run on macOS:
              </h3>
              <ol className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-foreground font-bold text-[10px]">1</span>
                  <span className="pt-0.5">Extract <code className="font-mono text-foreground font-semibold bg-muted px-1.5 py-0.5 rounded border border-border">{folderName}.zip</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-foreground font-bold text-[10px]">2</span>
                  <span className="pt-0.5">Double-click <code className="font-mono text-foreground font-semibold bg-muted px-1.5 py-0.5 rounded border border-border">Run-Mac.command</code> in Finder.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-foreground font-bold text-[10px]">3</span>
                  <span className="pt-0.5 font-medium text-foreground">Your macOS desktop app window opens automatically!</span>
                </li>
              </ol>
            </div>
          )}

          {activeTab === "windows" && (
            <div className="space-y-3">
              <h3 className="font-bold text-xs flex items-center gap-2 text-foreground">
                <WindowsIcon className="h-3.5 w-3.5 text-muted-foreground" />
                How to Run on Windows (Silent 1-Click):
              </h3>
              <ol className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-foreground font-bold text-[10px]">1</span>
                  <span className="pt-0.5">Extract <code className="font-mono text-foreground font-semibold bg-muted px-1.5 py-0.5 rounded border border-border">{folderName}.zip</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-foreground font-bold text-[10px]">2</span>
                  <span className="pt-0.5">Double-click <code className="font-mono text-foreground font-semibold bg-muted px-1.5 py-0.5 rounded border border-border">Install-Silent-Windows.vbs</code> or <code className="font-mono text-foreground font-semibold bg-muted px-1.5 py-0.5 rounded border border-border">Run-Windows.bat</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-foreground font-bold text-[10px]">3</span>
                  <span className="pt-0.5 font-medium text-foreground">Windows silently launches your desktop app window!</span>
                </li>
              </ol>
            </div>
          )}

          {activeTab === "developer" && (
            <div className="space-y-3">
              <h3 className="font-bold text-xs flex items-center gap-2 text-foreground">
                <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
                Developer Commands & Native Installer Build:
              </h3>
              <div className="space-y-2 font-mono text-[11px]">
                <div className="p-2.5 bg-muted/60 dark:bg-black/90 rounded-lg border border-border dark:border-zinc-800 text-foreground dark:text-zinc-100">
                  <div className="flex items-center justify-between font-sans text-[11px] text-muted-foreground dark:text-zinc-400 mb-1 border-b border-border/60 dark:border-zinc-800 pb-1">
                    <span>Dev Launch Command</span>
                    <button onClick={() => handleCopy(devCmd, setCopiedDevCmd)} className="text-muted-foreground hover:text-foreground dark:text-zinc-400 dark:hover:text-white flex items-center gap-1 font-sans cursor-pointer transition-colors">
                      {copiedDevCmd ? <Check className="h-3 w-3 text-foreground" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedDevCmd ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <code>{devCmd}</code>
                </div>

                <div className="p-2.5 bg-muted/60 dark:bg-black/90 rounded-lg border border-border dark:border-zinc-800 text-foreground dark:text-zinc-100">
                  <div className="flex items-center justify-between font-sans text-[11px] text-muted-foreground dark:text-zinc-400 mb-1 border-b border-border/60 dark:border-zinc-800 pb-1">
                    <span>Build Executable Installers (.exe / .dmg / .AppImage)</span>
                    <button onClick={() => handleCopy(buildCmd, setCopiedBuildCmd)} className="text-muted-foreground hover:text-foreground dark:text-zinc-400 dark:hover:text-white flex items-center gap-1 font-sans cursor-pointer transition-colors">
                      {copiedBuildCmd ? <Check className="h-3 w-3 text-foreground" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedBuildCmd ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <code>{buildCmd}</code>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Package Contents Preview Card */}
      <div className="mt-4 w-full text-left rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold mb-3 text-foreground border-b border-border/60 pb-2">
          <span className="flex items-center gap-1.5 font-mono text-foreground">
            <FolderArchive className="h-4 w-4 text-foreground" />
            {folderName}.zip
          </span>
          <div className="flex items-center gap-2 font-mono text-[10px]">
            <span className="px-2 py-0.5 rounded-full bg-muted text-foreground border border-border font-bold">
              v{config.version || "1.0.0"}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
              12 files • Electron
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-muted-foreground">
          <div className="flex items-center gap-1.5 bg-muted/40 p-2 rounded-lg border border-border/50">
            <Terminal className="h-3.5 w-3.5 text-foreground shrink-0" />
            <span className="truncate text-foreground font-semibold">Run-Linux.sh</span>
          </div>
          <div className="flex items-center gap-1.5 bg-muted/40 p-2 rounded-lg border border-border/50">
            <Terminal className="h-3.5 w-3.5 text-foreground shrink-0" />
            <span className="truncate text-foreground font-semibold">Run-Mac.command</span>
          </div>
          <div className="flex items-center gap-1.5 bg-muted/40 p-2 rounded-lg border border-border/50">
            <Terminal className="h-3.5 w-3.5 text-foreground shrink-0" />
            <span className="truncate text-foreground font-semibold">Install-Windows.vbs</span>
          </div>
          <div className="flex items-center gap-1.5 bg-muted/40 p-2 rounded-lg border border-border/50">
            <FileCode className="h-3.5 w-3.5 text-foreground shrink-0" />
            <span className="truncate text-foreground">package.json</span>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-6 flex items-center justify-center">
        <Button variant="ghost" size="sm" onClick={onCreateAnother} className="text-muted-foreground hover:text-foreground">
          <Plus className="h-4 w-4 mr-1.5" />
          Create Another App
        </Button>
      </div>
    </motion.div>
  );
}


