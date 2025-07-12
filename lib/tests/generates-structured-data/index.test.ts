import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts"
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

// Helper to extract JSON-LD from HTML
function extractJsonLd(html: string): object | null {
	const match = html.match(
		/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/s,
	)
	if (!match) return null
	try {
		return JSON.parse(match[1])
	} catch {
		return null
	}
}

// Property generators for fast-check
const titleArb = fc.string({ minLength: 1, maxLength: 200 })
const authorArb = fc.string({ minLength: 1, maxLength: 100 })
const publisherArb = fc.string({ minLength: 1, maxLength: 100 })
const dateArb = fc.date({ min: new Date(1800, 0, 1), max: new Date() }).map(
	(d: Date) => d.toISOString().split("T")[0],
)
const urlArb = fc.webUrl()
const isbnArb = fc.string({ minLength: 10, maxLength: 17 })
const doiArb = fc.string({ minLength: 10, maxLength: 50 })

Deno.test("CreativeWork components generate valid JSON-LD structured data", async (t) => {
	await t.step(
		"Article component generates complete JSON-LD with all properties",
		() => {
			fc.assert(
				fc.property(
					titleArb,
					authorArb,
					fc.record({
						journal: fc.string({ minLength: 1, maxLength: 100 }),
						volume: fc.integer({ min: 1, max: 100 }),
						issue: fc.integer({ min: 1, max: 50 }),
						datePublished: dateArb,
						doi: doiArb,
					}),
					(title, author, props) => {
						const element = Article({
							title,
							author,
							...props,
							disableMicrodata: true, // Focus on JSON-LD
						})
						const html = renderToString(element)
						const jsonLd = extractJsonLd(html)

						assertExists(jsonLd)
						assertEquals((jsonLd as any)["@context"], "https://schema.org")
						assertEquals((jsonLd as any)["@type"], "Article")
						assertEquals((jsonLd as any).headline, title)
						assertEquals((jsonLd as any).author?.name, author)
						assertEquals((jsonLd as any).datePublished, props.datePublished)
						assertEquals((jsonLd as any).sameAs, `https://doi.org/${props.doi}`)

						// Should include journal as isPartOf
						assertExists((jsonLd as any).isPartOf)
						assertEquals((jsonLd as any).isPartOf["@type"], "Periodical")
						assertEquals((jsonLd as any).isPartOf.name, props.journal)
					},
				),
				{ numRuns: 15 },
			)
		},
	)

	await t.step(
		"Book component generates complete JSON-LD with all properties",
		() => {
			fc.assert(
				fc.property(
					titleArb,
					authorArb,
					fc.record({
						publisher: publisherArb,
						datePublished: dateArb,
						isbn: isbnArb,
						genre: fc.string({ minLength: 1, maxLength: 50 }),
						numberOfPages: fc.integer({ min: 10, max: 1000 }),
					}),
					(title, author, props) => {
						const element = Book({
							title,
							author,
							...props,
							disableMicrodata: true,
						})
						const html = renderToString(element)
						const jsonLd = extractJsonLd(html)

						assertExists(jsonLd)
						assertEquals((jsonLd as any)["@context"], "https://schema.org")
						assertEquals((jsonLd as any)["@type"], "Book")
						assertEquals((jsonLd as any).name, title)
						assertEquals((jsonLd as any).author?.name, author)
						assertEquals((jsonLd as any).publisher?.name, props.publisher)
						assertEquals((jsonLd as any).isbn, props.isbn)
						assertEquals((jsonLd as any).genre, props.genre)
						assertEquals((jsonLd as any).numberOfPages, props.numberOfPages)
					},
				),
				{ numRuns: 15 },
			)
		},
	)

	await t.step(
		"CreativeWork component generates JSON-LD with custom schema type",
		() => {
			fc.assert(
				fc.property(
					titleArb,
					authorArb,
					fc.record({
						schemaType: fc.constantFrom("ComicStory", "Course", "Dataset"),
						additionalProps: fc.record({
							artist: fc.string({ minLength: 1, maxLength: 100 }),
							colorist: fc.string({ minLength: 1, maxLength: 100 }),
							position: fc.integer({ min: 1, max: 10 }),
						}),
					}),
					(title, author, { schemaType, additionalProps }) => {
						const element = CreativeWork({
							title,
							author,
							schemaOverride: {
								type: schemaType,
								additionalProperties: additionalProps,
							},
							disableMicrodata: true,
						})
						const html = renderToString(element)
						const jsonLd = extractJsonLd(html)

						assertExists(jsonLd)
						assertEquals((jsonLd as any)["@context"], "https://schema.org")
						assertEquals((jsonLd as any)["@type"], schemaType)
						assertEquals((jsonLd as any).name, title)
						assertEquals((jsonLd as any).author?.name, author)

						// Should include additional properties
						assertEquals((jsonLd as any).artist, additionalProps.artist)
						assertEquals((jsonLd as any).colorist, additionalProps.colorist)
						assertEquals((jsonLd as any).position, additionalProps.position)
					},
				),
				{ numRuns: 10 },
			)
		},
	)

	await t.step("Movie component generates JSON-LD when enabled", () => {
		fc.assert(
			fc.property(
				titleArb,
				fc.record({
					director: fc.string({ minLength: 1, maxLength: 100 }),
					studio: fc.string({ minLength: 1, maxLength: 100 }),
					datePublished: dateArb,
				}),
				(title, props) => {
					const element = Movie({
						title,
						...props,
						generateJsonLd: true,
					})
					const html = renderToString(element)
					const jsonLd = extractJsonLd(html)

					assertExists(jsonLd)
					assertEquals((jsonLd as any)["@context"], "https://schema.org")
					assertEquals((jsonLd as any)["@type"], "Movie")
					assertEquals((jsonLd as any).name, title)
					assertEquals((jsonLd as any).director?.name, props.director)
					assertEquals((jsonLd as any).productionCompany?.name, props.studio)
				},
			),
			{ numRuns: 15 },
		)
	})

	await t.step("WebSite component generates JSON-LD when enabled", () => {
		fc.assert(
			fc.property(
				titleArb,
				urlArb,
				fc.record({
					author: authorArb,
					publisher: publisherArb,
					datePublished: dateArb,
				}),
				(title, url, props) => {
					const element = WebSite({
						title,
						url,
						...props,
						generateJsonLd: true,
					})
					const html = renderToString(element)
					const jsonLd = extractJsonLd(html)

					assertExists(jsonLd)
					assertEquals((jsonLd as any)["@context"], "https://schema.org")
					assertEquals((jsonLd as any)["@type"], "WebSite")
					assertEquals((jsonLd as any).name, title)
					assertEquals((jsonLd as any).url, url)
					assertEquals((jsonLd as any).author?.name, props.author)
				},
			),
			{ numRuns: 15 },
		)
	})
})

Deno.test("CreativeWork components can disable JSON-LD generation", async (t) => {
	await t.step("components omit JSON-LD script when disabled", () => {
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
					const jsonLd = extractJsonLd(html)

					assertEquals(jsonLd, null)
					assertEquals(
						html.includes('<script type="application/ld+json"'),
						false,
					)
				},
			),
			{ numRuns: 10 },
		)
	})

	await t.step("Movie component defaults to no JSON-LD", () => {
		fc.assert(
			fc.property(
				titleArb,
				(title) => {
					const element = Movie({
						title,
						generateJsonLd: false, // Explicit false
					})
					const html = renderToString(element)
					const jsonLd = extractJsonLd(html)

					assertEquals(jsonLd, null)
				},
			),
			{ numRuns: 10 },
		)
	})
})

Deno.test("CreativeWork components generate proper microdata attributes", async (t) => {
	await t.step("Article component includes all microdata properties", () => {
		fc.assert(
			fc.property(
				titleArb,
				authorArb,
				fc.record({
					journal: fc.string({ minLength: 1, maxLength: 100 }),
					volume: fc.integer({ min: 1, max: 100 }),
					datePublished: dateArb,
					doi: doiArb,
				}),
				(title, author, props) => {
					const element = Article({
						title,
						author,
						...props,
						disableLinkedData: true, // Focus on microdata
					})
					const html = renderToString(element)

					// Should include microdata meta tags
					assertEquals(html.includes('<meta itemProp="author"'), true)
					assertEquals(html.includes('<meta itemProp="datePublished"'), true)
					assertEquals(html.includes('<meta itemProp="volumeNumber"'), true)
					assertEquals(html.includes('<meta itemProp="sameAs"'), true)
					assertEquals(html.includes(`content="${author}"`), true)
					assertEquals(html.includes(`content="${props.datePublished}"`), true)
					assertEquals(html.includes(`content="${props.volume}"`), true)
				},
			),
			{ numRuns: 15 },
		)
	})

	await t.step("components can disable microdata completely", () => {
		fc.assert(
			fc.property(
				titleArb,
				authorArb,
				(title, author) => {
					const element = Book({
						title,
						author,
						disableMicrodata: true,
						disableLinkedData: true,
					})
					const html = renderToString(element)

					// Should not include any microdata attributes
					assertEquals(html.includes("itemScope"), false)
					assertEquals(html.includes("itemType"), false)
					assertEquals(html.includes("itemProp"), false)
					assertEquals(html.includes("<meta itemProp"), false)
				},
			),
			{ numRuns: 10 },
		)
	})

	await t.step("components set proper schema.org itemType URLs", () => {
		const testCases = [
			{ component: Article, type: "Article" },
			{ component: Book, type: "Book" },
			{ component: CreativeWork, type: "CreativeWork" },
		]

		testCases.forEach(({ component, type }) => {
			fc.assert(
				fc.property(
					titleArb,
					(title) => {
						const element = component({
							title,
							disableLinkedData: true,
						})
						const html = renderToString(element)

						assertEquals(
							html.includes(`itemType="https://schema.org/${type}"`),
							true,
						)
					},
				),
				{ numRuns: 5 },
			)
		})
	})
})
