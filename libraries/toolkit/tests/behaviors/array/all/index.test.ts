import * as fc from "fast-check"
import { assert, assertEquals, assertFalse } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import all from "../../../../src/simple/array/all/index.ts"

describe("all", () => {
	it("returns true when all elements satisfy predicate", () => {
		const isPositive = (n: number) => n > 0
		assert(all(isPositive)([1, 2, 3, 4, 5]))
	})

	it("returns false when at least one element fails predicate", () => {
		const isPositive = (n: number) => n > 0
		assertFalse(all(isPositive)([1, 2, -3, 4, 5]))
	})

	it("returns true for empty array (vacuous truth)", () => {
		const anyPredicate = (n: number) => n > 0
		assert(all(anyPredicate)([]))
	})

	it("short-circuits on first failure", () => {
		let count = 0
		const predicate = (n: number) => {
			count++
			return n < 3
		}
		assertFalse(all(predicate)([1, 2, 3, 4, 5]))
		// Should stop at 3 (the third element)
		assertEquals(count, 3)
	})

	it("passes index to predicate", () => {
		const indices: number[] = []
		const predicate = (_: any, index: number) => {
			indices.push(index)
			return true
		}
		all(predicate)(["a", "b", "c"])
		assertEquals(indices, [0, 1, 2])
	})

	it("passes array reference to predicate", () => {
		const original = [1, 2, 3]
		let receivedArray: Array<number> | null = null
		const predicate = (_: number, __: number, arr: Array<number>) => {
			receivedArray = arr
			return true
		}
		all(predicate)(original)
		assertEquals(receivedArray, original)
	})

	it("returns true when all strings match pattern", () => {
		const startsWithA = (s: string) => s.startsWith("a")
		assert(all(startsWithA)(["apple", "apricot", "avocado"]))
		assertFalse(all(startsWithA)(["apple", "banana", "apricot"]))
	})

	it("returns true when all numbers are even", () => {
		const isEven = (n: number) => n % 2 === 0
		assert(all(isEven)([2, 4, 6, 8]))
		assertFalse(all(isEven)([2, 3, 4, 6]))
	})

	it("handles objects with property checks", () => {
		const hasName = (obj: { name?: string }) => obj.name !== undefined
		assert(all(hasName)([{ name: "Alice" }, { name: "Bob" }]))
		assertFalse(all(hasName)([{ name: "Alice" }, {}]))
	})

	it("returns true for single element that passes", () => {
		const isPositive = (n: number) => n > 0
		assert(all(isPositive)([5]))
	})

	it("returns false for single element that fails", () => {
		const isPositive = (n: number) => n > 0
		assertFalse(all(isPositive)([-5]))
	})

	it("handles null values in array", () => {
		const isNotNull = (x: any) => x !== null
		assert(all(isNotNull)([1, 2, 3]))
		assertFalse(all(isNotNull)([1, null, 3]))
	})

	it("handles undefined values in array", () => {
		const isDefined = (x: any) => x !== undefined
		assert(all(isDefined)([1, 2, 3]))
		assertFalse(all(isDefined)([1, undefined, 3]))
	})

	it("handles NaN values", () => {
		const isNotNaN = (x: number) => !Number.isNaN(x)
		assert(all(isNotNaN)([1, 2, 3]))
		assertFalse(all(isNotNaN)([1, NaN, 3]))
	})

	it("works with boolean arrays", () => {
		const isTrue = (b: boolean) => b === true
		assert(all(isTrue)([true, true, true]))
		assertFalse(all(isTrue)([true, false, true]))
	})

	it("is curried", () => {
		const isPositive = (n: number) => n > 0
		const allPositive = all(isPositive)
		assert(typeof allPositive === "function")
		assert(allPositive([1, 2, 3]))
		assertFalse(allPositive([1, -2, 3]))
	})

	it("can be used for type guards", () => {
		const isString = (x: unknown): x is string => typeof x === "string"
		const mixed: unknown[] = ["a", "b", "c"]
		if (all(isString)(mixed)) {
			// TypeScript should narrow type here - mixed is still unknown[] but we know it's safe
			const strings = mixed as string[]
			assertEquals(strings, ["a", "b", "c"])
		}
	})

	it("handles complex predicates", () => {
		const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
		assert(all(isValidEmail)(["test@example.com", "user@domain.org"]))
		assertFalse(all(isValidEmail)(["test@example.com", "invalid"]))
	})

	it("works with async-like checks (but synchronously)", () => {
		const results: boolean[] = []
		const checkValue = (n: number) => {
			const result = n > 0
			results.push(result)
			return result
		}
		assertFalse(all(checkValue)([1, 2, -3, 4]))
		// Should stop at -3
		assertEquals(results, [true, true, false])
	})

	// Property-based tests
	describe("property tests", () => {
		it("all with always-true predicate returns true for any array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					(arr) => {
						const result = all(() => true)(arr)
						assertEquals(result, true)
					},
				),
				{ numRuns: 100 },
			)
		})

		it("all with always-false predicate returns false for non-empty arrays", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					(arr) => {
						const result = all(() => false)(arr)
						assertEquals(result, false)
					},
				),
				{ numRuns: 100 },
			)
		})

		it("all with always-false predicate returns true for empty array", () => {
			const result = all(() => false)([])
			assertEquals(result, true)
		})

		it("all returns same result as native every", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.func(fc.boolean()),
					(arr, predicate) => {
						const ourResult = all(predicate)(arr)
						const nativeResult = arr.every(predicate)
						assertEquals(ourResult, nativeResult)
					},
				),
				{ numRuns: 100 },
			)
		})

		it("if all returns false, at least one element fails predicate", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					(arr) => {
						const predicate = (n: number) => n < 50
						const result = all(predicate)(arr)
						if (!result) {
							// At least one element should be >= 50
							const hasFailing = arr.some((n) => n >= 50)
							assert(hasFailing)
						}
					},
				),
				{ numRuns: 100 },
			)
		})

		it("if all returns true, every element passes predicate", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 100 })),
					(arr) => {
						const predicate = (n: number) => n >= 0
						const result = all(predicate)(arr)
						if (result) {
							// Every element should be >= 0
							arr.forEach((n) => assert(n >= 0))
						}
					},
				),
				{ numRuns: 100 },
			)
		})

		it("preserves short-circuit behavior", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: -100, max: 100 }), {
						minLength: 5,
					}),
					(arr) => {
						let count = 0
						const predicate = (n: number) => {
							count++
							return n < 1000 // Will pass for all elements in range
						}

						// Inject a failing element at index 2
						const modifiedArr = [...arr]
						modifiedArr[2] = 1001 // Will fail predicate

						all(predicate)(modifiedArr)
						// Should stop at index 2 (third element)
						assertEquals(count, 3)
					},
				),
				{ numRuns: 50 },
			)
		})
	})
})
