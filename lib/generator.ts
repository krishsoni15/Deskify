import type { GenerateRequestInput } from "@/lib/validation";
import { generateMainJs } from "@/lib/templates/main-js";
import { generatePreloadJs } from "@/lib/templates/preload-js";
import { generateConfigJs } from "@/lib/templates/config-js";
import { generatePackageJson } from "@/lib/templates/package-json";
import { generateReadme } from "@/lib/templates/readme";
import { generateGitignore } from "@/lib/templates/gitignore";
import { slugify } from "@/lib/utils";

export interface GeneratedFile {
  path: string;
  content: string | Buffer;
}

// Default high-res (128x128) desktop app icon (vibrant gradient with white monitor symbol)
const DEFAULT_ICON_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAErUlEQVR4nO2dzU0jQRCFi9WCOPpEFiSB" +
  "RCCkQCCkQCBIJEEWnHxE+MAeUEN7XN3V/93e977Legc0Y/f7qmo8YxkRQgghhBBCCCGEoHAx+oCPD+9f" +
  "o495bjw93wzLpfuBtMB3h4/ehz1b9pfXJ9t6CtFtx37wWuCU4BQtfH9bDxGa7zAUvCrBJyVw7K/i4fcS" +
  "oakALvxQ8Frg7ASByr/Sw3ePW0nQZCda1YeC5zg4xmr7mggtu0G1ALGqDwXPcfBNTtt3v9u6G1QJsA1f" +
  "q/qccYCO1fZj3aBUgmIBQuFrVc/g87Da/rYb1EhQJIAVvjUOSBqxtt9Kgj+lT84Kf3f4YPiV+Guast4l" +
  "ZHcAv/qtJ8Pg2xGqeH97SRfI6gDqGT/DH0LKOrttOfdbskeAemLH8IcQa/uloyBZAPVij3bGz/C7op5o" +
  "K9tSu0BWBzDf5zP8IViFl9MFkgSwbvAgX8qdSWwUiKR1geQOYF3bZ/WPxerAqUVZPgLY+qeTc68lRP67" +
  "gMJZQ/pRU4ymANZHulj9c7EK0joPSOoAvIe/PqUZ/a06QMPqv329b7avc+Ht7qXJfnafHyefLdgdPtQP" +
  "m2xJFsAdqDWIwTvca28lgkMTIkTxpeAWIIfv03Idul0KrjmIBsM/psV6lORS/nmAinHA8HVq1qU0j2IB" +
  "yP9B1klgC2KWtz4ZWpnQOty+3g9dh2U6AFL4Iuu83mUEIHOgAOBQAHAoADgUABwKAA4FAIcCgEMBwKEA" +
  "4FAAcCgAOBQAHAoADgUAhwKAQwHAoQDgUABwKAA4FAAcCgAOBQCHAoBDAcChAOBQAHAoADgUABwKAA4F" +
  "AIcCgEMBwKEA4CwjANo3h63yeod/SdTb3Uv0C5LQGf3dQct0ADKHKQKs8g1ZqzFjXaZ1AEpwzKz1mDoC" +
  "KME3M9dh+EngFvfiEU8AVyiA6QI4Ri9GSLgVQhkJ3wWAQwHAoQDgUABwKAA4FAAcCgAOBQCHAoBDAcCh" +
  "AOBQAHCWuRlUSuu7iCX7O+cbSOwA4FAAcIoFSP379GQMpXkUCbC/ZPgrUpJLtgAMf21y88l6F7C/ui7+" +
  "O/W9OOcz8F7kjIPkDqCZxfOANdBySO0ESQKo4XMULEVpRqYAT883F7EdswvMxV9/LXAtP5/8k0DjgGQ8" +
  "NQWZJcDRgdgFphMqxpzCLDoJ1A5MCcbi1tvKxSJJAH+OaKZxFMxBW3//sTX/RWpGgGEg6YfVgbuMAK0L" +
  "cBSMJ1Z4udUvUnEpODYKKEEftkG3GMdZAjirYvZRgj6krLPbllr9IiLJv+jz+PD+tTt83xP4+fdz8//D" +
  "7z2D1e4fnBPqmN2E72/PCV+k5vMACU+G3aAOf01T1ruEog4g8t0FRE4r3q92doMyYlXv/3z7s9zqF6kQ" +
  "QCQsgcjpSAj9nPxiXdmLiVESvkilACKnEviPtW6wffyzDVAI6zaued2lMnyRBgKI/EogYrd9NXxlGwrW" +
  "bVxrHNSEL9JIAEesG4joVY4cvsP6sE3rqvdpKoCI3g22j3+2Abb9EDnjoFX4Ih0EcIREiG1DxxoHLYN3" +
  "dBPA4YvgYPhhSj7VU0N3AbZoQpBjegZOCCGEEEIIIQSaf5DLy/ffAPykAAAAAElFTkSuQmCC";

export async function generateProject(
  config: GenerateRequestInput
): Promise<GeneratedFile[]> {
  const slug = slugify(config.name) || "desktop-app";
  const dirName = `${slug}-desktop`;

  const files: GeneratedFile[] = [
    {
      path: `${dirName}/package.json`,
      content: generatePackageJson(config),
    },
    {
      path: `${dirName}/main.js`,
      content: generateMainJs(config),
    },
    {
      path: `${dirName}/preload.js`,
      content: generatePreloadJs(),
    },
    {
      path: `${dirName}/src/config.js`,
      content: generateConfigJs(config),
    },
    {
      path: `${dirName}/README.md`,
      content: generateReadme(config),
    },
    {
      path: `${dirName}/.gitignore`,
      content: generateGitignore(),
    },
    // 1-Click Executable Launchers for Linux, Mac, Windows
    {
      path: `${dirName}/Run-Linux.sh`,
      content: `#!/usr/bin/env bash
# Universal 1-Click Desktop App Launcher for Linux
DIR="$( cd "$( dirname "\${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

# If opened from GUI file manager without a terminal window, spawn terminal emulator
if [ ! -t 1 ]; then
  if command -v gnome-terminal >/dev/null 2>&1; then
    exec gnome-terminal -- bash -c "cd '$DIR' && bash ./Run-Linux.sh; exec bash"
  elif command -v x-terminal-emulator >/dev/null 2>&1; then
    exec x-terminal-emulator -e bash -c "cd '$DIR' && bash ./Run-Linux.sh; exec bash"
  elif command -v konsole >/dev/null 2>&1; then
    exec konsole -e bash -c "cd '$DIR' && bash ./Run-Linux.sh; exec bash"
  elif command -v xterm >/dev/null 2>&1; then
    exec xterm -e bash -c "cd '$DIR' && bash ./Run-Linux.sh; exec bash"
  fi
fi

echo "=================================================="
echo " Launching ${config.name} Desktop App..."
echo "=================================================="
echo ""

# Ensure npm/node are in PATH
export PATH="$PATH:/usr/local/bin:/usr/bin:/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node 2>/dev/null | tail -n 1)/bin:$HOME/.nvs/default/bin:$HOME/.bun/bin"

if ! command -v npm >/dev/null 2>&1; then
  echo "Error: Node.js and npm are required to run this app."
  echo "Please install Node.js from https://nodejs.org or via your package manager."
  read -p "Press enter to exit..."
  exit 1
fi

npm install && npm start
`,
    },
    {
      path: `${dirName}/Launch-${slug}.desktop`,
      content: `[Desktop Entry]\nType=Application\nName=${config.name}\nComment=Launch ${config.name} Desktop App\nExec=bash -c "cd \\"$(dirname \\"%k\\")\\" && ./Run-Linux.sh"\nIcon=assets/icon.png\nTerminal=true\nCategories=Utility;\n`,
    },
    {
      path: `${dirName}/Run-Mac.command`,
      content: `#!/usr/bin/env bash\nDIR="$( cd "$( dirname "\${BASH_SOURCE[0]}" )" && pwd )"\ncd "$DIR"\necho "Launching ${config.name} Desktop App..."\nnpm install && npm start\n`,
    },
    {
      path: `${dirName}/Run-Windows.bat`,
      content: `@echo off\necho Launching ${config.name} Desktop App...\ncd /d "%~dp0"\ncall npm install\ncall npm start\n`,
    },
    {
      path: `${dirName}/Install-Silent-Windows.vbs`,
      content: `Set WshShell = CreateObject("WScript.Shell")\nWshShell.Run "cmd /c Run-Windows.bat", 0, False\n`,
    },
  ];

  // Handle icon
  if (config.icon) {
    const match = config.icon.match(/^data:image\/\w+;base64,(.+)$/);
    if (match) {
      const iconBuffer = Buffer.from(match[1], "base64");
      files.push({
        path: `${dirName}/assets/icon.png`,
        content: iconBuffer,
      });
    } else if (config.icon.startsWith("http://") || config.icon.startsWith("https://")) {
      try {
        const res = await fetch(config.icon);
        if (res.ok) {
          const arrayBuffer = await res.arrayBuffer();
          files.push({
            path: `${dirName}/assets/icon.png`,
            content: Buffer.from(arrayBuffer),
          });
        } else {
          files.push({
            path: `${dirName}/assets/icon.png`,
            content: Buffer.from(DEFAULT_ICON_BASE64, "base64"),
          });
        }
      } catch {
        files.push({
          path: `${dirName}/assets/icon.png`,
          content: Buffer.from(DEFAULT_ICON_BASE64, "base64"),
        });
      }
    } else {
      files.push({
        path: `${dirName}/assets/icon.png`,
        content: Buffer.from(DEFAULT_ICON_BASE64, "base64"),
      });
    }
  } else {
    files.push({
      path: `${dirName}/assets/icon.png`,
      content: Buffer.from(DEFAULT_ICON_BASE64, "base64"),
    });
  }

  return files;
}

export function getZipFilename(name: string): string {
  const slug = slugify(name) || "desktop-app";
  return `${slug}-desktop.zip`;
}
