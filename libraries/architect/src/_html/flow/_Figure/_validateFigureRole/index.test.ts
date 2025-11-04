import { assertEquals } from "@std/assert"
import _validateFigureRole from "./index.ts"

Deno.test("_validateFigureRole - with figcaption allows figure role", function testFigureWithFigcaptionFigure() {
	const children = [
		{
			_tag: "element" as const,
			tagName: "FIGCAPTION",
			attributes: {},
			children: [],
		},
	]

	const result = _validateFigureRole(children)("figure")

	assertEquals(result, { role: "figure" })
})

Deno.test("_validateFigureRole - with figcaption allows none role", function testFigureWithFigcaptionNone() {
	const children = [
		{
			_tag: "element" as const,
			tagName: "FIGCAPTION",
			attributes: {},
			children: [],
		},
	]

	const result = _validateFigureRole(children)("none")

	assertEquals(result, { role: "none" })
})

Deno.test("_validateFigureRole - with figcaption allows presentation role", function testFigureWithFigcaptionPresentation() {
	const children = [
		{
			_tag: "element" as const,
			tagName: "FIGCAPTION",
			attributes: {},
			children: [],
		},
	]

	const result = _validateFigureRole(children)("presentation")

	assertEquals(result, { role: "presentation" })
})

Deno.test("_validateFigureRole - with figcaption rejects button role", function testFigureWithFigcaptionRejectsButton() {
	const children = [
		{
			_tag: "element" as const,
			tagName: "FIGCAPTION",
			attributes: {},
			children: [],
		},
	]

	const result = _validateFigureRole(children)("button")

	assertEquals(result, { "data-§-bad-role": "button" })
})

Deno.test("_validateFigureRole - without figcaption allows button role", function testFigureWithoutFigcaptionButton() {
	const children = [
		{
			_tag: "element" as const,
			tagName: "IMG",
			attributes: {},
			children: [],
		},
	]

	const result = _validateFigureRole(children)("button")

	assertEquals(result, { role: "button" })
})

Deno.test("_validateFigureRole - without figcaption allows any role", function testFigureWithoutFigcaptionAnyRole() {
	const children = [
		{
			_tag: "element" as const,
			tagName: "IMG",
			attributes: {},
			children: [],
		},
	]

	const result = _validateFigureRole(children)("region")

	assertEquals(result, { role: "region" })
})

Deno.test("_validateFigureRole - with empty children allows any role", function testFigureEmptyChildren() {
	const children = []

	const result = _validateFigureRole(children)("button")

	assertEquals(result, { role: "button" })
})

Deno.test("_validateFigureRole - returns empty object when role is undefined", function testFigureRoleUndefined() {
	const children = []

	const result = _validateFigureRole(children)(undefined)

	assertEquals(result, {})
})

Deno.test("_validateFigureRole - returns empty object when role is null", function testFigureRoleNull() {
	const children = []

	const result = _validateFigureRole(children)(null)

	assertEquals(result, {})
})

Deno.test("_validateFigureRole - returns empty object when role is not a string", function testFigureRoleNotString() {
	const children = []

	const result = _validateFigureRole(children)(123)

	assertEquals(result, {})
})
