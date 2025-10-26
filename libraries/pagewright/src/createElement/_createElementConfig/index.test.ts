import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _createElementConfig from "./index.ts"

Deno.test("_createElementConfig", async function createElementConfigTests(t) {
	await t.step(
		"creates element config with uppercase tag",
		function createsElement() {
			const result = _createElementConfig("div")({})([])

			assertEquals(result._tag, "element")
			assertEquals((result as any).tagName, "DIV")
			assertEquals((result as any).attributes, {})
			assertEquals((result as any).children, [])
		},
	)

	await t.step(
		"uppercases lowercase tag names",
		function uppercasesTag() {
			const result = _createElementConfig("section")({})([])

			assertEquals((result as any).tagName, "SECTION")
		},
	)

	await t.step(
		"preserves already uppercase tag names",
		function preservesUppercase() {
			const result = _createElementConfig("ARTICLE")({})([])

			assertEquals((result as any).tagName, "ARTICLE")
		},
	)

	await t.step(
		"handles mixed case tag names",
		function handlesMixedCase() {
			const result = _createElementConfig("DiV")({})([])

			assertEquals((result as any).tagName, "DIV")
		},
	)

	await t.step(
		"includes attributes",
		function includesAttributes() {
			const attrs = { id: "test", class: "container" }
			const result = _createElementConfig("div")(attrs)([])

			assertEquals((result as any).attributes, attrs)
		},
	)

	await t.step(
		"includes children",
		function includesChildren() {
			const children = [
				{ _tag: "text" as const, content: "Hello" },
				{ _tag: "text" as const, content: "World" },
			]
			const result = _createElementConfig("div")({})(children)

			assertEquals((result as any).children, children)
		},
	)

	await t.step(
		"creates complete element with all parts",
		function createsComplete() {
			const attrs = { id: "main", role: "main" }
			const children = [{ _tag: "text" as const, content: "Content" }]
			const result = _createElementConfig("main")(attrs)(children)

			assertEquals(result._tag, "element")
			assertEquals((result as any).tagName, "MAIN")
			assertEquals((result as any).attributes, attrs)
			assertEquals((result as any).children, children)
		},
	)

	await t.step(
		"is properly curried",
		function properlyCurried() {
			const withTag = _createElementConfig("div")
			const withAttrs = withTag({ class: "box" })
			const result = withAttrs([])

			assertEquals((result as any).tagName, "DIV")
			assertEquals((result as any).attributes.class, "box")
		},
	)

	await t.step(
		"handles empty attributes",
		function handlesEmptyAttrs() {
			const result = _createElementConfig("span")({})([])

			assertEquals((result as any).attributes, {})
		},
	)

	await t.step(
		"handles empty children",
		function handlesEmptyChildren() {
			const result = _createElementConfig("p")({})([])

			assertEquals((result as any).children, [])
		},
	)

	await t.step(
		"handles SVG tag names",
		function handlesSvgTags() {
			const result = _createElementConfig("svg")({})([])

			assertEquals((result as any).tagName, "SVG")
		},
	)
})

Deno.test("_createElementConfig - property: always returns element tag", function alwaysElementTag() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }),
			function propertyElementTag(tagName) {
				const result = _createElementConfig(tagName)({})([])
				assertEquals(result._tag, "element")
			},
		),
	)
})

Deno.test("_createElementConfig - property: tag always uppercased", function tagAlwaysUppercase() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }),
			function propertyUppercase(tagName) {
				const result = _createElementConfig(tagName)({})([])
				assertEquals((result as any).tagName, (result as any).tagName.toUpperCase())
			},
		),
	)
})

Deno.test("_createElementConfig - property: preserves attributes", function preservesAttributes() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }),
			fc.dictionary(fc.string(), fc.string()),
			function propertyPreservesAttrs(tagName, attrs) {
				const result = _createElementConfig(tagName)(attrs)([])
				assertEquals((result as any).attributes, attrs)
			},
		),
	)
})

Deno.test("_createElementConfig - property: preserves children", function preservesChildren() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }),
			fc.array(
				fc.record({
					_tag: fc.constantFrom("text" as const, "element" as const, "comment" as const),
					content: fc.string(),
				}),
			),
			function propertyPreservesChildren(tagName, children) {
				const result = _createElementConfig(tagName)({})(children as never)
				assertEquals((result as any).children, children)
			},
		),
	)
})
