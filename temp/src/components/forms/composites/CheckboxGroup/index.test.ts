import { chromium } from "playwright"

import runFullAccessibilityAudit from "../../runFullAccessibilityAudit/index.ts"

console.log("🧪 Accessibility Test: CheckboxGroup")

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
  <title>CheckboxGroup Accessibility Test</title>
</head>
<body>
  <main>
    <h1>CheckboxGroup Accessibility Test</h1>
    <form>
      <fieldset class="group checkbox-group" id="group-1">
        <legend id="group-1-legend">Choose your fruits</legend>
        <div class="help" id="group-1-help" aria-live="polite">Select all that apply.</div>
        <label class="checkbox" id="group-1-apple">
          <div class="label-text">Apple</div>
          <input type="checkbox" id="group-1-apple" name="fruits" value="apple" />
        </label>
        <label class="checkbox" id="group-1-banana">
          <div class="label-text">Banana</div>
          <input type="checkbox" id="group-1-banana" name="fruits" value="banana" checked />
        </label>
        <label class="checkbox" id="group-1-cherry">
          <div class="label-text">Cherry</div>
          <input type="checkbox" id="group-1-cherry" name="fruits" value="cherry" />
        </label>
      </fieldset>
    </form>
  </main>
</body>
</html>
  `

  await page.setContent(testHtml)
  console.log("✓ Test page created with CheckboxGroup components")

  const auditResults = await runFullAccessibilityAudit()(page)

  if (auditResults.axe.violations.length === 0) {
    console.log("✓ No accessibility violations found for CheckboxGroup")
  } else {
    console.error("❌ Accessibility violations found:", auditResults.axe.violations)
    Deno.exit(1)
  }

  await browser.close()
  console.log("✓ CheckboxGroup accessibility test completed successfully!")

} catch (error) {
  console.error("❌ CheckboxGroup accessibility test failed:", error)
  Deno.exit(1)
}
