import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isNotNullish from "./index.ts"

Deno.test("isNotNullish", async function isNotNullishTests(t) {
	await t.step(
		"returns false for null",
		function returnsFalseForNull() {
			const result = isNotNullish(null)

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns false for undefined",
		function returnsFalseForUndefined() {
			const result = isNotNullish(undefined)

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns true for string",
		function returnsTrueForString() {
			const result = isNotNullish("hello")

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true for empty string",
		function returnsTrueForEmptyString() {
			const result = isNotNullish("")

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true for number",
		function returnsTrueForNumber() {
			const result = isNotNullish(42)

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true for zero",
		function returnsTrueForZero() {
			const result = isNotNullish(0)

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true for boolean",
		function returnsTrueForBoolean() {
			const result1 = isNotNullish(true)
			const result2 = isNotNullish(false)

			assertEquals(result1, true)
			assertEquals(result2, true)
		},
	)

	await t.step(
		"returns true for object",
		function returnsTrueForObject() {
			const result = isNotNullish({ key: "value" })

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true for array",
		function returnsTrueForArray() {
			const result = isNotNullish([1, 2, 3])

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true for empty array",
		function returnsTrueForEmptyArray() {
			const result = isNotNullish([])

			assertEquals(result, true)
		},
	)

	await t.step(
		"narrows type correctly",
		function narrowsType() {
			const value: string | null | undefined = "hello"

			if (isNotNullish(value)) {
				const narrowed: string = value
				assertEquals(narrowed, "hello")
			}
		},
	)
})

Deno.test("isNotNullish - property: null always returns false", function nullReturnsFalse() {
	fc.assert(
		fc.property(
			fc.constant(null),
			function propertyNullFalse(value) {
				const result = isNotNullish(value)

				assertEquals(result, false)
			},
		),
	)
})

Deno.test("isNotNullish - property: undefined always returns false", function undefinedReturnsFalse() {
	fc.assert(
		fc.property(
			fc.constant(undefined),
			function propertyUndefinedFalse(value) {
				const result = isNotNullish(value)

				assertEquals(result, false)
			},
		),
	)
})

Deno.test("isNotNullish - property: non-nullish values return true", function nonNullishReturnsTrue() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.string(),
				fc.integer(),
				fc.boolean(),
				fc.object(),
			),
			function propertyNonNullishTrue(value) {
				const result = isNotNullish(value)

				assertEquals(result, true)
			},
		),
	)
})

Deno.test("isNotNullish - property: always returns boolean", function alwaysReturnsBoolean() {
	fc.assert(
		fc.property(
			fc.anything(),
			function propertyReturnsBoolean(value) {
				const result = isNotNullish(value)

				assertEquals(typeof result, "boolean")
			},
		),
	)
})
