import runFullAccessibilityAudit from "~tests/a11y/runFullAccessibilityAudit/index.ts"
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { chromium } from "playwright"

Deno.test("Help accessibility", async (t) => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    locale: "en-US",
  })
  const page = await context.newPage()

  await t.step("should have no axe violations with help text", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Help Accessibility Test</title>
</head>
<body>
  <main>
    <h1>Help Accessibility Test</h1>
    <form>
      <p class="help" aria-live="polite">This field is required.</p>
      <p class="help" aria-live="polite">Please enter a valid email address.</p>
      <p class="help" aria-live="polite">Password must be at least 8 characters.</p>
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

  await t.step("should have proper aria-live attribute", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Help Aria Live Test</title>
</head>
<body>
  <main>
    <h1>Help Aria Live Test</h1>
    <form>
      <label for="test-input">Email</label>
      <input id="test-input" type="email" aria-describedby="email-help" />
      <p id="email-help" class="help" aria-live="polite">Enter a valid email address.</p>
    </form>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)
    const helpAriaLive = await page.locator("#email-help").getAttribute("aria-live")

    assertEquals(helpAriaLive, "polite", "Help text should have aria-live='polite'")
  })

  await t.step("should work for guidance and error states", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Help States Test</title>
</head>
<body>
  <main>
    <h1>Help States Test</h1>
    <form>
      <label for="guidance-input">Username</label>
      <input id="guidance-input" type="text" aria-describedby="guidance-help" />
      <p id="guidance-help" class="help" aria-live="polite">Choose a unique username with 3-20 characters.</p>

      <label for="error-input">Password</label>
      <input id="error-input" type="password" aria-describedby="error-help" />
      <p id="error-help" class="help" aria-live="polite">Password is too short. Please use at least 8 characters.</p>
    </form>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)
    const auditResults = await runFullAccessibilityAudit()(page)

    assertEquals(auditResults.axe.violations.length, 0,
      `Found accessibility violations: ${auditResults.axe.violations.map((v: any) => v.id).join(", ")}`)

    const guidanceVisible = await page.locator("#guidance-help").isVisible()
    const errorVisible = await page.locator("#error-help").isVisible()

    assertEquals(guidanceVisible, true, "Guidance help should be visible")
    assertEquals(errorVisible, true, "Error help should be visible")
  })

  await t.step("should provide helpful non-blame error messages", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Help Non-Blame Test</title>
</head>
<body>
  <main>
    <h1>Help Non-Blame Test</h1>
    <form>
      <label for="email-field">Email Address</label>
      <input id="email-field" type="email" aria-describedby="email-guidance" />
      <p id="email-guidance" class="help" aria-live="polite">Please enter a valid email address (e.g., user@example.com).</p>

      <label for="phone-field">Phone Number</label>
      <input id="phone-field" type="tel" aria-describedby="phone-guidance" />
      <p id="phone-guidance" class="help" aria-live="polite">Please enter your phone number with area code (e.g., 020 1234 5678).</p>
    </form>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)

    const emailHelpText = await page.locator("#email-guidance").textContent()
    const phoneHelpText = await page.locator("#phone-guidance").textContent()

    assertEquals(emailHelpText?.includes("Please"), true, "Help text should provide guidance, not blame")
    assertEquals(phoneHelpText?.includes("Please"), true, "Help text should provide guidance, not blame")
    assertEquals(emailHelpText?.includes("error") || emailHelpText?.includes("invalid"), false, "Should avoid blame language")
  })

  await browser.close()
})
