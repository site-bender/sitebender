import { assertEquals } from "jsr:@std/assert"
import * as fc from "npm:fast-check"
import _cartesianProductArray from "./index.ts"
import all from "../../all/index.ts"

Deno.test(
	"_cartesianProductArray - basic functionality",
	async function cartesianProductArrayBasicTests(t) {
		await t.step(
			"generates all pairs from two arrays",
			function generatesPairs() {
				const result = _cartesianProductArray([1, 2])(["a", "b"])
				assertEquals(result, [
					[1, "a"],
					[1, "b"],
					[2, "a"],
					[2, "b"],
				])
			},
		)

		await t.step(
			"generates single pair from single elements",
			function singlePair() {
				const result = _cartesianProductArray([1])(["a"])
				assertEquals(result, [[1, "a"]])
			},
		)

		await t.step(
			"returns empty array when first array is empty",
			function firstEmpty() {
				const result = _cartesianProductArray<number, string>([])(["a", "b"])
				assertEquals(result, [])
			},
		)

		await t.step(
			"returns empty array when second array is empty",
			function secondEmpty() {
				const result = _cartesianProductArray([1, 2])(
					[] as ReadonlyArray<string>,
				)
				assertEquals(result, [])
			},
		)

		await t.step(
			"returns empty array when both arrays empty",
			function bothEmpty() {
				const result = _cartesianProductArray<number, string>([])([])
				assertEquals(result, [])
			},
		)

		await t.step("preserves iteration order", function preservesOrder() {
			const result = _cartesianProductArray([1, 2, 3])(["a", "b"])
			assertEquals(result[0], [1, "a"])
			assertEquals(result[1], [1, "b"])
			assertEquals(result[2], [2, "a"])
			assertEquals(result[3], [2, "b"])
			assertEquals(result[4], [3, "a"])
			assertEquals(result[5], [3, "b"])
		})

		await t.step("works with different types", function differentTypes() {
			const result = _cartesianProductArray(["x", "y"])([1, 2, 3])
			assertEquals(result, [
				["x", 1],
				["x", 2],
				["x", 3],
				["y", 1],
				["y", 2],
				["y", 3],
			])
		})

		await t.step("works with objects", function worksWithObjects() {
			const result = _cartesianProductArray([{ id: 1 }, { id: 2 }])([
				{ name: "Alice" },
			])
			assertEquals(result, [
				[{ id: 1 }, { name: "Alice" }],
				[{ id: 2 }, { name: "Alice" }],
			])
		})
	},
)

Deno.test("_cartesianProductArray - property: count matches formula", function countProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 10 }),
			fc.array(fc.string(), { maxLength: 10 }),
			function countMatchesFormula(arr1, arr2) {
				const result = _cartesianProductArray(arr1)(arr2)
				const expected = arr1.length * arr2.length
				assertEquals(result.length, expected)
			},
		),
	)
})

Deno.test("_cartesianProductArray - property: all pairs are tuples", function tuplesProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 5 }),
			fc.array(fc.string(), { minLength: 1, maxLength: 5 }),
			function allPairsAreTuples(arr1, arr2) {
				const result = _cartesianProductArray(arr1)(arr2)

				assertEquals(
					all(function checkPairLength(
						pair: readonly [number, string],
					): boolean {
						return pair.length === 2
					})(result),
					true,
				)
			},
		),
	)
})

Deno.test("_cartesianProductArray - property: elements from source arrays", function elementsProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 5 }),
			fc.array(fc.string(), { minLength: 1, maxLength: 5 }),
			function elementsFromSource(arr1, arr2) {
				const result = _cartesianProductArray(arr1)(arr2)

				//++ Check all first elements are from arr1
				assertEquals(
					all(function checkFirstElement(
						pair: readonly [number, string],
					): boolean {
						return arr1.includes(pair[0])
					})(result),
					true,
				)

				//++ Check all second elements are from arr2
				assertEquals(
					all(function checkSecondElement(
						pair: readonly [number, string],
					): boolean {
						return arr2.includes(pair[1])
					})(result),
					true,
				)
			},
		),
	)
})
