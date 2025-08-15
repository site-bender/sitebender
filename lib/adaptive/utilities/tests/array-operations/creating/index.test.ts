import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import fc from "fast-check"

// Import all creating functions
import repeat from "../../../array/repeat/index.ts"
import repeatItem from "../../../array/repeatItem/index.ts"
import splitEvery from "../../../array/splitEvery/index.ts"

describe("Array Creating Operations", () => {
	describe("Behavioral Properties", () => {
		describe("repeat", () => {
			it("creates empty array for zero count", () => {
				expect(repeat(0)("x")).toEqual([])
				expect(repeat(0)(42)).toEqual([])
				expect(repeat(0)(null)).toEqual([])
			})

			it("creates empty array for negative count", () => {
				expect(repeat(-1)("x")).toEqual([])
				expect(repeat(-10)(42)).toEqual([])
				expect(repeat(-100)(true)).toEqual([])
			})

			it("repeats item specified number of times", () => {
				expect(repeat(1)("x")).toEqual(["x"])
				expect(repeat(3)("a")).toEqual(["a", "a", "a"])
				expect(repeat(5)(42)).toEqual([42, 42, 42, 42, 42])
			})

			it("handles different types", () => {
				expect(repeat(2)(true)).toEqual([true, true])
				expect(repeat(3)(null)).toEqual([null, null, null])
				expect(repeat(2)(undefined)).toEqual([undefined, undefined])
				const obj = { a: 1 }
				expect(repeat(2)(obj)).toEqual([obj, obj])
			})

			it("creates array with same reference for objects", () => {
				const obj = { value: 1 }
				const result = repeat(3)(obj)
				expect(result[0]).toBe(result[1])
				expect(result[1]).toBe(result[2])
				// Modifying one affects all
				result[0].value = 2
				expect(result[1].value).toBe(2)
				expect(result[2].value).toBe(2)
			})

			it("property: result length equals count for positive counts", () => {
				fc.assert(
					fc.property(
						fc.integer({ min: 0, max: 100 }),
						fc.anything(),
						(count, item) => {
							const result = repeat(count)(item)
							expect(result.length).toBe(count > 0 ? count : 0)
						}
					)
				)
			})

			it("property: all elements are identical", () => {
				fc.assert(
					fc.property(
						fc.integer({ min: 1, max: 100 }),
						fc.anything(),
						(count, item) => {
							const result = repeat(count)(item)
							for (const element of result) {
								expect(element).toBe(item)
							}
						}
					)
				)
			})

			it("property: repeat(n)(x) length is n or 0", () => {
				fc.assert(
					fc.property(
						fc.integer({ min: -10, max: 100 }),
						fc.string(),
						(n, x) => {
							const result = repeat(n)(x)
							if (n > 0) {
								expect(result.length).toBe(n)
							} else {
								expect(result.length).toBe(0)
							}
						}
					)
				)
			})
		})

		describe("repeatItem", () => {
			it("creates empty array for zero count", () => {
				expect(repeatItem("x")(0)).toEqual([])
				expect(repeatItem(42)(0)).toEqual([])
				expect(repeatItem(null)(0)).toEqual([])
			})

			it("creates empty array for negative count", () => {
				expect(repeatItem("x")(-1)).toEqual([])
				expect(repeatItem(42)(-10)).toEqual([])
				expect(repeatItem(true)(-100)).toEqual([])
			})

			it("repeats item specified number of times", () => {
				expect(repeatItem("x")(1)).toEqual(["x"])
				expect(repeatItem("a")(3)).toEqual(["a", "a", "a"])
				expect(repeatItem(42)(5)).toEqual([42, 42, 42, 42, 42])
			})

			it("handles different types", () => {
				expect(repeatItem(true)(2)).toEqual([true, true])
				expect(repeatItem(null)(3)).toEqual([null, null, null])
				expect(repeatItem(undefined)(2)).toEqual([undefined, undefined])
				const obj = { a: 1 }
				expect(repeatItem(obj)(2)).toEqual([obj, obj])
			})

			it("creates array with same reference for objects", () => {
				const obj = { value: 1 }
				const result = repeatItem(obj)(3)
				expect(result[0]).toBe(result[1])
				expect(result[1]).toBe(result[2])
				// Modifying one affects all
				result[0].value = 2
				expect(result[1].value).toBe(2)
				expect(result[2].value).toBe(2)
			})

			it("property: result length equals count for positive counts", () => {
				fc.assert(
					fc.property(
						fc.anything(),
						fc.integer({ min: 0, max: 100 }),
						(item, count) => {
							const result = repeatItem(item)(count)
							expect(result.length).toBe(count > 0 ? count : 0)
						}
					)
				)
			})

			it("property: all elements are identical", () => {
				fc.assert(
					fc.property(
						fc.anything(),
						fc.integer({ min: 1, max: 100 }),
						(item, count) => {
							const result = repeatItem(item)(count)
							for (const element of result) {
								expect(element).toBe(item)
							}
						}
					)
				)
			})

			it("property: repeatItem is inverse of repeat", () => {
				fc.assert(
					fc.property(
						fc.integer({ min: -10, max: 100 }),
						fc.anything(),
						(count, item) => {
							const repeatResult = repeat(count)(item)
							const repeatItemResult = repeatItem(item)(count)
							expect(repeatResult).toEqual(repeatItemResult)
						}
					)
				)
			})
		})

		describe("splitEvery", () => {
			it("returns empty array for empty input", () => {
				expect(splitEvery(2)([])).toEqual([])
				expect(splitEvery(5)([])).toEqual([])
				expect(splitEvery(1)([])).toEqual([])
			})

			it("returns empty array for zero or negative chunk size", () => {
				expect(splitEvery(0)([1, 2, 3])).toEqual([])
				expect(splitEvery(-1)([1, 2, 3])).toEqual([])
				expect(splitEvery(-10)(["a", "b", "c"])).toEqual([])
			})

			it("splits array into equal chunks", () => {
				expect(splitEvery(2)([1, 2, 3, 4])).toEqual([[1, 2], [3, 4]])
				expect(splitEvery(3)([1, 2, 3, 4, 5, 6])).toEqual([[1, 2, 3], [4, 5, 6]])
				expect(splitEvery(1)([1, 2, 3])).toEqual([[1], [2], [3]])
			})

			it("handles uneven splits with last chunk smaller", () => {
				expect(splitEvery(2)([1, 2, 3, 4, 5])).toEqual([[1, 2], [3, 4], [5]])
				expect(splitEvery(3)(["a", "b", "c", "d"])).toEqual([["a", "b", "c"], ["d"]])
				expect(splitEvery(4)([1, 2, 3, 4, 5, 6, 7])).toEqual([[1, 2, 3, 4], [5, 6, 7]])
			})

			it("returns single chunk when chunk size >= array length", () => {
				expect(splitEvery(10)([1, 2, 3])).toEqual([[1, 2, 3]])
				expect(splitEvery(5)([1, 2])).toEqual([[1, 2]])
				expect(splitEvery(100)(["a"])).toEqual([["a"]])
			})

			it("handles different types", () => {
				expect(splitEvery(2)([true, false, true, false]))
					.toEqual([[true, false], [true, false]])
				const objs = [{ a: 1 }, { b: 2 }, { c: 3 }]
				expect(splitEvery(2)(objs)).toEqual([[{ a: 1 }, { b: 2 }], [{ c: 3 }]])
			})

			it("property: all chunks except last have specified size", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer()),
						fc.integer({ min: 1, max: 10 }),
						(arr, chunkSize) => {
							if (arr.length === 0) return
							const result = splitEvery(chunkSize)(arr)
							// All chunks except possibly the last should have chunkSize elements
							for (let i = 0; i < result.length - 1; i++) {
								expect(result[i].length).toBe(chunkSize)
							}
							// Last chunk should have between 1 and chunkSize elements
							const lastChunk = result[result.length - 1]
							expect(lastChunk.length).toBeGreaterThanOrEqual(1)
							expect(lastChunk.length).toBeLessThanOrEqual(chunkSize)
						}
					)
				)
			})

			it("property: flattening recovers original array", () => {
				fc.assert(
					fc.property(
						fc.array(fc.anything()),
						fc.integer({ min: 1, max: 10 }),
						(arr, chunkSize) => {
							const chunks = splitEvery(chunkSize)(arr)
							const flattened = chunks.flat()
							expect(flattened).toEqual(arr)
						}
					)
				)
			})

			it("property: total elements preserved", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer()),
						fc.integer({ min: 1, max: 20 }),
						(arr, chunkSize) => {
							const chunks = splitEvery(chunkSize)(arr)
							const totalElements = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
							expect(totalElements).toBe(arr.length)
						}
					)
				)
			})

			it("property: number of chunks is ceil(length/chunkSize)", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer(), { minLength: 1 }),
						fc.integer({ min: 1, max: 20 }),
						(arr, chunkSize) => {
							const chunks = splitEvery(chunkSize)(arr)
							const expectedChunks = Math.ceil(arr.length / chunkSize)
							expect(chunks.length).toBe(expectedChunks)
						}
					)
				)
			})

			it("preserves element order within and across chunks", () => {
				const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
				const chunks = splitEvery(3)(arr)
				expect(chunks[0]).toEqual([1, 2, 3])
				expect(chunks[1]).toEqual([4, 5, 6])
				expect(chunks[2]).toEqual([7, 8, 9])
			})

			it("preserves original array", () => {
				const original = [1, 2, 3, 4, 5]
				const copy = [...original]
				splitEvery(2)(original)
				expect(original).toEqual(copy)
			})
		})

		describe("Cross-function relationships", () => {
			it("repeat and repeatItem are inverses", () => {
				expect(repeat(3)("x")).toEqual(repeatItem("x")(3))
				expect(repeat(5)(42)).toEqual(repeatItem(42)(5))
				expect(repeat(0)("y")).toEqual(repeatItem("y")(0))
				expect(repeat(-1)(null)).toEqual(repeatItem(null)(-1))
			})

			it("splitEvery(1) creates array of single-element arrays", () => {
				const arr = [1, 2, 3, 4]
				const singles = splitEvery(1)(arr)
				expect(singles).toEqual([[1], [2], [3], [4]])
				// Each element wrapped in its own array
				for (let i = 0; i < arr.length; i++) {
					expect(singles[i]).toEqual([arr[i]])
				}
			})

			it("splitEvery with length creates single chunk", () => {
				const arr = [1, 2, 3, 4, 5]
				expect(splitEvery(arr.length)(arr)).toEqual([arr])
				expect(splitEvery(arr.length + 10)(arr)).toEqual([arr])
			})

			it("repeat then splitEvery creates uniform chunks", () => {
				const repeated = repeat(6)("x")
				const chunks = splitEvery(2)(repeated)
				expect(chunks).toEqual([["x", "x"], ["x", "x"], ["x", "x"]])
				// All chunks identical
				for (const chunk of chunks) {
					expect(chunk).toEqual(["x", "x"])
				}
			})
		})

		describe("Immutability", () => {
			it("all creating functions produce new arrays", () => {
				const original = [1, 2, 3]
				const copy = [...original]
				
				repeat(3)(original[0])
				repeatItem(original[1])(2)
				splitEvery(2)(original)
				
				expect(original).toEqual(copy)
			})

			it("splitEvery creates new array structure", () => {
				const arr = [1, 2, 3, 4]
				const chunks = splitEvery(2)(arr)
				
				// Modifying chunks doesn't affect original
				chunks[0][0] = 99
				expect(arr[0]).toBe(1)
				
				// But note: chunks contain references to original elements if objects
				const objArr = [{ a: 1 }, { b: 2 }]
				const objChunks = splitEvery(1)(objArr)
				objChunks[0][0].a = 99
				expect(objArr[0].a).toBe(99) // Same object reference
			})
		})

		describe("Edge cases", () => {
			it("handles very large repeat counts", () => {
				const large = repeat(1000)("x")
				expect(large.length).toBe(1000)
				expect(large[0]).toBe("x")
				expect(large[999]).toBe("x")
				
				const largeItem = repeatItem("y")(1000)
				expect(largeItem.length).toBe(1000)
				expect(largeItem[0]).toBe("y")
				expect(largeItem[999]).toBe("y")
			})

			it("handles very large arrays for splitEvery", () => {
				const largeArray = Array.from({ length: 10000 }, (_, i) => i)
				const chunks = splitEvery(100)(largeArray)
				expect(chunks.length).toBe(100)
				expect(chunks[0].length).toBe(100)
				expect(chunks[99].length).toBe(100)
				expect(chunks[0][0]).toBe(0)
				expect(chunks[99][99]).toBe(9999)
			})

			it("handles undefined and null in repeat", () => {
				expect(repeat(3)(undefined)).toEqual([undefined, undefined, undefined])
				expect(repeat(2)(null)).toEqual([null, null])
				expect(repeatItem(undefined)(3)).toEqual([undefined, undefined, undefined])
				expect(repeatItem(null)(2)).toEqual([null, null])
			})

			it("splitEvery handles arrays with undefined and null", () => {
				const mixed: Array<number | null | undefined> = [1, null, undefined, 2, null]
				const chunks = splitEvery(2)(mixed)
				expect(chunks).toEqual([[1, null], [undefined, 2], [null]])
			})

			it("handles fractional counts (truncated to integer)", () => {
				// JavaScript will truncate when creating array
				const floatCount = 3.7
				const truncated = Math.floor(floatCount)
				expect(repeat(truncated)("x").length).toBe(3)
				expect(repeatItem("x")(truncated).length).toBe(3)
			})
		})

		describe("Type consistency", () => {
			it("repeat maintains type consistency", () => {
				const nums: Array<number> = repeat(3)(42)
				expect(nums).toEqual([42, 42, 42])
				
				const strs: Array<string> = repeat(2)("hello")
				expect(strs).toEqual(["hello", "hello"])
				
				const bools: Array<boolean> = repeat(4)(true)
				expect(bools).toEqual([true, true, true, true])
			})

			it("repeatItem maintains type consistency", () => {
				const nums: Array<number> = repeatItem(42)(3)
				expect(nums).toEqual([42, 42, 42])
				
				const strs: Array<string> = repeatItem("hello")(2)
				expect(strs).toEqual(["hello", "hello"])
				
				const bools: Array<boolean> = repeatItem(true)(4)
				expect(bools).toEqual([true, true, true, true])
			})

			it("splitEvery maintains type consistency", () => {
				const nums: Array<number> = [1, 2, 3, 4, 5, 6]
				const numChunks: Array<Array<number>> = splitEvery(2)(nums)
				expect(numChunks).toEqual([[1, 2], [3, 4], [5, 6]])
				
				const strs: Array<string> = ["a", "b", "c", "d"]
				const strChunks: Array<Array<string>> = splitEvery(3)(strs)
				expect(strChunks).toEqual([["a", "b", "c"], ["d"]])
			})
		})

		describe("Performance characteristics", () => {
			it("repeat and repeatItem create arrays with shared references", () => {
				const obj = { expensive: "object" }
				const repeated = repeat(1000)(obj)
				const repeatedItem = repeatItem(obj)(1000)
				
				// All references are the same object
				for (let i = 0; i < 1000; i++) {
					expect(repeated[i]).toBe(obj)
					expect(repeatedItem[i]).toBe(obj)
				}
			})

			it("splitEvery preserves original element references", () => {
				const obj1 = { id: 1 }
				const obj2 = { id: 2 }
				const obj3 = { id: 3 }
				const arr = [obj1, obj2, obj3]
				const chunks = splitEvery(2)(arr)
				
				expect(chunks[0][0]).toBe(obj1)
				expect(chunks[0][1]).toBe(obj2)
				expect(chunks[1][0]).toBe(obj3)
			})
		})
	})
})