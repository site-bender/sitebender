import { assertEquals, assertExists } from "@std/assert"

import DataList from "../../../../../../constructors/elements/flow/phrasing/DataList/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("DataList should create a basic datalist with no attributes or children", () => {
	const datalist = DataList()([])
	assertEquals(datalist.tag, "DataList")
	assertEquals(datalist.children, [])
	assertExists(datalist.attributes)
})

Deno.test("DataList should create a datalist with id attribute", () => {
	const datalist = DataList({
		id: "browsers",
		class: "autocomplete-list",
	})([])

	assertEquals(datalist.tag, "DataList")
	assertEquals(datalist.attributes["id"], "browsers")
	assertEquals(datalist.attributes["class"], "autocomplete-list")
})

Deno.test("DataList should create a datalist with valid global attributes", () => {
	const datalist = DataList({
		id: "programming-languages",
		class: "suggestion-list",
		title: "Programming Languages",
		lang: "en",
	})([])

	assertEquals(datalist.tag, "DataList")
	assertEquals(datalist.attributes["id"], "programming-languages")
	assertEquals(datalist.attributes["class"], "suggestion-list")
	assertEquals(datalist.attributes["title"], "Programming Languages")
	assertEquals(datalist.attributes["lang"], "en")
})

Deno.test("DataList should filter out invalid attributes", () => {
	const datalist = DataList({
		id: "browsers",
		href: "invalid-for-datalist",
		src: "invalid-for-datalist",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(datalist.tag, "DataList")
	assertEquals(datalist.attributes["id"], "browsers")
	assertEquals(datalist.attributes["href"], undefined)
	assertEquals(datalist.attributes["src"], undefined)
	assertEquals((datalist.attributes as any).invalidAttr, undefined)
})

Deno.test("DataList should accept Option children", () => {
	const options = [
		{
			tag: "Option",
			attributes: { value: "chrome" },
			children: [TextNode("Chrome")],
		},
		{
			tag: "Option",
			attributes: { value: "firefox" },
			children: [TextNode("Firefox")],
		},
		{
			tag: "Option",
			attributes: { value: "safari" },
			children: [TextNode("Safari")],
		},
	]
	const datalist = DataList({ id: "browsers" })(options)

	assertEquals(datalist.tag, "DataList")
	assertEquals(datalist.children.length, 3)
	assertEquals((datalist.children[0] as any).tag, "Option")
	assertEquals((datalist.children[1] as any).tag, "Option")
	assertEquals((datalist.children[2] as any).tag, "Option")
})

Deno.test("DataList should accept phrasing content children", () => {
	const children = [
		TextNode("Select a browser: "),
		{ tag: "Strong", attributes: {}, children: [TextNode("Popular options:")] },
		{
			tag: "Option",
			attributes: { value: "chrome" },
			children: [TextNode("Chrome")],
		},
	]
	const datalist = DataList({ id: "browsers" })(children)

	assertEquals(datalist.tag, "DataList")
	assertEquals(datalist.children.length, 3)
	assertEquals((datalist.children[0] as any).tag, "TextNode")
	assertEquals((datalist.children[1] as any).tag, "Strong")
	assertEquals((datalist.children[2] as any).tag, "Option")
})

Deno.test("DataList should handle single child (not array)", () => {
	const option = {
		tag: "Option",
		attributes: { value: "default" },
		children: [TextNode("Default")],
	}
	const datalist = DataList({ id: "single-option" })(option as any)

	assertEquals(datalist.tag, "DataList")
	assertEquals(datalist.children.length, 1)
	assertEquals((datalist.children[0] as any).tag, "Option")
})

Deno.test("DataList should handle special properties", () => {
	const datalist = DataList({
		id: "autocomplete-list",
		calculation: "datalistCalculation",
		dataset: { type: "autocomplete", source: "api" },
		display: "none",
		scripts: ["datalist-enhancer.js"],
		stylesheets: ["datalist.css"],
	})([])

	assertEquals(datalist.tag, "DataList")
	assertEquals((datalist as any).calculation, "datalistCalculation")
	assertEquals((datalist as any).dataset, {
		type: "autocomplete",
		source: "api",
	})
	assertEquals((datalist as any).display, "none")
	assertEquals((datalist as any).scripts, ["datalist-enhancer.js"])
	assertEquals((datalist as any).stylesheets, ["datalist.css"])
})

Deno.test("DataList should handle ARIA attributes", () => {
	const datalist = DataList({
		id: "suggestions",
		aria: {
			label: "Autocomplete suggestions",
			describedby: "datalist-help",
		},
	})([])

	assertEquals(datalist.tag, "DataList")
	assertEquals(datalist.attributes["aria-label"], "Autocomplete suggestions")
	assertEquals(datalist.attributes["aria-describedby"], "datalist-help")
})

Deno.test("DataList should handle browser suggestions pattern", () => {
	const browsers = ["Chrome", "Firefox", "Safari", "Edge", "Opera"]
	const options = browsers.map((browser) => ({
		tag: "Option",
		attributes: { value: browser.toLowerCase() },
		children: [TextNode(browser)],
	}))

	const datalist = DataList({ id: "browser-suggestions" })(options)

	assertEquals(datalist.tag, "DataList")
	assertEquals(datalist.children.length, 5)
	assertEquals(datalist.attributes["id"], "browser-suggestions")

	// Verify each option
	browsers.forEach((browser, index) => {
		const option = datalist.children[index] as any
		assertEquals(option.tag, "Option")
		assertEquals(option.attributes["value"], browser.toLowerCase())
	})
})

Deno.test("DataList should handle empty children array", () => {
	const datalist = DataList({ id: "empty-list" })([])
	assertEquals(datalist.tag, "DataList")
	assertEquals(datalist.children, [])
})
