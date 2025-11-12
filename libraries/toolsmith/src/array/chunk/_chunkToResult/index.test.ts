import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import ok from "../../../monads/result/ok/index.ts"
import _chunkToResult from "./index.ts"

Deno.test(
	"_chunkToResult - ok path",
	async function chunkToResultOkTests(t) {
		await t.step("wraps chunked array in ok", function wrapsInOk() {
			const result = _chunkToResult<unknown, number>(2)([1, 2, 3, 4, 5, 6])
			assertEquals(
				result,
				ok([
					[1, 2],
					[3, 4],
					[5, 6],
				]),
			)
		})

		await t.step(
			"returns ok with empty array when input empty",
			function emptyInput() {
				const result = _chunkToResult<unknown, number>(2)([])
				assertEquals(result, ok([]))
			},
		)

		await t.step(
			"returns ok with empty array for invalid size",
			function invalidSize() {
				const result = _chunkToResult<unknown, number>(0)([1, 2, 3])
				assertEquals(result, ok([]))
			},
		)

		await t.step("handles uneven chunks", function unevenChunks() {
			const result = _chunkToResult<unknown, number>(3)([1, 2, 3, 4, 5])
			assertEquals(
				result,
				ok([
					[1, 2, 3],
					[4, 5],
				]),
			)
		})

		await t.step("works with strings", function worksWithStrings() {
			const result = _chunkToResult<unknown, string>(2)([
				"a",
				"b",
				"c",
				"d",
				"e",
			])
			assertEquals(
				result,
				ok([
					["a", "b"],
					["c", "d"],
					["e"],
				]),
			)
		})
	},
)

Deno.test("_chunkToResult - property: always returns ok", function alwaysReturnsOk() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 20 }),
			fc.integer({ min: 1, max: 5 }),
			function alwaysOk(arr, size) {
				const result = _chunkToResult<unknown, number>(size)(arr)
				assertEquals(result._tag, "Ok")
			},
		),
	)
})

Deno.test("_chunkToResult - property: ok value matches plain result", function matchesPlain() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 20 }),
			fc.integer({ min: 1, max: 5 }),
			function okValueMatchesPlain(arr, size) {
				const result = _chunkToResult<unknown, number>(size)(arr)
				if (result._tag === "Ok") {
					const expectedCount = arr.length === 0
						? 0
						: Math.ceil(arr.length / size)
					assertEquals(result.value.length, expectedCount)
				}
			},
		),
	)
})
