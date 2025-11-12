import { assertEquals } from "jsr:@std/assert"
import * as fc from "npm:fast-check"
import _atArray from "./index.ts"

Deno.test(
	"_atArray - basic functionality",
	async function atArrayBasicTests(t) {
		await t.step("gets element at positive index", function getPositiveIndex() {
			const array = ["a", "b", "c", "d", "e"] as const
			const result = _atArray(2)(array)
			assertEquals(result, "c")
		})

		await t.step("gets element at index 0", function getIndexZero() {
			const array = ["first", "second", "third"] as const
			const result = _atArray(0)(array)
			assertEquals(result, "first")
		})

		await t.step("gets last element with index -1", function getNegativeOne() {
			const array = [1, 2, 3, 4, 5] as const
			const result = _atArray(-1)(array)
			assertEquals(result, 5)
		})

		await t.step(
			"gets second-to-last element with index -2",
			function getNegativeTwo() {
				const array = [10, 20, 30, 40] as const
				const result = _atArray(-2)(array)
				assertEquals(result, 30)
			},
		)

		await t.step(
			"returns undefined for out of bounds positive index",
			function outOfBoundsPositive() {
				const array = ["a", "b", "c"] as const
				const result = _atArray(10)(array)
				assertEquals(result, undefined)
			},
		)

		await t.step(
			"returns undefined for out of bounds negative index",
			function outOfBoundsNegative() {
				const array = ["a", "b", "c"] as const
				const result = _atArray(-10)(array)
				assertEquals(result, undefined)
			},
		)

		await t.step("handles empty array", function emptyArray() {
			const array: ReadonlyArray<string> = []
			const result = _atArray(0)(array)
			assertEquals(result, undefined)
		})

		await t.step("works with objects", function worksWithObjects() {
			const array = [{ id: 1 }, { id: 2 }, { id: 3 }] as const
			const result = _atArray(1)(array)
			assertEquals(result, { id: 2 })
		})
	},
)

Deno.test("_atArray - invalid inputs", async function atArrayInvalidTests(t) {
	await t.step(
		"returns undefined when index is not a number",
		function invalidIndex() {
			const array = ["a", "b", "c"] as const
			const result = _atArray("not a number" as unknown as number)(array)
			assertEquals(result, undefined)
		},
	)

	await t.step("returns undefined when index is NaN", function nanIndex() {
		const array = ["a", "b", "c"] as const
		const result = _atArray(NaN)(array)
		assertEquals(result, undefined)
	})

	await t.step(
		"returns input unchanged when array is not an array",
		function invalidArray() {
			const notArray = "not an array"
			const result = _atArray(0)(notArray as unknown as ReadonlyArray<string>)
			assertEquals(result, notArray)
		},
	)

	await t.step(
		"returns undefined when input is undefined",
		function undefinedInput() {
			const result = _atArray(0)(undefined as unknown as ReadonlyArray<string>)
			assertEquals(result, undefined)
		},
	)

	await t.step(
		"returns null unchanged when input is null",
		function nullInput() {
			const result = _atArray(0)(null as unknown as ReadonlyArray<string>)
			assertEquals(result, null)
		},
	)
})

Deno.test("_atArray - property: negative indices work correctly", function negativeIndexProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 100 }),
			fc.integer({ min: 1, max: 100 }),
			function negativeIndexMatchesPositive(arr, offset) {
				const negativeIndex = -offset
				const positiveIndex = arr.length - offset

				if (positiveIndex >= 0 && positiveIndex < arr.length) {
					const resultNegative = _atArray(negativeIndex)(arr)
					const resultPositive = _atArray(positiveIndex)(arr)
					assertEquals(resultNegative, resultPositive)
				}
			},
		),
	)
})

Deno.test("_atArray - property: out of bounds returns undefined", function outOfBoundsProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 0, maxLength: 100 }),
			fc.integer({ min: 1000, max: 10000 }),
			function largeBoundsReturnUndefined(arr, offset) {
				const result = _atArray(arr.length + offset)(arr)
				assertEquals(result, undefined)
			},
		),
	)
})

Deno.test("_atArray - property: valid index always returns element or undefined", function validIndexProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { minLength: 1, maxLength: 50 }),
			fc.nat(),
			function validIndexResult(arr, seed) {
				const index = seed % arr.length
				const result = _atArray(index)(arr)

				// Result should be the element at that index
				assertEquals(result, arr[index])
			},
		),
	)
})
