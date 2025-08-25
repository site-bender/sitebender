import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import closest from "../../../../src/simple/array/closest/index.ts"

// JSDoc examples - basic functionality
Deno.test("closest - find closest to 5", () => {
	assertEquals(closest(5)([1, 3, 6, 9]), 6)
})

Deno.test("closest - find closest to 10", () => {
	assertEquals(closest(10)([2, 5, 8, 14, 20]), 8)
})

Deno.test("closest - negative numbers", () => {
	assertEquals(closest(0)([-5, -2, 3, 7]), -2)
})

Deno.test("closest - decimal numbers", () => {
	assertEquals(closest(3.7)([1.2, 3.4, 4.1, 2.8]), 3.4)
})

Deno.test("closest - exact match", () => {
	assertEquals(closest(5)([1, 3, 5, 7]), 5)
})

Deno.test("closest - equal distance returns first", () => {
	assertEquals(closest(5)([3, 7, 2, 8]), 3)
})

Deno.test("closest - large numbers", () => {
	assertEquals(closest(1000)([100, 500, 1500, 2000]), 500)
})

// JSDoc practical examples
Deno.test("closest - find closest temperature", () => {
	const targetTemp = 72
	const readings = [68, 70, 74, 76, 80]
	assertEquals(closest(targetTemp)(readings), 70)
})

Deno.test("closest - find closest price point", () => {
	const budget = 250
	const prices = [199, 229, 279, 299, 349]
	assertEquals(closest(budget)(prices), 229)
})

// Partial application from JSDoc
Deno.test("closest - partial application for zero", () => {
	const findClosestToZero = closest(0)
	assertEquals(findClosestToZero([-10, -5, 3, 8]), 3)
	assertEquals(findClosestToZero([1, -1, 2, -2]), 1) // first encountered
})

Deno.test("closest - partial application for 100", () => {
	const findClosestTo100 = closest(100)
	assertEquals(findClosestTo100([50, 75, 125, 150]), 75)
	assertEquals(findClosestTo100([90, 95, 105, 110]), 95)
})

// Edge cases from JSDoc
Deno.test("closest - single element array", () => {
	assertEquals(closest(10)([5]), 5)
})

Deno.test("closest - empty array", () => {
	assertEquals(closest(5)([]), null)
})

Deno.test("closest - null input", () => {
	assertEquals(closest(5)(null), null)
})

Deno.test("closest - undefined input", () => {
	assertEquals(closest(5)(undefined), null)
})

// Non-numeric filtering from JSDoc
Deno.test("closest - filters out non-numeric values", () => {
	assertEquals(closest(5)([1, 3, NaN, 7, Infinity, 9]), 3)
})

Deno.test("closest - all non-numeric values", () => {
	assertEquals(closest(5)([NaN, Infinity, -Infinity]), null)
})

// Negative target from JSDoc
Deno.test("closest - negative target", () => {
	assertEquals(closest(-10)([-15, -8, -3, 0, 5]), -8)
})

// Year example from JSDoc
Deno.test("closest - find closest year", () => {
	const targetYear = 2020
	const years = [2015, 2018, 2022, 2025]
	assertEquals(closest(targetYear)(years), 2018)
})

// Additional edge cases
Deno.test("closest - all same values", () => {
	assertEquals(closest(10)([5, 5, 5, 5]), 5)
})

Deno.test("closest - negative and positive numbers", () => {
	assertEquals(closest(0)([-100, -50, 50, 100]), -50)
	assertEquals(closest(0)([-50, -100, 50, 100]), -50) // first encountered
})

Deno.test("closest - decimal target and values", () => {
	assertEquals(closest(3.14159)([3.14, 3.142, 3.1416, 3.15]), 3.1416)
})

Deno.test("closest - very small differences", () => {
	assertEquals(closest(1)([0.9999, 1.0001, 0.9998, 1.0002]), 0.9999)
})

Deno.test("closest - equal distance with negative numbers", () => {
	// -3 and 3 are both distance 3 from 0, -3 comes first
	assertEquals(closest(0)([-5, 5, -3, 3]), -3) // first encountered at distance 3
})

// Special number values
Deno.test("closest - handles negative zero", () => {
	const result = closest(0)([-0, 1, -1])
	assertEquals(Object.is(result, -0), true)
})

Deno.test("closest - target is Infinity", () => {
	// All finite numbers have infinite distance from Infinity
	// So it returns the first element
	assertEquals(closest(Infinity)([1, 100, 1000, 10000]), 1)
})

Deno.test("closest - target is -Infinity", () => {
	assertEquals(closest(-Infinity)([1, 100, 1000, 10000]), 1)
})

Deno.test("closest - target is NaN", () => {
	// NaN - any number = NaN, so all distances are NaN
	// The reduce will just return the first value
	const result = closest(NaN)([1, 2, 3])
	assertEquals(result, 1)
})

// Property-based tests
Deno.test("closest property - returns element from array or null", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true }),
			fc.array(fc.float({ noNaN: true })),
			(target, arr) => {
				const result = closest(target)(arr)
				return result === null || arr.includes(result)
			}
		)
	)
})

Deno.test("closest property - exact match is always returned", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true }),
			fc.array(fc.float({ noNaN: true })),
			(target, arr) => {
				if (arr.includes(target)) {
					return closest(target)(arr) === target
				}
				return true
			}
		)
	)
})

Deno.test("closest property - result has minimum distance", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true }),
			fc.array(fc.float({ noNaN: true }), { minLength: 1 }),
			(target, arr) => {
				const validNumbers = arr.filter(n => Number.isFinite(n))
				if (validNumbers.length === 0) return closest(target)(arr) === null
				
				const result = closest(target)(arr)
				const resultDistance = Math.abs(result! - target)
				
				return validNumbers.every(val => 
					Math.abs(val - target) >= resultDistance ||
					(Math.abs(val - target) === resultDistance && arr.indexOf(val) >= arr.indexOf(result!))
				)
			}
		)
	)
})

Deno.test("closest property - empty array returns null", () => {
	fc.assert(
		fc.property(
			fc.float(),
			(target) => {
				return closest(target)([]) === null
			}
		)
	)
})

Deno.test("closest property - single element always returned", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, noDefaultInfinity: true }),
			fc.float({ noNaN: true, noDefaultInfinity: true }),
			(target, value) => {
				if (!Number.isFinite(value)) {
					// Non-finite values are filtered out
					return closest(target)([value]) === null
				}
				return closest(target)([value]) === value
			}
		)
	)
})

Deno.test("closest property - filters non-finite numbers", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true }),
			fc.array(
				fc.oneof(
					fc.float({ noNaN: true }),
					fc.constant(NaN),
					fc.constant(Infinity),
					fc.constant(-Infinity)
				)
			),
			(target, arr) => {
				const result = closest(target)(arr)
				const finiteNumbers = arr.filter(n => Number.isFinite(n))
				
				if (finiteNumbers.length === 0) {
					return result === null
				} else {
					return Number.isFinite(result)
				}
			}
		)
	)
})

// Type safety
Deno.test("closest - maintains type safety", () => {
	const numbers: ReadonlyArray<number> = [1, 2, 3, 4]
	const result: number | null = closest(2.5)(numbers)
	assertEquals(result, 2)
})

// Immutability
Deno.test("closest - doesn't modify original array", () => {
	const original = [5, 2, 8, 1, 9]
	const result = closest(6)(original)
	assertEquals(result, 5)
	assertEquals(original, [5, 2, 8, 1, 9])
})

// Performance consideration - array isn't sorted
Deno.test("closest - works with unsorted arrays", () => {
	assertEquals(closest(5)([9, 1, 6, 3, 7]), 6)
	assertEquals(closest(5)([10, 2, 8, 4, 6]), 4)
})