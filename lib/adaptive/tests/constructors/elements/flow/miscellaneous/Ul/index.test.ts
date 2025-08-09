import { assertEquals, assertExists } from "@std/assert"

import Ul from "../../../../../../constructors/elements/flow/miscellaneous/Ul/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

// Mock Li element for testing
const MockLi = (content: string) => ({ tag: "Li", content })
const MockScript = (content: string) => ({ tag: "Script", content })
const MockTemplate = (content: string) => ({ tag: "Template", content })
const MockInvalid = (content: string) => ({ tag: "Invalid", content })

Deno.test("Ul should create a basic ul with no attributes or children", () => {
	const ul = Ul()([])
	assertEquals(ul.tag, "Ul")
	assertEquals(ul.children, [])
	assertExists(ul.attributes)
})

Deno.test("Ul should create a ul with valid global attributes", () => {
	const ul = Ul({
		id: "main-list",
		class: "list-container",
		title: "Main list",
		lang: "en",
	})([])

	assertEquals(ul.tag, "Ul")
	assertEquals(ul.attributes["id"], "main-list")
	assertEquals(ul.attributes["class"], "list-container")
	assertEquals(ul.attributes["title"], "Main list")
	assertEquals(ul.attributes["lang"], "en")
})

Deno.test("Ul should filter out invalid attributes", () => {
	const ul = Ul({
		id: "main-list",
		invalidAttribute: "should-be-removed",
		class: "list-container",
	})([])

	assertEquals(ul.tag, "Ul")
	assertEquals(ul.attributes["id"], "main-list")
	assertEquals(ul.attributes["class"], "list-container")
	assertEquals(ul.attributes["invalidAttribute"], undefined)
})

Deno.test("Ul should accept valid Li children", () => {
	const li1 = MockLi("First item")
	const li2 = MockLi("Second item")
	const ul = Ul({})([li1, li2])

	assertEquals(ul.tag, "Ul")
	assertEquals(ul.children.length, 2)
	assertEquals(ul.children[0], li1)
	assertEquals(ul.children[1], li2)
})

Deno.test("Ul should accept Script and Template children", () => {
	const script = MockScript("script content")
	const template = MockTemplate("template content")
	const ul = Ul({})([script, template])

	assertEquals(ul.tag, "Ul")
	assertEquals(ul.children.length, 2)
	assertEquals(ul.children[0], script)
	assertEquals(ul.children[1], template)
})

Deno.test("Ul should filter out invalid children", () => {
	const validLi = MockLi("Valid item")
	const invalidChild = MockInvalid("Invalid content")
	const textNode = TextNode("Invalid text")

	const ul = Ul({})([validLi, invalidChild, textNode])

	assertEquals(ul.tag, "Ul")
	assertEquals(ul.children.length, 1) // Only valid Li should remain
	assertEquals(ul.children[0], validLi)
})

Deno.test("Ul should handle special properties", () => {
	const ul = Ul({
		id: "main-list",
		dataset: { testId: "ul-test" },
		display: "block",
		scripts: ["list.js"],
	})([])

	assertEquals(ul.tag, "Ul")
	assertEquals(ul.attributes["id"], "main-list")
	assertEquals(ul.dataset, { testId: "ul-test" })
	assertEquals(ul.display, "block")
	assertEquals(ul.scripts, ["list.js"])
})

Deno.test("Ul should handle ARIA attributes", () => {
	const ul = Ul({
		id: "main-list",
		aria: {
			label: "Main navigation list",
			expanded: "true",
		},
	})([])

	assertEquals(ul.tag, "Ul")
	assertEquals(ul.attributes["id"], "main-list")
	assertEquals(ul.attributes["aria-label"], "Main navigation list")
	assertEquals(ul.attributes["aria-expanded"], "true")
})

Deno.test("Ul should handle empty attributes", () => {
	const ul = Ul({})([])

	assertEquals(ul.tag, "Ul")
	assertEquals(ul.children, [])
	assertExists(ul.attributes)
	assertExists(ul.attributes["id"]) // getId always generates an id
})
