import checkAccessibilityName from "~tests/a11y/checkAccessibilityName/index.ts"
import runFullAccessibilityAudit from "~tests/a11y/runFullAccessibilityAudit/index.ts"
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { chromium } from "playwright"

Deno.test("LabelWrapper accessibility", async (t) => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    locale: "en-US",
  })
  const page = await context.newPage()

  await t.step("should have no axe violations with basic label wrapper", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LabelWrapper Accessibility Test</title>
</head>
<body>
  <main>
    <h1>LabelWrapper Accessibility Test</h1>
    <form>
      <label class="wrapper" id="email-wrapper">
        <div class="label" id="email-label">Email Address</div>
        <input class="input" id="email-input" name="email" type="email" aria-labelledby="email-label" />
      </label>

      <label class="wrapper" id="name-wrapper">
        <div class="label" id="name-label">Full Name</div>
        <input class="input" id="name-input" name="name" type="text" aria-labelledby="name-label" />
        <div class="help" id="name-help" aria-live="polite">Enter your first and last name.</div>
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
  })

  await t.step("should properly associate labels with form controls", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LabelWrapper Association Test</title>
</head>
<body>
  <main>
    <h1>LabelWrapper Association Test</h1>
    <form>
      <label class="wrapper" id="username-wrapper">
        <div class="label" id="username-label">Username</div>
        <input class="input" id="username-input" name="username" type="text" aria-labelledby="username-label" />
      </label>
    </form>
  </main>
</body>
</html>
    `

    await page.setContent(testHtml)

    const inputLocator = page.locator("#username-input")
    const accessibilityName = await checkAccessibilityName(inputLocator)

    assertEquals(accessibilityName.value, "Username")
    assertEquals(accessibilityName.source, "computed")

    const inputAriaLabelledBy = await inputLocator.getAttribute("aria-labelledby")
    assertEquals(inputAriaLabelledBy, "username-label")
  })

  await t.step("should support help text with aria-describedby", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LabelWrapper Help Text Test</title>
</head>
<body>
  <main>
    <h1>LabelWrapper Help Text Test</h1>
    <form>
      <label class="wrapper" id="password-wrapper">
        <div class="label" id="password-label">Password</div>
        <input class="input" id="password-input" name="password" type="password"
               aria-labelledby="password-label" aria-describedby="password-help" />
        <div class="help" id="password-help" aria-live="polite">Must be at least 8 characters long.</div>
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

    const inputAriaDescribedBy = await page.locator("#password-input").getAttribute("aria-describedby")
    const helpTextId = await page.locator("#password-help").getAttribute("id")
    const helpAriaLive = await page.locator("#password-help").getAttribute("aria-live")

    assertEquals(inputAriaDescribedBy, helpTextId)
    assertEquals(helpAriaLive, "polite")
  })

  await t.step("should work with different form control types", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LabelWrapper Control Types Test</title>
</head>
<body>
  <main>
    <h1>LabelWrapper Control Types Test</h1>
    <form>
      <label class="wrapper" id="bio-wrapper">
        <div class="label" id="bio-label">Biography</div>
        <textarea class="textarea" id="bio-textarea" name="bio"
                  aria-labelledby="bio-label" aria-describedby="bio-help"></textarea>
        <div class="help" id="bio-help" aria-live="polite">Tell us about yourself (optional).</div>
      </label>

      <label class="wrapper" id="country-wrapper">
        <div class="label" id="country-label">Country</div>
        <select class="select" id="country-select" name="country" aria-labelledby="country-label">
          <option value="">Select a country</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
        </select>
      </label>

      <label class="wrapper checkbox" id="terms-wrapper">
        <div class="label" id="terms-label">I accept the terms and conditions</div>
        <input type="checkbox" id="terms-checkbox" name="terms" value="yes"
               aria-labelledby="terms-label" />
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

    const textareaName = await checkAccessibilityName(page.locator("#bio-textarea"))
    const selectName = await checkAccessibilityName(page.locator("#country-select"))
    const checkboxName = await checkAccessibilityName(page.locator("#terms-checkbox"))

    assertEquals(textareaName.value, "Biography")
    assertEquals(selectName.value, "Country")
    assertEquals(checkboxName.value, "I accept the terms and conditions")
  })

  await t.step("should support required form controls", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LabelWrapper Required Test</title>
</head>
<body>
  <main>
    <h1>LabelWrapper Required Test</h1>
    <form>
      <label class="wrapper" id="required-wrapper">
        <div class="label" id="required-label">Required Field</div>
        <input class="input" id="required-input" name="required" type="text"
               required aria-labelledby="required-label" aria-describedby="required-help" />
        <div class="help" id="required-help" aria-live="polite">This field is required.</div>
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

    const isRequired = await page.locator("#required-input").getAttribute("required")
    assertEquals(isRequired !== null, true, "Required attribute should be present")
  })

  await browser.close()
})
