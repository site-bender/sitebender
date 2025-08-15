import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import fc from "fast-check"

// Import all searching functions
import find from "../../../array/find/index.ts"
import findIndex from "../../../array/findIndex/index.ts"
import findLast from "../../../array/findLast/index.ts"
import findLastIndex from "../../../array/findLastIndex/index.ts"
import includes from "../../../array/includes/index.ts"
import indexOf from "../../../array/indexOf/index.ts"
import lastIndexOf from "../../../array/lastIndexOf/index.ts"

describe("Array Searching Operations", () => {
	describe("Behavioral Properties", () => {
		describe("find", () => {
			it("returns undefined for empty arrays", () => {
				const alwaysTrue = () => true
				expect(find(alwaysTrue)([])).toBeUndefined()
			})

			it("returns first element that matches predicate", () => {
				const isEven = (n: number) => n % 2 === 0
				expect(find(isEven)([1, 2, 3, 4])).toBe(2)
				expect(find(isEven)([1, 3, 5])).toBeUndefined()
			})

			it("stops searching after first match", () => {
				let callCount = 0
				const countingPredicate = (n: number) => {
					callCount++
					return n === 3
				}
				find(countingPredicate)([1, 2, 3, 4, 5])
				expect(callCount).toBe(3) // Should stop after finding 3
			})

			it("preserves original array", () => {
				const arr = [1, 2, 3]
				const arrCopy = [...arr]
				find((n: number) => n === 2)(arr)
				expect(arr).toEqual(arrCopy)
			})

			it("works with different types", () => {
				expect(find((s: string) => s.length > 3)(["hi", "hello", "hey"])).toBe("hello")
				expect(find((b: boolean) => b)([false, true, false])).toBe(true)
				expect(find((o: {id: number}) => o.id === 2)([{id: 1}, {id: 2}])).toEqual({id: 2})
			})

			it("property: finding with always-false returns undefined", () => {
				fc.assert(
					fc.property(fc.array(fc.anything()), (arr) => {
						expect(find(() => false)(arr)).toBeUndefined()
					})
				)
			})

			it("property: finding with always-true returns first element", () => {
				fc.assert(
					fc.property(fc.array(fc.anything(), { minLength: 1 }), (arr) => {
						expect(find(() => true)(arr)).toBe(arr[0])
					})
				)
			})
		})

		describe("findIndex", () => {
			it("returns undefined for empty arrays", () => {
				expect(findIndex(() => true)([])).toBeUndefined()
			})

			it("returns index of first matching element", () => {
				const isEven = (n: number) => n % 2 === 0
				expect(findIndex(isEven)([1, 2, 3, 4])).toBe(1)
				expect(findIndex(isEven)([2, 4, 6])).toBe(0)
			})

			it("returns undefined when no match found", () => {
				const isNegative = (n: number) => n < 0
				expect(findIndex(isNegative)([1, 2, 3])).toBeUndefined()
			})

			it("relationship with find", () => {
				const arr = [10, 20, 30, 40]
				const predicate = (n: number) => n > 25
				const index = findIndex(predicate)(arr)
				const value = find(predicate)(arr)
				if (index !== undefined) {
					expect(arr[index]).toBe(value)
				}
			})

			it("property: index points to matching element", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer()),
						(arr) => {
							// Use a deterministic predicate
							const threshold = arr.length > 0 ? arr[Math.floor(arr.length / 2)] : 0
							const pred = (n: number) => n > threshold
							const index = findIndex(pred)(arr)
							if (index !== undefined) {
								expect(pred(arr[index])).toBe(true)
								// All elements before index should not match
								for (let i = 0; i < index; i++) {
									expect(pred(arr[i])).toBe(false)
								}
							}
						}
					)
				)
			})
		})

		describe("findLast", () => {
			it("returns undefined for empty arrays", () => {
				expect(findLast(() => true)([])).toBeUndefined()
			})

			it("returns last element that matches predicate", () => {
				const isEven = (n: number) => n % 2 === 0
				expect(findLast(isEven)([1, 2, 3, 4])).toBe(4)
				expect(findLast(isEven)([2, 3, 4, 5])).toBe(4)
			})

			it("searches from end to beginning", () => {
				const arr = [1, 2, 3, 2, 1]
				const isTwo = (n: number) => n === 2
				expect(findLast(isTwo)(arr)).toBe(2)
				expect(findLastIndex(isTwo)(arr)).toBe(3)
			})

			it("relationship with find for unique matches", () => {
				const arr = [1, 2, 3, 4, 5]
				const isThree = (n: number) => n === 3
				expect(find(isThree)(arr)).toBe(findLast(isThree)(arr))
			})

			it("property: finding last with always-true returns last element", () => {
				fc.assert(
					fc.property(fc.array(fc.anything(), { minLength: 1 }), (arr) => {
						expect(findLast(() => true)(arr)).toBe(arr[arr.length - 1])
					})
				)
			})
		})

		describe("findLastIndex", () => {
			it("returns undefined for empty arrays", () => {
				expect(findLastIndex(() => true)([])).toBeUndefined()
			})

			it("returns index of last matching element", () => {
				const isEven = (n: number) => n % 2 === 0
				expect(findLastIndex(isEven)([1, 2, 3, 4])).toBe(3)
				expect(findLastIndex(isEven)([2, 3, 4, 5, 6])).toBe(4)
			})

			it("returns undefined when no match found", () => {
				const isNegative = (n: number) => n < 0
				expect(findLastIndex(isNegative)([1, 2, 3])).toBeUndefined()
			})

			it("relationship with findLast", () => {
				const arr = [10, 20, 30, 40, 30]
				const predicate = (n: number) => n === 30
				const index = findLastIndex(predicate)(arr)
				const value = findLast(predicate)(arr)
				if (index !== undefined) {
					expect(arr[index]).toBe(value)
				}
			})

			it("property: last index points to matching element", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer()),
						(arr) => {
							// Use a deterministic predicate
							const threshold = arr.length > 0 ? arr[Math.floor(arr.length / 2)] : 0
							const pred = (n: number) => n > threshold
							const index = findLastIndex(pred)(arr)
							if (index !== undefined) {
								expect(pred(arr[index])).toBe(true)
								// All elements after index should not match
								for (let i = index + 1; i < arr.length; i++) {
									expect(pred(arr[i])).toBe(false)
								}
							}
						}
					)
				)
			})
		})

		describe("includes", () => {
			it("returns false for empty arrays", () => {
				expect(includes(42)([])).toBe(false)
			})

			it("finds elements using strict equality", () => {
				expect(includes(2)([1, 2, 3])).toBe(true)
				expect(includes(4)([1, 2, 3])).toBe(false)
			})

			it("works with different types", () => {
				expect(includes("hello")(["hi", "hello", "hey"])).toBe(true)
				expect(includes(true)([false, true, false])).toBe(true)
				const mixedArray = [undefined, null, 0] as const
				expect(includes(null as any)(mixedArray as any)).toBe(true)
			})

			it("handles NaN correctly", () => {
				expect(includes(NaN)([1, NaN, 3])).toBe(true)
				expect(includes(NaN)([1, 2, 3])).toBe(false)
			})

			it("uses reference equality for objects", () => {
				const obj = { id: 1 }
				expect(includes(obj)([obj, { id: 2 }])).toBe(true)
				expect(includes({ id: 1 })([{ id: 1 }, { id: 2 }])).toBe(false)
			})

			it("property: element in array means includes returns true", () => {
				fc.assert(
					fc.property(
						fc.array(fc.anything()),
						(arr) => {
							if (arr.length > 0) {
								const randomIndex = Math.floor(Math.random() * arr.length)
								expect(includes(arr[randomIndex])(arr)).toBe(true)
							}
						}
					)
				)
			})
		})

		describe("indexOf", () => {
			it("returns undefined for empty arrays", () => {
				expect(indexOf(42)([])).toBeUndefined()
			})

			it("returns index of first occurrence", () => {
				expect(indexOf(2)([1, 2, 3, 2])).toBe(1)
				expect(indexOf(1)([1, 2, 3])).toBe(0)
			})

			it("returns undefined when element not found", () => {
				expect(indexOf(4)([1, 2, 3])).toBeUndefined()
			})

			it("uses strict equality", () => {
				const numArray = [1, 2, 3]
				const strArray = ["1", "2", "3"]
				expect(indexOf("2" as any)(numArray as any)).toBeUndefined()
				expect(indexOf(2 as any)(strArray as any)).toBeUndefined()
			})

			it("handles special values", () => {
				expect(indexOf(NaN)([1, NaN, 3])).toBeUndefined() // NaN !== NaN
				expect(indexOf(0)([0, 1, 2])).toBe(0)
				expect(indexOf(-0)([0, 1, 2])).toBe(0) // -0 === 0
			})

			it("relationship with includes", () => {
				const arr = [1, 2, 3, 4]
				const value = 3
				const hasValue = includes(value)(arr)
				const index = indexOf(value)(arr)
				expect(hasValue).toBe(index !== undefined)
			})

			it("property: indexOf returns valid index or undefined", () => {
				fc.assert(
					fc.property(
						fc.array(fc.anything()),
						fc.anything(),
						(arr, value) => {
							const index = indexOf(value)(arr)
							if (index !== undefined) {
								expect(arr[index]).toBe(value)
								expect(index).toBeGreaterThanOrEqual(0)
								expect(index).toBeLessThan(arr.length)
							}
						}
					)
				)
			})
		})

		describe("lastIndexOf", () => {
			it("returns undefined for empty arrays", () => {
				expect(lastIndexOf(42)([])).toBeUndefined()
			})

			it("returns index of last occurrence", () => {
				expect(lastIndexOf(2)([1, 2, 3, 2])).toBe(3)
				expect(lastIndexOf(3)([1, 2, 3])).toBe(2)
			})

			it("returns undefined when element not found", () => {
				expect(lastIndexOf(4)([1, 2, 3])).toBeUndefined()
			})

			it("relationship with indexOf for unique elements", () => {
				const arr = [1, 2, 3, 4, 5]
				const value = 3
				expect(indexOf(value)(arr)).toBe(lastIndexOf(value)(arr))
			})

			it("finds last occurrence for duplicates", () => {
				const arr = [1, 2, 1, 3, 1]
				expect(indexOf(1)(arr)).toBe(0)
				expect(lastIndexOf(1)(arr)).toBe(4)
			})

			it("property: lastIndexOf returns valid index or undefined", () => {
				fc.assert(
					fc.property(
						fc.array(fc.anything()),
						fc.anything(),
						(arr, value) => {
							const index = lastIndexOf(value)(arr)
							if (index !== undefined) {
								expect(arr[index]).toBe(value)
								expect(index).toBeGreaterThanOrEqual(0)
								expect(index).toBeLessThan(arr.length)
								// No element after this index should match
								for (let i = index + 1; i < arr.length; i++) {
									expect(arr[i]).not.toBe(value)
								}
							}
						}
					)
				)
			})
		})

		describe("Cross-function relationships", () => {
			it("find and findIndex are consistent", () => {
				const arr = [10, 20, 30, 40]
				const pred = (n: number) => n > 25
				const value = find(pred)(arr)
				const index = findIndex(pred)(arr)
				if (value !== undefined && index !== undefined) {
					expect(arr[index]).toBe(value)
				}
			})

			it("findLast and findLastIndex are consistent", () => {
				const arr = [10, 20, 30, 40, 30]
				const pred = (n: number) => n === 30
				const value = findLast(pred)(arr)
				const index = findLastIndex(pred)(arr)
				if (value !== undefined && index !== undefined) {
					expect(arr[index]).toBe(value)
				}
			})

			it("includes and indexOf are consistent", () => {
				fc.assert(
					fc.property(
						fc.array(fc.anything()),
						fc.anything(),
						(arr, value) => {
							const hasValue = includes(value)(arr)
							const index = indexOf(value)(arr)
							expect(hasValue).toBe(index !== undefined)
						}
					)
				)
			})

			it("indexOf and lastIndexOf agree for single occurrence", () => {
				const arr = [1, 2, 3, 4, 5]
				for (const value of arr) {
					expect(indexOf(value)(arr)).toBe(lastIndexOf(value)(arr))
				}
			})

			it("undefined-returning functions are consistent", () => {
				const emptyArray: number[] = []
				expect(find(() => true)(emptyArray)).toBeUndefined()
				expect(findIndex(() => true)(emptyArray)).toBeUndefined()
				expect(findLast(() => true)(emptyArray)).toBeUndefined()
				expect(findLastIndex(() => true)(emptyArray)).toBeUndefined()
				expect(indexOf(1)(emptyArray)).toBeUndefined()
				expect(lastIndexOf(1)(emptyArray)).toBeUndefined()
			})
		})

		describe("Immutability", () => {
			it("all search functions preserve original array", () => {
				const original = [1, 2, 3, 4, 5]
				const copy = [...original]
				
				find((n: number) => n === 3)(original)
				findIndex((n: number) => n === 3)(original)
				findLast((n: number) => n === 3)(original)
				findLastIndex((n: number) => n === 3)(original)
				includes(3)(original)
				indexOf(3)(original)
				lastIndexOf(3)(original)
				
				expect(original).toEqual(copy)
			})
		})

		describe("Edge cases", () => {
			it("handles arrays with undefined elements", () => {
				const arr = [1, undefined, 3]
				expect(includes(undefined as any)(arr as any)).toBe(true)
				expect(indexOf(undefined as any)(arr as any)).toBe(1)
				expect(find((x) => x === undefined)(arr as any)).toBeUndefined() // the value itself
				expect(findIndex((x) => x === undefined)(arr as any)).toBe(1)
			})

			it("handles arrays with null elements", () => {
				const arr = [1, null, 3]
				expect(includes(null as any)(arr as any)).toBe(true)
				expect(indexOf(null as any)(arr as any)).toBe(1)
				expect(find((x) => x === null)(arr as any)).toBe(null)
				expect(findIndex((x) => x === null)(arr as any)).toBe(1)
			})

			it("handles very large arrays", () => {
				const largeArray = Array.from({ length: 10000 }, (_, i) => i)
				expect(find((n: number) => n === 9999)(largeArray)).toBe(9999)
				expect(findLast((n: number) => n < 10)(largeArray)).toBe(9)
				expect(includes(5000)(largeArray)).toBe(true)
			})

			it("handles single-element arrays", () => {
				const single = [42]
				expect(find(() => true)(single)).toBe(42)
				expect(findIndex(() => true)(single)).toBe(0)
				expect(findLast(() => true)(single)).toBe(42)
				expect(findLastIndex(() => true)(single)).toBe(0)
				expect(includes(42)(single)).toBe(true)
				expect(indexOf(42)(single)).toBe(0)
				expect(lastIndexOf(42)(single)).toBe(0)
			})
		})
	})
})