import { assertEquals, assertExists } from "@std/assert"

import P from "../../../../../../constructors/elements/flow/miscellaneous/P/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("P should create a basic paragraph with no attributes or children", () => {
	const p = P()([])
	assertEquals(p.tag, "P")
	assertEquals(p.children, [])
	assertExists(p.attributes)
})

Deno.test("P should create a paragraph with valid global attributes", () => {
	const p = P({
		id: "my-paragraph",
		class: "text-content",
		title: "A test paragraph",
		lang: "en",
	})([])

	assertEquals(p.tag, "P")
	assertEquals(p.attributes["id"], "my-paragraph")
	assertEquals(p.attributes["class"], "text-content")
	assertEquals(p.attributes["title"], "A test paragraph")
	assertEquals(p.attributes["lang"], "en")
})

Deno.test("P should filter out invalid attributes", () => {
	const p = P({
		id: "valid",
		class: "valid-class",
		invalidAttr: "should-be-filtered",
	})([])

	assertEquals(p.tag, "P")
	assertEquals(p.attributes["id"], "valid")
	assertEquals(p.attributes["class"], "valid-class")
	// Invalid attributes should not exist
	assertEquals("invalidAttr" in p.attributes, false)
})

Deno.test("P should accept valid phrasing content children", () => {
	const child1 = TextNode("Hello ")
	const child2 = TextNode("world!")
	const p = P({})([child1, child2])

	assertEquals(p.tag, "P")
	assertEquals(p.children.length, 2)
	assertEquals(p.children[0], child1)
	assertEquals(p.children[1], child2)
})

Deno.test("P should handle single child (not array)", () => {
	const child = TextNode("Single paragraph text")
	const p = P({})(child)

	assertEquals(p.tag, "P")
	assertEquals(p.children.length, 1)
	assertEquals(p.children[0], child)
})

Deno.test("P should handle special properties", () => {
	const p = P({
		id: "special-p",
		calculation: { formula: "2 + 2" },
		dataset: { custom: "value" },
		display: "block",
		format: "html",
		scripts: ["script1.js"],
		stylesheets: ["style1.css"],
	})([])

	assertEquals(p.tag, "P")
	assertEquals(p.attributes["id"], "special-p")
	assertExists(p.calculation)
	assertExists(p.dataset)
	assertExists(p.display)
	assertExists(p.format)
	assertExists(p.scripts)
	assertExists(p.stylesheets)
})

Deno.test("P should handle ARIA attributes", () => {
	const p = P({
		id: "aria-paragraph",
		aria: {
			label: "Test paragraph",
			describedby: "description-id",
		},
	})([])

	assertEquals(p.tag, "P")
	assertEquals(p.attributes["id"], "aria-paragraph")
	assertEquals(p.attributes["aria-label"], "Test paragraph")
	assertEquals(p.attributes["aria-describedby"], "description-id")
})
