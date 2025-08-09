import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts"

import Section from "../../../../../../constructors/elements/flow/sectioning/Section/index.ts"

Deno.test("Section should create a basic section with no attributes or children", () => {
	const result = Section()()

	assertEquals(result.tag, "Section")
	assertEquals(typeof result.attributes, "object")
	assertExists(result.attributes["id"])
	assertEquals(Array.isArray(result.children), true)
	assertEquals(result.children.length, 0)
})

Deno.test("Section should create a section with valid global attributes", () => {
	const result = Section({
		id: "main-section",
		class: "section-content",
		title: "Main Section",
		lang: "en",
		dir: "ltr",
		role: "region",
	})([])

	assertEquals(result.attributes["id"], "main-section")
	assertEquals(result.attributes["class"], "section-content")
	assertEquals(result.attributes["title"], "Main Section")
	assertEquals(result.attributes["lang"], "en")
	assertEquals(result.attributes["dir"], "ltr")
	assertEquals(result.attributes["role"], "region")
})

Deno.test("Section should filter out invalid attributes", () => {
	const result = Section({
		id: "test-section",
		href: "https://example.com", // Invalid for section
		src: "image.jpg", // Invalid for section
		type: "button", // Invalid for section
	} as any)([])

	assertEquals(result.attributes["id"], "test-section")
	assertEquals(result.attributes["href"], undefined)
	assertEquals(result.attributes["src"], undefined)
	assertEquals((result.attributes as any).type, undefined)
})

Deno.test("Section should accept valid flow content children", () => {
	const flowChildren = [
		{ tag: "Div", content: "Div content" },
		{ tag: "P", content: "Paragraph content" },
		{ tag: "H2", content: "Header content" },
		{ tag: "Ul", content: "List content" },
	]

	const result = Section({ id: "test-section" })(flowChildren)

	assertEquals(result.children.length, 4)
	assertEquals((result.children[0] as any).tag, "Div")
	assertEquals((result.children[1] as any).tag, "P")
	assertEquals((result.children[2] as any).tag, "H2")
	assertEquals((result.children[3] as any).tag, "Ul")
})

Deno.test("Section should handle special properties", () => {
	const result = Section({
		calculation: "someCalculation",
		dataset: { type: "section", category: "content" },
		display: "block",
		format: "html",
		scripts: ["section.js"],
		stylesheets: ["section.css"],
	})([])

	assertEquals(result.calculation, "someCalculation")
	assertEquals(result.dataset, { type: "section", category: "content" })
	assertEquals(result.display, "block")
	assertEquals(result.format, "html")
	assertEquals(result.scripts, ["section.js"])
	assertEquals(result.stylesheets, ["section.css"])
})

Deno.test("Section should handle ARIA attributes", () => {
	const result = Section({
		aria: {
			label: "Main Section Content",
			describedby: "section-description",
			hidden: "false",
		},
	})([])

	assertEquals(result.attributes["aria-label"], "Main Section Content")
	assertEquals(result.attributes["aria-describedby"], "section-description")
	assertEquals(result.attributes["aria-hidden"], "false")
})

Deno.test("Section should filter children using isFlowContent validation", () => {
	const mixedChildren = [
		{ tag: "P", content: "Valid paragraph" },
		{ tag: "InvalidElement", content: "Should be filtered" },
		{ tag: "H3", content: "Valid header" },
	]

	const result = Section({ id: "test-section" })(mixedChildren)

	// isFlowContent should filter out invalid elements
	assertEquals(result.children.length, 2) // Only valid flow content elements remain
	assertEquals(result.tag, "Section")
})
