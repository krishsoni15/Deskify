"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  number: string;
  label: string;
}

const steps: Step[] = [
  { number: "01", label: "Configure" },
  { number: "02", label: "Generate" },
  { number: "03", label: "Download" },
];

interface StepperProps {
  currentStep: number; // 0, 1, 2
}

export function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-4 bg-card/60 p-2 rounded-2xl border border-border/60 backdrop-blur-md shadow-sm">
      {steps.map((step, i) => (
        <div key={step.number} className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-mono font-bold transition-all duration-300 relative",
                i < currentStep
                  ? "bg-foreground text-background shadow-md"
                  : i === currentStep
                  ? "bg-foreground text-background shadow-lg ring-4 ring-foreground/20 scale-105"
                  : "bg-muted text-muted-foreground border border-border/60"
              )}
            >
              {i < currentStep ? (
                <Check className="h-4 w-4 stroke-[3]" />
              ) : (
                step.number
              )}
            </div>
            <span
              className={cn(
                "text-xs font-bold tracking-tight hidden sm:inline transition-colors",
                i === currentStep
                  ? "text-foreground font-extrabold"
                  : i < currentStep
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "h-0.5 w-6 sm:w-10 rounded-full transition-all duration-500",
                i < currentStep ? "bg-foreground shadow-xs" : "bg-border/60"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
