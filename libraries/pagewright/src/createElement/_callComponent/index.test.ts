import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _callComponent from "./index.ts"
import type { Props, ElementConfig } from "../../types/index.ts"

Deno.test("_callComponent", async function callComponentTests(t) {
	await t.step(
		"calls component function with props",
		function callsComponent() {
			function testComponent(props: Props): ElementConfig {
				return {
					_tag: "element",
					tagName: "DIV",
					attributes: {},
					children: [],
				}
			}

			const result = _callComponent(testComponent)({})

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.tagName, "DIV")
			}
		},
	)

	await t.step(
		"passes props to component",
		function passesProps() {
			function testComponent(props: Props): ElementConfig {
				return {
					_tag: "element",
					tagName: "DIV",
					attributes: { id: props.id as string },
					children: [],
				}
			}

			const result = _callComponent(testComponent)({ id: "test-id" })

			if (result._tag === "element") {
				assertEquals(result.attributes.id, "test-id")
			}
		},
	)

	await t.step(
		"handles component with children",
		function handlesChildren() {
			function testComponent(props: Props): ElementConfig {
				return {
					_tag: "element",
					tagName: "DIV",
					attributes: {},
					children: (props.children || []) as ReadonlyArray<ElementConfig>,
				}
			}

			const children = [{ _tag: "text" as const, content: "Hello" }]
			const result = _callComponent(testComponent)({ children })

			if (result._tag === "element") {
				assertEquals(result.children.length, 1)
				assertEquals(result.children[0], children[0])
			}
		},
	)

	await t.step(
		"is properly curried",
		function properlyCurried() {
			function testComponent(props: Props): ElementConfig {
				return {
					_tag: "element",
					tagName: "SPAN",
					attributes: {},
					children: [],
				}
			}

			const withComponent = _callComponent(testComponent)
			const result = withComponent({})

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.tagName, "SPAN")
			}
		},
	)

	await t.step(
		"preserves component return value",
		function preservesReturn() {
			function testComponent(props: Props): ElementConfig {
				return {
					_tag: "text",
					content: "Test content",
				}
			}

			const result = _callComponent(testComponent)({})

			assertEquals(result._tag, "text")
			if (result._tag === "text") {
				assertEquals(result.content, "Test content")
			}
		},
	)

	await t.step(
		"works with comment config",
		function worksWithComment() {
			function testComponent(props: Props): ElementConfig {
				return {
					_tag: "comment",
					content: "Test comment",
				}
			}

			const result = _callComponent(testComponent)({})

			assertEquals(result._tag, "comment")
			if (result._tag === "comment") {
				assertEquals(result.content, "Test comment")
			}
		},
	)

	await t.step(
		"handles empty props",
		function handlesEmptyProps() {
			function testComponent(props: Props): ElementConfig {
				return {
					_tag: "element",
					tagName: "DIV",
					attributes: {},
					children: [],
				}
			}

			const result = _callComponent(testComponent)({})

			assertEquals(result._tag, "element")
		},
	)

	await t.step(
		"handles complex props",
		function handlesComplexProps() {
			function testComponent(props: Props): ElementConfig {
				return {
					_tag: "element",
					tagName: "DIV",
					attributes: {
						id: props.id as string,
						class: props.class as string,
						"data-test": props["data-test"] as string,
					},
					children: [],
				}
			}

			const result = _callComponent(testComponent)({
				id: "test",
				class: "container",
				"data-test": "value",
			})

			if (result._tag === "element") {
				assertEquals(result.attributes.id, "test")
				assertEquals(result.attributes.class, "container")
				assertEquals(result.attributes["data-test"], "value")
			}
		},
	)
})

Deno.test("_callComponent - property: always returns ElementConfig", function alwaysReturnsConfig() {
	fc.assert(
		fc.property(
			fc.dictionary(fc.string(), fc.string()),
			function propertyReturnsConfig(props) {
				function testComponent(p: Props): ElementConfig {
					return {
						_tag: "element",
						tagName: "DIV",
						attributes: {},
						children: [],
					}
				}

				const result = _callComponent(testComponent)(props)

				assertEquals(result._tag, "element")
			},
		),
	)
})

Deno.test("_callComponent - property: preserves all props", function preservesProps() {
	fc.assert(
		fc.property(
			fc.dictionary(fc.string(), fc.string()),
			function propertyPreservesProps(props) {
				function testComponent(p: Props): ElementConfig {
					return {
						_tag: "element",
						tagName: "DIV",
						attributes: p as Record<string, string>,
						children: [],
					}
				}

				const result = _callComponent(testComponent)(props)

				if (result._tag === "element") {
					assertEquals(result.attributes, props)
				}
			},
		),
	)
})
