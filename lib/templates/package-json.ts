import type { GenerateRequestInput } from "@/lib/validation";
import { slugify } from "@/lib/utils";

export function generatePackageJson(config: GenerateRequestInput): string {
  const slug = slugify(config.name) || "desktop-app";

  const pkg = {
    name: `${slug}-desktop`,
    version: config.version || "1.0.0",
    description: config.description || `Desktop application for ${config.name}`,
    main: "main.js",
    author: config.author || "Deskify User",
    license: "MIT",
    scripts: {
      start: "electron . --no-sandbox",
      build: "electron-builder --config electron-builder.yml",
      "build:win": "electron-builder --win --config electron-builder.yml",
      "build:mac": "electron-builder --mac --config electron-builder.yml",
      "build:linux": "electron-builder --linux --config electron-builder.yml",
      pack: "electron-builder --dir --config electron-builder.yml",
    },
    devDependencies: {
      electron: "^34.0.0",
      "electron-builder": "^25.1.8",
    },
  };

  return JSON.stringify(pkg, null, 2) + "\n";
}

