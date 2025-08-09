import { assertEquals, assertExists } from "@std/assert"

import Dd from "../../../../../../../constructors/elements/flow/miscellaneous/Dl/Dd/index.ts"
import TextNode from "../../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Dd should create a basic dd with no attributes or children", () => {
	const dd = Dd()([])
	assertEquals(dd.tag, "Dd")
	assertEquals(dd.children, [])
	assertExists(dd.attributes)
})

Deno.test("Dd should create a dd with valid global attributes", () => {
	const dd = Dd({
		id: "html-definition",
		class: "definition-item",
		title: "HTML Definition",
		lang: "en",
	})([])

	assertEquals(dd.tag, "Dd")
	assertEquals(dd.attributes["id"], "html-definition")
	assertEquals(dd.attributes["class"], "definition-item")
	assertEquals(dd.attributes["title"], "HTML Definition")
	assertEquals(dd.attributes["lang"], "en")
})

Deno.test("Dd should filter out invalid attributes", () => {
	const dd = Dd({
		id: "definition",
		href: "invalid-for-dd",
		src: "invalid-for-dd",
		alt: "invalid-for-dd",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(dd.tag, "Dd")
	assertEquals(dd.attributes["id"], "definition")
	assertEquals(dd.attributes["href"], undefined)
	assertEquals(dd.attributes["src"], undefined)
	assertEquals(dd.attributes["alt"], undefined)
	assertEquals((dd.attributes as any).invalidAttr, undefined)
})

Deno.test("Dd should accept text content for definition", () => {
	const text = TextNode(
		"A markup language for creating web pages and applications.",
	)
	const dd = Dd({ id: "html-def" })([text])

	assertEquals(dd.tag, "Dd")
	assertEquals(dd.children.length, 1)
	assertEquals(dd.children[0], text)
})

Deno.test("Dd should handle flow content children", () => {
	const children = [
		TextNode("HTML is "),
		{
			tag: "Strong",
			attributes: {},
			children: [TextNode("HyperText Markup Language")],
		},
		TextNode(", used for creating web content."),
	]
	const dd = Dd({ id: "html-definition" })(children)

	assertEquals(dd.tag, "Dd")
	assertEquals(dd.children.length, 3)
	assertEquals((dd.children[0] as any).tag, "TextNode")
	assertEquals((dd.children[1] as any).tag, "Strong")
	assertEquals((dd.children[2] as any).tag, "TextNode")
})

Deno.test("Dd should handle complex flow content", () => {
	const children = [
		{
			tag: "P",
			attributes: {},
			children: [TextNode("Primary definition paragraph.")],
		},
		{
			tag: "Ul",
			attributes: {},
			children: [
				{ tag: "Li", attributes: {}, children: [TextNode("Feature 1")] },
				{ tag: "Li", attributes: {}, children: [TextNode("Feature 2")] },
			],
		},
		{ tag: "P", attributes: {}, children: [TextNode("Additional notes.")] },
	]
	const dd = Dd({ class: "complex-definition" })(children)

	assertEquals(dd.tag, "Dd")
	assertEquals(dd.children.length, 3)
	assertEquals((dd.children[0] as any).tag, "P")
	assertEquals((dd.children[1] as any).tag, "Ul")
	assertEquals((dd.children[2] as any).tag, "P")
})

Deno.test("Dd should handle single child (not array)", () => {
	const text = TextNode("A simple definition")
	const dd = Dd({ id: "simple-def" })(text)

	assertEquals(dd.tag, "Dd")
	assertEquals(dd.children.length, 1)
	assertEquals(dd.children[0], text)
})

Deno.test("Dd should handle special properties", () => {
	const dd = Dd({
		id: "term-definition",
		calculation: "ddCalculation",
		dataset: { term: "html", category: "web-tech" },
		display: "block",
		scripts: ["definition-tracker.js"],
		stylesheets: ["dd.css"],
	})([])

	assertEquals(dd.tag, "Dd")
	assertEquals((dd as any).calculation, "ddCalculation")
	assertEquals((dd as any).dataset, {
		term: "html",
		category: "web-tech",
	})
	assertEquals((dd as any).display, "block")
	assertEquals((dd as any).scripts, ["definition-tracker.js"])
	assertEquals((dd as any).stylesheets, ["dd.css"])
})

Deno.test("Dd should handle ARIA attributes", () => {
	const dd = Dd({
		id: "accessible-definition",
		aria: {
			label: "Term definition",
			describedby: "definition-help",
		},
	})([])

	assertEquals(dd.tag, "Dd")
	assertEquals(dd.attributes["aria-label"], "Term definition")
	assertEquals(dd.attributes["aria-describedby"], "definition-help")
})

Deno.test("Dd should handle definition with code examples", () => {
	const children = [
		TextNode("A function that returns a value. Example: "),
		{
			tag: "Code",
			attributes: {},
			children: [TextNode("function add(a, b) { return a + b; }")],
		},
	]
	const dd = Dd({ class: "code-definition" })(children)

	assertEquals(dd.tag, "Dd")
	assertEquals(dd.children.length, 2)
	assertEquals((dd.children[0] as any).tag, "TextNode")
	assertEquals((dd.children[1] as any).tag, "Code")
})

Deno.test("Dd should handle nested formatting in definitions", () => {
	const children = [
		{ tag: "Em", attributes: {}, children: [TextNode("Emphasis")] },
		TextNode(" - "),
		{ tag: "Strong", attributes: {}, children: [TextNode("stress emphasis")] },
		TextNode(" used to highlight important parts of text."),
	]
	const dd = Dd({ class: "formatted-definition" })(children)

	assertEquals(dd.tag, "Dd")
	assertEquals(dd.children.length, 4)
	assertEquals((dd.children[0] as any).tag, "Em")
	assertEquals((dd.children[1] as any).tag, "TextNode")
	assertEquals((dd.children[2] as any).tag, "Strong")
	assertEquals((dd.children[3] as any).tag, "TextNode")
})

Deno.test("Dd should handle empty children array", () => {
	const dd = Dd({ id: "empty-definition" })([])
	assertEquals(dd.tag, "Dd")
	assertEquals(dd.children, [])
})
