import { chromium } from "playwright"

import runFullAccessibilityAudit from "../../runFullAccessibilityAudit/index.ts"

console.log("🧪 Accessibility Test: Help")

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
  <title>Help Accessibility Test</title>
</head>
<body>
  <main>
    <h1>Help Accessibility Test</h1>
    <form>
      <p class="help" aria-live="polite">This field is required.</p>
      <p class="help" aria-live="polite">Please enter a valid email address.</p>
      <p class="help" aria-live="polite">Password must be at least 8 characters.</p>
    </form>
  </main>
</body>
</html>
  `

  await page.setContent(testHtml)
  console.log("✓ Test page created with Help components")

  const auditResults = await runFullAccessibilityAudit()(page)

  if (auditResults.axe.violations.length === 0) {
    console.log("✓ No accessibility violations found for Help")
  } else {
    console.error("❌ Accessibility violations found:", auditResults.axe.violations)
    Deno.exit(1)
  }

  await browser.close()
  console.log("✓ Help accessibility test completed successfully!")

} catch (error) {
  console.error("❌ Help accessibility test failed:", error)
  Deno.exit(1)
}
