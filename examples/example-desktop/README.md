# Example Website Desktop App

Generated with [Deskify](https://deskify.dev).

## About

This is an Electron desktop application that wraps **https://example.com** in a native window.

## Requirements

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

## Install

```bash
npm install
```

## Run

```bash
npm start
```

This will launch the desktop application and load the configured website.

## Configuration

Edit `src/config.js` to change:

- Website URL
- Window dimensions
- Window behavior (resizable, always on top, etc.)
- Appearance settings

## Build & Package

To create distributable executables, add a packaging tool:

```bash
npm install --save-dev @electron-forge/cli
npx electron-forge import
npx electron-forge make
```

This will produce platform-specific builds in the `out/` directory.

> **Note:** `npm start` runs the app in development mode. It does not produce an .exe, .dmg, or AppImage. Use Electron Forge or electron-builder for that.

## Project Structure

```
├── package.json      # Project metadata and dependencies
├── main.js           # Electron main process
├── preload.js        # Safe preload script
├── src/
│   └── config.js     # Application configuration
├── assets/
│   └── icon.png      # Application icon
├── README.md         # This file
└── .gitignore        # Git ignore rules
```

## Security

This application uses Electron's recommended security settings:

- `nodeIntegration: false` — Node.js APIs are not available in the web page
- `contextIsolation: true` — Preload scripts run in an isolated context
- `sandbox: true` — Renderer process is sandboxed

## License

MIT
