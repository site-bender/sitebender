import { assertEquals, assertExists } from "@std/assert"

import Dl from "../../../../../../constructors/elements/flow/miscellaneous/Dl/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Dl should create a basic dl with no attributes or children", () => {
	const dl = Dl()([])
	assertEquals(dl.tag, "Dl")
	assertEquals(dl.children, [])
	assertExists(dl.attributes)
})

Deno.test("Dl should create a dl with valid global attributes", () => {
	const dl = Dl({
		id: "definition-list",
		class: "terms-list",
		title: "Definitions",
		lang: "en",
	})([])

	assertEquals(dl.tag, "Dl")
	assertEquals(dl.attributes["id"], "definition-list")
	assertEquals(dl.attributes["class"], "terms-list")
	assertEquals(dl.attributes["title"], "Definitions")
	assertEquals(dl.attributes["lang"], "en")
})

Deno.test("Dl should filter out invalid attributes", () => {
	const dl = Dl({
		id: "valid",
		href: "invalid-for-dl",
		src: "invalid-for-dl",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(dl.tag, "Dl")
	assertEquals(dl.attributes["id"], "valid")
	assertEquals(dl.attributes["href"], undefined)
	assertEquals(dl.attributes["src"], undefined)
	assertEquals((dl.attributes as any).invalidAttr, undefined)
})

Deno.test("Dl should accept dt and dd children", () => {
	const dt = { tag: "Dt", attributes: {}, children: [TextNode("Term")] }
	const dd = { tag: "Dd", attributes: {}, children: [TextNode("Definition")] }
	const dl = Dl()([dt, dd])

	assertEquals(dl.tag, "Dl")
	assertEquals(dl.children.length, 2)
	assertEquals(dl.children[0], dt)
	assertEquals(dl.children[1], dd)
})

Deno.test("Dl should handle multiple term-definition pairs", () => {
	const children = [
		{ tag: "Dt", attributes: {}, children: [TextNode("HTML")] },
		{
			tag: "Dd",
			attributes: {},
			children: [TextNode("HyperText Markup Language")],
		},
		{ tag: "Dt", attributes: {}, children: [TextNode("CSS")] },
		{
			tag: "Dd",
			attributes: {},
			children: [TextNode("Cascading Style Sheets")],
		},
	]
	const dl = Dl()(children)

	assertEquals(dl.tag, "Dl")
	assertEquals(dl.children.length, 4)
	assertEquals((dl.children[0] as any).tag, "Dt")
	assertEquals((dl.children[1] as any).tag, "Dd")
	assertEquals((dl.children[2] as any).tag, "Dt")
	assertEquals((dl.children[3] as any).tag, "Dd")
})

Deno.test("Dl should handle single child (not array)", () => {
	const dt = { tag: "Dt", attributes: {}, children: [TextNode("Single Term")] }
	const dl = Dl()(dt)

	assertEquals(dl.tag, "Dl")
	assertEquals(dl.children.length, 1)
	assertEquals(dl.children[0], dt)
})

Deno.test("Dl should handle special properties", () => {
	const dl = Dl({
		calculation: "dlCalculation",
		dataset: { type: "glossary", category: "technical" },
		display: "block",
		scripts: ["dl-script.js"],
		stylesheets: ["dl-style.css"],
	})([])

	assertEquals(dl.tag, "Dl")
	assertEquals((dl as any).calculation, "dlCalculation")
	assertEquals((dl as any).dataset, { type: "glossary", category: "technical" })
	assertEquals((dl as any).display, "block")
	assertEquals((dl as any).scripts, ["dl-script.js"])
	assertEquals((dl as any).stylesheets, ["dl-style.css"])
})

Deno.test("Dl should handle ARIA attributes", () => {
	const dl = Dl({
		aria: {
			label: "Technical terms glossary",
			describedby: "glossary-description",
		},
	})([])

	assertEquals(dl.tag, "Dl")
	assertEquals(dl.attributes["aria-label"], "Technical terms glossary")
	assertEquals(dl.attributes["aria-describedby"], "glossary-description")
})

Deno.test("Dl should handle complex definition list structure", () => {
	const complexChildren = [
		{ tag: "Dt", attributes: {}, children: [TextNode("JavaScript")] },
		{
			tag: "Dd",
			attributes: {},
			children: [TextNode("A programming language")],
		},
		{
			tag: "Dd",
			attributes: {},
			children: [TextNode("Used for web development")],
		},
		{ tag: "Dt", attributes: {}, children: [TextNode("TypeScript")] },
		{
			tag: "Dd",
			attributes: {},
			children: [TextNode("JavaScript with static typing")],
		},
	]
	const dl = Dl({ class: "programming-terms" })(complexChildren)

	assertEquals(dl.tag, "Dl")
	assertEquals(dl.children.length, 5)
	assertEquals(dl.attributes["class"], "programming-terms")
	assertEquals((dl.children[0] as any).tag, "Dt")
	assertEquals((dl.children[1] as any).tag, "Dd")
	assertEquals((dl.children[2] as any).tag, "Dd")
	assertEquals((dl.children[3] as any).tag, "Dt")
	assertEquals((dl.children[4] as any).tag, "Dd")
})

Deno.test("Dl should handle empty children array", () => {
	const dl = Dl()([])
	assertEquals(dl.tag, "Dl")
	assertEquals(dl.children, [])
})
