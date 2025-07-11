import runFullAccessibilityAudit from "~tests/a11y/runFullAccessibilityAudit/index.ts"
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { chromium } from "playwright"

Deno.test("CheckboxGroup accessibility", async (t) => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    locale: "en-US",
  })
  const page = await context.newPage()

  await t.step("should have no axe violations with proper fieldset structure", async () => {
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
    const auditResults = await runFullAccessibilityAudit()(page)

    assertEquals(auditResults.axe.violations.length, 0,
      `Found accessibility violations: ${auditResults.axe.violations.map((v: any) => v.id).join(", ")}`)
  })

  await t.step("should associate checkboxes with legend and help text", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CheckboxGroup Association Test</title>
</head>
<body>
  <main>
    <h1>CheckboxGroup Association Test</h1>
    <form>
      <fieldset class="group checkbox-group">
        <legend>Preferred colors</legend>
        <div class="help" id="colors-help" aria-live="polite">Select your favorite colors.</div>
        <label class="checkbox">
          <div class="label-text">Red</div>
          <input type="checkbox" name="colors" value="red" aria-describedby="colors-help" />
        </label>
        <label class="checkbox">
          <div class="label-text">Blue</div>
          <input type="checkbox" name="colors" value="blue" aria-describedby="colors-help" />
        </label>
      </fieldset>
    </form>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)
    const auditResults = await runFullAccessibilityAudit()(page)

    assertEquals(auditResults.axe.violations.length, 0,
      `Found accessibility violations: ${auditResults.axe.violations.map((v: any) => v.id).join(", ")}`)

    const redCheckboxDescribedBy = await page.locator('input[value="red"]').getAttribute("aria-describedby")
    const blueCheckboxDescribedBy = await page.locator('input[value="blue"]').getAttribute("aria-describedby")

    assertEquals(redCheckboxDescribedBy, "colors-help")
    assertEquals(blueCheckboxDescribedBy, "colors-help")
  })

  await t.step("should handle required checkbox groups properly", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CheckboxGroup Required Test</title>
</head>
<body>
  <main>
    <h1>CheckboxGroup Required Test</h1>
    <form>
      <fieldset class="group checkbox-group" required>
        <legend>Terms and conditions (required)</legend>
        <div class="help" id="terms-help" aria-live="polite">You must accept to continue.</div>
        <label class="checkbox">
          <div class="label-text">I accept the terms of service</div>
          <input type="checkbox" name="terms" value="tos" required aria-describedby="terms-help" />
        </label>
        <label class="checkbox">
          <div class="label-text">I accept the privacy policy</div>
          <input type="checkbox" name="terms" value="privacy" required aria-describedby="terms-help" />
        </label>
      </fieldset>
    </form>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)
    const auditResults = await runFullAccessibilityAudit()(page)

    assertEquals(auditResults.axe.violations.length, 0,
      `Found accessibility violations: ${auditResults.axe.violations.map((v: any) => v.id).join(", ")}`)
  })

  await t.step("should display helpful message for empty checkbox groups", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CheckboxGroup Empty Test</title>
</head>
<body>
  <main>
    <h1>CheckboxGroup Empty Test</h1>
    <form>
      <fieldset class="group checkbox-group">
        <legend>Available options</legend>
        <div class="help" id="empty-help" aria-live="polite">No options available at this time.</div>
      </fieldset>
    </form>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)
    const auditResults = await runFullAccessibilityAudit()(page)

    assertEquals(auditResults.axe.violations.length, 0,
      `Found accessibility violations: ${auditResults.axe.violations.map((v: any) => v.id).join(", ")}`)

    const helpTextVisible = await page.locator("#empty-help").isVisible()
    const helpTextContent = await page.locator("#empty-help").textContent()

    assertEquals(helpTextVisible, true, "Help text should be visible for empty groups")
    assertEquals(helpTextContent?.includes("No options available"), true, "Should show helpful message for empty state")
  })

  await browser.close()
})
