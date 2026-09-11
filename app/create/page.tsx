"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Stepper } from "@/components/generator/stepper";
import { UrlInput } from "@/components/generator/url-input";
import { AppDetails } from "@/components/generator/app-details";
import { IconUpload } from "@/components/generator/icon-upload";
import { WindowSettings } from "@/components/generator/window-settings";
import { AppearanceSelect } from "@/components/generator/appearance-select";
import { LivePreview } from "@/components/generator/live-preview";
import { GenerateButton } from "@/components/generator/generate-button";
import { SuccessScreen } from "@/components/generator/success-screen";
import { generateRequestSchema } from "@/lib/validation";
import { generateAppId, extractNameFromUrl, getFaviconUrl } from "@/lib/utils";
import { saveAppToStorage } from "@/lib/storage";
import type { GeneratorConfig } from "@/types/generator";

const defaultConfig: GeneratorConfig = {
  url: "",
  name: "",
  appId: "",
  version: "1.0.0",
  author: "",
  description: "",
  icon: null,
  width: 1280,
  height: 800,
  resizable: true,
  maximized: false,
  devTools: false,
  alwaysOnTop: false,
  appearance: "system",
};

function CreateFormContent() {
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<GeneratorConfig>(defaultConfig);
  const [step, setStep] = useState(0); // 0=configure, 1=generating, 2=download
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);
  const [zipFilename, setZipFilename] = useState("");

  // Read URL search param if present from hero redirect
  useEffect(() => {
    const urlParam = searchParams.get("url");
    if (urlParam && !config.url) {
      setConfig((prev) => ({ ...prev, url: urlParam }));
    }
  }, [searchParams, config.url]);

  const update = useCallback(
    <K extends keyof GeneratorConfig>(key: K, value: GeneratorConfig[K]) => {
      setConfig((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleGenerate = useCallback(async () => {
    setError(null);

    // Validate
    const finalConfig = {
      ...config,
      appId: config.appId || generateAppId(config.name),
    };

    const result = generateRequestSchema.safeParse(finalConfig);
    if (!result.success) {
      const firstError = result.error.issues[0];
      setError(firstError?.message || "Please check your configuration.");
      return;
    }

    setLoading(true);
    setStep(1);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Generation failed (${response.status})`
        );
      }

      const blob = await response.blob();
      const filename =
        response.headers.get("X-Filename") ||
        `${config.name.toLowerCase().replace(/\s+/g, "-")}-desktop.zip`;

      saveAppToStorage(finalConfig);

      setZipBlob(blob);
      setZipFilename(filename);
      setStep(2);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
      setStep(0);
    } finally {
      setLoading(false);
    }
  }, [config]);

  const handleDownload = useCallback(() => {
    if (!zipBlob) return;
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = zipFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [zipBlob, zipFilename]);

  const handleCreateAnother = useCallback(() => {
    setConfig(defaultConfig);
    setStep(0);
    setZipBlob(null);
    setZipFilename("");
    setError(null);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Clean container without background glow gradient */}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 border-b border-border/60 pb-6 backdrop-blur-xs">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors mb-2 group"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1 text-primary" />
              Back to Home
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
              Create Desktop Application
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Configure your web app parameters. We'll generate a production Electron desktop package.
            </p>
          </div>
          <Stepper currentStep={step} />
        </div>

        {/* Error Banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-xs font-medium text-destructive shadow-sm"
          >
            {error}
          </motion.div>
        )}

        {step === 2 && zipBlob ? (
          <SuccessScreen
            config={config}
            onDownload={handleDownload}
            onCreateAnother={handleCreateAnother}
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr,420px] items-start">
            {/* Left: Configuration Forms */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <UrlInput
                value={config.url}
                onChange={(v) => update("url", v)}
              />

              <AppDetails
                name={config.name}
                appId={config.appId}
                version={config.version}
                author={config.author}
                description={config.description}
                onNameChange={(v) => update("name", v)}
                onAppIdChange={(v) => update("appId", v)}
                onVersionChange={(v) => update("version", v)}
                onAuthorChange={(v) => update("author", v)}
                onDescriptionChange={(v) => update("description", v)}
              />

              <IconUpload
                value={config.icon}
                onChange={(v) => update("icon", v)}
              />

              <WindowSettings
                width={config.width}
                height={config.height}
                resizable={config.resizable}
                maximized={config.maximized}
                devTools={config.devTools}
                alwaysOnTop={config.alwaysOnTop}
                onWidthChange={(v) => update("width", v)}
                onHeightChange={(v) => update("height", v)}
                onResizableChange={(v) => update("resizable", v)}
                onMaximizedChange={(v) => update("maximized", v)}
                onDevToolsChange={(v) => update("devTools", v)}
                onAlwaysOnTopChange={(v) => update("alwaysOnTop", v)}
              />

              <AppearanceSelect
                value={config.appearance}
                onChange={(v) => update("appearance", v)}
              />

              {/* Mobile Live Preview */}
              <div className="block lg:hidden pt-4">
                <LivePreview
                  name={config.name}
                  url={config.url}
                  width={config.width}
                  height={config.height}
                  icon={config.icon}
                  appearance={config.appearance}
                />
              </div>

              <GenerateButton
                onClick={handleGenerate}
                loading={loading}
              />
            </motion.div>

            {/* Right: Sticky Live Preview (Desktop) */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="hidden lg:block sticky top-24"
            >
              <LivePreview
                name={config.name}
                url={config.url}
                width={config.width}
                height={config.height}
                icon={config.icon}
                appearance={config.appearance}
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="p-8 text-center text-xs font-mono text-muted-foreground">Loading Generator...</div>}>
          <CreateFormContent />
        </Suspense>
      </main>
    </>
  );
}

