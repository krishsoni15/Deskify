"use client";

import { motion } from "framer-motion";
import { Globe, Settings2, Download, ArrowRight, Check } from "lucide-react";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
            HOW IT WORKS
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            From URL to Desktop App in seconds
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-lg mx-auto">
            Three straightforward steps to generate a complete Electron project.
          </p>
        </motion.div>

        {/* Horizontal Pipeline Steps */}
        <div className="mt-14 grid gap-6 md:grid-cols-3 relative">
          {/* Step 01: PASTE */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm flex flex-col justify-between relative group hover:border-primary/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary font-mono font-bold text-xs">
                  01
                </span>
                <span className="text-xs font-bold font-mono tracking-wider text-muted-foreground uppercase">
                  PASTE
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground">Enter your website URL</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Provide any active web app URL that you want to wrap into a native desktop window.
              </p>
            </div>

            {/* Step 01 Mockup */}
            <div className="mt-6 rounded-xl border border-border/60 bg-muted/40 p-3">
              <div className="flex items-center gap-2 rounded-lg bg-background px-3 py-2 border border-border">
                <Globe className="h-4 w-4 text-foreground/70 shrink-0" />
                <span className="text-xs font-mono text-foreground truncate">https://app.example.com</span>
                <Check className="h-3.5 w-3.5 text-foreground ml-auto shrink-0" />
              </div>
            </div>
          </motion.div>

          {/* Step 02: CUSTOMIZE */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm flex flex-col justify-between relative group hover:border-primary/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary font-mono font-bold text-xs">
                  02
                </span>
                <span className="text-xs font-bold font-mono tracking-wider text-muted-foreground uppercase">
                  CUSTOMIZE
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground">Set app parameters</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Configure your app identity, icon, window dimensions, and desktop permissions.
              </p>
            </div>

            {/* Step 02 Mockup */}
            <div className="mt-6 rounded-xl border border-border/60 bg-muted/40 p-3 space-y-2 text-[11px] font-mono">
              <div className="flex items-center justify-between bg-background p-2 rounded border border-border/50">
                <span className="text-muted-foreground">App Name:</span>
                <span className="font-bold text-foreground">My Web App</span>
              </div>
              <div className="flex items-center justify-between bg-background p-2 rounded border border-border/50">
                <span className="text-muted-foreground">Window Size:</span>
                <span className="text-primary font-bold">1280 × 800</span>
              </div>
            </div>
          </motion.div>

          {/* Step 03: DOWNLOAD */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm flex flex-col justify-between relative group hover:border-foreground/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-foreground font-mono font-bold text-xs">
                  03
                </span>
                <span className="text-xs font-bold font-mono tracking-wider text-foreground uppercase">
                  DOWNLOAD
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground">Download Electron ZIP</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Get full source code and 1-click launchers for Linux, macOS, and Windows.
              </p>
            </div>

            {/* Step 03 Mockup */}
            <div className="mt-6 rounded-xl border border-border bg-muted/30 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-foreground" />
                <span className="text-xs font-mono font-bold text-foreground">my-app-desktop.zip</span>
              </div>
              <span className="text-[10px] font-mono text-foreground bg-muted px-2 py-0.5 rounded border border-border">
                Source Code
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

