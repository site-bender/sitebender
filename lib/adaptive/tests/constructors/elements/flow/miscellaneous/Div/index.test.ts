import { assertEquals, assertExists } from "@std/assert"

import Div from "../../../../../../constructors/elements/flow/miscellaneous/Div/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Div should create a basic div with no attributes or children", () => {
	const div = Div()([])
	assertEquals(div.tag, "Div")
	assertEquals(div.children, [])
	assertExists(div.attributes)
})

Deno.test("Div should create a div with valid global attributes", () => {
	const div = Div({
		id: "my-div",
		class: "container",
		title: "A test div",
		lang: "en",
	})([])

	assertEquals(div.tag, "Div")
	assertEquals(div.attributes["id"], "my-div")
	assertEquals(div.attributes["class"], "container")
	assertEquals(div.attributes["title"], "A test div")
	assertEquals(div.attributes["lang"], "en")
})

Deno.test("Div should filter out invalid attributes", () => {
	const div = Div({
		id: "valid",
		class: "valid-class",
		invalidAttr: "should-be-filtered",
	})([])

	assertEquals(div.tag, "Div")
	assertEquals(div.attributes["id"], "valid")
	assertEquals(div.attributes["class"], "valid-class")
	// Invalid attributes should not exist
	assertEquals("invalidAttr" in div.attributes, false)
})

Deno.test("Div should accept valid flow content children", () => {
	const child1 = TextNode("Hello")
	const child2 = TextNode("World")
	const div = Div({})([child1, child2])

	assertEquals(div.tag, "Div")
	assertEquals(div.children.length, 2)
	assertEquals(div.children[0], child1)
	assertEquals(div.children[1], child2)
})

Deno.test("Div should handle single child (not array)", () => {
	const child = TextNode("Single child")
	const div = Div({})(child)

	assertEquals(div.tag, "Div")
	assertEquals(div.children.length, 1)
	assertEquals(div.children[0], child)
})

Deno.test("Div should handle special properties", () => {
	const div = Div({
		id: "special",
		calculation: { formula: "2 + 2" },
		dataset: { custom: "value" },
		display: "block",
		format: "html",
		scripts: ["script1.js"],
		stylesheets: ["style1.css"],
	})([])

	assertEquals(div.tag, "Div")
	assertEquals(div.attributes["id"], "special")
	assertExists(div.calculation)
	assertExists(div.dataset)
	assertExists(div.display)
	assertExists(div.format)
	assertExists(div.scripts)
	assertExists(div.stylesheets)
})

Deno.test("Div should handle ARIA attributes", () => {
	const div = Div({
		id: "aria-div",
		aria: {
			label: "Test div",
			hidden: "true",
		},
	})([])

	assertEquals(div.tag, "Div")
	assertEquals(div.attributes["id"], "aria-div")
	assertEquals(div.attributes["aria-label"], "Test div")
	assertEquals(div.attributes["aria-hidden"], "true")
})
