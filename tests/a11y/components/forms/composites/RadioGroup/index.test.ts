import runFullAccessibilityAudit from "~tests/a11y/runFullAccessibilityAudit/index.ts"
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { chromium } from "playwright"

Deno.test("RadioGroup accessibility", async (t) => {
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
  <title>RadioGroup Accessibility Test</title>
</head>
<body>
  <main>
    <h1>RadioGroup Accessibility Test</h1>
    <form>
      <fieldset class="group radio-group" id="color-group">
        <legend id="color-group-legend">Choose your preferred color</legend>
        <div class="help" id="color-group-help" aria-live="polite">Select one option.</div>
        <label class="radio">
          <div class="label-text">Red</div>
          <input type="radio" name="color" value="red" aria-describedby="color-group-help" />
        </label>
        <label class="radio">
          <div class="label-text">Blue</div>
          <input type="radio" name="color" value="blue" aria-describedby="color-group-help" />
        </label>
        <label class="radio">
          <div class="label-text">Green</div>
          <input type="radio" name="color" value="green" aria-describedby="color-group-help" />
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

  await t.step("should associate radio buttons with legend and help text", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RadioGroup Association Test</title>
</head>
<body>
  <main>
    <h1>RadioGroup Association Test</h1>
    <form>
      <fieldset class="group radio-group">
        <legend>Size options</legend>
        <div class="help" id="size-help" aria-live="polite">Choose your preferred size.</div>
        <label class="radio">
          <div class="label-text">Small</div>
          <input type="radio" name="size" value="small" aria-describedby="size-help" />
        </label>
        <label class="radio">
          <div class="label-text">Medium</div>
          <input type="radio" name="size" value="medium" aria-describedby="size-help" />
        </label>
        <label class="radio">
          <div class="label-text">Large</div>
          <input type="radio" name="size" value="large" aria-describedby="size-help" />
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

    const smallRadioDescribedBy = await page.locator('input[value="small"]').getAttribute("aria-describedby")
    const mediumRadioDescribedBy = await page.locator('input[value="medium"]').getAttribute("aria-describedby")
    const largeRadioDescribedBy = await page.locator('input[value="large"]').getAttribute("aria-describedby")

    assertEquals(smallRadioDescribedBy, "size-help")
    assertEquals(mediumRadioDescribedBy, "size-help")
    assertEquals(largeRadioDescribedBy, "size-help")
  })

  await t.step("should support required radio groups properly", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RadioGroup Required Test</title>
</head>
<body>
  <main>
    <h1>RadioGroup Required Test</h1>
    <form>
      <fieldset class="group radio-group">
        <legend>Payment method (required)</legend>
        <div class="help" id="payment-help" aria-live="polite">Please select a payment method to continue.</div>
        <label class="radio">
          <div class="label-text">Credit Card</div>
          <input type="radio" name="payment" value="credit" required aria-describedby="payment-help" />
        </label>
        <label class="radio">
          <div class="label-text">PayPal</div>
          <input type="radio" name="payment" value="paypal" required aria-describedby="payment-help" />
        </label>
        <label class="radio">
          <div class="label-text">Bank Transfer</div>
          <input type="radio" name="payment" value="bank" required aria-describedby="payment-help" />
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

  await t.step("should display helpful message for empty radio groups", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RadioGroup Empty Test</title>
</head>
<body>
  <main>
    <h1>RadioGroup Empty Test</h1>
    <form>
      <fieldset class="group radio-group">
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
