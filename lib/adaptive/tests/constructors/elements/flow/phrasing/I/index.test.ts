import { assertEquals, assertExists } from "@std/assert"

import I from "../../../../../../constructors/elements/flow/phrasing/I/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("I should create a basic i with no attributes or children", () => {
	const i = I()([])
	assertEquals(i.tag, "I")
	assertEquals(i.children, [])
	assertExists(i.attributes)
})

Deno.test("I should create an i with valid global attributes", () => {
	const i = I({
		id: "italic-text",
		class: "i-wrapper",
		title: "Italic content",
		lang: "en",
	})([])

	assertEquals(i.tag, "I")
	assertEquals(i.attributes["id"], "italic-text")
	assertEquals(i.attributes["class"], "i-wrapper")
	assertEquals(i.attributes["title"], "Italic content")
	assertEquals(i.attributes["lang"], "en")
})

Deno.test("I should filter out invalid attributes", () => {
	const i = I({
		id: "i-content",
		class: "valid-class",
		invalidAttr: "should-be-filtered",
		onClick: "should-be-filtered",
	})([])

	assertEquals(i.tag, "I")
	assertEquals(i.attributes["id"], "i-content")
	assertEquals(i.attributes["class"], "valid-class")
	// Invalid attributes should not exist
	assertEquals("invalidAttr" in i.attributes, false)
	assertEquals("onClick" in i.attributes, false)
})

Deno.test("I should accept valid phrasing content children", () => {
	const child1 = TextNode("Hello")
	const child2 = TextNode("World")
	const i = I({})([child1, child2])

	assertEquals(i.tag, "I")
	assertEquals(i.children.length, 2)
	assertEquals(i.children[0], child1)
	assertEquals(i.children[1], child2)
})

Deno.test("I should handle single child (not array)", () => {
	const child = TextNode("Single child")
	const i = I({})(child)

	assertEquals(i.tag, "I")
	assertEquals(i.children.length, 1)
	assertEquals(i.children[0], child)
})

Deno.test("I should handle special properties", () => {
	const i = I({
		id: "i-content",
		calculation: { formula: "2 + 2" },
		dataset: { custom: "value" },
		display: "inline",
		format: "html",
		scripts: ["script1.js"],
		stylesheets: ["style1.css"],
	})([])

	assertEquals(i.tag, "I")
	assertEquals(i.attributes["id"], "i-content")
	assertExists(i.calculation)
	assertExists(i.dataset)
	assertExists(i.display)
	assertExists(i.format)
	assertExists(i.scripts)
	assertExists(i.stylesheets)
})

Deno.test("I should handle ARIA attributes", () => {
	const i = I({
		id: "i-content",
		aria: {
			label: "Italic content",
			describedby: "i-description",
		},
		role: "text",
	})([])

	assertEquals(i.tag, "I")
	assertEquals(i.attributes["id"], "i-content")
	assertEquals(i.attributes["aria-label"], "Italic content")
	assertEquals(i.attributes["aria-describedby"], "i-description")
	assertEquals(i.attributes["role"], "text")
})

Deno.test("I should filter children using isPhrasingContent validation", () => {
	const validChild = {
		tag: "B",
		attributes: {},
		children: [],
	}

	const invalidChild = {
		tag: "Div", // Div is flow content, not phrasing content
		attributes: {},
		children: [],
	}

	const i = I({})([validChild, invalidChild])

	assertEquals(i.tag, "I")
	assertEquals(i.children.length, 1) // Only valid phrasing child should remain
	assertEquals(i.children[0], validChild)
})
