import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import fc from "fast-check"

// Import all slicing functions
import slice from "../../../array/slice/index.ts"
import sliceFrom from "../../../array/sliceFrom/index.ts"
import take from "../../../array/take/index.ts"
import takeLast from "../../../array/takeLast/index.ts"
import first from "../../../array/first/index.ts"
import last from "../../../array/last/index.ts"
import head from "../../../array/head/index.ts"
import tail from "../../../array/tail/index.ts"
import nth from "../../../array/nth/index.ts"
import isEmpty from "../../../array/isEmpty/index.ts"

describe("Array Slicing Operations", () => {
	describe("Behavioral Properties", () => {
		describe("slice", () => {
			it("returns empty array when slicing empty array", () => {
				expect(slice(0)(2)([])).toEqual([])
				expect(slice(1)()([])).toEqual([])
			})

			it("extracts portion of array", () => {
				expect(slice(1)(3)([1, 2, 3, 4, 5])).toEqual([2, 3])
				expect(slice(0)(2)(["a", "b", "c"])).toEqual(["a", "b"])
				expect(slice(2)(5)([1, 2, 3, 4, 5])).toEqual([3, 4, 5])
			})

			it("handles omitted end parameter", () => {
				expect(slice(2)()([1, 2, 3, 4, 5])).toEqual([3, 4, 5])
				expect(slice(0)()([1, 2, 3])).toEqual([1, 2, 3])
			})

			it("handles negative indices", () => {
				expect(slice(-2)()([1, 2, 3, 4, 5])).toEqual([4, 5])
				expect(slice(1)(-1)([1, 2, 3, 4, 5])).toEqual([2, 3, 4])
				expect(slice(-3)(-1)([1, 2, 3, 4, 5])).toEqual([3, 4])
			})

			it("handles out-of-bounds indices", () => {
				expect(slice(10)(20)([1, 2, 3])).toEqual([])
				expect(slice(0)(10)([1, 2, 3])).toEqual([1, 2, 3])
				expect(slice(-10)(2)([1, 2, 3])).toEqual([1, 2])
			})

			it("returns empty when start >= end", () => {
				expect(slice(3)(2)([1, 2, 3, 4, 5])).toEqual([])
				expect(slice(2)(2)([1, 2, 3])).toEqual([])
			})

			it("property: slice(0)() returns copy of array", () => {
				fc.assert(
					fc.property(fc.array(fc.anything()), (arr) => {
						const result = slice(0)()(arr)
						expect(result).toEqual(arr)
						expect(result).not.toBe(arr) // Different reference
					})
				)
			})

			it("property: slice preserves order", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer()),
						(arr) => {
							if (arr.length < 2) return
							const start = Math.floor(Math.random() * arr.length)
							const end = start + Math.floor(Math.random() * (arr.length - start))
							const result = slice(start)(end)(arr)
							for (let i = 0; i < result.length - 1; i++) {
								expect(arr.indexOf(result[i])).toBeLessThan(arr.indexOf(result[i + 1]))
							}
						}
					)
				)
			})

			it("preserves original array", () => {
				const original = [1, 2, 3, 4, 5]
				const copy = [...original]
				slice(1)(3)(original)
				expect(original).toEqual(copy)
			})
		})

		describe("sliceFrom", () => {
			it("returns empty array when slicing empty array", () => {
				expect(sliceFrom(0)(2)([])).toEqual([])
				expect(sliceFrom(5)(3)([])).toEqual([])
			})

			it("extracts specified number of elements from index", () => {
				expect(sliceFrom(1)(2)([1, 2, 3, 4, 5])).toEqual([2, 3])
				expect(sliceFrom(0)(3)(["a", "b", "c", "d"])).toEqual(["a", "b", "c"])
				expect(sliceFrom(2)(2)([1, 2, 3, 4, 5])).toEqual([3, 4])
			})

			it("handles length exceeding array bounds", () => {
				expect(sliceFrom(2)(10)([1, 2, 3, 4])).toEqual([3, 4])
				expect(sliceFrom(0)(100)([1, 2, 3])).toEqual([1, 2, 3])
			})

			it("handles negative start index", () => {
				expect(sliceFrom(-3)(2)([1, 2, 3, 4, 5])).toEqual([3, 4])
				expect(sliceFrom(-1)(1)([1, 2, 3])).toEqual([3])
			})

			it("returns empty for zero or negative length", () => {
				expect(sliceFrom(1)(0)([1, 2, 3])).toEqual([])
				expect(sliceFrom(0)(-1)([1, 2, 3])).toEqual([])
			})

			it("handles out-of-bounds start index", () => {
				expect(sliceFrom(10)(2)([1, 2, 3])).toEqual([])
				expect(sliceFrom(-10)(2)([1, 2, 3])).toEqual([1, 2])
			})

			it("property: sliceFrom result length <= specified length", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer()),
						fc.integer({ min: 0, max: 10 }),
						fc.integer({ min: 0, max: 10 }),
						(arr, start, len) => {
							const result = sliceFrom(start)(len)(arr)
							expect(result.length).toBeLessThanOrEqual(len)
						}
					)
				)
			})

			it("preserves original array", () => {
				const original = [1, 2, 3, 4, 5]
				const copy = [...original]
				sliceFrom(1)(3)(original)
				expect(original).toEqual(copy)
			})
		})

		describe("take", () => {
			it("returns empty array for empty input", () => {
				expect(take(3)([])).toEqual([])
				expect(take(0)([])).toEqual([])
			})

			it("takes first n elements", () => {
				expect(take(3)([1, 2, 3, 4, 5])).toEqual([1, 2, 3])
				expect(take(1)(["a", "b", "c"])).toEqual(["a"])
				expect(take(2)([1, 2])).toEqual([1, 2])
			})

			it("returns whole array when n exceeds length", () => {
				expect(take(10)([1, 2, 3])).toEqual([1, 2, 3])
				expect(take(100)(["a"])).toEqual(["a"])
			})

			it("returns empty array for zero or negative n", () => {
				expect(take(0)([1, 2, 3])).toEqual([])
				expect(take(-1)([1, 2, 3])).toEqual([])
				expect(take(-10)(["a", "b"])).toEqual([])
			})

			it("property: take result length <= n", () => {
				fc.assert(
					fc.property(
						fc.array(fc.anything()),
						fc.integer({ min: -10, max: 100 }),
						(arr, n) => {
							const result = take(n)(arr)
							if (n > 0) {
								expect(result.length).toBeLessThanOrEqual(n)
								expect(result.length).toBeLessThanOrEqual(arr.length)
							} else {
								expect(result.length).toBe(0)
							}
						}
					)
				)
			})

			it("property: idempotent when n >= length", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer()),
						(arr) => {
							const n = arr.length + 10
							const once = take(n)(arr)
							const twice = take(n)(once)
							expect(twice).toEqual(once)
						}
					)
				)
			})

			it("preserves original array", () => {
				const original = [1, 2, 3, 4, 5]
				const copy = [...original]
				take(3)(original)
				expect(original).toEqual(copy)
			})
		})

		describe("takeLast", () => {
			it("returns empty array for empty input", () => {
				expect(takeLast(3)([])).toEqual([])
				expect(takeLast(0)([])).toEqual([])
			})

			it("takes last n elements", () => {
				expect(takeLast(3)([1, 2, 3, 4, 5])).toEqual([3, 4, 5])
				expect(takeLast(1)(["a", "b", "c"])).toEqual(["c"])
				expect(takeLast(2)([1, 2])).toEqual([1, 2])
			})

			it("returns whole array when n exceeds length", () => {
				expect(takeLast(10)([1, 2, 3])).toEqual([1, 2, 3])
				expect(takeLast(100)(["a"])).toEqual(["a"])
			})

			it("returns empty array for zero or negative n", () => {
				expect(takeLast(0)([1, 2, 3])).toEqual([])
				expect(takeLast(-1)([1, 2, 3])).toEqual([])
				expect(takeLast(-10)(["a", "b"])).toEqual([])
			})

			it("property: takeLast result length <= n", () => {
				fc.assert(
					fc.property(
						fc.array(fc.anything()),
						fc.integer({ min: -10, max: 100 }),
						(arr, n) => {
							const result = takeLast(n)(arr)
							if (n > 0) {
								expect(result.length).toBeLessThanOrEqual(n)
								expect(result.length).toBeLessThanOrEqual(arr.length)
							} else {
								expect(result.length).toBe(0)
							}
						}
					)
				)
			})

			it("relationship with take", () => {
				const arr = [1, 2, 3, 4, 5]
				expect(takeLast(2)(arr)).toEqual([4, 5])
				expect(take(2)(arr.reverse()).reverse()).toEqual([4, 5])
			})

			it("preserves original array", () => {
				const original = [1, 2, 3, 4, 5]
				const copy = [...original]
				takeLast(3)(original)
				expect(original).toEqual(copy)
			})
		})

		describe("first", () => {
			it("returns undefined for empty array", () => {
				expect(first([])).toBeUndefined()
			})

			it("returns first element", () => {
				expect(first([1, 2, 3])).toBe(1)
				expect(first(["a", "b", "c"])).toBe("a")
				expect(first([42])).toBe(42)
			})

			it("handles different types", () => {
				expect(first([true, false])).toBe(true)
				expect(first([null, 1, 2])).toBe(null)
				expect(first([undefined, 1])).toBeUndefined()
			})

			it("property: first equals head", () => {
				fc.assert(
					fc.property(fc.array(fc.anything()), (arr) => {
						expect(first(arr)).toBe(head(arr))
					})
				)
			})

			it("property: idempotent on single element", () => {
				fc.assert(
					fc.property(fc.anything(), (value) => {
						const single = [value]
						expect(first(single)).toBe(value)
						expect(first([first(single)])).toBe(value)
					})
				)
			})

			it("preserves original array", () => {
				const original = [1, 2, 3]
				const copy = [...original]
				first(original)
				expect(original).toEqual(copy)
			})
		})

		describe("last", () => {
			it("returns undefined for empty array", () => {
				expect(last([])).toBeUndefined()
			})

			it("returns last element", () => {
				expect(last([1, 2, 3])).toBe(3)
				expect(last(["a", "b", "c"])).toBe("c")
				expect(last([42])).toBe(42)
			})

			it("handles different types", () => {
				expect(last([true, false])).toBe(false)
				expect(last([1, 2, null])).toBe(null)
				expect(last([1, undefined])).toBeUndefined()
			})

			it("property: last of single element equals first", () => {
				fc.assert(
					fc.property(fc.anything(), (value) => {
						const single = [value]
						expect(last(single)).toBe(first(single))
					})
				)
			})

			it("property: idempotent on single element", () => {
				fc.assert(
					fc.property(fc.anything(), (value) => {
						const single = [value]
						expect(last(single)).toBe(value)
						expect(last([last(single)])).toBe(value)
					})
				)
			})

			it("preserves original array", () => {
				const original = [1, 2, 3]
				const copy = [...original]
				last(original)
				expect(original).toEqual(copy)
			})
		})

		describe("head", () => {
			it("returns undefined for empty array", () => {
				expect(head([])).toBeUndefined()
			})

			it("returns first element (alias for first)", () => {
				expect(head([1, 2, 3])).toBe(1)
				expect(head(["a", "b", "c"])).toBe("a")
				expect(head([42])).toBe(42)
			})

			it("equals first function", () => {
				const arrays = [
					[1, 2, 3],
					["a", "b"],
					[true],
					[],
					[null, undefined]
				]
				arrays.forEach(arr => {
					expect(head(arr as any)).toBe(first(arr as any))
				})
			})

			it("preserves original array", () => {
				const original = [1, 2, 3]
				const copy = [...original]
				head(original)
				expect(original).toEqual(copy)
			})
		})

		describe("tail", () => {
			it("returns empty array for empty input", () => {
				expect(tail([])).toEqual([])
			})

			it("returns all elements except first", () => {
				expect(tail([1, 2, 3, 4])).toEqual([2, 3, 4])
				expect(tail(["a", "b", "c"])).toEqual(["b", "c"])
			})

			it("returns empty array for single element", () => {
				expect(tail([42])).toEqual([])
				expect(tail(["only"])).toEqual([])
			})

			it("property: head + tail reconstructs array", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer(), { minLength: 1 }),
						(arr) => {
							const h = head(arr)
							const t = tail(arr)
							expect([h, ...t]).toEqual(arr)
						}
					)
				)
			})

			it("property: idempotent on empty or single element", () => {
				expect(tail(tail([]))).toEqual([])
				expect(tail(tail([1]))).toEqual([])
				expect(tail(tail([1, 2]))).toEqual([])
			})

			it("property: tail length = original length - 1 (or 0)", () => {
				fc.assert(
					fc.property(fc.array(fc.anything()), (arr) => {
						const result = tail(arr)
						const expectedLength = Math.max(0, arr.length - 1)
						expect(result.length).toBe(expectedLength)
					})
				)
			})

			it("preserves original array", () => {
				const original = [1, 2, 3, 4]
				const copy = [...original]
				tail(original)
				expect(original).toEqual(copy)
			})
		})

		describe("nth", () => {
			it("returns undefined for empty array", () => {
				expect(nth(0)([])).toBeUndefined()
				expect(nth(5)([])).toBeUndefined()
			})

			it("returns element at index", () => {
				expect(nth(0)([1, 2, 3])).toBe(1)
				expect(nth(1)([1, 2, 3])).toBe(2)
				expect(nth(2)([1, 2, 3])).toBe(3)
			})

			it("returns undefined for out-of-bounds index", () => {
				expect(nth(5)([1, 2, 3])).toBeUndefined()
				expect(nth(-1)([1, 2, 3])).toBe(3) // -1 gets last element with array.at()
				expect(nth(3)([1, 2, 3])).toBeUndefined()
				expect(nth(-4)([1, 2, 3])).toBeUndefined() // beyond start
			})

			it("handles different types", () => {
				expect(nth(0)(["a", "b", "c"])).toBe("a")
				expect(nth(1)([true, false])).toBe(false)
				expect(nth(0)([null])).toBe(null)
			})

			it("relationship with first and last", () => {
				const arr = [1, 2, 3, 4, 5]
				expect(nth(0)(arr)).toBe(first(arr))
				expect(nth(arr.length - 1)(arr)).toBe(last(arr))
			})

			it("property: valid index returns correct element", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer(), { minLength: 1 }),
						(arr) => {
							const index = Math.floor(Math.random() * arr.length)
							expect(nth(index)(arr)).toBe(arr[index])
						}
					)
				)
			})

			it("property: out-of-bounds returns undefined", () => {
				fc.assert(
					fc.property(
						fc.array(fc.anything()),
						(arr) => {
							// Test indices beyond array bounds
							if (arr.length > 0) {
								expect(nth(arr.length)(arr)).toBeUndefined()
								expect(nth(arr.length + 10)(arr)).toBeUndefined()
								expect(nth(-arr.length - 1)(arr)).toBeUndefined()
							}
						}
					)
				)
			})

			it("preserves original array", () => {
				const original = [1, 2, 3]
				const copy = [...original]
				nth(1)(original)
				expect(original).toEqual(copy)
			})
		})

		describe("isEmpty", () => {
			it("returns true for empty array", () => {
				expect(isEmpty([])).toBe(true)
			})

			it("returns false for non-empty array", () => {
				expect(isEmpty([1])).toBe(false)
				expect(isEmpty([1, 2, 3])).toBe(false)
				expect(isEmpty(["a"])).toBe(false)
			})

			it("handles arrays with falsy values", () => {
				expect(isEmpty([false])).toBe(false)
				expect(isEmpty([null])).toBe(false)
				expect(isEmpty([undefined])).toBe(false)
				expect(isEmpty([0])).toBe(false)
				expect(isEmpty([""])).toBe(false)
			})

			it("property: isEmpty iff length is 0", () => {
				fc.assert(
					fc.property(fc.array(fc.anything()), (arr) => {
						expect(isEmpty(arr)).toBe(arr.length === 0)
					})
				)
			})

			it("property: isEmpty of tail depends on original length", () => {
				fc.assert(
					fc.property(fc.array(fc.anything()), (arr) => {
						const tailEmpty = isEmpty(tail(arr))
						expect(tailEmpty).toBe(arr.length <= 1)
					})
				)
			})

			it("preserves original array", () => {
				const original = [1, 2, 3]
				const copy = [...original]
				isEmpty(original)
				expect(original).toEqual(copy)
			})
		})

		describe("Cross-function relationships", () => {
			it("slice and sliceFrom equivalence", () => {
				const arr = [1, 2, 3, 4, 5]
				expect(sliceFrom(1)(3)(arr)).toEqual(slice(1)(4)(arr))
				expect(sliceFrom(0)(2)(arr)).toEqual(slice(0)(2)(arr))
			})

			it("take and slice equivalence", () => {
				const arr = [1, 2, 3, 4, 5]
				expect(take(3)(arr)).toEqual(slice(0)(3)(arr))
				expect(take(1)(arr)).toEqual(slice(0)(1)(arr))
			})

			it("takeLast and slice equivalence", () => {
				const arr = [1, 2, 3, 4, 5]
				expect(takeLast(2)(arr)).toEqual(slice(-2)()(arr))
				expect(takeLast(3)(arr)).toEqual(slice(-3)()(arr))
			})

			it("first, head, and nth(0) equivalence", () => {
				const arrays = [[1, 2, 3], ["a"], [], [null, undefined]]
				arrays.forEach(arr => {
					const f = first(arr as any)
					const h = head(arr as any)
					const n = nth(0)(arr as any)
					expect(f).toBe(h)
					expect(f).toBe(n)
				})
			})

			it("last and nth(length-1) equivalence", () => {
				const arr = [1, 2, 3, 4, 5]
				expect(last(arr)).toBe(nth(arr.length - 1)(arr))
			})

			it("tail and slice(1) equivalence", () => {
				const arrays = [[1, 2, 3], ["a", "b"], [42], []]
				arrays.forEach(arr => {
					expect(tail(arr as any)).toEqual(slice(1)()(arr as any))
				})
			})

			it("isEmpty relates to length-based operations", () => {
				expect(isEmpty(take(0)([1, 2, 3]))).toBe(true)
				expect(isEmpty(takeLast(0)([1, 2, 3]))).toBe(true)
				expect(isEmpty(slice(2)(2)([1, 2, 3]))).toBe(true)
				expect(isEmpty(tail([42]))).toBe(true)
			})
		})

		describe("Immutability", () => {
			it("all slicing functions preserve original array", () => {
				const original = [1, 2, 3, 4, 5]
				const copy = [...original]
				
				slice(1)(3)(original)
				sliceFrom(1)(2)(original)
				take(3)(original)
				takeLast(2)(original)
				first(original)
				last(original)
				head(original)
				tail(original)
				nth(2)(original)
				isEmpty(original)
				
				expect(original).toEqual(copy)
			})
		})

		describe("Edge cases", () => {
			it("handles very large arrays", () => {
				const largeArray = Array.from({ length: 10000 }, (_, i) => i)
				
				expect(take(5)(largeArray)).toEqual([0, 1, 2, 3, 4])
				expect(takeLast(3)(largeArray)).toEqual([9997, 9998, 9999])
				expect(first(largeArray)).toBe(0)
				expect(last(largeArray)).toBe(9999)
				expect(isEmpty(largeArray)).toBe(false)
			})

			it("handles arrays with undefined and null", () => {
				const arr = [undefined, null, 1, 2]
				expect(first(arr)).toBeUndefined()
				expect(last(arr)).toBe(2)
				expect(nth(1)(arr)).toBe(null)
				expect(tail(arr)).toEqual([null, 1, 2])
			})

			it("consistent behavior with boundary conditions", () => {
				const arr = [1, 2, 3]
				
				// Taking more than available
				expect(take(10)(arr)).toEqual(arr)
				expect(takeLast(10)(arr)).toEqual(arr)
				expect(slice(0)(10)(arr)).toEqual(arr)
				expect(sliceFrom(0)(10)(arr)).toEqual(arr)
				
				// Taking zero
				expect(take(0)(arr)).toEqual([])
				expect(takeLast(0)(arr)).toEqual([])
				expect(sliceFrom(0)(0)(arr)).toEqual([])
			})
		})
	})
})