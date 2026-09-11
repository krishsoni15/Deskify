"use client";

import { useCallback, useState } from "react";
import { Globe, CheckCircle2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { validateUrl } from "@/lib/validation";

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
}

const QUICK_SAMPLES = [
  { name: "Linear", url: "https://linear.app" },
  { name: "Excalidraw", url: "https://excalidraw.com" },
  { name: "GitHub", url: "https://github.com" },
  { name: "Notion", url: "https://notion.so" },
];

export function UrlInput({ value, onChange }: UrlInputProps) {
  const [touched, setTouched] = useState(false);

  const validation = value ? validateUrl(value) : null;
  const showError = touched && validation && !validation.valid;
  const showSuccess = value && validation?.valid;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
      if (!touched) setTouched(true);
    },
    [onChange, touched]
  );

  return (
    <Card className="overflow-hidden border-border/80 shadow-md hover:border-primary/40 transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2.5 text-base font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Globe className="h-4 w-4" />
          </div>
          Target Website URL <span className="text-foreground font-extrabold ml-1">*</span>
        </CardTitle>
        <CardDescription className="text-xs">
          Enter any HTTP or HTTPS URL to package into a standalone desktop application.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Input
            id="website-url"
            value={value}
            onChange={handleChange}
            onBlur={() => setTouched(true)}
            placeholder="https://your-website.com"
            className="font-mono text-sm tracking-tight"
            error={showError ? validation?.error : undefined}
          />
          {showSuccess && (
            <div className="flex items-center justify-between text-xs text-foreground font-semibold pt-0.5">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-foreground" />
                <span>Valid Target URL — Ready for generation</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Sample URLs */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-primary" />
            Try sample:
          </span>
          {QUICK_SAMPLES.map((sample) => (
            <button
              key={sample.name}
              type="button"
              onClick={() => {
                onChange(sample.url);
                setTouched(true);
              }}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md border border-border/60 bg-muted/40 text-muted-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {sample.name}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

