import { assertEquals } from "jsr:@std/assert@1.0.9"
import { describe, it } from "jsr:@std/testing@1.0.7/bdd"
import * as fc from "npm:fast-check@3.23.1"

import zip from "../../../../src/simple/array/zip/index.ts"

describe("zip", () => {
	describe("behavioral tests", () => {
		it("should zip two arrays of same length", () => {
			assertEquals(
				zip([4, 5, 6])([1, 2, 3]),
				[[1, 4], [2, 5], [3, 6]],
			)
		})

		it("should zip arrays of different types", () => {
			assertEquals(
				zip(["a", "b", "c"])([1, 2, 3]),
				[[1, "a"], [2, "b"], [3, "c"]],
			)
		})

		it("should handle different lengths (uses shorter)", () => {
			// First array longer
			assertEquals(
				zip([10, 20])([1, 2, 3, 4, 5]),
				[[1, 10], [2, 20]],
			)

			// Second array longer
			assertEquals(
				zip([10, 20, 30, 40])([1, 2]),
				[[1, 10], [2, 20]],
			)
		})

		it("should handle objects", () => {
			const names = [{ name: "Alice" }, { name: "Bob" }]
			const ages = [{ age: 30 }, { age: 25 }]
			assertEquals(
				zip(ages)(names),
				[
					[{ name: "Alice" }, { age: 30 }],
					[{ name: "Bob" }, { age: 25 }],
				],
			)
		})

		it("should handle mixed types", () => {
			const mixed1: Array<string | number | boolean> = [1, "two", true]
			const mixed2: Array<null | undefined | object> = [null, undefined, {}]
			assertEquals(
				zip(mixed2)(mixed1),
				[
					[1, null],
					["two", undefined],
					[true, {}],
				],
			)
		})

		it("should create key-value pairs", () => {
			const keys = ["name", "age", "city"]
			const values = ["Alice", 30, "NYC"] as const
			assertEquals(
				zip(values)(keys),
				[
					["name", "Alice"],
					["age", 30],
					["city", "NYC"],
				],
			)
		})

		it("should handle booleans", () => {
			const bools = [true, false, true]
			const nums = [1, 0, 1]
			assertEquals(
				zip(nums)(bools),
				[
					[true, 1],
					[false, 0],
					[true, 1],
				],
			)
		})

		it("should handle dates", () => {
			const dates = [new Date("2024-01-01"), new Date("2024-02-01")]
			const labels = ["start", "end"]
			assertEquals(
				zip(dates)(labels),
				[
					["start", new Date("2024-01-01")],
					["end", new Date("2024-02-01")],
				],
			)
		})

		it("should handle arrays with undefined values", () => {
			assertEquals(
				zip([undefined, 2, undefined])([1, undefined, 3]),
				[
					[1, undefined],
					[undefined, 2],
					[3, undefined],
				],
			)
		})

		it("should handle nested arrays", () => {
			const nested1 = [[1, 2], [3, 4]]
			const nested2 = [["a", "b"], ["c", "d"]]
			assertEquals(
				zip(nested2)(nested1),
				[
					[[1, 2], ["a", "b"]],
					[[3, 4], ["c", "d"]],
				],
			)
		})

		it("should handle single element arrays", () => {
			assertEquals(zip([10])([1]), [[1, 10]])
		})

		it("should handle empty arrays", () => {
			assertEquals(zip([])([1, 2, 3]), [])
			assertEquals(zip([1, 2, 3])([]), [])
			assertEquals(zip([])([]), [])
		})

		it("should handle null and undefined inputs", () => {
			assertEquals(zip([1, 2])(null), [])
			assertEquals(zip([1, 2])(undefined), [])
			assertEquals(zip(null)([1, 2]), [])
			assertEquals(zip(undefined)([1, 2]), [])
			assertEquals(zip(null)(null), [])
			assertEquals(zip(undefined)(undefined), [])
		})

		it("should handle non-array inputs", () => {
			assertEquals(zip([1, 2])("not an array" as any), [])
			assertEquals(zip("not an array" as any)([1, 2]), [])
			assertEquals(zip(123 as any)([1, 2]), [])
			assertEquals(zip([1, 2])(456 as any), [])
			assertEquals(zip({} as any)([1, 2]), [])
			assertEquals(zip([1, 2])({} as any), [])
		})

		it("should preserve original arrays", () => {
			const arr1 = [1, 2, 3]
			const arr2 = ["a", "b", "c"]
			const result = zip(arr2)(arr1)
			assertEquals(result, [[1, "a"], [2, "b"], [3, "c"]])
			assertEquals(arr1, [1, 2, 3]) // Unchanged
			assertEquals(arr2, ["a", "b", "c"]) // Unchanged
		})

		it("should handle special numeric values", () => {
			const nums = [Infinity, -Infinity, NaN, 0, -0]
			const strs = ["inf", "-inf", "nan", "zero", "-zero"]
			assertEquals(
				zip(strs)(nums),
				[
					[Infinity, "inf"],
					[-Infinity, "-inf"],
					[NaN, "nan"],
					[0, "zero"],
					[-0, "-zero"],
				],
			)
		})

		it("should handle very large arrays", () => {
			const large1 = Array(1000).fill(1)
			const large2 = Array(1000).fill(2)
			const result = zip(large2)(large1)
			assertEquals(result.length, 1000)
			assertEquals(result[0], [1, 2])
			assertEquals(result[999], [1, 2])
		})

		it("should be curried", () => {
			const zipWithLetters = zip(["a", "b", "c"])
			assertEquals(zipWithLetters([1, 2, 3]), [[1, "a"], [2, "b"], [3, "c"]])
			assertEquals(zipWithLetters([4, 5]), [[4, "a"], [5, "b"]])
		})

		it("should handle symbols", () => {
			const sym1 = Symbol("a")
			const sym2 = Symbol("b")
			const syms = [sym1, sym2]
			const nums = [1, 2]
			const result = zip(syms)(nums)
			assertEquals(result, [[1, sym1], [2, sym2]])
		})
	})

	describe("property-based tests", () => {
		it("should have length equal to minimum of input lengths", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.string()),
					(arr1, arr2) => {
						const result = zip(arr2)(arr1)
						return result.length === Math.min(arr1.length, arr2.length)
					},
				),
			)
		})

		it("should preserve element order", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.string()),
					(arr1, arr2) => {
						const result = zip(arr2)(arr1)
						for (let i = 0; i < result.length; i++) {
							if (result[i][0] !== arr1[i] || result[i][1] !== arr2[i]) {
								return false
							}
						}
						return true
					},
				),
			)
		})

		it("should be reversible with unzip", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.string()),
					(arr1, arr2) => {
						const zipped = zip(arr2)(arr1)
						if (zipped.length === 0) return true

						const unzipped1: any[] = []
						const unzipped2: any[] = []
						for (const [a, b] of zipped) {
							unzipped1.push(a)
							unzipped2.push(b)
						}

						const minLen = Math.min(arr1.length, arr2.length)
						return JSON.stringify(unzipped1) ===
								JSON.stringify(arr1.slice(0, minLen)) &&
							JSON.stringify(unzipped2) ===
								JSON.stringify(arr2.slice(0, minLen))
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
						const result = zip(arr2)(arr1)
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
						const withEmpty1 = zip([])(arr)
						const withEmpty2 = zip(arr)([])
						return withEmpty1.length === 0 && withEmpty2.length === 0
					},
				),
			)
		})

		it("should be commutative in structure", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 100 })),
					fc.array(fc.string()),
					(arr1, arr2) => {
						const result1 = zip(arr2)(arr1) // [[arr1[0], arr2[0]], ...]
						const result2 = zip(arr1)(arr2) // [[arr2[0], arr1[0]], ...]

						if (result1.length !== result2.length) return false

						// Check that swapping produces the reverse pairs
						for (let i = 0; i < result1.length; i++) {
							if (
								result1[i][0] !== result2[i][1] ||
								result1[i][1] !== result2[i][0]
							) {
								return false
							}
						}
						return true
					},
				),
			)
		})
	})

	describe("JSDoc examples", () => {
		it("should match basic zip example", () => {
			assertEquals(
				zip([4, 5, 6])([1, 2, 3]),
				[[1, 4], [2, 5], [3, 6]],
			)
		})

		it("should match different types example", () => {
			assertEquals(
				zip(["a", "b", "c"])([1, 2, 3]),
				[[1, "a"], [2, "b"], [3, "c"]],
			)
		})

		it("should match different lengths example", () => {
			assertEquals(
				zip([10, 20])([1, 2, 3, 4, 5]),
				[[1, 10], [2, 20]],
			)
		})

		it("should match key-value pairs example", () => {
			const keys = ["name", "age", "city"]
			const values = ["Alice", 30, "NYC"] as const
			assertEquals(
				zip(values)(keys),
				[["name", "Alice"], ["age", 30], ["city", "NYC"]],
			)
		})

		it("should match null/undefined handling examples", () => {
			assertEquals(zip([1, 2])(null), [])
			assertEquals(zip(null)([1, 2]), [])
		})
	})
})
