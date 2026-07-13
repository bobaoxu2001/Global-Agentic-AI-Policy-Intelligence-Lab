import { defineConfig } from '@playwright/test';
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

/** Production-profile UI coverage. The current corpus is intentionally empty
 * at render time until a human publication review completes. */
export default defineConfig({
  testDir: './e2e',
  testMatch: 'production.spec.ts',
  timeout: 60_000,
  use: { baseURL: 'http://localhost:3101', launchOptions: executablePath ? { executablePath } : undefined },
  webServer: {
    command: 'npx next dev -p 3101',
    url: 'http://localhost:3101',
    env: { BUILD_PROFILE: 'production' },
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
