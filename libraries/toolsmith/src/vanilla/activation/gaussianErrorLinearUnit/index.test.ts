import { assert, assertEquals, assertAlmostEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "https://esm.sh/fast-check@3.15.0"

import gaussianErrorLinearUnit from "./index.ts"

//++ Tests for Gaussian Error Linear Unit (GELU) activation function
Deno.test("gaussianErrorLinearUnit", async (t) => {
	await t.step("returns NaN for invalid inputs", () => {
		assertEquals(gaussianErrorLinearUnit(null), NaN)
		assertEquals(gaussianErrorLinearUnit(undefined), NaN)
		assertEquals(gaussianErrorLinearUnit(NaN), NaN)
	})

	await t.step("returns 0 for input of 0", () => {
		assertEquals(gaussianErrorLinearUnit(0), 0)
	})

	await t.step("returns approximately 0.8412 for input of 1", () => {
		assertAlmostEquals(gaussianErrorLinearUnit(1), 0.8412, 0.0001)
	})

	await t.step("returns approximately -0.1588 for input of -1", () => {
		assertAlmostEquals(gaussianErrorLinearUnit(-1), -0.1588, 0.0001)
	})

	await t.step("approaches input value for large positive inputs", () => {
		const largeValue = 10
		const result = gaussianErrorLinearUnit(largeValue)
		assertAlmostEquals(result, largeValue, 0.001)
	})

	await t.step("approaches 0 for large negative inputs", () => {
		const result = gaussianErrorLinearUnit(-10)
		assertAlmostEquals(result, 0, 0.001)
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
						const resultA = gaussianErrorLinearUnit(a)
						const resultB = gaussianErrorLinearUnit(b)
						// Account for floating point precision issues
						assert(resultA <= resultB + 1e-10)
					}
				}
			)
		)
	})

	await t.step("output is bounded by input for positive values", () => {
		fc.assert(
			fc.property(
				fc.double({ min: 0, max: 100, noNaN: true }),
				(x) => {
					const result = gaussianErrorLinearUnit(x)
					assert(result <= x)
					assert(result >= 0)
				}
			)
		)
	})

	await t.step("output sign matches input sign", () => {
		fc.assert(
			fc.property(
				fc.double({ min: -100, max: 100, noNaN: true }),
				(x) => {
					const result = gaussianErrorLinearUnit(x)
					if (x > 1e-10) {
						assert(result > -1e-10, `Expected positive result for x=${x}, got ${result}`)
					} else if (x < -1e-10) {
						assert(result < 1e-10, `Expected negative result for x=${x}, got ${result}`)
					} else {
						// Near zero, result should be very small
						assertAlmostEquals(result, 0, 1e-8)
					}
				}
			)
		)
	})

	await t.step("exhibits smooth non-linear activation behavior", () => {
		fc.assert(
			fc.property(
				fc.double({ min: -3, max: 3, noNaN: true }),
				(x) => {
					const result = gaussianErrorLinearUnit(x)
					// GELU should be smoother than ReLU (no sharp corner at 0)
					// For small values around 0, output should be roughly x/2
					if (Math.abs(x) < 0.5) {
						assertAlmostEquals(result, x * 0.5, 0.2)
					}
				}
			)
		)
	})

	await t.step("handles extreme values appropriately", () => {
		const veryLarge = 1e10
		const verySmall = -1e10

		// Should approximately equal input for very large positive
		assertAlmostEquals(gaussianErrorLinearUnit(veryLarge), veryLarge, 1)

		// Should be very close to 0 for very large negative
		assertAlmostEquals(gaussianErrorLinearUnit(verySmall), 0, 0.001)
	})

	await t.step("produces consistent results for same input", () => {
		fc.assert(
			fc.property(
				fc.double({ noNaN: true }),
				(x) => {
					const result1 = gaussianErrorLinearUnit(x)
					const result2 = gaussianErrorLinearUnit(x)
					assertEquals(result1, result2)
				}
			)
		)
	})
})