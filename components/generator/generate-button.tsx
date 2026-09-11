"use client";

import { useEffect, useState } from "react";
import { Loader2, Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GenerateButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
}

const STAGES = [
  "Configuring Electron main process...",
  "Generating multi-platform launcher scripts...",
  "Packaging project assets & ZIP...",
  "Finalizing Desktop App package...",
];

export function GenerateButton({ onClick, loading, disabled }: GenerateButtonProps) {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (!loading) {
      setStageIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % STAGES.length);
    }, 750);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="w-full pt-2">
      <Button
        size="xl"
        variant="gradient"
        onClick={onClick}
        disabled={loading || disabled}
        className="w-full py-7 rounded-2xl font-extrabold text-base sm:text-lg shadow-2xl"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="font-mono text-xs sm:text-sm tracking-tight font-semibold">
              {STAGES[stageIndex]}
            </span>
          </span>
        ) : (
          <span className="flex items-center justify-center gap-3 font-extrabold tracking-wide">
            <Rocket className="h-5 w-5 transition-transform group-hover:scale-110 group-hover:-translate-y-0.5" />
            <span>Generate Desktop App</span>
            <Sparkles className="h-4 w-4 animate-pulse" />
          </span>
        )}
      </Button>
    </div>
  );
}
