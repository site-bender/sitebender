import runFullAccessibilityAudit from "~tests/a11y/runFullAccessibilityAudit/index.ts"
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { chromium } from "playwright"

Deno.test("FieldSet accessibility", async (t) => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    locale: "en-US",
  })
  const page = await context.newPage()

  await t.step("should have no axe violations with basic fieldset", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FieldSet Accessibility Test</title>
</head>
<body>
  <main>
    <h1>FieldSet Accessibility Test</h1>
    <form>
      <fieldset class="fieldset" id="basic-fieldset" role="group">
        <legend id="basic-fieldset-legend">Personal Information</legend>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" />
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

  await t.step("should properly associate legend with fieldset", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FieldSet Legend Association Test</title>
</head>
<body>
  <main>
    <h1>FieldSet Legend Association Test</h1>
    <form>
      <fieldset class="fieldset" id="contact-info" role="group">
        <legend id="contact-info-legend">Contact Information</legend>
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" />
        <label for="address">Address:</label>
        <input type="text" id="address" name="address" />
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

    const fieldsetId = await page.locator("fieldset").getAttribute("id")
    const legendId = await page.locator("legend").getAttribute("id")
    const legendText = await page.locator("legend").textContent()

    assertEquals(fieldsetId, "contact-info")
    assertEquals(legendId, "contact-info-legend")
    assertEquals(legendText, "Contact Information")
  })

  await t.step("should support role='group' for enhanced screen reader context", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FieldSet Role Group Test</title>
</head>
<body>
  <main>
    <h1>FieldSet Role Group Test</h1>
    <form>
      <fieldset class="fieldset" id="preferences" role="group">
        <legend id="preferences-legend">User Preferences</legend>
        <label>
          <input type="checkbox" name="notifications" value="email" />
          Email notifications
        </label>
        <label>
          <input type="checkbox" name="notifications" value="sms" />
          SMS notifications
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

    const fieldsetRole = await page.locator("fieldset").getAttribute("role")
    assertEquals(fieldsetRole, "group")
  })

  await t.step("should work with nested fieldsets", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FieldSet Nested Test</title>
</head>
<body>
  <main>
    <h1>FieldSet Nested Test</h1>
    <form>
      <fieldset class="fieldset" id="outer-fieldset" role="group">
        <legend id="outer-fieldset-legend">Account Settings</legend>
        <fieldset class="fieldset" id="inner-fieldset" role="group">
          <legend id="inner-fieldset-legend">Privacy Settings</legend>
          <label>
            <input type="radio" name="visibility" value="public" />
            Public profile
          </label>
          <label>
            <input type="radio" name="visibility" value="private" />
            Private profile
          </label>
        </fieldset>
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

    const outerFieldset = await page.locator("fieldset").first()
    const innerFieldset = await page.locator("fieldset").nth(1)

    const outerLegendText = await outerFieldset.locator("legend").first().textContent()
    const innerLegendText = await innerFieldset.locator("legend").textContent()

    assertEquals(outerLegendText, "Account Settings")
    assertEquals(innerLegendText, "Privacy Settings")
  })

  await t.step("should work without legend", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FieldSet No Legend Test</title>
</head>
<body>
  <main>
    <h1>FieldSet No Legend Test</h1>
    <form>
      <fieldset class="fieldset" id="no-legend-fieldset" role="group">
        <label for="search">Search:</label>
        <input type="search" id="search" name="search" />
        <button type="submit">Submit</button>
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

    const legends = await page.locator("legend").count()
    assertEquals(legends, 0, "Should work without legend")
  })

  await t.step("should support required fieldsets", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FieldSet Required Test</title>
</head>
<body>
  <main>
    <h1>FieldSet Required Test</h1>
    <form>
      <fieldset class="fieldset" id="required-fieldset" role="group" required>
        <legend id="required-fieldset-legend">Required Information</legend>
        <label for="required-name">Name (required):</label>
        <input type="text" id="required-name" name="required-name" required />
        <label for="required-email">Email (required):</label>
        <input type="email" id="required-email" name="required-email" required />
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

    const fieldsetRequired = await page.locator("fieldset").getAttribute("required")
    assertEquals(fieldsetRequired, "")
  })

  await browser.close()
})
