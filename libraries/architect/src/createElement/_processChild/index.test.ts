import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _processChild from "./index.ts"

Deno.test("_processChild", async function processChildTests(t) {
	await t.step(
		"converts string to text config",
		function convertsString() {
			const result = _processChild("Hello")

			assertEquals(result, {
				_tag: "text",
				content: "Hello",
			})
		},
	)

	await t.step(
		"converts number to text config",
		function convertsNumber() {
			const result = _processChild(42)

			assertEquals(result, {
				_tag: "text",
				content: "42",
			})
		},
	)

	await t.step(
		"converts zero to text config",
		function convertsZero() {
			const result = _processChild(0)

			assertEquals(result, {
				_tag: "text",
				content: "0",
			})
		},
	)

	await t.step(
		"converts null to error config",
		function convertsNull() {
			const result = _processChild(null)

			assertEquals(result, {
				_tag: "error",
				code: "INVALID_CHILD_NULL",
				message: "Null child encountered - this is not a valid DOM node",
				received: null,
			})
		},
	)

	await t.step(
		"converts undefined to error config",
		function convertsUndefined() {
			const result = _processChild(undefined)

			assertEquals(result, {
				_tag: "error",
				code: "INVALID_CHILD_UNDEFINED",
				message: "Undefined child encountered - this is not a valid DOM node",
				received: undefined,
			})
		},
	)

	await t.step(
		"converts true to error config",
		function convertsTrue() {
			const result = _processChild(true)

			assertEquals(result, {
				_tag: "error",
				code: "INVALID_CHILD_BOOLEAN",
				message:
					"Boolean child (true) encountered - this is not a valid DOM node",
				received: true,
			})
		},
	)

	await t.step(
		"converts false to error config",
		function convertsFalse() {
			const result = _processChild(false)

			assertEquals(result, {
				_tag: "error",
				code: "INVALID_CHILD_BOOLEAN",
				message:
					"Boolean child (false) encountered - this is not a valid DOM node",
				received: false,
			})
		},
	)

	await t.step(
		"returns array as-is",
		function returnsArray() {
			const arr = ["hello", "world"]
			const result = _processChild(arr)

			assertEquals(result, arr)
		},
	)

	await t.step(
		"returns nested array as-is",
		function returnsNestedArray() {
			const arr = [["nested"], "value"]
			const result = _processChild(arr)

			assertEquals(result, arr)
		},
	)

	await t.step(
		"returns element config as-is",
		function returnsVirtualNode() {
			const config = {
				_tag: "element" as const,
				tagName: "DIV",
				attributes: {},
				children: [],
			}
			const result = _processChild(config)

			assertEquals(result, config)
		},
	)

	await t.step(
		"returns text config as-is",
		function returnsTextConfig() {
			const config = {
				_tag: "text" as const,
				content: "test",
			}
			const result = _processChild(config)

			assertEquals(result, config)
		},
	)

	await t.step(
		"returns comment config as-is",
		function returnsCommentConfig() {
			const config = {
				_tag: "comment" as const,
				content: "test comment",
			}
			const result = _processChild(config)

			assertEquals(result, config)
		},
	)

	await t.step(
		"converts invalid object without _tag to error config",
		function convertsInvalidObject() {
			const result = _processChild({ foo: "bar" } as never)

			assertEquals(result, {
				_tag: "error",
				code: "INVALID_CHILD_TYPE",
				message: 'Invalid child type "object" encountered',
				received: { foo: "bar" },
			})
		},
	)

	await t.step(
		"converts object with invalid _tag to error config",
		function convertsInvalidTag() {
			const result = _processChild({ _tag: "invalid" } as never)

			assertEquals(result, {
				_tag: "error",
				code: "INVALID_CHILD_TAG",
				message: 'Object with invalid _tag "invalid" encountered',
				received: { _tag: "invalid" },
			})
		},
	)

	await t.step(
		"handles empty string",
		function handlesEmptyString() {
			const result = _processChild("")

			assertEquals(result, {
				_tag: "text",
				content: "",
			})
		},
	)

	await t.step(
		"handles negative numbers",
		function handlesNegativeNumbers() {
			const result = _processChild(-42)

			assertEquals(result, {
				_tag: "text",
				content: "-42",
			})
		},
	)

	await t.step(
		"handles decimal numbers",
		function handlesDecimals() {
			const result = _processChild(3.14159)

			assertEquals(result, {
				_tag: "text",
				content: "3.14159",
			})
		},
	)
})

Deno.test("_processChild - property: strings always become text configs", function stringsToText() {
	fc.assert(
		fc.property(
			fc.string(),
			function propertyStringToText(value) {
				const result = _processChild(value)

				if (
					result !== null && typeof result === "object" &&
					!Array.isArray(result) && "_tag" in result
				) {
					assertEquals(result._tag, "text")
					if (result._tag === "text") {
						assertEquals(result.content, value)
					}
				}
			},
		),
	)
})

Deno.test("_processChild - property: numbers always become text configs", function numbersToText() {
	fc.assert(
		fc.property(
			fc.oneof(fc.integer(), fc.float()).filter((n) =>
				!Number.isNaN(n) && Number.isFinite(n)
			),
			function propertyNumberToText(value) {
				const result = _processChild(value)

				if (
					result !== null && typeof result === "object" &&
					!Array.isArray(result) && "_tag" in result
				) {
					assertEquals(result._tag, "text")
					if (result._tag === "text") {
						assertEquals(result.content, String(value))
					}
				}
			},
		),
	)
})

Deno.test("_processChild - property: booleans always become error configs", function booleansToError() {
	fc.assert(
		fc.property(
			fc.boolean(),
			function propertyBooleansToError(value) {
				const result = _processChild(value)

				if (
					result !== null && typeof result === "object" &&
					!Array.isArray(result) && "_tag" in result
				) {
					assertEquals(result._tag, "error")
					if (result._tag === "error") {
						assertEquals(result.code, "INVALID_CHILD_BOOLEAN")
						assertEquals(result.received, value)
					}
				}
			},
		),
	)
})

Deno.test("_processChild - property: arrays returned unchanged", function arraysUnchanged() {
	fc.assert(
		fc.property(
			fc.array(fc.oneof(fc.string(), fc.integer(), fc.constant(null))),
			function propertyArraysUnchanged(value) {
				const result = _processChild(value)
				assertEquals(result, value)
			},
		),
	)
})

Deno.test("_processChild - property: valid configs returned unchanged", function configsUnchanged() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.record({
					_tag: fc.constant("text" as const),
					content: fc.string(),
				}),
				fc.record({
					_tag: fc.constant("comment" as const),
					content: fc.string(),
				}),
			),
			function propertyConfigsUnchanged(value) {
				const result = _processChild(value)
				assertEquals(result, value)
			},
		),
	)
})
