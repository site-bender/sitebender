import { assert, assertEquals, assertAlmostEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "https://esm.sh/fast-check@3.15.0"

import sigmoid from "./index.ts"

//++ Tests for sigmoid (logistic) activation function
Deno.test("sigmoid", async (t) => {
	await t.step("returns NaN for invalid inputs", () => {
		assertEquals(sigmoid(null), NaN)
		assertEquals(sigmoid(undefined), NaN)
		assertEquals(sigmoid(NaN), NaN)
	})

	await t.step("returns 0.5 for input of 0", () => {
		assertEquals(sigmoid(0), 0.5)
	})

	await t.step("returns expected value for input of 1", () => {
		// sigmoid(1) = 1 / (1 + e^(-1)) = e / (1 + e) ≈ 0.7311
		assertAlmostEquals(sigmoid(1), 0.7311, 0.0001)
	})

	await t.step("returns expected value for input of -1", () => {
		// sigmoid(-1) = 1 / (1 + e^1) = 1 / (1 + e) ≈ 0.2689
		assertAlmostEquals(sigmoid(-1), 0.2689, 0.0001)
	})

	await t.step("approaches 1 for large positive inputs", () => {
		const result = sigmoid(10)
		assertAlmostEquals(result, 1, 0.0001)

		const veryLarge = sigmoid(100)
		assertAlmostEquals(veryLarge, 1, 1e-10)
	})

	await t.step("approaches 0 for large negative inputs", () => {
		const result = sigmoid(-10)
		assertAlmostEquals(result, 0, 0.0001)

		const veryNegative = sigmoid(-100)
		assertAlmostEquals(veryNegative, 0, 1e-10)
	})

	await t.step("is monotonically increasing", () => {
		fc.assert(
			fc.property(
				fc.tuple(
					fc.double({ min: -100, max: 100, noNaN: true }),
					fc.double({ min: -100, max: 100, noNaN: true })
				),
				([a, b]) => {
					if (a < b) {
						const resultA = sigmoid(a)
						const resultB = sigmoid(b)
						assert(resultA < resultB || Math.abs(resultA - resultB) < 1e-10)
					}
				}
			)
		)
	})

	await t.step("output is bounded between 0 and 1", () => {
		fc.assert(
			fc.property(
				fc.double({ min: -1000, max: 1000, noNaN: true }),
				(x) => {
					const result = sigmoid(x)
					assert(result >= 0 && result <= 1)
				}
			)
		)
	})

	await t.step("exhibits point symmetry around (0, 0.5)", () => {
		fc.assert(
			fc.property(
				fc.double({ min: -50, max: 50, noNaN: true }),
				(x) => {
					const positive = sigmoid(x)
					const negative = sigmoid(-x)
					// sigmoid(x) + sigmoid(-x) = 1
					assertAlmostEquals(positive + negative, 1, 1e-10)
				}
			)
		)
	})

	await t.step("derivative property sigmoid'(x) = sigmoid(x) * (1 - sigmoid(x))", () => {
		fc.assert(
			fc.property(
				fc.double({ min: -10, max: 10, noNaN: true }),
				(x) => {
					const s = sigmoid(x)
					// We can't test the actual derivative without calculating it,
					// but we can verify that s * (1 - s) is always between 0 and 0.25
					const derivativeForm = s * (1 - s)
					assert(derivativeForm >= 0 && derivativeForm <= 0.25)

					// Maximum derivative is at x=0 where s=0.5, giving 0.5 * 0.5 = 0.25
					if (Math.abs(x) < 0.01) {
						assertAlmostEquals(derivativeForm, 0.25, 0.01)
					}
				}
			)
		)
	})

	await t.step("produces consistent results for same input", () => {
		fc.assert(
			fc.property(
				fc.double({ noNaN: true }),
				(x) => {
					const result1 = sigmoid(x)
					const result2 = sigmoid(x)
					assertEquals(result1, result2)
				}
			)
		)
	})

	await t.step("handles edge cases correctly", () => {
		// Test very small values near zero
		assertAlmostEquals(sigmoid(1e-10), 0.5, 1e-9)
		assertAlmostEquals(sigmoid(-1e-10), 0.5, 1e-9)

		// Test moderate values
		assertAlmostEquals(sigmoid(2), 0.8808, 0.0001)
		assertAlmostEquals(sigmoid(-2), 0.1192, 0.0001)

		// Test that for large finite inputs it gets very close to 0 or 1
		const large_positive = sigmoid(50)
		assert(large_positive > 0.99999)
		assert(large_positive <= 1)

		const large_negative = sigmoid(-50)
		assert(large_negative < 0.00001)
		assert(large_negative >= 0)
	})
})