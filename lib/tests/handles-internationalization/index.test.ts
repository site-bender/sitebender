import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.15.1"

import type { BCP47LanguageTag } from "../../metadata/types/bcp47/index.ts"
import type { TranslationCollection } from "../../metadata/types/index.ts"

import Article from "../../metadata/CreativeWork/Article/index.tsx"
import Book from "../../metadata/CreativeWork/Book/index.tsx"
import CreativeWork from "../../metadata/CreativeWork/index.tsx"

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

// BCP-47 language codes
const bcp47Arb = fc.constantFrom(
	"en-US" as BCP47LanguageTag,
	"es-ES" as BCP47LanguageTag,
	"fr-FR" as BCP47LanguageTag,
	"de-DE" as BCP47LanguageTag,
	"ja-JP" as BCP47LanguageTag,
	"zh-CN" as BCP47LanguageTag,
	"it-IT" as BCP47LanguageTag,
	"pt-BR" as BCP47LanguageTag,
)

// Translation data generator
const translationDataArb = fc.record({
	title: fc.string({ minLength: 1, maxLength: 200 }),
	author: fc.string({ minLength: 1, maxLength: 100 }),
	translator: fc.string({ minLength: 1, maxLength: 100 }),
	quality: fc.constantFrom("official", "academic", "community", "machine"),
	publishedYear: fc.string({ minLength: 4, maxLength: 4 }),
	publisherImprint: fc.string({ minLength: 1, maxLength: 100 }),
})

// Translation collection generator
const translationCollectionArb = fc.dictionary(
	bcp47Arb,
	translationDataArb,
	{ minKeys: 1, maxKeys: 4 },
) as fc.Arbitrary<TranslationCollection>

Deno.test("CreativeWork components handle multiple languages", async (t) => {
	await t.step(
		"Article component detects and uses best available translation",
		() => {
			fc.assert(
				fc.property(
					titleArb,
					authorArb,
					bcp47Arb,
					translationCollectionArb,
					bcp47Arb,
					(title, author, primaryLocale, translations, userPreference) => {
						const element = Article({
							title,
							author,
							primaryLocale,
							translations,
							userPreference,
							disableLinkedData: true,
						})
						const html = renderToString(element)

						// Should include lang attribute with detected language
						assertEquals(html.includes("lang="), true)

						// Should include translation metadata
						assertEquals(html.includes('data-translation-source="title"'), true)
						assertEquals(html.includes("has-translations"), true)

						// Should include meta tags for each translation
						Object.keys(translations).forEach((langCode) => {
							assertEquals(html.includes(`data-lang="${langCode}"`), true)
							assertEquals(html.includes('itemProp="workTranslation"'), true)
						})
					},
				),
				{ numRuns: 15 },
			)
		},
	)

	await t.step(
		"Book component includes translation metadata in JSON-LD",
		() => {
			fc.assert(
				fc.property(
					titleArb,
					authorArb,
					bcp47Arb,
					translationCollectionArb,
					(title, author, primaryLocale, translations) => {
						const element = Book({
							title,
							author,
							locale: primaryLocale,
							translations,
							disableMicrodata: true, // Focus on JSON-LD
						})
						const html = renderToString(element)
						const jsonLd = extractJsonLd(html)

						assertExists(jsonLd)
						const data = jsonLd as any

						// Should include workTranslation array
						assertExists(data.workTranslation)
						assertEquals(Array.isArray(data.workTranslation), true)

						// Each translation should have proper structure
						data.workTranslation.forEach((translation: any) => {
							assertEquals(translation["@type"], "Book")
							assertExists(translation.name)
							assertExists(translation.inLanguage)
						})

						// Number of translations should match input
						assertEquals(
							data.workTranslation.length,
							Object.keys(translations).length,
						)
					},
				),
				{ numRuns: 10 },
			)
		},
	)

	await t.step(
		"CreativeWork component preserves language information with schema overrides",
		() => {
			fc.assert(
				fc.property(
					titleArb,
					authorArb,
					bcp47Arb,
					translationCollectionArb,
					fc.constantFrom("ComicStory", "Course", "Dataset"),
					(title, author, primaryLocale, translations, schemaType) => {
						const element = CreativeWork({
							title,
							author,
							primaryLocale,
							translations,
							schemaOverride: { type: schemaType },
							disableMicrodata: true,
						})
						const html = renderToString(element)
						const jsonLd = extractJsonLd(html)

						assertExists(jsonLd)
						const data = jsonLd as any

						// Should use custom schema type for translations
						if (data.workTranslation) {
							data.workTranslation.forEach((translation: any) => {
								assertEquals(translation["@type"], schemaType)
							})
						}

						// Should include primary language
						assertEquals(data.inLanguage, primaryLocale)
					},
				),
				{ numRuns: 10 },
			)
		},
	)
})

Deno.test("CreativeWork components handle language detection", async (t) => {
	await t.step(
		"components prefer user preference over browser detection",
		() => {
			fc.assert(
				fc.property(
					titleArb,
					authorArb,
					bcp47Arb,
					translationCollectionArb,
					bcp47Arb,
					(title, author, primaryLocale, translations, userPreference) => {
						// Ensure user preference is available in translations
						const enhancedTranslations = {
							...translations,
							[userPreference]: {
								title: `${title} [${userPreference}]`,
								author: author,
								translator: "Test Translator",
								quality: "official" as const,
							},
						}

						const element = Article({
							title,
							author,
							primaryLocale,
							translations: enhancedTranslations,
							userPreference,
							disableLinkedData: true,
						})
						const html = renderToString(element)

						// Should use user preference language
						assertEquals(html.includes(`lang="${userPreference}"`), true)

						// Should include translation metadata for the preferred language
						assertEquals(html.includes(`data-lang="${userPreference}"`), true)
					},
				),
				{ numRuns: 10 },
			)
		},
	)

	await t.step(
		"components fallback to primary locale when no translation available",
		() => {
			fc.assert(
				fc.property(
					titleArb,
					authorArb,
					bcp47Arb,
					bcp47Arb,
					(title, author, primaryLocale, unavailableLocale) => {
						// Test with empty translations
						const element = Book({
							title,
							author,
							locale: primaryLocale,
							translations: {},
							userPreference: unavailableLocale,
							disableLinkedData: true,
						})
						const html = renderToString(element)

						// Should fallback to primary locale
						assertEquals(html.includes(`lang="${primaryLocale}"`), true)

						// Should not include translation metadata
						assertEquals(html.includes("has-translations"), false)
						assertEquals(html.includes("data-translation-source"), false)
					},
				),
				{ numRuns: 10 },
			)
		},
	)

	await t.step("components handle translation quality indicators", () => {
		const qualityLevels = [
			"official",
			"academic",
			"community",
			"machine",
		] as const

		qualityLevels.forEach((quality) => {
			fc.assert(
				fc.property(
					titleArb,
					authorArb,
					bcp47Arb,
					(title, author, translationLang) => {
						const translations: TranslationCollection = {
							[translationLang]: {
								title: `${title} [${translationLang}]`,
								author: author,
								translator: "Test Translator",
								quality: quality,
							},
						}

						const element = Article({
							title,
							author,
							primaryLocale: "en-US",
							translations,
							disableLinkedData: true,
						})
						const html = renderToString(element)

						// Should include quality information in metadata
						assertEquals(html.includes(`data-quality="${quality}"`), true)
					},
				),
				{ numRuns: 3 },
			)
		})
	})
})

Deno.test("CreativeWork components generate locale-aware output", async (t) => {
	await t.step("components include locale-specific CSS classes", () => {
		fc.assert(
			fc.property(
				titleArb,
				bcp47Arb,
				(title, locale) => {
					const element = Book({
						title,
						locale,
						disableLinkedData: true,
					})
					const html = renderToString(element)

					// Should include locale-specific class
					assertEquals(html.includes(`locale-${locale}`), true)

					// Should include lang attribute
					assertEquals(html.includes(`lang="${locale}"`), true)
				},
			),
			{ numRuns: 15 },
		)
	})

	await t.step("components support right-to-left languages", () => {
		const rtlLanguages = ["ar-SA", "he-IL", "fa-IR"] as const

		rtlLanguages.forEach((rtlLang) => {
			fc.assert(
				fc.property(
					titleArb,
					(title) => {
						const element = Article({
							title,
							locale: rtlLang as any, // Type assertion for test
							disableLinkedData: true,
						})
						const html = renderToString(element)

						// Should include RTL language
						assertEquals(html.includes(`lang="${rtlLang}"`), true)
						assertEquals(html.includes(`locale-${rtlLang}`), true)
					},
				),
				{ numRuns: 2 },
			)
		})
	})

	await t.step("components maintain consistent language metadata", () => {
		fc.assert(
			fc.property(
				titleArb,
				authorArb,
				bcp47Arb,
				translationCollectionArb,
				(title, author, primaryLocale, translations) => {
					const element = CreativeWork({
						title,
						author,
						primaryLocale,
						translations,
						disableMicrodata: true,
					})
					const html = renderToString(element)
					const jsonLd = extractJsonLd(html)

					assertExists(jsonLd)
					const data = jsonLd as any

					// Primary language should be consistent
					assertExists(data.inLanguage)
					assertEquals(typeof data.inLanguage, "string")

					// Translation languages should match input
					if (data.workTranslation) {
						const translationLanguages = data.workTranslation.map((t: any) =>
							t.inLanguage
						)
						const inputLanguages = Object.keys(translations)

						assertEquals(translationLanguages.sort(), inputLanguages.sort())
					}
				},
			),
			{ numRuns: 10 },
		)
	})
})
