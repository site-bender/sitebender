import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: 'docs/tests/e2e',
  timeout: 30000,
  retries: 0,
  use: {
    headless: true,
    baseURL: 'http://localhost:5556',
    trace: 'off', // less verbose
  },
  reporter: [['dot'], ['html', { outputFolder: 'playwright-report' }]], // less verbose
  webServer: {
    command: 'deno run --allow-net --allow-read jsr:@std/http/file-server --port 5556 docs/dist/',
    port: 5556,
    reuseExistingServer: true,
    timeout: 60000,
  },
})
