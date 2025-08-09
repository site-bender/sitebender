import { assertEquals, assertExists } from "@std/assert"

import Caption from "../../../../../../../constructors/elements/flow/miscellaneous/Table/Caption/index.ts"
import TextNode from "../../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Caption should create a basic caption with no attributes or children", () => {
	const caption = Caption()([])
	assertEquals(caption.tag, "Caption")
	assertEquals(caption.children, [])
	assertExists(caption.attributes)
})

Deno.test("Caption should create a caption with valid global attributes", () => {
	const caption = Caption({
		id: "table-caption",
		class: "data-caption",
		title: "Data Table Caption",
		lang: "en",
	})([])

	assertEquals(caption.tag, "Caption")
	assertEquals(caption.attributes["id"], "table-caption")
	assertEquals(caption.attributes["class"], "data-caption")
	assertEquals(caption.attributes["title"], "Data Table Caption")
	assertEquals(caption.attributes["lang"], "en")
})

Deno.test("Caption should filter out invalid attributes", () => {
	const caption = Caption({
		id: "valid",
		href: "invalid-for-caption",
		src: "invalid-for-caption",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(caption.tag, "Caption")
	assertEquals(caption.attributes["id"], "valid")
	assertEquals(caption.attributes["href"], undefined)
	assertEquals(caption.attributes["src"], undefined)
	assertEquals((caption.attributes as any).invalidAttr, undefined)
})

Deno.test("Caption should accept text content", () => {
	const text = TextNode("Monthly Sales Data")
	const caption = Caption()([text])

	assertEquals(caption.tag, "Caption")
	assertEquals(caption.children.length, 1)
	assertEquals(caption.children[0], text)
})

Deno.test("Caption should handle phrasing content children", () => {
	const children = [
		TextNode("Q4 "),
		{ tag: "Strong", attributes: {}, children: [TextNode("2023")] },
		TextNode(" Financial Results"),
	]
	const caption = Caption()(children)

	assertEquals(caption.tag, "Caption")
	assertEquals(caption.children.length, 3)
	assertEquals((caption.children[0] as any).tag, "TextNode")
	assertEquals((caption.children[1] as any).tag, "Strong")
	assertEquals((caption.children[2] as any).tag, "TextNode")
})

Deno.test("Caption should handle single child (not array)", () => {
	const text = TextNode("Employee Directory")
	const caption = Caption()(text)

	assertEquals(caption.tag, "Caption")
	assertEquals(caption.children.length, 1)
	assertEquals(caption.children[0], text)
})

Deno.test("Caption should handle special properties", () => {
	const caption = Caption({
		calculation: "captionCalculation",
		dataset: { type: "table-title", source: "database" },
		display: "table-caption",
		scripts: ["caption-formatter.js"],
		stylesheets: ["caption.css"],
	})([])

	assertEquals(caption.tag, "Caption")
	assertEquals((caption as any).calculation, "captionCalculation")
	assertEquals((caption as any).dataset, {
		type: "table-title",
		source: "database",
	})
	assertEquals((caption as any).display, "table-caption")
	assertEquals((caption as any).scripts, ["caption-formatter.js"])
	assertEquals((caption as any).stylesheets, ["caption.css"])
})

Deno.test("Caption should handle ARIA attributes", () => {
	const caption = Caption({
		aria: {
			label: "Data table summary",
			describedby: "table-description",
		},
	})([])

	assertEquals(caption.tag, "Caption")
	assertEquals(caption.attributes["aria-label"], "Data table summary")
	assertEquals(caption.attributes["aria-describedby"], "table-description")
})

Deno.test("Caption should handle complex caption content", () => {
	const complexContent = [
		{
			tag: "Span",
			attributes: { class: "period" },
			children: [TextNode("2023 Q4")],
		},
		TextNode(" - "),
		{ tag: "Em", attributes: {}, children: [TextNode("Revenue Growth")] },
		TextNode(" by Region"),
	]
	const caption = Caption({ class: "financial-caption" })(complexContent)

	assertEquals(caption.tag, "Caption")
	assertEquals(caption.children.length, 4)
	assertEquals(caption.attributes["class"], "financial-caption")
	assertEquals((caption.children[0] as any).tag, "Span")
	assertEquals((caption.children[1] as any).tag, "TextNode")
	assertEquals((caption.children[2] as any).tag, "Em")
	assertEquals((caption.children[3] as any).tag, "TextNode")
})

Deno.test("Caption should handle empty children array", () => {
	const caption = Caption()([])
	assertEquals(caption.tag, "Caption")
	assertEquals(caption.children, [])
})
