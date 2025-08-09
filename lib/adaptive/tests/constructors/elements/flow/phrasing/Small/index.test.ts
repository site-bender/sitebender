import { assertEquals, assertExists } from "@std/assert"

import Small from "../../../../../../constructors/elements/flow/phrasing/Small/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Small should create a basic small with no attributes or children", () => {
	const small = Small()([])
	assertEquals(small.tag, "Small")
	assertEquals(small.children, [])
	assertExists(small.attributes)
})

Deno.test("Small should create a small with valid global attributes", () => {
	const small = Small({
		id: "fine-print",
		class: "disclaimer",
		title: "Legal Disclaimer",
		lang: "en",
	})([])

	assertEquals(small.tag, "Small")
	assertEquals(small.attributes["id"], "fine-print")
	assertEquals(small.attributes["class"], "disclaimer")
	assertEquals(small.attributes["title"], "Legal Disclaimer")
	assertEquals(small.attributes["lang"], "en")
})

Deno.test("Small should accept text content for fine print", () => {
	const text = TextNode("Terms and conditions apply")
	const small = Small()([text])

	assertEquals(small.tag, "Small")
	assertEquals(small.children.length, 1)
	assertEquals(small.children[0], text)
})

Deno.test("Small should handle phrasing content children", () => {
	const children = [
		TextNode("© 2023 "),
		{ tag: "Strong", attributes: {}, children: [TextNode("Company Name")] },
		TextNode(". All rights reserved."),
	]
	const small = Small()(children)

	assertEquals(small.tag, "Small")
	assertEquals(small.children.length, 3)
	assertEquals((small.children[0] as any).tag, "TextNode")
	assertEquals((small.children[1] as any).tag, "Strong")
	assertEquals((small.children[2] as any).tag, "TextNode")
})

Deno.test("Small should handle special properties", () => {
	const small = Small({
		calculation: "smallCalculation",
		dataset: { type: "legal-text", importance: "low" },
		display: "inline",
		scripts: ["fine-print.js"],
		stylesheets: ["small.css"],
	})([])

	assertEquals(small.tag, "Small")
	assertEquals((small as any).calculation, "smallCalculation")
	assertEquals((small as any).dataset, {
		type: "legal-text",
		importance: "low",
	})
	assertEquals((small as any).display, "inline")
	assertEquals((small as any).scripts, ["fine-print.js"])
	assertEquals((small as any).stylesheets, ["small.css"])
})

Deno.test("Small should handle ARIA attributes", () => {
	const small = Small({
		aria: {
			label: "Fine print disclaimer",
			describedby: "legal-terms",
		},
	})([])

	assertEquals(small.tag, "Small")
	assertEquals(small.attributes["aria-label"], "Fine print disclaimer")
	assertEquals(small.attributes["aria-describedby"], "legal-terms")
})
