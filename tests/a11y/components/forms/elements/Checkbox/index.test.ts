import runFullAccessibilityAudit from "~tests/a11y/runFullAccessibilityAudit/index.ts"
import { assertEquals } from "jsr:@std/assert"
import { chromium } from "playwright"

Deno.test("Checkbox accessibility audit", async () => {
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
      <label class="checkbox" for="test-checkbox">
        <div class="label-text">Accept terms and conditions</div>
        <input type="checkbox" id="test-checkbox" name="terms" value="yes" />
      </label>
      <label class="checkbox" for="test-checkbox-2">
        <div class="label-text">Subscribe to newsletter</div>
        <input type="checkbox" id="test-checkbox-2" name="newsletter" value="yes" checked />
      </label>
    </form>
  </main>
</body>
</html>
  `

  await page.setContent(testHtml)

  const auditResults = await runFullAccessibilityAudit()(page)

  assertEquals(
    auditResults.axe.violations.length,
    0,
    `Accessibility violations found: ${auditResults.axe.violations.map((v: any) => v.id).join(", ")}`,
  )

  const checkbox1 = page.locator("#test-checkbox")
  const checkbox2 = page.locator("#test-checkbox-2")

  assertEquals(await checkbox1.getAttribute("type"), "checkbox", "First checkbox should have type='checkbox'")
  assertEquals(await checkbox2.getAttribute("type"), "checkbox", "Second checkbox should have type='checkbox'")
  assertEquals(await checkbox1.isChecked(), false, "First checkbox should be unchecked by default")
  assertEquals(await checkbox2.isChecked(), true, "Second checkbox should be checked")

  await checkbox1.click()
  assertEquals(await checkbox1.isChecked(), true, "First checkbox should be checked after click")

  await checkbox1.press("Space")
  assertEquals(await checkbox1.isChecked(), false, "First checkbox should be unchecked after space key")

  await browser.close()
})
