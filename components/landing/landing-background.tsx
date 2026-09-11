"use client";

import { useTheme } from "next-themes";
import DotGrid from "@/components/ui/dot-grid";

export function LandingBackground() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <div className="fixed inset-0 z-0 opacity-70 pointer-events-none overflow-hidden">
      <DotGrid
        dotSize={3.5}
        gap={26}
        baseColor={isLight ? "#8b8b96" : "#4a4a52"}
        activeColor={isLight ? "#09090b" : "#ffffff"}
        proximity={170}
        speedTrigger={50}
        shockRadius={260}
        shockStrength={5}
        returnDuration={1.2}
      />
    </div>
  );
}
