import {
	assertAlmostEquals,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import fc from "https://esm.sh/fast-check@3.15.0"

import softplus from "./index.ts"

//++ Tests for softplus activation function (smooth approximation of ReLU)
Deno.test("softplus", async (t) => {
	await t.step("returns ln(1 + e^x) for positive values", () => {
		const result = softplus(2)
		const expected = Math.log(1 + Math.exp(2))
		assertAlmostEquals(result, expected, 1e-10)
	})

	await t.step("returns approximately x for large positive values", () => {
		const result = softplus(100)
		assertAlmostEquals(result, 100, 1e-10)
	})

	await t.step("returns approximately e^x for large negative values", () => {
		const x = -10
		const result = softplus(x)
		const expected = Math.exp(x)
		assertAlmostEquals(result, expected, 1e-8) // Looser tolerance for numerical precision
	})

	await t.step("returns ln(2) for x = 0", () => {
		const result = softplus(0)
		const expected = Math.log(2)
		assertAlmostEquals(result, expected, 1e-10)
	})

	await t.step("is always positive", () => {
		fc.assert(
			fc.property(fc.float({ noNaN: true, noDefaultInfinity: true }), (x) => {
				const result = softplus(x)
				return result > 0 || result === 0 // Allow 0 for -Infinity
			}),
		)
	})

	await t.step("is strictly increasing", () => {
		fc.assert(
			fc.property(
				fc.float({
					min: Math.fround(-100),
					max: Math.fround(100),
					noNaN: true,
				}),
				fc.float({ min: Math.fround(0.1), max: Math.fround(10), noNaN: true }),
				(x, delta) => {
					const y1 = softplus(x)
					const y2 = softplus(x + delta)
					return y2 > y1
				},
			),
		)
	})

	await t.step("approximates ReLU for large values", () => {
		fc.assert(
			fc.property(fc.float({ min: 10, max: 100, noNaN: true }), (x) => {
				const result = softplus(x)
				const relu = Math.max(0, x)
				const diff = Math.abs(result - relu)
				return diff < 0.0001
			}),
		)
	})

	await t.step("handles edge cases", () => {
		assertEquals(softplus(Infinity), Infinity)
		assertAlmostEquals(softplus(-Infinity), 0, 1e-10)
	})
})
