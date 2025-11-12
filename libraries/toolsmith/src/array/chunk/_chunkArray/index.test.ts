import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import _chunkArray from "./index.ts"

Deno.test(
	"_chunkArray - basic functionality",
	async function chunkArrayBasicTests(t) {
		await t.step(
			"chunks array into fixed-size subarrays",
			function chunksArray() {
				const result = _chunkArray(2)([1, 2, 3, 4, 5, 6])
				assertEquals(result, [
					[1, 2],
					[3, 4],
					[5, 6],
				])
			},
		)

		await t.step(
			"handles uneven chunks with remainder",
			function handlesRemainder() {
				const result = _chunkArray(3)([1, 2, 3, 4, 5])
				assertEquals(result, [
					[1, 2, 3],
					[4, 5],
				])
			},
		)

		await t.step("returns empty array for empty input", function emptyInput() {
			const result = _chunkArray<number>(2)([])
			assertEquals(result, [])
		})

		await t.step(
			"returns empty array for size zero",
			function sizeZero() {
				const result = _chunkArray(0)([1, 2, 3])
				assertEquals(result, [])
			},
		)

		await t.step(
			"returns empty array for negative size",
			function negativeSize() {
				const result = _chunkArray(-5)([1, 2, 3])
				assertEquals(result, [])
			},
		)

		await t.step(
			"returns empty array for non-integer size",
			function nonIntegerSize() {
				const result = _chunkArray(2.5)([1, 2, 3, 4, 5])
				assertEquals(result, [])
			},
		)

		await t.step(
			"returns single chunk when size larger than array",
			function sizeLargerThanArray() {
				const result = _chunkArray(10)([1, 2, 3])
				assertEquals(result, [[1, 2, 3]])
			},
		)

		await t.step(
			"chunks with size 1 creates singleton arrays",
			function sizeOne() {
				const result = _chunkArray(1)([1, 2, 3])
				assertEquals(result, [[1], [2], [3]])
			},
		)

		await t.step("works with strings", function worksWithStrings() {
			const result = _chunkArray(2)(["a", "b", "c", "d", "e"])
			assertEquals(result, [
				["a", "b"],
				["c", "d"],
				["e"],
			])
		})

		await t.step("works with objects", function worksWithObjects() {
			const result = _chunkArray(2)([{ id: 1 }, { id: 2 }, { id: 3 }])
			assertEquals(result, [
				[{ id: 1 }, { id: 2 }],
				[{ id: 3 }],
			])
		})
	},
)

Deno.test("_chunkArray - property: chunk count matches formula", function chunkCountProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 50 }),
			fc.integer({ min: 1, max: 10 }),
			function chunkCountMatchesFormula(arr, size) {
				const result = _chunkArray(size)(arr)
				const expectedCount = arr.length === 0
					? 0
					: Math.ceil(arr.length / size)
				assertEquals(result.length, expectedCount)
			},
		),
	)
})

Deno.test("_chunkArray - property: all chunks contain correct elements", function chunksContainCorrectElements() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 50 }),
			fc.integer({ min: 1, max: 10 }),
			function chunksHaveCorrectElements(arr, size) {
				const result = _chunkArray(size)(arr)

				//++ Flatten result using reduce
				const flattened = result.reduce<ReadonlyArray<number>>(
					function concatChunks(
						acc: ReadonlyArray<number>,
						chunk: ReadonlyArray<number>,
					): ReadonlyArray<number> {
						return [...acc, ...chunk]
					},
					[],
				)

				assertEquals(flattened, arr)
			},
		),
	)
})

Deno.test("_chunkArray - property: chunk sizes are correct", function chunkSizesProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 50 }),
			fc.integer({ min: 1, max: 10 }),
			function chunkSizesCorrect(arr, size) {
				const result = _chunkArray(size)(arr)

				//++ Check all chunks using reduce to iterate
				result.reduce<number>(
					function checkChunkSize(
						index: number,
						chunk: ReadonlyArray<number>,
					): number {
						if (index < result.length - 1) {
							//++ All chunks except last should be exactly size
							assertEquals(chunk.length, size)
						} else {
							//++ Last chunk should be <= size
							assertEquals(chunk.length <= size, true)
						}
						return index + 1
					},
					0,
				)
			},
		),
	)
})
