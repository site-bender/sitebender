import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import all from "./index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"

Deno.test("all", async function (t) {
	await t.step(
		"returns Ok(true) when all elements satisfy predicate",
		function () {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = all(isEven)([2, 4, 6, 8])

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, true)
			}
		},
	)

	await t.step(
		"returns Ok(false) when some elements don't satisfy predicate",
		function () {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = all(isEven)([2, 3, 4, 6])

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, false)
			}
		},
	)

	await t.step("returns Ok(true) for empty array", function () {
		function isPositive(n: number): boolean {
			return n > 0
		}

		const result = all(isPositive)([])

		assertEquals(isOk(result), true)
		if (isOk(result)) {
			assertEquals(result.value, true)
		}
	})

	await t.step("returns Error when input is not an array", function () {
		function isEven(n: number): boolean {
			return n % 2 === 0
		}

		const result = all(isEven)(
			"not an array" as unknown as ReadonlyArray<number>,
		)

		assertEquals(isError(result), true)
		if (isError(result)) {
			assertEquals(result.error.code, "ALL_INVALID_INPUT")
			assertEquals(result.error.field, "array")
			assertEquals(result.error.severity, "requirement")
		}
	})

	await t.step("returns Error when input is null", function () {
		function isEven(n: number): boolean {
			return n % 2 === 0
		}

		const result = all(isEven)(null as unknown as ReadonlyArray<number>)

		assertEquals(isError(result), true)
	})

	await t.step("returns Error when input is undefined", function () {
		function isEven(n: number): boolean {
			return n % 2 === 0
		}

		const result = all(isEven)(undefined as unknown as ReadonlyArray<number>)

		assertEquals(isError(result), true)
	})

	await t.step(
		"property: all elements satisfy predicate => returns Ok(true)",
		function () {
			fc.assert(
				fc.property(fc.array(fc.integer()), function (arr) {
					function alwaysTrue(): boolean {
						return true
					}

					const result = all(alwaysTrue)(arr)
					assertEquals(isOk(result), true)
					if (isOk(result)) {
						assertEquals(result.value, true)
					}
				}),
			)
		},
	)

	await t.step(
		"property: valid array input always returns Ok result",
		function () {
			fc.assert(
				fc.property(fc.array(fc.integer()), function (arr) {
					function isPositive(n: number): boolean {
						return n > 0
					}

					const result = all(isPositive)(arr)
					assertEquals(isOk(result), true)
				}),
			)
		},
	)
})
