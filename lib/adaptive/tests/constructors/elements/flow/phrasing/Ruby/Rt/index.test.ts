import { assertEquals, assertExists } from "@std/assert"

import Rt from "../../../../../../../constructors/elements/flow/phrasing/Ruby/Rt/index.ts"
import TextNode from "../../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Rt should create a basic rt with no attributes or children", () => {
	const rt = Rt()([])
	assertEquals(rt.tag, "Rt")
	assertEquals(rt.children, [])
	assertExists(rt.attributes)
})

Deno.test("Rt should create an rt with valid global attributes", () => {
	const rt = Rt({
		id: "ruby-pronunciation",
		class: "pronunciation",
		title: "Ruby Text Annotation",
		lang: "ja",
	})([])

	assertEquals(rt.tag, "Rt")
	assertEquals(rt.attributes["id"], "ruby-pronunciation")
	assertEquals(rt.attributes["class"], "pronunciation")
	assertEquals(rt.attributes["title"], "Ruby Text Annotation")
	assertEquals(rt.attributes["lang"], "ja")
})

Deno.test("Rt should filter out invalid attributes", () => {
	const rt = Rt({
		id: "valid",
		href: "invalid-for-rt",
		src: "invalid-for-rt",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(rt.tag, "Rt")
	assertEquals(rt.attributes["id"], "valid")
	assertEquals(rt.attributes["href"], undefined)
	assertEquals(rt.attributes["src"], undefined)
	assertEquals((rt.attributes as any).invalidAttr, undefined)
})

Deno.test("Rt should accept text content for pronunciation", () => {
	const text = TextNode("かんじ")
	const rt = Rt()([text])

	assertEquals(rt.tag, "Rt")
	assertEquals(rt.children.length, 1)
	assertEquals(rt.children[0], text)
})

Deno.test("Rt should handle phrasing content children", () => {
	const children = [
		TextNode("かん"),
		{ tag: "Em", attributes: {}, children: [TextNode("じ")] },
	]
	const rt = Rt()(children)

	assertEquals(rt.tag, "Rt")
	assertEquals(rt.children.length, 2)
	assertEquals((rt.children[0] as any).tag, "TextNode")
	assertEquals((rt.children[1] as any).tag, "Em")
})

Deno.test("Rt should handle single child (not array)", () => {
	const text = TextNode("pinyin")
	const rt = Rt()(text)

	assertEquals(rt.tag, "Rt")
	assertEquals(rt.children.length, 1)
	assertEquals(rt.children[0], text)
})

Deno.test("Rt should handle special properties", () => {
	const rt = Rt({
		calculation: "rtCalculation",
		dataset: { type: "pronunciation", language: "japanese" },
		display: "ruby-text",
		scripts: ["ruby-handler.js"],
		stylesheets: ["ruby.css"],
	})([])

	assertEquals(rt.tag, "Rt")
	assertEquals((rt as any).calculation, "rtCalculation")
	assertEquals((rt as any).dataset, {
		type: "pronunciation",
		language: "japanese",
	})
	assertEquals((rt as any).display, "ruby-text")
	assertEquals((rt as any).scripts, ["ruby-handler.js"])
	assertEquals((rt as any).stylesheets, ["ruby.css"])
})

Deno.test("Rt should handle ARIA attributes", () => {
	const rt = Rt({
		aria: {
			label: "Pronunciation guide",
			describedby: "ruby-explanation",
		},
	})([])

	assertEquals(rt.tag, "Rt")
	assertEquals(rt.attributes["aria-label"], "Pronunciation guide")
	assertEquals(rt.attributes["aria-describedby"], "ruby-explanation")
})

Deno.test("Rt should handle Japanese hiragana pronunciation", () => {
	const hiragana = TextNode("にほん")
	const rt = Rt({ class: "hiragana", lang: "ja" })([hiragana])

	assertEquals(rt.tag, "Rt")
	assertEquals(rt.children.length, 1)
	assertEquals(rt.attributes["class"], "hiragana")
	assertEquals(rt.attributes["lang"], "ja")
	assertEquals(rt.children[0], hiragana)
})

Deno.test("Rt should handle Chinese pinyin pronunciation", () => {
	const pinyin = TextNode("zhōng guó")
	const rt = Rt({ class: "pinyin", lang: "zh" })([pinyin])

	assertEquals(rt.tag, "Rt")
	assertEquals(rt.children.length, 1)
	assertEquals(rt.attributes["class"], "pinyin")
	assertEquals(rt.attributes["lang"], "zh")
	assertEquals(rt.children[0], pinyin)
})

Deno.test("Rt should handle empty children array", () => {
	const rt = Rt()([])
	assertEquals(rt.tag, "Rt")
	assertEquals(rt.children, [])
})
