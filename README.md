# Deskify

> Turn any website into a desktop app.

[![GitHub](https://img.shields.io/badge/GitHub-krishsoni15%2FDeskify-000000?logo=github)](https://github.com/krishsoni15/Deskify)
[![License: MIT](https://img.shields.io/badge/License-MIT-000000.svg)](https://opensource.org/licenses/MIT)

Deskify is a SaaS web application that generates complete Electron desktop application projects from any website URL. Configure your app, generate the project, and download a ready-to-run ZIP.


## Product

**Configure. Generate. Download.**

1. Enter a website URL
2. Customize app name, icon, window settings, and appearance
3. Download a complete Electron project as a ZIP
4. Extract, run `npm install` && `npm start` — your desktop app launches

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** Custom (shadcn-style with CVA)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Validation:** Zod
- **ZIP Generation:** JSZip
- **Theme:** next-themes (dark/light mode)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Design system
│   ├── create/
│   │   └── page.tsx                # Generator page
│   ├── dashboard/
│   │   └── page.tsx                # Dashboard page
│   └── api/
│       └── generate/
│           └── route.ts            # POST /api/generate
├── components/
│   ├── navbar.tsx                  # Navigation
│   ├── footer.tsx                  # Footer
│   ├── theme-toggle.tsx            # Dark/light toggle
│   ├── ui/                         # Base UI components
│   ├── landing/                    # Landing page sections
│   ├── generator/                  # Generator form components
│   └── dashboard/                  # Dashboard components
├── lib/
│   ├── utils.ts                    # Utilities (cn, slugify)
│   ├── validation.ts               # Zod schemas
│   ├── generator.ts                # Project generation engine
│   ├── zip.ts                      # ZIP creation
│   └── templates/                  # Electron project templates
├── types/
│   └── generator.ts                # TypeScript interfaces
└── examples/
    └── example-desktop/            # Sample generated project
```

## API

### POST /api/generate

Generates an Electron desktop app project and returns it as a ZIP file.

**Request Body:**

```json
{
  "url": "https://example.com",
  "name": "My Website",
  "appId": "com.deskify.mywebsite",
  "version": "1.0.0",
  "author": "Your Name",
  "description": "A desktop app",
  "icon": null,
  "width": 1280,
  "height": 800,
  "resizable": true,
  "maximized": false,
  "devTools": false,
  "alwaysOnTop": false,
  "appearance": "system"
}
```

**Response:** Binary ZIP file download.

**Error Response:**

```json
{
  "error": "Error message",
  "details": [{ "path": "url", "message": "Please enter a valid HTTP or HTTPS URL" }]
}
```

## Generated Project Structure

The ZIP contains:

```
my-website-desktop/
├── package.json          # Electron + metadata
├── main.js               # Main process
├── preload.js            # Safe preload script
├── src/
│   └── config.js         # App configuration
├── assets/
│   └── icon.png          # App icon
├── README.md             # Documentation
└── .gitignore            # Git ignore rules
```

## Security Model

### SaaS Application

- **URL validation:** Only HTTP/HTTPS URLs accepted. `javascript:`, `file:`, `data:`, `blob:` protocols are rejected.
- **No code execution:** The server only generates files. It never runs `npm install`, `npm start`, or `eval` on user input.
- **Safe serialization:** All user values are embedded in generated code via `JSON.stringify()`, never via string concatenation.
- **In-memory processing:** ZIP files are created in memory and streamed. No temporary files on disk.

### Generated Electron Applications

- `nodeIntegration: false` — web pages cannot access Node.js
- `contextIsolation: true` — preload scripts run in isolated context
- `sandbox: true` — renderer process is sandboxed
- Minimal preload API via `contextBridge`

## Features

- **Monochrome High-Contrast UI:** Built with strict Black & White design system (Light, Dark, and System modes).
- **Interactive Background:** Embedded React Bits canvas `<DotGrid />` with mouse proximity tracking and shockwave physics.
- **Client-Side History & Storage:** Instant dashboard saving using `localStorage` with zero database fees.
- **1-Click Platform Launchers:** Bundled `Run-Linux.sh`, `Run-Mac.command`, `Run-Windows.bat`, and `Install-Silent-Windows.vbs` executable scripts.
- **Custom Icon & Favicon Support:** Supports custom image uploads as well as manual icon bundling.
- **Security First:** Electron sandboxing, `contextIsolation`, and `nodeIntegration: false`.

## Future Roadmap

- [x] High-contrast monochrome aesthetic & interactive canvas background
- [x] Client-side dashboard persistence (`localStorage`)
- [x] Universal 1-click launcher scripts (Linux, macOS, Windows)
- [ ] Native cloud builds (.exe, .dmg, .AppImage binaries)
- [ ] System tray integration & custom splash screens
- [ ] Auto-updater support

## Testing the Full Flow

```bash
# 1. Start the dev server
npm run dev

# 2. Open http://localhost:3000
# 3. Click "Create Desktop App"
# 4. Enter: https://example.com
# 5. Set app name: "Example Desktop"
# 6. Click "Generate Desktop App"
# 7. Download the ZIP

# 8. Extract and test the generated app
cd /tmp
unzip ~/Downloads/example-desktop-desktop.zip
cd example-desktop-desktop
npm install
npm start
# Electron opens with https://example.com
```

## License

MIT
