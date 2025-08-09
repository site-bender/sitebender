import { assertEquals, assertExists } from "@std/assert"

import H4 from "../../../../../../constructors/elements/flow/heading/H4/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("H4 should create a basic h4 with no attributes or children", () => {
	const h4 = H4()([])
	assertEquals(h4.tag, "H4")
	assertEquals(h4.children, [])
	assertExists(h4.attributes)
})

Deno.test("H4 should create an h4 with valid global attributes", () => {
	const h4 = H4({
		id: "sub-subsection-heading",
		class: "h4-wrapper",
		title: "Sub-subsection heading",
		lang: "en",
	})([])

	assertEquals(h4.tag, "H4")
	assertEquals(h4.attributes["id"], "sub-subsection-heading")
	assertEquals(h4.attributes["class"], "h4-wrapper")
	assertEquals(h4.attributes["title"], "Sub-subsection heading")
	assertEquals(h4.attributes["lang"], "en")
})

Deno.test("H4 should accept valid role attributes", () => {
	const h4 = H4({
		id: "h4-content",
		role: "tab",
	})([])

	assertEquals(h4.tag, "H4")
	assertEquals(h4.attributes["id"], "h4-content")
	assertEquals(h4.attributes["role"], "tab")
})

Deno.test("H4 should accept text content", () => {
	const h4 = H4({})("Sub-subsection Heading Text")

	assertEquals(h4.tag, "H4")
	assertEquals(h4.children.length, 1)
	assertEquals(h4.children[0].tag, "TextNode")
})

Deno.test("H4 should accept valid phrasing content children", () => {
	const child1 = TextNode("Hello")
	const child2 = TextNode("World")
	const h4 = H4({})([child1, child2])

	assertEquals(h4.tag, "H4")
	assertEquals(h4.children.length, 2)
	assertEquals(h4.children[0], child1)
	assertEquals(h4.children[1], child2)
})
