import {
	assert,
	assertAlmostEquals,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import fc from "https://esm.sh/fast-check@3.15.0"

import swish from "./index.ts"

//++ Tests for swish activation function (x * sigmoid(βx))
Deno.test("swish", async (t) => {
	await t.step("computes x * sigmoid(βx) correctly", () => {
		const swish1 = swish(1)

		// Test specific values
		assertEquals(swish1(0), 0) // 0 * sigmoid(0) = 0 * 0.5 = 0

		// swish(1)(1) = 1 * sigmoid(1) = 1 * (1/(1+e^-1))
		const expected1 = 1 / (1 + Math.exp(-1))
		assertAlmostEquals(swish1(1), expected1, 1e-10)

		// swish(1)(2) = 2 * sigmoid(2)
		const expected2 = 2 / (1 + Math.exp(-2))
		assertAlmostEquals(swish1(2), expected2, 1e-10)

		// swish(1)(-1) = -1 * sigmoid(-1)
		const expected3 = -1 / (1 + Math.exp(1))
		assertAlmostEquals(swish1(-1), expected3, 1e-10)
	})

	await t.step("handles different beta values", () => {
		// Beta = 0.5 (smoother)
		const swish05 = swish(0.5)
		const result05 = swish05(2)
		const expected05 = 2 * (1 / (1 + Math.exp(-0.5 * 2)))
		assertAlmostEquals(result05, expected05, 1e-10)

		// Beta = 2 (sharper)
		const swish2 = swish(2)
		const result2 = swish2(2)
		const expected2 = 2 * (1 / (1 + Math.exp(-2 * 2)))
		assertAlmostEquals(result2, expected2, 1e-10)

		// Beta = 0 gives x/2
		const swish0 = swish(0)
		assertAlmostEquals(swish0(4), 2, 1e-10) // 4 * sigmoid(0) = 4 * 0.5
		assertAlmostEquals(swish0(10), 5, 1e-10)
		assertAlmostEquals(swish0(-6), -3, 1e-10)
	})

	await t.step("approaches x for large positive x", () => {
		const swish1 = swish(1)
		assertAlmostEquals(swish1(10), 10, 0.001)
		assertAlmostEquals(swish1(20), 20, 1e-7)
		assertAlmostEquals(swish1(100), 100, 1e-10)
	})

	await t.step("approaches 0 for large negative x", () => {
		const swish1 = swish(1)
		assertAlmostEquals(swish1(-10), 0, 0.001)
		assertAlmostEquals(swish1(-20), 0, 1e-7)
		assertAlmostEquals(swish1(-100), 0, 1e-10)
	})

	await t.step("handles negative beta", () => {
		const swishNeg = swish(-1)
		// swish(-1)(x) = x * sigmoid(-x)
		const result = swishNeg(2)
		const expected = 2 * (1 / (1 + Math.exp(2)))
		assertAlmostEquals(result, expected, 1e-10)
	})

	await t.step("handles beta = 1 (standard swish)", () => {
		const swish1 = swish(1)
		// Should be smooth and non-linear
		assert(swish1(0.5) !== 0.5) // Not linear
		assert(swish1(0.5) > 0) // Positive for positive input
		assert(swish1(-0.5) < 0) // Negative for negative input
	})

	await t.step("handles null and undefined", () => {
		const swish1 = swish(1)
		assertEquals(swish1(null), NaN)
		assertEquals(swish1(undefined), NaN)

		const invalidSwish1 = swish(null)
		assertEquals(invalidSwish1(5), NaN)

		const invalidSwish2 = swish(undefined)
		assertEquals(invalidSwish2(5), NaN)
	})

	await t.step("handles edge cases", () => {
		const swish1 = swish(1)
		assertEquals(swish1(Infinity), Infinity)
		assertEquals(swish1(-Infinity), NaN) // -Infinity * sigmoid(-Infinity) = -Infinity * 0 = NaN
		assertEquals(swish1(NaN), NaN)

		// Beta edge cases
		const swishInf = swish(Infinity)
		assertEquals(swishInf(5), 5) // 5 * sigmoid(∞) = 5 * 1
		assertEquals(swishInf(-5), 0) // -5 * sigmoid(-∞) = -5 * 0

		const swishNegInf = swish(-Infinity)
		assertEquals(swishNegInf(5), 0) // 5 * sigmoid(-∞) = 5 * 0 = 0
		assertEquals(swishNegInf(-5), -5) // -5 * sigmoid(∞) = -5 * 1 = -5
	})

	await t.step("is smooth and differentiable", () => {
		fc.assert(
			fc.property(
				fc.float({ min: Math.fround(0.1), max: Math.fround(2), noNaN: true }),
				fc.float({ min: Math.fround(-5), max: Math.fround(5), noNaN: true }),
				fc.float({
					min: Math.fround(0.0001),
					max: Math.fround(0.001),
					noNaN: true,
				}),
				(beta, x, epsilon) => {
					const swishBeta = swish(beta)

					// Check smoothness (small change in x → small change in output)
					const y1 = swishBeta(x)
					const y2 = swishBeta(x + epsilon)
					const change = Math.abs(y2 - y1)

					// Change should be proportional to epsilon
					return change < 10 * epsilon
				},
			),
		)
	})

	await t.step("bounded by linear function", () => {
		fc.assert(
			fc.property(
				fc.float({ min: Math.fround(0.1), max: Math.fround(2), noNaN: true }),
				fc.float({ min: Math.fround(-10), max: Math.fround(10), noNaN: true }),
				(beta, x) => {
					const result = swish(beta)(x)

					// Swish is bounded by x for positive x, and by 0 for very negative x
					if (x > 0) {
						return result <= x && result >= 0
					} else {
						// For negative x, result is between approximately beta*x and 0
						return result <= 0 && result >= x
					}
				},
			),
		)
	})

	await t.step("partial application is consistent", () => {
		fc.assert(
			fc.property(
				fc.float({ min: Math.fround(-2), max: Math.fround(2), noNaN: true }),
				fc.float({ min: Math.fround(-10), max: Math.fround(10), noNaN: true }),
				(beta, x) => {
					const swishBeta = swish(beta)
					const result1 = swishBeta(x)
					const result2 = swishBeta(x)

					// Both NaN or both equal
					return (isNaN(result1) && isNaN(result2)) || result1 === result2
				},
			),
		)
	})

	await t.step("non-monotonic for beta > 0", () => {
		// Swish has a local minimum at some negative x for beta > 0
		const swish1 = swish(1)

		// Find approximate minimum (should be around x ≈ -1.278)
		const minX = -1.278
		const minY = swish1(minX)

		// Values on either side should be greater
		assert(swish1(minX - 0.5) > minY)
		assert(swish1(minX + 0.5) > minY)
	})
})
