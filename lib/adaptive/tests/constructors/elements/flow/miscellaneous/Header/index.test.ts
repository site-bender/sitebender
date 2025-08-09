import { assertEquals, assertExists } from "@std/assert"

import Header from "../../../../../../constructors/elements/flow/miscellaneous/Header/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Header should create a basic header with no attributes or children", () => {
	const header = Header()([])
	assertEquals(header.tag, "Header")
	assertEquals(header.children, [])
	assertExists(header.attributes)
})

Deno.test("Header should create a header with valid global attributes", () => {
	const header = Header({
		id: "main-header",
		class: "header-wrapper",
		title: "Header content",
		lang: "en",
	})([])

	assertEquals(header.tag, "Header")
	assertEquals(header.attributes["id"], "main-header")
	assertEquals(header.attributes["class"], "header-wrapper")
	assertEquals(header.attributes["title"], "Header content")
	assertEquals(header.attributes["lang"], "en")
})

Deno.test("Header should filter out invalid attributes", () => {
	const header = Header({
		id: "header-content",
		class: "valid-class",
		invalidAttr: "should-be-filtered",
		onClick: "should-be-filtered",
	})([])

	assertEquals(header.tag, "Header")
	assertEquals(header.attributes["id"], "header-content")
	assertEquals(header.attributes["class"], "valid-class")
	// Invalid attributes should not exist
	assertEquals("invalidAttr" in header.attributes, false)
	assertEquals("onClick" in header.attributes, false)
})

Deno.test("Header should accept valid role attributes", () => {
	const header = Header({
		id: "header-content",
		role: "group",
	})([])

	assertEquals(header.tag, "Header")
	assertEquals(header.attributes["id"], "header-content")
	assertEquals(header.attributes["role"], "group")
})

Deno.test("Header should accept other valid role values", () => {
	const header1 = Header({ role: "presentation" })([])
	assertEquals(header1.attributes["role"], "presentation")

	const header2 = Header({ role: "none" })([])
	assertEquals(header2.attributes["role"], "none")
})

Deno.test("Header should filter out invalid role values", () => {
	const header = Header({
		id: "header-content",
		role: "invalid-role",
	})([])

	assertEquals(header.tag, "Header")
	assertEquals(header.attributes["id"], "header-content")
	// Invalid role should not exist
	assertEquals("role" in header.attributes, false)
})

Deno.test("Header should accept valid flow content children", () => {
	const child1 = TextNode("Hello")
	const child2 = TextNode("World")
	const header = Header({})([child1, child2])

	assertEquals(header.tag, "Header")
	assertEquals(header.children.length, 2)
	assertEquals(header.children[0], child1)
	assertEquals(header.children[1], child2)
})

Deno.test("Header should handle single child (not array)", () => {
	const child = TextNode("Single child")
	const header = Header({})(child)

	assertEquals(header.tag, "Header")
	assertEquals(header.children.length, 1)
	assertEquals(header.children[0], child)
})

Deno.test("Header should handle special properties", () => {
	const header = Header({
		id: "header-content",
		calculation: { formula: "2 + 2" },
		dataset: { custom: "value" },
		display: "block",
		format: "html",
		scripts: ["script1.js"],
		stylesheets: ["style1.css"],
	})([])

	assertEquals(header.tag, "Header")
	assertEquals(header.attributes["id"], "header-content")
	assertExists(header.calculation)
	assertExists(header.dataset)
	assertExists(header.display)
	assertExists(header.format)
	assertExists(header.scripts)
	assertExists(header.stylesheets)
})

Deno.test("Header should handle ARIA attributes", () => {
	const header = Header({
		id: "header-content",
		aria: {
			label: "Header content area",
			describedby: "header-description",
		},
		role: "group",
	})([])

	assertEquals(header.tag, "Header")
	assertEquals(header.attributes["id"], "header-content")
	assertEquals(header.attributes["aria-label"], "Header content area")
	assertEquals(header.attributes["aria-describedby"], "header-description")
	assertEquals(header.attributes["role"], "group")
})
