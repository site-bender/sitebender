import runFullAccessibilityAudit from "~tests/a11y/runFullAccessibilityAudit/index.ts"
import { assertEquals } from "jsr:@std/assert"
import { chromium } from "playwright"

Deno.test("Select accessibility audit", async () => {
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

  const auditResults = await runFullAccessibilityAudit()(page)

  assertEquals(
    auditResults.axe.violations.length,
    0,
    `Accessibility violations found: ${auditResults.axe.violations.map((v: any) => v.id).join(", ")}`,
  )

  const selectElement = page.locator("#color")

  assertEquals(await selectElement.inputValue(), "green", "Select should have 'green' as the selected value")

  const options = await selectElement.locator("option").all()
  assertEquals(options.length, 4, "Select should have 4 options")

  const optionValues = await Promise.all(options.map((option) => option.getAttribute("value")))
  assertEquals(optionValues, ["", "red", "green", "blue"], "Options should have correct values")

  await selectElement.selectOption("blue")
  assertEquals(await selectElement.inputValue(), "blue", "Select should update to 'blue' when selected")

  await selectElement.focus()
  const isFocused = await selectElement.evaluate((el) => document.activeElement === el)
  assertEquals(isFocused, true, "Select should be focusable")

  await browser.close()
})
