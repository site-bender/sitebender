import { assertEquals } from "@std/assert"
import _Figure from "./index.ts"

Deno.test("_Figure - with figcaption child allows figure role", function testFigureWithFigcaptionFigure() {
	const figcaptionChild = {
		_tag: "element" as const,
		tagName: "FIGCAPTION",
		attributes: {},
		children: ["Caption"],
	}

	const result = _Figure({
		role: "figure",
		children: [figcaptionChild],
	})

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "FIGURE")
	assertEquals(result.attributes.role, "figure")
})

Deno.test("_Figure - with figcaption child rejects button role", function testFigureWithFigcaptionRejectsButton() {
	const figcaptionChild = {
		_tag: "element" as const,
		tagName: "FIGCAPTION",
		attributes: {},
		children: ["Caption"],
	}

	const result = _Figure({
		role: "button",
		children: [figcaptionChild],
	})

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "FIGURE")
	assertEquals(result.attributes["data-§-bad-role"], "button")
})

Deno.test("_Figure - without figcaption allows button role", function testFigureWithoutFigcaptionButton() {
	const imgChild = {
		_tag: "element" as const,
		tagName: "IMG",
		attributes: {},
		children: [],
	}

	const result = _Figure({
		role: "button",
		children: [imgChild],
	})

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "FIGURE")
	assertEquals(result.attributes.role, "button")
})

Deno.test("_Figure - without figcaption allows any role", function testFigureWithoutFigcaptionAnyRole() {
	const result = _Figure({ role: "region" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "FIGURE")
	assertEquals(result.attributes.role, "region")
})

Deno.test("_Figure - validates global attributes", function testFigureGlobalAttrs() {
	const result = _Figure({
		id: "test-figure",
		class: "image-figure",
	})

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "FIGURE")
	assertEquals(result.attributes.id, "test-figure")
	assertEquals(result.attributes.class, "image-figure")
})

Deno.test("_Figure - creates empty children array by default", function testFigureEmptyChildren() {
	const result = _Figure({})

	assertEquals(result.children, [])
})

Deno.test("_Figure - preserves children", function testFigureWithChildren() {
	const imgChild = {
		_tag: "element" as const,
		tagName: "IMG",
		attributes: {},
		children: [],
	}

	const result = _Figure({ children: [imgChild] })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "FIGURE")
	assertEquals(result.children.length, 1)
})
