import Link from "next/link";
import { Github, Shield } from "lucide-react";
import { DeskifyLogoIcon } from "@/components/navbar";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm border border-border/40">
              <DeskifyLogoIcon className="h-4 w-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold tracking-tight text-foreground">Deskify</span>
              <span className="text-xs text-muted-foreground">Turn any website into a desktop app.</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-muted-foreground">
            <Link href="/#product" className="hover:text-foreground transition-colors">
              Product
            </Link>
            <Link href="/#how-it-works" className="hover:text-foreground transition-colors">
              How it works
            </Link>
            <Link href="/#features" className="hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/#faq" className="hover:text-foreground transition-colors">
              FAQ
            </Link>
            <a
              href="https://github.com/krishsoni15/Deskify"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
            <Link href="/create" className="hover:text-foreground transition-colors text-foreground font-semibold">
              Create App
            </Link>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground/80">
            <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-100 dark:bg-zinc-200 dark:text-zinc-950 font-medium">
              <Shield className="h-2.5 w-2.5" /> MIT License
            </span>
            <span>&copy; {new Date().getFullYear()} Deskify</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

