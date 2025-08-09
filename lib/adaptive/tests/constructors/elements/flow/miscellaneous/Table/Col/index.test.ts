import { assertEquals, assertExists } from "@std/assert"

import Col from "../../../../../../../constructors/elements/flow/miscellaneous/Table/Col/index.ts"

Deno.test("Col should create a basic col with no attributes", () => {
	const col = Col()
	assertEquals(col.tag, "Col")
	assertExists(col.attributes)
})

Deno.test("Col should create a col with span attribute", () => {
	const col = Col({
		span: 3,
	})

	assertEquals(col.tag, "Col")
	assertEquals(col.attributes["span"], 3)
})

Deno.test("Col should handle global attributes", () => {
	const col = Col({
		id: "first-col",
		class: "data-column",
		title: "First Column",
	})

	assertEquals(col.tag, "Col")
	assertEquals(col.attributes["id"], "first-col")
	assertEquals(col.attributes["class"], "data-column")
	assertEquals(col.attributes["title"], "First Column")
})

Deno.test("Col should filter out invalid attributes", () => {
	const col = Col({
		span: 2,
		href: "invalid-for-col",
		src: "invalid-for-col",
		invalidAttr: "should-be-filtered",
	} as any)

	assertEquals(col.tag, "Col")
	assertEquals(col.attributes["span"], 2)
	assertEquals(col.attributes["href"], undefined)
	assertEquals(col.attributes["src"], undefined)
	assertEquals((col.attributes as any).invalidAttr, undefined)
})

Deno.test("Col should handle ARIA attributes", () => {
	const col = Col({
		aria: {
			label: "Data column",
			sort: "ascending",
		},
	})

	assertEquals(col.tag, "Col")
	assertEquals(col.attributes["aria-label"], "Data column")
	assertEquals(col.attributes["aria-sort"], "ascending")
})

Deno.test("Col should handle special properties", () => {
	const col = Col({
		calculation: "colCalculation",
		dataset: { type: "numeric", format: "currency" },
		display: "table-column",
		scripts: ["col-formatter.js"],
		stylesheets: ["col.css"],
	})

	assertEquals(col.tag, "Col")
	assertEquals((col as any).calculation, "colCalculation")
	assertEquals((col as any).dataset, { type: "numeric", format: "currency" })
	assertEquals((col as any).display, "table-column")
	assertEquals((col as any).scripts, ["col-formatter.js"])
	assertEquals((col as any).stylesheets, ["col.css"])
})

Deno.test("Col should handle different span values", () => {
	const spans = [1, 2, 3, 5, 10]

	spans.forEach((span) => {
		const col = Col({ span })
		assertEquals(col.attributes["span"], span)
	})
})
