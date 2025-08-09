import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts"

import GlobalAllowText from "../../../../constructors/abstracted/GlobalAllowText/index.ts"

Deno.test("GlobalAllowText should create element with default tag Span and empty attributes", () => {
	const createSpan = GlobalAllowText()()()
	const result = createSpan([])

	assertEquals(result.tag, "Span")
	assertEquals(typeof result.attributes, "object")
	assertExists(result.attributes["id"])
	assertEquals(Array.isArray(result.children), true)
	assertEquals(result.children.length, 0)
})

Deno.test("GlobalAllowText should create element with custom tag", () => {
	const createSummary = GlobalAllowText("Summary")()()
	const result = createSummary([])

	assertEquals(result.tag, "Summary")
	assertEquals(typeof result.attributes, "object")
	assertExists(result.attributes["id"])
})

Deno.test("GlobalAllowText should handle array of children", () => {
	const createSummary = GlobalAllowText("Summary")()({ id: "test-id" })
	const result = createSummary([
		{
			content: "This is the content.",
			tag: "TextNode",
		},
	])

	assertEquals(result.attributes["id"], "test-id")
	assertEquals(result.children, [
		{
			content: "This is the content.",
			tag: "TextNode",
		},
	])
	assertEquals(result.tag, "Summary")
})

Deno.test("GlobalAllowText should handle single child (not array)", () => {
	const createSummary = GlobalAllowText("Summary")()({ id: "test-id" })
	const result = createSummary({
		content: "This is the content.",
		tag: "TextNode",
	})

	assertEquals(result.attributes["id"], "test-id")
	assertEquals(result.children, [
		{
			content: "This is the content.",
			tag: "TextNode",
		},
	])
	assertEquals(result.tag, "Summary")
})

Deno.test("GlobalAllowText should convert plain text to TextNode", () => {
	const createSummary = GlobalAllowText("Summary")()({ id: "test-id" })
	const result = createSummary("This is the content.")

	assertEquals(result.attributes["id"], "test-id")
	assertEquals(result.children, [
		{
			content: "This is the content.",
			tag: "TextNode",
		},
	])
	assertEquals(result.tag, "Summary")
})

Deno.test("GlobalAllowText should process valid global attributes", () => {
	const createSummary = GlobalAllowText("Summary")()({
		id: "custom-id",
		class: "test-class",
		title: "Test Title",
		lang: "en",
		dir: "ltr",
		hidden: "hidden",
		tabIndex: 0,
		role: "button",
	})
	const result = createSummary([])

	assertEquals(result.attributes["id"], "custom-id")
	assertEquals(result.attributes["class"], "test-class")
	assertEquals(result.attributes["title"], "Test Title")
	assertEquals(result.attributes["lang"], "en")
	assertEquals(result.attributes["dir"], "ltr")
	assertEquals(result.attributes["hidden"], "hidden")
	assertEquals(result.attributes["tabindex"], 0)
	assertEquals(result.attributes["role"], "button")
})

Deno.test("GlobalAllowText should handle ARIA attributes", () => {
	const createSummary = GlobalAllowText("Summary")()({
		aria: {
			hidden: "true",
			label: "Summary Button",
			describedby: "description",
		},
	})
	const result = createSummary([])

	assertEquals(result.attributes["aria-hidden"], "true")
	assertEquals(result.attributes["aria-label"], "Summary Button")
	assertEquals(result.attributes["aria-describedby"], "description")
})

Deno.test("GlobalAllowText should handle special properties including format", () => {
	const createSummary = GlobalAllowText("Summary")()({
		calculation: "someCalculation",
		dataset: { type: "summary", value: "test" },
		display: "block",
		format: "uppercase",
		scripts: ["script1.js", "script2.js"],
		stylesheets: ["style1.css", "style2.css"],
	})
	const result = createSummary([])

	assertEquals(result.calculation, "someCalculation")
	assertEquals(result.dataset, { type: "summary", value: "test" })
	assertEquals(result.display, "block")
	assertEquals(result.format, "uppercase")
	assertEquals(result.scripts, ["script1.js", "script2.js"])
	assertEquals(result.stylesheets, ["style1.css", "style2.css"])
})

Deno.test("GlobalAllowText should apply children filter function", () => {
	const filterOnlyTextNodes = (child: any) => child.tag === "TextNode"
	const createSummary = GlobalAllowText("Summary")(filterOnlyTextNodes)({
		id: "test-id",
	})
	const result = createSummary([
		{ content: "Valid text", tag: "TextNode" },
		{ content: "Invalid element", tag: "Span" },
		{ content: "Another valid text", tag: "TextNode" },
	])

	assertEquals(result.children.length, 2)
	assertEquals(result.children[0], { content: "Valid text", tag: "TextNode" })
	assertEquals(result.children[1], {
		content: "Another valid text",
		tag: "TextNode",
	})
})

Deno.test("GlobalAllowText should handle mixed attributes and children", () => {
	const createSummary = GlobalAllowText("Summary")()({
		aria: { hidden: "true" },
		calculation: "calculation",
		class: "class",
		dataset: { value: "value" },
		display: "display",
		format: "format",
		scripts: ["scripts"],
		stylesheets: ["stylesheets"],
	})
	const result = createSummary([
		{
			content: "This is the content.",
			tag: "TextNode",
		},
	])

	assertExists(result.attributes["id"])
	assertEquals(result.attributes["class"], "class")
	assertEquals(result.attributes["aria-hidden"], "true")
	assertEquals(result.children, [
		{
			content: "This is the content.",
			tag: "TextNode",
		},
	])
	assertEquals(result.calculation, "calculation")
	assertEquals(result.dataset, { value: "value" })
	assertEquals(result.display, "display")
	assertEquals(result.format, "format")
	assertEquals(result.scripts, ["scripts"])
	assertEquals(result.stylesheets, ["stylesheets"])
	assertEquals(result.tag, "Summary")
})
