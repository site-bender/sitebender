import { assertEquals, assertExists } from "@std/assert"

import Meta from "../../../../../constructors/elements/flow/metadata/Meta/index.ts"
import Div from "../../../../../constructors/elements/flow/miscellaneous/Div/index.ts"
import Footer from "../../../../../constructors/elements/flow/miscellaneous/Footer/index.ts"
import Header from "../../../../../constructors/elements/flow/miscellaneous/Header/index.ts"
import Main from "../../../../../constructors/elements/flow/miscellaneous/Main/index.ts"
import P from "../../../../../constructors/elements/flow/miscellaneous/P/index.ts"
import Section from "../../../../../constructors/elements/flow/sectioning/Section/index.ts"
import Body from "../../../../../constructors/elements/Html/Body/index.ts"
import TextNode from "../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Body should create a basic body with no attributes or children", () => {
	const body = Body()([])
	assertEquals(body.tag, "Body")
	assertEquals(body.children, [])
	assertExists(body.attributes)
	assertExists(body.attributes["id"])
})

Deno.test("Body should create a body with valid global attributes", () => {
	const body = Body({
		id: "main-body",
		class: "page-content",
		title: "Document body",
		lang: "en",
	})([])

	assertEquals(body.tag, "Body")
	assertEquals(body.attributes["id"], "main-body")
	assertEquals(body.attributes["class"], "page-content")
	assertEquals(body.attributes["title"], "Document body")
	assertEquals(body.attributes["lang"], "en")
})

Deno.test("Body should filter out invalid attributes", () => {
	const body = Body({
		id: "main-body",
		invalidAttribute: "should-be-removed",
		onClick: "should-be-filtered",
	})([])

	assertEquals(body.tag, "Body")
	assertEquals(body.attributes["id"], "main-body")
	assertEquals(body.attributes["invalidAttribute"], undefined)
	assertEquals(body.attributes["onClick"], undefined)
})

Deno.test("Body should accept valid flow content children", () => {
	const header = Header({})([TextNode("Page header")])
	const main = Main({})([TextNode("Main content")])
	const footer = Footer({})([TextNode("Page footer")])
	const body = Body({})([header, main, footer])

	assertEquals(body.tag, "Body")
	assertEquals(body.children.length, 3)
	assertEquals(body.children[0], header)
	assertEquals(body.children[1], main)
	assertEquals(body.children[2], footer)
})

Deno.test("Body should accept all types of flow elements", () => {
	const div = Div({})([TextNode("div content")])
	const p = P({})([TextNode("paragraph content")])
	const section = Section({})([TextNode("section content")])
	const header = Header({})([TextNode("header content")])
	const main = Main({})([TextNode("main content")])

	const body = Body({})([div, p, section, header, main])

	assertEquals(body.tag, "Body")
	assertEquals(body.children.length, 5)
	assertEquals(body.children[0], div)
	assertEquals(body.children[1], p)
	assertEquals(body.children[2], section)
	assertEquals(body.children[3], header)
	assertEquals(body.children[4], main)
})

Deno.test("Body should accept text nodes as flow content", () => {
	const textNode = TextNode("Direct text content")
	const div = Div({})([TextNode("div content")])
	const body = Body({})([textNode, div])

	assertEquals(body.tag, "Body")
	assertEquals(body.children.length, 2)
	assertEquals(body.children[0], textNode)
	assertEquals(body.children[1], div)
})

Deno.test("Body should filter out non-flow content children", () => {
	const validDiv = Div({})([TextNode("valid flow content")])
	const invalidMeta = Meta({
		name: "description",
		content: "invalid content",
	})
	const validP = P({})([TextNode("valid paragraph")])

	const body = Body({})([validDiv, invalidMeta, validP])

	assertEquals(body.tag, "Body")
	assertEquals(body.children.length, 2) // Only valid flow content elements remain
	assertEquals(body.children[0], validDiv)
	assertEquals(body.children[1], validP)
})

Deno.test("Body should handle single child (not array)", () => {
	const child = Main({})([TextNode("Single main content")])
	const body = Body({})(child)

	assertEquals(body.tag, "Body")
	assertEquals(body.children.length, 1)
	assertEquals(body.children[0], child)
})

Deno.test("Body should handle special properties", () => {
	const body = Body({
		id: "main-body",
		calculation: { formula: "body-level" },
		dataset: { section: "content" },
		display: "block",
		format: "html",
		scripts: ["body.js"],
		stylesheets: ["body.css"],
	})([])

	assertEquals(body.tag, "Body")
	assertEquals(body.attributes["id"], "main-body")
	assertExists(body.calculation)
	assertExists(body.dataset)
	assertExists(body.display)
	assertExists(body.format)
	assertExists(body.scripts)
	assertExists(body.stylesheets)
})

Deno.test("Body should handle ARIA attributes", () => {
	const body = Body({
		id: "main-body",
		aria: {
			label: "Document content area",
			role: "main",
		},
	})([])

	assertEquals(body.tag, "Body")
	assertEquals(body.attributes["id"], "main-body")
	assertEquals(body.attributes["aria-label"], "Document content area")
	assertEquals(body.attributes["aria-role"], "main")
})

Deno.test("Body should handle empty attributes", () => {
	const body = Body({})([])

	assertEquals(body.tag, "Body")
	assertEquals(body.children, [])
	assertExists(body.attributes)
	assertExists(body.attributes["id"]) // getId always generates an id
})

Deno.test("Body should handle mixed flow children filtering", () => {
	const elements = [
		Div({})([TextNode("div1")]),
		Meta({ name: "description", content: "invalid1" }),
		P({})([TextNode("p1")]),
		Meta({ name: "keywords", content: "invalid2" }),
		Header({})([TextNode("header1")]),
		Main({})([TextNode("main1")]),
		Meta({ name: "author", content: "invalid3" }),
		Footer({})([TextNode("footer1")]),
	]

	const body = Body({})(elements)

	assertEquals(body.tag, "Body")
	assertEquals(body.children.length, 5) // Only flow content elements
	assertEquals((body.children[0] as any).tag, "Div")
	assertEquals((body.children[1] as any).tag, "P")
	assertEquals((body.children[2] as any).tag, "Header")
	assertEquals((body.children[3] as any).tag, "main")
	assertEquals((body.children[4] as any).tag, "Footer")
})

Deno.test("Body should handle complex nested structure", () => {
	const complexStructure = [
		Header({})([TextNode("site header")]),
		Main({})([TextNode("main content area")]),
		Section({})([TextNode("content section")]),
		Div({})([TextNode("content container")]),
		P({})([TextNode("paragraph content")]),
		Footer({})([TextNode("site footer")]),
	]

	const body = Body({
		id: "page-body",
		class: "page-layout",
	})(complexStructure)

	assertEquals(body.tag, "Body")
	assertEquals(body.attributes["id"], "page-body")
	assertEquals(body.attributes["class"], "page-layout")
	assertEquals(body.children.length, 6)
	assertEquals((body.children[0] as any).children[0].content, "site header")
	assertEquals(
		(body.children[1] as any).children[0].content,
		"main content area",
	)
	assertEquals((body.children[2] as any).children[0].content, "content section")
	assertEquals(
		(body.children[3] as any).children[0].content,
		"content container",
	)
	assertEquals(
		(body.children[4] as any).children[0].content,
		"paragraph content",
	)
	assertEquals((body.children[5] as any).children[0].content, "site footer")
})
