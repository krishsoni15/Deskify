import type { GenerateRequestInput } from "@/lib/validation";
import { slugify } from "@/lib/utils";

export function generatePackageJson(config: GenerateRequestInput): string {
  const slug = slugify(config.name) || "desktop-app";
  const appId = config.appId || `com.deskify.${slug}`;

  const pkg = {
    name: `${slug}-desktop`,
    version: config.version || "1.0.0",
    description: config.description || `Desktop application for ${config.name}`,
    main: "main.js",
    author: config.author || "Deskify User",
    license: "MIT",
    scripts: {
      start: "electron . --no-sandbox",
      dist: "electron-builder",
      pack: "electron-builder --dir",
    },
    build: {
      appId: appId,
      productName: config.name,
      files: ["main.js", "preload.js", "src/**/*", "assets/**/*"],
      mac: {
        category: "public.app-category.utilities",
        target: ["dmg", "zip"],
      },
      win: {
        target: ["nsis", "portable"],
      },
      linux: {
        target: ["AppImage", "deb"],
        category: "Utility",
      },
    },
    devDependencies: {
      electron: "^34.0.0",
      "electron-builder": "^25.1.8",
    },
  };

  return JSON.stringify(pkg, null, 2) + "\n";
}
