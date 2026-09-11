"use client";

import { motion } from "framer-motion";
import { Monitor, Globe, Settings2, Sparkles, Check } from "lucide-react";

export function ProductShowcase() {
  return (
    <section className="py-20 sm:py-28 border-t border-border/60 bg-gradient-to-b from-transparent via-card/30 to-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
            PRODUCT SHOWCASE
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Everything you need. Nothing you don't.
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
            Configure the details that matter. Deskify handles the Electron project setup.
          </p>
        </motion.div>

        {/* Generator Page Mockup Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-14 mx-auto max-w-5xl rounded-2xl border border-border/80 bg-card shadow-2xl overflow-hidden ring-1 ring-white/5"
        >
          {/* Mock Window Titlebar */}
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-3 bg-muted/40">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-zinc-400/80 dark:bg-zinc-600/80" />
              <div className="h-3 w-3 rounded-full bg-zinc-400/80 dark:bg-zinc-600/80" />
              <div className="h-3 w-3 rounded-full bg-zinc-400/80 dark:bg-zinc-600/80" />
            </div>
            <span className="text-xs font-mono text-muted-foreground font-semibold">Deskify — Create Desktop App</span>
            <div className="flex items-center gap-2 text-xs font-mono text-foreground">
              <span className="h-2 w-2 rounded-full bg-foreground animate-pulse" />
              Generator Ready
            </div>
          </div>

          {/* 2-Column Mock Generator UI */}
          <div className="p-6 sm:p-8 grid gap-8 md:grid-cols-[1fr,360px]">
            {/* Left Column: Form Mock */}
            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-xl border border-border/60 bg-background space-y-2">
                <div className="flex items-center gap-2 text-foreground font-bold font-sans">
                  <Globe className="h-4 w-4 text-foreground" />
                  <span>Website URL</span>
                </div>
                <div className="p-2 rounded bg-muted/50 border border-border/40 text-muted-foreground flex items-center justify-between">
                  <span>https://example.com</span>
                  <Check className="h-3.5 w-3.5 text-foreground" />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border/60 bg-background space-y-3">
                <div className="flex items-center gap-2 text-foreground font-bold font-sans">
                  <Monitor className="h-4 w-4 text-foreground" />
                  <span>App Identity</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded bg-muted/50 border border-border/40 text-foreground font-bold">
                    My App
                  </div>
                  <div className="p-2 rounded bg-muted/50 border border-border/40 text-muted-foreground">
                    com.deskify.myapp
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border/60 bg-background space-y-2">
                <div className="flex items-center gap-2 text-foreground font-bold font-sans">
                  <Settings2 className="h-4 w-4 text-foreground" />
                  <span>Window Settings</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Size: 1280 × 800</span>
                  <span className="text-foreground font-bold">Resizable • Maximized</span>
                </div>
              </div>
            </div>

            {/* Right Column: Preview Mock */}
            <div className="rounded-xl border border-border/60 bg-background p-4 flex flex-col justify-between h-full space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <span className="text-xs font-bold font-sans text-foreground">Live Preview</span>
                <span className="text-[10px] font-mono text-muted-foreground">1280 × 800</span>
              </div>

              <div className="flex-1 rounded-lg border border-border/40 bg-muted/20 p-4 flex flex-col items-center justify-center text-center space-y-2">
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-foreground">
                  <Monitor className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-foreground">My App Window</span>
                <span className="text-[10px] font-mono text-muted-foreground">https://example.com</span>
              </div>

              <div className="h-10 w-full rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold font-sans text-xs flex items-center justify-center gap-2 shadow-md">
                <Sparkles className="h-4 w-4" />
                <span>Generate Desktop App →</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
