import { assertEquals, assertExists } from "@std/assert"

import Kbd from "../../../../../../constructors/elements/flow/phrasing/Kbd/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Kbd should create a basic kbd with no attributes or children", () => {
	const kbd = Kbd()([])
	assertEquals(kbd.tag, "Kbd")
	assertEquals(kbd.children, [])
	assertExists(kbd.attributes)
})

Deno.test("Kbd should create a kbd with valid global attributes", () => {
	const kbd = Kbd({
		id: "enter-key",
		class: "keyboard-key",
		title: "Enter Key",
		lang: "en",
	})([])

	assertEquals(kbd.tag, "Kbd")
	assertEquals(kbd.attributes["id"], "enter-key")
	assertEquals(kbd.attributes["class"], "keyboard-key")
	assertEquals(kbd.attributes["title"], "Enter Key")
	assertEquals(kbd.attributes["lang"], "en")
})

Deno.test("Kbd should filter out invalid attributes", () => {
	const kbd = Kbd({
		id: "valid",
		href: "invalid-for-kbd",
		src: "invalid-for-kbd",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(kbd.tag, "Kbd")
	assertEquals(kbd.attributes["id"], "valid")
	assertEquals(kbd.attributes["href"], undefined)
	assertEquals(kbd.attributes["src"], undefined)
	assertEquals((kbd.attributes as any).invalidAttr, undefined)
})

Deno.test("Kbd should accept text content for single keys", () => {
	const text = TextNode("Enter")
	const kbd = Kbd()([text])

	assertEquals(kbd.tag, "Kbd")
	assertEquals(kbd.children.length, 1)
	assertEquals(kbd.children[0], text)
})

Deno.test("Kbd should handle key combinations", () => {
	const children = [
		{ tag: "Kbd", attributes: {}, children: [TextNode("Ctrl")] },
		TextNode(" + "),
		{ tag: "Kbd", attributes: {}, children: [TextNode("C")] },
	]
	const kbd = Kbd()(children)

	assertEquals(kbd.tag, "Kbd")
	assertEquals(kbd.children.length, 3)
	assertEquals((kbd.children[0] as any).tag, "Kbd")
	assertEquals((kbd.children[1] as any).tag, "TextNode")
	assertEquals((kbd.children[2] as any).tag, "Kbd")
})

Deno.test("Kbd should handle single child (not array)", () => {
	const text = TextNode("Escape")
	const kbd = Kbd()(text)

	assertEquals(kbd.tag, "Kbd")
	assertEquals(kbd.children.length, 1)
	assertEquals(kbd.children[0], text)
})

Deno.test("Kbd should handle special properties", () => {
	const kbd = Kbd({
		calculation: "kbdCalculation",
		dataset: { type: "shortcut", action: "save" },
		display: "inline",
		scripts: ["kbd-highlighter.js"],
		stylesheets: ["kbd.css"],
	})([])

	assertEquals(kbd.tag, "Kbd")
	assertEquals((kbd as any).calculation, "kbdCalculation")
	assertEquals((kbd as any).dataset, { type: "shortcut", action: "save" })
	assertEquals((kbd as any).display, "inline")
	assertEquals((kbd as any).scripts, ["kbd-highlighter.js"])
	assertEquals((kbd as any).stylesheets, ["kbd.css"])
})

Deno.test("Kbd should handle ARIA attributes", () => {
	const kbd = Kbd({
		aria: {
			label: "Keyboard shortcut",
			describedby: "shortcut-description",
		},
	})([])

	assertEquals(kbd.tag, "Kbd")
	assertEquals(kbd.attributes["aria-label"], "Keyboard shortcut")
	assertEquals(kbd.attributes["aria-describedby"], "shortcut-description")
})

Deno.test("Kbd should handle different types of keyboard input", () => {
	const keyTypes = [
		"F1",
		"Tab",
		"Shift",
		"Alt",
		"Space",
		"Backspace",
		"Delete",
		"Home",
		"End",
		"Page Up",
		"Page Down",
		"Arrow Up",
		"Arrow Down",
		"Arrow Left",
		"Arrow Right",
	]

	keyTypes.forEach((key) => {
		const kbd = Kbd()([TextNode(key)])
		assertEquals(kbd.tag, "Kbd")
		assertEquals((kbd.children[0] as any).tag, "TextNode")
	})
})

Deno.test("Kbd should handle complex keyboard shortcuts", () => {
	const complexShortcut = [
		{ tag: "Kbd", attributes: {}, children: [TextNode("Ctrl")] },
		TextNode(" + "),
		{ tag: "Kbd", attributes: {}, children: [TextNode("Shift")] },
		TextNode(" + "),
		{ tag: "Kbd", attributes: {}, children: [TextNode("I")] },
	]
	const kbd = Kbd({ class: "developer-tools-shortcut" })(complexShortcut)

	assertEquals(kbd.tag, "Kbd")
	assertEquals(kbd.children.length, 5)
	assertEquals(kbd.attributes["class"], "developer-tools-shortcut")
	assertEquals((kbd.children[0] as any).tag, "Kbd")
	assertEquals((kbd.children[1] as any).tag, "TextNode")
	assertEquals((kbd.children[2] as any).tag, "Kbd")
	assertEquals((kbd.children[3] as any).tag, "TextNode")
	assertEquals((kbd.children[4] as any).tag, "Kbd")
})

Deno.test("Kbd should handle empty children array", () => {
	const kbd = Kbd()([])
	assertEquals(kbd.tag, "Kbd")
	assertEquals(kbd.children, [])
})
