import { assertEquals, assertExists } from "@std/assert"

import Footer from "../../../../../../constructors/elements/flow/miscellaneous/Footer/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Footer should create a basic footer with no attributes or children", () => {
	const footer = Footer()([])
	assertEquals(footer.tag, "Footer")
	assertEquals(footer.children, [])
	assertExists(footer.attributes)
})

Deno.test("Footer should create a footer with valid global attributes", () => {
	const footer = Footer({
		id: "main-footer",
		class: "footer-wrapper",
		title: "Footer content",
		lang: "en",
	})([])

	assertEquals(footer.tag, "Footer")
	assertEquals(footer.attributes["id"], "main-footer")
	assertEquals(footer.attributes["class"], "footer-wrapper")
	assertEquals(footer.attributes["title"], "Footer content")
	assertEquals(footer.attributes["lang"], "en")
})

Deno.test("Footer should filter out invalid attributes", () => {
	const footer = Footer({
		id: "footer-content",
		class: "valid-class",
		invalidAttr: "should-be-filtered",
		onClick: "should-be-filtered",
	})([])

	assertEquals(footer.tag, "Footer")
	assertEquals(footer.attributes["id"], "footer-content")
	assertEquals(footer.attributes["class"], "valid-class")
	// Invalid attributes should not exist
	assertEquals("invalidAttr" in footer.attributes, false)
	assertEquals("onClick" in footer.attributes, false)
})

Deno.test("Footer should accept valid role attributes", () => {
	const footer = Footer({
		id: "footer-content",
		role: "group",
	})([])

	assertEquals(footer.tag, "Footer")
	assertEquals(footer.attributes["id"], "footer-content")
	assertEquals(footer.attributes["role"], "group")
})

Deno.test("Footer should accept other valid role values", () => {
	const footer1 = Footer({ role: "presentation" })([])
	assertEquals(footer1.attributes["role"], "presentation")

	const footer2 = Footer({ role: "none" })([])
	assertEquals(footer2.attributes["role"], "none")
})

Deno.test("Footer should filter out invalid role values", () => {
	const footer = Footer({
		id: "footer-content",
		role: "invalid-role",
	})([])

	assertEquals(footer.tag, "Footer")
	assertEquals(footer.attributes["id"], "footer-content")
	// Invalid role should not exist
	assertEquals("role" in footer.attributes, false)
})

Deno.test("Footer should accept valid flow content children", () => {
	const child1 = TextNode("Hello")
	const child2 = TextNode("World")
	const footer = Footer({})([child1, child2])

	assertEquals(footer.tag, "Footer")
	assertEquals(footer.children.length, 2)
	assertEquals(footer.children[0], child1)
	assertEquals(footer.children[1], child2)
})

Deno.test("Footer should handle single child (not array)", () => {
	const child = TextNode("Single child")
	const footer = Footer({})(child)

	assertEquals(footer.tag, "Footer")
	assertEquals(footer.children.length, 1)
	assertEquals(footer.children[0], child)
})

Deno.test("Footer should handle special properties", () => {
	const footer = Footer({
		id: "footer-content",
		calculation: { formula: "2 + 2" },
		dataset: { custom: "value" },
		display: "block",
		format: "html",
		scripts: ["script1.js"],
		stylesheets: ["style1.css"],
	})([])

	assertEquals(footer.tag, "Footer")
	assertEquals(footer.attributes["id"], "footer-content")
	assertExists(footer.calculation)
	assertExists(footer.dataset)
	assertExists(footer.display)
	assertExists(footer.format)
	assertExists(footer.scripts)
	assertExists(footer.stylesheets)
})

Deno.test("Footer should handle ARIA attributes", () => {
	const footer = Footer({
		id: "footer-content",
		aria: {
			label: "Footer content area",
			describedby: "footer-description",
		},
		role: "group",
	})([])

	assertEquals(footer.tag, "Footer")
	assertEquals(footer.attributes["id"], "footer-content")
	assertEquals(footer.attributes["aria-label"], "Footer content area")
	assertEquals(footer.attributes["aria-describedby"], "footer-description")
	assertEquals(footer.attributes["role"], "group")
})
