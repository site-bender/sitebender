import {
	assert,
	assertEquals,
	assertAlmostEquals
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "https://esm.sh/fast-check@3.15.0"

import softmax from "./index.ts"
import _shiftAndExp from "./_shiftAndExp/index.ts"
import _normalize from "./_normalize/index.ts"

//++ Tests for softmax activation function (multi-class probability distribution)
Deno.test("softmax", async (t) => {
	await t.step("converts logits to probability distribution", () => {
		const result = softmax([1, 2, 3])

		// Check individual values (approximately)
		assertAlmostEquals(result[0], 0.09003057317038046, 1e-10)
		assertAlmostEquals(result[1], 0.24472847105479764, 1e-10)
		assertAlmostEquals(result[2], 0.6652409557748219, 1e-10)

		// Check sum equals 1
		const sum = result.reduce((acc, val) => acc + val, 0)
		assertAlmostEquals(sum, 1, 1e-10)
	})

	await t.step("handles uniform inputs", () => {
		const result = softmax([0, 0, 0])

		// All values should be equal
		assertAlmostEquals(result[0], 1/3, 1e-10)
		assertAlmostEquals(result[1], 1/3, 1e-10)
		assertAlmostEquals(result[2], 1/3, 1e-10)

		// Check sum equals 1
		const sum = result.reduce((acc, val) => acc + val, 0)
		assertAlmostEquals(sum, 1, 1e-10)
	})

	await t.step("handles dominant value", () => {
		const result = softmax([10, 0, 0])

		// First value should dominate
		assert(result[0] > 0.999)
		assert(result[1] < 0.001)
		assert(result[2] < 0.001)

		// Check sum equals 1
		const sum = result.reduce((acc, val) => acc + val, 0)
		assertAlmostEquals(sum, 1, 1e-10)
	})

	await t.step("handles single element", () => {
		const result = softmax([5])
		assertEquals(result, [1])
	})

	await t.step("handles empty array", () => {
		const result = softmax([])
		assertEquals(result, [])
	})

	await t.step("handles null and undefined", () => {
		assertEquals(softmax(null), [])
		assertEquals(softmax(undefined), [])
	})

	await t.step("handles negative values", () => {
		const result = softmax([-1, -2, -3])

		// Should still sum to 1
		const sum = result.reduce((acc, val) => acc + val, 0)
		assertAlmostEquals(sum, 1, 1e-10)

		// Order should be preserved (-1 > -2 > -3)
		assert(result[0] > result[1])
		assert(result[1] > result[2])
	})

	await t.step("provides numerical stability for large values", () => {
		// Without the max subtraction trick, this would overflow
		const result = softmax([1000, 1001, 999])

		// Should still produce valid probabilities
		assert(result.every(x => x >= 0 && x <= 1))

		// Sum should be 1
		const sum = result.reduce((acc, val) => acc + val, 0)
		assertAlmostEquals(sum, 1, 1e-10)

		// 1001 should have highest probability
		assert(result[1] > result[0])
		assert(result[1] > result[2])
	})

	await t.step("sum always equals 1", () => {
		fc.assert(
			fc.property(
				fc.array(fc.float({ min: -100, max: 100, noNaN: true }), { minLength: 2, maxLength: 10 }),
				(values) => {
					const result = softmax(values)
					const sum = result.reduce((acc, val) => acc + val, 0)
					return Math.abs(sum - 1) < 1e-10
				}
			)
		)
	})

	await t.step("all outputs are in [0, 1]", () => {
		fc.assert(
			fc.property(
				fc.array(fc.float({ min: -100, max: 100, noNaN: true }), { minLength: 1, maxLength: 10 }),
				(values) => {
					const result = softmax(values)
					return result.every(x => x >= 0 && x <= 1)
				}
			)
		)
	})

	await t.step("preserves order", () => {
		fc.assert(
			fc.property(
				fc.array(fc.float({ min: -50, max: 50, noNaN: true }), { minLength: 2, maxLength: 10 }),
				(values) => {
					const result = softmax(values)

					// If input[i] > input[j], then output[i] > output[j]
					for (let i = 0; i < values.length; i++) {
						for (let j = i + 1; j < values.length; j++) {
							// Only check if there's a meaningful difference
							if (values[i] - values[j] > 1e-10) {
								if (!(result[i] > result[j])) {
									return false
								}
							}
						}
					}
					return true
				}
			)
		)
	})
})

//++ Tests for _shiftAndExp helper function
Deno.test("_shiftAndExp", async (t) => {
	await t.step("shifts and exponentiates correctly", () => {
		const shifter = _shiftAndExp(5)

		// Test that it correctly computes e^(x - maxValue)
		assertAlmostEquals(shifter(3), Math.exp(3 - 5), 1e-10)
		assertAlmostEquals(shifter(5), Math.exp(5 - 5), 1e-10)
		assertAlmostEquals(shifter(7), Math.exp(7 - 5), 1e-10)
	})

	await t.step("handles zero shift", () => {
		const shifter = _shiftAndExp(0)
		assertAlmostEquals(shifter(2), Math.exp(2), 1e-10)
		assertAlmostEquals(shifter(-1), Math.exp(-1), 1e-10)
	})

	await t.step("handles negative shift", () => {
		const shifter = _shiftAndExp(-3)
		assertAlmostEquals(shifter(2), Math.exp(2 - (-3)), 1e-10)
		assertAlmostEquals(shifter(-5), Math.exp(-5 - (-3)), 1e-10)
	})

	await t.step("provides numerical stability", () => {
		// Large positive shift prevents overflow
		const shifter = _shiftAndExp(1000)
		const result = shifter(1000)  // e^(1000-1000) = e^0 = 1
		assertEquals(result, 1)

		const result2 = shifter(999)  // e^(999-1000) = e^(-1)
		assertAlmostEquals(result2, Math.exp(-1), 1e-10)
	})

	await t.step("returns consistent results", () => {
		fc.assert(
			fc.property(
				fc.tuple(
					fc.double({ min: -100, max: 100, noNaN: true }),
					fc.double({ min: -100, max: 100, noNaN: true })
				),
				([maxValue, x]) => {
					const shifter = _shiftAndExp(maxValue)
					const result1 = shifter(x)
					const result2 = shifter(x)
					assertEquals(result1, result2)
				}
			)
		)
	})
})

//++ Tests for _normalize helper function
Deno.test("_normalize", async (t) => {
	await t.step("normalizes by sum correctly", () => {
		const normalizer = _normalize(10)

		assertEquals(normalizer(5), 0.5)
		assertEquals(normalizer(2), 0.2)
		assertEquals(normalizer(10), 1)
		assertEquals(normalizer(0), 0)
	})

	await t.step("handles sum of 1", () => {
		const normalizer = _normalize(1)
		assertEquals(normalizer(0.5), 0.5)
		assertEquals(normalizer(1), 1)
		assertEquals(normalizer(0.25), 0.25)
	})

	await t.step("handles fractional sums", () => {
		const normalizer = _normalize(4.5)
		assertAlmostEquals(normalizer(1.5), 1.5 / 4.5, 1e-10)
		assertAlmostEquals(normalizer(3), 3 / 4.5, 1e-10)
	})

	await t.step("handles large sums", () => {
		const normalizer = _normalize(1e10)
		assertAlmostEquals(normalizer(1e9), 0.1, 1e-10)
		assertAlmostEquals(normalizer(5e9), 0.5, 1e-10)
	})

	await t.step("preserves proportions", () => {
		fc.assert(
			fc.property(
				fc.tuple(
					fc.double({ min: 0.1, max: 1000, noNaN: true }),
					fc.array(fc.double({ min: 0.001, max: 100, noNaN: true }), { minLength: 2, maxLength: 10 })
				),
				([sum, values]) => {
					const normalizer = _normalize(sum)
					const normalized = values.map(normalizer)

					// Check that proportions are preserved
					for (let i = 0; i < values.length - 1; i++) {
						if (values[i] > 0.001 && values[i + 1] > 0.001) {
							const originalRatio = values[i] / values[i + 1]
							const normalizedRatio = normalized[i] / normalized[i + 1]
							// Use relative tolerance for floating point comparison
							const tolerance = Math.abs(originalRatio) * 1e-10
							assertAlmostEquals(originalRatio, normalizedRatio, Math.max(tolerance, 1e-10))
						}
					}
				}
			)
		)
	})

	await t.step("returns consistent results", () => {
		fc.assert(
			fc.property(
				fc.tuple(
					fc.double({ min: 0.1, max: 1000, noNaN: true }),
					fc.double({ min: 0, max: 100, noNaN: true })
				),
				([sum, value]) => {
					const normalizer = _normalize(sum)
					const result1 = normalizer(value)
					const result2 = normalizer(value)
					assertEquals(result1, result2)
				}
			)
		)
	})
})