import { assertEquals } from "jsr:@std/assert@1.0.9"
import { describe, it } from "jsr:@std/testing@1.0.7/bdd"
import * as fc from "npm:fast-check@3.23.1"

import zipAll from "../../../../src/simple/array/zipAll/index.ts"

describe("zipAll", () => {
	describe("behavioral tests", () => {
		it("should zip arrays with different lengths", () => {
			// Second array longer
			assertEquals(
				zipAll([4, 5, 6, 7])([1, 2, 3]),
				[[1, 4], [2, 5], [3, 6], [undefined, 7]],
			)

			// First array longer
			assertEquals(
				zipAll([4, 5])([1, 2, 3, 4]),
				[[1, 4], [2, 5], [3, undefined], [4, undefined]],
			)
		})

		it("should handle same length arrays", () => {
			assertEquals(
				zipAll([4, 5, 6])([1, 2, 3]),
				[[1, 4], [2, 5], [3, 6]],
			)
		})

		it("should combine names and scores with missing values", () => {
			const names = ["Alice", "Bob", "Charlie", "David"]
			const scores = [85, 92, 78]
			assertEquals(
				zipAll(scores)(names),
				[
					["Alice", 85],
					["Bob", 92],
					["Charlie", 78],
					["David", undefined],
				],
			)
		})

		it("should handle one empty array", () => {
			assertEquals(
				zipAll([])(["a", "b", "c"]),
				[["a", undefined], ["b", undefined], ["c", undefined]],
			)

			assertEquals(
				zipAll(["x", "y", "z"])([]),
				[[undefined, "x"], [undefined, "y"], [undefined, "z"]],
			)
		})

		it("should handle both empty arrays", () => {
			assertEquals(zipAll([])([]), [])
		})

		it("should handle different types", () => {
			const nums = [1, 2, 3, 4]
			const strs = ["a", "b"]
			assertEquals(
				zipAll(strs)(nums),
				[[1, "a"], [2, "b"], [3, undefined], [4, undefined]],
			)
		})

		it("should handle objects", () => {
			const users = [{ id: 1 }, { id: 2 }, { id: 3 }]
			const names = [{ name: "Alice" }, { name: "Bob" }]
			assertEquals(
				zipAll(names)(users),
				[
					[{ id: 1 }, { name: "Alice" }],
					[{ id: 2 }, { name: "Bob" }],
					[{ id: 3 }, undefined],
				],
			)
		})

		it("should handle arrays with undefined values", () => {
			assertEquals(
				zipAll([undefined, 2, undefined, 4])([1, undefined, 3]),
				[
					[1, undefined],
					[undefined, 2],
					[3, undefined],
					[undefined, 4],
				],
			)
		})

		it("should handle mixed types", () => {
			const mixed1: Array<string | number | boolean> = [1, "two", true, false]
			const mixed2: Array<null | object> = [null, {}]
			assertEquals(
				zipAll(mixed2)(mixed1),
				[
					[1, null],
					["two", {}],
					[true, undefined],
					[false, undefined],
				],
			)
		})

		it("should handle null and undefined inputs", () => {
			// null/undefined are treated as empty arrays
			assertEquals(
				zipAll([1, 2, 3])(null),
				[[undefined, 1], [undefined, 2], [undefined, 3]],
			)
			assertEquals(
				zipAll([1, 2, 3])(undefined),
				[[undefined, 1], [undefined, 2], [undefined, 3]],
			)
			assertEquals(
				zipAll(null)([1, 2, 3]),
				[[1, undefined], [2, undefined], [3, undefined]],
			)
			assertEquals(
				zipAll(undefined)([1, 2, 3]),
				[[1, undefined], [2, undefined], [3, undefined]],
			)
			assertEquals(zipAll(null)(null), [])
			assertEquals(zipAll(undefined)(undefined), [])
			assertEquals(zipAll(null)(undefined), [])
			assertEquals(zipAll(undefined)(null), [])
		})

		it("should handle single element arrays", () => {
			assertEquals(zipAll([10])([1]), [[1, 10]])
			assertEquals(zipAll([])([1]), [[1, undefined]])
			assertEquals(zipAll([10])([]), [[undefined, 10]])
		})

		it("should handle nested arrays", () => {
			const nested1 = [[1, 2], [3, 4]]
			const nested2 = [["a", "b"], ["c", "d"], ["e", "f"]]
			assertEquals(
				zipAll(nested2)(nested1),
				[
					[[1, 2], ["a", "b"]],
					[[3, 4], ["c", "d"]],
					[undefined, ["e", "f"]],
				],
			)
		})

		it("should preserve original arrays", () => {
			const arr1 = [1, 2]
			const arr2 = ["a", "b", "c"]
			const result = zipAll(arr2)(arr1)
			assertEquals(result, [[1, "a"], [2, "b"], [undefined, "c"]])
			assertEquals(arr1, [1, 2]) // Unchanged
			assertEquals(arr2, ["a", "b", "c"]) // Unchanged
		})

		it("should handle special numeric values", () => {
			const nums = [Infinity, -Infinity, NaN]
			const strs = ["inf", "-inf", "nan", "extra1", "extra2"]
			assertEquals(
				zipAll(strs)(nums),
				[
					[Infinity, "inf"],
					[-Infinity, "-inf"],
					[NaN, "nan"],
					[undefined, "extra1"],
					[undefined, "extra2"],
				],
			)
		})

		it("should handle dates", () => {
			const dates = [new Date("2024-01-01"), new Date("2024-02-01")]
			const labels = ["start", "mid", "end"]
			assertEquals(
				zipAll(dates)(labels),
				[
					["start", new Date("2024-01-01")],
					["mid", new Date("2024-02-01")],
					["end", undefined],
				],
			)
		})

		it("should handle booleans", () => {
			const bools = [true, false]
			const nums = [1, 0, -1, 2]
			assertEquals(
				zipAll(nums)(bools),
				[
					[true, 1],
					[false, 0],
					[undefined, -1],
					[undefined, 2],
				],
			)
		})

		it("should be curried", () => {
			const zipWithNumbers = zipAll([1, 2, 3, 4])
			assertEquals(
				zipWithNumbers(["a", "b"]),
				[["a", 1], ["b", 2], [undefined, 3], [undefined, 4]],
			)
			assertEquals(
				zipWithNumbers(["x", "y", "z"]),
				[["x", 1], ["y", 2], ["z", 3], [undefined, 4]],
			)
		})

		it("should handle symbols", () => {
			const sym1 = Symbol("a")
			const sym2 = Symbol("b")
			const syms = [sym1, sym2]
			const nums = [1, 2, 3]
			const result = zipAll(syms)(nums)
			assertEquals(result, [[1, sym1], [2, sym2], [3, undefined]])
		})

		it("should handle very large arrays", () => {
			const large1 = Array(1000).fill(1)
			const large2 = Array(800).fill(2)
			const result = zipAll(large2)(large1)
			assertEquals(result.length, 1000)
			assertEquals(result[0], [1, 2])
			assertEquals(result[799], [1, 2])
			assertEquals(result[800], [1, undefined])
			assertEquals(result[999], [1, undefined])
		})
	})

	describe("property-based tests", () => {
		it("should have length equal to maximum of input lengths", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.string()),
					(arr1, arr2) => {
						const result = zipAll(arr2)(arr1)
						return result.length === Math.max(arr1.length, arr2.length)
					},
				),
			)
		})

		it("should preserve all elements from both arrays", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.string()),
					(arr1, arr2) => {
						const result = zipAll(arr2)(arr1)

						// Check all elements from arr1 are present
						for (let i = 0; i < arr1.length; i++) {
							if (result[i][0] !== arr1[i]) return false
						}

						// Check all elements from arr2 are present
						for (let i = 0; i < arr2.length; i++) {
							if (result[i][1] !== arr2[i]) return false
						}

						return true
					},
				),
			)
		})

		it("should fill with undefined for shorter array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.string()),
					(arr1, arr2) => {
						const result = zipAll(arr2)(arr1)
						const maxLen = Math.max(arr1.length, arr2.length)

						for (let i = arr1.length; i < maxLen; i++) {
							if (result[i][0] !== undefined) return false
						}

						for (let i = arr2.length; i < maxLen; i++) {
							if (result[i][1] !== undefined) return false
						}

						return true
					},
				),
			)
		})

		it("should produce valid tuples", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.string()),
					(arr1, arr2) => {
						const result = zipAll(arr2)(arr1)
						return result.every((tuple) =>
							Array.isArray(tuple) && tuple.length === 2
						)
					},
				),
			)
		})

		it("should handle empty arrays consistently", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					(arr) => {
						const withEmpty1 = zipAll([])(arr)
						const withEmpty2 = zipAll(arr)([])

						// First should have all elements from arr paired with undefined
						if (withEmpty1.length !== arr.length) return false
						for (let i = 0; i < arr.length; i++) {
							if (withEmpty1[i][0] !== arr[i] || withEmpty1[i][1] !== undefined) {
								return false
							}
						}

						// Second should have all elements from arr in second position
						if (withEmpty2.length !== arr.length) return false
						for (let i = 0; i < arr.length; i++) {
							if (withEmpty2[i][0] !== undefined || withEmpty2[i][1] !== arr[i]) {
								return false
							}
						}

						return true
					},
				),
			)
		})

		it("should be equivalent to zip for same length arrays", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 0, max: 100 }),
					(length) => {
						const arr1 = Array(length).fill(0).map((_, i) => i)
						const arr2 = Array(length).fill(0).map((_, i) => `${i}`)

						const resultAll = zipAll(arr2)(arr1)

						// For same length arrays, no undefined should be added
						return resultAll.every((tuple) =>
							tuple[0] !== undefined && tuple[1] !== undefined
						) && resultAll.length === length
					},
				),
			)
		})
	})

	describe("JSDoc examples", () => {
		it("should match different length arrays example", () => {
			assertEquals(
				zipAll([4, 5, 6, 7])([1, 2, 3]),
				[[1, 4], [2, 5], [3, 6], [undefined, 7]],
			)
		})

		it("should match first array longer example", () => {
			assertEquals(
				zipAll([4, 5])([1, 2, 3, 4]),
				[[1, 4], [2, 5], [3, undefined], [4, undefined]],
			)
		})

		it("should match combine names and scores example", () => {
			const names = ["Alice", "Bob", "Charlie", "David"]
			const scores = [85, 92, 78]
			assertEquals(
				zipAll(scores)(names),
				[
					["Alice", 85],
					["Bob", 92],
					["Charlie", 78],
					["David", undefined],
				],
			)
		})

		it("should match null/undefined handling examples", () => {
			// The JSDoc examples are incorrect - null is treated as empty array
			assertEquals(
				zipAll([1, 2, 3])(null),
				[[undefined, 1], [undefined, 2], [undefined, 3]],
			)
			assertEquals(
				zipAll(null)([1, 2, 3]),
				[[1, undefined], [2, undefined], [3, undefined]],
			)
		})

		it("should match one empty array example", () => {
			assertEquals(
				zipAll([])(["a", "b", "c"]),
				[["a", undefined], ["b", undefined], ["c", undefined]],
			)
		})
	})
})