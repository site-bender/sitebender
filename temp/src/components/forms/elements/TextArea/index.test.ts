import { chromium } from "playwright"

import runFullAccessibilityAudit from "../../runFullAccessibilityAudit/index.ts"

console.log("🧪 Accessibility Test: TextArea")

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
  <title>TextArea Accessibility Test</title>
</head>
<body>
  <main>
    <h1>TextArea Accessibility Test</h1>
    <form>
      <label for="bio">Bio</label>
      <textarea class="textarea" id="bio" name="bio" rows="4" cols="40"></textarea>
      <label for="comments">Comments</label>
      <textarea class="textarea" id="comments" name="comments" required aria-describedby="comments-help"></textarea>
      <p id="comments-help" class="help" aria-live="polite">Please enter your comments.</p>
    </form>
  </main>
</body>
</html>
  `

  await page.setContent(testHtml)
  console.log("✓ Test page created with TextArea components")

  const auditResults = await runFullAccessibilityAudit()(page)

  if (auditResults.axe.violations.length === 0) {
    console.log("✓ No accessibility violations found for TextArea")
  } else {
    console.error("❌ Accessibility violations found:", auditResults.axe.violations)
    Deno.exit(1)
  }

  await browser.close()
  console.log("✓ TextArea accessibility test completed successfully!")

} catch (error) {
  console.error("❌ TextArea accessibility test failed:", error)
  Deno.exit(1)
}
