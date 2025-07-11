import checkAccessibilityName from "~tests/a11y/checkAccessibilityName/index.ts"
import runFullAccessibilityAudit from "~tests/a11y/runFullAccessibilityAudit/index.ts"
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { chromium } from "playwright"

Deno.test("Label accessibility", async (t) => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    locale: "en-US",
  })
  const page = await context.newPage()

  await t.step("should have no axe violations with proper labels", async () => {
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
    const auditResults = await runFullAccessibilityAudit()(page)

    assertEquals(auditResults.axe.violations.length, 0,
      `Found accessibility violations: ${auditResults.axe.violations.map((v: any) => v.id).join(", ")}`)
  })

  await t.step("should properly associate labels with inputs", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Label Association Test</title>
</head>
<body>
  <main>
    <h1>Label Association Test</h1>
    <form>
      <label class="label" for="test-input">Test Field</label>
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

    const labelFor = await page.locator("label").getAttribute("for")
    const inputId = await page.locator("#test-input").getAttribute("id")
    assertEquals(labelFor, inputId, "Label for attribute should match input id")
  })

  await t.step("should support aria-labelledby association", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aria Labelledby Test</title>
</head>
<body>
  <main>
    <h1>Aria Labelledby Test</h1>
    <form>
      <div class="label" id="external-label">External Label</div>
      <input class="input" id="labelledby-input" aria-labelledby="external-label" type="text" />
    </form>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)
    const inputLocator = page.locator("#labelledby-input")
    const accessibilityName = await checkAccessibilityName(inputLocator)

    assertEquals(accessibilityName.value, "External Label")
    assertEquals(accessibilityName.source, "computed")

    const ariaLabelledBy = await page.locator("#labelledby-input").getAttribute("aria-labelledby")
    assertEquals(ariaLabelledBy, "external-label")
  })

  await t.step("should support wrapping label pattern", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wrapping Label Test</title>
</head>
<body>
  <main>
    <h1>Wrapping Label Test</h1>
    <form>
      <label class="label">
        Full Name
        <input class="input" id="wrapped-input" name="fullName" type="text" />
      </label>
      <label class="label">
        Subscribe to newsletter
        <input class="input" id="checkbox-wrapped" name="subscribe" type="checkbox" />
      </label>
    </form>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)
    const auditResults = await runFullAccessibilityAudit()(page)

    assertEquals(auditResults.axe.violations.length, 0,
      `Found accessibility violations: ${auditResults.axe.violations.map((v: any) => v.id).join(", ")}`)

    const textInputName = await checkAccessibilityName(page.locator("#wrapped-input"))
    const checkboxName = await checkAccessibilityName(page.locator("#checkbox-wrapped"))

    assertEquals(textInputName.value.trim(), "Full Name")
    assertEquals(checkboxName.value.trim(), "Subscribe to newsletter")
  })

  await browser.close()
})
