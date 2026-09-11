export function generatePreloadJs(): string {
  return `const { contextBridge } = require("electron");

// Expose a minimal, safe API to the renderer process.
// Add custom APIs here as needed, keeping security in mind.
contextBridge.exposeInMainWorld("deskify", {
  platform: process.platform,
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
});
`;
}
