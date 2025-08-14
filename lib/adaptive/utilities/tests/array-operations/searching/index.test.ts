import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import find from "../../../array/find/index.ts"
import findIndex from "../../../array/findIndex/index.ts"
import findLast from "../../../array/findLast/index.ts"
import findLastIndex from "../../../array/findLastIndex/index.ts"
import includes from "../../../array/includes/index.ts"
import indexOf from "../../../array/indexOf/index.ts"
import lastIndexOf from "../../../array/lastIndexOf/index.ts"
import lastIndexOfMatch from "../../../array/lastIndexOfMatch/index.ts"

describe("Array Searching Behaviors", () => {
	describe("when finding elements", () => {
		it("finds first element matching predicate", () => {
			const isEven = (n: number) => n % 2 === 0
			const result = find(isEven)([1, 3, 4, 6, 7])
			expect(result).toBe(4)
		})

		it("returns undefined when no element matches", () => {
			const isNegative = (n: number) => n < 0
			const result = find(isNegative)([1, 2, 3, 4])
			expect(result).toBeUndefined()
		})

		it("finds element in objects array", () => {
			const users = [
				{ id: 1, name: "Alice" },
				{ id: 2, name: "Bob" },
				{ id: 3, name: "Charlie" },
			]
			const isBob = (u: { name: string }) => u.name === "Bob"
			const result = find(isBob)(users)
			expect(result).toEqual({ id: 2, name: "Bob" })
		})

		it("stops at first match", () => {
			let checks = 0
			const predicate = (n: number) => {
				checks++
				return n > 2
			}
			const result = find(predicate)([1, 2, 3, 4, 5])
			expect(result).toBe(3)
			expect(checks).toBe(3)
		})

		it("handles empty arrays", () => {
			const predicate = (n: number) => n > 0
			const result = find(predicate)([])
			expect(result).toBeUndefined()
		})
	})

	describe("when finding element index", () => {
		it("finds index of first matching element", () => {
			const isEven = (n: number) => n % 2 === 0
			const result = findIndex(isEven)([1, 3, 4, 6, 7])
			expect(result).toBe(2)
		})

		it("returns -1 when no element matches", () => {
			const isNegative = (n: number) => n < 0
			const result = findIndex(isNegative)([1, 2, 3, 4])
			expect(result).toBe(-1)
		})

		it("finds index in strings array", () => {
			const startsWithB = (s: string) => s.startsWith("B")
			const result = findIndex(startsWithB)(["Alice", "Bob", "Bill"])
			expect(result).toBe(1)
		})

		it("returns 0 for first element match", () => {
			const isPositive = (n: number) => n > 0
			const result = findIndex(isPositive)([1, 2, 3])
			expect(result).toBe(0)
		})

		it("handles empty arrays", () => {
			const predicate = (n: number) => n > 0
			const result = findIndex(predicate)([])
			expect(result).toBe(-1)
		})
	})

	describe("when finding last element", () => {
		it("finds last element matching predicate", () => {
			const isEven = (n: number) => n % 2 === 0
			const result = findLast(isEven)([1, 2, 3, 4, 5, 6])
			expect(result).toBe(6)
		})

		it("returns undefined when no element matches", () => {
			const isNegative = (n: number) => n < 0
			const result = findLast(isNegative)([1, 2, 3])
			expect(result).toBeUndefined()
		})

		it("works correctly with duplicates", () => {
			const isTwo = (n: number) => n === 2
			const result = findLast(isTwo)([1, 2, 3, 2, 1])
			expect(result).toBe(2)
		})

		it("handles single matching element", () => {
			const isThree = (n: number) => n === 3
			const result = findLast(isThree)([1, 2, 3, 4, 5])
			expect(result).toBe(3)
		})

		it("handles empty arrays", () => {
			const predicate = (n: number) => n > 0
			const result = findLast(predicate)([])
			expect(result).toBeUndefined()
		})
	})

	describe("when finding last element index", () => {
		it("finds index of last matching element", () => {
			const isEven = (n: number) => n % 2 === 0
			const result = findLastIndex(isEven)([1, 2, 3, 4, 5, 6])
			expect(result).toBe(5)
		})

		it("returns -1 when no element matches", () => {
			const isNegative = (n: number) => n < 0
			const result = findLastIndex(isNegative)([1, 2, 3])
			expect(result).toBe(-1)
		})

		it("handles multiple matches correctly", () => {
			const isEven = (n: number) => n % 2 === 0
			const result = findLastIndex(isEven)([2, 4, 6, 1, 3])
			expect(result).toBe(2)
		})

		it("returns last index for duplicate values", () => {
			const isTwo = (n: number) => n === 2
			const result = findLastIndex(isTwo)([2, 1, 2, 3, 2])
			expect(result).toBe(4)
		})

		it("handles empty arrays", () => {
			const predicate = (n: number) => n > 0
			const result = findLastIndex(predicate)([])
			expect(result).toBe(-1)
		})
	})

	describe("when checking element inclusion", () => {
		it("returns true when element exists", () => {
			const result = includes(3)([1, 2, 3, 4, 5])
			expect(result).toBe(true)
		})

		it("returns false when element doesn't exist", () => {
			const result = includes(6)([1, 2, 3, 4, 5])
			expect(result).toBe(false)
		})

		it("works with different types", () => {
			expect(includes("b")(["a", "b", "c"])).toBe(true)
			expect(includes(true)([false, true, false])).toBe(true)
			expect(includes(null)([1, null, 3])).toBe(true)
		})

		it("uses strict equality", () => {
			expect(includes("3")([1, 2, 3])).toBe(false)
			expect(includes(3)(["1", "2", "3"])).toBe(false)
		})

		it("handles empty arrays", () => {
			const result = includes(1)([])
			expect(result).toBe(false)
		})

		it("handles NaN correctly", () => {
			const result = includes(NaN)([1, NaN, 3])
			expect(result).toBe(true)
		})
	})

	describe("when finding element index by value", () => {
		it("returns first index of element", () => {
			const result = indexOf(3)([1, 2, 3, 4, 3])
			expect(result).toBe(2)
		})

		it("returns -1 when element not found", () => {
			const result = indexOf(5)([1, 2, 3, 4])
			expect(result).toBe(-1)
		})

		it("finds index from start", () => {
			const result = indexOf(2)([2, 1, 2, 3, 2])
			expect(result).toBe(0)
		})

		it("uses strict equality", () => {
			expect(indexOf("3")([1, 2, 3])).toBe(-1)
			expect(indexOf(3)(["1", "2", "3"])).toBe(-1)
		})

		it("handles empty arrays", () => {
			const result = indexOf(1)([])
			expect(result).toBe(-1)
		})
	})

	describe("when finding last index by value", () => {
		it("returns last index of element", () => {
			const result = lastIndexOf(3)([1, 3, 2, 3, 4])
			expect(result).toBe(3)
		})

		it("returns -1 when element not found", () => {
			const result = lastIndexOf(5)([1, 2, 3, 4])
			expect(result).toBe(-1)
		})

		it("finds index from end", () => {
			const result = lastIndexOf(2)([2, 1, 2, 3, 2])
			expect(result).toBe(4)
		})

		it("handles single occurrence", () => {
			const result = lastIndexOf(3)([1, 2, 3, 4, 5])
			expect(result).toBe(2)
		})

		it("handles empty arrays", () => {
			const result = lastIndexOf(1)([])
			expect(result).toBe(-1)
		})
	})

	describe("when finding last index with predicate", () => {
		it("returns last index matching predicate", () => {
			const isEven = (n: number) => n % 2 === 0
			const result = lastIndexOfMatch(isEven)([1, 2, 3, 4, 5])
			expect(result).toBe(3)
		})

		it("returns -1 when no match found", () => {
			const isNegative = (n: number) => n < 0
			const result = lastIndexOfMatch(isNegative)([1, 2, 3])
			expect(result).toBe(-1)
		})

		it("handles all elements matching", () => {
			const isPositive = (n: number) => n > 0
			const result = lastIndexOfMatch(isPositive)([1, 2, 3, 4])
			expect(result).toBe(3)
		})

		it("handles complex predicates", () => {
			const users = [
				{ name: "Alice", age: 25 },
				{ name: "Bob", age: 30 },
				{ name: "Charlie", age: 25 },
			]
			const isAge25 = (u: { age: number }) => u.age === 25
			const result = lastIndexOfMatch(isAge25)(users)
			expect(result).toBe(2)
		})

		it("handles empty arrays", () => {
			const predicate = (n: number) => n > 0
			const result = lastIndexOfMatch(predicate)([])
			expect(result).toBe(-1)
		})
	})

	describe("property-based tests", () => {
		it("find returns undefined or element from array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.func(fc.boolean()),
					(arr, predicate) => {
						const result = find(predicate)(arr)
						if (result !== undefined) {
							expect(arr.includes(result)).toBe(true)
						}
					},
				),
			)
		})

		it("findIndex returns -1 or valid index", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.func(fc.boolean()),
					(arr, predicate) => {
						const index = findIndex(predicate)(arr)
						if (index !== -1) {
							expect(index).toBeGreaterThanOrEqual(0)
							expect(index).toBeLessThan(arr.length)
						}
					},
				),
			)
		})

		it("find and findIndex are consistent", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const predicate = (n: number) => n > 5
						const element = find(predicate)(arr)
						const index = findIndex(predicate)(arr)
						
						if (element === undefined) {
							expect(index).toBe(-1)
						} else {
							expect(arr[index]).toBe(element)
						}
					},
				),
			)
		})

		it("findLast and findLastIndex are consistent", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const predicate = (n: number) => n > 5
						const element = findLast(predicate)(arr)
						const index = findLastIndex(predicate)(arr)
						
						if (element === undefined) {
							expect(index).toBe(-1)
						} else {
							expect(arr[index]).toBe(element)
						}
					},
				),
			)
		})

		it("includes returns true for elements in array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					(arr) => {
						const elem = arr[Math.floor(Math.random() * arr.length)]
						expect(includes(elem)(arr)).toBe(true)
					},
				),
			)
		})

		it("indexOf returns -1 or valid index", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.anything(),
					(arr, elem) => {
						const index = indexOf(elem)(arr)
						if (index !== -1) {
							expect(index).toBeGreaterThanOrEqual(0)
							expect(index).toBeLessThan(arr.length)
							expect(arr[index]).toEqual(elem)
						}
					},
				),
			)
		})

		it("lastIndexOf returns -1 or valid index", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.anything(),
					(arr, elem) => {
						const index = lastIndexOf(elem)(arr)
						if (index !== -1) {
							expect(index).toBeGreaterThanOrEqual(0)
							expect(index).toBeLessThan(arr.length)
							expect(arr[index]).toEqual(elem)
						}
					},
				),
			)
		})

		it("indexOf and includes are consistent", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.anything(),
					(arr, elem) => {
						const index = indexOf(elem)(arr)
						const included = includes(elem)(arr)
						
						if (index === -1) {
							expect(included).toBe(false)
						} else {
							expect(included).toBe(true)
						}
					},
				),
			)
		})

		it("lastIndexOf is after or equal to indexOf", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.anything(),
					(arr, elem) => {
						const first = indexOf(elem)(arr)
						const last = lastIndexOf(elem)(arr)
						
						if (first !== -1 && last !== -1) {
							expect(last).toBeGreaterThanOrEqual(first)
						}
					},
				),
			)
		})

		it("find on empty array returns undefined", () => {
			fc.assert(
				fc.property(fc.func(fc.boolean()), (predicate) => {
					expect(find(predicate)([])).toBeUndefined()
				}),
			)
		})

		it("findIndex on empty array returns -1", () => {
			fc.assert(
				fc.property(fc.func(fc.boolean()), (predicate) => {
					expect(findIndex(predicate)([])).toBe(-1)
				}),
			)
		})
	})
})