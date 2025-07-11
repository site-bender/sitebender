import runFullAccessibilityAudit from "~tests/a11y/runFullAccessibilityAudit/index.ts"
import { assertEquals } from "jsr:@std/assert"
import { chromium } from "playwright"

Deno.test("TextArea accessibility audit", async () => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    locale: "en-US",
  })
  const page = await context.newPage()

  const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TextArea Accessibility Test</title>
</head>
<body>
  <main>
    <h1>TextArea Accessibility Test</h1>
    <form>
      <label for="bio">Bio</label>
      <textarea class="textarea" id="bio" name="bio" rows="4" cols="40"></textarea>
      <label for="comments">Comments</label>
      <textarea class="textarea" id="comments" name="comments" required aria-describedby="comments-help"></textarea>
      <p id="comments-help" class="help" aria-live="polite">Please enter your comments.</p>
    </form>
  </main>
</body>
</html>
  `

  await page.setContent(testHtml)

  const auditResults = await runFullAccessibilityAudit()(page)

  assertEquals(
    auditResults.axe.violations.length,
    0,
    `Accessibility violations found: ${auditResults.axe.violations.map((v: any) => v.id).join(", ")}`,
  )

  const bioTextarea = page.locator("#bio")
  const commentsTextarea = page.locator("#comments")

  assertEquals(await bioTextarea.getAttribute("rows"), "4", "Bio textarea should have correct rows attribute")
  assertEquals(await bioTextarea.getAttribute("cols"), "40", "Bio textarea should have correct cols attribute")
  assertEquals(await commentsTextarea.getAttribute("required"), "", "Comments textarea should be required")
  assertEquals(
    await commentsTextarea.getAttribute("aria-describedby"),
    "comments-help",
    "Comments textarea should be described by help text",
  )

  await bioTextarea.fill("This is a test bio")
  assertEquals(await bioTextarea.inputValue(), "This is a test bio", "Bio textarea should accept text input")

  await commentsTextarea.focus()
  const isFocused = await commentsTextarea.evaluate((el) => document.activeElement === el)
  assertEquals(isFocused, true, "Comments textarea should be focusable")

  await browser.close()
})
