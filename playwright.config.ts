import { defineConfig } from '@playwright/test';
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

/** Phase 0 e2e runs against the FIXTURES profile (CB-4): shells + banner + calculator wiring. */
export default defineConfig({
  testDir: './e2e',
  testIgnore: ['production.spec.ts', 'preview.spec.ts'],
  timeout: 60_000,
  use: { baseURL: 'http://localhost:3100', launchOptions: executablePath ? { executablePath } : undefined },
  webServer: {
    command: 'npx next dev -p 3100',
    url: 'http://localhost:3100',
    env: { BUILD_PROFILE: 'fixtures' },
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
