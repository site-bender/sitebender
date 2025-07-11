#!/usr/bin/env bash
# scripts/e2e.sh
# Run Playwright e2e tests with server coordination

set -euo pipefail

# Use our shared server utilities
deno run --allow-all - <<'EOF'
const ensureServer = (await import("~utilities/ensureServer/index.ts")).default

try {
  await ensureServer(5556)

  console.log("🎭 Running Playwright tests...")

  const command = new Deno.Command("npx", {
    args: ["playwright", "test", "tests/e2e"],
    stdout: "inherit",
    stderr: "inherit"
  })

  const status = await command.output()
  Deno.exit(status.code)

} catch (error) {
  console.error("❌ E2E test setup failed:", error)
  Deno.exit(1)
}
EOF
