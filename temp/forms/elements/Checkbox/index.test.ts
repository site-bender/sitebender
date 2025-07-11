import { chromium } from "playwright"

import runFullAccessibilityAudit from "../../runFullAccessibilityAudit/index.ts"

console.log("🧪 Accessibility Test: Checkbox")

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
  <title>Checkbox Accessibility Test</title>
</head>
<body>
  <main>
    <h1>Checkbox Accessibility Test</h1>
    <form>
      <label class="checkbox" id="test-checkbox">
        <div class="label-text">Accept terms and conditions</div>
        <input type="checkbox" id="test-checkbox" name="terms" value="yes" />
      </label>
      <label class="checkbox" id="test-checkbox-2">
        <div class="label-text">Subscribe to newsletter</div>
        <input type="checkbox" id="test-checkbox-2" name="newsletter" value="yes" checked />
      </label>
    </form>
  </main>
</body>
</html>
  `

  await page.setContent(testHtml)
  console.log("✓ Test page created with Checkbox components")

  const auditResults = await runFullAccessibilityAudit()(page)

  if (auditResults.axe.violations.length === 0) {
    console.log("✓ No accessibility violations found for Checkbox")
  } else {
    console.error("❌ Accessibility violations found:", auditResults.axe.violations)
    Deno.exit(1)
  }

  await browser.close()
  console.log("✓ Checkbox accessibility test completed successfully!")

} catch (error) {
  console.error("❌ Checkbox accessibility test failed:", error)
  Deno.exit(1)
}
