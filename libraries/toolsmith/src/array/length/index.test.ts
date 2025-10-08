import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import length from "./index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"

Deno.test("length", async function (t) {
	await t.step("returns Ok(0) for empty array", function () {
		const result = length([])

		assertEquals(isOk(result), true)
		if (isOk(result)) {
			assertEquals(result.value, 0)
		}
	})

	await t.step("returns Ok(3) for array with 3 elements", function () {
		const result = length([1, 2, 3])

		assertEquals(isOk(result), true)
		if (isOk(result)) {
			assertEquals(result.value, 3)
		}
	})

	await t.step("returns Ok(5) for string array with 5 elements", function () {
		const result = length(["a", "b", "c", "d", "e"])

		assertEquals(isOk(result), true)
		if (isOk(result)) {
			assertEquals(result.value, 5)
		}
	})

	await t.step("returns Ok(1) for single element array", function () {
		const result = length([42])

		assertEquals(isOk(result), true)
		if (isOk(result)) {
			assertEquals(result.value, 1)
		}
	})

	await t.step("returns Error when input is not an array", function () {
		const result = length("not an array" as unknown as ReadonlyArray<unknown>)

		assertEquals(isError(result), true)
		if (isError(result)) {
			assertEquals(result.error.code, "LENGTH_INVALID_INPUT")
			assertEquals(result.error.field, "array")
			assertEquals(result.error.severity, "requirement")
		}
	})

	await t.step("returns Error when input is null", function () {
		const result = length(null as unknown as ReadonlyArray<unknown>)

		assertEquals(isError(result), true)
	})

	await t.step("returns Error when input is undefined", function () {
		const result = length(undefined as unknown as ReadonlyArray<unknown>)

		assertEquals(isError(result), true)
	})

	await t.step("returns Error when input is a number", function () {
		const result = length(123 as unknown as ReadonlyArray<unknown>)

		assertEquals(isError(result), true)
	})

	await t.step("returns Error when input is an object", function () {
		const result = length({ length: 5 } as unknown as ReadonlyArray<unknown>)

		assertEquals(isError(result), true)
	})

	await t.step("property: array length matches returned value", function () {
		fc.assert(
			fc.property(fc.array(fc.anything()), function (arr) {
				const result = length(arr)
				assertEquals(isOk(result), true)
				if (isOk(result)) {
					assertEquals(result.value, arr.length)
				}
			}),
		)
	})

	await t.step(
		"property: valid array input always returns Ok result",
		function () {
			fc.assert(
				fc.property(fc.array(fc.integer()), function (arr) {
					const result = length(arr)
					assertEquals(isOk(result), true)
				}),
			)
		},
	)
})
