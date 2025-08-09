import { assertEquals, assertExists } from "@std/assert"

import HGroup from "../../../../../../constructors/elements/flow/heading/HGroup/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("HGroup should create a basic hgroup with no attributes or children", () => {
	const hgroup = HGroup()()([])
	assertEquals(hgroup.tag, "hgroup")
	assertEquals(hgroup.children, [])
	assertExists(hgroup.attributes)
})

Deno.test("HGroup should create an hgroup with valid global attributes", () => {
	const hgroup = HGroup()({
		id: "main-heading-group",
		class: "page-header",
		title: "Heading Group",
		lang: "en",
	})([])

	assertEquals(hgroup.tag, "hgroup")
	assertEquals(hgroup.attributes["id"], "main-heading-group")
	assertEquals(hgroup.attributes["class"], "page-header")
	assertEquals(hgroup.attributes["title"], "Heading Group")
	assertEquals(hgroup.attributes["lang"], "en")
})

Deno.test("HGroup should filter out invalid attributes", () => {
	const hgroup = HGroup()({
		id: "valid",
		href: "invalid-for-hgroup",
		src: "invalid-for-hgroup",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(hgroup.tag, "hgroup")
	assertEquals(hgroup.attributes["id"], "valid")
	assertEquals(hgroup.attributes["href"], undefined)
	assertEquals(hgroup.attributes["src"], undefined)
	assertEquals((hgroup.attributes as any).invalidAttr, undefined)
})

Deno.test("HGroup should accept heading elements as children", () => {
	const h1 = { tag: "H1", attributes: {}, children: [TextNode("Main Title")] }
	const h2 = { tag: "H2", attributes: {}, children: [TextNode("Subtitle")] }
	const hgroup = HGroup()()([h1, h2])

	assertEquals(hgroup.tag, "hgroup")
	assertEquals(hgroup.children.length, 2)
	assertEquals(hgroup.children[0], h1)
	assertEquals(hgroup.children[1], h2)
})

Deno.test("HGroup should handle single child (not array)", () => {
	const h1 = {
		tag: "H1",
		attributes: {},
		children: [TextNode("Single Heading")],
	}
	const hgroup = HGroup()()(h1)

	assertEquals(hgroup.tag, "hgroup")
	assertEquals(hgroup.children.length, 1)
	assertEquals(hgroup.children[0], h1)
})

Deno.test("HGroup should handle special properties", () => {
	const hgroup = HGroup()({
		calculation: "headingCalculation",
		dataset: { type: "heading-group", level: "1" },
		display: "block",
		scripts: ["heading-script.js"],
		stylesheets: ["heading-style.css"],
	})([])

	assertEquals(hgroup.tag, "hgroup")
	assertEquals((hgroup as any).calculation, "headingCalculation")
	assertEquals((hgroup as any).dataset, { type: "heading-group", level: "1" })
	assertEquals((hgroup as any).display, "block")
	assertEquals((hgroup as any).scripts, ["heading-script.js"])
	assertEquals((hgroup as any).stylesheets, ["heading-style.css"])
})

Deno.test("HGroup should handle ARIA attributes", () => {
	const hgroup = HGroup()({
		aria: {
			label: "Page heading group",
			level: "1",
		},
	})([])

	assertEquals(hgroup.tag, "hgroup")
	assertEquals(hgroup.attributes["aria-label"], "Page heading group")
	assertEquals(hgroup.attributes["aria-level"], "1")
})

Deno.test("HGroup should handle multiple heading levels", () => {
	const h1 = { tag: "H1", attributes: {}, children: [TextNode("Chapter 1")] }
	const h2 = { tag: "H2", attributes: {}, children: [TextNode("Introduction")] }
	const h3 = { tag: "H3", attributes: {}, children: [TextNode("Overview")] }
	const hgroup = HGroup()()([h1, h2, h3])

	assertEquals(hgroup.tag, "hgroup")
	assertEquals(hgroup.children.length, 3)
	assertEquals((hgroup.children[0] as any).tag, "H1")
	assertEquals((hgroup.children[1] as any).tag, "H2")
	assertEquals((hgroup.children[2] as any).tag, "H3")
})

Deno.test("HGroup should handle empty children array", () => {
	const hgroup = HGroup()()([])
	assertEquals(hgroup.tag, "hgroup")
	assertEquals(hgroup.children, [])
})
