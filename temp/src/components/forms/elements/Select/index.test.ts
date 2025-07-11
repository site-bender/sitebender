import { chromium } from "playwright"

import runFullAccessibilityAudit from "../../runFullAccessibilityAudit/index.ts"

console.log("🧪 Accessibility Test: Select")

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
  <title>Select Accessibility Test</title>
</head>
<body>
  <main>
    <h1>Select Accessibility Test</h1>
    <form>
      <label for="color">Choose a color</label>
      <select class="select" id="color" name="color">
        <option value="">Select a color</option>
        <option value="red">Red</option>
        <option value="green" selected>Green</option>
        <option value="blue">Blue</option>
      </select>
    </form>
  </main>
</body>
</html>
  `

  await page.setContent(testHtml)
  console.log("✓ Test page created with Select components")

  const auditResults = await runFullAccessibilityAudit()(page)

  if (auditResults.axe.violations.length === 0) {
    console.log("✓ No accessibility violations found for Select")
  } else {
    console.error("❌ Accessibility violations found:", auditResults.axe.violations)
    Deno.exit(1)
  }

  await browser.close()
  console.log("✓ Select accessibility test completed successfully!")

} catch (error) {
  console.error("❌ Select accessibility test failed:", error)
  Deno.exit(1)
}
