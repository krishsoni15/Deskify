import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  disabled?: boolean;
}

export function Checkbox({ id, label, checked, onChange, description, disabled }: CheckboxProps) {
  return (
    <div
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        "flex items-center justify-between gap-4 p-3 rounded-xl border border-border/60 bg-card/40 hover:bg-card hover:border-primary/40 transition-all duration-200 cursor-pointer group",
        checked && "border-primary/50 bg-primary/5 shadow-sm shadow-primary/5",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="space-y-0.5 select-none">
        <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
          {label}
        </span>
        {description && (
          <p className="text-xs text-muted-foreground leading-normal">
            {description}
          </p>
        )}
      </div>

      {/* Modern Switch Toggle Control */}
      <button
        type="button"
        role="switch"
        id={id}
        aria-checked={checked}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) onChange(!checked);
        }}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
          checked ? "bg-primary shadow-sm shadow-primary/30" : "bg-muted-foreground/30 hover:bg-muted-foreground/40"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}

