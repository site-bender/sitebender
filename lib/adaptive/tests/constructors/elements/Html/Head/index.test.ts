import { assertEquals, assertExists } from "@std/assert"

import Link from "../../../../../constructors/elements/flow/metadata/Link/index.ts"
import Meta from "../../../../../constructors/elements/flow/metadata/Meta/index.ts"
import Script from "../../../../../constructors/elements/flow/metadata/Script/index.ts"
import Title from "../../../../../constructors/elements/flow/metadata/Title/index.ts"
import Div from "../../../../../constructors/elements/flow/miscellaneous/Div/index.ts"
import Head from "../../../../../constructors/elements/Html/Head/index.ts"
import Style from "../../../../../constructors/elements/metadata/Style/index.ts"
import TextNode from "../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Head should create a basic head with no attributes or children", () => {
	const head = Head({})([])
	assertEquals(head.tag, "Head")
	assertEquals(head.children, [])
	assertExists(head.attributes)
	assertExists(head.attributes["id"])
})

Deno.test("Head should create a head with valid global attributes", () => {
	const head = Head({
		id: "document-head",
		class: "head-wrapper",
		title: "Document head",
		lang: "en",
	})([])

	assertEquals(head.tag, "Head")
	assertEquals(head.attributes["id"], "document-head")
	assertEquals(head.attributes["class"], "head-wrapper")
	assertEquals(head.attributes["title"], "Document head")
	assertEquals(head.attributes["lang"], "en")
})

Deno.test("Head should filter out invalid attributes", () => {
	const head = Head({
		id: "document-head",
		// These invalid attributes should be filtered out by the constructor
	} as any)([])

	assertEquals(head.tag, "Head")
	assertEquals(head.attributes["id"], "document-head")
	assertEquals((head.attributes as any)["invalidAttribute"], undefined)
	assertEquals((head.attributes as any)["onClick"], undefined)
})

Deno.test("Head should accept valid metadata content children", () => {
	const meta = Meta({ charset: "utf-8" })
	const title = Title({})(TextNode("Page Title"))
	const script = Script({ src: "app.js" })([])
	const head = Head({})([meta, title, script])

	assertEquals(head.tag, "Head")
	assertEquals(head.children.length, 3)
	assertEquals(head.children[0], meta)
	assertEquals(head.children[1], title)
	assertEquals(head.children[2], script)
})

Deno.test("Head should accept all types of metadata elements", () => {
	const meta = Meta({ name: "description", content: "meta content" })
	const title = Title({})(TextNode("title content"))
	const script = Script({ src: "script.js" })([])
	const style = Style({ media: "screen" })([TextNode("style content")])
	const link = Link({ rel: "stylesheet", href: "style.css" })

	const head = Head({})([meta, title, script, style, link])

	assertEquals(head.tag, "Head")
	assertEquals(head.children.length, 5)
	assertEquals(head.children[0], meta)
	assertEquals(head.children[1], title)
	assertEquals(head.children[2], script)
	assertEquals(head.children[3], style)
	assertEquals(head.children[4], link)
})

Deno.test("Head should filter out non-metadata content children", () => {
	const validMeta = Meta({ name: "description", content: "valid metadata" })
	const invalidDiv = Div({})([TextNode("invalid content")])
	const validTitle = Title({})(TextNode("valid title"))

	const head = Head({})([validMeta, invalidDiv, validTitle])

	assertEquals(head.tag, "Head")
	assertEquals(head.children.length, 2) // Only valid metadata elements remain
	assertEquals(head.children[0], validMeta)
	assertEquals(head.children[1], validTitle)
})

Deno.test("Head should handle single child (not array)", () => {
	const child = Title({})(TextNode("Single title"))
	const head = Head({})([child])

	assertEquals(head.tag, "Head")
	assertEquals(head.children.length, 1)
	assertEquals(head.children[0], child)
})

Deno.test("Head should handle special properties", () => {
	const head = Head({
		id: "document-head",
		calculation: { formula: "head-level" },
		dataset: { section: "metadata" },
		display: "none",
		format: "html",
		scripts: ["head.js"],
		stylesheets: ["head.css"],
	})([])

	assertEquals(head.tag, "Head")
	assertEquals(head.attributes["id"], "document-head")
	assertExists(head.calculation)
	assertExists(head.dataset)
	assertExists(head.display)
	assertExists(head.format)
	assertExists(head.scripts)
	assertExists(head.stylesheets)
})

Deno.test("Head should handle ARIA attributes", () => {
	const head = Head({
		id: "document-head",
		aria: {
			label: "Document metadata section",
			hidden: true,
		},
	})([])

	assertEquals(head.tag, "Head")
	assertEquals(head.attributes["id"], "document-head")
	assertEquals(head.attributes["aria-label"], "Document metadata section")
	assertEquals(head.attributes["aria-hidden"], true)
})

Deno.test("Head should handle empty attributes", () => {
	const head = Head({})([])

	assertEquals(head.tag, "Head")
	assertEquals(head.children, [])
	assertExists(head.attributes)
	assertExists(head.attributes["id"]) // getId always generates an id
})

Deno.test("Head should handle mixed metadata children filtering", () => {
	const elements = [
		Meta({ name: "description", content: "meta1" }),
		Div({})([TextNode("invalid1")]),
		Title({})(TextNode("title1")),
		Div({})([TextNode("invalid2")]),
		Script({ src: "script1.js" })([]),
		Style({ media: "screen" })([TextNode("style1")]),
		Div({})([TextNode("invalid3")]),
		Link({ rel: "stylesheet", href: "link1.css" }),
	]

	const head = Head({})(elements)

	assertEquals(head.tag, "Head")
	assertEquals(head.children.length, 5) // Only metadata elements
	assertEquals((head.children[0] as any).tag, "Meta")
	assertEquals((head.children[1] as any).tag, "Title")
	assertEquals((head.children[2] as any).tag, "Script")
	assertEquals((head.children[3] as any).tag, "Style")
	assertEquals((head.children[4] as any).tag, "Link")
})
