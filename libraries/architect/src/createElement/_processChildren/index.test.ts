import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _processChildren from "./index.ts"

Deno.test("_processChildren", async function processChildrenTests(t) {
	await t.step(
		"processes string children to text configs",
		function processesStrings() {
			const result = _processChildren(["Hello", "World"])

			assertEquals(result.length, 2)
			assertEquals(result[0], { _tag: "text", content: "Hello" })
			assertEquals(result[1], { _tag: "text", content: "World" })
		},
	)

	await t.step(
		"processes number children to text configs",
		function processesNumbers() {
			const result = _processChildren([1, 2, 3])

			assertEquals(result.length, 3)
			assertEquals(result[0], { _tag: "text", content: "1" })
			assertEquals(result[1], { _tag: "text", content: "2" })
			assertEquals(result[2], { _tag: "text", content: "3" })
		},
	)

	await t.step(
		"converts null children to error configs",
		function convertsNulls() {
			const result = _processChildren(["Hello", null, "World"])

			assertEquals(result.length, 3)
			assertEquals(result[0], { _tag: "text", content: "Hello" })
			assertEquals(result[1], {
				_tag: "error",
				code: "INVALID_CHILD_NULL",
				message: "Null child encountered - this is not a valid DOM node",
				received: null,
			})
			assertEquals(result[2], { _tag: "text", content: "World" })
		},
	)

	await t.step(
		"converts undefined children to error configs",
		function convertsUndefined() {
			const result = _processChildren(["Hello", undefined, "World"])

			assertEquals(result.length, 3)
			assertEquals(result[0], { _tag: "text", content: "Hello" })
			assertEquals(result[1], {
				_tag: "error",
				code: "INVALID_CHILD_UNDEFINED",
				message: "Undefined child encountered - this is not a valid DOM node",
				received: undefined,
			})
			assertEquals(result[2], { _tag: "text", content: "World" })
		},
	)

	await t.step(
		"converts boolean children to error configs",
		function convertsBooleans() {
			const result = _processChildren(["Hello", true, false, "World"])

			assertEquals(result.length, 4)
			assertEquals(result[0], { _tag: "text", content: "Hello" })
			assertEquals(result[1], {
				_tag: "error",
				code: "INVALID_CHILD_BOOLEAN",
				message:
					"Boolean child (true) encountered - this is not a valid DOM node",
				received: true,
			})
			assertEquals(result[2], {
				_tag: "error",
				code: "INVALID_CHILD_BOOLEAN",
				message:
					"Boolean child (false) encountered - this is not a valid DOM node",
				received: false,
			})
			assertEquals(result[3], { _tag: "text", content: "World" })
		},
	)

	await t.step(
		"preserves element configs",
		function preservesElements() {
			const elementConfig = {
				_tag: "element" as const,
				tagName: "DIV",
				attributes: {},
				children: [],
			}
			const result = _processChildren([elementConfig])

			assertEquals(result.length, 1)
			assertEquals(result[0], elementConfig)
		},
	)

	await t.step(
		"flattens nested arrays",
		function flattensArrays() {
			const result = _processChildren(["Hello", ["Nested", "World"]])

			assertEquals(result.length, 3)
			assertEquals(result[0], { _tag: "text", content: "Hello" })
			assertEquals(result[1], { _tag: "text", content: "Nested" })
			assertEquals(result[2], { _tag: "text", content: "World" })
		},
	)

	await t.step(
		"flattens deeply nested arrays",
		function flattensDeepArrays() {
			const result = _processChildren(["A", ["B", ["C", "D"]], "E"])

			assertEquals(result.length, 5)
			assertEquals(result[0], { _tag: "text", content: "A" })
			assertEquals(result[1], { _tag: "text", content: "B" })
			assertEquals(result[2], { _tag: "text", content: "C" })
			assertEquals(result[3], { _tag: "text", content: "D" })
			assertEquals(result[4], { _tag: "text", content: "E" })
		},
	)

	await t.step(
		"handles empty array",
		function handlesEmpty() {
			const result = _processChildren([])

			assertEquals(result.length, 0)
			assertEquals(result, [])
		},
	)

	await t.step(
		"handles mixed types",
		function handlesMixed() {
			const element = {
				_tag: "element" as const,
				tagName: "SPAN",
				attributes: {},
				children: [],
			}
			const result = _processChildren(["text", 42, element, null, true])

			assertEquals(result.length, 5)
			assertEquals(result[0], { _tag: "text", content: "text" })
			assertEquals(result[1], { _tag: "text", content: "42" })
			assertEquals(result[2], element)
			assertEquals(result[3], {
				_tag: "error",
				code: "INVALID_CHILD_NULL",
				message: "Null child encountered - this is not a valid DOM node",
				received: null,
			})
			assertEquals(result[4], {
				_tag: "error",
				code: "INVALID_CHILD_BOOLEAN",
				message:
					"Boolean child (true) encountered - this is not a valid DOM node",
				received: true,
			})
		},
	)

	await t.step(
		"converts nulls from nested arrays to error configs",
		function convertsNestedNulls() {
			const result = _processChildren(["A", [null, "B", undefined], "C"])

			assertEquals(result.length, 5)
			assertEquals(result[0], { _tag: "text", content: "A" })
			assertEquals(result[1], {
				_tag: "error",
				code: "INVALID_CHILD_NULL",
				message: "Null child encountered - this is not a valid DOM node",
				received: null,
			})
			assertEquals(result[2], { _tag: "text", content: "B" })
			assertEquals(result[3], {
				_tag: "error",
				code: "INVALID_CHILD_UNDEFINED",
				message: "Undefined child encountered - this is not a valid DOM node",
				received: undefined,
			})
			assertEquals(result[4], { _tag: "text", content: "C" })
		},
	)

	await t.step(
		"converts array with only invalid values to error configs",
		function convertsOnlyInvalid() {
			const result = _processChildren([null, undefined, true, false])

			assertEquals(result.length, 4)
			assertEquals(result[0], {
				_tag: "error",
				code: "INVALID_CHILD_NULL",
				message: "Null child encountered - this is not a valid DOM node",
				received: null,
			})
			assertEquals(result[1], {
				_tag: "error",
				code: "INVALID_CHILD_UNDEFINED",
				message: "Undefined child encountered - this is not a valid DOM node",
				received: undefined,
			})
			assertEquals(result[2], {
				_tag: "error",
				code: "INVALID_CHILD_BOOLEAN",
				message:
					"Boolean child (true) encountered - this is not a valid DOM node",
				received: true,
			})
			assertEquals(result[3], {
				_tag: "error",
				code: "INVALID_CHILD_BOOLEAN",
				message:
					"Boolean child (false) encountered - this is not a valid DOM node",
				received: false,
			})
		},
	)

	await t.step(
		"preserves text node configs",
		function preservesTextConfigs() {
			const textConfig = { _tag: "text" as const, content: "Already a config" }
			const result = _processChildren([textConfig])

			assertEquals(result.length, 1)
			assertEquals(result[0], textConfig)
		},
	)

	await t.step(
		"preserves comment configs",
		function preservesComments() {
			const commentConfig = { _tag: "comment" as const, content: "A comment" }
			const result = _processChildren([commentConfig])

			assertEquals(result.length, 1)
			assertEquals(result[0], commentConfig)
		},
	)
})

Deno.test("_processChildren - property: all results are valid configs", function allResultsValid() {
	fc.assert(
		fc.property(
			fc.array(
				fc.oneof(fc.string(), fc.integer(), fc.constant(null), fc.boolean()),
			),
			function propertyAllValid(children) {
				const result = _processChildren(children)
				// All results should be valid VirtualNodes (text, element, comment, or error)
				result.forEach((child) => {
					assertEquals(
						child._tag === "text" || child._tag === "element" ||
							child._tag === "comment" || child._tag === "error",
						true,
					)
				})
			},
		),
	)
})

Deno.test("_processChildren - property: no nulls in output", function noNullsOutput() {
	fc.assert(
		fc.property(
			fc.array(
				fc.oneof(
					fc.string(),
					fc.integer(),
					fc.constant(null),
					fc.constant(undefined),
					fc.boolean(),
				),
			),
			function propertyNoNulls(children) {
				const result = _processChildren(children)
				result.forEach((child) => {
					assertEquals(child !== null, true)
					assertEquals(child !== undefined, true)
				})
			},
		),
	)
})

Deno.test("_processChildren - property: all text configs have content", function textConfigsHaveContent() {
	fc.assert(
		fc.property(
			fc.array(fc.oneof(fc.string(), fc.integer())),
			function propertyTextConfigs(children) {
				const result = _processChildren(children)
				result.forEach((child) => {
					if (child._tag === "text") {
						assertEquals(typeof child.content, "string")
					}
				})
			},
		),
	)
})

Deno.test("_processChildren - property: preserves all element configs", function preservesElements() {
	fc.assert(
		fc.property(
			fc.array(
				fc.record({
					_tag: fc.constant("element" as const),
					tagName: fc.string({ minLength: 1 }),
					attributes: fc.dictionary(fc.string(), fc.string()),
					children: fc.constant([]),
				}),
			),
			function propertyPreservesElements(children) {
				const result = _processChildren(children)
				assertEquals(result.length, children.length)
				result.forEach((child, index) => {
					assertEquals(child, children[index])
				})
			},
		),
	)
})
