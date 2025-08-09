import { assertEquals } from "@std/assert"

import Fragment from "../../../../constructors/elements/Fragment/index.ts"
import TextNode from "../../../../constructors/elements/TextNode/index.ts"

Deno.test("Fragment should create a basic fragment with no children", () => {
	const fragment = Fragment()([])
	assertEquals(fragment.tag, "Fragment")
	assertEquals(fragment.children, [])
})

Deno.test("Fragment should create a fragment with multiple children", () => {
	const child1 = TextNode("Hello ")
	const child2 = TextNode("world!")
	const fragment = Fragment()([child1, child2])

	assertEquals(fragment.tag, "Fragment")
	assertEquals(fragment.children.length, 2)
	assertEquals(fragment.children[0], child1)
	assertEquals(fragment.children[1], child2)
})

Deno.test("Fragment should handle single child (not array)", () => {
	const child = TextNode("Single child")
	const fragment = Fragment()([child])

	assertEquals(fragment.tag, "Fragment")
	assertEquals(fragment.children.length, 1)
	assertEquals(fragment.children[0], child)
})

Deno.test("Fragment should handle mixed element types", () => {
	const textNode = TextNode("Text")
	const divElement = {
		tag: "Div",
		attributes: { id: "test-div" },
		children: [],
	}
	const spanElement = {
		tag: "Span",
		attributes: { class: "highlight" },
		children: [],
	}

	const fragment = Fragment()([textNode, divElement, spanElement])

	assertEquals(fragment.tag, "Fragment")
	assertEquals(fragment.children.length, 3)
	assertEquals(fragment.children[0], textNode)
	assertEquals(fragment.children[1], divElement)
	assertEquals(fragment.children[2], spanElement)
})

Deno.test("Fragment should handle nested fragments", () => {
	const innerFragment = Fragment()([TextNode("Inner")])
	const outerFragment = Fragment()([TextNode("Outer"), innerFragment])

	assertEquals(outerFragment.tag, "Fragment")
	assertEquals(outerFragment.children.length, 2)
	assertEquals((outerFragment.children[0] as any).tag, "TextNode")
	assertEquals((outerFragment.children[1] as any).tag, "Fragment")
})

Deno.test("Fragment should handle empty arrays", () => {
	const fragment = Fragment()([])
	assertEquals(fragment.tag, "Fragment")
	assertEquals(fragment.children, [])
})

Deno.test("Fragment should handle scripts and stylesheets", () => {
	const fragment = Fragment({
		scripts: ["script1.js", "script2.js"],
		stylesheets: ["style1.css", "style2.css"],
	})([TextNode("Content")])

	assertEquals(fragment.tag, "Fragment")
	assertEquals((fragment as any).scripts, ["script1.js", "script2.js"])
	assertEquals((fragment as any).stylesheets, ["style1.css", "style2.css"])
	assertEquals(fragment.children.length, 1)
})

Deno.test("Fragment should handle undefined scripts and stylesheets", () => {
	const fragment = Fragment({
		scripts: undefined,
		stylesheets: undefined,
	})([TextNode("Content")])

	assertEquals(fragment.tag, "Fragment")
	assertEquals(fragment.scripts, undefined)
	assertEquals(fragment.stylesheets, undefined)
	assertEquals(fragment.children.length, 1)
})

Deno.test("Fragment should handle complex nested structures", () => {
	const complexStructure = [
		TextNode("Start"),
		Fragment()([
			TextNode("Nested "),
			TextNode("content"),
		]),
		{
			tag: "Div",
			attributes: { class: "container" },
			children: [
				TextNode("Inside div"),
				Fragment()([TextNode("More nested")]),
			],
		},
		TextNode("End"),
	]

	const fragment = Fragment()(complexStructure)

	assertEquals(fragment.tag, "Fragment")
	assertEquals(fragment.children.length, 4)
	assertEquals((fragment.children[0] as any).tag, "TextNode")
	assertEquals((fragment.children[1] as any).tag, "Fragment")
	assertEquals((fragment.children[2] as any).tag, "Div")
	assertEquals((fragment.children[3] as any).tag, "TextNode")
})
