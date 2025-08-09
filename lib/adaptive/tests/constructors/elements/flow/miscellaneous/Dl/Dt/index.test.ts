import { assertEquals, assertExists } from "@std/assert"

import Dt from "../../../../../../../constructors/elements/flow/miscellaneous/Dl/Dt/index.ts"
import TextNode from "../../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Dt should create a basic dt with no attributes or children", () => {
	const dt = Dt()([])
	assertEquals(dt.tag, "Dt")
	assertEquals(dt.children, [])
	assertExists(dt.attributes)
})

Deno.test("Dt should create a dt with valid global attributes", () => {
	const dt = Dt({
		id: "html-term",
		class: "term-item",
		title: "HTML Term",
		lang: "en",
	})([])

	assertEquals(dt.tag, "Dt")
	assertEquals(dt.attributes["id"], "html-term")
	assertEquals(dt.attributes["class"], "term-item")
	assertEquals(dt.attributes["title"], "HTML Term")
	assertEquals(dt.attributes["lang"], "en")
})

Deno.test("Dt should filter out invalid attributes", () => {
	const dt = Dt({
		id: "term",
		href: "invalid-for-dt",
		src: "invalid-for-dt",
		alt: "invalid-for-dt",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(dt.tag, "Dt")
	assertEquals(dt.attributes["id"], "term")
	assertEquals(dt.attributes["href"], undefined)
	assertEquals(dt.attributes["src"], undefined)
	assertEquals(dt.attributes["alt"], undefined)
	assertEquals((dt.attributes as any).invalidAttr, undefined)
})

Deno.test("Dt should accept text content for term", () => {
	const text = TextNode("HTML")
	const dt = Dt({ id: "html-term" })([text])

	assertEquals(dt.tag, "Dt")
	assertEquals(dt.children.length, 1)
	assertEquals(dt.children[0], text)
})

Deno.test("Dt should handle flow content children", () => {
	const children = [
		{
			tag: "Abbr",
			attributes: { title: "HyperText Markup Language" },
			children: [TextNode("HTML")],
		},
		TextNode(" (Version 5)"),
	]
	const dt = Dt({ id: "html-term" })(children)

	assertEquals(dt.tag, "Dt")
	assertEquals(dt.children.length, 2)
	assertEquals((dt.children[0] as any).tag, "Abbr")
	assertEquals((dt.children[1] as any).tag, "TextNode")
})

Deno.test("Dt should handle formatted terms", () => {
	const children = [
		{ tag: "Strong", attributes: {}, children: [TextNode("CSS")] },
		TextNode(" "),
		{
			tag: "Em",
			attributes: {},
			children: [TextNode("(Cascading Style Sheets)")],
		},
	]
	const dt = Dt({ class: "formatted-term" })(children)

	assertEquals(dt.tag, "Dt")
	assertEquals(dt.children.length, 3)
	assertEquals((dt.children[0] as any).tag, "Strong")
	assertEquals((dt.children[1] as any).tag, "TextNode")
	assertEquals((dt.children[2] as any).tag, "Em")
})

Deno.test("Dt should handle single child (not array)", () => {
	const text = TextNode("JavaScript")
	const dt = Dt({ id: "js-term" })(text)

	assertEquals(dt.tag, "Dt")
	assertEquals(dt.children.length, 1)
	assertEquals(dt.children[0], text)
})

Deno.test("Dt should handle special properties", () => {
	const dt = Dt({
		id: "programming-term",
		calculation: "dtCalculation",
		dataset: { category: "programming", difficulty: "beginner" },
		display: "block",
		scripts: ["term-tracker.js"],
		stylesheets: ["dt.css"],
	})([])

	assertEquals(dt.tag, "Dt")
	assertEquals((dt as any).calculation, "dtCalculation")
	assertEquals((dt as any).dataset, {
		category: "programming",
		difficulty: "beginner",
	})
	assertEquals((dt as any).display, "block")
	assertEquals((dt as any).scripts, ["term-tracker.js"])
	assertEquals((dt as any).stylesheets, ["dt.css"])
})

Deno.test("Dt should handle ARIA attributes", () => {
	const dt = Dt({
		id: "accessible-term",
		aria: {
			label: "Technical term",
			describedby: "term-help",
		},
	})([])

	assertEquals(dt.tag, "Dt")
	assertEquals(dt.attributes["aria-label"], "Technical term")
	assertEquals(dt.attributes["aria-describedby"], "term-help")
})

Deno.test("Dt should handle terms with code", () => {
	const children = [
		{ tag: "Code", attributes: {}, children: [TextNode("function")] },
		TextNode(" keyword"),
	]
	const dt = Dt({ class: "code-term" })(children)

	assertEquals(dt.tag, "Dt")
	assertEquals(dt.children.length, 2)
	assertEquals((dt.children[0] as any).tag, "Code")
	assertEquals((dt.children[1] as any).tag, "TextNode")
})

Deno.test("Dt should handle complex terminology", () => {
	const children = [
		{
			tag: "Dfn",
			attributes: {},
			children: [TextNode("Responsive Web Design")],
		},
		TextNode(" "),
		{ tag: "Small", attributes: {}, children: [TextNode("(RWD)")] },
	]
	const dt = Dt({ class: "complex-term" })(children)

	assertEquals(dt.tag, "Dt")
	assertEquals(dt.children.length, 3)
	assertEquals((dt.children[0] as any).tag, "Dfn")
	assertEquals((dt.children[1] as any).tag, "TextNode")
	assertEquals((dt.children[2] as any).tag, "Small")
})

Deno.test("Dt should handle empty children array", () => {
	const dt = Dt({ id: "empty-term" })([])
	assertEquals(dt.tag, "Dt")
	assertEquals(dt.children, [])
})
