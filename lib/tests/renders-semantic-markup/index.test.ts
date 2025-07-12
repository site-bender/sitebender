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
import createElement from "../../utilities/createElement/index.ts"

// Helper to render JSX to HTML string
function renderToString(element: JSX.Element): string {
	return String(element)
}

// Property generators for fast-check
const titleArb = fc.string({ minLength: 1, maxLength: 200 })
const authorArb = fc.string({ minLength: 1, maxLength: 100 })
const publisherArb = fc.string({ minLength: 1, maxLength: 100 })
const dateArb = fc.date({ min: new Date(1800, 0, 1), max: new Date() }).map(
	(d: Date) => d.toISOString().split("T")[0],
)
const genreArb = fc.string({ minLength: 1, maxLength: 50 })
const urlArb = fc.webUrl()
const localeArb = fc.constantFrom("en-US", "es-ES", "fr-FR", "de-DE", "ja-JP")
const citationStyleArb = fc.constantFrom("apa", "mla", "chicago")
const formatArb = fc.constantFrom("title", "titleAuthor", "simple", "citation")

Deno.test("CreativeWork components render semantic HTML markup", async (t) => {
	await t.step(
		"Article component generates proper cite element with microdata",
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
						doi: fc.string({ minLength: 10, maxLength: 50 }),
					}),
					(title, author, props) => {
						const element = Article({
							title,
							author,
							...props,
							disableLinkedData: true, // Focus on HTML structure
						})
						const html = renderToString(element)

						// Should render as cite element
						assertEquals(html.includes("<cite"), true)
						assertEquals(
							html.includes('itemType="https://schema.org/Article"'),
							true,
						)
						assertEquals(html.includes("itemScope"), true)
						assertEquals(html.includes('data-work-type="article"'), true)
						assertEquals(html.includes(`class="`), true)
						assertEquals(html.includes("article"), true)
					},
				),
				{ numRuns: 20 },
			)
		},
	)

	await t.step(
		"Book component generates proper span element with microdata",
		() => {
			fc.assert(
				fc.property(
					titleArb,
					authorArb,
					fc.record({
						publisher: publisherArb,
						datePublished: dateArb,
						isbn: fc.string({ minLength: 10, maxLength: 17 }),
						genre: genreArb,
					}),
					(title, author, props) => {
						const element = Book({
							title,
							author,
							...props,
							disableLinkedData: true,
						})
						const html = renderToString(element)

						// Should render as span element
						assertEquals(html.includes("<span"), true)
						assertEquals(
							html.includes('itemType="https://schema.org/Book"'),
							true,
						)
						assertEquals(html.includes("itemScope"), true)
						assertEquals(html.includes(`class="`), true)
						assertEquals(html.includes("book"), true)
						assertEquals(
							html.includes(
								`genre-${props.genre.toLowerCase().replace(/\s+/g, "-")}`,
							),
							true,
						)
					},
				),
				{ numRuns: 20 },
			)
		},
	)

	await t.step(
		"CreativeWork component generates proper cite element with configurable schema type",
		() => {
			fc.assert(
				fc.property(
					titleArb,
					authorArb,
					fc.record({
						schemaType: fc.constantFrom(
							"ComicStory",
							"Course",
							"Dataset",
							"HowToSection",
						),
						additionalProps: fc.record({
							duration: fc.string({ minLength: 5, maxLength: 20 }),
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
							disableLinkedData: true,
						})
						const html = renderToString(element)

						// Should render as cite element with custom schema type
						assertEquals(html.includes("<cite"), true)
						assertEquals(
							html.includes(`itemType="https://schema.org/${schemaType}"`),
							true,
						)
						assertEquals(html.includes("itemScope"), true)
						assertEquals(html.includes("data-work-type"), true)
						assertEquals(html.includes("creative-work"), true)
					},
				),
				{ numRuns: 15 },
			)
		},
	)

	await t.step("Movie component generates proper span element", () => {
		fc.assert(
			fc.property(
				titleArb,
				fc.record({
					director: fc.string({ minLength: 1, maxLength: 100 }),
					datePublished: dateArb,
					genre: genreArb,
				}),
				(title, props) => {
					const element = Movie({
						title,
						...props,
						generateJsonLd: false,
					})
					const html = renderToString(element)

					// Should render as span element
					assertEquals(html.includes("<span"), true)
					assertEquals(
						html.includes('itemType="https://schema.org/Movie"'),
						true,
					)
					assertEquals(html.includes("itemScope"), true)
					assertEquals(html.includes("movie"), true)
				},
			),
			{ numRuns: 20 },
		)
	})

	await t.step("WebSite component generates proper cite element", () => {
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
						generateJsonLd: false,
					})
					const html = renderToString(element)

					// Should render as cite element
					assertEquals(html.includes("<cite"), true)
					assertEquals(html.includes('class="website"'), true)
					assertEquals(html.includes('data-work-type="website"'), true)
				},
			),
			{ numRuns: 20 },
		)
	})
})

Deno.test("CreativeWork components handle microdata attributes correctly", async (t) => {
	await t.step("components include proper itemProp when specified", () => {
		fc.assert(
			fc.property(
				titleArb,
				fc.constantFrom("name", "mainEntity", "about", "citation"),
				(title, itemProp) => {
					const element = Article({
						title,
						itemProp,
						disableLinkedData: true,
					})
					const html = renderToString(element)

					assertEquals(html.includes(`itemProp="${itemProp}"`), true)
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
					const element = Article({
						title,
						author,
						disableMicrodata: true,
						disableLinkedData: true,
					})
					const html = renderToString(element)

					assertEquals(html.includes("itemScope"), false)
					assertEquals(html.includes("itemType"), false)
					assertEquals(html.includes("itemProp"), false)
				},
			),
			{ numRuns: 15 },
		)
	})

	await t.step("components include metadata as hidden meta tags", () => {
		fc.assert(
			fc.property(
				titleArb,
				authorArb,
				publisherArb,
				dateArb,
				(title, author, publisher, datePublished) => {
					const element = Article({
						title,
						author,
						datePublished,
						disableLinkedData: true,
					})
					const html = renderToString(element)

					assertEquals(html.includes('<meta itemProp="author"'), true)
					assertEquals(html.includes('<meta itemProp="datePublished"'), true)
					assertEquals(html.includes(`content="${author}"`), true)
					assertEquals(html.includes(`content="${datePublished}"`), true)
				},
			),
			{ numRuns: 15 },
		)
	})
})

Deno.test("CreativeWork components apply proper CSS classes", async (t) => {
	await t.step("components include locale-specific classes", () => {
		fc.assert(
			fc.property(
				titleArb,
				(title) => {
					const element = Article({
						title,
						locale: "en-US",
						citationStyle: "apa",
						disableLinkedData: true,
					})
					const html = renderToString(element)

					assertEquals(html.includes("locale-en-US"), true)
					assertEquals(html.includes("citation-apa"), true)
				},
			),
			{ numRuns: 15 },
		)
	})

	await t.step("components include additional custom classes", () => {
		fc.assert(
			fc.property(
				titleArb,
				fc.string({ minLength: 1, maxLength: 50 }),
				(title, customClass) => {
					const element = Book({
						title,
						class: customClass,
						disableLinkedData: true,
					})
					const html = renderToString(element)

					assertEquals(html.includes(customClass), true)
				},
			),
			{ numRuns: 15 },
		)
	})

	await t.step("Book component includes genre-specific classes", () => {
		fc.assert(
			fc.property(
				titleArb,
				genreArb,
				(title, genre) => {
					const element = Book({
						title,
						genre,
						disableLinkedData: true,
					})
					const html = renderToString(element)

					const expectedGenreClass = `genre-${
						genre.toLowerCase().replace(/\s+/g, "-")
					}`
					assertEquals(html.includes(expectedGenreClass), true)
				},
			),
			{ numRuns: 15 },
		)
	})
})

Deno.test("CreativeWork components handle language attributes", async (t) => {
	await t.step("components set proper lang attribute", () => {
		fc.assert(
			fc.property(
				titleArb,
				localeArb,
				(title, inLanguage) => {
					const element = Article({
						title,
						inLanguage,
						disableLinkedData: true,
					})
					const html = renderToString(element)

					assertEquals(html.includes(`lang="${inLanguage}"`), true)
				},
			),
			{ numRuns: 15 },
		)
	})

	await t.step("Article component includes inLanguage metadata", () => {
		fc.assert(
			fc.property(
				titleArb,
				(title) => {
					const element = Article({
						title,
						locale: "en-US",
						disableLinkedData: true,
					})
					const html = renderToString(element)

					assertEquals(html.includes('<meta itemProp="inLanguage"'), true)
					assertEquals(html.includes('content="en-US"'), true)
				},
			),
			{ numRuns: 15 },
		)
	})
})
