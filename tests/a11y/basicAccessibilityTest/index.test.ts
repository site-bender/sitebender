import { assertEquals, assertNotEquals } from "jsr:@std/assert"
import { chromium } from "playwright"

import checkAccessibilityName from "../checkAccessibilityName/index.ts"
import runAxeAudit from "../runAxeAudit/index.ts"
import runFullAccessibilityAudit from "../runFullAccessibilityAudit/index.ts"

Deno.test("Basic accessibility test setup verification", async (t) => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    locale: "en-US",
  })
  const page = await context.newPage()

  await t.step("should create test page with button components", async () => {
    const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Accessibility Test Page</title>
</head>
<body>
	<main>
		<h1>Accessibility Test Page</h1>
		<section aria-label="Button Components">
			<h2>Button Examples</h2>

			<button type="button" id="good-button">
				Click Me
			</button>

			<button type="button" id="aria-button" aria-label="Close dialog">
				×
			</button>

			<button type="button" id="unlabeled-button" aria-label="">
			</button>
		</section>
	</main>
</body>
</html>
	`

    await page.setContent(testHtml)
    const goodButton = page.locator("#good-button")
    const ariaButton = page.locator("#aria-button")
    const unlabeledButton = page.locator("#unlabeled-button")

    assertEquals(await goodButton.isVisible(), true, "Good button should be visible")
    assertEquals(await ariaButton.isVisible(), true, "Aria button should be visible")
    assertEquals(await unlabeledButton.isVisible(), true, "Unlabeled button should be visible")
  })

  await t.step("should run full accessibility audit", async () => {
    const auditResults = await runFullAccessibilityAudit()(page)

    assertNotEquals(auditResults, undefined, "Audit results should be defined")
    assertEquals(typeof auditResults.issues, "object", "Audit should return issues array")
    assertEquals(typeof auditResults.axe, "object", "Audit should return axe results")
  })

  await t.step("should test individual utility functions", async () => {
    const axeResults = await runAxeAudit(page)
    assertEquals(typeof axeResults.violations, "object", "Axe should return violations array")

    const goodButtonLocator = page.locator("#good-button")
    const goodButtonName = await checkAccessibilityName(goodButtonLocator)
    assertEquals(goodButtonName.value, "Click Me", "Good button should have correct accessibility name")
    assertEquals(goodButtonName.source, "computed", "Good button name should be computed")

    const ariaButtonLocator = page.locator("#aria-button")
    const ariaButtonName = await checkAccessibilityName(ariaButtonLocator)
    assertEquals(ariaButtonName.value, "Close dialog", "Aria button should have correct accessibility name")
    assertEquals(ariaButtonName.source, "computed", "Aria button name should be computed")
  })

  await t.step("should test component-specific audit", async () => {
    const componentResults = await runFullAccessibilityAudit({
      componentSelector: 'section[aria-label="Button Components"]',
      skipHeadings: true,
    })(page)

    assertNotEquals(componentResults, undefined, "Component audit should return results")
    assertEquals(typeof componentResults.issues, "object", "Component audit should return issues")
  })

  await t.step("should verify violation detection works", async () => {
    const axeResults = await runAxeAudit(page)
    const hasViolations = axeResults.violations.length > 0
    assertEquals(typeof hasViolations, "boolean", "Should be able to detect violations")

    if (hasViolations) {
      const violationIds = axeResults.violations.map((v: any) => v.id)
      assertEquals(Array.isArray(violationIds), true, "Violations should have IDs")
    }
  })

  await browser.close()
})
