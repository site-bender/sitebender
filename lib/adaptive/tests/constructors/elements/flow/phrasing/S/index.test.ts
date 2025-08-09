import { assertEquals, assertExists } from "@std/assert"

import S from "../../../../../../constructors/elements/flow/phrasing/S/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("S should create a basic s with no attributes or children", () => {
	const s = S()([])
	assertEquals(s.tag, "S")
	assertEquals(s.children, [])
	assertExists(s.attributes)
})

Deno.test("S should create an s with valid global attributes", () => {
	const s = S({
		id: "old-price",
		class: "strikethrough",
		title: "Previous Price",
		lang: "en",
	})([])

	assertEquals(s.tag, "S")
	assertEquals(s.attributes["id"], "old-price")
	assertEquals(s.attributes["class"], "strikethrough")
	assertEquals(s.attributes["title"], "Previous Price")
	assertEquals(s.attributes["lang"], "en")
})

Deno.test("S should accept text content for strikethrough", () => {
	const text = TextNode("$19.99")
	const s = S()([text])

	assertEquals(s.tag, "S")
	assertEquals(s.children.length, 1)
	assertEquals(s.children[0], text)
})

Deno.test("S should handle phrasing content children", () => {
	const children = [
		TextNode("Was "),
		{ tag: "Strong", attributes: {}, children: [TextNode("$99.99")] },
		TextNode(" now on sale!"),
	]
	const s = S()(children)

	assertEquals(s.tag, "S")
	assertEquals(s.children.length, 3)
	assertEquals((s.children[0] as any).tag, "TextNode")
	assertEquals((s.children[1] as any).tag, "Strong")
	assertEquals((s.children[2] as any).tag, "TextNode")
})

Deno.test("S should handle special properties", () => {
	const s = S({
		calculation: "sCalculation",
		dataset: { type: "outdated-info", reason: "price-change" },
		display: "inline",
		scripts: ["strikethrough.js"],
		stylesheets: ["s.css"],
	})([])

	assertEquals(s.tag, "S")
	assertEquals((s as any).calculation, "sCalculation")
	assertEquals((s as any).dataset, {
		type: "outdated-info",
		reason: "price-change",
	})
	assertEquals((s as any).display, "inline")
	assertEquals((s as any).scripts, ["strikethrough.js"])
	assertEquals((s as any).stylesheets, ["s.css"])
})

Deno.test("S should handle ARIA attributes", () => {
	const s = S({
		aria: {
			label: "Outdated information",
			describedby: "correction-note",
		},
	})([])

	assertEquals(s.tag, "S")
	assertEquals(s.attributes["aria-label"], "Outdated information")
	assertEquals(s.attributes["aria-describedby"], "correction-note")
})
