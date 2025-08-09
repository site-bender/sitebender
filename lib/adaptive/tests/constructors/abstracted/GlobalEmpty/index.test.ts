import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts"

import GlobalEmpty from "../../../../constructors/abstracted/GlobalEmpty/index.ts"

Deno.test("GlobalEmpty should create an element with default tag Hr and no attributes", () => {
	const createHr = GlobalEmpty()
	const result = createHr()

	assertEquals(result.tag, "Hr")
	assertEquals(typeof result.attributes, "object")
	assertExists(result.attributes["id"])
	assertEquals(Object.keys(result.attributes).length, 1) // Only id
})

Deno.test("GlobalEmpty should create an element with custom tag", () => {
	const createBr = GlobalEmpty("Br")
	const result = createBr()

	assertEquals(result.tag, "Br")
	assertEquals(typeof result.attributes, "object")
	assertExists(result.attributes["id"])
})

Deno.test("GlobalEmpty should process valid global attributes", () => {
	const createHr = GlobalEmpty("Hr")
	const result = createHr({
		id: "custom-id",
		class: "test-class",
		title: "Test Title",
		lang: "en",
		dir: "ltr",
		hidden: "hidden",
		tabIndex: 0,
		role: "separator",
	})

	assertEquals(result.attributes["id"], "custom-id")
	assertEquals(result.attributes["class"], "test-class")
	assertEquals(result.attributes["title"], "Test Title")
	assertEquals(result.attributes["lang"], "en")
	assertEquals(result.attributes["dir"], "ltr")
	assertEquals(result.attributes["hidden"], "hidden")
	assertEquals(result.attributes["tabindex"], 0) // tabIndex gets converted to lowercase
	assertEquals(result.attributes["role"], "separator")
})

Deno.test("GlobalEmpty should filter out invalid attributes", () => {
	const createHr = GlobalEmpty("Hr")
	const result = createHr({
		id: "test-id",
		href: "https://example.com", // Invalid for Hr
		src: "image.jpg", // Invalid for Hr
		invalidAttr: "should-be-filtered",
	} as any)

	assertEquals(result.attributes["id"], "test-id")
	assertEquals(result.attributes["href"], undefined)
	assertEquals(result.attributes["src"], undefined)
	assertEquals((result.attributes as any).invalidAttr, undefined)
})

Deno.test("GlobalEmpty should handle ARIA attributes", () => {
	const createHr = GlobalEmpty("Hr")
	const result = createHr({
		aria: {
			hidden: "true",
			label: "Divider",
			describedby: "description",
		},
	})

	assertEquals(result.attributes["aria-hidden"], "true")
	assertEquals(result.attributes["aria-label"], "Divider")
	assertEquals(result.attributes["aria-describedby"], "description")
})

Deno.test("GlobalEmpty should handle special properties", () => {
	const createHr = GlobalEmpty("Hr")
	const result = createHr({
		calculation: "someCalculation",
		dataset: { type: "divider", value: "test" },
		display: "block",
		scripts: ["script1.js", "script2.js"],
		stylesheets: ["style1.css", "style2.css"],
	})

	assertEquals(result.calculation, "someCalculation")
	assertEquals(result.dataset, { type: "divider", value: "test" })
	assertEquals(result.display, "block")
	assertEquals(result.scripts, ["script1.js", "script2.js"])
	assertEquals(result.stylesheets, ["style1.css", "style2.css"])
})

Deno.test("GlobalEmpty should handle mixed valid and invalid attributes", () => {
	const createHr = GlobalEmpty("Hr")
	const result = createHr({
		id: "mixed-test",
		class: "valid-class",
		href: "invalid-for-hr",
		title: "Valid Title",
		alt: "invalid-for-hr",
		calculation: "testCalculation",
	} as any)

	assertEquals(result.attributes["id"], "mixed-test")
	assertEquals(result.attributes["class"], "valid-class")
	assertEquals(result.attributes["title"], "Valid Title")
	assertEquals(result.attributes["href"], undefined)
	assertEquals((result.attributes as any).alt, undefined)
	assertEquals(result.calculation, "testCalculation")
})

Deno.test("GlobalEmpty should handle empty and undefined special properties", () => {
	const createHr = GlobalEmpty("Hr")
	const result = createHr({
		calculation: undefined,
		dataset: undefined,
		display: undefined,
		scripts: undefined,
		stylesheets: undefined,
	})

	assertEquals(result.calculation, undefined)
	assertEquals(result.dataset, undefined)
	assertEquals(result.display, undefined)
	assertEquals(result.scripts, undefined)
	assertEquals(result.stylesheets, undefined)
})

Deno.test("GlobalEmpty should handle dataset property separately from attributes", () => {
	const createHr = GlobalEmpty("Hr")
	const result = createHr({
		id: "test-with-dataset",
		dataset: {
			name: "Bob",
			age: 42,
			isGuru: true,
		},
		"data-should-be-filtered": "value", // This should be filtered out by pickGlobalAttributes
	})

	// dataset should be a separate top-level property
	assertEquals(result.dataset, {
		name: "Bob",
		age: 42,
		isGuru: true,
	})

	// data-* attributes should NOT appear in attributes (they're filtered out)
	assertEquals(result.attributes["data-should-be-filtered"], undefined)
	assertEquals(result.attributes["data-name"], undefined)
	assertEquals(result.attributes["data-age"], undefined)
})
