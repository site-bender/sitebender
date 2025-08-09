import { assertEquals, assertExists } from "@std/assert"

import Aside from "../../../../../../constructors/elements/flow/sectioning/Aside/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Aside should create a basic aside with no attributes or children", () => {
	const aside = Aside()([])
	assertEquals(aside.tag, "Aside")
	assertEquals(aside.children, [])
	assertExists(aside.attributes)
})

Deno.test("Aside should create an aside with valid global attributes", () => {
	const aside = Aside({
		id: "sidebar",
		class: "aside-container",
		title: "Sidebar content",
		lang: "en",
	})([])

	assertEquals(aside.tag, "Aside")
	assertEquals(aside.attributes["id"], "sidebar")
	assertEquals(aside.attributes["class"], "aside-container")
	assertEquals(aside.attributes["title"], "Sidebar content")
	assertEquals(aside.attributes["lang"], "en")
})

Deno.test("Aside should filter out invalid attributes", () => {
	const aside = Aside({
		id: "sidebar",
		invalidAttribute: "should-be-removed",
		class: "aside-container",
	})([])

	assertEquals(aside.tag, "Aside")
	assertEquals(aside.attributes["id"], "sidebar")
	assertEquals(aside.attributes["class"], "aside-container")
	assertEquals(aside.attributes["invalidAttribute"], undefined)
})

Deno.test("Aside should accept valid flow content children", () => {
	const child1 = TextNode("Hello")
	const child2 = TextNode("World")
	const aside = Aside({})([child1, child2])

	assertEquals(aside.tag, "Aside")
	assertEquals(aside.children.length, 2)
	assertEquals(aside.children[0], child1)
	assertEquals(aside.children[1], child2)
})

Deno.test("Aside should handle special properties", () => {
	const aside = Aside({
		id: "sidebar",
		dataset: { testId: "aside-test" },
		display: "block",
		format: "html",
	})([])

	assertEquals(aside.tag, "Aside")
	assertEquals(aside.attributes["id"], "sidebar")
	assertEquals(aside.dataset, { testId: "aside-test" })
	assertEquals(aside.display, "block")
	assertEquals(aside.format, "html")
})

Deno.test("Aside should handle ARIA attributes", () => {
	const aside = Aside({
		id: "sidebar",
		aria: {
			label: "Sidebar navigation",
			expanded: "true",
		},
	})([])

	assertEquals(aside.tag, "Aside")
	assertEquals(aside.attributes["id"], "sidebar")
	assertEquals(aside.attributes["aria-label"], "Sidebar navigation")
	assertEquals(aside.attributes["aria-expanded"], "true")
})

Deno.test("Aside should filter children using isFlowContent validation", () => {
	const validChild = TextNode("Valid content")
	const aside = Aside({})([validChild])

	assertEquals(aside.tag, "Aside")
	assertEquals(aside.children.length, 1)
	assertEquals(aside.children[0], validChild)
})

Deno.test("Aside should handle empty attributes", () => {
	const aside = Aside({})([])

	assertEquals(aside.tag, "Aside")
	assertEquals(aside.children, [])
	assertExists(aside.attributes)
	assertExists(aside.attributes["id"]) // getId always generates an id
})
