import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import flatMap from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import isFailure from "../../monads/validation/isFailure/index.ts"

Deno.test("flatMap - plain array", async function flatMapArrayTests(t) {
	await t.step(
		"flattens and transforms each element",
		function flattensAndTransforms() {
			const duplicate = function (n: number): ReadonlyArray<number> {
				return [n, n]
			}
			const result = flatMap(duplicate)([1, 2, 3])

			assertEquals(result, [1, 1, 2, 2, 3, 3])
		},
	)

	await t.step(
		"handles type transformations",
		function handlesTypeTransformations() {
			const splitChars = function (s: string): ReadonlyArray<string> {
				return s.split("")
			}
			const result = flatMap(splitChars)(["ab", "cd"])

			assertEquals(result, ["a", "b", "c", "d"])
		},
	)

	await t.step(
		"handles empty arrays",
		function handlesEmptyArrays() {
			const duplicate = function (n: number): ReadonlyArray<number> {
				return [n, n]
			}
			const result = flatMap(duplicate)([])

			assertEquals(result, [])
		},
	)

	await t.step(
		"handles functions returning empty arrays",
		function handlesEmptyReturns() {
			const returnEmpty = function (_n: number): ReadonlyArray<number> {
				return []
			}
			const result = flatMap(returnEmpty)([1, 2, 3])

			assertEquals(result, [])
		},
	)

	await t.step(
		"handles variable length results",
		function handlesVariableLength() {
			const repeatByValue = function (n: number): ReadonlyArray<number> {
				return Array(n).fill(n)
			}
			const result = flatMap(repeatByValue)([1, 2, 3])

			assertEquals(result, [1, 2, 2, 3, 3, 3])
		},
	)

	await t.step(
		"preserves order",
		function preservesOrder() {
			const expand = function (n: number): ReadonlyArray<number> {
				return [n, n + 10]
			}
			const result = flatMap(expand)([1, 2, 3])

			assertEquals(result, [1, 11, 2, 12, 3, 13])
		},
	)
})

Deno.test("flatMap - Result monad", async function flatMapResultTests(t) {
	await t.step(
		"flatMaps over Ok and returns Ok",
		function flatMapsOverOk() {
			const duplicate = function (n: number): ReadonlyArray<number> {
				return [n, n]
			}
			const input = ok([1, 2, 3])
			const result = flatMap(duplicate)(input)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, [1, 1, 2, 2, 3, 3])
			}
		},
	)

	await t.step(
		"returns Ok with empty array from empty Ok",
		function returnsOkEmpty() {
			const duplicate = function (n: number): ReadonlyArray<number> {
				return [n, n]
			}
			const input = ok<ReadonlyArray<number>>([])
			const result = flatMap(duplicate)(input)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, [])
			}
		},
	)

	await t.step(
		"passes through Error unchanged",
		function passesErrorThrough() {
			const duplicate = function (n: number): ReadonlyArray<number> {
				return [n, n]
			}
			const input = error({
				code: "TEST_ERROR",
				field: "test",
				messages: ["test error"],
				received: null,
				expected: "array",
				suggestion: "test",
				severity: "requirement" as const,
			})
			const result = flatMap(duplicate)(input)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "TEST_ERROR")
			}
		},
	)
})

Deno.test(
	"flatMap - Validation monad",
	async function flatMapValidationTests(t) {
		await t.step(
			"flatMaps over Success and returns Success",
			function flatMapsOverSuccess() {
				const duplicate = function (n: number): ReadonlyArray<number> {
					return [n, n]
				}
				const input = success([1, 2, 3])
				const result = flatMap(duplicate)(input)

				assertEquals(isSuccess(result), true)
				if (isSuccess(result)) {
					assertEquals(result.value, [1, 1, 2, 2, 3, 3])
				}
			},
		)

		await t.step(
			"returns Success with empty array from empty Success",
			function returnsSuccessEmpty() {
				const duplicate = function (n: number): ReadonlyArray<number> {
					return [n, n]
				}
				const input = success<ReadonlyArray<number>>([])
				const result = flatMap(duplicate)(input)

				assertEquals(isSuccess(result), true)
				if (isSuccess(result)) {
					assertEquals(result.value, [])
				}
			},
		)

		await t.step(
			"passes through Failure unchanged",
			function passesFailureThrough() {
				const duplicate = function (n: number): ReadonlyArray<number> {
					return [n, n]
				}
				const input = failure([{
					code: "TEST_FAILURE",
					field: "test",
					messages: ["test failure"],
					received: null,
					expected: "array",
					suggestion: "test",
					severity: "requirement" as const,
				}])
				const result = flatMap(duplicate)(input)

				assertEquals(isFailure(result), true)
				if (isFailure(result)) {
					assertEquals(result.errors[0].code, "TEST_FAILURE")
				}
			},
		)
	},
)

Deno.test("flatMap - property tests", async function flatMapPropertyTests(t) {
	await t.step(
		"property: identity flatMap equals original array",
		function propertyIdentity() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function (arr) {
					const identity = function (x: number): ReadonlyArray<number> {
						return [x]
					}
					const result = flatMap(identity)(arr)
					assertEquals(result, arr)
				}),
			)
		},
	)

	await t.step(
		"property: flatMap doubles array length with duplicate",
		function propertyDoublesLength() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function (arr) {
					const duplicate = function (x: number): ReadonlyArray<number> {
						return [x, x]
					}
					const result = flatMap(duplicate)(arr)
					assertEquals((result as Array<number>).length, arr.length * 2)
				}),
			)
		},
	)

	await t.step(
		"property: Ok input always returns Ok",
		function propertyOkReturnsOk() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function (arr) {
					const duplicate = function (x: number): ReadonlyArray<number> {
						return [x, x]
					}
					const result = flatMap(duplicate)(ok(arr))
					assertEquals(isOk(result), true)
				}),
			)
		},
	)

	await t.step(
		"property: Success input always returns Success",
		function propertySuccessReturnsSuccess() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function (arr) {
					const duplicate = function (x: number): ReadonlyArray<number> {
						return [x, x]
					}
					const result = flatMap(duplicate)(success(arr))
					assertEquals(isSuccess(result), true)
				}),
			)
		},
	)
})
