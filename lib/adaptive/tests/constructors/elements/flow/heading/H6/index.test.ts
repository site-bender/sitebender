import { assertEquals, assertExists } from "@std/assert"

import H6 from "../../../../../../constructors/elements/flow/heading/H6/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("H6 should create a basic h6 with no attributes or children", () => {
	const h6 = H6()([])
	assertEquals(h6.tag, "H6")
	assertEquals(h6.children, [])
	assertExists(h6.attributes)
})

Deno.test("H6 should create an h6 with valid global attributes", () => {
	const h6 = H6({
		id: "minor-heading",
		class: "h6-wrapper",
		title: "Minor heading",
		lang: "en",
	})([])

	assertEquals(h6.tag, "H6")
	assertEquals(h6.attributes["id"], "minor-heading")
	assertEquals(h6.attributes["class"], "h6-wrapper")
	assertEquals(h6.attributes["title"], "Minor heading")
	assertEquals(h6.attributes["lang"], "en")
})

Deno.test("H6 should accept valid role attributes", () => {
	const h6 = H6({
		id: "h6-content",
		role: "tab",
	})([])

	assertEquals(h6.tag, "H6")
	assertEquals(h6.attributes["id"], "h6-content")
	assertEquals(h6.attributes["role"], "tab")
})

Deno.test("H6 should accept text content", () => {
	const h6 = H6({})("Minor Heading Text")

	assertEquals(h6.tag, "H6")
	assertEquals(h6.children.length, 1)
	assertEquals(h6.children[0].tag, "TextNode")
})

Deno.test("H6 should accept valid phrasing content children", () => {
	const child1 = TextNode("Hello")
	const child2 = TextNode("World")
	const h6 = H6({})([child1, child2])

	assertEquals(h6.tag, "H6")
	assertEquals(h6.children.length, 2)
	assertEquals(h6.children[0], child1)
	assertEquals(h6.children[1], child2)
})
