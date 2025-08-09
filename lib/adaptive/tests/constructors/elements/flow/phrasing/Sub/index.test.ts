import { assertEquals, assertExists } from "@std/assert"

import Sub from "../../../../../../constructors/elements/flow/phrasing/Sub/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Sub should create a basic sub with no attributes or children", () => {
	const sub = Sub()([])
	assertEquals(sub.tag, "Sub")
	assertEquals(sub.children, [])
	assertExists(sub.attributes)
})

Deno.test("Sub should create a sub with valid global attributes", () => {
	const sub = Sub({
		id: "chemical-formula",
		class: "subscript",
		title: "Subscript Text",
		lang: "en",
	})([])

	assertEquals(sub.tag, "Sub")
	assertEquals(sub.attributes["id"], "chemical-formula")
	assertEquals(sub.attributes["class"], "subscript")
	assertEquals(sub.attributes["title"], "Subscript Text")
	assertEquals(sub.attributes["lang"], "en")
})

Deno.test("Sub should accept text content for subscript", () => {
	const text = TextNode("2")
	const sub = Sub()([text])

	assertEquals(sub.tag, "Sub")
	assertEquals(sub.children.length, 1)
	assertEquals(sub.children[0], text)
})

Deno.test("Sub should handle chemical formula use case", () => {
	const formula = TextNode("6")
	const sub = Sub({ class: "chemical" })([formula])

	assertEquals(sub.tag, "Sub")
	assertEquals(sub.children.length, 1)
	assertEquals(sub.attributes["class"], "chemical")
	assertEquals(sub.children[0], formula)
})

Deno.test("Sub should handle phrasing content children", () => {
	const children = [
		{ tag: "Em", attributes: {}, children: [TextNode("n")] },
		TextNode("+1"),
	]
	const sub = Sub()(children)

	assertEquals(sub.tag, "Sub")
	assertEquals(sub.children.length, 2)
	assertEquals((sub.children[0] as any).tag, "Em")
	assertEquals((sub.children[1] as any).tag, "TextNode")
})

Deno.test("Sub should handle special properties", () => {
	const sub = Sub({
		calculation: "subCalculation",
		dataset: { type: "chemical-formula", element: "water" },
		display: "inline",
		scripts: ["subscript.js"],
		stylesheets: ["sub.css"],
	})([])

	assertEquals(sub.tag, "Sub")
	assertEquals((sub as any).calculation, "subCalculation")
	assertEquals((sub as any).dataset, {
		type: "chemical-formula",
		element: "water",
	})
	assertEquals((sub as any).display, "inline")
	assertEquals((sub as any).scripts, ["subscript.js"])
	assertEquals((sub as any).stylesheets, ["sub.css"])
})

Deno.test("Sub should handle ARIA attributes", () => {
	const sub = Sub({
		aria: {
			label: "Subscript notation",
			describedby: "formula-explanation",
		},
	})([])

	assertEquals(sub.tag, "Sub")
	assertEquals(sub.attributes["aria-label"], "Subscript notation")
	assertEquals(sub.attributes["aria-describedby"], "formula-explanation")
})
