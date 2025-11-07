import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _flattenChild from "./index.ts"
import type { VirtualNode } from "../../../types/index.ts"

Deno.test("_flattenChild", async function flattenChildTests(t) {
	await t.step(
		"wraps VirtualNode in array",
		function wrapsVirtualNode() {
			const elementConfig: VirtualNode = {
				_tag: "element",
				tagName: "DIV",
				attributes: {},
				children: [],
			}

			const result = _flattenChild(elementConfig)

			assertEquals(result.length, 1)
			assertEquals(result[0], elementConfig)
		},
	)

	await t.step(
		"wraps text config in array",
		function wrapsTextConfig() {
			const textConfig: VirtualNode = {
				_tag: "text",
				content: "Hello",
			}

			const result = _flattenChild(textConfig)

			assertEquals(result.length, 1)
			assertEquals(result[0], textConfig)
		},
	)

	await t.step(
		"wraps comment config in array",
		function wrapsCommentConfig() {
			const commentConfig: VirtualNode = {
				_tag: "comment",
				content: "A comment",
			}

			const result = _flattenChild(commentConfig)

			assertEquals(result.length, 1)
			assertEquals(result[0], commentConfig)
		},
	)

	await t.step(
		"wraps error config in array",
		function wrapsErrorConfig() {
			const errorConfig: VirtualNode = {
				_tag: "error",
				code: "TEST_ERROR",
				message: "Test error",
			}

			const result = _flattenChild(errorConfig)

			assertEquals(result.length, 1)
			assertEquals(result[0], errorConfig)
		},
	)

	await t.step(
		"recursively processes single-level array of strings",
		function processesSingleLevelArray() {
			const result = _flattenChild(["Hello", "World"])

			assertEquals(result.length, 2)
			assertEquals(result[0], { _tag: "text", content: "Hello" })
			assertEquals(result[1], { _tag: "text", content: "World" })
		},
	)

	await t.step(
		"recursively processes nested arrays",
		function processesNestedArrays() {
			const result = _flattenChild(["A", ["B", "C"]])

			assertEquals(result.length, 3)
			assertEquals(result[0], { _tag: "text", content: "A" })
			assertEquals(result[1], { _tag: "text", content: "B" })
			assertEquals(result[2], { _tag: "text", content: "C" })
		},
	)

	await t.step(
		"recursively processes deeply nested arrays",
		function processesDeepArrays() {
			const result = _flattenChild(["A", ["B", ["C", "D"]], "E"])

			assertEquals(result.length, 5)
			assertEquals(result[0], { _tag: "text", content: "A" })
			assertEquals(result[1], { _tag: "text", content: "B" })
			assertEquals(result[2], { _tag: "text", content: "C" })
			assertEquals(result[3], { _tag: "text", content: "D" })
			assertEquals(result[4], { _tag: "text", content: "E" })
		},
	)

	await t.step(
		"processes array with numbers",
		function processesNumbers() {
			const result = _flattenChild([1, 2, 3])

			assertEquals(result.length, 3)
			assertEquals(result[0], { _tag: "text", content: "1" })
			assertEquals(result[1], { _tag: "text", content: "2" })
			assertEquals(result[2], { _tag: "text", content: "3" })
		},
	)

	await t.step(
		"processes array with nulls to error configs",
		function processesNulls() {
			const result = _flattenChild(["Text", null])

			assertEquals(result.length, 2)
			assertEquals(result[0], { _tag: "text", content: "Text" })
			assertEquals(result[1], {
				_tag: "error",
				code: "INVALID_CHILD_NULL",
				message: "Null child encountered - this is not a valid DOM node",
				received: null,
			})
		},
	)

	await t.step(
		"processes array with undefined to error configs",
		function processesUndefined() {
			const result = _flattenChild(["Text", undefined])

			assertEquals(result.length, 2)
			assertEquals(result[0], { _tag: "text", content: "Text" })
			assertEquals(result[1], {
				_tag: "error",
				code: "INVALID_CHILD_UNDEFINED",
				message: "Undefined child encountered - this is not a valid DOM node",
				received: undefined,
			})
		},
	)

	await t.step(
		"processes array with booleans to error configs",
		function processesBooleans() {
			const result = _flattenChild([true, false])

			assertEquals(result.length, 2)
			assertEquals(result[1], {
				_tag: "error",
				code: "INVALID_CHILD_BOOLEAN",
				message:
					"Boolean child (true) encountered - this is not a valid DOM node",
				received: true,
			})
			assertEquals(result[0], {
				_tag: "error",
				code: "INVALID_CHILD_BOOLEAN",
				message:
					"Boolean child (false) encountered - this is not a valid DOM node",
				received: false,
			})
		},
	)

	await t.step(
		"processes empty array",
		function processesEmptyArray() {
			const result = _flattenChild([])

			assertEquals(result.length, 0)
			assertEquals(result, [])
		},
	)

	await t.step(
		"processes array with mixed element configs and primitives",
		function processesMixed() {
			const elementConfig: VirtualNode = {
				_tag: "element",
				tagName: "SPAN",
				attributes: {},
				children: [],
			}
			const result = _flattenChild(["text", elementConfig, 42])

			assertEquals(result.length, 3)
			assertEquals(result[0], { _tag: "text", content: "text" })
			assertEquals(result[1], elementConfig)
			assertEquals(result[2], { _tag: "text", content: "42" })
		},
	)

	await t.step(
		"preserves element configs in nested arrays",
		function preservesInNestedArrays() {
			const elementConfig: VirtualNode = {
				_tag: "element",
				tagName: "DIV",
				attributes: { class: "test" },
				children: [],
			}
			const result = _flattenChild([["Before", elementConfig, "After"]])

			assertEquals(result.length, 3)
			assertEquals(result[0], { _tag: "text", content: "Before" })
			assertEquals(result[1], elementConfig)
			assertEquals(result[2], { _tag: "text", content: "After" })
		},
	)
})

Deno.test("_flattenChild - property: VirtualNode always wrapped in single-item array", function wrapsConfigs() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.record({
					_tag: fc.constant("element" as const),
					tagName: fc.string({ minLength: 1 }),
					attributes: fc.dictionary(fc.string(), fc.string()),
					children: fc.constant([]),
				}),
				fc.record({
					_tag: fc.constant("text" as const),
					content: fc.string(),
				}),
				fc.record({
					_tag: fc.constant("comment" as const),
					content: fc.string(),
				}),
				fc.record({
					_tag: fc.constant("error" as const),
					code: fc.string(),
					message: fc.string(),
				}),
			),
			function propertyWrapsConfig(config) {
				const result = _flattenChild(config)
				assertEquals(result.length, 1)
				assertEquals(result[0], config)
			},
		),
	)
})

Deno.test("_flattenChild - property: arrays always produce VirtualNode results", function arraysProduceConfigs() {
	fc.assert(
		fc.property(
			fc.array(
				fc.oneof(fc.string(), fc.integer(), fc.constant(null), fc.boolean()),
			),
			function propertyArraysToConfigs(children) {
				const result = _flattenChild(children)
				result.forEach((item) => {
					assertEquals(
						item._tag === "text" || item._tag === "element" ||
							item._tag === "comment" || item._tag === "error",
						true,
					)
				})
			},
		),
	)
})

Deno.test("_flattenChild - property: no nested arrays in output", function noNestedArrays() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.array(fc.oneof(fc.string(), fc.integer())),
				fc.array(fc.array(fc.string())),
			),
			function propertyNoNestedArrays(input) {
				const result = _flattenChild(input)
				result.forEach((item) => {
					assertEquals(Array.isArray(item), false)
				})
			},
		),
	)
})

Deno.test("_flattenChild - property: output length matches flattened input", function matchesLength() {
	fc.assert(
		fc.property(
			fc.array(fc.string()),
			function propertyMatchesLength(strings) {
				const result = _flattenChild(strings)
				assertEquals(result.length, strings.length)
			},
		),
	)
})

Deno.test("_flattenChild - property: preserves order of children", function preservesOrder() {
	fc.assert(
		fc.property(
			fc.array(fc.string(), { minLength: 1 }),
			function propertyPreservesOrder(strings) {
				const result = _flattenChild(strings)
				strings.forEach((str, index) => {
					if (result[index]._tag === "text") {
						assertEquals(result[index].content, str)
					}
				})
			},
		),
	)
})
