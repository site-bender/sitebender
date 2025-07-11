import checkAccessibilityName from "~tests/a11y/checkAccessibilityName/index.ts"
import runFullAccessibilityAudit from "~tests/a11y/runFullAccessibilityAudit/index.ts"
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { chromium } from "playwright"

Deno.test("ButtonBar accessibility", async (t) => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    locale: "en-US",
  })
  const page = await context.newPage()

  await t.step("should have no axe violations with button groups", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ButtonBar Accessibility Test</title>
</head>
<body>
  <main>
    <h1>ButtonBar Accessibility Test</h1>
    <header class="button-bar">
      <button type="button">Save</button>
      <button type="button">Cancel</button>
      <button type="button" aria-label="Delete item">🗑️</button>
    </header>
    <footer class="button-bar">
      <button type="button">Previous</button>
      <button type="button">Next</button>
    </footer>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)
    const auditResults = await runFullAccessibilityAudit()(page)

    assertEquals(auditResults.axe.violations.length, 0,
      `Found accessibility violations: ${auditResults.axe.violations.map((v: any) => v.id).join(", ")}`)
  })

  await t.step("should provide proper accessibility names for all buttons", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ButtonBar Names Test</title>
</head>
<body>
  <main>
    <h1>ButtonBar Names Test</h1>
    <div class="button-bar">
      <button type="button" id="save-btn">Save</button>
      <button type="button" id="cancel-btn">Cancel</button>
      <button type="button" id="delete-btn" aria-label="Delete item">🗑️</button>
    </div>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)

    const saveButtonName = await checkAccessibilityName(page.locator("#save-btn"))
    const cancelButtonName = await checkAccessibilityName(page.locator("#cancel-btn"))
    const deleteButtonName = await checkAccessibilityName(page.locator("#delete-btn"))

    assertEquals(saveButtonName.value, "Save")
    assertEquals(cancelButtonName.value, "Cancel")
    assertEquals(deleteButtonName.value, "Delete item")
  })

  await t.step("should be keyboard navigable within button group", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ButtonBar Keyboard Test</title>
  <style>
    button:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }
  </style>
</head>
<body>
  <main>
    <h1>ButtonBar Keyboard Test</h1>
    <div class="button-bar">
      <button type="button" id="first-btn">First</button>
      <button type="button" id="second-btn">Second</button>
      <button type="button" id="third-btn">Third</button>
    </div>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)

    await page.keyboard.press("Tab")
    const firstFocused = await page.locator("#first-btn").evaluate(el => document.activeElement === el)
    assertEquals(firstFocused, true, "First button should be focused after Tab")

    await page.keyboard.press("Tab")
    const secondFocused = await page.locator("#second-btn").evaluate(el => document.activeElement === el)
    assertEquals(secondFocused, true, "Second button should be focused after second Tab")

    await page.keyboard.press("Tab")
    const thirdFocused = await page.locator("#third-btn").evaluate(el => document.activeElement === el)
    assertEquals(thirdFocused, true, "Third button should be focused after third Tab")
  })

  await t.step("should support semantic button bar containers", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ButtonBar Semantic Test</title>
</head>
<body>
  <main>
    <h1>ButtonBar Semantic Test</h1>
    <nav class="button-bar" aria-label="Document actions">
      <button type="button">Edit</button>
      <button type="button">Share</button>
      <button type="button">Delete</button>
    </nav>
    <section class="button-bar" role="group" aria-labelledby="form-actions">
      <h2 id="form-actions">Form Actions</h2>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </section>
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
