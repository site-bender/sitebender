import { assertEquals, assertExists } from "@std/assert"

import Hn from "../../../../../../constructors/elements/flow/heading/Hn/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Hn should create a basic hn with no attributes or children", () => {
	const hn = Hn()([])
	assertEquals(hn.tag, "Hn")
	assertEquals(hn.children, [])
	assertExists(hn.attributes)
})

Deno.test("Hn should create an hn with valid global attributes", () => {
	const hn = Hn({
		id: "dynamic-heading",
		class: "hn-wrapper",
		title: "Dynamic heading",
		lang: "en",
	})([])

	assertEquals(hn.tag, "Hn")
	assertEquals(hn.attributes["id"], "dynamic-heading")
	assertEquals(hn.attributes["class"], "hn-wrapper")
	assertEquals(hn.attributes["title"], "Dynamic heading")
	assertEquals(hn.attributes["lang"], "en")
})

Deno.test("Hn should accept valid role attributes", () => {
	const hn = Hn({
		id: "hn-content",
		role: "tab",
	})([])

	assertEquals(hn.tag, "Hn")
	assertEquals(hn.attributes["id"], "hn-content")
	assertEquals(hn.attributes["role"], "tab")
})

Deno.test("Hn should accept text content", () => {
	const hn = Hn({})("Dynamic Heading Text")

	assertEquals(hn.tag, "Hn")
	assertEquals(hn.children.length, 1)
	assertEquals(hn.children[0].tag, "TextNode")
})

Deno.test("Hn should accept valid phrasing content children", () => {
	const child1 = TextNode("Hello")
	const child2 = TextNode("World")
	const hn = Hn({})([child1, child2])

	assertEquals(hn.tag, "Hn")
	assertEquals(hn.children.length, 2)
	assertEquals(hn.children[0], child1)
	assertEquals(hn.children[1], child2)
})
