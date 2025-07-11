import { chromium } from "playwright"

import runFullAccessibilityAudit from "../../runFullAccessibilityAudit/index.ts"

console.log("🧪 Accessibility Test: Radio")

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
  <title>Radio Accessibility Test</title>
</head>
<body>
  <main>
    <h1>Radio Accessibility Test</h1>
    <form>
      <fieldset>
        <legend>Choose a color</legend>
        <label class="radio" id="radio-red">
          <span class="label-text">Red</span>
          <input type="radio" id="radio-red" name="color" value="red" />
        </label>
        <label class="radio" id="radio-green">
          <span class="label-text">Green</span>
          <input type="radio" id="radio-green" name="color" value="green" checked />
        </label>
        <label class="radio" id="radio-blue">
          <span class="label-text">Blue</span>
          <input type="radio" id="radio-blue" name="color" value="blue" />
        </label>
      </fieldset>
    </form>
  </main>
</body>
</html>
  `

  await page.setContent(testHtml)
  console.log("✓ Test page created with Radio components")

  const auditResults = await runFullAccessibilityAudit()(page)

  if (auditResults.axe.violations.length === 0) {
    console.log("✓ No accessibility violations found for Radio")
  } else {
    console.error("❌ Accessibility violations found:", auditResults.axe.violations)
    Deno.exit(1)
  }

  await browser.close()
  console.log("✓ Radio accessibility test completed successfully!")

} catch (error) {
  console.error("❌ Radio accessibility test failed:", error)
  Deno.exit(1)
}
