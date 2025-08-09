import { assertEquals, assertExists } from "@std/assert"

import Code from "../../../../../../constructors/elements/flow/phrasing/Code/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Code should create a basic code with no attributes or children", () => {
	const code = Code()([])
	assertEquals(code.tag, "Code")
	assertEquals(code.children, [])
	assertExists(code.attributes)
})

Deno.test("Code should create a code with valid global attributes", () => {
	const code = Code({
		id: "example-code",
		class: "language-javascript",
	})([])

	assertEquals(code.tag, "Code")
	assertEquals(code.attributes["id"], "example-code")
	assertEquals(code.attributes["class"], "language-javascript")
})

Deno.test("Code should accept valid phrasing content children", () => {
	const text = TextNode("console.log('Hello')")
	const code = Code({})([text])

	assertEquals(code.tag, "Code")
	assertEquals(code.children.length, 1)
	assertEquals(code.children[0], text)
})
