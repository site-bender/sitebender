import { assertEquals } from "@std/assert"

import TextNode from "../../../../constructors/elements/TextNode/index.ts"

Deno.test("TextNode should work", () => {
	const textNode = TextNode("Hello, World!")
	assertEquals(textNode.tag, "TextNode")
	assertEquals(textNode.content, "Hello, World!")
})

Deno.test("should create a text node with empty content when given empty string", () => {
	const textNode = TextNode("")
	assertEquals(textNode.tag, "TextNode")
	assertEquals(textNode.content, "")
})

Deno.test("should handle non-string input by converting to empty string", () => {
	const textNode = TextNode(null)
	assertEquals(textNode.tag, "TextNode")
	assertEquals(textNode.content, "")
})

Deno.test("should handle multiline text content", () => {
	const multilineText = `This is a
multiline text
with line breaks`
	const textNode = TextNode(multilineText)
	assertEquals(textNode.tag, "TextNode")
	assertEquals(textNode.content, multilineText)
})

Deno.test("should handle special characters and unicode", () => {
	const specialText = "Hello 世界! 🌍 <>&\"'"
	const textNode = TextNode(specialText)
	assertEquals(textNode.tag, "TextNode")
	assertEquals(textNode.content, specialText)
})
