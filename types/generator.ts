export interface GeneratorConfig {
  url: string;
  name: string;
  appId: string;
  version: string;
  author: string;
  description: string;
  icon: string | null; // base64 data URL or null for default
  width: number;
  height: number;
  resizable: boolean;
  maximized: boolean;
  devTools: boolean;
  alwaysOnTop: boolean;
  appearance: "system" | "light" | "dark";
}

export type GeneratorFormData = GeneratorConfig;

export interface GenerateRequest {
  url: string;
  name: string;
  appId: string;
  version: string;
  author: string;
  description: string;
  icon: string | null;
  width: number;
  height: number;
  resizable: boolean;
  maximized: boolean;
  devTools: boolean;
  alwaysOnTop: boolean;
  appearance: "system" | "light" | "dark";
}

export interface GenerateResponse {
  success: boolean;
  filename: string;
}

export interface DashboardApp {
  id: string;
  name: string;
  url: string;
  version: string;
  createdAt: string;
  config: GeneratorConfig;
}
