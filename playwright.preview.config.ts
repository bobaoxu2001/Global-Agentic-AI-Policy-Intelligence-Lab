import { defineConfig } from '@playwright/test';
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

export default defineConfig({
  testDir: './e2e', testMatch: 'preview.spec.ts', timeout: 60_000,
  use: { baseURL: 'http://localhost:3102', launchOptions: executablePath ? { executablePath } : undefined },
  webServer: { command: 'npx next dev -p 3102', url: 'http://localhost:3102', env: { BUILD_PROFILE: 'preview' }, reuseExistingServer: false, timeout: 120_000 },
});
