import { assertEquals, assertExists } from "@std/assert"

import FigCaption from "../../../../../../../constructors/elements/flow/miscellaneous/Figure/FigCaption/index.ts"
import TextNode from "../../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("FigCaption should create a basic figcaption with no attributes or children", () => {
	const figcaption = FigCaption()([])
	assertEquals(figcaption.tag, "FigCaption")
	assertEquals(figcaption.children, [])
	assertExists(figcaption.attributes)
})

Deno.test("FigCaption should create a figcaption with valid global attributes", () => {
	const figcaption = FigCaption({
		id: "chart-caption",
		class: "figure-caption",
		title: "Chart Caption",
		lang: "en",
	})([])

	assertEquals(figcaption.tag, "FigCaption")
	assertEquals(figcaption.attributes["id"], "chart-caption")
	assertEquals(figcaption.attributes["class"], "figure-caption")
	assertEquals(figcaption.attributes["title"], "Chart Caption")
	assertEquals(figcaption.attributes["lang"], "en")
})

Deno.test("FigCaption should filter out invalid attributes", () => {
	const figcaption = FigCaption({
		id: "valid",
		href: "invalid-for-figcaption",
		src: "invalid-for-figcaption",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(figcaption.tag, "FigCaption")
	assertEquals(figcaption.attributes["id"], "valid")
	assertEquals(figcaption.attributes["href"], undefined)
	assertEquals(figcaption.attributes["src"], undefined)
	assertEquals((figcaption.attributes as any).invalidAttr, undefined)
})

Deno.test("FigCaption should accept text content", () => {
	const text = TextNode("Figure 1: Sales data by quarter")
	const figcaption = FigCaption()([text])

	assertEquals(figcaption.tag, "FigCaption")
	assertEquals(figcaption.children.length, 1)
	assertEquals(figcaption.children[0], text)
})

Deno.test("FigCaption should accept flow content children", () => {
	const children = [
		{ tag: "Strong", attributes: {}, children: [TextNode("Figure 1:")] },
		TextNode(" Sales growth over the last quarter showing positive trends."),
	]
	const figcaption = FigCaption()(children)

	assertEquals(figcaption.tag, "FigCaption")
	assertEquals(figcaption.children.length, 2)
	assertEquals((figcaption.children[0] as any).tag, "Strong")
	assertEquals((figcaption.children[1] as any).tag, "TextNode")
})

Deno.test("FigCaption should handle single child (not array)", () => {
	const text = TextNode("Chart showing user engagement metrics")
	const figcaption = FigCaption()(text)

	assertEquals(figcaption.tag, "FigCaption")
	assertEquals(figcaption.children.length, 1)
	assertEquals(figcaption.children[0], text)
})

Deno.test("FigCaption should handle special properties", () => {
	const figcaption = FigCaption({
		calculation: "figcaptionCalculation",
		dataset: { type: "chart-caption", source: "analytics" },
		display: "block",
		scripts: ["caption-formatter.js"],
		stylesheets: ["caption.css"],
	})([])

	assertEquals(figcaption.tag, "FigCaption")
	assertEquals((figcaption as any).calculation, "figcaptionCalculation")
	assertEquals((figcaption as any).dataset, {
		type: "chart-caption",
		source: "analytics",
	})
	assertEquals((figcaption as any).display, "block")
	assertEquals((figcaption as any).scripts, ["caption-formatter.js"])
	assertEquals((figcaption as any).stylesheets, ["caption.css"])
})

Deno.test("FigCaption should handle ARIA attributes", () => {
	const figcaption = FigCaption({
		aria: {
			label: "Chart caption and description",
			describedby: "chart-details",
		},
	})([])

	assertEquals(figcaption.tag, "FigCaption")
	assertEquals(
		figcaption.attributes["aria-label"],
		"Chart caption and description",
	)
	assertEquals(figcaption.attributes["aria-describedby"], "chart-details")
})

Deno.test("FigCaption should handle complex caption content", () => {
	const complexCaption = [
		{ tag: "Strong", attributes: {}, children: [TextNode("Figure 2:")] },
		TextNode(" Comparative analysis of "),
		{ tag: "Em", attributes: {}, children: [TextNode("Q3 vs Q4")] },
		TextNode(" performance metrics. Data source: "),
		{
			tag: "A",
			attributes: { href: "/data-source" },
			children: [TextNode("Internal Analytics")],
		},
	]
	const figcaption = FigCaption({ class: "detailed-caption" })(complexCaption)

	assertEquals(figcaption.tag, "FigCaption")
	assertEquals(figcaption.children.length, 5)
	assertEquals(figcaption.attributes["class"], "detailed-caption")
	assertEquals((figcaption.children[0] as any).tag, "Strong")
	assertEquals((figcaption.children[1] as any).tag, "TextNode")
	assertEquals((figcaption.children[2] as any).tag, "Em")
	assertEquals((figcaption.children[3] as any).tag, "TextNode")
	assertEquals((figcaption.children[4] as any).tag, "A")
})

Deno.test("FigCaption should handle empty children array", () => {
	const figcaption = FigCaption()([])
	assertEquals(figcaption.tag, "FigCaption")
	assertEquals(figcaption.children, [])
})
