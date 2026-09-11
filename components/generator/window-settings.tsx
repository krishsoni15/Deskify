"use client";

import { Settings2, Maximize2, Monitor } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface WindowSettingsProps {
  width: number;
  height: number;
  resizable: boolean;
  maximized: boolean;
  devTools: boolean;
  alwaysOnTop: boolean;
  onWidthChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  onResizableChange: (value: boolean) => void;
  onMaximizedChange: (value: boolean) => void;
  onDevToolsChange: (value: boolean) => void;
  onAlwaysOnTopChange: (value: boolean) => void;
}

const PRESETS = [
  { label: "1280 × 800 (Default)", w: 1280, h: 800 },
  { label: "1920 × 1080 (FHD)", w: 1920, h: 1080 },
  { label: "1024 × 768 (Compact)", w: 1024, h: 768 },
];

export function WindowSettings({
  width,
  height,
  resizable,
  maximized,
  devTools,
  alwaysOnTop,
  onWidthChange,
  onHeightChange,
  onResizableChange,
  onMaximizedChange,
  onDevToolsChange,
  onAlwaysOnTopChange,
}: WindowSettingsProps) {
  return (
    <Card className="overflow-hidden border-border/80 shadow-md hover:border-primary/40 transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2.5 text-base font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Settings2 className="h-4 w-4" />
          </div>
          Window & Display Options
        </CardTitle>
        <CardDescription className="text-xs">
          Configure initial window dimensions, launch state, and desktop frame flags.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Dimension inputs + Presets */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Maximize2 className="h-3.5 w-3.5 text-primary" />
              Dimensions (Width × Height)
            </label>
            <span className="text-[11px] font-mono text-muted-foreground">in pixels</span>
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-3">
            <Input
              id="window-width"
              type="number"
              min={200}
              max={7680}
              value={width}
              onChange={(e) => onWidthChange(Number(e.target.value))}
            />
            <span className="text-sm font-mono text-muted-foreground font-bold">×</span>
            <Input
              id="window-height"
              type="number"
              min={200}
              max={7680}
              value={height}
              onChange={(e) => onHeightChange(Number(e.target.value))}
            />
          </div>

          {/* Quick Presets Pill Bar */}
          <div className="flex flex-wrap gap-2 pt-1">
            {PRESETS.map((preset) => {
              const isActive = width === preset.w && height === preset.h;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    onWidthChange(preset.w);
                    onHeightChange(preset.h);
                  }}
                  className={`text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg border transition-all duration-200 ${
                    isActive
                      ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                      : "border-border/60 bg-muted/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Behavior Toggles */}
        <div className="space-y-3 pt-3 border-t border-border/60">
          <Checkbox
            id="resizable"
            label="Resizable Window"
            description="Allow the end-user to manually resize the desktop window frame"
            checked={resizable}
            onChange={onResizableChange}
          />
          <Checkbox
            id="maximized"
            label="Start Maximized"
            description="Automatically launch app window in full screen maximized state"
            checked={maximized}
            onChange={onMaximizedChange}
          />
          <Checkbox
            id="devtools"
            label="Enable DevTools"
            description="Include Chrome developer options menu on application launch"
            checked={devTools}
            onChange={onDevToolsChange}
          />
          <Checkbox
            id="always-on-top"
            label="Always On Top"
            description="Keep desktop application window pinned above other OS windows"
            checked={alwaysOnTop}
            onChange={onAlwaysOnTopChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}


