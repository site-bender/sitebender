import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isNotNull from "./index.ts"

Deno.test("isNotNull", async function isNotNullTests(t) {
	await t.step(
		"returns false for null",
		function returnsFalseForNull() {
			const result = isNotNull(null)

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns true for undefined",
		function returnsTrueForUndefined() {
			const result = isNotNull(undefined)

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true for string",
		function returnsTrueForString() {
			const result = isNotNull("hello")

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true for empty string",
		function returnsTrueForEmptyString() {
			const result = isNotNull("")

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true for number",
		function returnsTrueForNumber() {
			const result = isNotNull(42)

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true for zero",
		function returnsTrueForZero() {
			const result = isNotNull(0)

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true for boolean",
		function returnsTrueForBoolean() {
			const result1 = isNotNull(true)
			const result2 = isNotNull(false)

			assertEquals(result1, true)
			assertEquals(result2, true)
		},
	)

	await t.step(
		"returns true for object",
		function returnsTrueForObject() {
			const result = isNotNull({ key: "value" })

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true for array",
		function returnsTrueForArray() {
			const result = isNotNull([1, 2, 3])

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true for empty array",
		function returnsTrueForEmptyArray() {
			const result = isNotNull([])

			assertEquals(result, true)
		},
	)

	await t.step(
		"narrows type correctly",
		function narrowsType() {
			const value: string | null = "hello"

			if (isNotNull(value)) {
				const narrowed: string = value
				assertEquals(narrowed, "hello")
			}
		},
	)
})

Deno.test("isNotNull - property: null always returns false", function nullReturnsFalse() {
	fc.assert(
		fc.property(
			fc.constant(null),
			function propertyNullFalse(value) {
				const result = isNotNull(value)

				assertEquals(result, false)
			},
		),
	)
})

Deno.test("isNotNull - property: non-null values return true", function nonNullReturnsTrue() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.string(),
				fc.integer(),
				fc.boolean(),
				fc.constant(undefined),
				fc.object(),
			),
			function propertyNonNullTrue(value) {
				const result = isNotNull(value)

				assertEquals(result, true)
			},
		),
	)
})

Deno.test("isNotNull - property: always returns boolean", function alwaysReturnsBoolean() {
	fc.assert(
		fc.property(
			fc.anything(),
			function propertyReturnsBoolean(value) {
				const result = isNotNull(value)

				assertEquals(typeof result, "boolean")
			},
		),
	)
})
