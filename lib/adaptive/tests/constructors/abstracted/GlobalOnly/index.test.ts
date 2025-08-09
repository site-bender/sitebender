import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts"

import GlobalOnly from "../../../../constructors/abstracted/GlobalOnly/index.ts"

Deno.test("GlobalOnly should create an element with default tag Span and no attributes", () => {
	const createSpan = GlobalOnly()
	const result = createSpan()()()

	assertEquals(result.tag, "Span")
	assertEquals(typeof result.attributes, "object")
	assertExists(result.attributes["id"])
	assertEquals(result.children, [])
})

Deno.test("GlobalOnly should create an element with custom tag", () => {
	const createDiv = GlobalOnly("Div")
	const result = createDiv()()()

	assertEquals(result.tag, "Div")
	assertEquals(typeof result.attributes, "object")
	assertExists(result.attributes["id"])
})

Deno.test("GlobalOnly should process valid global attributes", () => {
	const createSpan = GlobalOnly("Span")
	const result = createSpan()({
		id: "custom-id",
		class: "test-class",
		title: "Test Title",
		lang: "en",
		dir: "ltr",
		hidden: "hidden",
		tabIndex: 0,
		role: "button",
	})()

	assertEquals(result.attributes["id"], "custom-id")
	assertEquals(result.attributes["class"], "test-class")
	assertEquals(result.attributes["title"], "Test Title")
	assertEquals(result.attributes["lang"], "en")
	assertEquals(result.attributes["dir"], "ltr")
	assertEquals(result.attributes["hidden"], "hidden")
	assertEquals(result.attributes["tabindex"], 0)
	assertEquals(result.attributes["role"], "button")
})

Deno.test("GlobalOnly should filter out invalid attributes", () => {
	const createSpan = GlobalOnly("Span")
	const result = createSpan()({
		id: "test-id",
		href: "https://example.com", // Invalid for Span
		src: "image.jpg", // Invalid for Span
		invalidAttr: "should-be-filtered",
	} as any)()

	assertEquals(result.attributes["id"], "test-id")
	assertEquals(result.attributes["href"], undefined)
	assertEquals(result.attributes["src"], undefined)
	assertEquals((result.attributes as any).invalidAttr, undefined)
})

Deno.test("GlobalOnly should handle ARIA attributes", () => {
	const createSpan = GlobalOnly("Span")
	const result = createSpan()({
		aria: {
			hidden: "true",
			label: "Test Label",
			describedby: "description",
		},
	})()

	assertEquals(result.attributes["aria-hidden"], "true")
	assertEquals(result.attributes["aria-label"], "Test Label")
	assertEquals(result.attributes["aria-describedby"], "description")
})

Deno.test("GlobalOnly should handle special properties", () => {
	const createSpan = GlobalOnly("Span")
	const result = createSpan()({
		calculation: "someCalculation",
		dataset: { type: "test", value: "data" },
		display: "block",
		scripts: ["script1.js", "script2.js"],
		stylesheets: ["style1.css", "style2.css"],
	})()

	assertEquals(result.calculation, "someCalculation")
	assertEquals(result.dataset, { type: "test", value: "data" })
	assertEquals(result.display, "block")
	assertEquals(result.scripts, ["script1.js", "script2.js"])
	assertEquals(result.stylesheets, ["style1.css", "style2.css"])
})

Deno.test("GlobalOnly should handle children as array", () => {
	const createSpan = GlobalOnly("Span")
	const child1 = { tag: "TextNode", text: "Hello" }
	const child2 = { tag: "TextNode", text: "World" }
	const result = createSpan()()([child1, child2])

	assertEquals(result.children.length, 2)
	assertEquals(result.children[0], child1)
	assertEquals(result.children[1], child2)
})

Deno.test("GlobalOnly should handle single child (not array)", () => {
	const createSpan = GlobalOnly("Span")
	const child = { tag: "TextNode", text: "Single child" }
	const result = createSpan()()(child)

	assertEquals(result.children.length, 1)
	assertEquals(result.children[0], child)
})

Deno.test("GlobalOnly should apply child filter function", () => {
	const createSpan = GlobalOnly("Span")
	const filterValidChildren = (child: any) => child.tag === "TextNode"
	const validChild = { tag: "TextNode", text: "Valid" }
	const invalidChild = { tag: "Invalid", text: "Invalid" }

	const result = createSpan(filterValidChildren)()([validChild, invalidChild])

	assertEquals(result.children.length, 1)
	assertEquals(result.children[0], validChild)
})

Deno.test("GlobalOnly should handle empty children array", () => {
	const createSpan = GlobalOnly("Span")
	const result = createSpan()()([])

	assertEquals(result.children, [])
})

Deno.test("GlobalOnly should handle undefined special properties", () => {
	const createSpan = GlobalOnly("Span")
	const result = createSpan()({
		calculation: undefined,
		dataset: undefined,
		display: undefined,
		scripts: undefined,
		stylesheets: undefined,
	})()

	assertEquals(result.calculation, undefined)
	assertEquals(result.dataset, undefined)
	assertEquals(result.display, undefined)
	assertEquals(result.scripts, undefined)
	assertEquals(result.stylesheets, undefined)
})
