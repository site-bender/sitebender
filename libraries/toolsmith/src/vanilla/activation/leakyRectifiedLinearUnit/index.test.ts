import {
	assertEquals,
	assertAlmostEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import fc from "https://esm.sh/fast-check@3.15.0"

import leakyRectifiedLinearUnit from "./index.ts"

//++ Tests for leaky ReLU activation function with configurable negative slope
Deno.test("leakyRectifiedLinearUnit", async (t) => {
	await t.step("returns positive values unchanged", () => {
		const leakyRelu = leakyRectifiedLinearUnit(0.01)
		assertEquals(leakyRelu(5), 5)
		assertEquals(leakyRelu(10), 10)
		assertEquals(leakyRelu(0.5), 0.5)
	})

	await t.step("scales negative values by alpha", () => {
		const leakyRelu = leakyRectifiedLinearUnit(0.01)
		assertAlmostEquals(leakyRelu(-5), -0.05, 1e-10)
		assertAlmostEquals(leakyRelu(-10), -0.1, 1e-10)
		assertAlmostEquals(leakyRelu(-100), -1, 1e-10)
	})

	await t.step("handles zero correctly", () => {
		const leakyRelu = leakyRectifiedLinearUnit(0.01)
		assertEquals(leakyRelu(0), 0)
	})

	await t.step("works with different alpha values", () => {
		const leakyRelu1 = leakyRectifiedLinearUnit(0.1)
		assertAlmostEquals(leakyRelu1(-10), -1, 1e-10)

		const leakyRelu2 = leakyRectifiedLinearUnit(0.2)
		assertAlmostEquals(leakyRelu2(-10), -2, 1e-10)

		const leakyRelu3 = leakyRectifiedLinearUnit(0.5)
		assertAlmostEquals(leakyRelu3(-10), -5, 1e-10)
	})

	await t.step("handles alpha = 0 (standard ReLU)", () => {
		const relu = leakyRectifiedLinearUnit(0)
		assertEquals(relu(5), 5)
		assertEquals(relu(-5), 0)
		assertEquals(relu(0), 0)
	})

	await t.step("handles alpha = 1 (identity function)", () => {
		const identity = leakyRectifiedLinearUnit(1)
		assertEquals(identity(5), 5)
		assertEquals(identity(-5), -5)
		assertEquals(identity(0), 0)
	})

	await t.step("handles negative alpha", () => {
		const leakyRelu = leakyRectifiedLinearUnit(-0.1)
		assertEquals(leakyRelu(5), 5)
		assertAlmostEquals(leakyRelu(-10), 1, 1e-10)  // -10 * -0.1 = 1
	})

	await t.step("handles null and undefined", () => {
		const leakyRelu = leakyRectifiedLinearUnit(0.01)
		assertEquals(leakyRelu(null), NaN)
		assertEquals(leakyRelu(undefined), NaN)

		const invalidRelu1 = leakyRectifiedLinearUnit(null)
		assertEquals(invalidRelu1(5), NaN)

		const invalidRelu2 = leakyRectifiedLinearUnit(undefined)
		assertEquals(invalidRelu2(5), NaN)
	})

	await t.step("handles edge cases", () => {
		const leakyRelu = leakyRectifiedLinearUnit(0.01)
		assertEquals(leakyRelu(Infinity), Infinity)
		assertEquals(leakyRelu(-Infinity), -Infinity)
		assertEquals(leakyRelu(NaN), NaN)
	})

	await t.step("is continuous at x = 0", () => {
		fc.assert(
			fc.property(fc.float({ min: 0, max: 1, noNaN: true }), (alpha) => {
				const leakyRelu = leakyRectifiedLinearUnit(alpha)

				// Test continuity around 0
				const epsilon = 1e-10
				const leftLimit = leakyRelu(-epsilon)
				const rightLimit = leakyRelu(epsilon)
				const atZero = leakyRelu(0)

				// Should approach 0 from both sides
				return Math.abs(leftLimit - 0) < 1e-8 &&
				       Math.abs(rightLimit - 0) < 1e-8 &&
				       atZero === 0
			})
		)
	})

	await t.step("preserves order for positive alpha", () => {
		fc.assert(
			fc.property(
				fc.float({ min: 0, max: 1, noNaN: true }),
				fc.float({ min: -100, max: 100, noNaN: true }),
				fc.float({ min: -100, max: 100, noNaN: true }),
				(alpha, x1, x2) => {
					const leakyRelu = leakyRectifiedLinearUnit(alpha)

					if (x1 < x2) {
						return leakyRelu(x1) <= leakyRelu(x2)
					}
					return true
				}
			)
		)
	})

	await t.step("partial application is consistent", () => {
		fc.assert(
			fc.property(
				fc.float({ min: -1, max: 1, noNaN: true }),
				fc.float({ min: -100, max: 100, noNaN: true }),
				(alpha, x) => {
					const leakyRelu = leakyRectifiedLinearUnit(alpha)
					const result1 = leakyRelu(x)
					const result2 = leakyRelu(x)

					// Both NaN or both equal
					return (isNaN(result1) && isNaN(result2)) || result1 === result2
				}
			)
		)
	})
})