import { assertEquals, assertExists } from "@std/assert"

import Bdo from "../../../../../../constructors/elements/flow/phrasing/Bdo/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Bdo should create a basic bdo with no attributes or children", () => {
	const bdo = Bdo()([])
	assertEquals(bdo.tag, "Bdo")
	assertEquals(bdo.children, [])
	assertExists(bdo.attributes)
})

Deno.test("Bdo should create a bdo with dir attribute", () => {
	const bdo = Bdo({
		dir: "rtl",
		id: "rtl-text",
	})([])

	assertEquals(bdo.tag, "Bdo")
	assertEquals(bdo.attributes["dir"], "rtl")
	assertEquals(bdo.attributes["id"], "rtl-text")
})

Deno.test("Bdo should handle different direction values", () => {
	const directions = ["ltr", "rtl"]

	directions.forEach((dir) => {
		const bdo = Bdo({ dir })([TextNode("Test")])
		assertEquals(bdo.attributes["dir"], dir)
	})
})

Deno.test("Bdo should accept text content for direction override", () => {
	const text = TextNode("Hello World")
	const bdo = Bdo({ dir: "rtl" })([text])

	assertEquals(bdo.tag, "Bdo")
	assertEquals(bdo.children.length, 1)
	assertEquals(bdo.children[0], text)
	assertEquals(bdo.attributes["dir"], "rtl")
})

Deno.test("Bdo should handle phrasing content children", () => {
	const children = [
		TextNode("Welcome "),
		{ tag: "Strong", attributes: {}, children: [TextNode("User")] },
		TextNode("!"),
	]
	const bdo = Bdo({ dir: "ltr" })(children)

	assertEquals(bdo.tag, "Bdo")
	assertEquals(bdo.children.length, 3)
	assertEquals((bdo.children[0] as any).tag, "TextNode")
	assertEquals((bdo.children[1] as any).tag, "Strong")
	assertEquals((bdo.children[2] as any).tag, "TextNode")
})

Deno.test("Bdo should handle special properties", () => {
	const bdo = Bdo({
		dir: "rtl",
		calculation: "bdoCalculation",
		dataset: { override: "true", direction: "right-to-left" },
		display: "inline",
		scripts: ["bdo-handler.js"],
		stylesheets: ["bdo.css"],
	})([])

	assertEquals(bdo.tag, "Bdo")
	assertEquals((bdo as any).calculation, "bdoCalculation")
	assertEquals((bdo as any).dataset, {
		override: "true",
		direction: "right-to-left",
	})
	assertEquals((bdo as any).display, "inline")
	assertEquals((bdo as any).scripts, ["bdo-handler.js"])
	assertEquals((bdo as any).stylesheets, ["bdo.css"])
})

Deno.test("Bdo should handle ARIA attributes", () => {
	const bdo = Bdo({
		dir: "rtl",
		aria: {
			label: "Right-to-left text override",
			describedby: "direction-help",
		},
	})([])

	assertEquals(bdo.tag, "Bdo")
	assertEquals(bdo.attributes["aria-label"], "Right-to-left text override")
	assertEquals(bdo.attributes["aria-describedby"], "direction-help")
})

Deno.test("Bdo should handle mixed content with direction override", () => {
	const arabicText = [
		TextNode("العربية: "),
		{ tag: "Span", attributes: { lang: "ar" }, children: [TextNode("مرحبا")] },
		TextNode(" (Arabic)"),
	]
	const bdo = Bdo({ dir: "ltr", class: "direction-override" })(arabicText)

	assertEquals(bdo.tag, "Bdo")
	assertEquals(bdo.children.length, 3)
	assertEquals(bdo.attributes["dir"], "ltr")
	assertEquals(bdo.attributes["class"], "direction-override")
})
