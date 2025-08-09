import { assertEquals, assertExists } from "@std/assert"

import Strong from "../../../../../../constructors/elements/flow/phrasing/Strong/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Strong should create a basic strong with no attributes or children", () => {
	const strong = Strong()([])
	assertEquals(strong.tag, "Strong")
	assertEquals(strong.children, [])
	assertExists(strong.attributes)
})

Deno.test("Strong should create a strong with valid global attributes", () => {
	const strong = Strong({
		id: "important-text",
		class: "strong-wrapper",
		title: "Important content",
		lang: "en",
	})([])

	assertEquals(strong.tag, "Strong")
	assertEquals(strong.attributes["id"], "important-text")
	assertEquals(strong.attributes["class"], "strong-wrapper")
	assertEquals(strong.attributes["title"], "Important content")
	assertEquals(strong.attributes["lang"], "en")
})

Deno.test("Strong should filter out invalid attributes", () => {
	const strong = Strong({
		id: "strong-content",
		class: "valid-class",
		invalidAttr: "should-be-filtered",
		onClick: "should-be-filtered",
	})([])

	assertEquals(strong.tag, "Strong")
	assertEquals(strong.attributes["id"], "strong-content")
	assertEquals(strong.attributes["class"], "valid-class")
	// Invalid attributes should not exist
	assertEquals("invalidAttr" in strong.attributes, false)
	assertEquals("onClick" in strong.attributes, false)
})

Deno.test("Strong should accept valid phrasing content children", () => {
	const child1 = TextNode("Hello")
	const child2 = TextNode("World")
	const strong = Strong({})([child1, child2])

	assertEquals(strong.tag, "Strong")
	assertEquals(strong.children.length, 2)
	assertEquals(strong.children[0], child1)
	assertEquals(strong.children[1], child2)
})

Deno.test("Strong should handle single child (not array)", () => {
	const child = TextNode("Single child")
	const strong = Strong({})(child)

	assertEquals(strong.tag, "Strong")
	assertEquals(strong.children.length, 1)
	assertEquals(strong.children[0], child)
})

Deno.test("Strong should handle special properties", () => {
	const strong = Strong({
		id: "strong-content",
		calculation: { formula: "2 + 2" },
		dataset: { custom: "value" },
		display: "inline",
		format: "html",
		scripts: ["script1.js"],
		stylesheets: ["style1.css"],
	})([])

	assertEquals(strong.tag, "Strong")
	assertEquals(strong.attributes["id"], "strong-content")
	assertExists(strong.calculation)
	assertExists(strong.dataset)
	assertExists(strong.display)
	assertExists(strong.format)
	assertExists(strong.scripts)
	assertExists(strong.stylesheets)
})

Deno.test("Strong should handle ARIA attributes", () => {
	const strong = Strong({
		id: "strong-content",
		aria: {
			label: "Important content",
			describedby: "strong-description",
		},
		role: "text",
	})([])

	assertEquals(strong.tag, "Strong")
	assertEquals(strong.attributes["id"], "strong-content")
	assertEquals(strong.attributes["aria-label"], "Important content")
	assertEquals(strong.attributes["aria-describedby"], "strong-description")
	assertEquals(strong.attributes["role"], "text")
})

Deno.test("Strong should filter children using isPhrasingContent validation", () => {
	const validChild = {
		tag: "Em",
		attributes: {},
		children: [],
	}

	const invalidChild = {
		tag: "Div", // Div is flow content, not phrasing content
		attributes: {},
		children: [],
	}

	const strong = Strong({})([validChild, invalidChild])

	assertEquals(strong.tag, "Strong")
	assertEquals(strong.children.length, 1) // Only valid phrasing child should remain
	assertEquals(strong.children[0], validChild)
})
