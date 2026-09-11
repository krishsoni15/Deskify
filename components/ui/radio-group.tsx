import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  previewNode?: React.ReactNode;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  layout?: "row" | "grid";
}

export function RadioGroup({ options, value, onChange, label, layout = "grid" }: RadioGroupProps) {
  return (
    <div className="space-y-2">
      {label && (
        <span className="text-sm font-semibold text-foreground">{label}</span>
      )}
      <div
        className={cn(
          layout === "grid"
            ? "grid grid-cols-1 sm:grid-cols-3 gap-3"
            : "flex flex-wrap gap-2.5"
        )}
      >
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                "relative group flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all duration-200 cursor-pointer overflow-hidden outline-none",
                isSelected
                  ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary/40 shadow-md shadow-primary/10"
                  : "border-border/80 bg-card/60 text-muted-foreground hover:border-primary/50 hover:bg-card hover:text-foreground"
              )}
            >
              {/* Glow background accent on active */}
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
              )}

              {/* Header with Icon, Label and Checkmark */}
              <div className="flex items-center justify-between gap-2 w-full z-10 mb-2">
                <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                    )}
                  >
                    {option.icon}
                  </span>
                  <span>{option.label}</span>
                </div>
                <div
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground scale-100 opacity-100"
                      : "border-border/80 opacity-0 scale-75 group-hover:opacity-60"
                  )}
                >
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
              </div>

              {/* Optional Preview Node / Mockup */}
              {option.previewNode && (
                <div className="w-full my-1.5 z-10">{option.previewNode}</div>
              )}

              {/* Description text */}
              {option.description && (
                <p className="text-[11px] text-muted-foreground z-10 mt-1 leading-normal">
                  {option.description}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

