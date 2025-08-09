import { assertEquals, assertExists } from "@std/assert"

import Sup from "../../../../../../constructors/elements/flow/phrasing/Sup/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Sup should create a basic sup with no attributes or children", () => {
	const sup = Sup()([])
	assertEquals(sup.tag, "Sup")
	assertEquals(sup.children, [])
	assertExists(sup.attributes)
})

Deno.test("Sup should create a sup with valid global attributes", () => {
	const sup = Sup({
		id: "exponent",
		class: "superscript",
		title: "Superscript Text",
		lang: "en",
	})([])

	assertEquals(sup.tag, "Sup")
	assertEquals(sup.attributes["id"], "exponent")
	assertEquals(sup.attributes["class"], "superscript")
	assertEquals(sup.attributes["title"], "Superscript Text")
	assertEquals(sup.attributes["lang"], "en")
})

Deno.test("Sup should accept text content for superscript", () => {
	const text = TextNode("2")
	const sup = Sup()([text])

	assertEquals(sup.tag, "Sup")
	assertEquals(sup.children.length, 1)
	assertEquals(sup.children[0], text)
})

Deno.test("Sup should handle mathematical exponent use case", () => {
	const exponent = TextNode("3")
	const sup = Sup({ class: "math-exponent" })([exponent])

	assertEquals(sup.tag, "Sup")
	assertEquals(sup.children.length, 1)
	assertEquals(sup.attributes["class"], "math-exponent")
	assertEquals(sup.children[0], exponent)
})

Deno.test("Sup should handle ordinal number use case", () => {
	const ordinal = TextNode("st")
	const sup = Sup({ class: "ordinal" })([ordinal])

	assertEquals(sup.tag, "Sup")
	assertEquals(sup.children.length, 1)
	assertEquals(sup.attributes["class"], "ordinal")
	assertEquals(sup.children[0], ordinal)
})

Deno.test("Sup should handle phrasing content children", () => {
	const children = [
		{ tag: "Em", attributes: {}, children: [TextNode("th")] },
	]
	const sup = Sup()(children)

	assertEquals(sup.tag, "Sup")
	assertEquals(sup.children.length, 1)
	assertEquals((sup.children[0] as any).tag, "Em")
})

Deno.test("Sup should handle special properties", () => {
	const sup = Sup({
		calculation: "supCalculation",
		dataset: { type: "mathematical-notation", operation: "power" },
		display: "inline",
		scripts: ["superscript.js"],
		stylesheets: ["sup.css"],
	})([])

	assertEquals(sup.tag, "Sup")
	assertEquals((sup as any).calculation, "supCalculation")
	assertEquals((sup as any).dataset, {
		type: "mathematical-notation",
		operation: "power",
	})
	assertEquals((sup as any).display, "inline")
	assertEquals((sup as any).scripts, ["superscript.js"])
	assertEquals((sup as any).stylesheets, ["sup.css"])
})

Deno.test("Sup should handle ARIA attributes", () => {
	const sup = Sup({
		aria: {
			label: "Superscript notation",
			describedby: "math-explanation",
		},
	})([])

	assertEquals(sup.tag, "Sup")
	assertEquals(sup.attributes["aria-label"], "Superscript notation")
	assertEquals(sup.attributes["aria-describedby"], "math-explanation")
})
