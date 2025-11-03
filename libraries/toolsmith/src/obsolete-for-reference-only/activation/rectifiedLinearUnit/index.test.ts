import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import fc from "https://esm.sh/fast-check@3.15.0"

import rectifiedLinearUnit from "./index.ts"

//++ Tests for ReLU activation function (max(0, x))
Deno.test("rectifiedLinearUnit", async (t) => {
	await t.step("returns positive values unchanged", () => {
		assertEquals(rectifiedLinearUnit(5), 5)
		assertEquals(rectifiedLinearUnit(10), 10)
		assertEquals(rectifiedLinearUnit(0.5), 0.5)
		assertEquals(rectifiedLinearUnit(100), 100)
		assertEquals(rectifiedLinearUnit(1e-10), 1e-10)
	})

	await t.step("returns zero for negative values", () => {
		assertEquals(rectifiedLinearUnit(-1), 0)
		assertEquals(rectifiedLinearUnit(-5), 0)
		assertEquals(rectifiedLinearUnit(-10), 0)
		assertEquals(rectifiedLinearUnit(-0.5), 0)
		assertEquals(rectifiedLinearUnit(-100), 0)
		assertEquals(rectifiedLinearUnit(-1e-10), 0)
	})

	await t.step("handles zero correctly", () => {
		assertEquals(rectifiedLinearUnit(0), 0)
	})

	await t.step("handles null and undefined", () => {
		assertEquals(rectifiedLinearUnit(null), NaN)
		assertEquals(rectifiedLinearUnit(undefined), NaN)
	})

	await t.step("handles edge cases", () => {
		assertEquals(rectifiedLinearUnit(Infinity), Infinity)
		assertEquals(rectifiedLinearUnit(-Infinity), 0)
		assertEquals(rectifiedLinearUnit(NaN), NaN)
	})

	await t.step("is idempotent for positive values", () => {
		fc.assert(
			fc.property(fc.float({ min: 0, max: 1000, noNaN: true }), (x) => {
				const once = rectifiedLinearUnit(x)
				const twice = rectifiedLinearUnit(once)
				return once === twice
			}),
		)
	})

	await t.step("output is never negative", () => {
		fc.assert(
			fc.property(fc.float({ noNaN: true, noDefaultInfinity: true }), (x) => {
				const result = rectifiedLinearUnit(x)
				return result >= 0
			}),
		)
	})

	await t.step("preserves order", () => {
		fc.assert(
			fc.property(
				fc.float({ min: -100, max: 100, noNaN: true }),
				fc.float({ min: -100, max: 100, noNaN: true }),
				(x1, x2) => {
					if (x1 <= x2) {
						return rectifiedLinearUnit(x1) <= rectifiedLinearUnit(x2)
					}
					return true
				},
			),
		)
	})

	await t.step("acts as identity for positive inputs", () => {
		fc.assert(
			fc.property(
				fc.float({
					min: Math.fround(0.001),
					max: Math.fround(1000),
					noNaN: true,
				}),
				(x) => {
					return rectifiedLinearUnit(x) === x
				},
			),
		)
	})

	await t.step("acts as zero function for negative inputs", () => {
		fc.assert(
			fc.property(
				fc.float({
					min: Math.fround(-1000),
					max: Math.fround(-0.001),
					noNaN: true,
				}),
				(x) => {
					return rectifiedLinearUnit(x) === 0
				},
			),
		)
	})

	await t.step("derivative is 0 or 1", () => {
		// Test that the function behaves like it has a derivative of 0 or 1
		fc.assert(
			fc.property(
				fc.float({
					min: Math.fround(-100),
					max: Math.fround(100),
					noNaN: true,
				}),
				fc.float({
					min: Math.fround(0.001),
					max: Math.fround(0.1),
					noNaN: true,
				}),
				(x, epsilon) => {
					// Skip test near x = 0 where derivative is undefined
					if (Math.abs(x) < 0.01) return true

					const y1 = rectifiedLinearUnit(x)
					const y2 = rectifiedLinearUnit(x + epsilon)
					const slope = (y2 - y1) / epsilon

					// Slope should be approximately 0 or 1
					return Math.abs(slope) < 0.01 || Math.abs(slope - 1) < 0.01
				},
			),
		)
	})

	await t.step("max property: ReLU(x) = max(0, x)", () => {
		fc.assert(
			fc.property(fc.float({ noNaN: true, noDefaultInfinity: true }), (x) => {
				const reluResult = rectifiedLinearUnit(x)
				const maxResult = Math.max(0, x)
				return reluResult === maxResult ||
					(isNaN(reluResult) && isNaN(maxResult))
			}),
		)
	})
})
