import { assertEquals, assertStrictEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import identity from "./index.ts"

Deno.test("identity", async function identityTests(t) {
	await t.step(
		"returns the same string",
		function returnsSameString() {
			const value = "hello"
			const result = identity(value)

			assertEquals(result, "hello")
		},
	)

	await t.step(
		"returns the same number",
		function returnsSameNumber() {
			const value = 42
			const result = identity(value)

			assertEquals(result, 42)
		},
	)

	await t.step(
		"returns the same boolean",
		function returnsSameBoolean() {
			const result1 = identity(true)
			const result2 = identity(false)

			assertEquals(result1, true)
			assertEquals(result2, false)
		},
	)

	await t.step(
		"returns the same null",
		function returnsSameNull() {
			const result = identity(null)

			assertEquals(result, null)
		},
	)

	await t.step(
		"returns the same undefined",
		function returnsSameUndefined() {
			const result = identity(undefined)

			assertEquals(result, undefined)
		},
	)

	await t.step(
		"returns the same object by reference",
		function returnsSameObject() {
			const obj = { key: "value" }
			const result = identity(obj)

			assertStrictEquals(result, obj)
		},
	)

	await t.step(
		"returns the same array by reference",
		function returnsSameArray() {
			const arr = [1, 2, 3]
			const result = identity(arr)

			assertStrictEquals(result, arr)
		},
	)

	await t.step(
		"returns the same function by reference",
		function returnsSameFunction() {
			function fn() {
				return 42
			}

			const result = identity(fn)

			assertStrictEquals(result, fn)
		},
	)

	await t.step(
		"returns zero",
		function returnsZero() {
			const result = identity(0)

			assertEquals(result, 0)
		},
	)

	await t.step(
		"returns empty string",
		function returnsEmptyString() {
			const result = identity("")

			assertEquals(result, "")
		},
	)

	await t.step(
		"returns NaN",
		function returnsNaN() {
			const result = identity(NaN)

			assertEquals(Number.isNaN(result), true)
		},
	)
})

Deno.test("identity - property: always returns input unchanged", function alwaysReturnsInput() {
	fc.assert(
		fc.property(
			fc.anything(),
			function propertyReturnsInput(value) {
				const result = identity(value)

				assertEquals(result, value)
			},
		),
	)
})

Deno.test("identity - property: strings unchanged", function stringsUnchanged() {
	fc.assert(
		fc.property(
			fc.string(),
			function propertyStringsUnchanged(str) {
				const result = identity(str)

				assertEquals(result, str)
			},
		),
	)
})

Deno.test("identity - property: numbers unchanged", function numbersUnchanged() {
	fc.assert(
		fc.property(
			fc.integer(),
			function propertyNumbersUnchanged(num) {
				const result = identity(num)

				assertEquals(result, num)
			},
		),
	)
})

Deno.test("identity - property: objects returned by reference", function objectsByReference() {
	fc.assert(
		fc.property(
			fc.object(),
			function propertyObjectsByReference(obj) {
				const result = identity(obj)

				assertStrictEquals(result, obj)
			},
		),
	)
})

Deno.test("identity - property: arrays returned by reference", function arraysByReference() {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			function propertyArraysByReference(arr) {
				const result = identity(arr)

				assertStrictEquals(result, arr)
			},
		),
	)
})

Deno.test("identity - property: idempotent (identity(identity(x)) === identity(x))", function isIdempotent() {
	fc.assert(
		fc.property(
			fc.anything(),
			function propertyIdempotent(value) {
				const result1 = identity(value)
				const result2 = identity(result1)

				assertEquals(result2, result1)
			},
		),
	)
})
