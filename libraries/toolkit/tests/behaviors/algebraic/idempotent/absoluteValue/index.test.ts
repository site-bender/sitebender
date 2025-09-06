import { assertEquals } from "jsr:@std/assert@1.0.10"
import * as fc from "npm:fast-check@3.x.x"

import absoluteValue from "../../../../../src/simple/math/absoluteValue/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

Deno.test("absoluteValue: idempotent property", async (t) => {
	await t.step("double application equals single application", () => {
		fc.assert(
			fc.property(fc.float(), (n) => {
				const once = absoluteValue(n)
				const twice = absoluteValue(once)

				// Use Object.is for NaN comparison
				return Object.is(once, twice) ||
					(Number.isNaN(once) && Number.isNaN(twice))
			}),
			{ numRuns: 1000 },
		)
	})

	await t.step("idempotent for special values", () => {
		const specialValues = [
			0,
			-0,
			Infinity,
			-Infinity,
			NaN,
			Number.MAX_VALUE,
			-Number.MAX_VALUE,
			Number.MIN_VALUE,
			-Number.MIN_VALUE,
		]

		for (const value of specialValues) {
			const once = absoluteValue(value)
			const twice = absoluteValue(once)

			if (Number.isNaN(value)) {
				assertEquals(Number.isNaN(once), true)
				assertEquals(Number.isNaN(twice), true)
			} else {
				assertEquals(once, twice)
			}
		}
	})
})

Deno.test("absoluteValue: non-negativity property", async (t) => {
	await t.step("result is always non-negative or NaN", () => {
		fc.assert(
			fc.property(fc.float(), (n) => {
				const result = absoluteValue(n)
				return Number.isNaN(result) || result >= 0
			}),
			{ numRuns: 1000 },
		)
	})
})

Deno.test("absoluteValue: distance property", async (t) => {
	await t.step("|x| = |-x| for all x", () => {
		fc.assert(
			fc.property(fc.float(), (n) => {
				const positive = absoluteValue(n)
				const negative = absoluteValue(-n)

				return Object.is(positive, negative) ||
					(Number.isNaN(positive) && Number.isNaN(negative)) ||
					approximately(positive, negative)
			}),
			{ numRuns: 1000 },
		)
	})
})

Deno.test("absoluteValue: multiplicative property", async (t) => {
	await t.step("|x * y| = |x| * |y|", () => {
		fc.assert(
			fc.property(
				fc.float({ noNaN: true, noDefaultInfinity: false }),
				fc.float({ noNaN: true, noDefaultInfinity: false }),
				(x, y) => {
					const productAbs = absoluteValue(x * y)
					const absProduct = absoluteValue(x) * absoluteValue(y)

					// Handle infinity cases
					if (
						!Number.isFinite(productAbs) ||
						!Number.isFinite(absProduct)
					) {
						return Object.is(productAbs, absProduct)
					}

					// Handle zero cases (0 * anything = 0)
					if (productAbs === 0 && absProduct === 0) {
						return true
					}

					// Use relative epsilon for non-zero numbers
					const magnitude = Math.max(
						Math.abs(productAbs),
						Math.abs(absProduct),
					)
					const epsilon = Math.max(magnitude * 1e-10, 1e-14)

					return approximately(productAbs, absProduct, epsilon)
				},
			),
			{ numRuns: 1000 },
		)
	})
})

Deno.test("absoluteValue: triangle inequality", async (t) => {
	await t.step("|x + y| <= |x| + |y|", () => {
		fc.assert(
			fc.property(
				fc.float({ noNaN: true }),
				fc.float({ noNaN: true }),
				(x, y) => {
					const sumAbs = absoluteValue(x + y)
					const absSum = absoluteValue(x) + absoluteValue(y)

					// Handle infinity cases
					if (!Number.isFinite(sumAbs) || !Number.isFinite(absSum)) {
						return true // Inequality holds for infinities
					}

					// Triangle inequality with small tolerance for floating point
					return sumAbs <= absSum + 1e-10
				},
			),
			{ numRuns: 1000 },
		)
	})
})

Deno.test("absoluteValue: JSDoc examples (consolidated)", async (t) => {
	await t.step("positive numbers unchanged", () => {
		assertEquals(absoluteValue(5), 5)
		assertEquals(absoluteValue(42.7), 42.7)
	})

	await t.step("negative numbers become positive", () => {
		assertEquals(absoluteValue(-5), 5)
		assertEquals(absoluteValue(-42.7), 42.7)
	})

	await t.step("zero handling", () => {
		assertEquals(absoluteValue(0), 0)
		assertEquals(absoluteValue(-0), 0)
	})

	await t.step("special numeric values", () => {
		assertEquals(absoluteValue(Infinity), Infinity)
		assertEquals(absoluteValue(-Infinity), Infinity)
		assertEquals(Number.isNaN(absoluteValue(NaN)), true)
	})

	await t.step("very small and large numbers", () => {
		assertEquals(absoluteValue(-0.0000001), 0.0000001)
		assertEquals(absoluteValue(-1e-10), 1e-10)
		assertEquals(absoluteValue(-9999999999999), 9999999999999)
		assertEquals(absoluteValue(-Number.MAX_VALUE), Number.MAX_VALUE)
		assertEquals(absoluteValue(-Number.MIN_VALUE), Number.MIN_VALUE)
		assertEquals(absoluteValue(Number.EPSILON), Number.EPSILON)
	})

	await t.step("invalid inputs return NaN", () => {
		assertEquals(Number.isNaN(absoluteValue(null)), true)
		assertEquals(Number.isNaN(absoluteValue(undefined)), true)
		// @ts-ignore - Testing runtime behavior
		assertEquals(Number.isNaN(absoluteValue("5")), true)
		// @ts-ignore - Testing runtime behavior
		assertEquals(Number.isNaN(absoluteValue("abc")), true)
		// @ts-ignore - Testing runtime behavior
		assertEquals(Number.isNaN(absoluteValue({})), true)
		// @ts-ignore - Testing runtime behavior
		assertEquals(Number.isNaN(absoluteValue([])), true)
	})

	await t.step("practical applications", () => {
		// Distance calculation
		const point1 = 5
		const point2 = -3
		const distance = absoluteValue(point1 - point2)
		assertEquals(distance, 8)

		// Finding maximum deviation
		const deviations = [-3, 2, -5, 1, -2]
		const maxDeviation = deviations.map(absoluteValue).reduce((a, b) =>
			Math.max(a, b)
		)
		assertEquals(maxDeviation, 5)

		// Temperature difference
		const tempDiff = absoluteValue(-5 - 20)
		assertEquals(tempDiff, 25)

		// Financial calculation
		const loss = -150.50
		const absoluteLoss = absoluteValue(loss)
		assertEquals(absoluteLoss, 150.50)

		// Physics calculation
		const velocity = -9.8
		const speed = absoluteValue(velocity)
		assertEquals(speed, 9.8)
	})

	await t.step("array processing", () => {
		const numbers = [-5, 3, -2, 8, -1]
		const absolute = numbers.map(absoluteValue)
		assertEquals(absolute, [5, 3, 2, 8, 1])

		// Finding closest to zero
		const values = [-5, 3, -2, 8, -1]
		const closest = values.reduce((min, val) =>
			absoluteValue(val) < absoluteValue(min) ? val : min
		)
		assertEquals(closest, -1)
	})
})

Deno.test("absoluteValue: error handling and null safety", async (t) => {
	await t.step("handles null and undefined", () => {
		assertEquals(Number.isNaN(absoluteValue(null)), true)
		assertEquals(Number.isNaN(absoluteValue(undefined)), true)
	})

	await t.step("NaN propagation", () => {
		const result = absoluteValue(NaN) * 2
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("type safety with unknown inputs", () => {
		const safeCalc = (x: unknown): number => {
			const val = typeof x === "number" ? x : NaN
			return absoluteValue(val) * 2
		}
		assertEquals(Number.isNaN(safeCalc("invalid")), true)
		assertEquals(safeCalc(5), 10)
		assertEquals(safeCalc(-5), 10)
	})
})
