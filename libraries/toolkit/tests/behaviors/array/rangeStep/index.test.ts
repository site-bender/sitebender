import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"
import fc from "npm:fast-check"

import rangeStep from "../../../../src/simple/array/rangeStep/index.ts"

describe("rangeStep", () => {
	describe("basic functionality", () => {
		it("should generate range with positive step", () => {
			assertEquals(rangeStep(1)(0)(5), [0, 1, 2, 3, 4])
			assertEquals(rangeStep(2)(0)(10), [0, 2, 4, 6, 8])
			assertEquals(rangeStep(3)(1)(10), [1, 4, 7])
			assertEquals(rangeStep(5)(0)(25), [0, 5, 10, 15, 20])
			assertEquals(rangeStep(5)(0)(20), [0, 5, 10, 15]) // stops before 20
		})

		it("should generate range with negative step", () => {
			assertEquals(rangeStep(-1)(5)(0), [5, 4, 3, 2, 1])
			assertEquals(rangeStep(-2)(10)(0), [10, 8, 6, 4, 2])
			assertEquals(rangeStep(-3)(10)(1), [10, 7, 4])
			assertEquals(rangeStep(-5)(20)(-5), [20, 15, 10, 5, 0])
			assertEquals(rangeStep(-5)(20)(0), [20, 15, 10, 5]) // stops before 0
		})

		it("should handle fractional steps", () => {
			assertEquals(rangeStep(0.5)(0)(3), [0, 0.5, 1, 1.5, 2, 2.5])
			assertEquals(rangeStep(0.25)(0)(1), [0, 0.25, 0.5, 0.75])
			assertEquals(rangeStep(-0.5)(2)(0), [2, 1.5, 1, 0.5])
		})

		it("should handle large steps", () => {
			assertEquals(rangeStep(100)(0)(300), [0, 100, 200])
			assertEquals(rangeStep(1000)(5000)(11000), [
				5000,
				6000,
				7000,
				8000,
				9000,
				10000,
			])
			assertEquals(rangeStep(1000)(5000)(10000), [5000, 6000, 7000, 8000, 9000]) // stops before 10000
			assertEquals(rangeStep(-100)(300)(100), [300, 200])
		})

		it("should stop before exceeding end", () => {
			assertEquals(rangeStep(3)(0)(10), [0, 3, 6, 9])
			assertEquals(rangeStep(3)(0)(9), [0, 3, 6]) // stops before 9
			assertEquals(rangeStep(4)(1)(10), [1, 5, 9])
			assertEquals(rangeStep(4)(1)(9), [1, 5]) // stops before 9
			assertEquals(rangeStep(-3)(10)(0), [10, 7, 4, 1]) // 1 > 0 so included
			assertEquals(rangeStep(-3)(10)(1), [10, 7, 4]) // stops before going below 1
		})
	})

	describe("edge cases", () => {
		it("should return empty array for zero step", () => {
			assertEquals(rangeStep(0)(0)(10), [])
			assertEquals(rangeStep(0)(5)(5), [])
			assertEquals(rangeStep(0)(-5)(5), [])
		})

		it("should return empty array when start equals end", () => {
			assertEquals(rangeStep(1)(5)(5), [])
			assertEquals(rangeStep(-1)(5)(5), [])
			assertEquals(rangeStep(10)(0)(0), [])
		})

		it("should return empty array for wrong direction", () => {
			assertEquals(rangeStep(1)(10)(5), []) // positive step but start > end
			assertEquals(rangeStep(-1)(5)(10), []) // negative step but start < end
			assertEquals(rangeStep(5)(100)(50), [])
			assertEquals(rangeStep(-5)(50)(100), [])
		})

		it("should handle single element ranges", () => {
			assertEquals(rangeStep(10)(0)(10), [0])
			assertEquals(rangeStep(1)(0)(1), [0])
			assertEquals(rangeStep(-10)(10)(0), [10])
		})

		it("should handle negative ranges", () => {
			assertEquals(rangeStep(1)(-5)(0), [-5, -4, -3, -2, -1])
			assertEquals(rangeStep(-1)(0)(-5), [0, -1, -2, -3, -4])
			assertEquals(rangeStep(2)(-10)(-4), [-10, -8, -6])
		})

		it("should handle Infinity", () => {
			assertEquals(rangeStep(1)(0)(Infinity), [])
			assertEquals(rangeStep(-1)(Infinity)(0), [])
			assertEquals(rangeStep(Infinity)(0)(10), [])
			assertEquals(rangeStep(-Infinity)(10)(0), [])
			assertEquals(rangeStep(1)(-Infinity)(0), [])
		})

		it("should handle NaN", () => {
			assertEquals(rangeStep(NaN)(0)(10), [])
			assertEquals(rangeStep(1)(NaN)(10), [])
			assertEquals(rangeStep(1)(0)(NaN), [])
			assertEquals(rangeStep(NaN)(NaN)(NaN), [])
		})

		it("should handle very small steps", () => {
			const result = rangeStep(0.001)(0)(0.005)
			assertEquals(result.length, 5)
			assertEquals(result[0], 0)
			assertEquals(Math.abs(result[4] - 0.004) < 0.0001, true)
			const result2 = rangeStep(0.0001)(0)(0.0003)
			assertEquals(result2.length, 3)
		})
	})

	describe("currying", () => {
		it("should support partial application with step", () => {
			const byTwos = rangeStep(2)
			assertEquals(byTwos(0)(10), [0, 2, 4, 6, 8])
			assertEquals(byTwos(1)(10), [1, 3, 5, 7, 9])

			const byNegativeOnes = rangeStep(-1)
			assertEquals(byNegativeOnes(5)(0), [5, 4, 3, 2, 1])
			assertEquals(byNegativeOnes(10)(5), [10, 9, 8, 7, 6])
		})

		it("should support partial application with step and start", () => {
			const fromZeroByTwos = rangeStep(2)(0)
			assertEquals(fromZeroByTwos(10), [0, 2, 4, 6, 8])
			assertEquals(fromZeroByTwos(5), [0, 2, 4])

			const fromTenByNegativeThrees = rangeStep(-3)(10)
			assertEquals(fromTenByNegativeThrees(0), [10, 7, 4, 1])
			assertEquals(fromTenByNegativeThrees(-5), [10, 7, 4, 1, -2])
		})

		it("should create reusable range generators", () => {
			const byTens = rangeStep(10)
			const decades = byTens(1900)
			assertEquals(decades(1940), [1900, 1910, 1920, 1930])
			assertEquals(decades(1950), [1900, 1910, 1920, 1930, 1940])
		})
	})

	describe("practical use cases", () => {
		it("should generate even numbers", () => {
			const evens = rangeStep(2)(0)(12)
			assertEquals(evens, [0, 2, 4, 6, 8, 10])
		})

		it("should generate odd numbers", () => {
			const odds = rangeStep(2)(1)(11)
			assertEquals(odds, [1, 3, 5, 7, 9])
		})

		it("should generate time intervals", () => {
			// Every 15 minutes from 0 up to but not including 60
			const intervals = rangeStep(15)(0)(60)
			assertEquals(intervals, [0, 15, 30, 45])
		})

		it("should generate countdown sequence", () => {
			const countdown = rangeStep(-1)(10)(0)
			assertEquals(countdown, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
		})

		it("should generate percentage values", () => {
			const percentages = rangeStep(0.1)(0)(1.1)
			assertEquals(percentages.length, 11)
			assertEquals(percentages[0], 0)
			assertEquals(percentages[10], 1)
		})

		it("should work with map for transformations", () => {
			const celsius = rangeStep(10)(-20)(41)
			const fahrenheit = celsius.map((c) => c * 9 / 5 + 32)
			assertEquals(fahrenheit, [-4, 14, 32, 50, 68, 86, 104])
		})
	})

	describe("property-based tests", () => {
		it("should never exceed end for positive step", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 100 }),
					fc.integer({ min: -100, max: 100 }),
					fc.integer({ min: 1, max: 200 }),
					(step, start, distance) => {
						const end = start + distance
						const result = rangeStep(step)(start)(end)
						return result.every((val) => val < end)
					},
				),
			)
		})

		it("should never go below end for negative step", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: -100, max: -1 }),
					fc.integer({ min: -100, max: 100 }),
					fc.integer({ min: 1, max: 200 }),
					(step, end, distance) => {
						const start = end + distance
						const result = rangeStep(step)(start)(end)
						return result.every((val) => val > end)
					},
				),
			)
		})

		it("should maintain consistent step between elements", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: -100, max: 100 }).filter((s) => s !== 0),
					fc.integer({ min: -100, max: 100 }),
					fc.integer({ min: -100, max: 100 }),
					(step, start, end) => {
						const result = rangeStep(step)(start)(end)
						if (result.length <= 1) return true
						return result.every((val, i) =>
							i === 0 || Math.abs(val - result[i - 1] - step) < 0.0001
						)
					},
				),
			)
		})

		it("should return empty array for zero step", () => {
			fc.assert(
				fc.property(
					fc.integer(),
					fc.integer(),
					(start, end) => {
						const result = rangeStep(0)(start)(end)
						return result.length === 0
					},
				),
			)
		})

		it("should return empty array when direction is wrong", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 100 }),
					fc.integer({ min: -100, max: 100 }),
					fc.integer({ min: 1, max: 100 }),
					(step, a, distance) => {
						const start = a + distance
						const end = a
						const result = rangeStep(step)(start)(end)
						return result.length === 0
					},
				),
			)
		})

		it("should always start with start value when non-empty", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: -100, max: 100 }).filter((s) => s !== 0),
					fc.integer({ min: -100, max: 100 }),
					fc.integer({ min: -100, max: 100 }),
					(step, start, end) => {
						const result = rangeStep(step)(start)(end)
						return result.length === 0 || result[0] === start
					},
				),
			)
		})
	})
})
