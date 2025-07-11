import { chromium } from "playwright"

import runFullAccessibilityAudit from "../../runFullAccessibilityAudit/index.ts"

console.log("🧪 Accessibility Test: Input")

try {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    locale: "en-US",
  })
  const page = await context.newPage()

  const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Input Accessibility Test</title>
</head>
<body>
  <main>
    <h1>Input Accessibility Test</h1>
    <form>
      <label for="username">Username</label>
      <input class="input" id="username" name="username" type="text" />
      <label for="email">Email</label>
      <input class="input" id="email" name="email" type="email" required />
      <label for="password">Password</label>
      <input class="input" id="password" name="password" type="password" aria-describedby="password-help" />
      <p id="password-help" class="help" aria-live="polite">Password must be at least 8 characters.</p>
    </form>
  </main>
</body>
</html>
  `

  await page.setContent(testHtml)
  console.log("✓ Test page created with Input components")

  const auditResults = await runFullAccessibilityAudit()(page)

  if (auditResults.axe.violations.length === 0) {
    console.log("✓ No accessibility violations found for Input")
  } else {
    console.error("❌ Accessibility violations found:", auditResults.axe.violations)
    Deno.exit(1)
  }

  await browser.close()
  console.log("✓ Input accessibility test completed successfully!")

} catch (error) {
  console.error("❌ Input accessibility test failed:", error)
  Deno.exit(1)
}
