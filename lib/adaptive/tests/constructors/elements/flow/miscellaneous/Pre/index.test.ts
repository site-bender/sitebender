import { assertEquals, assertExists } from "@std/assert"

import Pre from "../../../../../../constructors/elements/flow/miscellaneous/Pre/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Pre should create a basic pre with no attributes or children", () => {
	const pre = Pre()([])
	assertEquals(pre.tag, "Pre")
	assertEquals(pre.children, [])
	assertExists(pre.attributes)
})

Deno.test("Pre should create a pre with valid global attributes", () => {
	const pre = Pre({
		id: "code-block",
		class: "syntax-highlight",
		title: "Code example",
	})([])

	assertEquals(pre.tag, "Pre")
	assertEquals(pre.attributes["id"], "code-block")
	assertEquals(pre.attributes["class"], "syntax-highlight")
	assertEquals(pre.attributes["title"], "Code example")
})

Deno.test("Pre should accept valid phrasing content children", () => {
	const text = TextNode("const x = 42;")
	const pre = Pre({})([text])

	assertEquals(pre.tag, "Pre")
	assertEquals(pre.children.length, 1)
	assertEquals(pre.children[0], text)
})
