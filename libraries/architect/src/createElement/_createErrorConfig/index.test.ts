import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _createErrorConfig from "./index.ts"

Deno.test("_createErrorConfig", async function createErrorConfigTests(t) {
	await t.step(
		"creates error config with all fields",
		function createsWithAllFields() {
			const result = _createErrorConfig("TEST_ERROR")(
				"This is a test error",
			)(
				"received value",
			)

			assertEquals(result, {
				_tag: "error",
				code: "TEST_ERROR",
				message: "This is a test error",
				received: "received value",
			})
		},
	)

	await t.step(
		"creates error config without received value",
		function createsWithoutReceived() {
			const result = _createErrorConfig("TEST_ERROR")("This is a test error")()

			assertEquals(result, {
				_tag: "error",
				code: "TEST_ERROR",
				message: "This is a test error",
				received: undefined,
			})
		},
	)

	await t.step(
		"handles null as received value",
		function handlesNull() {
			const result = _createErrorConfig("NULL_ERROR")("Null received")(null)

			assertEquals(result, {
				_tag: "error",
				code: "NULL_ERROR",
				message: "Null received",
				received: null,
			})
		},
	)

	await t.step(
		"handles undefined as received value",
		function handlesUndefined() {
			const result = _createErrorConfig("UNDEFINED_ERROR")(
				"Undefined received",
			)(undefined)

			assertEquals(result, {
				_tag: "error",
				code: "UNDEFINED_ERROR",
				message: "Undefined received",
				received: undefined,
			})
		},
	)

	await t.step(
		"handles boolean as received value",
		function handlesBoolean() {
			const result = _createErrorConfig("BOOLEAN_ERROR")("Boolean received")(
				true,
			)

			assertEquals(result, {
				_tag: "error",
				code: "BOOLEAN_ERROR",
				message: "Boolean received",
				received: true,
			})
		},
	)

	await t.step(
		"handles number as received value",
		function handlesNumber() {
			const result = _createErrorConfig("NUMBER_ERROR")("Number received")(42)

			assertEquals(result, {
				_tag: "error",
				code: "NUMBER_ERROR",
				message: "Number received",
				received: 42,
			})
		},
	)

	await t.step(
		"handles object as received value",
		function handlesObject() {
			const obj = { invalid: "tag" }
			const result = _createErrorConfig("OBJECT_ERROR")("Object received")(obj)

			assertEquals(result, {
				_tag: "error",
				code: "OBJECT_ERROR",
				message: "Object received",
				received: obj,
			})
		},
	)

	await t.step(
		"handles array as received value",
		function handlesArray() {
			const arr = [1, 2, 3]
			const result = _createErrorConfig("ARRAY_ERROR")("Array received")(arr)

			assertEquals(result, {
				_tag: "error",
				code: "ARRAY_ERROR",
				message: "Array received",
				received: arr,
			})
		},
	)

	await t.step(
		"handles empty string code",
		function handlesEmptyCode() {
			const result = _createErrorConfig("")("Empty code error")("value")

			assertEquals(result, {
				_tag: "error",
				code: "",
				message: "Empty code error",
				received: "value",
			})
		},
	)

	await t.step(
		"handles empty string message",
		function handlesEmptyMessage() {
			const result = _createErrorConfig("EMPTY_MESSAGE")("")("value")

			assertEquals(result, {
				_tag: "error",
				code: "EMPTY_MESSAGE",
				message: "",
				received: "value",
			})
		},
	)

	await t.step(
		"is properly curried",
		function properlyCurried() {
			const withCode = _createErrorConfig("CURRIED_ERROR")
			const withMessage = withCode("Curried test")
			const result = withMessage("test value")

			assertEquals(result, {
				_tag: "error",
				code: "CURRIED_ERROR",
				message: "Curried test",
				received: "test value",
			})
		},
	)

	await t.step(
		"allows partial application with code",
		function partialWithCode() {
			const invalidChildError = _createErrorConfig("INVALID_CHILD")

			const nullError = invalidChildError("Null child encountered")(null)
			const undefinedError = invalidChildError("Undefined child encountered")(
				undefined,
			)

			assertEquals(nullError.code, "INVALID_CHILD")
			assertEquals(nullError.received, null)
			assertEquals(undefinedError.code, "INVALID_CHILD")
			assertEquals(undefinedError.received, undefined)
		},
	)

	await t.step(
		"always has _tag of error",
		function alwaysHasErrorTag() {
			const result1 = _createErrorConfig("CODE1")("Message1")("value1")
			const result2 = _createErrorConfig("CODE2")("Message2")()
			const result3 = _createErrorConfig("CODE3")("Message3")(null)

			assertEquals(result1._tag, "error")
			assertEquals(result2._tag, "error")
			assertEquals(result3._tag, "error")
		},
	)
})

Deno.test("_createErrorConfig - property: always returns error config", function alwaysReturnsError() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.string(),
			fc.anything(),
			function propertyReturnsError(code, message, received) {
				const result = _createErrorConfig(code)(message)(received)
				assertEquals(result._tag, "error")
				assertEquals(result.code, code)
				assertEquals(result.message, message)
				assertEquals(result.received, received)
			},
		),
	)
})

Deno.test("_createErrorConfig - property: preserves code string", function preservesCode() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.string(),
			function propertyPreservesCode(code, message) {
				const result = _createErrorConfig(code)(message)()
				assertEquals(result.code, code)
			},
		),
	)
})

Deno.test("_createErrorConfig - property: preserves message string", function preservesMessage() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.string(),
			function propertyPreservesMessage(code, message) {
				const result = _createErrorConfig(code)(message)()
				assertEquals(result.message, message)
			},
		),
	)
})

Deno.test("_createErrorConfig - property: preserves received value", function preservesReceived() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.string(),
			fc.anything(),
			function propertyPreservesReceived(code, message, received) {
				const result = _createErrorConfig(code)(message)(received)
				assertEquals(result.received, received)
			},
		),
	)
})

Deno.test("_createErrorConfig - property: currying order matters", function curryingOrder() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.string(),
			fc.anything(),
			function propertyCurryingOrder(code, message, received) {
				// Applying all at once
				const result1 = _createErrorConfig(code)(message)(received)

				// Applying step by step
				const step1 = _createErrorConfig(code)
				const step2 = step1(message)
				const result2 = step2(received)

				assertEquals(result1, result2)
			},
		),
	)
})
