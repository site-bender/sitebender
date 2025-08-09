import { assertEquals, assertExists } from "@std/assert"

import Nav from "../../../../../../constructors/elements/flow/sectioning/Nav/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Nav should create a basic nav with no attributes or children", () => {
	const nav = Nav()([])
	assertEquals(nav.tag, "Nav")
	assertEquals(nav.children, [])
	assertExists(nav.attributes)
})

Deno.test("Nav should create a nav with valid global attributes", () => {
	const nav = Nav({
		id: "main-nav",
		class: "navigation",
		title: "Main navigation",
		lang: "en",
	})([])

	assertEquals(nav.tag, "Nav")
	assertEquals(nav.attributes["id"], "main-nav")
	assertEquals(nav.attributes["class"], "navigation")
	assertEquals(nav.attributes["title"], "Main navigation")
	assertEquals(nav.attributes["lang"], "en")
})

Deno.test("Nav should filter out invalid attributes", () => {
	const nav = Nav({
		id: "main-nav",
		invalidAttribute: "should-be-removed",
		class: "navigation",
	})([])

	assertEquals(nav.tag, "Nav")
	assertEquals(nav.attributes["id"], "main-nav")
	assertEquals(nav.attributes["class"], "navigation")
	assertEquals(nav.attributes["invalidAttribute"], undefined)
})

Deno.test("Nav should accept valid flow content children", () => {
	const child1 = TextNode("Home")
	const child2 = TextNode("About")
	const nav = Nav({})([child1, child2])

	assertEquals(nav.tag, "Nav")
	assertEquals(nav.children.length, 2)
	assertEquals(nav.children[0], child1)
	assertEquals(nav.children[1], child2)
})

Deno.test("Nav should handle special properties", () => {
	const nav = Nav({
		id: "main-nav",
		dataset: { testId: "nav-test" },
		display: "block",
		format: "html",
	})([])

	assertEquals(nav.tag, "Nav")
	assertEquals(nav.attributes["id"], "main-nav")
	assertEquals(nav.dataset, { testId: "nav-test" })
	assertEquals(nav.display, "block")
	assertEquals(nav.format, "html")
})

Deno.test("Nav should handle ARIA attributes", () => {
	const nav = Nav({
		id: "main-nav",
		aria: {
			label: "Main navigation",
			expanded: "false",
		},
	})([])

	assertEquals(nav.tag, "Nav")
	assertEquals(nav.attributes["id"], "main-nav")
	assertEquals(nav.attributes["aria-label"], "Main navigation")
	assertEquals(nav.attributes["aria-expanded"], "false")
})

Deno.test("Nav should filter children using isFlowContent validation", () => {
	const validChild = TextNode("Navigation content")
	const nav = Nav({})([validChild])

	assertEquals(nav.tag, "Nav")
	assertEquals(nav.children.length, 1)
	assertEquals(nav.children[0], validChild)
})

Deno.test("Nav should handle empty attributes", () => {
	const nav = Nav({})([])

	assertEquals(nav.tag, "Nav")
	assertEquals(nav.children, [])
	assertExists(nav.attributes)
	assertExists(nav.attributes["id"]) // getId always generates an id
})
