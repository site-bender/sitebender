import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.15.1"

import LocalBusiness from "../../metadata/CreativeWork/LocalBusiness/index.tsx"
import Product from "../../metadata/CreativeWork/Product/index.tsx"
import Review from "../../metadata/CreativeWork/Review/index.tsx"
// Import the components we'll implement
import WebPage from "../../metadata/CreativeWork/WebPage/index.tsx"
import Organization from "../../metadata/Organization/index.tsx"
import Person from "../../metadata/Person/index.tsx"

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
const nameArb = fc.string({ minLength: 1, maxLength: 100 })
const urlArb = fc.webUrl()
const emailArb = fc.emailAddress()
const phoneArb = fc.string({ minLength: 10, maxLength: 15 })
const addressArb = fc.record({
	streetAddress: fc.string({ minLength: 1, maxLength: 100 }),
	addressLocality: fc.string({ minLength: 1, maxLength: 50 }),
	addressRegion: fc.string({ minLength: 1, maxLength: 50 }),
	postalCode: fc.string({ minLength: 3, maxLength: 10 }),
	addressCountry: fc.string({ minLength: 2, maxLength: 2 }),
})
const priceArb = fc.float({ min: 0, max: 10000 })
const currencyArb = fc.constantFrom("USD", "EUR", "GBP", "JPY")
const ratingArb = fc.float({ min: 1, max: 5 })
const dateArb = fc.date({ min: new Date(1800, 0, 1), max: new Date() }).map(
	(d: Date) => d.toISOString().split("T")[0],
)

Deno.test("CreativeWork subtype components generate valid JSON-LD structured data", async (t) => {
	await t.step(
		"WebPage component generates complete JSON-LD with all properties",
		() => {
			fc.assert(
				fc.property(
					titleArb,
					urlArb,
					fc.record({
						description: fc.string({ minLength: 1, maxLength: 500 }),
						breadcrumb: fc.string({ minLength: 1, maxLength: 200 }),
						lastReviewed: dateArb,
						speakable: fc.boolean(),
						author: nameArb,
						publisher: nameArb,
					}),
					(title, url, props) => {
						const element = WebPage({
							title,
							url,
							...props,
							disableMicrodata: true, // Focus on JSON-LD
						})
						const html = renderToString(element)
						const jsonLd = extractJsonLd(html)

						assertExists(jsonLd)
						assertEquals((jsonLd as any)["@context"], "https://schema.org")
						assertEquals((jsonLd as any)["@type"], "WebPage")
						assertEquals((jsonLd as any).name, title)
						assertEquals((jsonLd as any).url, url)
						assertEquals((jsonLd as any).description, props.description)
						assertEquals((jsonLd as any).breadcrumb, props.breadcrumb)
						assertEquals((jsonLd as any).lastReviewed, props.lastReviewed)
						assertEquals((jsonLd as any).speakable, props.speakable)
						assertEquals((jsonLd as any).author?.name, props.author)
					},
				),
				{ numRuns: 15 },
			)
		},
	)

	await t.step(
		"Product component generates complete JSON-LD with all properties",
		() => {
			fc.assert(
				fc.property(
					titleArb,
					fc.record({
						brand: nameArb,
						price: priceArb,
						priceCurrency: currencyArb,
						availability: fc.constantFrom(
							"InStock",
							"OutOfStock",
							"PreOrder",
						) as fc.Arbitrary<"InStock" | "OutOfStock" | "PreOrder">,
						sku: fc.string({ minLength: 1, maxLength: 50 }),
						category: fc.string({ minLength: 1, maxLength: 50 }),
						description: fc.string({ minLength: 1, maxLength: 500 }),
						image: urlArb,
					}),
					(title, props) => {
						const element = Product({
							title,
							...props,
							disableMicrodata: true,
						})
						const html = renderToString(element)
						const jsonLd = extractJsonLd(html)

						assertExists(jsonLd)
						assertEquals((jsonLd as any)["@context"], "https://schema.org")
						assertEquals((jsonLd as any)["@type"], "Product")
						assertEquals((jsonLd as any).name, title)
						assertEquals((jsonLd as any).brand?.name, props.brand)
						assertEquals((jsonLd as any).offers?.price, props.price)
						assertEquals(
							(jsonLd as any).offers?.priceCurrency,
							props.priceCurrency,
						)
						assertEquals(
							(jsonLd as any).offers?.availability,
							`https://schema.org/${props.availability}`,
						)
						assertEquals((jsonLd as any).sku, props.sku)
						assertEquals((jsonLd as any).category, props.category)
						assertEquals((jsonLd as any).description, props.description)
						assertEquals((jsonLd as any).image, props.image)
					},
				),
				{ numRuns: 15 },
			)
		},
	)

	await t.step(
		"Review component generates complete JSON-LD with all properties",
		() => {
			fc.assert(
				fc.property(
					fc.record({
						reviewBody: fc.string({ minLength: 1, maxLength: 1000 }),
						author: nameArb,
						ratingValue: ratingArb,
						bestRating: fc.integer({ min: 5, max: 10 }),
						itemReviewed: titleArb,
						datePublished: dateArb,
					}),
					(props) => {
						const element = Review({
							...props,
							disableMicrodata: true,
						})
						const html = renderToString(element)
						const jsonLd = extractJsonLd(html)

						assertExists(jsonLd)
						assertEquals((jsonLd as any)["@context"], "https://schema.org")
						assertEquals((jsonLd as any)["@type"], "Review")
						assertEquals((jsonLd as any).reviewBody, props.reviewBody)
						assertEquals((jsonLd as any).author?.name, props.author)
						assertEquals(
							(jsonLd as any).reviewRating?.ratingValue,
							props.ratingValue,
						)
						assertEquals(
							(jsonLd as any).reviewRating?.bestRating,
							props.bestRating,
						)
						assertEquals((jsonLd as any).itemReviewed?.name, props.itemReviewed)
						assertEquals((jsonLd as any).datePublished, props.datePublished)
					},
				),
				{ numRuns: 15 },
			)
		},
	)

	await t.step(
		"LocalBusiness component generates complete JSON-LD with all properties",
		() => {
			fc.assert(
				fc.property(
					nameArb,
					fc.record({
						businessType: fc.constantFrom(
							"Restaurant",
							"Store",
							"AutoDealer",
							"Hotel",
							"Hospital",
						) as fc.Arbitrary<
							"Restaurant" | "Store" | "AutoDealer" | "Hotel" | "Hospital"
						>,
						address: addressArb,
						telephone: phoneArb,
						email: emailArb,
						url: urlArb,
						openingHours: fc.string({ minLength: 1, maxLength: 100 }),
						priceRange: fc.constantFrom(
							"$",
							"$$",
							"$$$",
							"$$$$",
						) as fc.Arbitrary<"$" | "$$" | "$$$" | "$$$$">,
						description: fc.string({ minLength: 1, maxLength: 500 }),
					}),
					(name, props) => {
						const element = LocalBusiness({
							name,
							...props,
							disableMicrodata: true,
						})
						const html = renderToString(element)
						const jsonLd = extractJsonLd(html)

						assertExists(jsonLd)
						assertEquals((jsonLd as any)["@context"], "https://schema.org")
						assertEquals((jsonLd as any)["@type"], props.businessType)
						assertEquals((jsonLd as any).name, name)
						assertEquals(
							(jsonLd as any).address?.streetAddress,
							props.address.streetAddress,
						)
						assertEquals(
							(jsonLd as any).address?.addressLocality,
							props.address.addressLocality,
						)
						assertEquals((jsonLd as any).telephone, props.telephone)
						assertEquals((jsonLd as any).email, props.email)
						assertEquals((jsonLd as any).url, props.url)
						assertEquals((jsonLd as any).openingHours, props.openingHours)
						assertEquals((jsonLd as any).priceRange, props.priceRange)
						assertEquals((jsonLd as any).description, props.description)
					},
				),
				{ numRuns: 15 },
			)
		},
	)
})

Deno.test("Thing subtype components generate valid JSON-LD structured data", async (t) => {
	await t.step(
		"Organization component generates complete JSON-LD with all properties",
		() => {
			fc.assert(
				fc.property(
					nameArb,
					fc.record({
						url: urlArb,
						description: fc.string({ minLength: 1, maxLength: 500 }),
						address: addressArb,
						telephone: phoneArb,
						email: emailArb,
						foundingDate: dateArb,
						numberOfEmployees: fc.integer({ min: 1, max: 100000 }),
						industry: fc.string({ minLength: 1, maxLength: 100 }),
						logo: urlArb,
					}),
					(name, props) => {
						const element = Organization({
							name,
							...props,
							disableMicrodata: true,
						})
						const html = renderToString(element)
						const jsonLd = extractJsonLd(html)

						assertExists(jsonLd)
						assertEquals((jsonLd as any)["@context"], "https://schema.org")
						assertEquals((jsonLd as any)["@type"], "Organization")
						assertEquals((jsonLd as any).name, name)
						assertEquals((jsonLd as any).url, props.url)
						assertEquals((jsonLd as any).description, props.description)
						assertEquals(
							(jsonLd as any).address?.streetAddress,
							props.address.streetAddress,
						)
						assertEquals((jsonLd as any).telephone, props.telephone)
						assertEquals((jsonLd as any).email, props.email)
						assertEquals((jsonLd as any).foundingDate, props.foundingDate)
						assertEquals(
							(jsonLd as any).numberOfEmployees,
							props.numberOfEmployees,
						)
						assertEquals((jsonLd as any).knowsAbout, props.industry)
						assertEquals((jsonLd as any).logo, props.logo)
					},
				),
				{ numRuns: 15 },
			)
		},
	)

	await t.step(
		"Person component generates complete JSON-LD with all properties",
		() => {
			fc.assert(
				fc.property(
					nameArb,
					fc.record({
						givenName: fc.string({ minLength: 1, maxLength: 50 }),
						familyName: fc.string({ minLength: 1, maxLength: 50 }),
						email: emailArb,
						telephone: phoneArb,
						url: urlArb,
						jobTitle: fc.string({ minLength: 1, maxLength: 100 }),
						worksFor: nameArb,
						birthDate: dateArb,
						nationality: fc.string({ minLength: 1, maxLength: 50 }),
						address: addressArb,
						image: urlArb,
					}),
					(name, props) => {
						const element = Person({
							name,
							...props,
							disableMicrodata: true,
						})
						const html = renderToString(element)
						const jsonLd = extractJsonLd(html)

						assertExists(jsonLd)
						assertEquals((jsonLd as any)["@context"], "https://schema.org")
						assertEquals((jsonLd as any)["@type"], "Person")
						assertEquals((jsonLd as any).name, name)
						assertEquals((jsonLd as any).givenName, props.givenName)
						assertEquals((jsonLd as any).familyName, props.familyName)
						assertEquals((jsonLd as any).email, props.email)
						assertEquals((jsonLd as any).telephone, props.telephone)
						assertEquals((jsonLd as any).url, props.url)
						assertEquals((jsonLd as any).jobTitle, props.jobTitle)
						assertEquals((jsonLd as any).worksFor?.name, props.worksFor)
						assertEquals((jsonLd as any).birthDate, props.birthDate)
						assertEquals((jsonLd as any).nationality, props.nationality)
						assertEquals(
							(jsonLd as any).address?.streetAddress,
							props.address.streetAddress,
						)
						assertEquals((jsonLd as any).image, props.image)
					},
				),
				{ numRuns: 15 },
			)
		},
	)
})

Deno.test("New components can disable JSON-LD generation", async (t) => {
	await t.step("WebPage component omits JSON-LD script when disabled", () => {
		fc.assert(
			fc.property(
				titleArb,
				urlArb,
				(title, url) => {
					const element = WebPage({
						title,
						url,
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

	await t.step(
		"Organization component omits JSON-LD script when disabled",
		() => {
			fc.assert(
				fc.property(
					nameArb,
					(name) => {
						const element = Organization({
							name,
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
		},
	)

	await t.step("Person component omits JSON-LD script when disabled", () => {
		fc.assert(
			fc.property(
				nameArb,
				(name) => {
					const element = Person({
						name,
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
})

Deno.test("New components generate proper microdata attributes", async (t) => {
	await t.step("Product component includes all microdata properties", () => {
		fc.assert(
			fc.property(
				titleArb,
				fc.record({
					brand: nameArb,
					price: priceArb,
					sku: fc.string({ minLength: 1, maxLength: 50 }),
				}),
				(title, props) => {
					const element = Product({
						title,
						...props,
						disableLinkedData: true,
					})
					const html = renderToString(element)

					// Should include microdata meta tags
					assertEquals(html.includes('<meta itemProp="brand"'), true)
					assertEquals(html.includes('<meta itemProp="sku"'), true)
					assertEquals(html.includes('<meta itemProp="price"'), true)
					assertEquals(html.includes(`content="${props.brand}"`), true)
					assertEquals(html.includes(`content="${props.sku}"`), true)
					assertEquals(html.includes(`content="${props.price}"`), true)
				},
			),
			{ numRuns: 15 },
		)
	})

	await t.step("LocalBusiness component includes address microdata", () => {
		fc.assert(
			fc.property(
				nameArb,
				addressArb,
				(name, address) => {
					const element = LocalBusiness({
						name,
						address,
						businessType: "Restaurant",
						disableLinkedData: true,
					})
					const html = renderToString(element)

					// Should include address microdata
					assertEquals(html.includes('<meta itemProp="streetAddress"'), true)
					assertEquals(html.includes('<meta itemProp="addressLocality"'), true)
					assertEquals(html.includes('<meta itemProp="addressRegion"'), true)
					assertEquals(html.includes('<meta itemProp="postalCode"'), true)
					assertEquals(
						html.includes(`content="${address.streetAddress}"`),
						true,
					)
					assertEquals(
						html.includes(`content="${address.addressLocality}"`),
						true,
					)
				},
			),
			{ numRuns: 15 },
		)
	})

	await t.step("components can disable microdata completely", () => {
		fc.assert(
			fc.property(
				nameArb,
				(name) => {
					const element = Organization({
						name,
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
})
