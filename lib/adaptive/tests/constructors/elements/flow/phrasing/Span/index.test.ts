import { assertEquals, assertExists } from "@std/assert"

import Span from "../../../../../../constructors/elements/flow/phrasing/Span/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Span should create a basic span with no attributes or children", () => {
	const span = Span()([])
	assertEquals(span.tag, "Span")
	assertEquals(span.children, [])
	assertExists(span.attributes)
})

Deno.test("Span should create a span with valid global attributes", () => {
	const span = Span({
		id: "my-span",
		class: "highlight",
		title: "A test span",
		lang: "en",
	})([])

	assertEquals(span.tag, "Span")
	assertEquals(span.attributes["id"], "my-span")
	assertEquals(span.attributes["class"], "highlight")
	assertEquals(span.attributes["title"], "A test span")
	assertEquals(span.attributes["lang"], "en")
})

Deno.test("Span should filter out invalid attributes", () => {
	const span = Span({
		id: "valid",
		class: "valid-class",
		invalidAttr: "should-be-filtered",
	})([])

	assertEquals(span.tag, "Span")
	assertEquals(span.attributes["id"], "valid")
	assertEquals(span.attributes["class"], "valid-class")
	// Invalid attributes should not exist
	assertEquals("invalidAttr" in span.attributes, false)
})

Deno.test("Span should accept valid phrasing content children", () => {
	const child1 = TextNode("Hello ")
	const child2 = TextNode("world!")
	const span = Span({})([child1, child2])

	assertEquals(span.tag, "Span")
	assertEquals(span.children.length, 2)
	assertEquals(span.children[0], child1)
	assertEquals(span.children[1], child2)
})

Deno.test("Span should handle single child (not array)", () => {
	const child = TextNode("Inline text")
	const span = Span({})(child)

	assertEquals(span.tag, "Span")
	assertEquals(span.children.length, 1)
	assertEquals(span.children[0], child)
})

Deno.test("Span should handle special properties", () => {
	const span = Span({
		id: "special-span",
		calculation: { formula: "2 + 2" },
		dataset: { custom: "value" },
		display: "inline",
		format: "html",
		scripts: ["script1.js"],
		stylesheets: ["style1.css"],
	})([])

	assertEquals(span.tag, "Span")
	assertEquals(span.attributes["id"], "special-span")
	assertExists(span.calculation)
	assertExists(span.dataset)
	assertExists(span.display)
	assertExists(span.format)
	assertExists(span.scripts)
	assertExists(span.stylesheets)
})

Deno.test("Span should handle ARIA attributes", () => {
	const span = Span({
		id: "aria-span",
		aria: {
			label: "Test span",
			role: "button",
		},
	})([])

	assertEquals(span.tag, "Span")
	assertEquals(span.attributes["id"], "aria-span")
	assertEquals(span.attributes["aria-label"], "Test span")
	assertEquals(span.attributes["aria-role"], "button")
})
