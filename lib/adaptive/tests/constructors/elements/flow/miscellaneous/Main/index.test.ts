import { assertEquals, assertExists } from "@std/assert"

import Main from "../../../../../../constructors/elements/flow/miscellaneous/Main/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Main should create a basic main with no attributes or children", () => {
	const main = Main()([])
	assertEquals(main.tag, "Main")
	assertEquals(main.children, [])
	assertExists(main.attributes)
})

Deno.test("Main should create a main with valid global attributes", () => {
	const main = Main({
		id: "main-content",
		class: "main-wrapper",
		title: "Main content",
		lang: "en",
	})([])

	assertEquals(main.tag, "Main")
	assertEquals(main.attributes["id"], "main-content")
	assertEquals(main.attributes["class"], "main-wrapper")
	assertEquals(main.attributes["title"], "Main content")
	assertEquals(main.attributes["lang"], "en")
})

Deno.test("Main should filter out invalid attributes", () => {
	const main = Main({
		id: "main-content",
		class: "valid-class",
		invalidAttr: "should-be-filtered",
		onClick: "should-be-filtered",
	})([])

	assertEquals(main.tag, "Main")
	assertEquals(main.attributes["id"], "main-content")
	assertEquals(main.attributes["class"], "valid-class")
	// Invalid attributes should not exist
	assertEquals("invalidAttr" in main.attributes, false)
	assertEquals("onClick" in main.attributes, false)
})

Deno.test("Main should accept valid flow content children", () => {
	const child1 = TextNode("Hello")
	const child2 = TextNode("World")
	const main = Main({})([child1, child2])

	assertEquals(main.tag, "Main")
	assertEquals(main.children.length, 2)
	assertEquals(main.children[0], child1)
	assertEquals(main.children[1], child2)
})

Deno.test("Main should handle single child (not array)", () => {
	const child = TextNode("Single child")
	const main = Main({})(child)

	assertEquals(main.tag, "Main")
	assertEquals(main.children.length, 1)
	assertEquals(main.children[0], child)
})

Deno.test("Main should handle special properties", () => {
	const main = Main({
		id: "main-content",
		calculation: { formula: "2 + 2" },
		dataset: { custom: "value" },
		display: "block",
		format: "html",
		scripts: ["script1.js"],
		stylesheets: ["style1.css"],
	})([])

	assertEquals(main.tag, "Main")
	assertEquals(main.attributes["id"], "main-content")
	assertExists(main.calculation)
	assertExists(main.dataset)
	assertExists(main.display)
	assertExists(main.format)
	assertExists(main.scripts)
	assertExists(main.stylesheets)
})

Deno.test("Main should handle ARIA attributes", () => {
	const main = Main({
		id: "main-content",
		aria: {
			label: "Main content area",
			describedby: "main-description",
		},
		role: "main",
	})([])

	assertEquals(main.tag, "Main")
	assertEquals(main.attributes["id"], "main-content")
	assertEquals(main.attributes["aria-label"], "Main content area")
	assertEquals(main.attributes["aria-describedby"], "main-description")
	assertEquals(main.attributes["role"], "main")
})

Deno.test("Main should filter children using isFlowContent validation", () => {
	const validChild = {
		tag: "Div",
		attributes: {},
		children: [],
	}

	const invalidChild = {
		tag: "not-a-flow-element",
		attributes: {},
		children: [],
	}

	const main = Main({})([validChild, invalidChild])

	assertEquals(main.tag, "Main")
	assertEquals(main.children.length, 1) // Only valid child should remain
	assertEquals(main.children[0], validChild)
})
