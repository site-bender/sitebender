import { assertEquals, assertExists } from "@std/assert"

import H2 from "../../../../../../constructors/elements/flow/heading/H2/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("H2 should create a basic h2 with no attributes or children", () => {
	const h2 = H2()([])
	assertEquals(h2.tag, "H2")
	assertEquals(h2.children, [])
	assertExists(h2.attributes)
})

Deno.test("H2 should create an h2 with valid global attributes", () => {
	const h2 = H2({
		id: "section-heading",
		class: "h2-wrapper",
		title: "Section heading",
		lang: "en",
	})([])

	assertEquals(h2.tag, "H2")
	assertEquals(h2.attributes["id"], "section-heading")
	assertEquals(h2.attributes["class"], "h2-wrapper")
	assertEquals(h2.attributes["title"], "Section heading")
	assertEquals(h2.attributes["lang"], "en")
})

Deno.test("H2 should accept valid role attributes", () => {
	const h2 = H2({
		id: "h2-content",
		role: "tab",
	})([])

	assertEquals(h2.tag, "H2")
	assertEquals(h2.attributes["id"], "h2-content")
	assertEquals(h2.attributes["role"], "tab")
})

Deno.test("H2 should accept text content", () => {
	const h2 = H2({})("Section Heading Text")

	assertEquals(h2.tag, "H2")
	assertEquals(h2.children.length, 1)
	assertEquals(h2.children[0].tag, "TextNode")
})

Deno.test("H2 should accept valid phrasing content children", () => {
	const child1 = TextNode("Hello")
	const child2 = TextNode("World")
	const h2 = H2({})([child1, child2])

	assertEquals(h2.tag, "H2")
	assertEquals(h2.children.length, 2)
	assertEquals(h2.children[0], child1)
	assertEquals(h2.children[1], child2)
})
