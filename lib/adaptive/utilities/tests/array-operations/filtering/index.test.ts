import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import fc from "fast-check"

// Import all filtering functions
import filter from "../../../array/filter/index.ts"
import omit from "../../../array/omit/index.ts"
import remove from "../../../array/remove/index.ts"
import removeAll from "../../../array/removeAll/index.ts"
import removeAt from "../../../array/removeAt/index.ts"
import unique from "../../../array/unique/index.ts"

describe("Array Filtering Operations", () => {
	describe("Behavioral Properties", () => {
		describe("filter", () => {
			it("returns empty array when filtering empty array", () => {
				expect(filter(() => true)([])).toEqual([])
				expect(filter(() => false)([])).toEqual([])
			})

			it("keeps elements that satisfy predicate", () => {
				const isEven = (n: number) => n % 2 === 0
				expect(filter(isEven)([1, 2, 3, 4, 5])).toEqual([2, 4])
				expect(filter(isEven)([1, 3, 5])).toEqual([])
				expect(filter(isEven)([2, 4, 6])).toEqual([2, 4, 6])
			})

			it("preserves order of kept elements", () => {
				const isPositive = (n: number) => n > 0
				expect(filter(isPositive)([-1, 2, -3, 4, -5, 6])).toEqual([2, 4, 6])
			})

			it("works with different types", () => {
				expect(filter((s: string) => s.length > 3)(["hi", "hello", "hey", "world"]))
					.toEqual(["hello", "world"])
				expect(filter((b: boolean) => b)([true, false, true, false]))
					.toEqual([true, true])
			})

			it("property: filter with always-true keeps all elements", () => {
				fc.assert(
					fc.property(fc.array(fc.anything()), (arr) => {
						expect(filter(() => true)(arr)).toEqual(arr)
					})
				)
			})

			it("property: filter with always-false returns empty array", () => {
				fc.assert(
					fc.property(fc.array(fc.anything()), (arr) => {
						expect(filter(() => false)(arr)).toEqual([])
					})
				)
			})

			it("property: filtered array length <= original length", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer()),
						(arr) => {
							const threshold = arr.length > 0 ? arr[Math.floor(arr.length / 2)] : 0
							const filtered = filter((n: number) => n > threshold)(arr)
							expect(filtered.length).toBeLessThanOrEqual(arr.length)
						}
					)
				)
			})

			it("property: idempotent - filtering twice gives same result", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer()),
						(arr) => {
							const predicate = (n: number) => n > 0
							const once = filter(predicate)(arr)
							const twice = filter(predicate)(once)
							expect(twice).toEqual(once)
						}
					)
				)
			})

			it("preserves original array", () => {
				const original = [1, 2, 3, 4, 5]
				const copy = [...original]
				filter((n: number) => n > 2)(original)
				expect(original).toEqual(copy)
			})
		})

		describe("omit", () => {
			it("returns original array when indices array is empty", () => {
				const arr = [1, 2, 3]
				expect(omit([])(arr)).toEqual(arr)
			})

			it("omits elements at specified indices", () => {
				expect(omit([0])([1, 2, 3])).toEqual([2, 3])
				expect(omit([1])([1, 2, 3])).toEqual([1, 3])
				expect(omit([2])([1, 2, 3])).toEqual([1, 2])
				expect(omit([0, 2])([1, 2, 3])).toEqual([2])
			})

			it("handles out-of-bounds indices gracefully", () => {
				expect(omit([5])([1, 2, 3])).toEqual([1, 2, 3])
				expect(omit([-1])([1, 2, 3])).toEqual([1, 2, 3])
				expect(omit([0, 10])([1, 2, 3])).toEqual([2, 3])
			})

			it("handles duplicate indices", () => {
				expect(omit([0, 0, 0])([1, 2, 3])).toEqual([2, 3])
				expect(omit([1, 1, 2])([1, 2, 3, 4])).toEqual([1, 4])
			})

			it("returns empty array when omitting all indices", () => {
				expect(omit([0, 1, 2])([1, 2, 3])).toEqual([])
			})

			it("property: omitting no indices returns original array", () => {
				fc.assert(
					fc.property(fc.array(fc.anything()), (arr) => {
						expect(omit([])(arr)).toEqual(arr)
					})
				)
			})

			it("property: result length = original length - valid indices count", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer()),
						(arr) => {
							if (arr.length === 0) return
							// Generate valid indices
							const numIndices = Math.floor(Math.random() * arr.length)
							const indices = Array.from({ length: numIndices }, (_, i) => i)
							const result = omit(indices)(arr)
							expect(result.length).toBe(arr.length - indices.length)
						}
					)
				)
			})

			it("preserves original array", () => {
				const original = [1, 2, 3, 4]
				const copy = [...original]
				omit([1, 3])(original)
				expect(original).toEqual(copy)
			})
		})

		describe("remove", () => {
			it("returns original array if item not found", () => {
				expect(remove(5)([1, 2, 3])).toEqual([1, 2, 3])
				expect(remove("x")(["a", "b", "c"])).toEqual(["a", "b", "c"])
			})

			it("removes first occurrence of item", () => {
				expect(remove(2)([1, 2, 3, 2, 4])).toEqual([1, 3, 2, 4])
				expect(remove("b")(["a", "b", "c", "b"])).toEqual(["a", "c", "b"])
			})

			it("uses strict equality", () => {
				expect(remove("2")([1, 2, 3] as any)).toEqual([1, 2, 3])
				expect(remove(2)(["1", "2", "3"] as any)).toEqual(["1", "2", "3"])
			})

			it("handles special values", () => {
				expect(remove(NaN)([1, NaN, 3])).toEqual([1, NaN, 3]) // NaN !== NaN
				expect(remove(null)([undefined, null, 0] as any)).toEqual([undefined, 0])
				expect(remove(undefined)([undefined, null, 0] as any)).toEqual([null, 0])
			})

			it("property: removing non-existent item returns same array", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer({ min: 0, max: 100 })),
						(arr) => {
							expect(remove(-1)(arr)).toEqual(arr)
						}
					)
				)
			})

			it("property: result length is original length or original length - 1", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer()),
						fc.integer(),
						(arr, item) => {
							const result = remove(item)(arr)
							const expectedLength = arr.includes(item) ? arr.length - 1 : arr.length
							expect(result.length).toBe(expectedLength)
						}
					)
				)
			})

			it("preserves original array", () => {
				const original = [1, 2, 3, 2, 4]
				const copy = [...original]
				remove(2)(original)
				expect(original).toEqual(copy)
			})
		})

		describe("removeAll", () => {
			it("returns original array if item not found", () => {
				expect(removeAll(5)([1, 2, 3])).toEqual([1, 2, 3])
			})

			it("removes all occurrences of item", () => {
				expect(removeAll(2)([1, 2, 3, 2, 4, 2])).toEqual([1, 3, 4])
				expect(removeAll("b")(["a", "b", "c", "b", "b"])).toEqual(["a", "c"])
			})

			it("returns empty array when removing from array of all same items", () => {
				expect(removeAll(1)([1, 1, 1, 1])).toEqual([])
			})

			it("uses strict equality", () => {
				expect(removeAll("2")([1, 2, 3] as any)).toEqual([1, 2, 3])
				expect(removeAll(0)([false, 0, "", null] as any)).toEqual([false, "", null])
			})

			it("property: removing non-existent item returns same array", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer({ min: 0, max: 100 })),
						(arr) => {
							expect(removeAll(-1)(arr)).toEqual(arr)
						}
					)
				)
			})

			it("property: no removed item remains in result", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer()),
						fc.integer(),
						(arr, item) => {
							const result = removeAll(item)(arr)
							expect(result.includes(item)).toBe(false)
						}
					)
				)
			})

			it("property: idempotent - removing again has no effect", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer()),
						fc.integer(),
						(arr, item) => {
							const once = removeAll(item)(arr)
							const twice = removeAll(item)(once)
							expect(twice).toEqual(once)
						}
					)
				)
			})

			it("preserves original array", () => {
				const original = [1, 2, 3, 2, 4, 2]
				const copy = [...original]
				removeAll(2)(original)
				expect(original).toEqual(copy)
			})
		})

		describe("removeAt", () => {
			it("returns original array for out-of-bounds indices", () => {
				expect(removeAt(5)([1, 2, 3])).toEqual([1, 2, 3])
				expect(removeAt(-5)([1, 2, 3])).toEqual([1, 2, 3]) // negative index beyond array start
			})
			
			it("handles negative indices", () => {
				expect(removeAt(-1)([1, 2, 3])).toEqual([1, 2]) // removes last
				expect(removeAt(-2)([1, 2, 3])).toEqual([1, 3]) // removes second to last
				expect(removeAt(-3)([1, 2, 3])).toEqual([2, 3]) // removes first
			})

			it("removes element at specified index", () => {
				expect(removeAt(0)([1, 2, 3])).toEqual([2, 3])
				expect(removeAt(1)([1, 2, 3])).toEqual([1, 3])
				expect(removeAt(2)([1, 2, 3])).toEqual([1, 2])
			})

			it("handles single element arrays", () => {
				expect(removeAt(0)([42])).toEqual([])
				expect(removeAt(1)([42])).toEqual([42])
			})

			it("handles empty arrays", () => {
				expect(removeAt(0)([])).toEqual([])
			})

			it("property: removing valid index reduces length by 1", () => {
				fc.assert(
					fc.property(
						fc.array(fc.anything(), { minLength: 1 }),
						(arr) => {
							const index = Math.floor(Math.random() * arr.length)
							const result = removeAt(index)(arr)
							expect(result.length).toBe(arr.length - 1)
						}
					)
				)
			})

			it("property: elements before and after index are preserved", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer(), { minLength: 3 }),
						(arr) => {
							const index = Math.floor(arr.length / 2)
							const result = removeAt(index)(arr)
							// Check elements before index
							for (let i = 0; i < index; i++) {
								expect(result[i]).toBe(arr[i])
							}
							// Check elements after index
							for (let i = index; i < result.length; i++) {
								expect(result[i]).toBe(arr[i + 1])
							}
						}
					)
				)
			})

			it("preserves original array", () => {
				const original = [1, 2, 3, 4, 5]
				const copy = [...original]
				removeAt(2)(original)
				expect(original).toEqual(copy)
			})
		})

		describe("unique", () => {
			it("returns empty array for empty input", () => {
				expect(unique([])).toEqual([])
			})

			it("removes duplicate values", () => {
				expect(unique([1, 2, 2, 3, 1, 4])).toEqual([1, 2, 3, 4])
				expect(unique(["a", "b", "a", "c", "b"])).toEqual(["a", "b", "c"])
			})

			it("preserves order of first occurrence", () => {
				expect(unique([3, 1, 2, 1, 3, 2])).toEqual([3, 1, 2])
			})

			it("handles arrays with no duplicates", () => {
				expect(unique([1, 2, 3, 4])).toEqual([1, 2, 3, 4])
			})

			it("handles arrays of all same values", () => {
				expect(unique([1, 1, 1, 1])).toEqual([1])
			})

			it("handles special values", () => {
				expect(unique([NaN, NaN, 0, -0])).toEqual([NaN, 0])
				expect(unique([null, undefined, null, undefined] as any))
					.toEqual([null, undefined])
			})

			it("uses reference equality for objects", () => {
				const obj1 = { id: 1 }
				const obj2 = { id: 1 }
				const obj3 = obj1
				expect(unique([obj1, obj2, obj3])).toEqual([obj1, obj2])
			})

			it("property: unique result has no duplicates", () => {
				fc.assert(
					fc.property(fc.array(fc.anything()), (arr) => {
						const result = unique(arr)
						const resultSet = new Set(result)
						expect(result.length).toBe(resultSet.size)
					})
				)
			})

			it("property: unique result length <= original length", () => {
				fc.assert(
					fc.property(fc.array(fc.anything()), (arr) => {
						expect(unique(arr).length).toBeLessThanOrEqual(arr.length)
					})
				)
			})

			it("property: idempotent - unique of unique is same", () => {
				fc.assert(
					fc.property(fc.array(fc.anything()), (arr) => {
						const once = unique(arr)
						const twice = unique(once)
						expect(twice).toEqual(once)
					})
				)
			})

			it("property: all original values present in result", () => {
				fc.assert(
					fc.property(fc.array(fc.integer()), (arr) => {
						const result = unique(arr)
						const originalSet = new Set(arr)
						const resultSet = new Set(result)
						originalSet.forEach(value => {
							expect(resultSet.has(value)).toBe(true)
						})
					})
				)
			})

			it("preserves original array", () => {
				const original = [1, 2, 2, 3, 1, 4]
				const copy = [...original]
				unique(original)
				expect(original).toEqual(copy)
			})
		})

		describe("Cross-function relationships", () => {
			it("remove and removeAll relationship", () => {
				const arr = [1, 2, 3, 2, 4, 2]
				const removeOnce = remove(2)(arr)
				expect(removeOnce).toEqual([1, 3, 2, 4, 2])
				
				const removeAllResult = removeAll(2)(arr)
				expect(removeAllResult).toEqual([1, 3, 4])
			})

			it("filter can simulate remove", () => {
				const arr = [1, 2, 3, 2, 4]
				const item = 2
				let found = false
				const filtered = filter((x: number) => {
					if (!found && x === item) {
						found = true
						return false
					}
					return true
				})(arr)
				expect(filtered).toEqual(remove(item)(arr))
			})

			it("filter can simulate removeAll", () => {
				const arr = [1, 2, 3, 2, 4, 2]
				const item = 2
				const filtered = filter((x: number) => x !== item)(arr)
				expect(filtered).toEqual(removeAll(item)(arr))
			})

			it("omit and removeAt relationship for single index", () => {
				const arr = [1, 2, 3, 4, 5]
				expect(omit([2])(arr)).toEqual(removeAt(2)(arr))
			})

			it("unique is idempotent like filter with deterministic predicate", () => {
				const arr = [1, 2, 2, 3, 1, 4]
				const once = unique(arr)
				const twice = unique(once)
				expect(twice).toEqual(once)
				
				// Similar with filter
				const predicate = (n: number) => n > 2
				const filterOnce = filter(predicate)(arr)
				const filterTwice = filter(predicate)(filterOnce)
				expect(filterTwice).toEqual(filterOnce)
			})
		})

		describe("Immutability", () => {
			it("all filtering functions preserve original array", () => {
				const original = [1, 2, 3, 2, 4, 2, 5]
				const copy = [...original]
				
				filter((n: number) => n > 2)(original)
				omit([1, 3])(original)
				remove(2)(original)
				removeAll(2)(original)
				removeAt(3)(original)
				unique(original)
				
				expect(original).toEqual(copy)
			})
		})

		describe("Edge cases", () => {
			it("handles very large arrays", () => {
				const largeArray = Array.from({ length: 10000 }, (_, i) => i % 100)
				
				const filtered = filter((n: number) => n < 10)(largeArray)
				expect(filtered.length).toBe(1000) // 10 values repeated 100 times
				
				const uniqueResult = unique(largeArray)
				expect(uniqueResult.length).toBe(100)
				
				const removed = removeAll(50)(largeArray)
				expect(removed.length).toBe(9900)
			})

			it("handles arrays with mixed types", () => {
				const mixed = [1, "2", true, null, undefined, 1, "2"] as any
				const uniqueMixed = unique(mixed)
				expect(uniqueMixed).toEqual([1, "2", true, null, undefined])
			})

			it("handles empty predicate results", () => {
				expect(filter((n: number) => n > 100)([1, 2, 3])).toEqual([])
				expect(removeAll(1)([1, 1, 1])).toEqual([])
				expect(omit([0, 1, 2])([1, 2, 3])).toEqual([])
			})
		})
	})
})