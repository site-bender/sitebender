import { assertEquals, assertExists } from "@std/assert"

import Ins from "../../../../../../constructors/elements/flow/phrasing/Ins/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Ins should create a basic ins with no attributes or children", () => {
	const ins = Ins()([])
	assertEquals(ins.tag, "Ins")
	assertEquals(ins.children, [])
	assertExists(ins.attributes)
})

Deno.test("Ins should create an ins with cite and datetime attributes", () => {
	const ins = Ins({
		cite: "https://example.com/edit-log",
		datetime: "2023-12-25T10:00:00Z",
	})([TextNode("Inserted text")])

	assertEquals(ins.tag, "Ins")
	assertEquals(ins.attributes["cite"], "https://example.com/edit-log")
	assertEquals(ins.attributes["datetime"], "2023-12-25T10:00:00Z")
	assertEquals(ins.children.length, 1)
})

Deno.test("Ins should create an ins with valid global attributes", () => {
	const ins = Ins({
		id: "inserted-paragraph",
		class: "added-content",
		title: "Added on review",
		lang: "en",
	})([])

	assertEquals(ins.tag, "Ins")
	assertEquals(ins.attributes["id"], "inserted-paragraph")
	assertEquals(ins.attributes["class"], "added-content")
	assertEquals(ins.attributes["title"], "Added on review")
	assertEquals(ins.attributes["lang"], "en")
})

Deno.test("Ins should filter out invalid attributes", () => {
	const ins = Ins({
		cite: "https://example.com/edit-log",
		datetime: "2023-12-25T10:00:00Z",
		href: "invalid-for-ins",
		src: "invalid-for-ins",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(ins.tag, "Ins")
	assertEquals(ins.attributes["cite"], "https://example.com/edit-log")
	assertEquals(ins.attributes["datetime"], "2023-12-25T10:00:00Z")
	assertEquals(ins.attributes["href"], undefined)
	assertEquals(ins.attributes["src"], undefined)
	assertEquals((ins.attributes as any).invalidAttr, undefined)
})

Deno.test("Ins should accept text content for inserted text", () => {
	const text = TextNode("This paragraph was added during editing.")
	const ins = Ins({
		cite: "https://example.com/editorial-addition",
		datetime: "2023-12-25T10:00:00Z",
	})([text])

	assertEquals(ins.tag, "Ins")
	assertEquals(ins.children.length, 1)
	assertEquals(ins.children[0], text)
})

Deno.test("Ins should handle flow content children", () => {
	const children = [
		TextNode("This "),
		{ tag: "Strong", attributes: {}, children: [TextNode("important")] },
		TextNode(" section was added."),
	]
	const ins = Ins({
		cite: "https://example.com/content-addition",
		datetime: "2023-12-25T15:30:00Z",
	})(children)

	assertEquals(ins.tag, "Ins")
	assertEquals(ins.children.length, 3)
	assertEquals((ins.children[0] as any).tag, "TextNode")
	assertEquals((ins.children[1] as any).tag, "Strong")
	assertEquals((ins.children[2] as any).tag, "TextNode")
})

Deno.test("Ins should handle single child (not array)", () => {
	const text = TextNode("Single inserted item")
	const ins = Ins({
		cite: "https://example.com/addition-log",
	})(text)

	assertEquals(ins.tag, "Ins")
	assertEquals(ins.children.length, 1)
	assertEquals(ins.children[0], text)
})

Deno.test("Ins should handle special properties", () => {
	const ins = Ins({
		cite: "https://example.com/edit-log",
		calculation: "insCalculation",
		dataset: { reason: "enhancement", author: "jane" },
		display: "underline",
		scripts: ["insertion-tracker.js"],
		stylesheets: ["ins.css"],
	})([])

	assertEquals(ins.tag, "Ins")
	assertEquals((ins as any).calculation, "insCalculation")
	assertEquals((ins as any).dataset, {
		reason: "enhancement",
		author: "jane",
	})
	assertEquals((ins as any).display, "underline")
	assertEquals((ins as any).scripts, ["insertion-tracker.js"])
	assertEquals((ins as any).stylesheets, ["ins.css"])
})

Deno.test("Ins should handle ARIA attributes", () => {
	const ins = Ins({
		cite: "https://example.com/edit-log",
		aria: {
			label: "Inserted content",
			describedby: "insertion-reason",
		},
	})([])

	assertEquals(ins.tag, "Ins")
	assertEquals(ins.attributes["aria-label"], "Inserted content")
	assertEquals(ins.attributes["aria-describedby"], "insertion-reason")
})

Deno.test("Ins should handle different datetime formats", () => {
	const datetimeFormats = [
		"2023-12-25",
		"2023-12-25T10:00:00Z",
		"2023-12-25T10:00:00.000Z",
		"2023-12-25T10:00:00+01:00",
	]

	datetimeFormats.forEach((datetime) => {
		const ins = Ins({ datetime })([TextNode("Test")])
		assertEquals(ins.attributes["datetime"], datetime)
	})
})

Deno.test("Ins should handle insertion tracking with cite", () => {
	const ins = Ins({
		cite: "https://example.com/edit-log#addition-456",
		datetime: "2023-12-25T14:30:00Z",
		class: "editorial-insertion",
	})([
		TextNode("This new content was added to improve clarity."),
	])

	assertEquals(ins.tag, "Ins")
	assertEquals(
		ins.attributes["cite"],
		"https://example.com/edit-log#addition-456",
	)
	assertEquals(ins.attributes["datetime"], "2023-12-25T14:30:00Z")
	assertEquals(ins.attributes["class"], "editorial-insertion")
	assertEquals(ins.children.length, 1)
})

Deno.test("Ins should handle empty children array", () => {
	const ins = Ins({ cite: "https://example.com/edit-log" })([])
	assertEquals(ins.tag, "Ins")
	assertEquals(ins.children, [])
})
