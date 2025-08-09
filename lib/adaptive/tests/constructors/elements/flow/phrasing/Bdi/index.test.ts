import { assertEquals, assertExists } from "@std/assert"

import Bdi from "../../../../../../constructors/elements/flow/phrasing/Bdi/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Bdi should create a basic bdi with no attributes or children", () => {
	const bdi = Bdi()([])
	assertEquals(bdi.tag, "Bdi")
	assertEquals(bdi.children, [])
	assertExists(bdi.attributes)
})

Deno.test("Bdi should create a bdi with valid global attributes", () => {
	const bdi = Bdi({
		id: "user-name",
		class: "bidi-isolated",
		title: "User Name",
		lang: "ar",
	})([])

	assertEquals(bdi.tag, "Bdi")
	assertEquals(bdi.attributes["id"], "user-name")
	assertEquals(bdi.attributes["class"], "bidi-isolated")
	assertEquals(bdi.attributes["title"], "User Name")
	assertEquals(bdi.attributes["lang"], "ar")
})

Deno.test("Bdi should filter out invalid attributes", () => {
	const bdi = Bdi({
		id: "valid",
		href: "invalid-for-bdi",
		src: "invalid-for-bdi",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(bdi.tag, "Bdi")
	assertEquals(bdi.attributes["id"], "valid")
	assertEquals(bdi.attributes["href"], undefined)
	assertEquals(bdi.attributes["src"], undefined)
	assertEquals((bdi.attributes as any).invalidAttr, undefined)
})

Deno.test("Bdi should accept text content for bidirectional isolation", () => {
	const text = TextNode("أهلا وسهلا")
	const bdi = Bdi()([text])

	assertEquals(bdi.tag, "Bdi")
	assertEquals(bdi.children.length, 1)
	assertEquals(bdi.children[0], text)
})

Deno.test("Bdi should handle phrasing content children", () => {
	const children = [
		TextNode("User: "),
		{ tag: "Strong", attributes: {}, children: [TextNode("محمد")] },
	]
	const bdi = Bdi()(children)

	assertEquals(bdi.tag, "Bdi")
	assertEquals(bdi.children.length, 2)
	assertEquals((bdi.children[0] as any).tag, "TextNode")
	assertEquals((bdi.children[1] as any).tag, "Strong")
})

Deno.test("Bdi should handle single child (not array)", () => {
	const text = TextNode("שלום")
	const bdi = Bdi()(text)

	assertEquals(bdi.tag, "Bdi")
	assertEquals(bdi.children.length, 1)
	assertEquals(bdi.children[0], text)
})

Deno.test("Bdi should handle special properties", () => {
	const bdi = Bdi({
		calculation: "bdiCalculation",
		dataset: { type: "username", direction: "rtl" },
		display: "inline",
		scripts: ["bidi-handler.js"],
		stylesheets: ["bidi.css"],
	})([])

	assertEquals(bdi.tag, "Bdi")
	assertEquals((bdi as any).calculation, "bdiCalculation")
	assertEquals((bdi as any).dataset, { type: "username", direction: "rtl" })
	assertEquals((bdi as any).display, "inline")
	assertEquals((bdi as any).scripts, ["bidi-handler.js"])
	assertEquals((bdi as any).stylesheets, ["bidi.css"])
})

Deno.test("Bdi should handle ARIA attributes", () => {
	const bdi = Bdi({
		aria: {
			label: "User name in Arabic",
			describedby: "name-description",
		},
	})([])

	assertEquals(bdi.tag, "Bdi")
	assertEquals(bdi.attributes["aria-label"], "User name in Arabic")
	assertEquals(bdi.attributes["aria-describedby"], "name-description")
})

Deno.test("Bdi should handle mixed directional content", () => {
	const mixedContent = [
		TextNode("Score: "),
		{ tag: "Span", attributes: {}, children: [TextNode("١٠٠")] },
		TextNode(" points"),
	]
	const bdi = Bdi({ class: "score-display" })(mixedContent)

	assertEquals(bdi.tag, "Bdi")
	assertEquals(bdi.children.length, 3)
	assertEquals(bdi.attributes["class"], "score-display")
	assertEquals((bdi.children[0] as any).tag, "TextNode")
	assertEquals((bdi.children[1] as any).tag, "Span")
	assertEquals((bdi.children[2] as any).tag, "TextNode")
})

Deno.test("Bdi should handle empty children array", () => {
	const bdi = Bdi()([])
	assertEquals(bdi.tag, "Bdi")
	assertEquals(bdi.children, [])
})
