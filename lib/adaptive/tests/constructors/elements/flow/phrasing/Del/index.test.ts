import { assertEquals, assertExists } from "@std/assert"

import Del from "../../../../../../constructors/elements/flow/phrasing/Del/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Del should create a basic del with no attributes or children", () => {
	const del = Del()([])
	assertEquals(del.tag, "Del")
	assertEquals(del.children, [])
	assertExists(del.attributes)
})

Deno.test("Del should create a del with cite and datetime attributes", () => {
	const del = Del({
		cite: "https://example.com/edit-log",
		datetime: "2023-12-25T10:00:00Z",
	})([TextNode("Deleted text")])

	assertEquals(del.tag, "Del")
	assertEquals(del.attributes["cite"], "https://example.com/edit-log")
	assertEquals(del.attributes["datetime"], "2023-12-25T10:00:00Z")
	assertEquals(del.children.length, 1)
})

Deno.test("Del should create a del with valid global attributes", () => {
	const del = Del({
		id: "deleted-paragraph",
		class: "removed-content",
		title: "Deleted on review",
		lang: "en",
	})([])

	assertEquals(del.tag, "Del")
	assertEquals(del.attributes["id"], "deleted-paragraph")
	assertEquals(del.attributes["class"], "removed-content")
	assertEquals(del.attributes["title"], "Deleted on review")
	assertEquals(del.attributes["lang"], "en")
})

Deno.test("Del should filter out invalid attributes", () => {
	const del = Del({
		cite: "https://example.com/edit-log",
		datetime: "2023-12-25T10:00:00Z",
		href: "invalid-for-del",
		src: "invalid-for-del",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(del.tag, "Del")
	assertEquals(del.attributes["cite"], "https://example.com/edit-log")
	assertEquals(del.attributes["datetime"], "2023-12-25T10:00:00Z")
	assertEquals(del.attributes["href"], undefined)
	assertEquals(del.attributes["src"], undefined)
	assertEquals((del.attributes as any).invalidAttr, undefined)
})

Deno.test("Del should accept text content for deleted text", () => {
	const text = TextNode("This paragraph was removed during editing.")
	const del = Del({
		cite: "https://example.com/editorial-decision",
		datetime: "2023-12-25T10:00:00Z",
	})([text])

	assertEquals(del.tag, "Del")
	assertEquals(del.children.length, 1)
	assertEquals(del.children[0], text)
})

Deno.test("Del should handle flow content children", () => {
	const children = [
		TextNode("This "),
		{ tag: "Strong", attributes: {}, children: [TextNode("important")] },
		TextNode(" section was deleted."),
	]
	const del = Del({
		cite: "https://example.com/content-review",
		datetime: "2023-12-25T15:30:00Z",
	})(children)

	assertEquals(del.tag, "Del")
	assertEquals(del.children.length, 3)
	assertEquals((del.children[0] as any).tag, "TextNode")
	assertEquals((del.children[1] as any).tag, "Strong")
	assertEquals((del.children[2] as any).tag, "TextNode")
})

Deno.test("Del should handle single child (not array)", () => {
	const text = TextNode("Single deleted item")
	const del = Del({
		cite: "https://example.com/removal-log",
	})(text)

	assertEquals(del.tag, "Del")
	assertEquals(del.children.length, 1)
	assertEquals(del.children[0], text)
})

Deno.test("Del should handle special properties", () => {
	const del = Del({
		cite: "https://example.com/edit-log",
		calculation: "delCalculation",
		dataset: { reason: "editorial", reviewer: "john" },
		display: "line-through",
		scripts: ["deletion-tracker.js"],
		stylesheets: ["del.css"],
	})([])

	assertEquals(del.tag, "Del")
	assertEquals((del as any).calculation, "delCalculation")
	assertEquals((del as any).dataset, {
		reason: "editorial",
		reviewer: "john",
	})
	assertEquals((del as any).display, "line-through")
	assertEquals((del as any).scripts, ["deletion-tracker.js"])
	assertEquals((del as any).stylesheets, ["del.css"])
})

Deno.test("Del should handle ARIA attributes", () => {
	const del = Del({
		cite: "https://example.com/edit-log",
		aria: {
			label: "Deleted content",
			describedby: "deletion-reason",
		},
	})([])

	assertEquals(del.tag, "Del")
	assertEquals(del.attributes["aria-label"], "Deleted content")
	assertEquals(del.attributes["aria-describedby"], "deletion-reason")
})

Deno.test("Del should handle different datetime formats", () => {
	const datetimeFormats = [
		"2023-12-25",
		"2023-12-25T10:00:00Z",
		"2023-12-25T10:00:00.000Z",
		"2023-12-25T10:00:00+01:00",
	]

	datetimeFormats.forEach((datetime) => {
		const del = Del({ datetime })([TextNode("Test")])
		assertEquals(del.attributes["datetime"], datetime)
	})
})

Deno.test("Del should handle deletion tracking with cite", () => {
	const del = Del({
		cite: "https://example.com/edit-log#change-123",
		datetime: "2023-12-25T10:00:00Z",
		class: "editorial-deletion",
	})([
		TextNode("The original content that was removed due to inaccuracy."),
	])

	assertEquals(del.tag, "Del")
	assertEquals(
		del.attributes["cite"],
		"https://example.com/edit-log#change-123",
	)
	assertEquals(del.attributes["datetime"], "2023-12-25T10:00:00Z")
	assertEquals(del.attributes["class"], "editorial-deletion")
	assertEquals(del.children.length, 1)
})

Deno.test("Del should handle empty children array", () => {
	const del = Del({ cite: "https://example.com/edit-log" })([])
	assertEquals(del.tag, "Del")
	assertEquals(del.children, [])
})
