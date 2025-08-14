import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import filter from "../../../array/filter/index.ts"
import compact from "../../../array/compact/index.ts"
import unique from "../../../array/unique/index.ts"
import remove from "../../../array/remove/index.ts"
import removeAll from "../../../array/removeAll/index.ts"
import removeAt from "../../../array/removeAt/index.ts"
import omit from "../../../array/omit/index.ts"

describe("Array Filtering Behaviors", () => {
	describe("when filtering with a predicate", () => {
		it("keeps elements that match predicate", () => {
			const isEven = (n: number) => n % 2 === 0
			const result = filter(isEven)([1, 2, 3, 4, 5, 6])
			expect(result).toEqual([2, 4, 6])
		})

		it("removes elements that don't match predicate", () => {
			const isPositive = (n: number) => n > 0
			const result = filter(isPositive)([-2, -1, 0, 1, 2])
			expect(result).toEqual([1, 2])
		})

		it("returns empty array when no elements match", () => {
			const isFalse = () => false
			const result = filter(isFalse)([1, 2, 3])
			expect(result).toEqual([])
		})

		it("returns all elements when all match", () => {
			const isTrue = () => true
			const result = filter(isTrue)([1, 2, 3])
			expect(result).toEqual([1, 2, 3])
		})

		it("handles empty arrays", () => {
			const predicate = (n: number) => n > 0
			const result = filter(predicate)([])
			expect(result).toEqual([])
		})

		it("preserves element order", () => {
			const isOdd = (n: number) => n % 2 === 1
			const result = filter(isOdd)([5, 4, 3, 2, 1])
			expect(result).toEqual([5, 3, 1])
		})

		it("works with complex types", () => {
			const users = [
				{ name: "Alice", age: 25 },
				{ name: "Bob", age: 17 },
				{ name: "Charlie", age: 30 },
			]
			const isAdult = (user: { age: number }) => user.age >= 18
			const result = filter(isAdult)(users)
			expect(result).toEqual([
				{ name: "Alice", age: 25 },
				{ name: "Charlie", age: 30 },
			])
		})
	})

	describe("when removing nullish values", () => {
		it("removes null and undefined values", () => {
			const result = compact([1, null, 2, undefined, 3])
			expect(result).toEqual([1, 2, 3])
		})

		it("preserves falsy non-nullish values", () => {
			const result = compact([0, false, "", null, undefined, NaN])
			expect(result).toEqual([0, false, "", NaN])
		})

		it("maintains element order", () => {
			const result = compact([null, 1, undefined, 2, null, 3])
			expect(result).toEqual([1, 2, 3])
		})

		it("returns empty array when all values are nullish", () => {
			const result = compact([null, undefined, null, undefined])
			expect(result).toEqual([])
		})

		it("handles empty arrays", () => {
			const result = compact([])
			expect(result).toEqual([])
		})

		it("handles arrays with no nullish values", () => {
			const result = compact([1, 2, 3, 4, 5])
			expect(result).toEqual([1, 2, 3, 4, 5])
		})

		it("works with different types", () => {
			expect(compact(["a", null, "b", undefined])).toEqual(["a", "b"])
			expect(compact([true, null, false, undefined])).toEqual([true, false])
			expect(compact([{ a: 1 }, null, { b: 2 }])).toEqual([
				{ a: 1 },
				{ b: 2 },
			])
		})
	})

	describe("when finding unique values", () => {
		it("removes duplicate primitives", () => {
			const result = unique([1, 2, 2, 3, 1, 4, 3])
			expect(result).toEqual([1, 2, 3, 4])
		})

		it("maintains first occurrence order", () => {
			const result = unique([3, 1, 2, 1, 3, 2])
			expect(result).toEqual([3, 1, 2])
		})

		it("handles empty arrays", () => {
			const result = unique([])
			expect(result).toEqual([])
		})

		it("works with mixed types", () => {
			const result = unique([1, "1", 1, "1", true, true])
			expect(result).toEqual([1, "1", true])
		})

		it("handles arrays with no duplicates", () => {
			const result = unique([1, 2, 3, 4, 5])
			expect(result).toEqual([1, 2, 3, 4, 5])
		})

		it("works with string arrays", () => {
			const result = unique(["a", "b", "a", "c", "b"])
			expect(result).toEqual(["a", "b", "c"])
		})

		it("handles null and undefined distinctly", () => {
			const result = unique([null, undefined, null, undefined, 1])
			expect(result).toEqual([null, undefined, 1])
		})

		it("handles NaN correctly", () => {
			const result = unique([NaN, NaN, 1, NaN])
			expect(result).toEqual([NaN, 1])
		})
	})

	describe("when removing specific elements", () => {
		it("removes first occurrence of element", () => {
			const result = remove(2)([1, 2, 3, 2, 4])
			expect(result).toEqual([1, 3, 2, 4])
		})

		it("handles element not in array", () => {
			const result = remove(5)([1, 2, 3, 4])
			expect(result).toEqual([1, 2, 3, 4])
		})

		it("removes all occurrences of element", () => {
			const result = removeAll(2)([1, 2, 3, 2, 4, 2])
			expect(result).toEqual([1, 3, 4])
		})

		it("removes element at specific index", () => {
			const result = removeAt(2)([1, 2, 3, 4, 5])
			expect(result).toEqual([1, 2, 4, 5])
		})

		it("handles negative indices for removeAt", () => {
			const result = removeAt(-2)([1, 2, 3, 4, 5])
			expect(result).toEqual([1, 2, 3, 5])
		})

		it("handles out-of-bounds index for removeAt", () => {
			const result = removeAt(10)([1, 2, 3])
			expect(result).toEqual([1, 2, 3])
		})

		it("does not mutate original array", () => {
			const original = [1, 2, 3, 4, 5]
			remove(3)(original)
			expect(original).toEqual([1, 2, 3, 4, 5])
		})
	})

	describe("when omitting multiple indices", () => {
		it("removes elements at specified indices", () => {
			const result = omit([0, 2, 4])(["a", "b", "c", "d", "e"])
			expect(result).toEqual(["b", "d"])
		})

		it("handles empty indices array", () => {
			const result = omit([])([1, 2, 3])
			expect(result).toEqual([1, 2, 3])
		})

		it("handles duplicate indices", () => {
			const result = omit([1, 1, 2])([1, 2, 3, 4])
			expect(result).toEqual([1, 4])
		})

		it("handles negative indices", () => {
			const result = omit([-1, -2])([1, 2, 3, 4, 5])
			expect(result).toEqual([1, 2, 3])
		})

		it("ignores out-of-bounds indices", () => {
			const result = omit([10, 20])([1, 2, 3])
			expect(result).toEqual([1, 2, 3])
		})

		it("handles mixed valid and invalid indices", () => {
			const result = omit([0, 10, 2, -10])([1, 2, 3, 4])
			expect(result).toEqual([2, 4])
		})
	})

	describe("property-based tests", () => {
		it("filter never increases array length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.func(fc.boolean()),
					(arr, predicate) => {
						const filtered = filter(predicate)(arr)
						expect(filtered.length).toBeLessThanOrEqual(arr.length)
					},
				),
			)
		})

		it("filter with always true is identity", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const filtered = filter(() => true)(arr)
					expect(filtered).toEqual(arr)
				}),
			)
		})

		it("filter with always false is empty", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const filtered = filter(() => false)(arr)
					expect(filtered).toEqual([])
				}),
			)
		})

		it("compact removes all nullish values", () => {
			fc.assert(
				fc.property(fc.array(fc.option(fc.anything())), (arr) => {
					const compacted = compact(arr)
					expect(compacted.every(x => x !== null && x !== undefined)).toBe(true)
				}),
			)
		})

		it("compact never increases length", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const compacted = compact(arr)
					expect(compacted.length).toBeLessThanOrEqual(arr.length)
				}),
			)
		})

		it("unique result has no duplicates", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const uniqueArr = unique(arr)
					const set = new Set(uniqueArr)
					expect(uniqueArr.length).toBe(set.size)
				}),
			)
		})

		it("unique is idempotent", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const once = unique(arr)
					const twice = unique(once)
					expect(twice).toEqual(once)
				}),
			)
		})

		it("remove reduces length by at most 1", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					(arr) => {
						const elem = arr[Math.floor(Math.random() * arr.length)]
						const removed = remove(elem)(arr)
						expect(removed.length).toBeGreaterThanOrEqual(arr.length - 1)
						expect(removed.length).toBeLessThanOrEqual(arr.length)
					},
				),
			)
		})

		it("removeAll removes all occurrences", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 10 })),
					fc.integer({ min: 0, max: 10 }),
					(arr, value) => {
						const removed = removeAll(value)(arr)
						expect(removed.includes(value)).toBe(false)
					},
				),
			)
		})

		it("removeAt with valid index reduces length by 1", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					(arr) => {
						const index = Math.floor(Math.random() * arr.length)
						const removed = removeAt(index)(arr)
						expect(removed.length).toBe(arr.length - 1)
					},
				),
			)
		})

		it("removeAt preserves order except at removed index", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 2 }),
					(arr) => {
						const index = Math.floor(Math.random() * arr.length)
						const removed = removeAt(index)(arr)
						
						for (let i = 0; i < index && i < removed.length; i++) {
							expect(removed[i]).toBe(arr[i])
						}
						for (let i = index; i < removed.length; i++) {
							expect(removed[i]).toBe(arr[i + 1])
						}
					},
				),
			)
		})

		it("omit with empty indices returns original array", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const result = omit([])(arr)
					expect(result).toEqual(arr)
				}),
			)
		})

		it("omit reduces length by number of valid indices", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					(arr) => {
						const indices = Array.from({ length: Math.min(3, arr.length) }, (_, i) => i)
						const omitted = omit(indices)(arr)
						expect(omitted.length).toBe(arr.length - indices.length)
					},
				),
			)
		})

		it("filter preserves relative order", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const isEven = (n: number) => n % 2 === 0
						const filtered = filter(isEven)(arr)
						
						// Check that relative order is preserved
						for (let i = 1; i < filtered.length; i++) {
							const prevIndex = arr.indexOf(filtered[i - 1])
							const currIndex = arr.indexOf(filtered[i])
							expect(prevIndex).toBeLessThan(currIndex)
						}
					},
				),
			)
		})

		it("compact of array without nullish equals original", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const compacted = compact(arr)
						expect(compacted).toEqual(arr)
					},
				),
			)
		})
	})
})