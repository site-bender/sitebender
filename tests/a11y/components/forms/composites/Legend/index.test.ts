import checkAccessibilityName from "~tests/a11y/checkAccessibilityName/index.ts"
import runFullAccessibilityAudit from "~tests/a11y/runFullAccessibilityAudit/index.ts"
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { chromium } from "playwright"

Deno.test("Legend accessibility", async (t) => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    locale: "en-US",
  })
  const page = await context.newPage()

  await t.step("should have no axe violations with basic legend", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Legend Accessibility Test</title>
</head>
<body>
  <main>
    <h1>Legend Accessibility Test</h1>
    <form>
      <fieldset>
        <legend class="legend" id="contact-legend">Contact Information</legend>
        <label for="phone">Phone Number</label>
        <input id="phone" name="phone" type="tel" />

        <label for="email">Email Address</label>
        <input id="email" name="email" type="email" />
      </fieldset>

      <fieldset>
        <legend class="legend" id="preferences-legend">Preferences</legend>
        <div class="help" id="preferences-help" aria-live="polite">Choose your notification preferences.</div>
        <label>
          <input type="checkbox" name="notifications" value="email" aria-describedby="preferences-help" />
          Email notifications
        </label>
        <label>
          <input type="checkbox" name="notifications" value="sms" aria-describedby="preferences-help" />
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
  })

  await t.step("should properly associate legend with fieldset controls", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Legend Association Test</title>
</head>
<body>
  <main>
    <h1>Legend Association Test</h1>
    <form>
      <fieldset>
        <legend class="legend" id="shipping-legend">Shipping Address</legend>
        <label for="street">Street Address</label>
        <input id="street" name="street" type="text" />

        <label for="city">City</label>
        <input id="city" name="city" type="text" />

        <label for="zip">Postal Code</label>
        <input id="zip" name="zip" type="text" />
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

    const streetInputName = await checkAccessibilityName(page.locator("#street"))
    const cityInputName = await checkAccessibilityName(page.locator("#city"))
    const zipInputName = await checkAccessibilityName(page.locator("#zip"))

    assertEquals(streetInputName.value, "Street Address", "Street input should have proper label")
    assertEquals(cityInputName.value, "City", "City input should have proper label")
    assertEquals(zipInputName.value, "Postal Code", "Zip input should have proper label")
  })

  await t.step("should support help text with legend", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Legend Help Text Test</title>
</head>
<body>
  <main>
    <h1>Legend Help Text Test</h1>
    <form>
      <fieldset>
        <legend class="legend" id="payment-legend">Payment Information</legend>
        <div class="help" id="payment-help" aria-live="polite">All payment information is encrypted and secure.</div>

        <label for="card-number">Card Number</label>
        <input id="card-number" name="cardNumber" type="text" aria-describedby="payment-help" />

        <label for="expiry">Expiry Date</label>
        <input id="expiry" name="expiry" type="text" aria-describedby="payment-help" />

        <label for="cvv">CVV</label>
        <input id="cvv" name="cvv" type="text" aria-describedby="payment-help" />
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

    const helpAriaLive = await page.locator("#payment-help").getAttribute("aria-live")
    const cardNumberDescribedBy = await page.locator("#card-number").getAttribute("aria-describedby")
    const expiryDescribedBy = await page.locator("#expiry").getAttribute("aria-describedby")
    const cvvDescribedBy = await page.locator("#cvv").getAttribute("aria-describedby")

    assertEquals(helpAriaLive, "polite")
    assertEquals(cardNumberDescribedBy, "payment-help")
    assertEquals(expiryDescribedBy, "payment-help")
    assertEquals(cvvDescribedBy, "payment-help")
  })

  await t.step("should work with radio button groups", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Legend Radio Groups Test</title>
</head>
<body>
  <main>
    <h1>Legend Radio Groups Test</h1>
    <form>
      <fieldset>
        <legend class="legend" id="delivery-legend">Delivery Method</legend>
        <div class="help" id="delivery-help" aria-live="polite">Choose how you would like to receive your order.</div>

        <label>
          <input type="radio" name="delivery" value="standard" aria-describedby="delivery-help" />
          Standard Delivery (5-7 days)
        </label>

        <label>
          <input type="radio" name="delivery" value="express" aria-describedby="delivery-help" />
          Express Delivery (1-2 days)
        </label>

        <label>
          <input type="radio" name="delivery" value="pickup" aria-describedby="delivery-help" />
          Store Pickup
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

    const standardRadioDescribedBy = await page.locator('input[value="standard"]').getAttribute("aria-describedby")
    const expressRadioDescribedBy = await page.locator('input[value="express"]').getAttribute("aria-describedby")
    const pickupRadioDescribedBy = await page.locator('input[value="pickup"]').getAttribute("aria-describedby")

    assertEquals(standardRadioDescribedBy, "delivery-help")
    assertEquals(expressRadioDescribedBy, "delivery-help")
    assertEquals(pickupRadioDescribedBy, "delivery-help")
  })

  await t.step("should work with required fieldsets", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Legend Required Test</title>
</head>
<body>
  <main>
    <h1>Legend Required Test</h1>
    <form>
      <fieldset>
        <legend class="legend" id="agreement-legend">Terms and Conditions (Required)</legend>
        <div class="help" id="agreement-help" aria-live="polite">You must agree to the terms to continue.</div>

        <label>
          <input type="checkbox" name="terms" value="accept" required aria-describedby="agreement-help" />
          I agree to the Terms of Service
        </label>

        <label>
          <input type="checkbox" name="privacy" value="accept" required aria-describedby="agreement-help" />
          I agree to the Privacy Policy
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

    const termsRequired = await page.locator('input[name="terms"]').getAttribute("required")
    const privacyRequired = await page.locator('input[name="privacy"]').getAttribute("required")

    assertEquals(termsRequired !== null, true, "Terms checkbox should be required")
    assertEquals(privacyRequired !== null, true, "Privacy checkbox should be required")
  })

  await browser.close()
})
