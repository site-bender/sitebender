import { assertEquals, assertExists } from "@std/assert"

import Mark from "../../../../../../constructors/elements/flow/phrasing/Mark/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Mark should create a basic mark with no attributes or children", () => {
	const mark = Mark()([])
	assertEquals(mark.tag, "Mark")
	assertEquals(mark.children, [])
	assertExists(mark.attributes)
})

Deno.test("Mark should create a mark with valid global attributes", () => {
	const mark = Mark({
		id: "search-highlight",
		class: "highlight",
		title: "Search Result",
		lang: "en",
	})([])

	assertEquals(mark.tag, "Mark")
	assertEquals(mark.attributes["id"], "search-highlight")
	assertEquals(mark.attributes["class"], "highlight")
	assertEquals(mark.attributes["title"], "Search Result")
	assertEquals(mark.attributes["lang"], "en")
})

Deno.test("Mark should filter out invalid attributes", () => {
	const mark = Mark({
		id: "valid",
		href: "invalid-for-mark",
		src: "invalid-for-mark",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(mark.tag, "Mark")
	assertEquals(mark.attributes["id"], "valid")
	assertEquals(mark.attributes["href"], undefined)
	assertEquals(mark.attributes["src"], undefined)
	assertEquals((mark.attributes as any).invalidAttr, undefined)
})

Deno.test("Mark should accept text content for highlighting", () => {
	const text = TextNode("important text")
	const mark = Mark()([text])

	assertEquals(mark.tag, "Mark")
	assertEquals(mark.children.length, 1)
	assertEquals(mark.children[0], text)
})

Deno.test("Mark should handle phrasing content children", () => {
	const children = [
		TextNode("This is "),
		{ tag: "Strong", attributes: {}, children: [TextNode("very")] },
		TextNode(" important!"),
	]
	const mark = Mark()(children)

	assertEquals(mark.tag, "Mark")
	assertEquals(mark.children.length, 3)
	assertEquals((mark.children[0] as any).tag, "TextNode")
	assertEquals((mark.children[1] as any).tag, "Strong")
	assertEquals((mark.children[2] as any).tag, "TextNode")
})

Deno.test("Mark should handle single child (not array)", () => {
	const text = TextNode("highlighted term")
	const mark = Mark()(text)

	assertEquals(mark.tag, "Mark")
	assertEquals(mark.children.length, 1)
	assertEquals(mark.children[0], text)
})

Deno.test("Mark should handle special properties", () => {
	const mark = Mark({
		calculation: "markCalculation",
		dataset: { type: "search-result", relevance: "high" },
		display: "inline",
		scripts: ["highlight.js"],
		stylesheets: ["mark.css"],
	})([])

	assertEquals(mark.tag, "Mark")
	assertEquals((mark as any).calculation, "markCalculation")
	assertEquals((mark as any).dataset, {
		type: "search-result",
		relevance: "high",
	})
	assertEquals((mark as any).display, "inline")
	assertEquals((mark as any).scripts, ["highlight.js"])
	assertEquals((mark as any).stylesheets, ["mark.css"])
})

Deno.test("Mark should handle ARIA attributes", () => {
	const mark = Mark({
		aria: {
			label: "Search result highlight",
			describedby: "highlight-explanation",
		},
	})([])

	assertEquals(mark.tag, "Mark")
	assertEquals(mark.attributes["aria-label"], "Search result highlight")
	assertEquals(mark.attributes["aria-describedby"], "highlight-explanation")
})

Deno.test("Mark should handle search highlighting use case", () => {
	const searchResults = [
		TextNode("Found matching term: "),
		{
			tag: "Span",
			attributes: { class: "match" },
			children: [TextNode("JavaScript")],
		},
		TextNode(" in documentation"),
	]
	const mark = Mark({ class: "search-highlight" })(searchResults)

	assertEquals(mark.tag, "Mark")
	assertEquals(mark.children.length, 3)
	assertEquals(mark.attributes["class"], "search-highlight")
	assertEquals((mark.children[0] as any).tag, "TextNode")
	assertEquals((mark.children[1] as any).tag, "Span")
	assertEquals((mark.children[2] as any).tag, "TextNode")
})

Deno.test("Mark should handle empty children array", () => {
	const mark = Mark()([])
	assertEquals(mark.tag, "Mark")
	assertEquals(mark.children, [])
})
