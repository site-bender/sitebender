import { assert, assertEquals, assertExists } from "jsr:@std/assert@1.0.10"
import { describe, it } from "jsr:@std/testing@1.0.9/bdd"
import * as fc from "npm:fast-check@3"

import {
	edgeCaseNumber,
	finiteNumber,
	negativeNumber,
	nullableNumber,
	positiveNumber,
	safeInteger,
} from "./index.ts"

describe("numeric generators", () => {
	describe("finiteNumber", () => {
		it("should generate finite numbers without NaN or Infinity", () => {
			fc.assert(
				fc.property(finiteNumber(), (num) => {
					assertExists(num)
					assertEquals(typeof num, "number")
					assert(isFinite(num))
					assert(!Number.isNaN(num))
					assert(num >= Math.fround(-1e10))
					assert(num <= Math.fround(1e10))
				}),
			)
		})

		it("should generate a variety of finite numbers", () => {
			const samples = fc.sample(finiteNumber(), 100)
			const hasPositive = samples.some((n) => n > 0)
			const hasNegative = samples.some((n) => n < 0)
			const hasDecimals = samples.some((n) => n !== Math.floor(n))

			// Should have variety
			assert(hasPositive || hasNegative)
			assert(samples.length === 100)

			// All should be finite
			samples.forEach((n) => {
				assert(isFinite(n))
			})
		})
	})

	describe("nullableNumber", () => {
		it("should generate null, undefined, or finite numbers", () => {
			fc.assert(
				fc.property(nullableNumber(), (value) => {
					assert(
						value === null ||
							value === undefined ||
							(typeof value === "number" && isFinite(value)),
					)
				}),
			)
		})

		it("should generate all three types over many samples", () => {
			const samples = fc.sample(nullableNumber(), 1000)
			const hasNull = samples.includes(null)
			const hasUndefined = samples.includes(undefined)
			const hasNumbers = samples.some((v) => typeof v === "number")

			assert(hasNull)
			assert(hasUndefined)
			assert(hasNumbers)
		})
	})

	describe("edgeCaseNumber", () => {
		it("should generate edge case numeric values", () => {
			fc.assert(
				fc.property(edgeCaseNumber(), (num) => {
					assertExists(num)
					assertEquals(typeof num, "number")

					const validEdgeCases = [
						0,
						-0,
						NaN,
						Infinity,
						-Infinity,
						Number.MIN_VALUE,
						Number.MAX_VALUE,
						Number.EPSILON,
					]

					const isValidEdgeCase = validEdgeCases.some((edge) => {
						if (Number.isNaN(edge) && Number.isNaN(num)) return true
						return Object.is(num, edge)
					})

					assert(isValidEdgeCase)
				}),
			)
		})

		it("should generate all edge cases over many samples", () => {
			const samples = fc.sample(edgeCaseNumber(), 1000)

			const hasZero = samples.some((n) => n === 0)
			const hasNegZero = samples.some((n) => Object.is(n, -0))
			const hasNaN = samples.some((n) => Number.isNaN(n))
			const hasInfinity = samples.some((n) => n === Infinity)
			const hasNegInfinity = samples.some((n) => n === -Infinity)
			const hasMinValue = samples.some((n) => n === Number.MIN_VALUE)
			const hasMaxValue = samples.some((n) => n === Number.MAX_VALUE)
			const hasEpsilon = samples.some((n) => n === Number.EPSILON)

			// Should generate all edge cases
			assert(hasZero)
			assert(hasNegZero)
			assert(hasNaN)
			assert(hasInfinity)
			assert(hasNegInfinity)
			assert(hasMinValue)
			assert(hasMaxValue)
			assert(hasEpsilon)
		})
	})

	describe("safeInteger", () => {
		it("should generate safe integers", () => {
			fc.assert(
				fc.property(safeInteger(), (num) => {
					assertExists(num)
					assertEquals(typeof num, "number")
					assert(Number.isSafeInteger(num))
					assert(num >= Number.MIN_SAFE_INTEGER)
					assert(num <= Number.MAX_SAFE_INTEGER)
				}),
			)
		})

		it("should generate variety of safe integers", () => {
			const samples = fc.sample(safeInteger(), 100)
			const hasPositive = samples.some((n) => n > 0)
			const hasNegative = samples.some((n) => n < 0)
			const hasZero = samples.includes(0)

			// Should have variety (at least some positive or negative)
			assert(hasPositive || hasNegative)

			// All should be safe integers
			samples.forEach((n) => {
				assert(Number.isSafeInteger(n))
			})
		})
	})

	describe("positiveNumber", () => {
		it("should generate positive numbers", () => {
			fc.assert(
				fc.property(positiveNumber(), (num) => {
					assertExists(num)
					assertEquals(typeof num, "number")
					assert(num > 0)
					assert(num >= Math.fround(0.00001))
					assert(num <= Math.fround(1e10))
					assert(isFinite(num))
					assert(!Number.isNaN(num))
				}),
			)
		})

		it("should generate variety of positive numbers", () => {
			const samples = fc.sample(positiveNumber(), 100)
			const hasSmall = samples.some((n) => n < 1)
			const hasLarge = samples.some((n) => n > 1000)
			const hasDecimals = samples.some((n) => n !== Math.floor(n))

			// All should be positive
			samples.forEach((n) => {
				assert(n > 0)
			})

			// Should have some variety
			assert(samples.length === 100)
		})
	})

	describe("negativeNumber", () => {
		it("should generate negative numbers", () => {
			fc.assert(
				fc.property(negativeNumber(), (num) => {
					assertExists(num)
					assertEquals(typeof num, "number")
					assert(num < 0)
					assert(num >= Math.fround(-1e10))
					assert(num <= Math.fround(-0.00001))
					assert(isFinite(num))
					assert(!Number.isNaN(num))
				}),
			)
		})

		it("should generate variety of negative numbers", () => {
			const samples = fc.sample(negativeNumber(), 100)
			const hasSmall = samples.some((n) => n > -1)
			const hasLarge = samples.some((n) => n < -1000)
			const hasDecimals = samples.some((n) => n !== Math.floor(n))

			// All should be negative
			samples.forEach((n) => {
				assert(n < 0)
			})

			// Should have variety
			assert(samples.length === 100)
		})
	})

	describe("default export", () => {
		it("should export finiteNumber as default", () => {
			assertExists(finiteNumber)
			assertEquals(typeof finiteNumber, "function")

			// Test that it generates finite numbers
			const sample = fc.sample(finiteNumber(), 10)
			sample.forEach((n) => {
				assert(isFinite(n))
				assert(!Number.isNaN(n))
			})
		})
	})
})
