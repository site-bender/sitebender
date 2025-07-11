import checkAccessibilityName from "~tests/a11y/checkAccessibilityName/index.ts"
import runFullAccessibilityAudit from "~tests/a11y/runFullAccessibilityAudit/index.ts"
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { chromium } from "playwright"

Deno.test("Input accessibility", async (t) => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    locale: "en-US",
  })
  const page = await context.newPage()

  await t.step("should have no axe violations with basic inputs", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Input Accessibility Test</title>
</head>
<body>
  <main>
    <h1>Input Accessibility Test</h1>
    <form>
      <label for="username">Username</label>
      <input class="input" id="username" name="username" type="text" />
      <label for="email">Email</label>
      <input class="input" id="email" name="email" type="email" required />
      <label for="password">Password</label>
      <input class="input" id="password" name="password" type="password" aria-describedby="password-help" />
      <p id="password-help" class="help" aria-live="polite">Password must be at least 8 characters.</p>
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

  await t.step("should have proper label association", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Input Label Test</title>
</head>
<body>
  <main>
    <h1>Input Label Test</h1>
    <form>
      <label for="test-input">Test Field</label>
      <input class="input" id="test-input" name="test" type="text" />
    </form>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)
    const inputLocator = page.locator("#test-input")
    const accessibilityName = await checkAccessibilityName(inputLocator)

    assertEquals(accessibilityName.value, "Test Field")
    assertEquals(accessibilityName.source, "computed")
  })

  await t.step("should support aria-describedby for help text", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Input Help Text Test</title>
</head>
<body>
  <main>
    <h1>Input Help Text Test</h1>
    <form>
      <label for="described-input">Email Address</label>
      <input class="input" id="described-input" name="email" type="email" aria-describedby="email-help" />
      <p id="email-help" class="help" aria-live="polite">Enter a valid email address (e.g., user@example.com)</p>
    </form>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)
    const auditResults = await runFullAccessibilityAudit()(page)

    assertEquals(auditResults.axe.violations.length, 0,
      `Found accessibility violations: ${auditResults.axe.violations.map((v: any) => v.id).join(", ")}`)

    const inputAriaDescribedBy = await page.locator("#described-input").getAttribute("aria-describedby")
    const helpTextId = await page.locator("#email-help").getAttribute("id")
    assertEquals(inputAriaDescribedBy, helpTextId)
  })

  await t.step("should support required attribute properly", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Input Required Test</title>
</head>
<body>
  <main>
    <h1>Input Required Test</h1>
    <form>
      <label for="required-input">Required Field</label>
      <input class="input" id="required-input" name="required" type="text" required />
    </form>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)
    const auditResults = await runFullAccessibilityAudit()(page)

    assertEquals(auditResults.axe.violations.length, 0,
      `Found accessibility violations: ${auditResults.axe.violations.map((v: any) => v.id).join(", ")}`)

    const isRequired = await page.locator("#required-input").getAttribute("required")
    assertEquals(isRequired !== null, true, "Required attribute should be present")
  })

  await t.step("should support different input types", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Input Types Test</title>
</head>
<body>
  <main>
    <h1>Input Types Test</h1>
    <form>
      <label for="text-input">Text</label>
      <input class="input" id="text-input" name="text" type="text" />

      <label for="email-input">Email</label>
      <input class="input" id="email-input" name="email" type="email" />

      <label for="password-input">Password</label>
      <input class="input" id="password-input" name="password" type="password" />

      <label for="number-input">Number</label>
      <input class="input" id="number-input" name="number" type="number" />

      <label for="tel-input">Phone</label>
      <input class="input" id="tel-input" name="phone" type="tel" />

      <label for="url-input">Website</label>
      <input class="input" id="url-input" name="website" type="url" />
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

  await browser.close()
})
