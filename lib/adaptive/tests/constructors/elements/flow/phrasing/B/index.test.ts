import { assertEquals, assertExists } from "@std/assert"

import B from "../../../../../../constructors/elements/flow/phrasing/B/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("B should create a basic b with no attributes or children", () => {
	const b = B()([])
	assertEquals(b.tag, "B")
	assertEquals(b.children, [])
	assertExists(b.attributes)
})

Deno.test("B should create a b with valid global attributes", () => {
	const b = B({
		id: "bold-text",
		class: "b-wrapper",
		title: "Bold content",
		lang: "en",
	})([])

	assertEquals(b.tag, "B")
	assertEquals(b.attributes["id"], "bold-text")
	assertEquals(b.attributes["class"], "b-wrapper")
	assertEquals(b.attributes["title"], "Bold content")
	assertEquals(b.attributes["lang"], "en")
})

Deno.test("B should filter out invalid attributes", () => {
	const b = B({
		id: "b-content",
		class: "valid-class",
		invalidAttr: "should-be-filtered",
		onClick: "should-be-filtered",
	})([])

	assertEquals(b.tag, "B")
	assertEquals(b.attributes["id"], "b-content")
	assertEquals(b.attributes["class"], "valid-class")
	// Invalid attributes should not exist
	assertEquals("invalidAttr" in b.attributes, false)
	assertEquals("onClick" in b.attributes, false)
})

Deno.test("B should accept valid phrasing content children", () => {
	const child1 = TextNode("Hello")
	const child2 = TextNode("World")
	const b = B({})([child1, child2])

	assertEquals(b.tag, "B")
	assertEquals(b.children.length, 2)
	assertEquals(b.children[0], child1)
	assertEquals(b.children[1], child2)
})

Deno.test("B should handle single child (not array)", () => {
	const child = TextNode("Single child")
	const b = B({})(child)

	assertEquals(b.tag, "B")
	assertEquals(b.children.length, 1)
	assertEquals(b.children[0], child)
})

Deno.test("B should handle special properties", () => {
	const b = B({
		id: "b-content",
		calculation: { formula: "2 + 2" },
		dataset: { custom: "value" },
		display: "inline",
		format: "html",
		scripts: ["script1.js"],
		stylesheets: ["style1.css"],
	})([])

	assertEquals(b.tag, "B")
	assertEquals(b.attributes["id"], "b-content")
	assertExists(b.calculation)
	assertExists(b.dataset)
	assertExists(b.display)
	assertExists(b.format)
	assertExists(b.scripts)
	assertExists(b.stylesheets)
})

Deno.test("B should handle ARIA attributes", () => {
	const b = B({
		id: "b-content",
		aria: {
			label: "Bold content",
			describedby: "b-description",
		},
		role: "text",
	})([])

	assertEquals(b.tag, "B")
	assertEquals(b.attributes["id"], "b-content")
	assertEquals(b.attributes["aria-label"], "Bold content")
	assertEquals(b.attributes["aria-describedby"], "b-description")
	assertEquals(b.attributes["role"], "text")
})

Deno.test("B should filter children using isPhrasingContent validation", () => {
	const validChild = {
		tag: "I",
		attributes: {},
		children: [],
	}

	const invalidChild = {
		tag: "Div", // Div is flow content, not phrasing content
		attributes: {},
		children: [],
	}

	const b = B({})([validChild, invalidChild])

	assertEquals(b.tag, "B")
	assertEquals(b.children.length, 1) // Only valid phrasing child should remain
	assertEquals(b.children[0], validChild)
})
