const { app, BrowserWindow, nativeTheme } = require("electron");
const path = require("path");
const config = require("./src/config");

// Set appearance
if (config.appearance && config.appearance !== "system") {
  nativeTheme.themeSource = config.appearance;
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: config.width,
    height: config.height,
    resizable: config.resizable,
    alwaysOnTop: config.alwaysOnTop,
    title: config.appName,
    icon: path.join(__dirname, "assets", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });

  // Load the configured website
  mainWindow.loadURL(config.url);

  // Start maximized if configured
  if (config.maximized) {
    mainWindow.maximize();
  }

  // Open DevTools if configured
  if (config.devTools) {
    mainWindow.webContents.openDevTools();
  }

  // Set window title
  mainWindow.on("page-title-updated", (event) => {
    event.preventDefault();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
