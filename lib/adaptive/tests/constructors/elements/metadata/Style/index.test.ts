import { assertEquals, assertExists } from "@std/assert"

import Style from "../../../../../constructors/elements/metadata/Style/index.ts"
import TextNode from "../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Style should create a basic style element with no attributes", () => {
	const style = Style()([])
	assertEquals(style.tag, "Style")
	assertExists(style.attributes)
	assertExists(style.attributes["id"])
})

Deno.test("Style should create a style element with media attribute", () => {
	const style = Style({
		media: "screen and (max-width: 600px)",
	})([])

	assertEquals(style.tag, "Style")
	assertEquals(style.attributes["media"], "screen and (max-width: 600px)")
})

Deno.test("Style should create a style element with blocking attribute", () => {
	const style = Style({
		blocking: "render",
	})([])

	assertEquals(style.tag, "Style")
	assertEquals(style.attributes["blocking"], "render")
})

Deno.test("Style should create a style element with scoped attribute", () => {
	const style = Style({
		scoped: true,
	})([])

	assertEquals(style.tag, "Style")
	assertEquals(style.attributes["scoped"], true)
})

Deno.test("Style should handle multiple style-specific attributes", () => {
	const style = Style({
		media: "print",
		blocking: "render",
		scoped: false,
		title: "Print styles",
	})([])

	assertEquals(style.tag, "Style")
	assertEquals(style.attributes["media"], "print")
	assertEquals(style.attributes["blocking"], "render")
	assertEquals(style.attributes["scoped"], false)
	assertEquals(style.attributes["title"], "Print styles")
})

Deno.test("Style should handle global attributes", () => {
	const style = Style({
		id: "main-styles",
		class: "critical-css",
		lang: "en",
	})([])

	assertEquals(style.tag, "Style")
	assertEquals(style.attributes["id"], "main-styles")
	assertEquals(style.attributes["class"], "critical-css")
	assertEquals(style.attributes["lang"], "en")
})

Deno.test("Style should handle ARIA attributes", () => {
	const style = Style({
		aria: {
			label: "Critical styles",
			hidden: "true",
		},
	})([])

	assertEquals(style.tag, "Style")
	assertEquals(style.attributes["aria-label"], "Critical styles")
	assertEquals(style.attributes["aria-hidden"], "true")
})

Deno.test("Style should handle special properties", () => {
	const style = Style({
		calculation: "styleCalculation",
		dataset: { type: "critical", priority: "high" },
		display: "none",
		scripts: ["style-loader.js"],
		stylesheets: ["bootstrap.css"],
	})([])

	assertEquals(style.tag, "Style")
	assertEquals((style as any).calculation, "styleCalculation")
	assertEquals((style as any).dataset, { type: "critical", priority: "high" })
	assertEquals((style as any).display, "none")
	assertEquals((style as any).scripts, ["style-loader.js"])
	assertEquals((style as any).stylesheets, ["bootstrap.css"])
})

Deno.test("Style should accept text content", () => {
	const cssText = TextNode("body { margin: 0; padding: 0; }")
	const style = Style()([cssText])

	assertEquals(style.tag, "Style")
	assertEquals(style.children.length, 1)
	assertEquals(style.children[0], cssText)
})

Deno.test("Style should filter out invalid attributes", () => {
	const style = Style({
		media: "screen",
		blocking: "render",
		href: "invalid-for-style",
		src: "invalid-for-style",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(style.tag, "Style")
	assertEquals(style.attributes["media"], "screen")
	assertEquals(style.attributes["blocking"], "render")
	assertEquals(style.attributes["href"], undefined)
	assertEquals(style.attributes["src"], undefined)
	assertEquals((style.attributes as any).invalidAttr, undefined)
})

Deno.test("Style should filter out invalid blocking values", () => {
	const style = Style({
		blocking: "invalid-blocking-value",
	} as any)([])

	assertEquals(style.tag, "Style")
	assertEquals(style.attributes["blocking"], undefined)
})

Deno.test("Style should handle different media types", () => {
	const mediaQueries = [
		"screen",
		"print",
		"screen and (max-width: 768px)",
		"print and (orientation: landscape)",
		"speech",
		"all",
	]

	mediaQueries.forEach((media) => {
		const style = Style({ media })([])
		assertEquals(style.attributes["media"], media)
	})
})

Deno.test("Style should handle complex CSS content", () => {
	const complexCSS = TextNode(`
		body {
			font-family: Arial, sans-serif;
			margin: 0;
			padding: 20px;
		}
		.container {
			max-width: 1200px;
			margin: 0 auto;
		}
	`)
	const style = Style({ media: "screen" })([complexCSS])

	assertEquals(style.tag, "Style")
	assertEquals(style.children.length, 1)
	assertEquals(style.children[0], complexCSS)
	assertEquals(style.attributes["media"], "screen")
})
