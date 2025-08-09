import { assertEquals, assertExists } from "@std/assert"

import Ruby from "../../../../../../constructors/elements/flow/phrasing/Ruby/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Ruby should create a basic ruby with no attributes or children", () => {
	const ruby = Ruby()([])
	assertEquals(ruby.tag, "Ruby")
	assertEquals(ruby.children, [])
	assertExists(ruby.attributes)
})

Deno.test("Ruby should create a ruby with valid global attributes", () => {
	const ruby = Ruby({
		id: "kanji-pronunciation",
		class: "ruby-annotation",
		title: "Pronunciation Guide",
		lang: "ja",
	})([])

	assertEquals(ruby.tag, "Ruby")
	assertEquals(ruby.attributes["id"], "kanji-pronunciation")
	assertEquals(ruby.attributes["class"], "ruby-annotation")
	assertEquals(ruby.attributes["title"], "Pronunciation Guide")
	assertEquals(ruby.attributes["lang"], "ja")
})

Deno.test("Ruby should accept text and ruby text children", () => {
	const baseText = TextNode("漢字")
	const rubyText = { tag: "Rt", attributes: {}, children: [TextNode("kanji")] }
	const ruby = Ruby()([baseText, rubyText])

	assertEquals(ruby.tag, "Ruby")
	assertEquals(ruby.children.length, 2)
	assertEquals(ruby.children[0], baseText)
	assertEquals(ruby.children[1], rubyText)
})

Deno.test("Ruby should handle ruby with parentheses fallback", () => {
	const children = [
		TextNode("東京"),
		{ tag: "Rp", attributes: {}, children: [TextNode("(")] },
		{ tag: "Rt", attributes: {}, children: [TextNode("とうきょう")] },
		{ tag: "Rp", attributes: {}, children: [TextNode(")")] },
	]
	const ruby = Ruby()(children)

	assertEquals(ruby.tag, "Ruby")
	assertEquals(ruby.children.length, 4)
	assertEquals((ruby.children[0] as any).tag, "TextNode")
	assertEquals((ruby.children[1] as any).tag, "Rp")
	assertEquals((ruby.children[2] as any).tag, "Rt")
	assertEquals((ruby.children[3] as any).tag, "Rp")
})

Deno.test("Ruby should handle special properties", () => {
	const ruby = Ruby({
		calculation: "rubyCalculation",
		dataset: { language: "japanese", type: "furigana" },
		display: "ruby",
		scripts: ["ruby-formatter.js"],
		stylesheets: ["ruby.css"],
	})([])

	assertEquals(ruby.tag, "Ruby")
	assertEquals((ruby as any).calculation, "rubyCalculation")
	assertEquals((ruby as any).dataset, {
		language: "japanese",
		type: "furigana",
	})
	assertEquals((ruby as any).display, "ruby")
	assertEquals((ruby as any).scripts, ["ruby-formatter.js"])
	assertEquals((ruby as any).stylesheets, ["ruby.css"])
})

Deno.test("Ruby should handle ARIA attributes", () => {
	const ruby = Ruby({
		aria: {
			label: "Pronunciation annotation",
			describedby: "ruby-help",
		},
	})([])

	assertEquals(ruby.tag, "Ruby")
	assertEquals(ruby.attributes["aria-label"], "Pronunciation annotation")
	assertEquals(ruby.attributes["aria-describedby"], "ruby-help")
})
