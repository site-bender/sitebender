import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import includes from "./index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"

Deno.test("includes", async function (t) {
	await t.step("returns Ok(true) when item is in array", function () {
		const result = includes(3)([1, 2, 3, 4, 5])

		assertEquals(isOk(result), true)
		if (isOk(result)) {
			assertEquals(result.value, true)
		}
	})

	await t.step("returns Ok(false) when item is not in array", function () {
		const result = includes(6)([1, 2, 3, 4, 5])

		assertEquals(isOk(result), true)
		if (isOk(result)) {
			assertEquals(result.value, false)
		}
	})

	await t.step("returns Ok(true) when string is in array", function () {
		const result = includes("hello")(["hello", "world"])

		assertEquals(isOk(result), true)
		if (isOk(result)) {
			assertEquals(result.value, true)
		}
	})

	await t.step("returns Ok(false) for empty array", function () {
		const result = includes(1)([])

		assertEquals(isOk(result), true)
		if (isOk(result)) {
			assertEquals(result.value, false)
		}
	})

	await t.step("returns Ok(true) when null is in array", function () {
		const array: ReadonlyArray<number | null> = [1, null, 3]
		const result = includes<number | null>(null)(array)

		assertEquals(isOk(result), true)
		if (isOk(result)) {
			assertEquals(result.value, true)
		}
	})

	await t.step("returns Ok(true) when undefined is in array", function () {
		const array: ReadonlyArray<number | undefined> = [1, undefined, 3]
		const result = includes<number | undefined>(undefined)(array)

		assertEquals(isOk(result), true)
		if (isOk(result)) {
			assertEquals(result.value, true)
		}
	})

	await t.step("returns Error when input is not an array", function () {
		const result = includes(3)(
			"not an array" as unknown as ReadonlyArray<number>,
		)

		assertEquals(isError(result), true)
		if (isError(result)) {
			assertEquals(result.error.code, "INCLUDES_INVALID_INPUT")
			assertEquals(result.error.field, "array")
			assertEquals(result.error.severity, "requirement")
		}
	})

	await t.step("returns Error when input is null", function () {
		const result = includes(3)(null as unknown as ReadonlyArray<number>)

		assertEquals(isError(result), true)
	})

	await t.step("returns Error when input is undefined", function () {
		const result = includes(3)(undefined as unknown as ReadonlyArray<number>)

		assertEquals(isError(result), true)
	})

	await t.step("property: item in array => returns Ok(true)", function () {
		fc.assert(
			fc.property(fc.array(fc.integer()), fc.integer(), function (arr, item) {
				const arrayWithItem = [...arr, item]
				const result = includes(item)(arrayWithItem)
				assertEquals(isOk(result), true)
				if (isOk(result)) {
					assertEquals(result.value, true)
				}
			}),
		)
	})

	await t.step(
		"property: valid array input always returns Ok result",
		function () {
			fc.assert(
				fc.property(fc.array(fc.integer()), fc.integer(), function (arr, item) {
					const result = includes(item)(arr)
					assertEquals(isOk(result), true)
				}),
			)
		},
	)
})
