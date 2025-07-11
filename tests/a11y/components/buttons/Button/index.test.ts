import checkAccessibilityName from "~tests/a11y/checkAccessibilityName/index.ts"
import runFullAccessibilityAudit from "~tests/a11y/runFullAccessibilityAudit/index.ts"
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { chromium } from "playwright"

Deno.test("Button accessibility", async (t) => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    locale: "en-US",
  })
  const page = await context.newPage()

  await t.step("should have no axe violations with default button", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Button Accessibility Test</title>
</head>
<body>
  <main>
    <h1>Button Accessibility Test</h1>
    <button class="button" type="button">Click me</button>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)
    const auditResults = await runFullAccessibilityAudit()(page)

    assertEquals(auditResults.axe.violations.length, 0,
      `Found accessibility violations: ${auditResults.axe.violations.map(v => v.id).join(", ")}`)
  })

  await t.step("should have proper accessibility name from text content", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Button Name Test</title>
</head>
<body>
  <main>
    <h1>Button Name Test</h1>
    <button class="button" type="button" id="text-button">Save Document</button>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)
    const buttonLocator = page.locator("#text-button")
    const accessibilityName = await checkAccessibilityName(buttonLocator)

    assertEquals(accessibilityName.value, "Save Document")
    assertEquals(accessibilityName.source, "computed")
  })

  await t.step("should have proper accessibility name from aria-label", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Button Aria Label Test</title>
</head>
<body>
  <main>
    <h1>Button Aria Label Test</h1>
    <button class="button" type="button" id="aria-button" aria-label="Close dialog">×</button>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)
    const buttonLocator = page.locator("#aria-button")
    const accessibilityName = await checkAccessibilityName(buttonLocator)

    assertEquals(accessibilityName.value, "Close dialog")
    assertEquals(accessibilityName.source, "computed")
  })

  await t.step("should maintain minimum touch target size", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Button Touch Target Test</title>
  <style>
    :root {
      --button-min-height: 44px;
      --button-min-width: 44px;
    }
    button {
      min-height: var(--button-min-height);
      min-width: var(--button-min-width);
      padding: 0.5rem 1rem;
      border: 1px solid #ccc;
      background: #f5f5f5;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <main>
    <h1>Button Touch Target Test</h1>
    <button class="button" type="button" id="touch-target">×</button>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)
    const buttonLocator = page.locator("#touch-target")
    const boundingBox = await buttonLocator.boundingBox()

    assertEquals(boundingBox !== null, true, "Button should be visible")
    assertEquals(boundingBox!.width >= 44, true, `Button width ${boundingBox!.width}px should be at least 44px`)
    assertEquals(boundingBox!.height >= 44, true, `Button height ${boundingBox!.height}px should be at least 44px`)
  })

  await t.step("should support different button types", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Button Types Test</title>
</head>
<body>
  <main>
    <h1>Button Types Test</h1>
    <form>
      <button class="button" type="button" id="button-type">Action</button>
      <button class="button" type="submit" id="submit-type">Submit Form</button>
      <button class="button" type="reset" id="reset-type">Reset Form</button>
    </form>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)
    const auditResults = await runFullAccessibilityAudit()(page)

    assertEquals(auditResults.axe.violations.length, 0,
      `Found accessibility violations: ${auditResults.axe.violations.map(v => v.id).join(", ")}`)

    const buttonTypeAttr = await page.locator("#button-type").getAttribute("type")
    const submitTypeAttr = await page.locator("#submit-type").getAttribute("type")
    const resetTypeAttr = await page.locator("#reset-type").getAttribute("type")

    assertEquals(buttonTypeAttr, "button")
    assertEquals(submitTypeAttr, "submit")
    assertEquals(resetTypeAttr, "reset")
  })

  await t.step("should be keyboard accessible", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Button Keyboard Test</title>
  <style>
    button:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }
  </style>
</head>
<body>
  <main>
    <h1>Button Keyboard Test</h1>
    <button class="button" type="button" id="keyboard-button">Keyboard Accessible</button>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)
    const buttonLocator = page.locator("#keyboard-button")

    await page.keyboard.press("Tab")
    const isFocused = await buttonLocator.evaluate(el => document.activeElement === el)
    assertEquals(isFocused, true, "Button should be focusable with Tab key")

    const auditResults = await runFullAccessibilityAudit()(page)
    assertEquals(auditResults.axe.violations.length, 0,
      `Found accessibility violations: ${auditResults.axe.violations.map(v => v.id).join(", ")}`)
  })

  await browser.close()
})
