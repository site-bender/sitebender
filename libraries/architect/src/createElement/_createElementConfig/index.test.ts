import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _createVirtualNode from "./index.ts"

Deno.test("_createVirtualNode", async function createVirtualNodeTests(t) {
	await t.step(
		"creates element config with uppercase tag",
		function createsElement() {
			const result = _createVirtualNode("div")({})([])

			assertEquals(result._tag, "element")
			assertEquals((result as any).tagName, "DIV")
			assertEquals((result as any).attributes, {})
			assertEquals((result as any).children, [])
		},
	)

	await t.step(
		"uppercases lowercase tag names",
		function uppercasesTag() {
			const result = _createVirtualNode("section")({})([])

			assertEquals((result as any).tagName, "SECTION")
		},
	)

	await t.step(
		"preserves already uppercase tag names",
		function preservesUppercase() {
			const result = _createVirtualNode("ARTICLE")({})([])

			assertEquals((result as any).tagName, "ARTICLE")
		},
	)

	await t.step(
		"handles mixed case tag names",
		function handlesMixedCase() {
			const result = _createVirtualNode("DiV")({})([])

			assertEquals((result as any).tagName, "DIV")
		},
	)

	await t.step(
		"includes attributes",
		function includesAttributes() {
			const attrs = { id: "test", class: "container" }
			const result = _createVirtualNode("div")(attrs)([])

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
			const result = _createVirtualNode("div")({})(children)

			assertEquals((result as any).children, children)
		},
	)

	await t.step(
		"creates complete element with all parts",
		function createsComplete() {
			const attrs = { id: "main", role: "main" }
			const children = [{ _tag: "text" as const, content: "Content" }]
			const result = _createVirtualNode("main")(attrs)(children)

			assertEquals(result._tag, "element")
			assertEquals((result as any).tagName, "MAIN")
			assertEquals((result as any).attributes, attrs)
			assertEquals((result as any).children, children)
		},
	)

	await t.step(
		"is properly curried",
		function properlyCurried() {
			const withTag = _createVirtualNode("div")
			const withAttrs = withTag({ class: "box" })
			const result = withAttrs([])

			assertEquals((result as any).tagName, "DIV")
			assertEquals((result as any).attributes.class, "box")
		},
	)

	await t.step(
		"handles empty attributes",
		function handlesEmptyAttrs() {
			const result = _createVirtualNode("span")({})([])

			assertEquals((result as any).attributes, {})
		},
	)

	await t.step(
		"handles empty children",
		function handlesEmptyChildren() {
			const result = _createVirtualNode("p")({})([])

			assertEquals((result as any).children, [])
		},
	)

	await t.step(
		"handles SVG tag names",
		function handlesSvgTags() {
			const result = _createVirtualNode("svg")({})([])

			assertEquals((result as any).tagName, "SVG")
		},
	)
})

Deno.test("_createVirtualNode - property: always returns element tag", function alwaysElementTag() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }),
			function propertyElementTag(tagName) {
				const result = _createVirtualNode(tagName)({})([])
				assertEquals(result._tag, "element")
			},
		),
	)
})

Deno.test("_createVirtualNode - property: tag always uppercased", function tagAlwaysUppercase() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }),
			function propertyUppercase(tagName) {
				const result = _createVirtualNode(tagName)({})([])
				assertEquals(
					(result as any).tagName,
					(result as any).tagName.toUpperCase(),
				)
			},
		),
	)
})

Deno.test("_createVirtualNode - property: preserves attributes", function preservesAttributes() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }),
			fc.dictionary(fc.string(), fc.string()),
			function propertyPreservesAttrs(tagName, attrs) {
				const result = _createVirtualNode(tagName)(attrs)([])
				assertEquals((result as any).attributes, attrs)
			},
		),
	)
})

Deno.test("_createVirtualNode - property: preserves children", function preservesChildren() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }),
			fc.array(
				fc.record({
					_tag: fc.constantFrom(
						"text" as const,
						"element" as const,
						"comment" as const,
					),
					content: fc.string(),
				}),
			),
			function propertyPreservesChildren(tagName, children) {
				const result = _createVirtualNode(tagName)({})(children as never)
				assertEquals((result as any).children, children)
			},
		),
	)
})
