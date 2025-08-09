import { assertEquals, assertExists } from "@std/assert"

import Search from "../../../../../../constructors/elements/flow/miscellaneous/Search/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Search should create a basic search with no attributes or children", () => {
	const search = Search()([])
	assertEquals(search.tag, "Search")
	assertEquals(search.children, [])
	assertExists(search.attributes)
})

Deno.test("Search should create a search with valid global attributes", () => {
	const search = Search({
		id: "site-search",
		class: "search-container",
		title: "Site Search",
		lang: "en",
	})([])

	assertEquals(search.tag, "Search")
	assertEquals(search.attributes["id"], "site-search")
	assertEquals(search.attributes["class"], "search-container")
	assertEquals(search.attributes["title"], "Site Search")
	assertEquals(search.attributes["lang"], "en")
})

Deno.test("Search should filter out invalid attributes", () => {
	const search = Search({
		id: "valid",
		href: "invalid-for-search",
		src: "invalid-for-search",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(search.tag, "Search")
	assertEquals(search.attributes["id"], "valid")
	assertEquals(search.attributes["href"], undefined)
	assertEquals(search.attributes["src"], undefined)
	assertEquals((search.attributes as any).invalidAttr, undefined)
})

Deno.test("Search should accept search form children", () => {
	const form = {
		tag: "Form",
		attributes: { role: "search" },
		children: [
			{
				tag: "Input",
				attributes: { type: "search", placeholder: "Search..." },
				children: [],
			},
			{
				tag: "Button",
				attributes: { type: "submit" },
				children: [TextNode("Search")],
			},
		],
	}
	const search = Search()([form])

	assertEquals(search.tag, "Search")
	assertEquals(search.children.length, 1)
	assertEquals(search.children[0], form)
})

Deno.test("Search should handle multiple search-related children", () => {
	const children = [
		{ tag: "H2", attributes: {}, children: [TextNode("Search Results")] },
		{
			tag: "Form",
			attributes: { role: "search" },
			children: [
				{ tag: "Input", attributes: { type: "search" }, children: [] },
				{
					tag: "Button",
					attributes: { type: "submit" },
					children: [TextNode("Search")],
				},
			],
		},
		{ tag: "Div", attributes: { class: "results" }, children: [] },
	]
	const search = Search()(children)

	assertEquals(search.tag, "Search")
	assertEquals(search.children.length, 3)
	assertEquals((search.children[0] as any).tag, "H2")
	assertEquals((search.children[1] as any).tag, "Form")
	assertEquals((search.children[2] as any).tag, "Div")
})

Deno.test("Search should handle single child (not array)", () => {
	const form = {
		tag: "Form",
		attributes: { role: "search" },
		children: [{ tag: "Input", attributes: { type: "search" }, children: [] }],
	}
	const search = Search()(form)

	assertEquals(search.tag, "Search")
	assertEquals(search.children.length, 1)
	assertEquals(search.children[0], form)
})

Deno.test("Search should handle special properties", () => {
	const search = Search({
		calculation: "searchCalculation",
		dataset: { type: "site-search", scope: "global" },
		display: "block",
		scripts: ["search-autocomplete.js"],
		stylesheets: ["search.css"],
	})([])

	assertEquals(search.tag, "Search")
	assertEquals((search as any).calculation, "searchCalculation")
	assertEquals((search as any).dataset, {
		type: "site-search",
		scope: "global",
	})
	assertEquals((search as any).display, "block")
	assertEquals((search as any).scripts, ["search-autocomplete.js"])
	assertEquals((search as any).stylesheets, ["search.css"])
})

Deno.test("Search should handle ARIA attributes", () => {
	const search = Search({
		aria: {
			label: "Search the website",
			live: "polite",
		},
	})([])

	assertEquals(search.tag, "Search")
	assertEquals(search.attributes["aria-label"], "Search the website")
	assertEquals(search.attributes["aria-live"], "polite")
})

Deno.test("Search should handle complex search interface", () => {
	const searchInterface = [
		{ tag: "H1", attributes: {}, children: [TextNode("Search")] },
		{
			tag: "Form",
			attributes: { role: "search", method: "get" },
			children: [
				{
					tag: "Label",
					attributes: { for: "search-input" },
					children: [TextNode("Search terms:")],
				},
				{
					tag: "Input",
					attributes: { id: "search-input", type: "search", name: "q" },
					children: [],
				},
				{
					tag: "Button",
					attributes: { type: "submit" },
					children: [TextNode("Search")],
				},
			],
		},
		{
			tag: "Section",
			attributes: { class: "search-results", "aria-live": "polite" },
			children: [],
		},
	]
	const search = Search({ class: "search-page" })(searchInterface)

	assertEquals(search.tag, "Search")
	assertEquals(search.children.length, 3)
	assertEquals(search.attributes["class"], "search-page")
	assertEquals((search.children[0] as any).tag, "H1")
	assertEquals((search.children[1] as any).tag, "Form")
	assertEquals((search.children[2] as any).tag, "Section")
})

Deno.test("Search should handle empty children array", () => {
	const search = Search()([])
	assertEquals(search.tag, "Search")
	assertEquals(search.children, [])
})
