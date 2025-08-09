import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts"

import Filtered from "../../../../constructors/abstracted/Filtered/index.ts"
import TextNode from "../../../../constructors/elements/TextNode/index.ts"

Deno.test("Filtered should create element with default tag A and identity filter", () => {
	const createA = Filtered()()()
	const result = createA([])

	assertEquals(result.tag, "A")
	assertEquals(typeof result.attributes, "object")
	assertExists(result.attributes["id"])
	assertEquals(Array.isArray(result.children), true)
	assertEquals(result.children.length, 0)
})

Deno.test("Filtered should create element with custom tag", () => {
	const createSpan = Filtered("Span")()()
	const result = createSpan([])

	assertEquals(result.tag, "Span")
	assertEquals(typeof result.attributes, "object")
	assertExists(result.attributes["id"])
})

Deno.test("Filtered should handle array of children", () => {
	const createSpan = Filtered("Span")()({ id: "test-id" })
	const result = createSpan([TextNode("Text")])

	assertEquals(result.attributes["id"], "test-id")
	assertEquals(result.children, [{ content: "Text", tag: "TextNode" }])
	assertEquals(result.tag, "Span")
})

Deno.test("Filtered should handle single child (not array)", () => {
	const createA = Filtered()((a: any) => a)({ id: "test-id" })
	const result = createA(TextNode("Text"))

	assertEquals(result.attributes["id"], "test-id")
	assertEquals(result.children, [{ content: "Text", tag: "TextNode" }])
	assertEquals(result.tag, "A")
})

Deno.test("Filtered should apply custom attribute filter function", () => {
	// Filter that only allows 'href' and 'id' attributes
	const filterAnchorAttribs = (attrs: any) => {
		const { href, id, ...rest } = attrs
		return { href, id }
	}

	const createA = Filtered("A")(filterAnchorAttribs)({
		id: "link-id",
		href: "/path",
		class: "should-be-filtered",
		title: "should-be-filtered",
		onclick: "should-be-filtered",
	})
	const result = createA([])

	assertEquals(result.attributes["id"], "link-id")
	assertEquals(result.attributes["href"], "/path")
	assertEquals(result.attributes["class"], undefined)
	assertEquals(result.attributes["title"], undefined)
	assertEquals((result.attributes as any).onclick, undefined)
})

Deno.test("Filtered should handle ARIA attributes", () => {
	const createA = Filtered("A")()({
		aria: {
			hidden: "true",
			label: "Link Button",
			describedby: "description",
		},
	})
	const result = createA([])

	assertEquals(result.attributes["aria-hidden"], "true")
	assertEquals(result.attributes["aria-label"], "Link Button")
	assertEquals(result.attributes["aria-describedby"], "description")
})

Deno.test("Filtered should handle special properties including format", () => {
	const createA = Filtered("A")()({
		calculation: "someCalculation",
		dataset: { type: "link", value: "test" },
		display: "block",
		format: "uppercase",
		scripts: ["script1.js", "script2.js"],
		stylesheets: ["style1.css", "style2.css"],
	})
	const result = createA([])

	assertEquals(result.calculation, "someCalculation")
	assertEquals(result.dataset, { type: "link", value: "test" })
	assertEquals(result.display, "block")
	assertEquals(result.format, "uppercase")
	assertEquals(result.scripts, ["script1.js", "script2.js"])
	assertEquals(result.stylesheets, ["style1.css", "style2.css"])
})

Deno.test("Filtered should work with complex attribute filtering and children", () => {
	// Custom filter that validates href attribute
	const filterAnchorAttribs = (attrs: any) => {
		const { href, target, id, ...rest } = attrs
		const result: any = { id }
		if (typeof href === "string" && href.startsWith("/")) {
			result.href = href
		}
		if (target === "_blank" || target === "_self") {
			result.target = target
		}
		return result
	}

	const createA = Filtered("A")(filterAnchorAttribs)({
		id: "valid-link",
		href: "/valid-path",
		target: "_blank",
		onclick: "invalidAttribute",
		class: "invalidAttribute",
	})
	const result = createA([TextNode("Link Text")])

	assertEquals(result.attributes["id"], "valid-link")
	assertEquals(result.attributes["href"], "/valid-path")
	assertEquals(result.attributes["target"], "_blank")
	assertEquals(result.attributes["onclick"], undefined)
	assertEquals(result.attributes["class"], undefined)
	assertEquals(result.children, [{ content: "Link Text", tag: "TextNode" }])
})

Deno.test("Filtered should handle mixed attributes including special properties", () => {
	const createA = Filtered()((a: any) => a)({
		calculation: "calculation",
		dataset: { value: "dataset" },
		display: "display",
		format: "format",
		href: "/",
		id: "test-id",
		scripts: ["scripts"],
		stylesheets: ["stylesheets"],
	})
	const result = createA([TextNode("Text")])

	assertExists(result.attributes["id"])
	assertEquals(result.attributes["href"], "/")
	assertEquals(result.children, [{ content: "Text", tag: "TextNode" }])
	assertEquals(result.calculation, "calculation")
	assertEquals(result.dataset, { value: "dataset" })
	assertEquals(result.display, "display")
	assertEquals(result.format, "format")
	assertEquals(result.scripts, ["scripts"])
	assertEquals(result.stylesheets, ["stylesheets"])
	assertEquals(result.tag, "A")
})
