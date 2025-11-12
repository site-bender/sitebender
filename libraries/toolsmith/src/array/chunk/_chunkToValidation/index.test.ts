import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import success from "../../../monads/validation/success/index.ts"
import _chunkToValidation from "./index.ts"

Deno.test(
	"_chunkToValidation - success path",
	async function chunkToValidationSuccessTests(t) {
		await t.step("wraps chunked array in success", function wrapsInSuccess() {
			const result = _chunkToValidation<unknown, number>(2)([1, 2, 3, 4, 5, 6])
			assertEquals(
				result,
				success([
					[1, 2],
					[3, 4],
					[5, 6],
				]),
			)
		})

		await t.step(
			"returns success with empty array when input empty",
			function emptyInput() {
				const result = _chunkToValidation<unknown, number>(2)([])
				assertEquals(result, success([]))
			},
		)

		await t.step(
			"returns success with empty array for invalid size",
			function invalidSize() {
				const result = _chunkToValidation<unknown, number>(0)([1, 2, 3])
				assertEquals(result, success([]))
			},
		)

		await t.step("handles uneven chunks", function unevenChunks() {
			const result = _chunkToValidation<unknown, number>(3)([1, 2, 3, 4, 5])
			assertEquals(
				result,
				success([
					[1, 2, 3],
					[4, 5],
				]),
			)
		})

		await t.step("works with strings", function worksWithStrings() {
			const result = _chunkToValidation<unknown, string>(2)([
				"a",
				"b",
				"c",
				"d",
				"e",
			])
			assertEquals(
				result,
				success([
					["a", "b"],
					["c", "d"],
					["e"],
				]),
			)
		})
	},
)

Deno.test("_chunkToValidation - property: always returns success", function alwaysReturnsSuccess() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 20 }),
			fc.integer({ min: 1, max: 5 }),
			function alwaysSuccess(arr, size) {
				const result = _chunkToValidation<unknown, number>(size)(arr)
				assertEquals(result._tag, "Success")
			},
		),
	)
})

Deno.test("_chunkToValidation - property: success value matches plain result", function matchesPlain() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 20 }),
			fc.integer({ min: 1, max: 5 }),
			function successValueMatchesPlain(arr, size) {
				const result = _chunkToValidation<unknown, number>(size)(arr)
				if (result._tag === "Success") {
					const expectedCount = arr.length === 0
						? 0
						: Math.ceil(arr.length / size)
					assertEquals(result.value.length, expectedCount)
				}
			},
		),
	)
})
