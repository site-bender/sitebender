import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts"
import AxeBuilder from "npm:@axe-core/playwright@4.8.2"
import { expect, test } from "npm:@playwright/test@1.40.0"
import * as fc from "npm:fast-check@3.15.1"

import Article from "../../metadata/CreativeWork/Article/index.tsx"
import Book from "../../metadata/CreativeWork/Book/index.tsx"
import CreativeWork from "../../metadata/CreativeWork/index.tsx"
import Movie from "../../metadata/CreativeWork/Movie/index.tsx"
import WebSite from "../../metadata/CreativeWork/WebSite/index.tsx"

// Helper to render JSX to HTML string
function renderToString(element: JSX.Element): string {
	return String(element)
}

// Helper to create a full HTML page for testing
function createTestPage(componentHtml: string): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Component Test</title>
</head>
<body>
	<main>
		${componentHtml}
	</main>
</body>
</html>`
}

// Property generators for fast-check
const titleArb = fc.string({ minLength: 1, maxLength: 200 })
const authorArb = fc.string({ minLength: 1, maxLength: 100 })
const publisherArb = fc.string({ minLength: 1, maxLength: 100 })
const dateArb = fc.date({ min: new Date(1800, 0, 1), max: new Date() }).map(
	(d: Date) => d.toISOString().split("T")[0],
)

Deno.test("CreativeWork components have accessible semantic markup", async (t) => {
	await t.step("Article component uses proper semantic elements", () => {
		fc.assert(
			fc.property(
				titleArb,
				authorArb,
				(title, author) => {
					const element = Article({
						title,
						author,
						disableLinkedData: true,
					})
					const html = renderToString(element)

					// Should use semantic cite element
					assertEquals(html.includes("<cite"), true)

					// Should have proper ARIA structure
					assertEquals(html.includes("itemScope"), true)
					assertEquals(html.includes("itemType"), true)

					// Should include lang attribute for accessibility
					assertEquals(html.includes("lang="), true)

					// Should not have accessibility anti-patterns
					assertEquals(html.includes('role="presentation"'), false)
					assertEquals(html.includes('aria-hidden="true"'), false)
				},
			),
			{ numRuns: 10 },
		)
	})

	await t.step("Book component uses proper semantic elements", () => {
		fc.assert(
			fc.property(
				titleArb,
				authorArb,
				(title, author) => {
					const element = Book({
						title,
						author,
						disableLinkedData: true,
					})
					const html = renderToString(element)

					// Should use semantic span element with proper context
					assertEquals(html.includes("<span"), true)
					assertEquals(html.includes("itemScope"), true)

					// Should include lang attribute
					assertEquals(html.includes("lang="), true)

					// Should include descriptive classes for styling hooks
					assertEquals(html.includes("class="), true)
					assertEquals(html.includes("book"), true)
				},
			),
			{ numRuns: 10 },
		)
	})

	await t.step(
		"CreativeWork component provides configurable accessibility",
		() => {
			fc.assert(
				fc.property(
					titleArb,
					authorArb,
					fc.constantFrom("ComicStory", "Course", "Dataset"),
					(title, author, schemaType) => {
						const element = CreativeWork({
							title,
							author,
							schemaOverride: { type: schemaType },
							disableLinkedData: true,
						})
						const html = renderToString(element)

						// Should maintain semantic structure regardless of schema type
						assertEquals(html.includes("<cite"), true)
						assertEquals(html.includes("itemScope"), true)
						assertEquals(
							html.includes(`itemType="https://schema.org/${schemaType}"`),
							true,
						)

						// Should include proper data attributes for CSS hooks
						assertEquals(html.includes("data-work-type"), true)
					},
				),
				{ numRuns: 8 },
			)
		},
	)
})

Deno.test("CreativeWork components support assistive technology", async (t) => {
	await t.step(
		"components include descriptive metadata for screen readers",
		() => {
			fc.assert(
				fc.property(
					titleArb,
					authorArb,
					fc.record({
						datePublished: dateArb,
						genre: fc.string({ minLength: 1, maxLength: 50 }),
					}),
					(title, author, props) => {
						const element = Article({
							title,
							author,
							...props,
							disableLinkedData: true,
						})
						const html = renderToString(element)

						// Should include hidden metadata that screen readers can access
						assertEquals(html.includes('<meta itemProp="author"'), true)
						assertEquals(html.includes('<meta itemProp="datePublished"'), true)
						assertEquals(html.includes(`content="${author}"`), true)
						assertEquals(
							html.includes(`content="${props.datePublished}"`),
							true,
						)

						// Meta tags should not be aria-hidden
						assertEquals(html.includes('aria-hidden="true"'), false)
					},
				),
				{ numRuns: 10 },
			)
		},
	)

	await t.step(
		"components provide language information for accessibility",
		() => {
			const locales = ["en-US", "es-ES", "fr-FR", "de-DE", "ja-JP"]

			locales.forEach((locale) => {
				fc.assert(
					fc.property(
						titleArb,
						(title) => {
							const element = Book({
								title,
								locale: locale as any, // Type assertion for test
								disableLinkedData: true,
							})
							const html = renderToString(element)

							// Should include lang attribute with proper locale
							assertEquals(html.includes(`lang="${locale}"`), true)

							// Should include inLanguage metadata
							assertEquals(html.includes('<meta itemProp="inLanguage"'), true)
							assertEquals(html.includes(`content="${locale}"`), true)
						},
					),
					{ numRuns: 3 },
				)
			})
		},
	)

	await t.step("components allow customization for accessibility", () => {
		fc.assert(
			fc.property(
				titleArb,
				fc.record({
					id: fc.string({ minLength: 1, maxLength: 50 }),
					class: fc.string({ minLength: 1, maxLength: 50 }),
					"aria-label": fc.string({ minLength: 1, maxLength: 100 }),
				}),
				(title, props) => {
					const element = Article({
						title,
						id: props.id,
						class: props.class,
						"aria-label": props["aria-label"],
						disableLinkedData: true,
					})
					const html = renderToString(element)

					// Should preserve accessibility customizations
					assertEquals(html.includes(`id="${props.id}"`), true)
					assertEquals(html.includes(props.class), true)
					assertEquals(
						html.includes(`aria-label="${props["aria-label"]}"`),
						true,
					)
				},
			),
			{ numRuns: 8 },
		)
	})
})

// Playwright-based accessibility tests with axe-core
test.describe("CreativeWork components WCAG compliance", () => {
	test("Article component passes axe accessibility audit", async ({ page }) => {
		const title = "Sample Article Title"
		const author = "Test Author"

		const element = Article({
			title,
			author,
			journal: "Test Journal",
			datePublished: "2024-01-01",
			disableLinkedData: true,
		})

		const html = createTestPage(renderToString(element))
		await page.setContent(html)

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(["wcag2a", "wcag2aa", "wcag21aa"])
			.analyze()

		expect(accessibilityScanResults.violations).toEqual([])
	})

	test("Book component passes axe accessibility audit", async ({ page }) => {
		const title = "Sample Book Title"
		const author = "Test Author"

		const element = Book({
			title,
			author,
			publisher: "Test Publisher",
			datePublished: "2024-01-01",
			disableLinkedData: true,
		})

		const html = createTestPage(renderToString(element))
		await page.setContent(html)

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(["wcag2a", "wcag2aa", "wcag21aa"])
			.analyze()

		expect(accessibilityScanResults.violations).toEqual([])
	})

	test("CreativeWork component with schema override passes accessibility audit", async ({ page }) => {
		const title = "Sample Creative Work"
		const author = "Test Author"

		const element = CreativeWork({
			title,
			author,
			schemaOverride: {
				type: "ComicStory",
				additionalProperties: {
					artist: "Test Artist",
					colorist: "Test Colorist",
				},
			},
			disableLinkedData: true,
		})

		const html = createTestPage(renderToString(element))
		await page.setContent(html)

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(["wcag2a", "wcag2aa", "wcag21aa"])
			.analyze()

		expect(accessibilityScanResults.violations).toEqual([])
	})

	test("Movie component passes accessibility audit", async ({ page }) => {
		const title = "Sample Movie Title"

		const element = Movie({
			title,
			director: "Test Director",
			datePublished: "2024-01-01",
			generateJsonLd: false,
		})

		const html = createTestPage(renderToString(element))
		await page.setContent(html)

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(["wcag2a", "wcag2aa", "wcag21aa"])
			.analyze()

		expect(accessibilityScanResults.violations).toEqual([])
	})

	test("WebSite component passes accessibility audit", async ({ page }) => {
		const title = "Sample Website"
		const url = "https://example.com"

		const element = WebSite({
			title,
			url,
			author: "Test Author",
			generateJsonLd: false,
		})

		const html = createTestPage(renderToString(element))
		await page.setContent(html)

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(["wcag2a", "wcag2aa", "wcag21aa"])
			.analyze()

		expect(accessibilityScanResults.violations).toEqual([])
	})

	test("components with multiple instances maintain accessibility", async ({ page }) => {
		const articles = [
			Article({
				title: "Article 1",
				author: "Author 1",
				disableLinkedData: true,
			}),
			Article({
				title: "Article 2",
				author: "Author 2",
				disableLinkedData: true,
			}),
			Book({ title: "Book 1", author: "Author 3", disableLinkedData: true }),
		]

		const combinedHtml = articles.map(renderToString).join("\n")
		const html = createTestPage(combinedHtml)
		await page.setContent(html)

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(["wcag2a", "wcag2aa", "wcag21aa"])
			.analyze()

		expect(accessibilityScanResults.violations).toEqual([])
	})
})
