import type { GenerateRequestInput } from "@/lib/validation";
import { slugify } from "@/lib/utils";

export function generateElectronBuilderYml(config: GenerateRequestInput): string {
  const slug = slugify(config.name) || "desktop-app";
  const appId = config.appId || `com.deskify.${slug}`;

  return `appId: ${appId}
productName: "${config.name}"
copyright: "Copyright © ${new Date().getFullYear()} ${config.author || config.name}"
directories:
  output: "dist"
  buildResources: "assets"

files:
  - "main.js"
  - "preload.js"
  - "src/**/*"
  - "assets/**/*"

# macOS Configuration & Gatekeeper Notarization
mac:
  category: "public.app-category.utilities"
  target:
    - target: "dmg"
      arch:
        - "x64"
        - "arm64"
    - target: "zip"
      arch:
        - "x64"
        - "arm64"
  icon: "assets/icon.png"
  hardenedRuntime: true
  gatekeeperAssess: false
  entitlements: "build/entitlements.mac.plist"
  entitlementsInherit: "build/entitlements.mac.plist"

dmg:
  title: "${config.name} Installer"
  artifactName: "${slug}-\${version}-mac-\${arch}.\${ext}"
  contents:
    - x: 130
      y: 220
    - x: 410
      y: 220
      type: "link"
      path: "/Applications"

# Windows Configuration & Code Signing (NSIS Installer)
win:
  target:
    - target: "nsis"
      arch:
        - "x64"
    - target: "portable"
      arch:
        - "x64"
  icon: "assets/icon.png"

nsis:
  oneClick: false
  perMachine: false
  allowToChangeInstallationDirectory: true
  createDesktopShortcut: true
  createStartMenuShortcut: true
  shortcutName: "${config.name}"
  artifactName: "${slug}-\${version}-win-setup.\${ext}"
  uninstallDisplayName: "Uninstall ${config.name}"

# Linux Configuration (AppImage & deb)
linux:
  target:
    - target: "AppImage"
      arch:
        - "x64"
    - target: "deb"
      arch:
        - "x64"
  category: "Utility"
  icon: "assets/icon.png"
  artifactName: "${slug}-\${version}-linux-\${arch}.\${ext}"
`;
}
