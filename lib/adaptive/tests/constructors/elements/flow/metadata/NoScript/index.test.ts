import { assertEquals, assertExists } from "@std/assert"

import NoScript from "../../../../../../constructors/elements/flow/metadata/NoScript/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("NoScript should create a basic noscript with no attributes or children", () => {
	const noscript = NoScript()()([])
	assertEquals(noscript.tag, "noscript")
	assertEquals(noscript.children, [])
	assertExists(noscript.attributes)
})

Deno.test("NoScript should create a noscript with valid global attributes", () => {
	const noscript = NoScript()({
		id: "no-js-fallback",
		class: "fallback-content",
		title: "No JavaScript Fallback",
		lang: "en",
	})([])

	assertEquals(noscript.tag, "noscript")
	assertEquals(noscript.attributes["id"], "no-js-fallback")
	assertEquals(noscript.attributes["class"], "fallback-content")
	assertEquals(noscript.attributes["title"], "No JavaScript Fallback")
	assertEquals(noscript.attributes["lang"], "en")
})

Deno.test("NoScript should filter out invalid attributes", () => {
	const noscript = NoScript()({
		id: "valid",
		href: "invalid-for-noscript",
		src: "invalid-for-noscript",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(noscript.tag, "noscript")
	assertEquals(noscript.attributes["id"], "valid")
	assertEquals(noscript.attributes["href"], undefined)
	assertEquals(noscript.attributes["src"], undefined)
	assertEquals((noscript.attributes as any).invalidAttr, undefined)
})

Deno.test("NoScript should accept fallback content", () => {
	const fallbackText = TextNode("JavaScript is required for this feature.")
	const noscript = NoScript()()([fallbackText])

	assertEquals(noscript.tag, "noscript")
	assertEquals(noscript.children.length, 1)
	assertEquals(noscript.children[0], fallbackText)
})

Deno.test("NoScript should handle multiple children", () => {
	const message = TextNode("Please enable JavaScript.")
	const linkElement = {
		tag: "A",
		attributes: { href: "/fallback.html" },
		children: [TextNode("Use fallback version")],
	}
	const noscript = NoScript()()([message, linkElement])

	assertEquals(noscript.tag, "noscript")
	assertEquals(noscript.children.length, 2)
	assertEquals(noscript.children[0], message)
	assertEquals(noscript.children[1], linkElement)
})

Deno.test("NoScript should handle single child (not array)", () => {
	const message = TextNode("This site requires JavaScript")
	const noscript = NoScript()()(message)

	assertEquals(noscript.tag, "noscript")
	assertEquals(noscript.children.length, 1)
	assertEquals(noscript.children[0], message)
})

Deno.test("NoScript should handle special properties", () => {
	const noscript = NoScript()({
		calculation: "noscriptCalculation",
		dataset: { type: "fallback", priority: "high" },
		display: "block",
		scripts: ["fallback-loader.js"],
		stylesheets: ["fallback.css"],
	})([])

	assertEquals(noscript.tag, "noscript")
	assertEquals((noscript as any).calculation, "noscriptCalculation")
	assertEquals((noscript as any).dataset, {
		type: "fallback",
		priority: "high",
	})
	assertEquals((noscript as any).display, "block")
	assertEquals((noscript as any).scripts, ["fallback-loader.js"])
	assertEquals((noscript as any).stylesheets, ["fallback.css"])
})

Deno.test("NoScript should handle ARIA attributes", () => {
	const noscript = NoScript()({
		aria: {
			label: "JavaScript disabled fallback",
			live: "polite",
		},
	})([])

	assertEquals(noscript.tag, "noscript")
	assertEquals(
		noscript.attributes["aria-label"],
		"JavaScript disabled fallback",
	)
	assertEquals(noscript.attributes["aria-live"], "polite")
})

Deno.test("NoScript should handle complex fallback content", () => {
	const fallbackContent = [
		TextNode("This application requires JavaScript. "),
		{
			tag: "P",
			attributes: {},
			children: [TextNode("Please enable JavaScript and refresh the page.")],
		},
		{
			tag: "A",
			attributes: { href: "/help/javascript.html" },
			children: [TextNode("Learn how to enable JavaScript")],
		},
	]
	const noscript = NoScript()({ class: "js-fallback" })(fallbackContent)

	assertEquals(noscript.tag, "noscript")
	assertEquals(noscript.children.length, 3)
	assertEquals(noscript.attributes["class"], "js-fallback")
	assertEquals((noscript.children[0] as any).tag, "TextNode")
	assertEquals((noscript.children[1] as any).tag, "P")
	assertEquals((noscript.children[2] as any).tag, "A")
})

Deno.test("NoScript should handle empty children array", () => {
	const noscript = NoScript()()([])
	assertEquals(noscript.tag, "noscript")
	assertEquals(noscript.children, [])
})
