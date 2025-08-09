import { assertEquals, assertExists } from "@std/assert"

import H1 from "../../../../../../constructors/elements/flow/heading/H1/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("H1 should create a basic h1 with no attributes or children", () => {
	const h1 = H1()([])
	assertEquals(h1.tag, "H1")
	assertEquals(h1.children, [])
	assertExists(h1.attributes)
})

Deno.test("H1 should create an h1 with valid global attributes", () => {
	const h1 = H1({
		id: "main-heading",
		class: "h1-wrapper",
		title: "Main heading",
		lang: "en",
	})([])

	assertEquals(h1.tag, "H1")
	assertEquals(h1.attributes["id"], "main-heading")
	assertEquals(h1.attributes["class"], "h1-wrapper")
	assertEquals(h1.attributes["title"], "Main heading")
	assertEquals(h1.attributes["lang"], "en")
})

Deno.test("H1 should filter out invalid attributes", () => {
	const h1 = H1({
		id: "h1-content",
		class: "valid-class",
		invalidAttr: "should-be-filtered",
		onClick: "should-be-filtered",
	})([])

	assertEquals(h1.tag, "H1")
	assertEquals(h1.attributes["id"], "h1-content")
	assertEquals(h1.attributes["class"], "valid-class")
	// Invalid attributes should not exist
	assertEquals("invalidAttr" in h1.attributes, false)
	assertEquals("onClick" in h1.attributes, false)
})

Deno.test("H1 should accept valid role attributes", () => {
	const h1 = H1({
		id: "h1-content",
		role: "tab",
	})([])

	assertEquals(h1.tag, "H1")
	assertEquals(h1.attributes["id"], "h1-content")
	assertEquals(h1.attributes["role"], "tab")
})

Deno.test("H1 should accept other valid role values", () => {
	const h1_1 = H1({ role: "presentation" })([])
	assertEquals(h1_1.attributes["role"], "presentation")

	const h1_2 = H1({ role: "none" })([])
	assertEquals(h1_2.attributes["role"], "none")
})

Deno.test("H1 should filter out invalid role values", () => {
	const h1 = H1({
		id: "h1-content",
		role: "invalid-role",
	})([])

	assertEquals(h1.tag, "H1")
	assertEquals(h1.attributes["id"], "h1-content")
	// Invalid role should not exist
	assertEquals("role" in h1.attributes, false)
})

Deno.test("H1 should accept text content", () => {
	const h1 = H1({})("Main Heading Text")

	assertEquals(h1.tag, "H1")
	assertEquals(h1.children.length, 1)
	assertEquals(h1.children[0].tag, "TextNode")
})

Deno.test("H1 should accept valid phrasing content children", () => {
	const child1 = TextNode("Hello")
	const child2 = TextNode("World")
	const h1 = H1({})([child1, child2])

	assertEquals(h1.tag, "H1")
	assertEquals(h1.children.length, 2)
	assertEquals(h1.children[0], child1)
	assertEquals(h1.children[1], child2)
})

Deno.test("H1 should handle special properties", () => {
	const h1 = H1({
		id: "h1-content",
		calculation: { formula: "2 + 2" },
		dataset: { custom: "value" },
		display: "block",
		format: "html",
		scripts: ["script1.js"],
		stylesheets: ["style1.css"],
	})([])

	assertEquals(h1.tag, "H1")
	assertEquals(h1.attributes["id"], "h1-content")
	assertExists(h1.calculation)
	assertExists(h1.dataset)
	assertExists(h1.display)
	assertExists(h1.format)
	assertExists(h1.scripts)
	assertExists(h1.stylesheets)
})

Deno.test("H1 should handle ARIA attributes", () => {
	const h1 = H1({
		id: "h1-content",
		aria: {
			label: "Main heading",
			describedby: "h1-description",
		},
		role: "tab",
	})([])

	assertEquals(h1.tag, "H1")
	assertEquals(h1.attributes["id"], "h1-content")
	assertEquals(h1.attributes["aria-label"], "Main heading")
	assertEquals(h1.attributes["aria-describedby"], "h1-description")
	assertEquals(h1.attributes["role"], "tab")
})
