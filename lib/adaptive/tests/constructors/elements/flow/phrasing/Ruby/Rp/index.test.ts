import { assertEquals, assertExists } from "@std/assert"

import Rp from "../../../../../../../constructors/elements/flow/phrasing/Ruby/Rp/index.ts"
import TextNode from "../../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Rp should create a basic rp with no attributes or children", () => {
	const rp = Rp()([])
	assertEquals(rp.tag, "Rp")
	assertEquals(rp.children, [])
	assertExists(rp.attributes)
})

Deno.test("Rp should create an rp with valid global attributes", () => {
	const rp = Rp({
		id: "ruby-parentheses",
		class: "fallback",
		title: "Ruby Parentheses Fallback",
		lang: "en",
	})([])

	assertEquals(rp.tag, "Rp")
	assertEquals(rp.attributes["id"], "ruby-parentheses")
	assertEquals(rp.attributes["class"], "fallback")
	assertEquals(rp.attributes["title"], "Ruby Parentheses Fallback")
	assertEquals(rp.attributes["lang"], "en")
})

Deno.test("Rp should filter out invalid attributes", () => {
	const rp = Rp({
		id: "valid",
		href: "invalid-for-rp",
		src: "invalid-for-rp",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(rp.tag, "Rp")
	assertEquals(rp.attributes["id"], "valid")
	assertEquals(rp.attributes["href"], undefined)
	assertEquals(rp.attributes["src"], undefined)
	assertEquals((rp.attributes as any).invalidAttr, undefined)
})

Deno.test("Rp should accept text content for parentheses", () => {
	const text = TextNode("(")
	const rp = Rp()([text])

	assertEquals(rp.tag, "Rp")
	assertEquals(rp.children.length, 1)
	assertEquals(rp.children[0], text)
})

Deno.test("Rp should handle closing parentheses", () => {
	const text = TextNode(")")
	const rp = Rp({ class: "closing" })([text])

	assertEquals(rp.tag, "Rp")
	assertEquals(rp.children.length, 1)
	assertEquals(rp.attributes["class"], "closing")
	assertEquals(rp.children[0], text)
})

Deno.test("Rp should handle text-only content (filtered)", () => {
	const text = TextNode("(")
	const rp = Rp()(text)

	assertEquals(rp.tag, "Rp")
	assertEquals(rp.children.length, 1)
	assertEquals(rp.children[0], text)
})

Deno.test("Rp should handle special properties", () => {
	const rp = Rp({
		calculation: "rpCalculation",
		dataset: { type: "ruby-fallback", bracket: "opening" },
		display: "none",
		scripts: ["ruby-fallback.js"],
		stylesheets: ["ruby.css"],
	})([])

	assertEquals(rp.tag, "Rp")
	assertEquals((rp as any).calculation, "rpCalculation")
	assertEquals((rp as any).dataset, {
		type: "ruby-fallback",
		bracket: "opening",
	})
	assertEquals((rp as any).display, "none")
	assertEquals((rp as any).scripts, ["ruby-fallback.js"])
	assertEquals((rp as any).stylesheets, ["ruby.css"])
})

Deno.test("Rp should handle ARIA attributes", () => {
	const rp = Rp({
		aria: {
			label: "Ruby parentheses",
			describedby: "fallback-explanation",
		},
	})([])

	assertEquals(rp.tag, "Rp")
	assertEquals(rp.attributes["aria-label"], "Ruby parentheses")
	assertEquals(rp.attributes["aria-describedby"], "fallback-explanation")
})

Deno.test("Rp should handle opening parentheses with semantic class", () => {
	const openParen = TextNode("(")
	const rp = Rp({ class: "ruby-opening" })([openParen])

	assertEquals(rp.tag, "Rp")
	assertEquals(rp.children.length, 1)
	assertEquals(rp.attributes["class"], "ruby-opening")
	assertEquals(rp.children[0], openParen)
})

Deno.test("Rp should handle different bracket types", () => {
	const brackets = ["(", ")", "[", "]", "【", "】"]

	brackets.forEach((bracket, index) => {
		const rp = Rp({ class: `bracket-${index}` })([TextNode(bracket)])
		assertEquals(rp.tag, "Rp")
		assertEquals(rp.children.length, 1)
		assertEquals((rp.children[0] as any).tag, "TextNode")
	})
})

Deno.test("Rp should handle empty children array", () => {
	const rp = Rp()([])
	assertEquals(rp.tag, "Rp")
	assertEquals(rp.children, [])
})
