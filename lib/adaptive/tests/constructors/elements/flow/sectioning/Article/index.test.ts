import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts"

import Article from "../../../../../../constructors/elements/flow/sectioning/Article/index.ts"

Deno.test("Article should create a basic article with no attributes or children", () => {
	const result = Article()()

	assertEquals(result.tag, "Article")
	assertEquals(typeof result.attributes, "object")
	assertExists(result.attributes["id"])
	assertEquals(Array.isArray(result.children), true)
	assertEquals(result.children.length, 0)
})

Deno.test("Article should create an article with valid global attributes", () => {
	const result = Article({
		id: "main-article",
		class: "article-content",
		title: "Main Article",
		lang: "en",
		dir: "ltr",
		role: "article",
	})([])

	assertEquals(result.attributes["id"], "main-article")
	assertEquals(result.attributes["class"], "article-content")
	assertEquals(result.attributes["title"], "Main Article")
	assertEquals(result.attributes["lang"], "en")
	assertEquals(result.attributes["dir"], "ltr")
	assertEquals(result.attributes["role"], "article")
})

Deno.test("Article should filter out invalid attributes", () => {
	const result = Article({
		id: "test-article",
		href: "https://example.com", // Invalid for article
		src: "image.jpg", // Invalid for article
		type: "button", // Invalid for article
	} as any)([])

	assertEquals(result.attributes["id"], "test-article")
	assertEquals(result.attributes["href"], undefined)
	assertEquals(result.attributes["src"], undefined)
	assertEquals((result.attributes as any).type, undefined)
})

Deno.test("Article should accept valid flow content children", () => {
	const flowChildren = [
		{ tag: "Div", content: "Div content" },
		{ tag: "P", content: "Paragraph content" },
		{ tag: "Section", content: "Section content" },
		{ tag: "H1", content: "Header content" },
		{ tag: "Ul", content: "List content" },
	]

	const result = Article({ id: "test-article" })(flowChildren)

	assertEquals(result.children.length, 5)
	assertEquals((result.children[0] as any).tag, "Div")
	assertEquals((result.children[1] as any).tag, "P")
	assertEquals((result.children[2] as any).tag, "Section")
	assertEquals((result.children[3] as any).tag, "H1")
	assertEquals((result.children[4] as any).tag, "Ul")
})

Deno.test("Article should handle single child (not array)", () => {
	const singleChild = { tag: "P", content: "Single paragraph" }
	const result = Article({ id: "test-article" })(singleChild)

	assertEquals(result.children.length, 1)
	assertEquals((result.children[0] as any).tag, "P")
	assertEquals((result.children[0] as any).content, "Single paragraph")
})

Deno.test("Article should handle special properties", () => {
	const result = Article({
		calculation: "someCalculation",
		dataset: { type: "article", category: "news" },
		display: "block",
		format: "html",
		scripts: ["article.js"],
		stylesheets: ["article.css"],
	})([])

	assertEquals(result.calculation, "someCalculation")
	assertEquals(result.dataset, { type: "article", category: "news" })
	assertEquals(result.display, "block")
	assertEquals(result.format, "html")
	assertEquals(result.scripts, ["article.js"])
	assertEquals(result.stylesheets, ["article.css"])
})

Deno.test("Article should handle ARIA attributes", () => {
	const result = Article({
		aria: {
			label: "Main Article Content",
			describedby: "article-description",
			hidden: "false",
		},
	})([])

	assertEquals(result.attributes["aria-label"], "Main Article Content")
	assertEquals(result.attributes["aria-describedby"], "article-description")
	assertEquals(result.attributes["aria-hidden"], "false")
})

Deno.test("Article should filter children using isFlowContent validation", () => {
	// Mix of valid flow content and invalid content
	const mixedChildren = [
		{ tag: "P", content: "Valid paragraph" },
		{ tag: "Div", content: "Valid div" },
		{ tag: "InvalidElement", content: "Should be filtered" },
		{ tag: "H2", content: "Valid header" },
		{ tag: "AnotherInvalid", content: "Should be filtered" },
	]

	const result = Article({ id: "test-article" })(mixedChildren)

	// isFlowContent should filter out invalid elements ("InvalidElement" and "AnotherInvalid")
	assertEquals(result.children.length, 3) // Only valid flow content elements remain
	assertEquals(result.tag, "Article")
})

Deno.test("Article should handle empty attributes", () => {
	const result = Article()([])

	assertEquals(result.tag, "Article")
	assertEquals(typeof result.attributes, "object")
	assertExists(result.attributes["id"]) // getId should still generate an id
	assertEquals(Array.isArray(result.children), true)
})
