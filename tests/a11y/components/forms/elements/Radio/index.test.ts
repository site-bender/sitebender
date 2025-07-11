import runFullAccessibilityAudit from "~tests/a11y/runFullAccessibilityAudit/index.ts"
import { assertEquals } from "jsr:@std/assert"
import { chromium } from "playwright"

Deno.test("Radio accessibility audit", async () => {
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
        <label class="radio" for="radio-red">
          <span class="label-text">Red</span>
          <input type="radio" id="radio-red" name="color" value="red" />
        </label>
        <label class="radio" for="radio-green">
          <span class="label-text">Green</span>
          <input type="radio" id="radio-green" name="color" value="green" checked />
        </label>
        <label class="radio" for="radio-blue">
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

  const auditResults = await runFullAccessibilityAudit()(page)

  assertEquals(
    auditResults.axe.violations.length,
    0,
    `Accessibility violations found: ${auditResults.axe.violations.map((v: any) => v.id).join(", ")}`,
  )

  const radioRed = page.locator("#radio-red")
  const radioGreen = page.locator("#radio-green")
  const radioBlue = page.locator("#radio-blue")

  assertEquals(await radioRed.getAttribute("type"), "radio", "Red radio should have type='radio'")
  assertEquals(await radioGreen.getAttribute("type"), "radio", "Green radio should have type='radio'")
  assertEquals(await radioBlue.getAttribute("type"), "radio", "Blue radio should have type='radio'")

  assertEquals(await radioRed.getAttribute("name"), "color", "All radios should have same name")
  assertEquals(await radioGreen.getAttribute("name"), "color", "All radios should have same name")
  assertEquals(await radioBlue.getAttribute("name"), "color", "All radios should have same name")

  assertEquals(await radioRed.isChecked(), false, "Red radio should be unchecked by default")
  assertEquals(await radioGreen.isChecked(), true, "Green radio should be checked by default")
  assertEquals(await radioBlue.isChecked(), false, "Blue radio should be unchecked by default")

  await radioRed.click()
  assertEquals(await radioRed.isChecked(), true, "Red radio should be checked after click")
  assertEquals(await radioGreen.isChecked(), false, "Green radio should be unchecked after red is selected")
  assertEquals(await radioBlue.isChecked(), false, "Blue radio should remain unchecked")

  await radioBlue.press("Space")
  assertEquals(await radioBlue.isChecked(), true, "Blue radio should be checked after space key")
  assertEquals(await radioRed.isChecked(), false, "Red radio should be unchecked after blue is selected")

  await browser.close()
})
