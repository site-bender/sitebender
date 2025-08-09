import { assertEquals, assertExists } from "@std/assert"

import H5 from "../../../../../../constructors/elements/flow/heading/H5/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("H5 should create a basic h5 with no attributes or children", () => {
	const h5 = H5()([])
	assertEquals(h5.tag, "H5")
	assertEquals(h5.children, [])
	assertExists(h5.attributes)
})

Deno.test("H5 should create an h5 with valid global attributes", () => {
	const h5 = H5({
		id: "detail-heading",
		class: "h5-wrapper",
		title: "Detail heading",
		lang: "en",
	})([])

	assertEquals(h5.tag, "H5")
	assertEquals(h5.attributes["id"], "detail-heading")
	assertEquals(h5.attributes["class"], "h5-wrapper")
	assertEquals(h5.attributes["title"], "Detail heading")
	assertEquals(h5.attributes["lang"], "en")
})

Deno.test("H5 should accept valid role attributes", () => {
	const h5 = H5({
		id: "h5-content",
		role: "tab",
	})([])

	assertEquals(h5.tag, "H5")
	assertEquals(h5.attributes["id"], "h5-content")
	assertEquals(h5.attributes["role"], "tab")
})

Deno.test("H5 should accept text content", () => {
	const h5 = H5({})("Detail Heading Text")

	assertEquals(h5.tag, "H5")
	assertEquals(h5.children.length, 1)
	assertEquals(h5.children[0].tag, "TextNode")
})

Deno.test("H5 should accept valid phrasing content children", () => {
	const child1 = TextNode("Hello")
	const child2 = TextNode("World")
	const h5 = H5({})([child1, child2])

	assertEquals(h5.tag, "H5")
	assertEquals(h5.children.length, 2)
	assertEquals(h5.children[0], child1)
	assertEquals(h5.children[1], child2)
})
