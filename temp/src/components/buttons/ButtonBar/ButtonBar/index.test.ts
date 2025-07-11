import { chromium } from "playwright"

import runFullAccessibilityAudit from "../../runFullAccessibilityAudit/index.ts"

console.log("🧪 Accessibility Test: ButtonBar")

try {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    locale: "en-US",
  })
  const page = await context.newPage()

  // Render ButtonBar with three buttons (top and bottom positions)
  const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ButtonBar Accessibility Test</title>
</head>
<body>
  <main>
    <h1>ButtonBar Accessibility Test</h1>
    <header class="button-bar">
      <button type="button">Save</button>
      <button type="button">Cancel</button>
      <button type="button" aria-label="Delete item">🗑️</button>
    </header>
    <footer class="button-bar">
      <button type="button">Previous</button>
      <button type="button">Next</button>
    </footer>
  </main>
</body>
</html>
  `

  await page.setContent(testHtml)
  console.log("✓ Test page created with ButtonBar components")

  const auditResults = await runFullAccessibilityAudit()(page)

  if (auditResults.axe.violations.length === 0) {
    console.log("✓ No accessibility violations found for ButtonBar")
  } else {
    console.error("❌ Accessibility violations found:", auditResults.axe.violations)
    Deno.exit(1)
  }

  await browser.close()
  console.log("✓ ButtonBar accessibility test completed successfully!")

} catch (error) {
  console.error("❌ ButtonBar accessibility test failed:", error)
  Deno.exit(1)
}
