import { assertEquals, assertExists } from "@std/assert"

import Title from "../../../../../../constructors/elements/flow/metadata/Title/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Title should create a basic title element with no attributes", () => {
	const title = Title({})("Page Title")
	assertEquals(title.tag, "Title")
	assertEquals(title.children.length, 1)
	assertEquals((title.children[0] as any).content, "Page Title")
	assertExists(title.attributes)
})

Deno.test("Title should create a title element with valid global attributes", () => {
	const title = Title({
		id: "page-title",
		class: "title-element",
		lang: "en",
		title: "Document title element",
	})(TextNode("Page Title"))

	assertEquals(title.tag, "Title")
	assertEquals(title.attributes["id"], "page-title")
	assertEquals(title.attributes["class"], "title-element")
	assertEquals(title.attributes["lang"], "en")
	assertEquals(title.attributes["title"], "Document title element")
	assertEquals(title.children.length, 1)
})

Deno.test("Title should filter out invalid attributes", () => {
	const title = Title({
		id: "page-title",
		invalidAttribute: "should-be-removed",
		onClick: "should-be-filtered",
	})(TextNode("Page Title"))

	assertEquals(title.tag, "Title")
	assertEquals(title.attributes["id"], "page-title")
	assertEquals(title.attributes["invalidAttribute"], undefined)
	assertEquals(title.attributes["onClick"], undefined)
})

Deno.test("Title should handle text content", () => {
	const content = TextNode("My Document Title")
	const title = Title({})(content)

	assertEquals(title.tag, "Title")
	assertEquals(title.children.length, 1)
	assertEquals(title.children[0], content)
})

Deno.test("Title should handle special properties", () => {
	const title = Title({
		id: "page-title",
		calculation: { formula: "title-level" },
		dataset: { section: "metadata" },
		display: "block",
		scripts: ["title.js"],
		stylesheets: ["title.css"],
	})(TextNode("Page Title"))

	assertEquals(title.tag, "Title")
	assertEquals(title.attributes["id"], "page-title")
	assertExists(title.dataset)
})

Deno.test("Title should handle ARIA attributes", () => {
	const title = Title({
		id: "page-title",
		aria: {
			label: "Document title",
			hidden: "false",
		},
	})(TextNode("Page Title"))

	assertEquals(title.tag, "Title")
	assertEquals(title.attributes["id"], "page-title")
	assertEquals(title.attributes["aria-label"], "Document title")
	assertEquals(title.attributes["aria-hidden"], "false")
})

Deno.test("Title should handle empty attributes", () => {
	const title = Title({})(TextNode("Page Title"))

	assertEquals(title.tag, "Title")
	assertEquals(title.children.length, 1)
	assertExists(title.attributes)
	assertExists(title.attributes["id"]) // getId always generates an id
})

Deno.test("Title should handle string content directly", () => {
	const title = Title({})("Direct string content")

	assertEquals(title.tag, "Title")
	assertEquals(title.children.length, 1)
	assertEquals((title.children[0] as any).content, "Direct string content")
})

Deno.test("Title should handle complex title text", () => {
	const complexTitle = "My Site - About Us | Contact Information"
	const title = Title({
		id: "complex-title",
		class: "site-title",
	})(TextNode(complexTitle))

	assertEquals(title.tag, "Title")
	assertEquals(title.attributes["id"], "complex-title")
	assertEquals(title.attributes["class"], "site-title")
	assertEquals(title.children.length, 1)
	assertEquals((title.children[0] as any).content, complexTitle)
})

Deno.test("Title should handle empty string content", () => {
	const title = Title({})(TextNode(""))

	assertEquals(title.tag, "Title")
	assertEquals(title.children.length, 1)
	assertEquals((title.children[0] as any).content, "")
})

Deno.test("Title should handle title with all global attributes", () => {
	const title = Title({
		id: "comprehensive-title",
		class: "title-element",
		lang: "en-US",
		dir: "ltr",
		title: "Title element tooltip",
		role: "heading",
		tabindex: "0",
	})(TextNode("Comprehensive Title"))

	assertEquals(title.tag, "Title")
	assertEquals(title.attributes["id"], "comprehensive-title")
	assertEquals(title.attributes["class"], "title-element")
	assertEquals(title.attributes["lang"], "en-US")
	assertEquals(title.attributes["dir"], "ltr")
	assertEquals(title.attributes["title"], "Title element tooltip")
	assertEquals(title.attributes["role"], "heading")
	assertEquals(title.attributes["tabindex"], "0")
	assertEquals(title.children.length, 1)
	assertEquals((title.children[0] as any).content, "Comprehensive Title")
})
