import { assertEquals, assertExists } from "@std/assert"

import Slot from "../../../../../../constructors/elements/flow/phrasing/Slot/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Slot should create a basic slot with no attributes or children", () => {
	const slot = Slot()([])
	assertEquals(slot.tag, "Slot")
	assertEquals(slot.children, [])
	assertExists(slot.attributes)
})

Deno.test("Slot should create a slot with name attribute", () => {
	const slot = Slot({
		name: "header-slot",
		id: "main-header",
	})([])

	assertEquals(slot.tag, "Slot")
	assertEquals(slot.attributes["name"], "header-slot")
	assertEquals(slot.attributes["id"], "main-header")
})

Deno.test("Slot should create a slot with valid global attributes", () => {
	const slot = Slot({
		id: "content-slot",
		class: "slot-container",
		title: "Content Slot",
		lang: "en",
	})([])

	assertEquals(slot.tag, "Slot")
	assertEquals(slot.attributes["id"], "content-slot")
	assertEquals(slot.attributes["class"], "slot-container")
	assertEquals(slot.attributes["title"], "Content Slot")
	assertEquals(slot.attributes["lang"], "en")
})

Deno.test("Slot should filter out invalid attributes", () => {
	const slot = Slot({
		name: "valid-slot",
		href: "invalid-for-slot",
		src: "invalid-for-slot",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(slot.tag, "Slot")
	assertEquals(slot.attributes["name"], "valid-slot")
	assertEquals(slot.attributes["href"], undefined)
	assertEquals(slot.attributes["src"], undefined)
	assertEquals((slot.attributes as any).invalidAttr, undefined)
})

Deno.test("Slot should accept fallback content", () => {
	const text = TextNode("Default slot content")
	const slot = Slot({ name: "content" })([text])

	assertEquals(slot.tag, "Slot")
	assertEquals(slot.children.length, 1)
	assertEquals(slot.children[0], text)
})

Deno.test("Slot should handle phrasing content children as fallback", () => {
	const children = [
		TextNode("Default content: "),
		{ tag: "Strong", attributes: {}, children: [TextNode("Important")] },
		TextNode(" message"),
	]
	const slot = Slot({ name: "message" })(children)

	assertEquals(slot.tag, "Slot")
	assertEquals(slot.children.length, 3)
	assertEquals((slot.children[0] as any).tag, "TextNode")
	assertEquals((slot.children[1] as any).tag, "Strong")
	assertEquals((slot.children[2] as any).tag, "TextNode")
})

Deno.test("Slot should handle single child (not array)", () => {
	const text = TextNode("Fallback text")
	const slot = Slot({ name: "fallback" })(text)

	assertEquals(slot.tag, "Slot")
	assertEquals(slot.children.length, 1)
	assertEquals(slot.children[0], text)
})

Deno.test("Slot should handle special properties", () => {
	const slot = Slot({
		name: "dynamic-slot",
		calculation: "slotCalculation",
		dataset: { type: "web-component", slotType: "content" },
		display: "contents",
		scripts: ["slot-handler.js"],
		stylesheets: ["slot.css"],
	})([])

	assertEquals(slot.tag, "Slot")
	assertEquals((slot as any).calculation, "slotCalculation")
	assertEquals((slot as any).dataset, {
		type: "web-component",
		slotType: "content",
	})
	assertEquals((slot as any).display, "contents")
	assertEquals((slot as any).scripts, ["slot-handler.js"])
	assertEquals((slot as any).stylesheets, ["slot.css"])
})

Deno.test("Slot should handle ARIA attributes", () => {
	const slot = Slot({
		name: "accessible-slot",
		aria: {
			label: "Content slot area",
			describedby: "slot-description",
		},
	})([])

	assertEquals(slot.tag, "Slot")
	assertEquals(slot.attributes["aria-label"], "Content slot area")
	assertEquals(slot.attributes["aria-describedby"], "slot-description")
})

Deno.test("Slot should handle unnamed slot (default slot)", () => {
	const defaultContent = TextNode("Default slot content")
	const slot = Slot()([defaultContent])

	assertEquals(slot.tag, "Slot")
	assertEquals(slot.children.length, 1)
	assertEquals(slot.attributes["name"], undefined)
	assertEquals(slot.children[0], defaultContent)
})

Deno.test("Slot should handle named slots for web components", () => {
	const namedSlots = ["header", "main", "footer", "sidebar"]

	namedSlots.forEach((name) => {
		const slot = Slot({ name })([TextNode(`${name} content`)])
		assertEquals(slot.tag, "Slot")
		assertEquals(slot.attributes["name"], name)
		assertEquals(slot.children.length, 1)
	})
})

Deno.test("Slot should handle empty children array", () => {
	const slot = Slot({ name: "empty-slot" })([])
	assertEquals(slot.tag, "Slot")
	assertEquals(slot.children, [])
})
