import * as fc from "fast-check"
import { expect } from "jsr:@std/expect"
import { describe, it } from "jsr:@std/testing/bdd"

import span from "../../../../src/simple/array/span/index.ts"

describe("span", () => {
	describe("behavioral tests", () => {
		it("splits at first element that fails predicate", () => {
			const isPositive = (x: number) => x > 0
			const result = span(isPositive)([1, 2, 3, -1, 4, 5])
			expect(result).toEqual([[1, 2, 3], [-1, 4, 5]])
		})

		it("returns all elements in first array when all match", () => {
			const isPositive = (x: number) => x > 0
			const result = span(isPositive)([1, 2, 3, 4, 5])
			expect(result).toEqual([[1, 2, 3, 4, 5], []])
		})

		it("returns all elements in second array when none match", () => {
			const isPositive = (x: number) => x > 0
			const result = span(isPositive)([-1, -2, -3])
			expect(result).toEqual([[], [-1, -2, -3]])
		})

		it("handles empty arrays", () => {
			const isPositive = (x: number) => x > 0
			const result = span(isPositive)([])
			expect(result).toEqual([[], []])
		})

		it("handles null and undefined", () => {
			const isPositive = (x: number) => x > 0
			expect(span(isPositive)(null)).toEqual([[], []])
			expect(span(isPositive)(undefined)).toEqual([[], []])
		})

		it("provides index and array to predicate", () => {
			const indices: number[] = []
			const arrays: ReadonlyArray<number>[] = []
			const predicate = (
				_: number,
				index: number,
				array: ReadonlyArray<number>,
			) => {
				indices.push(index)
				arrays.push(array)
				return index < 2
			}

			const input = [10, 20, 30, 40]
			const result = span(predicate)(input)

			expect(result).toEqual([[10, 20], [30, 40]])
			expect(indices).toEqual([0, 1, 2])
			expect(arrays).toEqual([input, input, input])
		})

		it("handles strings", () => {
			const isLowercase = (s: string) => s === s.toLowerCase()
			const result = span(isLowercase)(["hello", "world", "STOP", "here"])
			expect(result).toEqual([["hello", "world"], ["STOP", "here"]])
		})

		it("handles objects", () => {
			interface User {
				name: string
				active: boolean
			}

			const users: User[] = [
				{ name: "Alice", active: true },
				{ name: "Bob", active: true },
				{ name: "Charlie", active: false },
				{ name: "David", active: true },
			]

			const isActive = (u: User) => u.active
			const result = span(isActive)(users)

			expect(result).toEqual([
				[
					{ name: "Alice", active: true },
					{ name: "Bob", active: true },
				],
				[
					{ name: "Charlie", active: false },
					{ name: "David", active: true },
				],
			])
		})

		it("handles mixed types with type predicates", () => {
			const isNumber = (x: unknown): x is number => typeof x === "number"
			const mixed = [1, 2, 3, "four", 5, "six"]
			const result = span(isNumber)(mixed)
			expect(result).toEqual([[1, 2, 3], ["four", 5, "six"]])
		})

		it("stops at first failure even if later elements match", () => {
			const isEven = (x: number) => x % 2 === 0
			const result = span(isEven)([2, 4, 6, 7, 8, 10])
			expect(result).toEqual([[2, 4, 6], [7, 8, 10]])
		})

		it("handles single element arrays", () => {
			const isPositive = (x: number) => x > 0

			expect(span(isPositive)([5])).toEqual([[5], []])
			expect(span(isPositive)([-5])).toEqual([[], [-5]])
		})

		it("works with always true predicate", () => {
			const alwaysTrue = () => true
			const result = span(alwaysTrue)([1, 2, 3])
			expect(result).toEqual([[1, 2, 3], []])
		})

		it("works with always false predicate", () => {
			const alwaysFalse = () => false
			const result = span(alwaysFalse)([1, 2, 3])
			expect(result).toEqual([[], [1, 2, 3]])
		})

		it("handles NaN correctly", () => {
			const notNaN = (x: number) => !Number.isNaN(x)
			const result = span(notNaN)([1, 2, NaN, 4, 5])
			expect(result).toEqual([[1, 2], [NaN, 4, 5]])
		})

		it("handles undefined values in array", () => {
			const isDefined = <T>(x: T | undefined): x is T => x !== undefined
			const result = span(isDefined)([1, 2, undefined, 4, 5])
			expect(result).toEqual([[1, 2], [undefined, 4, 5]])
		})

		it("handles null values in array", () => {
			const isNotNull = <T>(x: T | null): x is T => x !== null
			const result = span(isNotNull)([1, 2, null, 4, 5])
			expect(result).toEqual([[1, 2], [null, 4, 5]])
		})

		it("preserves original array elements (no mutations)", () => {
			const original = [1, 2, 3, 4, 5]
			const copy = [...original]
			const isSmall = (x: number) => x < 4

			span(isSmall)(original)

			expect(original).toEqual(copy)
		})

		it("handles complex predicates", () => {
			const isPrime = (n: number) => {
				if (n <= 1) return false
				if (n <= 3) return true
				if (n % 2 === 0 || n % 3 === 0) return false
				for (let i = 5; i * i <= n; i += 6) {
					if (n % i === 0 || n % (i + 2) === 0) return false
				}
				return true
			}

			const result = span(isPrime)([2, 3, 5, 4, 7, 11])
			expect(result).toEqual([[2, 3, 5], [4, 7, 11]])
		})
	})

	describe("property-based tests", () => {
		it("always returns two arrays", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.func(fc.boolean()),
					(array, predicate) => {
						const result = span(predicate)(array)
						return Array.isArray(result) &&
							result.length === 2 &&
							Array.isArray(result[0]) &&
							Array.isArray(result[1])
					},
				),
			)
		})

		it("concatenating results equals original array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.func(fc.boolean()),
					(array, predicate) => {
						const [first, second] = span(predicate)(array)
						const concatenated = [...first, ...second]
						return concatenated.length === array.length &&
							concatenated.every((val, idx) => val === array[idx])
					},
				),
			)
		})

		it("first array elements all satisfy predicate", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(array) => {
						const predicate = (x: number) => x < 50
						const [first] = span(predicate)(array)
						return first.every((val, idx) => predicate(val, idx, array))
					},
				),
			)
		})

		it("if second array non-empty, first element fails predicate", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 100 })),
					(array) => {
						const predicate = (x: number) => x < 50
						const [first, second] = span(predicate)(array)

						if (second.length === 0) {
							return true // Skip when second array is empty
						}

						const firstIndexInOriginal = first.length
						return !predicate(second[0], firstIndexInOriginal, array)
					},
				),
			)
		})

		it("currying works correctly", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(array) => {
						const predicate = (x: number) => x > 0
						const curriedSpan = span(predicate)
						const result1 = curriedSpan(array)
						const result2 = span(predicate)(array)

						return result1[0].length === result2[0].length &&
							result1[1].length === result2[1].length &&
							result1[0].every((val, idx) => val === result2[0][idx]) &&
							result1[1].every((val, idx) => val === result2[1][idx])
					},
				),
			)
		})

		it("span with always true equals [array, []]", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(array) => {
						const alwaysTrue = () => true
						const [first, second] = span(alwaysTrue)(array)
						return first.length === array.length &&
							second.length === 0 &&
							first.every((val, idx) => val === array[idx])
					},
				),
			)
		})

		it("span with always false equals [[], array]", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(array) => {
						const alwaysFalse = () => false
						const [first, second] = span(alwaysFalse)(array)
						return first.length === 0 &&
							second.length === array.length &&
							second.every((val, idx) => val === array[idx])
					},
				),
			)
		})
	})
})
