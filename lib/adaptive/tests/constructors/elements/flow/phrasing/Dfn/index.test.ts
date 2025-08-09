import { assertEquals, assertExists } from "@std/assert"

import Dfn from "../../../../../../constructors/elements/flow/phrasing/Dfn/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Dfn should create a basic dfn with no attributes or children", () => {
	const dfn = Dfn()([])
	assertEquals(dfn.tag, "Dfn")
	assertEquals(dfn.children, [])
	assertExists(dfn.attributes)
})

Deno.test("Dfn should create a dfn with title attribute", () => {
	const dfn = Dfn({
		title: "Application Programming Interface",
	})([])

	assertEquals(dfn.tag, "Dfn")
	assertEquals(dfn.attributes["title"], "Application Programming Interface")
})

Deno.test("Dfn should create a dfn with valid global attributes", () => {
	const dfn = Dfn({
		id: "api-definition",
		class: "term-definition",
		title: "Application Programming Interface",
		lang: "en",
	})([])

	assertEquals(dfn.tag, "Dfn")
	assertEquals(dfn.attributes["id"], "api-definition")
	assertEquals(dfn.attributes["class"], "term-definition")
	assertEquals(dfn.attributes["title"], "Application Programming Interface")
	assertEquals(dfn.attributes["lang"], "en")
})

Deno.test("Dfn should filter out invalid attributes", () => {
	const dfn = Dfn({
		id: "valid",
		title: "Valid Definition",
		href: "invalid-for-dfn",
		src: "invalid-for-dfn",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(dfn.tag, "Dfn")
	assertEquals(dfn.attributes["id"], "valid")
	assertEquals(dfn.attributes["title"], "Valid Definition")
	assertEquals(dfn.attributes["href"], undefined)
	assertEquals(dfn.attributes["src"], undefined)
	assertEquals((dfn.attributes as any).invalidAttr, undefined)
})

Deno.test("Dfn should accept text content", () => {
	const text = TextNode("API")
	const dfn = Dfn({ title: "Application Programming Interface" })([text])

	assertEquals(dfn.tag, "Dfn")
	assertEquals(dfn.children.length, 1)
	assertEquals(dfn.children[0], text)
})

Deno.test("Dfn should handle phrasing content children", () => {
	const children = [
		{
			tag: "Abbr",
			attributes: { title: "HyperText Markup Language" },
			children: [TextNode("HTML")],
		},
		TextNode(" specification"),
	]
	const dfn = Dfn()(children)

	assertEquals(dfn.tag, "Dfn")
	assertEquals(dfn.children.length, 2)
	assertEquals((dfn.children[0] as any).tag, "Abbr")
	assertEquals((dfn.children[1] as any).tag, "TextNode")
})

Deno.test("Dfn should handle single child (not array)", () => {
	const text = TextNode("REST")
	const dfn = Dfn({ title: "Representational State Transfer" })(text)

	assertEquals(dfn.tag, "Dfn")
	assertEquals(dfn.children.length, 1)
	assertEquals(dfn.children[0], text)
})

Deno.test("Dfn should handle special properties", () => {
	const dfn = Dfn({
		title: "Cascading Style Sheets",
		calculation: "dfnCalculation",
		dataset: { type: "web-technology", category: "styling" },
		display: "inline",
		scripts: ["definition-tooltips.js"],
		stylesheets: ["definitions.css"],
	})([])

	assertEquals(dfn.tag, "Dfn")
	assertEquals((dfn as any).calculation, "dfnCalculation")
	assertEquals((dfn as any).dataset, {
		type: "web-technology",
		category: "styling",
	})
	assertEquals((dfn as any).display, "inline")
	assertEquals((dfn as any).scripts, ["definition-tooltips.js"])
	assertEquals((dfn as any).stylesheets, ["definitions.css"])
})

Deno.test("Dfn should handle ARIA attributes", () => {
	const dfn = Dfn({
		title: "JavaScript Object Notation",
		aria: {
			label: "JSON definition",
			describedby: "json-explanation",
		},
	})([])

	assertEquals(dfn.tag, "Dfn")
	assertEquals(dfn.attributes["aria-label"], "JSON definition")
	assertEquals(dfn.attributes["aria-describedby"], "json-explanation")
})

Deno.test("Dfn should handle technical definitions", () => {
	const techTerms = [
		{ term: "DOM", definition: "Document Object Model" },
		{ term: "SPA", definition: "Single Page Application" },
		{ term: "PWA", definition: "Progressive Web Application" },
		{ term: "CDN", definition: "Content Delivery Network" },
	]

	techTerms.forEach(({ term, definition }) => {
		const dfn = Dfn({ title: definition })([TextNode(term)])
		assertEquals(dfn.attributes["title"], definition)
		assertEquals((dfn.children[0] as any).tag, "TextNode")
	})
})

Deno.test("Dfn should handle complex definition content", () => {
	const complexDefinition = [
		{ tag: "Strong", attributes: {}, children: [TextNode("GraphQL")] },
		TextNode(" "),
		{ tag: "Sub", attributes: {}, children: [TextNode("v1.0")] },
	]
	const dfn = Dfn({
		title: "A query language for APIs",
		class: "api-definition",
	})(complexDefinition)

	assertEquals(dfn.tag, "Dfn")
	assertEquals(dfn.children.length, 3)
	assertEquals(dfn.attributes["title"], "A query language for APIs")
	assertEquals(dfn.attributes["class"], "api-definition")
	assertEquals((dfn.children[0] as any).tag, "Strong")
	assertEquals((dfn.children[1] as any).tag, "TextNode")
	assertEquals((dfn.children[2] as any).tag, "Sub")
})

Deno.test("Dfn should handle empty children array", () => {
	const dfn = Dfn({ title: "To Be Defined" })([])
	assertEquals(dfn.tag, "Dfn")
	assertEquals(dfn.children, [])
	assertEquals(dfn.attributes["title"], "To Be Defined")
})
