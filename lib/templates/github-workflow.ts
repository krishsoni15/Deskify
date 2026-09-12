import type { GenerateRequestInput } from "@/lib/validation";

export function generateGithubWorkflow(config: GenerateRequestInput): string {
  return `name: Build & Code Sign Desktop App (${config.name})

on:
  push:
    branches: [ main, master ]
    tags: [ 'v*' ]
  workflow_dispatch:

jobs:
  build:
    name: Build & Sign (${config.name})
    runs-on: \${{ matrix.os }}

    strategy:
      matrix:
        os: [windows-latest, macos-latest, ubuntu-latest]

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci || npm install

      - name: Build & Package Electron App
        uses: samuelmeuli/action-electron-builder@v1
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          # Set release to true when pushing git tags (e.g. v1.0.0)
          release: \${{ startsWith(github.ref, 'refs/tags/v') }}
          
          # Windows Code Signing Secrets (Set these in GitHub Repo -> Settings -> Secrets)
          # WIN_CSC_LINK: Base64-encoded .pfx/.p12 code signing certificate
          # WIN_CSC_KEY_PASSWORD: Password for the certificate file
          
          # macOS Apple Developer / Gatekeeper Notarization Secrets
          # CSC_LINK: Base64-encoded Developer ID Application .p12 certificate
          # CSC_KEY_PASSWORD: Certificate password
          # APPLE_ID: Your Apple Developer Email
          # APPLE_ID_PASS: App-Specific Password generated on appleid.apple.com
          # APPLE_TEAM_ID: 10-character Apple Developer Team ID
        env:
          WIN_CSC_LINK: \${{ secrets.WIN_CSC_LINK }}
          WIN_CSC_KEY_PASSWORD: \${{ secrets.WIN_CSC_KEY_PASSWORD }}
          CSC_LINK: \${{ secrets.CSC_LINK }}
          CSC_KEY_PASSWORD: \${{ secrets.CSC_KEY_PASSWORD }}
          APPLE_ID: \${{ secrets.APPLE_ID }}
          APPLE_ID_PASS: \${{ secrets.APPLE_ID_PASS }}
          APPLE_TEAM_ID: \${{ secrets.APPLE_TEAM_ID }}

      - name: Upload Installer Artifacts
        uses: actions/upload-artifact@v4
        with:
          name: ${config.name}-\${{ runner.os }}-Installer
          path: dist/*.*
          if-no-files-found: ignore
`;
}
