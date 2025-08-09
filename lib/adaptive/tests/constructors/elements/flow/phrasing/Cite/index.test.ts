import { assertEquals, assertExists } from "@std/assert"

import Cite from "../../../../../../constructors/elements/flow/phrasing/Cite/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Cite should create a basic cite with no attributes or children", () => {
	const cite = Cite()([])
	assertEquals(cite.tag, "Cite")
	assertEquals(cite.children, [])
	assertExists(cite.attributes)
})

Deno.test("Cite should create a cite with valid global attributes", () => {
	const cite = Cite({
		id: "book-citation",
		class: "reference",
		title: "Book Reference",
		lang: "en",
	})([])

	assertEquals(cite.tag, "Cite")
	assertEquals(cite.attributes["id"], "book-citation")
	assertEquals(cite.attributes["class"], "reference")
	assertEquals(cite.attributes["title"], "Book Reference")
	assertEquals(cite.attributes["lang"], "en")
})

Deno.test("Cite should filter out invalid attributes", () => {
	const cite = Cite({
		id: "valid",
		href: "invalid-for-cite",
		src: "invalid-for-cite",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(cite.tag, "Cite")
	assertEquals(cite.attributes["id"], "valid")
	assertEquals(cite.attributes["href"], undefined)
	assertEquals(cite.attributes["src"], undefined)
	assertEquals((cite.attributes as any).invalidAttr, undefined)
})

Deno.test("Cite should accept text content", () => {
	const text = TextNode("The Art of Computer Programming")
	const cite = Cite()([text])

	assertEquals(cite.tag, "Cite")
	assertEquals(cite.children.length, 1)
	assertEquals(cite.children[0], text)
})

Deno.test("Cite should handle phrasing content children", () => {
	const children = [
		{ tag: "Em", attributes: {}, children: [TextNode("Design Patterns")] },
		TextNode(" by the Gang of Four"),
	]
	const cite = Cite()(children)

	assertEquals(cite.tag, "Cite")
	assertEquals(cite.children.length, 2)
	assertEquals((cite.children[0] as any).tag, "Em")
	assertEquals((cite.children[1] as any).tag, "TextNode")
})

Deno.test("Cite should handle single child (not array)", () => {
	const text = TextNode("Clean Code")
	const cite = Cite()(text)

	assertEquals(cite.tag, "Cite")
	assertEquals(cite.children.length, 1)
	assertEquals(cite.children[0], text)
})

Deno.test("Cite should handle special properties", () => {
	const cite = Cite({
		calculation: "citeCalculation",
		dataset: { type: "book", year: "2008", author: "martin" },
		display: "inline",
		scripts: ["citation-formatter.js"],
		stylesheets: ["citations.css"],
	})([])

	assertEquals(cite.tag, "Cite")
	assertEquals((cite as any).calculation, "citeCalculation")
	assertEquals((cite as any).dataset, {
		type: "book",
		year: "2008",
		author: "martin",
	})
	assertEquals((cite as any).display, "inline")
	assertEquals((cite as any).scripts, ["citation-formatter.js"])
	assertEquals((cite as any).stylesheets, ["citations.css"])
})

Deno.test("Cite should handle ARIA attributes", () => {
	const cite = Cite({
		aria: {
			label: "Book citation",
			describedby: "citation-details",
		},
	})([])

	assertEquals(cite.tag, "Cite")
	assertEquals(cite.attributes["aria-label"], "Book citation")
	assertEquals(cite.attributes["aria-describedby"], "citation-details")
})

Deno.test("Cite should handle different types of citations", () => {
	const citations = [
		"JavaScript: The Good Parts",
		"MDN Web Docs",
		"W3C HTML Specification",
		"A List Apart Article",
	]

	citations.forEach((title) => {
		const cite = Cite()([TextNode(title)])
		assertEquals(cite.tag, "Cite")
		assertEquals((cite.children[0] as any).tag, "TextNode")
	})
})

Deno.test("Cite should handle complex citation content", () => {
	const complexCitation = [
		{
			tag: "Strong",
			attributes: {},
			children: [TextNode("The Pragmatic Programmer")],
		},
		TextNode(" by "),
		{
			tag: "Span",
			attributes: { class: "author" },
			children: [TextNode("Andy Hunt and Dave Thomas")],
		},
	]
	const cite = Cite({ class: "book-citation" })(complexCitation)

	assertEquals(cite.tag, "Cite")
	assertEquals(cite.children.length, 3)
	assertEquals(cite.attributes["class"], "book-citation")
	assertEquals((cite.children[0] as any).tag, "Strong")
	assertEquals((cite.children[1] as any).tag, "TextNode")
	assertEquals((cite.children[2] as any).tag, "Span")
})

Deno.test("Cite should handle empty children array", () => {
	const cite = Cite()([])
	assertEquals(cite.tag, "Cite")
	assertEquals(cite.children, [])
})
