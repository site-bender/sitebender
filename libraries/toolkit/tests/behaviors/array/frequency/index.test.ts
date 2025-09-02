import * as fc from "fast-check"
import { assert, assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import frequency from "../../../../src/simple/array/frequency/index.ts"

describe("frequency", () => {
	it("counts occurrences of numbers", () => {
		const result = frequency([1, 2, 2, 3, 3, 3])
		assertEquals(result.get(1), 1)
		assertEquals(result.get(2), 2)
		assertEquals(result.get(3), 3)
		assertEquals(result.size, 3)
	})

	it("counts occurrences of strings", () => {
		const result = frequency(["a", "b", "a", "c", "b", "a"])
		assertEquals(result.get("a"), 3)
		assertEquals(result.get("b"), 2)
		assertEquals(result.get("c"), 1)
		assertEquals(result.size, 3)
	})

	it("handles empty array", () => {
		const result = frequency([])
		assertEquals(result.size, 0)
		assert(result instanceof Map)
	})

	it("handles single element", () => {
		const result = frequency([42])
		assertEquals(result.get(42), 1)
		assertEquals(result.size, 1)
	})

	it("handles all unique elements", () => {
		const result = frequency([1, 2, 3, 4, 5])
		assertEquals(result.get(1), 1)
		assertEquals(result.get(2), 1)
		assertEquals(result.get(3), 1)
		assertEquals(result.get(4), 1)
		assertEquals(result.get(5), 1)
		assertEquals(result.size, 5)
	})

	it("handles all same elements", () => {
		const result = frequency([7, 7, 7, 7, 7])
		assertEquals(result.get(7), 5)
		assertEquals(result.size, 1)
	})

	it("handles NaN with SameValueZero semantics", () => {
		const result = frequency([NaN, NaN, 1, NaN])
		assertEquals(result.get(NaN), 3)
		assertEquals(result.get(1), 1)
		assertEquals(result.size, 2)
	})

	it("handles +0 and -0 as same value (SameValueZero)", () => {
		const result = frequency([0, -0, +0, -0])
		assertEquals(result.get(0), 4)
		assertEquals(result.get(-0), 4)
		assertEquals(result.size, 1)
	})

	it("handles null and undefined", () => {
		const result = frequency([null, undefined, null, undefined, null])
		assertEquals(result.get(null), 3)
		assertEquals(result.get(undefined), 2)
		assertEquals(result.size, 2)
	})

	it("handles boolean values", () => {
		const result = frequency([true, false, true, true, false])
		assertEquals(result.get(true), 3)
		assertEquals(result.get(false), 2)
		assertEquals(result.size, 2)
	})

	it("handles objects by reference", () => {
		const obj1 = { a: 1 }
		const obj2 = { a: 1 }
		const obj3 = obj1
		const result = frequency([obj1, obj2, obj3, obj1])
		assertEquals(result.get(obj1), 3) // obj1 and obj3 are same reference
		assertEquals(result.get(obj2), 1) // obj2 is different reference
		assertEquals(result.size, 2)
	})

	it("handles arrays by reference", () => {
		const arr1 = [1, 2]
		const arr2 = [1, 2]
		const arr3 = arr1
		const result = frequency([arr1, arr2, arr3, arr1])
		assertEquals(result.get(arr1), 3)
		assertEquals(result.get(arr2), 1)
		assertEquals(result.size, 2)
	})

	it("handles symbols", () => {
		const sym1 = Symbol("test")
		const sym2 = Symbol("test")
		const sym3 = Symbol.for("shared")
		const sym4 = Symbol.for("shared")
		const result = frequency([sym1, sym2, sym1, sym3, sym4])
		assertEquals(result.get(sym1), 2)
		assertEquals(result.get(sym2), 1)
		assertEquals(result.get(sym3), 2) // sym3 and sym4 are same global symbol
		assertEquals(result.size, 3)
	})

	it("handles dates by reference", () => {
		const date1 = new Date("2024-01-01")
		const date2 = new Date("2024-01-01")
		const date3 = date1
		const result = frequency([date1, date2, date3])
		assertEquals(result.get(date1), 2)
		assertEquals(result.get(date2), 1)
		assertEquals(result.size, 2)
	})

	it("handles functions by reference", () => {
		const fn1 = () => 1
		const fn2 = () => 1
		const fn3 = fn1
		const result = frequency([fn1, fn2, fn3, fn1])
		assertEquals(result.get(fn1), 3)
		assertEquals(result.get(fn2), 1)
		assertEquals(result.size, 2)
	})

	it("handles mixed type arrays", () => {
		const result = frequency([1, "1", true, 1, "1", null, undefined, true])
		assertEquals(result.get(1), 2)
		assertEquals(result.get("1"), 2)
		assertEquals(result.get(true), 2)
		assertEquals(result.get(null), 1)
		assertEquals(result.get(undefined), 1)
		assertEquals(result.size, 5)
	})

	it("handles large arrays efficiently", () => {
		const largeArray = Array.from({ length: 10000 }, (_, i) => i % 100)
		const result = frequency(largeArray)
		assertEquals(result.size, 100)
		// Each number 0-99 appears 100 times
		for (let i = 0; i < 100; i++) {
			assertEquals(result.get(i), 100)
		}
	})

	it("can be used to find most common element", () => {
		const counts = frequency([1, 2, 2, 3, 3, 3, 4])
		const entries = Array.from(counts.entries())
		const mostCommon = entries.reduce((a, b) => b[1] > a[1] ? b : a)
		assertEquals(mostCommon, [3, 3])
	})

	it("can be used to detect duplicates", () => {
		const counts = frequency([1, 2, 3, 2, 4, 3])
		const duplicates = Array.from(counts.entries())
			.filter(([_, count]) => count > 1)
			.map(([item]) => item)
		assertEquals(duplicates, [2, 3])
	})

	it("preserves insertion order in Map", () => {
		const result = frequency([3, 1, 2, 1, 3, 2])
		const keys = Array.from(result.keys())
		assertEquals(keys, [3, 1, 2]) // First occurrence order
	})

	// Property-based tests
	describe("property tests", () => {
		it("sum of all frequencies equals array length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					(arr) => {
						const freq = frequency(arr)
						const sum = Array.from(freq.values()).reduce((a, b) => a + b, 0)
						assertEquals(sum, arr.length)
					},
				),
				{ numRuns: 100 },
			)
		})

		it("all frequencies are positive integers", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					(arr) => {
						const freq = frequency(arr)
						Array.from(freq.values()).forEach((count) => {
							assert(Number.isInteger(count))
							assert(count > 0)
						})
					},
				),
				{ numRuns: 100 },
			)
		})

		it("number of unique elements equals Map size", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const freq = frequency(arr)
						const uniqueElements = new Set(arr)
						assertEquals(freq.size, uniqueElements.size)
					},
				),
				{ numRuns: 100 },
			)
		})

		it("empty array produces empty Map", () => {
			const result = frequency([])
			assertEquals(result.size, 0)
			assert(result instanceof Map)
		})

		it("single element array produces Map with one entry", () => {
			fc.assert(
				fc.property(
					fc.anything(),
					(element) => {
						const result = frequency([element])
						assertEquals(result.size, 1)
						assertEquals(result.get(element), 1)
					},
				),
				{ numRuns: 100 },
			)
		})

		it("frequency of element equals filter length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 10 })),
					(arr) => {
						if (arr.length === 0) return
						const freq = frequency(arr)
						const testElement = arr[0]
						const expectedCount =
							arr.filter((x) => Object.is(x, testElement)).length
						assertEquals(freq.get(testElement), expectedCount)
					},
				),
				{ numRuns: 100 },
			)
		})
	})
})
