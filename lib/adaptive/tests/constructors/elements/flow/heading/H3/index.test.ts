import { assertEquals, assertExists } from "@std/assert"

import H3 from "../../../../../../constructors/elements/flow/heading/H3/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("H3 should create a basic h3 with no attributes or children", () => {
	const h3 = H3()([])
	assertEquals(h3.tag, "H3")
	assertEquals(h3.children, [])
	assertExists(h3.attributes)
})

Deno.test("H3 should create an h3 with valid global attributes", () => {
	const h3 = H3({
		id: "subsection-heading",
		class: "h3-wrapper",
		title: "Subsection heading",
		lang: "en",
	})([])

	assertEquals(h3.tag, "H3")
	assertEquals(h3.attributes["id"], "subsection-heading")
	assertEquals(h3.attributes["class"], "h3-wrapper")
	assertEquals(h3.attributes["title"], "Subsection heading")
	assertEquals(h3.attributes["lang"], "en")
})

Deno.test("H3 should accept valid role attributes", () => {
	const h3 = H3({
		id: "h3-content",
		role: "tab",
	})([])

	assertEquals(h3.tag, "H3")
	assertEquals(h3.attributes["id"], "h3-content")
	assertEquals(h3.attributes["role"], "tab")
})

Deno.test("H3 should accept text content", () => {
	const h3 = H3({})("Subsection Heading Text")

	assertEquals(h3.tag, "H3")
	assertEquals(h3.children.length, 1)
	assertEquals(h3.children[0].tag, "TextNode")
})

Deno.test("H3 should accept valid phrasing content children", () => {
	const child1 = TextNode("Hello")
	const child2 = TextNode("World")
	const h3 = H3({})([child1, child2])

	assertEquals(h3.tag, "H3")
	assertEquals(h3.children.length, 2)
	assertEquals(h3.children[0], child1)
	assertEquals(h3.children[1], child2)
})
