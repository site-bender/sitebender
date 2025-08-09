import { assertEquals, assertExists } from "@std/assert"

import Abbr from "../../../../../../constructors/elements/flow/phrasing/Abbr/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Abbr should create a basic abbr with no attributes or children", () => {
	const abbr = Abbr()([])
	assertEquals(abbr.tag, "Abbr")
	assertEquals(abbr.children, [])
	assertExists(abbr.attributes)
})

Deno.test("Abbr should create an abbr with title attribute", () => {
	const abbr = Abbr({
		title: "HyperText Markup Language",
	})([])

	assertEquals(abbr.tag, "Abbr")
	assertEquals(abbr.attributes["title"], "HyperText Markup Language")
})

Deno.test("Abbr should create an abbr with valid global attributes", () => {
	const abbr = Abbr({
		id: "html-abbr",
		class: "tech-term",
		title: "HyperText Markup Language",
		lang: "en",
	})([])

	assertEquals(abbr.tag, "Abbr")
	assertEquals(abbr.attributes["id"], "html-abbr")
	assertEquals(abbr.attributes["class"], "tech-term")
	assertEquals(abbr.attributes["title"], "HyperText Markup Language")
	assertEquals(abbr.attributes["lang"], "en")
})

Deno.test("Abbr should filter out invalid attributes", () => {
	const abbr = Abbr({
		id: "valid",
		title: "Valid Title",
		href: "invalid-for-abbr",
		src: "invalid-for-abbr",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(abbr.tag, "Abbr")
	assertEquals(abbr.attributes["id"], "valid")
	assertEquals(abbr.attributes["title"], "Valid Title")
	assertEquals(abbr.attributes["href"], undefined)
	assertEquals(abbr.attributes["src"], undefined)
	assertEquals((abbr.attributes as any).invalidAttr, undefined)
})

Deno.test("Abbr should accept text content", () => {
	const text = TextNode("HTML")
	const abbr = Abbr({ title: "HyperText Markup Language" })([text])

	assertEquals(abbr.tag, "Abbr")
	assertEquals(abbr.children.length, 1)
	assertEquals(abbr.children[0], text)
})

Deno.test("Abbr should handle phrasing content children", () => {
	const children = [
		TextNode("CSS"),
		{ tag: "Sup", attributes: {}, children: [TextNode("3")] },
	]
	const abbr = Abbr({ title: "Cascading Style Sheets version 3" })(children)

	assertEquals(abbr.tag, "Abbr")
	assertEquals(abbr.children.length, 2)
	assertEquals((abbr.children[0] as any).tag, "TextNode")
	assertEquals((abbr.children[1] as any).tag, "Sup")
})

Deno.test("Abbr should handle single child (not array)", () => {
	const text = TextNode("API")
	const abbr = Abbr({ title: "Application Programming Interface" })(text)

	assertEquals(abbr.tag, "Abbr")
	assertEquals(abbr.children.length, 1)
	assertEquals(abbr.children[0], text)
})

Deno.test("Abbr should handle special properties", () => {
	const abbr = Abbr({
		title: "JavaScript",
		calculation: "abbrCalculation",
		dataset: { type: "programming-language", year: "1995" },
		display: "inline",
		scripts: ["abbr-tooltips.js"],
		stylesheets: ["abbr.css"],
	})([])

	assertEquals(abbr.tag, "Abbr")
	assertEquals((abbr as any).calculation, "abbrCalculation")
	assertEquals((abbr as any).dataset, {
		type: "programming-language",
		year: "1995",
	})
	assertEquals((abbr as any).display, "inline")
	assertEquals((abbr as any).scripts, ["abbr-tooltips.js"])
	assertEquals((abbr as any).stylesheets, ["abbr.css"])
})

Deno.test("Abbr should handle ARIA attributes", () => {
	const abbr = Abbr({
		title: "World Wide Web Consortium",
		aria: {
			label: "W3C organization",
			describedby: "w3c-description",
		},
	})([])

	assertEquals(abbr.tag, "Abbr")
	assertEquals(abbr.attributes["aria-label"], "W3C organization")
	assertEquals(abbr.attributes["aria-describedby"], "w3c-description")
})

Deno.test("Abbr should handle technical abbreviations", () => {
	const techTerms = [
		{ abbr: "JSON", full: "JavaScript Object Notation" },
		{ abbr: "REST", full: "Representational State Transfer" },
		{ abbr: "SQL", full: "Structured Query Language" },
		{ abbr: "XML", full: "eXtensible Markup Language" },
	]

	techTerms.forEach(({ abbr: term, full }) => {
		const abbr = Abbr({ title: full })([TextNode(term)])
		assertEquals(abbr.attributes["title"], full)
		assertEquals((abbr.children[0] as any).tag, "TextNode")
	})
})

Deno.test("Abbr should handle empty children array", () => {
	const abbr = Abbr({ title: "To Be Determined" })([])
	assertEquals(abbr.tag, "Abbr")
	assertEquals(abbr.children, [])
	assertEquals(abbr.attributes["title"], "To Be Determined")
})
