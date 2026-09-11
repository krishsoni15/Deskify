"use client";

import { useCallback, useRef, useState } from "react";
import { ImageIcon, Upload, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

interface IconUploadProps {
  value: string | null; // base64 data URL
  onChange: (value: string | null) => void;
}

export function IconUpload({ value, onChange }: IconUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      setError(null);

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError("Please upload a PNG or JPG image.");
        return;
      }

      if (file.size > MAX_SIZE) {
        setError("Image must be smaller than 2 MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
      };
      reader.onerror = () => {
        setError("Failed to read the image file.");
      };
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  return (
    <Card className="overflow-hidden border border-border/80 shadow-sm transition-all duration-200 hover:border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-bold">
          <ImageIcon className="h-4 w-4 text-primary" />
          Application Icon
        </CardTitle>
        <CardDescription className="text-xs">
          Upload a custom PNG or JPG icon for your desktop application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {value ? (
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/60">
            <div className="relative h-20 w-20 shrink-0 rounded-2xl border border-border/80 bg-zinc-950 p-2 shadow-inner overflow-hidden flex items-center justify-center group">
              <img
                src={value}
                alt="App icon preview"
                className="h-full w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-auto text-center sm:text-left">
              <div className="text-xs font-semibold text-foreground flex items-center justify-center sm:justify-start gap-1.5">
                <span>{value.includes("google.com/s2/favicons") ? "Auto-Detected Favicon" : "Custom Icon Uploaded"}</span>
                {value.includes("google.com/s2/favicons") && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">Website Favicon</span>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground">
                {value.includes("google.com/s2/favicons")
                  ? "Fetched automatically from target URL. Will be bundled into desktop app assets."
                  : "Will be bundled with your desktop project assets"}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => inputRef.current?.click()}
                  className="h-8 text-xs font-medium border-border/80 hover:bg-muted"
                >
                  <Upload className="h-3.5 w-3.5 mr-1.5 text-primary" />
                  Upload Custom
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onChange(null);
                    setError(null);
                  }}
                  className="h-8 text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="h-3.5 w-3.5 mr-1" />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-7 text-center transition-all duration-200",
              isDragging
                ? "border-primary bg-primary/10 scale-[0.99]"
                : "border-border/80 bg-muted/10 hover:border-primary/50 hover:bg-muted/40"
            )}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/80 text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">
                Drop custom icon here or <span className="text-primary underline underline-offset-2">browse file</span>
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                PNG or JPG up to 2 MB (Square 512×512 recommended)
              </p>
            </div>
          </div>
        )}
        {error && <p className="mt-2 text-xs font-medium text-destructive">{error}</p>}
        <input
          ref={inputRef}
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={handleFileChange}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
}
