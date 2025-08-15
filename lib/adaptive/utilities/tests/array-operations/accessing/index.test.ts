import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import first from "../../../array/first/index.ts"
import last from "../../../array/last/index.ts"
import head from "../../../array/head/index.ts"
import tail from "../../../array/tail/index.ts"
import nth from "../../../array/nth/index.ts"

describe("Array Accessing Behaviors", () => {
	describe("when accessing first element", () => {
		it("returns first element of non-empty array", () => {
			const result = first([1, 2, 3, 4, 5])
			expect(result).toBe(1)
		})

		it("returns undefined for empty array", () => {
			const result = first([])
			expect(result).toBeUndefined()
		})

		it("handles single-element arrays", () => {
			const result = first([42])
			expect(result).toBe(42)
		})

		it("works with different types", () => {
			expect(first(["a", "b", "c"])).toBe("a")
			expect(first([true, false])).toBe(true)
			expect(first([{ id: 1 }, { id: 2 }])).toEqual({ id: 1 })
		})

		it("handles arrays with null and undefined", () => {
			expect(first([null, 1, 2])).toBeNull()
			expect(first([undefined, 1, 2])).toBeUndefined()
		})
	})

	describe("when accessing last element", () => {
		it("returns last element of non-empty array", () => {
			const result = last([1, 2, 3, 4, 5])
			expect(result).toBe(5)
		})

		it("returns undefined for empty array", () => {
			const result = last([])
			expect(result).toBeUndefined()
		})

		it("handles single-element arrays", () => {
			const result = last([42])
			expect(result).toBe(42)
		})

		it("works with different types", () => {
			expect(last(["a", "b", "c"])).toBe("c")
			expect(last([true, false])).toBe(false)
			expect(last([{ id: 1 }, { id: 2 }])).toEqual({ id: 2 })
		})

		it("handles arrays with null and undefined", () => {
			expect(last([1, 2, null])).toBeNull()
			expect(last([1, 2, undefined])).toBeUndefined()
		})
	})

	describe("when accessing head (alias for first)", () => {
		it("returns first element of non-empty array", () => {
			const result = head([1, 2, 3, 4, 5])
			expect(result).toBe(1)
		})

		it("returns undefined for empty array", () => {
			const result = head([])
			expect(result).toBeUndefined()
		})

		it("behaves identically to first", () => {
			const numberArray = [1, 2, 3]
			const stringArray = ["a", "b"]
			const booleanArray = [true]
			const emptyArray: Array<unknown> = []

			expect(head(numberArray)).toEqual(first(numberArray))
			expect(head(stringArray)).toEqual(first(stringArray))
			expect(head(booleanArray)).toEqual(first(booleanArray))
			expect(head(emptyArray)).toEqual(first(emptyArray))
		})
	})

	describe("when accessing tail (all but first)", () => {
		it("returns all elements except first", () => {
			const result = tail([1, 2, 3, 4, 5])
			expect(result).toEqual([2, 3, 4, 5])
		})

		it("returns empty array for empty input", () => {
			const result = tail([])
			expect(result).toEqual([])
		})

		it("returns empty array for single-element array", () => {
			const result = tail([42])
			expect(result).toEqual([])
		})

		it("works with different types", () => {
			expect(tail(["a", "b", "c"])).toEqual(["b", "c"])
			expect(tail([true, false, true])).toEqual([false, true])
			expect(tail([{ id: 1 }, { id: 2 }, { id: 3 }])).toEqual([
				{ id: 2 },
				{ id: 3 },
			])
		})

		it("does not mutate the original array", () => {
			const original = [1, 2, 3, 4, 5]
			const result = tail(original)
			expect(original).toEqual([1, 2, 3, 4, 5])
			expect(result).not.toBe(original)
		})
	})

	describe("when accessing nth element", () => {
		it("returns element at positive index", () => {
			const arr = [10, 20, 30, 40, 50]
			expect(nth(0)(arr)).toBe(10)
			expect(nth(2)(arr)).toBe(30)
			expect(nth(4)(arr)).toBe(50)
		})

		it("supports negative indices (counting from end)", () => {
			// Note: nth uses array.at() which supports negative indices
			const arr = [10, 20, 30, 40, 50]
			expect(nth(-1)(arr)).toBe(50)  // last element
			expect(nth(-2)(arr)).toBe(40)  // second to last
			expect(nth(-5)(arr)).toBe(10)  // first element (5 from end)
		})

		it("returns undefined for out-of-bounds positive index", () => {
			const arr = [1, 2, 3]
			expect(nth(3)(arr)).toBeUndefined()
			expect(nth(10)(arr)).toBeUndefined()
		})

		it("returns undefined for out-of-bounds negative index", () => {
			const arr = [1, 2, 3]
			expect(nth(-4)(arr)).toBeUndefined()
			expect(nth(-10)(arr)).toBeUndefined()
		})

		it("handles empty arrays", () => {
			expect(nth(0)([])).toBeUndefined()
			expect(nth(-1)([])).toBeUndefined()
		})

		it("works with different types", () => {
			expect(nth(1)(["a", "b", "c"])).toBe("b")
			expect(nth(0)([true, false])).toBe(true)
			expect(nth(1)([{ id: 1 }, { id: 2 }])).toEqual({ id: 2 })
		})

		it("properly curries the function", () => {
			const getSecond = nth(1)
			expect(getSecond([10, 20, 30])).toBe(20)
			expect(getSecond(["a", "b", "c"])).toBe("b")
		})

		it("handles sparse arrays", () => {
			const sparse = [1, , , 4]
			expect(nth(0)(sparse)).toBe(1)
			expect(nth(1)(sparse)).toBeUndefined()
			expect(nth(3)(sparse)).toBe(4)
		})
	})

	describe("property-based tests", () => {
		it("first and head return the same value", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					expect(first(arr)).toEqual(head(arr))
				}),
			)
		})

		it("last of non-empty array equals nth(length-1)", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					(arr) => {
						expect(last(arr)).toEqual(nth(arr.length - 1)(arr))
					},
				),
			)
		})

		it("first of tail equals second element", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 2 }),
					(arr) => {
						expect(first(tail(arr))).toEqual(nth(1)(arr))
					},
				),
			)
		})

		it("tail length is original length minus one for non-empty arrays", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					(arr) => {
						expect(tail(arr).length).toBe(arr.length - 1)
					},
				),
			)
		})

		it("tail of empty array is empty array", () => {
			expect(tail([])).toEqual([])
		})

		it("nth with valid index returns element at that index", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					(arr) => {
						const validIndex = Math.floor(Math.random() * arr.length)
						expect(nth(validIndex)(arr)).toEqual(arr[validIndex])
					},
				),
			)
		})

		it("nth with out-of-bounds index returns undefined", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.integer({ min: 1, max: 1000 }),
					(arr, offset) => {
						const outOfBoundsIndex = arr.length + offset
						expect(nth(outOfBoundsIndex)(arr)).toBeUndefined()
					},
				),
			)
		})

		it("first and last are the same for single-element arrays", () => {
			fc.assert(
				fc.property(fc.anything(), (elem) => {
					const arr = [elem]
					expect(first(arr)).toEqual(last(arr))
				}),
			)
		})

		it("concatenating head and tail reconstructs the array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					(arr) => {
						const h = head(arr)
						const t = tail(arr)
						expect([h, ...t]).toEqual(arr)
					},
				),
			)
		})

		it("tail preserves all elements except first", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					(arr) => {
						const t = tail(arr)
						for (let i = 0; i < t.length; i++) {
							expect(t[i]).toEqual(arr[i + 1])
						}
					},
				),
			)
		})

		it("nth is consistent with array.at() method", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					fc.integer(),
					(arr, index) => {
						const result = nth(index)(arr)
						const expected = arr.at(index)
						expect(result).toEqual(expected)
					},
				),
			)
		})

		it("tail of tail removes first two elements", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 2 }),
					(arr) => {
						const doubleTail = tail(tail(arr))
						expect(doubleTail).toEqual(arr.slice(2))
					},
				),
			)
		})
	})
})