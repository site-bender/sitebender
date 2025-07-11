import { chromium } from "playwright"

import runFullAccessibilityAudit from "../../runFullAccessibilityAudit/index.ts"

console.log("🧪 Accessibility Test: Label")

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
  <title>Label Accessibility Test</title>
</head>
<body>
  <main>
    <h1>Label Accessibility Test</h1>
    <form>
      <label class="label" for="username">Username</label>
      <input class="input" id="username" name="username" type="text" />
      <label class="label" for="email">Email</label>
      <input class="input" id="email" name="email" type="email" required />
      <div class="label" id="custom-label">Custom label as div</div>
      <input class="input" aria-labelledby="custom-label" name="custom" type="text" />
    </form>
  </main>
</body>
</html>
  `

  await page.setContent(testHtml)
  console.log("✓ Test page created with Label components")

  const auditResults = await runFullAccessibilityAudit()(page)

  if (auditResults.axe.violations.length === 0) {
    console.log("✓ No accessibility violations found for Label")
  } else {
    console.error("❌ Accessibility violations found:", auditResults.axe.violations)
    Deno.exit(1)
  }

  await browser.close()
  console.log("✓ Label accessibility test completed successfully!")

} catch (error) {
  console.error("❌ Label accessibility test failed:", error)
  Deno.exit(1)
}
