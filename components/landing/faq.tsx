"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqItems = [
  {
    question: "What is Deskify?",
    answer:
      "Deskify is a tool that generates complete Electron desktop application projects from any website URL. You configure the app settings, and Deskify produces a downloadable ZIP containing the full source code.",
  },
  {
    question: "Is Electron required?",
    answer:
      "Electron is required to run the generated desktop application. The generated project includes Electron as a dependency — just run npm install and npm start.",
  },
  {
    question: "Can I use any website?",
    answer:
      "You can use any publicly accessible website served over HTTP or HTTPS. Some websites may have restrictions on being loaded in embedded contexts. Deskify does not guarantee compatibility with websites that block iframe-like embedding, though Electron handles most cases.",
  },
  {
    question: "Does Deskify generate an EXE?",
    answer:
      "The MVP generates the Electron source project, not a compiled executable. To create a Windows .exe, macOS .dmg, or Linux AppImage, you can use tools like Electron Forge or electron-builder with the generated project.",
  },
  {
    question: "Can I customize the generated source code?",
    answer:
      "Absolutely. The generated project is standard JavaScript and Node.js code. You can modify main.js, config.js, preload.js, and any other file to add features, change behavior, or integrate additional functionality.",
  },
  {
    question: "Can I publish the generated application?",
    answer:
      "Yes. The generated code is yours. You can package, distribute, and publish the application however you like. Make sure you comply with the website's terms of service.",
  },
  {
    question: "Does it work offline?",
    answer:
      "The generated desktop app loads a website, so it requires an internet connection to access the website content. However, if the target website has offline capabilities (like a PWA), those will work in the Electron container.",
  },
  {
    question: "Is it free?",
    answer:
      "The core project generation feature is free. Future advanced features like cloud builds, code signing, and auto-updates may be offered as paid plans.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about Deskify.
          </p>
        </motion.div>

        <div className="mt-12 divide-y divide-border">
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <span className="text-sm font-medium pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
