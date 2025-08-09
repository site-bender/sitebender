import { assertEquals, assertExists } from "@std/assert"

import Canvas from "../../../../../../constructors/elements/flow/embedded/Canvas/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Canvas should create a basic canvas element with no attributes or children", () => {
	const canvas = Canvas()([])
	assertEquals(canvas.tag, "Canvas")
	assertEquals(canvas.children, [])
	assertExists(canvas.attributes)
})

Deno.test("Canvas should create a canvas element with valid attributes", () => {
	const canvas = Canvas({
		id: "game-canvas",
		width: 800,
		height: 600,
		class: "game-surface",
	})([])

	assertEquals(canvas.tag, "Canvas")
	assertEquals(canvas.attributes["id"], "game-canvas")
	assertEquals(canvas.attributes["width"], 800)
	assertEquals(canvas.attributes["height"], 600)
	assertEquals(canvas.attributes["class"], "game-surface")
})

Deno.test("Canvas should filter out invalid attributes", () => {
	const canvas = Canvas({
		id: "drawing",
		src: "invalid-for-canvas",
		href: "invalid-for-canvas",
		controls: "invalid-for-canvas",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(canvas.tag, "Canvas")
	assertEquals(canvas.attributes["id"], "drawing")
	assertEquals(canvas.attributes["src"], undefined)
	assertEquals(canvas.attributes["href"], undefined)
	assertEquals(canvas.attributes["controls"], undefined)
	assertEquals((canvas.attributes as any).invalidAttr, undefined)
})

Deno.test("Canvas should accept fallback content for unsupported browsers", () => {
	const fallback = TextNode("Your browser does not support the canvas element.")
	const canvas = Canvas({ width: 400, height: 300 })([fallback])

	assertEquals(canvas.tag, "Canvas")
	assertEquals(canvas.children.length, 1)
	assertEquals(canvas.children[0], fallback)
})

Deno.test("Canvas should handle width and height as integers", () => {
	const canvas = Canvas({
		width: 1024,
		height: 768,
	})([])

	assertEquals(canvas.tag, "Canvas")
	assertEquals(canvas.attributes["width"], 1024)
	assertEquals(canvas.attributes["height"], 768)
})

Deno.test("Canvas should handle complex fallback content", () => {
	const children = [
		{
			tag: "P",
			attributes: {},
			children: [TextNode("Canvas is not supported.")],
		},
		{
			tag: "Img",
			attributes: { src: "fallback.png", alt: "Fallback image" },
			children: [],
		},
	]
	const canvas = Canvas({ width: 500, height: 400 })(children)

	assertEquals(canvas.tag, "Canvas")
	assertEquals(canvas.children.length, 2)
	assertEquals((canvas.children[0] as any).tag, "P")
	assertEquals((canvas.children[1] as any).tag, "Img")
})

Deno.test("Canvas should handle special properties", () => {
	const canvas = Canvas({
		id: "chart-canvas",
		width: 600,
		height: 400,
		calculation: "canvasCalculation",
		dataset: { chartType: "bar", dataPoints: "50" },
		display: "block",
		scripts: ["canvas-renderer.js"],
		stylesheets: ["canvas.css"],
	})([])

	assertEquals(canvas.tag, "Canvas")
	assertEquals((canvas as any).calculation, "canvasCalculation")
	assertEquals((canvas as any).dataset, {
		chartType: "bar",
		dataPoints: "50",
	})
	assertEquals((canvas as any).display, "block")
	assertEquals((canvas as any).scripts, ["canvas-renderer.js"])
	assertEquals((canvas as any).stylesheets, ["canvas.css"])
})

Deno.test("Canvas should handle ARIA attributes", () => {
	const canvas = Canvas({
		id: "accessible-canvas",
		width: 400,
		height: 300,
		aria: {
			label: "Interactive chart",
			describedby: "chart-description",
		},
	})([])

	assertEquals(canvas.tag, "Canvas")
	assertEquals(canvas.attributes["aria-label"], "Interactive chart")
	assertEquals(canvas.attributes["aria-describedby"], "chart-description")
})

Deno.test("Canvas should handle single child (not array)", () => {
	const fallback = TextNode("Canvas not supported")
	const canvas = Canvas({ width: 300, height: 200 })(fallback)

	assertEquals(canvas.tag, "Canvas")
	assertEquals(canvas.children.length, 1)
	assertEquals(canvas.children[0], fallback)
})

Deno.test("Canvas should handle missing dimensions", () => {
	const canvas = Canvas({
		id: "no-dimensions",
	})([])

	assertEquals(canvas.tag, "Canvas")
	assertEquals(canvas.attributes["id"], "no-dimensions")
	assertEquals(canvas.attributes["width"], undefined)
	assertEquals(canvas.attributes["height"], undefined)
})

Deno.test("Canvas should handle empty children array", () => {
	const canvas = Canvas({ id: "empty-canvas", width: 400, height: 300 })([])
	assertEquals(canvas.tag, "Canvas")
	assertEquals(canvas.children, [])
})
