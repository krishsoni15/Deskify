import type { GenerateRequestInput } from "@/lib/validation";

export function generateConfigJs(config: GenerateRequestInput): string {
  // Use JSON.stringify for safe serialization — never concatenate untrusted strings
  const configObj = {
    appName: config.name,
    version: config.version,
    url: config.url,
    width: config.width,
    height: config.height,
    resizable: config.resizable,
    maximized: config.maximized,
    devTools: config.devTools,
    alwaysOnTop: config.alwaysOnTop,
    appearance: config.appearance,
  };

  return `// Application configuration
// Edit these values to change the desktop app behavior.
module.exports = ${JSON.stringify(configObj, null, 2)};
`;
}
