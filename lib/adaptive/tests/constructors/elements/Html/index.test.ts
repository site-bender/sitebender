import { assertEquals, assertExists } from "@std/assert"

import Html from "../../../../constructors/elements/Html/index.ts"
import TextNode from "../../../../constructors/elements/TextNode/index.ts"

Deno.test("Html should create a basic html with no attributes or children", () => {
	const html = Html()([])
	assertEquals(html.tag, "Html")
	assertEquals(html.children, [])
	assertExists(html.attributes)
	assertExists(html.attributes["id"])
})

Deno.test("Html should create an html with valid global attributes", () => {
	const html = Html({
		id: "root",
		class: "html-wrapper",
		lang: "en",
		dir: "ltr",
	})([])

	assertEquals(html.tag, "Html")
	assertEquals(html.attributes["id"], "root")
	assertEquals(html.attributes["class"], "html-wrapper")
	assertEquals(html.attributes["lang"], "en")
	assertEquals(html.attributes["dir"], "ltr")
})

Deno.test("Html should handle html-specific attributes", () => {
	const html = Html({
		id: "root",
		manifest: "/app.manifest",
		xmlns: "http://www.w3.org/1999/xhtml",
	})([])

	assertEquals(html.tag, "Html")
	assertEquals(html.attributes["id"], "root")
	assertEquals(html.attributes["manifest"], "/app.manifest")
	assertEquals(html.attributes["xmlns"], "http://www.w3.org/1999/xhtml")
})

Deno.test("Html should filter out invalid manifest and xmlns values", () => {
	const html = Html({
		id: "root",
		manifest: 123, // Invalid: not a string
		xmlns: true, // Invalid: not a string
	})([])

	assertEquals(html.tag, "Html")
	assertEquals(html.attributes["id"], "root")
	assertEquals(html.attributes["manifest"], undefined)
	assertEquals(html.attributes["xmlns"], undefined)
})

Deno.test("Html should filter out invalid attributes", () => {
	const html = Html({
		id: "root",
		invalidAttr: "should-be-filtered",
		onClick: "should-be-filtered",
	})([])

	assertEquals(html.tag, "Html")
	assertEquals(html.attributes["id"], "root")
	assertEquals("invalidAttr" in html.attributes, false)
	assertEquals("onClick" in html.attributes, false)
})

Deno.test("Html should accept any children (flow content and metadata)", () => {
	const head = { tag: "Head", content: "Head content" }
	const body = { tag: "Body", content: "Body content" }
	const html = Html({})([head, body])

	assertEquals(html.tag, "Html")
	assertEquals(html.children.length, 2)
	assertEquals(html.children[0], head)
	assertEquals(html.children[1], body)
})

Deno.test("Html should handle single child (not array)", () => {
	const child = TextNode("Document content")
	const html = Html({})(child)

	assertEquals(html.tag, "Html")
	assertEquals(html.children.length, 1)
	assertEquals(html.children[0], child)
})

Deno.test("Html should handle special properties", () => {
	const html = Html({
		id: "root",
		calculation: { formula: "document-level" },
		dataset: { version: "1.0" },
		display: "block",
		format: "html5",
		scripts: ["app.js"],
		stylesheets: ["styles.css"],
	})([])

	assertEquals(html.tag, "Html")
	assertEquals(html.attributes["id"], "root")
	assertExists(html.calculation)
	assertExists(html.dataset)
	assertExists(html.display)
	assertExists(html.format)
	assertExists(html.scripts)
	assertExists(html.stylesheets)
})

Deno.test("Html should handle ARIA attributes", () => {
	const html = Html({
		id: "root",
		aria: {
			label: "Document root",
			describedby: "document-description",
		},
	})([])

	assertEquals(html.tag, "Html")
	assertEquals(html.attributes["id"], "root")
	assertEquals(html.attributes["aria-label"], "Document root")
	assertEquals(html.attributes["aria-describedby"], "document-description")
})

Deno.test("Html should handle mixed valid html attributes", () => {
	const html = Html({
		id: "root",
		class: "document",
		lang: "en-US",
		manifest: "/cache.manifest",
		xmlns: "http://www.w3.org/1999/xhtml",
		title: "Document Root",
		dir: "ltr",
		role: "document",
	})([])

	assertEquals(html.tag, "Html")
	assertEquals(html.attributes["id"], "root")
	assertEquals(html.attributes["class"], "document")
	assertEquals(html.attributes["lang"], "en-US")
	assertEquals(html.attributes["manifest"], "/cache.manifest")
	assertEquals(html.attributes["xmlns"], "http://www.w3.org/1999/xhtml")
	assertEquals(html.attributes["title"], "Document Root")
	assertEquals(html.attributes["dir"], "ltr")
	assertEquals(html.attributes["role"], "document")
})
