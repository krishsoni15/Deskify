"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  Palette,
  Settings2,
  Layers,
  Code2,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "Website → Desktop",
    description:
      "Wrap any supported HTTPS website into a native Electron desktop window.",
  },
  {
    icon: Palette,
    title: "Custom Branding",
    description:
      "Use your own application name, description, and custom app icon.",
  },
  {
    icon: Settings2,
    title: "Window Controls",
    description:
      "Configure window size, resizability, initial maximized state, and always-on-top.",
  },
  {
    icon: Code2,
    title: "Source Code",
    description:
      "Receive full, clean Electron source code instead of a restricted black-box binary.",
  },
  {
    icon: Layers,
    title: "Cross Platform",
    description:
      "Generated projects include native 1-click launchers for Linux, macOS, and Windows.",
  },
  {
    icon: Zap,
    title: "Developer Friendly",
    description:
      "Pre-configured scripts for local development and electron-builder installer builds.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
            FEATURES
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Everything you need. Nothing you don't.
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-lg mx-auto">
            Focused tooling engineered to wrap web apps into clean desktop projects.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="group rounded-2xl border border-border/70 bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-foreground tracking-tight">{feature.title}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

