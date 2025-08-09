import { assertEquals, assertExists } from "@std/assert"

import Em from "../../../../../../constructors/elements/flow/phrasing/Em/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Em should create a basic em with no attributes or children", () => {
	const em = Em()([])
	assertEquals(em.tag, "Em")
	assertEquals(em.children, [])
	assertExists(em.attributes)
})

Deno.test("Em should create an em with valid global attributes", () => {
	const em = Em({
		id: "emphasized-text",
		class: "em-wrapper",
		title: "Emphasized content",
		lang: "en",
	})([])

	assertEquals(em.tag, "Em")
	assertEquals(em.attributes["id"], "emphasized-text")
	assertEquals(em.attributes["class"], "em-wrapper")
	assertEquals(em.attributes["title"], "Emphasized content")
	assertEquals(em.attributes["lang"], "en")
})

Deno.test("Em should filter out invalid attributes", () => {
	const em = Em({
		id: "em-content",
		class: "valid-class",
		invalidAttr: "should-be-filtered",
		onClick: "should-be-filtered",
	})([])

	assertEquals(em.tag, "Em")
	assertEquals(em.attributes["id"], "em-content")
	assertEquals(em.attributes["class"], "valid-class")
	// Invalid attributes should not exist
	assertEquals("invalidAttr" in em.attributes, false)
	assertEquals("onClick" in em.attributes, false)
})

Deno.test("Em should accept valid phrasing content children", () => {
	const child1 = TextNode("Hello")
	const child2 = TextNode("World")
	const em = Em({})([child1, child2])

	assertEquals(em.tag, "Em")
	assertEquals(em.children.length, 2)
	assertEquals(em.children[0], child1)
	assertEquals(em.children[1], child2)
})

Deno.test("Em should handle single child (not array)", () => {
	const child = TextNode("Single child")
	const em = Em({})(child)

	assertEquals(em.tag, "Em")
	assertEquals(em.children.length, 1)
	assertEquals(em.children[0], child)
})

Deno.test("Em should handle special properties", () => {
	const em = Em({
		id: "em-content",
		calculation: { formula: "2 + 2" },
		dataset: { custom: "value" },
		display: "inline",
		format: "html",
		scripts: ["script1.js"],
		stylesheets: ["style1.css"],
	})([])

	assertEquals(em.tag, "Em")
	assertEquals(em.attributes["id"], "em-content")
	assertExists(em.calculation)
	assertExists(em.dataset)
	assertExists(em.display)
	assertExists(em.format)
	assertExists(em.scripts)
	assertExists(em.stylesheets)
})

Deno.test("Em should handle ARIA attributes", () => {
	const em = Em({
		id: "em-content",
		aria: {
			label: "Emphasized content",
			describedby: "em-description",
		},
		role: "text",
	})([])

	assertEquals(em.tag, "Em")
	assertEquals(em.attributes["id"], "em-content")
	assertEquals(em.attributes["aria-label"], "Emphasized content")
	assertEquals(em.attributes["aria-describedby"], "em-description")
	assertEquals(em.attributes["role"], "text")
})

Deno.test("Em should filter children using isPhrasingContent validation", () => {
	const validChild = {
		tag: "Strong",
		attributes: {},
		children: [],
	}

	const invalidChild = {
		tag: "Div", // Div is flow content, not phrasing content
		attributes: {},
		children: [],
	}

	const em = Em({})([validChild, invalidChild])

	assertEquals(em.tag, "Em")
	assertEquals(em.children.length, 1) // Only valid phrasing child should remain
	assertEquals(em.children[0], validChild)
})
