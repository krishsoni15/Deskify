"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowRight, Globe, Monitor, Sparkles, CheckCircle2, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import DotGrid from "@/components/ui/dot-grid";

export function Hero() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [heroUrl, setHeroUrl] = useState("https://example.com");

  const isLight = resolvedTheme === "light";

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(heroUrl.trim());
    router.push(`/create?url=${encoded}`);
  };

  return (
    <section id="product" className="relative overflow-hidden pt-6 pb-10 sm:pt-10 sm:pb-14">
      {/* React Bits Interactive DotGrid Background (Hero Only) */}
      <div className="absolute inset-0 -z-10 opacity-55 pointer-events-none overflow-hidden">
        <DotGrid
          dotSize={3.5}
          gap={26}
          baseColor={isLight ? "#8b8b96" : "#4a4a52"}
          activeColor={isLight ? "#09090b" : "#ffffff"}
          proximity={160}
          speedTrigger={50}
          shockRadius={240}
          shockStrength={4}
          returnDuration={1.2}
        />
      </div>

      {/* Clean ambient radial spotlight gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[280px] w-[500px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge variant="outline" className="mb-6 gap-2 py-1 px-3.5 text-xs font-mono font-semibold tracking-wider text-primary border-primary/30 bg-primary/5 rounded-full">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              WEBSITE → DESKTOP
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-6xl text-foreground"
          >
            Your website.
            <br />
            <span className="text-zinc-950 dark:text-transparent dark:bg-gradient-to-r dark:from-white dark:via-zinc-200 dark:to-zinc-400 dark:bg-clip-text font-black">
              Now a desktop app.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Turn any web experience into a polished Electron desktop app — without writing the desktop wrapper yourself.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="relative group inline-block w-full sm:w-auto"
            >
              <div className="absolute -inset-1 rounded-2xl bg-zinc-950/20 dark:bg-white/25 opacity-30 blur-lg transition duration-500 group-hover:opacity-60 group-hover:blur-xl pointer-events-none" />
              <Link
                href={heroUrl.trim() ? `/create?url=${encodeURIComponent(heroUrl.trim())}` : "/create"}
                className={buttonVariants({
                  size: "xl",
                  variant: "gradient",
                  className: "relative w-full sm:w-auto px-8 py-4 font-extrabold rounded-2xl shadow-depth-md flex items-center justify-center gap-2 text-base sm:text-lg",
                })}
              >
                <Sparkles className="h-5 w-5 text-current animate-pulse" />
                <span>Create Desktop App</span>
                <ArrowRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#how-it-works"
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className: "px-7 py-3.5 font-semibold rounded-2xl border-border/80 hover:border-foreground/40 shadow-depth-sm backdrop-blur-md transition-all",
                })}
              >
                <span>See How It Works</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Trust Step Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex items-center justify-center gap-2 sm:gap-4 text-xs font-mono text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <span className="text-foreground font-bold">01</span> Configure
            </span>
            <span className="text-border">→</span>
            <span className="flex items-center gap-1.5">
              <span className="text-foreground font-bold">02</span> Generate
            </span>
            <span className="text-border">→</span>
            <span className="flex items-center gap-1.5">
              <span className="text-foreground font-bold">03</span> Download
            </span>
          </motion.div>
        </div>

        {/* Hero Interactive Visual: Website -> Deskify Transformation -> Desktop App */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 mx-auto max-w-4xl"
        >
          {/* Interactive URL Input Pill Bar */}
          <form onSubmit={handleHeroSubmit} className="mb-5 mx-auto max-w-lg">
            <div className="flex items-center gap-2 p-2 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md shadow-xl ring-1 ring-white/5 transition-all duration-300 focus-within:border-foreground/40 focus-within:ring-foreground/10">
              <div className="flex items-center gap-2.5 px-3 text-muted-foreground flex-1">
                <Globe className="h-4 w-4 text-foreground shrink-0" />
                <input
                  type="text"
                  value={heroUrl}
                  onChange={(e) => setHeroUrl(e.target.value)}
                  placeholder="https://your-website.com"
                  className="w-full bg-transparent text-xs sm:text-sm font-mono text-foreground focus:outline-none placeholder:text-muted-foreground/60"
                />
              </div>
              <div className="relative group shrink-0">
                <div className="absolute -inset-0.5 rounded-xl bg-zinc-950/15 dark:bg-white/20 opacity-40 blur-xs transition duration-300 group-hover:opacity-80 pointer-events-none" />
                <button
                  type="submit"
                  className={buttonVariants({
                    size: "sm",
                    variant: "gradient",
                    className: "relative rounded-xl font-bold px-4 py-2.5 text-xs shrink-0 flex items-center gap-1.5 shadow-md",
                  })}
                >
                  <Sparkles className="h-3 w-3 text-current" />
                  <span>Create App</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </form>

          {/* Side-by-side Transformation Visual */}
          <div className="rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
            <div className="grid gap-6 md:grid-cols-[1fr,auto,1fr] items-center">
              {/* Left: Website Card */}
              <div className="rounded-xl border border-border bg-background p-4 shadow-sm flex flex-col justify-between h-48 relative overflow-hidden group">
                <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-foreground" />
                    <span className="text-xs font-bold text-foreground">Web Experience</span>
                  </div>
                  <span className="text-[10px] font-mono bg-muted px-2 py-0.5 rounded text-muted-foreground">HTTP/HTTPS</span>
                </div>
                <div className="space-y-2 py-2">
                  <div className="h-2.5 w-3/4 rounded bg-muted/80" />
                  <div className="h-2 w-1/2 rounded bg-muted/50" />
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="h-10 rounded-lg bg-muted/40 border border-border/40" />
                    <div className="h-10 rounded-lg bg-muted/40 border border-border/40" />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px] font-mono text-muted-foreground">
                  <span className="truncate max-w-[180px]">{heroUrl || "https://example.com"}</span>
                  <span className="text-foreground font-semibold">Browser</span>
                </div>
              </div>

              {/* Center: Transformation Pulse */}
              <div className="flex md:flex-col items-center justify-center gap-2 py-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-border text-foreground shadow-md">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase">DESKIFY</span>
                <div className="h-px w-8 md:w-px md:h-8 bg-border" />
              </div>

              {/* Right: Desktop App Card */}
              <div className="rounded-xl border border-border bg-background p-4 shadow-lg flex flex-col justify-between h-48 relative overflow-hidden ring-1 ring-border/80">
                {/* Titlebar mockup */}
                <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                    <div className="h-2.5 w-2.5 rounded-full bg-zinc-500" />
                    <div className="h-2.5 w-2.5 rounded-full bg-zinc-400" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Monitor className="h-3.5 w-3.5 text-foreground" />
                    <span className="text-xs font-bold text-foreground">Desktop App</span>
                  </div>
                  <span className="text-[10px] font-mono bg-muted text-foreground px-2 py-0.5 rounded border border-border font-semibold">
                    Electron
                  </span>
                </div>
                {/* Window inner mockup */}
                <div className="space-y-2 py-2">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-muted flex items-center justify-center shrink-0">
                      <Monitor className="h-3.5 w-3.5 text-foreground" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="h-2.5 w-2/3 rounded bg-foreground/15" />
                      <div className="h-2 w-1/3 rounded bg-foreground/10" />
                    </div>
                  </div>
                  <div className="h-8 rounded-lg bg-muted/40 border border-border/40" />
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px] font-mono text-muted-foreground">
                  <span className="text-foreground font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Ready
                  </span>
                  <span>1280 × 800</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

