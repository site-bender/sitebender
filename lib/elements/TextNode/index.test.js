import { expect, test } from "vitest"

import TextNode from "./"

test("[TextNode] (elements) works with string", () => {
	expect(TextNode("Bob")).toMatchObject({ content: "Bob", tag: "TextNode" })
})

test("[TextNode] (elements) works ignores non-string content", () => {
	expect(TextNode(666)).toMatchObject({ content: "", tag: "TextNode" })
})
