"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard, Sparkles, Github } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#product", label: "Product" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: "/#faq", label: "FAQ" },
];

export function DeskifyLogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Outer desktop window */}
      <rect x="2" y="3" width="20" height="14" rx="3" />
      <line x1="2" y1="7" x2="22" y2="7" />
      <circle cx="5" cy="5" r="0.5" fill="currentColor" />
      <circle cx="8" cy="5" r="0.5" fill="currentColor" />
      <circle cx="11" cy="5" r="0.5" fill="currentColor" />
      {/* Transformation arrow/web node */}
      <path d="M7 12h10M13 9l4 3-4 3" strokeWidth="2" />
      <path d="M9 17v4M15 17v4M8 21h8" strokeWidth="1.5" />
    </svg>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-none",
          scrolled
            ? "bg-background/80 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Page Navigation Links (Clean, No outer border) */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Middle: Deskify Logo */}
          <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight group shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-md transition-transform group-hover:scale-105 border border-border/40">
                <DeskifyLogoIcon className="h-5 w-5" />
              </div>
              <span className="font-extrabold tracking-tight text-foreground">Deskify</span>
            </Link>
          </div>

          {/* Right: Desktop Actions */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <ThemeToggle />

            {/* GitHub Repo Button */}
            <a
              href="https://github.com/krishsoni15/Deskify"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors",
              })}
              title="GitHub Repository"
            >
              <Github className="h-4 w-4" />
            </a>

            <Link href="/dashboard" className={buttonVariants({ variant: "ghost", size: "sm", className: "font-semibold text-xs text-muted-foreground hover:text-foreground" })}>
              <LayoutDashboard className="h-3.5 w-3.5 mr-1.5" />
              Dashboard
            </Link>

            <div className="relative group shrink-0">
              <div className="absolute -inset-0.5 rounded-xl bg-zinc-950/15 dark:bg-white/20 opacity-40 blur-xs transition duration-300 group-hover:opacity-80 pointer-events-none" />
              <Link href="/create" className={buttonVariants({ size: "sm", variant: "gradient", className: "relative font-bold text-xs px-4 rounded-xl shadow-md flex items-center gap-1.5" })}>
                <Sparkles className="h-3.5 w-3.5 text-current animate-pulse" />
                <span>Create App</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <a
              href="https://github.com/krishsoni15/Deskify"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="h-5 w-5" />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-lg md:hidden"
            >
              <div className="flex flex-col gap-1 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent/60"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-3 flex flex-col gap-2 pt-2 border-t border-border/50">
                  <a
                    href="https://github.com/krishsoni15/Deskify"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className={buttonVariants({ variant: "outline", size: "sm", className: "w-full justify-start font-medium gap-2" })}
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub Repository</span>
                  </a>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className={buttonVariants({ variant: "ghost", size: "sm", className: "w-full justify-start font-medium" })}
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                  <Link
                    href="/create"
                    onClick={() => setMobileOpen(false)}
                    className={buttonVariants({ size: "sm", variant: "gradient", className: "w-full justify-center font-bold" })}
                  >
                    <Sparkles className="h-4 w-4 mr-1.5" />
                    Create App
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

