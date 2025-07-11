import runFullAccessibilityAudit from "~tests/a11y/runFullAccessibilityAudit/index.ts"
import { assertEquals } from "jsr:@std/assert"
import { chromium } from "playwright"

Deno.test("Article component with translation support", async (t) => {
	const browser = await chromium.launch({ headless: true })
	const context = await browser.newContext({
		viewport: { width: 1280, height: 720 },
		locale: "en-US",
	})
	const page = await context.newPage()

	await t.step("should render basic article without translations", async () => {
		const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Article Test</title>
</head>
<body>
	<main>
		<h1>Article Component Test</h1>
		<cite class="article locale-en-US citation-apa" itemscope itemtype="https://schema.org/Article" itemProp="name" data-work-type="article" lang="en-US">
			"The Structure of Scientific Revolutions"
		</cite>
	</main>
</body>
</html>
		`

		await page.setContent(testHtml)
		const auditResults = await runFullAccessibilityAudit()(page)

		assertEquals(auditResults.axe.violations.length, 0,
			`Found accessibility violations: ${auditResults.axe.violations.map((v: any) => v.id).join(", ")}`)

		const articleElement = page.locator('cite[itemtype="https://schema.org/Article"]')
		assertEquals(await articleElement.isVisible(), true, "Article element should be visible")
		assertEquals(await articleElement.getAttribute("lang"), "en-US", "Article should have correct language")
	})

	await t.step("should render article with translation metadata", async () => {
		const testHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Article Translation Test</title>
</head>
<body>
	<main>
		<h1>Article with Translations</h1>
		<cite class="article locale-fr-FR citation-apa has-translations" itemscope itemtype="https://schema.org/Article" itemProp="name" data-work-type="article" lang="fr-FR" data-translation-source="title">
			«La radioactivité»
			<meta data-source="title" data-lang="en" data-translation="Radioactivity" data-translator="Ellen S. Gleditsch" data-quality="academic" data-published-year="1904" itemProp="workTranslation" itemscope itemtype="https://schema.org/Article">
			<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "La radioactivité",
  "author": {
    "@type": "Person",
    "name": "Marie Curie"
  },
  "inLanguage": "fr-FR",
  "workTranslation": [
    {
      "@type": "Article",
      "headline": "Radioactivity",
      "inLanguage": "en",
      "datePublished": "1904",
      "translator": {
        "@type": "Person",
        "name": "Ellen S. Gleditsch"
      },
      "additionalProperty": {
        "@type": "PropertyValue",
        "name": "translation-quality",
        "value": "academic"
      }
    }
  ]
}
			</script>
		</cite>
	</main>
</body>
</html>
		`

		await page.setContent(testHtml)
		const auditResults = await runFullAccessibilityAudit()(page)

		assertEquals(auditResults.axe.violations.length, 0,
			`Found accessibility violations: ${auditResults.axe.violations.map((v: any) => v.id).join(", ")}`)

		// Verify translation data structure
		const articleElement = page.locator('cite[data-translation-source="title"]')
		assertEquals(await articleElement.isVisible(), true, "Article with translations should be visible")
		assertEquals(await articleElement.getAttribute("data-translation-source"), "title", "Should have translation source indicator")

		// Verify microdata meta tags are nested within itemScope
		const translationMeta = page.locator('cite[itemtype="https://schema.org/Article"] meta[data-lang="en"]')
		assertEquals(await translationMeta.isVisible(), false, "Meta tags should not be visually displayed")
		assertEquals(await translationMeta.getAttribute("data-translation"), "Radioactivity", "Should have correct translation")
		assertEquals(await translationMeta.getAttribute("data-translator"), "Ellen S. Gleditsch", "Should have translator attribution")
		assertEquals(await translationMeta.getAttribute("data-quality"), "academic", "Should have quality indicator")

		// Verify JSON-LD is nested within component
		const jsonLdScript = page.locator('cite[itemtype="https://schema.org/Article"] script[type="application/ld+json"]')
		assertEquals(await jsonLdScript.count(), 1, "Should have exactly one JSON-LD script")

		const jsonLdContent = await jsonLdScript.textContent()
		const jsonData = JSON.parse(jsonLdContent!)
		assertEquals(jsonData["@type"], "Article", "JSON-LD should have correct type")
		assertEquals(jsonData.workTranslation.length, 1, "Should have one translation")
		assertEquals(jsonData.workTranslation[0].headline, "Radioactivity", "Translation should have correct title")
		assertEquals(jsonData.workTranslation[0].translator.name, "Ellen S. Gleditsch", "Translation should have translator")
	})

	await t.step("should handle multiple translations with different qualities", async () => {
		const testHtml = `
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Multiple Translations Test</title>
</head>
<body>
	<main>
		<h1>Article with Multiple Translations</h1>
		<cite class="article locale-ja-JP citation-apa has-translations" itemscope itemtype="https://schema.org/Article" itemProp="name" data-work-type="article" lang="ja-JP" data-translation-source="title">
			「量子物理学の基礎」
			<meta data-source="title" data-lang="en" data-translation="Foundations of Quantum Physics" data-translator="John Wheeler" data-quality="official" data-published-year="1975" itemProp="workTranslation" itemscope itemtype="https://schema.org/Article">
			<meta data-source="title" data-lang="de" data-translation="Grundlagen der Quantenphysik" data-translator="Werner Heisenberg" data-quality="academic" data-published-year="1976" itemProp="workTranslation" itemscope itemtype="https://schema.org/Article">
			<meta data-source="title" data-lang="fr" data-translation="Fondements de la physique quantique" data-translator="Louis de Broglie" data-quality="community" data-published-year="1977" itemProp="workTranslation" itemscope itemtype="https://schema.org/Article">
		</cite>
	</main>
</body>
</html>
		`

		await page.setContent(testHtml)
		const auditResults = await runFullAccessibilityAudit()(page)

		assertEquals(auditResults.axe.violations.length, 0,
			`Found accessibility violations: ${auditResults.axe.violations.map((v: any) => v.id).join(", ")}`)

		// Verify all translation meta tags are present and properly nested
		const allTranslationMetas = page.locator('cite[itemtype="https://schema.org/Article"] meta[data-source="title"]')
		assertEquals(await allTranslationMetas.count(), 3, "Should have three translation meta tags")

		// Verify each translation has correct attributes
		const englishMeta = page.locator('meta[data-lang="en"]')
		assertEquals(await englishMeta.getAttribute("data-quality"), "official", "English translation should be official quality")

		const germanMeta = page.locator('meta[data-lang="de"]')
		assertEquals(await germanMeta.getAttribute("data-quality"), "academic", "German translation should be academic quality")

		const frenchMeta = page.locator('meta[data-lang="fr"]')
		assertEquals(await frenchMeta.getAttribute("data-quality"), "community", "French translation should be community quality")
	})

	await t.step("should maintain proper microdata scope with translations", async () => {
		const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Microdata Scope Test</title>
</head>
<body>
	<main>
		<h1>Article Microdata Test</h1>
		<cite class="article locale-en-US citation-apa has-translations" itemscope itemtype="https://schema.org/Article" itemProp="name" data-work-type="article" lang="en-US" data-translation-source="title">
			"Sustainable Energy Solutions"
			<meta itemProp="author" content="Alice Johnson">
			<meta itemProp="datePublished" content="2023">
			<meta data-source="title" data-lang="es" data-translation="Soluciones de Energía Sostenible" data-translator="Carlos Rodriguez" data-quality="official" itemProp="workTranslation" itemscope itemtype="https://schema.org/Article">
		</cite>
	</main>
</body>
</html>
		`

		await page.setContent(testHtml)
		const auditResults = await runFullAccessibilityAudit()(page)

		assertEquals(auditResults.axe.violations.length, 0,
			`Found accessibility violations: ${auditResults.axe.violations.map((v: any) => v.id).join(", ")}`)

		// Verify that both article metadata and translation metadata are properly scoped
		const articleScope = page.locator('cite[itemscope][itemtype="https://schema.org/Article"]')
		assertEquals(await articleScope.count(), 1, "Should have one article itemScope")

		// Verify article metadata is nested within scope
		const authorMeta = page.locator('cite[itemtype="https://schema.org/Article"] meta[itemProp="author"]')
		assertEquals(await authorMeta.getAttribute("content"), "Alice Johnson", "Author meta should be within article scope")

		// Verify translation metadata is also within scope
		const translationMeta = page.locator('cite[itemtype="https://schema.org/Article"] meta[itemProp="workTranslation"]')
		assertEquals(await translationMeta.getAttribute("data-lang"), "es", "Translation meta should be within article scope")
	})

	await t.step("should be keyboard accessible with translations", async () => {
		const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Article Keyboard Test</title>
	<style>
		cite:focus {
			outline: 2px solid #0066cc;
			outline-offset: 2px;
		}
	</style>
</head>
<body>
	<main>
		<h1>Article Keyboard Accessibility</h1>
		<p>Before article</p>
		<cite class="article locale-en-US citation-apa has-translations" itemscope itemtype="https://schema.org/Article" itemProp="name" data-work-type="article" lang="en-US" data-translation-source="title" tabindex="0">
			"The Future of AI"
			<meta data-source="title" data-lang="zh" data-translation="人工智能的未来" data-translator="Li Wei" data-quality="academic" itemProp="workTranslation" itemscope itemtype="https://schema.org/Article">
		</cite>
		<p>After article</p>
	</main>
</body>
</html>
		`

		await page.setContent(testHtml)

		// Test keyboard navigation
		await page.keyboard.press("Tab")
		await page.keyboard.press("Tab") // Should focus the cite element

		const citeFocused = await page.locator('cite[data-translation-source="title"]').evaluate(
			el => document.activeElement === el
		)
		assertEquals(citeFocused, true, "Article should be focusable with keyboard navigation")

		const auditResults = await runFullAccessibilityAudit()(page)
		assertEquals(auditResults.axe.violations.length, 0,
			`Found accessibility violations: ${auditResults.axe.violations.map((v: any) => v.id).join(", ")}`)
	})

	await browser.close()
})
