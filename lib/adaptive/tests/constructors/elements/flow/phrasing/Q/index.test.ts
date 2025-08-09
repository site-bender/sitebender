import { assertEquals, assertExists } from "@std/assert"

import Q from "../../../../../../constructors/elements/flow/phrasing/Q/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Q should create a basic q with no attributes or children", () => {
	const q = Q()([])
	assertEquals(q.tag, "Q")
	assertEquals(q.children, [])
	assertExists(q.attributes)
})

Deno.test("Q should create a q with cite attribute", () => {
	const q = Q({
		cite: "https://example.com/quote-source",
		id: "famous-quote",
	})([])

	assertEquals(q.tag, "Q")
	assertEquals(q.attributes["cite"], "https://example.com/quote-source")
	assertEquals(q.attributes["id"], "famous-quote")
})

Deno.test("Q should create a q with valid global attributes", () => {
	const q = Q({
		id: "shakespeare-quote",
		class: "quotation",
		title: "From Hamlet",
		lang: "en",
	})([])

	assertEquals(q.tag, "Q")
	assertEquals(q.attributes["id"], "shakespeare-quote")
	assertEquals(q.attributes["class"], "quotation")
	assertEquals(q.attributes["title"], "From Hamlet")
	assertEquals(q.attributes["lang"], "en")
})

Deno.test("Q should filter out invalid attributes", () => {
	const q = Q({
		cite: "https://example.com/source",
		href: "invalid-for-q",
		src: "invalid-for-q",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(q.tag, "Q")
	assertEquals(q.attributes["cite"], "https://example.com/source")
	assertEquals(q.attributes["href"], undefined)
	assertEquals(q.attributes["src"], undefined)
	assertEquals((q.attributes as any).invalidAttr, undefined)
})

Deno.test("Q should accept text content for quotes", () => {
	const text = TextNode("To be or not to be")
	const q = Q({ cite: "https://shakespeare.com/hamlet" })([text])

	assertEquals(q.tag, "Q")
	assertEquals(q.children.length, 1)
	assertEquals(q.children[0], text)
})

Deno.test("Q should handle phrasing content children", () => {
	const children = [
		TextNode("The "),
		{ tag: "Em", attributes: {}, children: [TextNode("best")] },
		TextNode(" way to predict the future is to invent it."),
	]
	const q = Q({ cite: "https://example.com/alan-kay" })(children)

	assertEquals(q.tag, "Q")
	assertEquals(q.children.length, 3)
	assertEquals((q.children[0] as any).tag, "TextNode")
	assertEquals((q.children[1] as any).tag, "Em")
	assertEquals((q.children[2] as any).tag, "TextNode")
})

Deno.test("Q should handle single child (not array)", () => {
	const text = TextNode("Hello, World!")
	const q = Q({ cite: "https://example.com/programming" })(text)

	assertEquals(q.tag, "Q")
	assertEquals(q.children.length, 1)
	assertEquals(q.children[0], text)
})

Deno.test("Q should handle special properties", () => {
	const q = Q({
		cite: "https://example.com/source",
		calculation: "qCalculation",
		dataset: { type: "inline-quote", author: "shakespeare" },
		display: "inline",
		scripts: ["quote-formatter.js"],
		stylesheets: ["quotes.css"],
	})([])

	assertEquals(q.tag, "Q")
	assertEquals((q as any).calculation, "qCalculation")
	assertEquals((q as any).dataset, {
		type: "inline-quote",
		author: "shakespeare",
	})
	assertEquals((q as any).display, "inline")
	assertEquals((q as any).scripts, ["quote-formatter.js"])
	assertEquals((q as any).stylesheets, ["quotes.css"])
})

Deno.test("Q should handle ARIA attributes", () => {
	const q = Q({
		cite: "https://example.com/source",
		aria: {
			label: "Inline quotation",
			describedby: "quote-attribution",
		},
	})([])

	assertEquals(q.tag, "Q")
	assertEquals(q.attributes["aria-label"], "Inline quotation")
	assertEquals(q.attributes["aria-describedby"], "quote-attribution")
})

Deno.test("Q should handle quotes with attribution", () => {
	const quoteContent = [
		TextNode("Stay hungry, stay foolish"),
	]
	const q = Q({
		cite: "https://example.com/steve-jobs",
		class: "inspirational-quote",
	})(quoteContent)

	assertEquals(q.tag, "Q")
	assertEquals(q.children.length, 1)
	assertEquals(q.attributes["cite"], "https://example.com/steve-jobs")
	assertEquals(q.attributes["class"], "inspirational-quote")
})

Deno.test("Q should handle empty children array", () => {
	const q = Q({ cite: "https://example.com/empty" })([])
	assertEquals(q.tag, "Q")
	assertEquals(q.children, [])
})
