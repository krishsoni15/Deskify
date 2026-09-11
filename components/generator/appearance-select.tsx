"use client";

import { Paintbrush, Sun, Moon, Monitor } from "lucide-react";
import { RadioGroup, type RadioOption } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface AppearanceSelectProps {
  value: "system" | "light" | "dark";
  onChange: (value: "system" | "light" | "dark") => void;
}

const appearanceOptions: RadioOption[] = [
  {
    value: "system",
    label: "System",
    description: "Matches the host OS light or dark theme automatically",
    icon: <Monitor className="h-4 w-4 text-foreground" />,
    previewNode: (
      <div className="h-16 w-full rounded-lg border border-border/80 overflow-hidden flex flex-col bg-muted/40 shadow-inner">
        <div className="h-4 bg-muted border-b border-border/60 flex items-center px-2 gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
          <div className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
          <div className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
        </div>
        <div className="flex-1 grid grid-cols-2">
          <div className="bg-zinc-100 dark:bg-zinc-900 p-1 flex flex-col justify-center gap-1 border-r border-border/40">
            <div className="h-1.5 w-3/4 rounded bg-zinc-300 dark:bg-zinc-700" />
            <div className="h-1 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-2.5 w-full rounded bg-zinc-900 text-white text-[7px] font-mono flex items-center justify-center font-bold">Run</div>
          </div>
          <div className="bg-zinc-900 dark:bg-zinc-950 p-1 flex flex-col justify-center gap-1">
            <div className="h-1.5 w-3/4 rounded bg-zinc-700 dark:bg-zinc-600" />
            <div className="h-1 w-1/2 rounded bg-zinc-500/50" />
            <div className="h-2.5 w-full rounded bg-white text-zinc-950 text-[7px] font-mono flex items-center justify-center font-bold">Run</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    value: "light",
    label: "Light",
    description: "Clean, bright interface optimized for day environments",
    icon: <Sun className="h-4 w-4 text-foreground" />,
    previewNode: (
      <div className="h-16 w-full rounded-lg border border-zinc-300 overflow-hidden flex flex-col bg-zinc-50 shadow-inner">
        <div className="h-4 bg-zinc-200 border-b border-zinc-300 flex items-center px-2 gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
          <div className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
          <div className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
          <span className="text-[8px] font-mono text-zinc-500 ml-auto">App.exe</span>
        </div>
        <div className="flex-1 p-2 flex flex-col justify-center gap-1.5 bg-white">
          <div className="h-2 w-2/3 rounded bg-zinc-300" />
          <div className="h-1.5 w-1/3 rounded bg-zinc-200" />
          <div className="h-3 w-full rounded bg-zinc-900 text-white text-[8px] font-mono flex items-center justify-center">Run App</div>
        </div>
      </div>
    ),
  },
  {
    value: "dark",
    label: "Dark",
    description: "High-contrast obsidian theme engineered for low light",
    icon: <Moon className="h-4 w-4 text-foreground" />,
    previewNode: (
      <div className="h-16 w-full rounded-lg border border-zinc-800 overflow-hidden flex flex-col bg-zinc-950 shadow-inner">
        <div className="h-4 bg-zinc-900 border-b border-zinc-800 flex items-center px-2 gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
          <div className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
          <div className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
          <span className="text-[8px] font-mono text-zinc-400 ml-auto">App.exe</span>
        </div>
        <div className="flex-1 p-2 flex flex-col justify-center gap-1.5 bg-zinc-900">
          <div className="h-2 w-2/3 rounded bg-zinc-700" />
          <div className="h-1.5 w-1/3 rounded bg-zinc-800" />
          <div className="h-3 w-full rounded bg-white text-zinc-950 text-[8px] font-mono flex items-center justify-center font-bold">Run App</div>
        </div>
      </div>
    ),
  },
];

export function AppearanceSelect({ value, onChange }: AppearanceSelectProps) {
  return (
    <Card className="overflow-hidden border-border/80 shadow-md hover:border-primary/40 transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2.5 text-base font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Paintbrush className="h-4 w-4" />
          </div>
          Appearance
        </CardTitle>
        <CardDescription className="text-xs">
          Set the preferred visual theme for your generated desktop application wrapper.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          options={appearanceOptions}
          value={value}
          onChange={(v) => onChange(v as "system" | "light" | "dark")}
          layout="grid"
        />
      </CardContent>
    </Card>
  );
}

