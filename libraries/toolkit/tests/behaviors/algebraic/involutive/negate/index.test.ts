import { assertEquals } from "jsr:@std/assert@1.0.10"
import * as fc from "npm:fast-check@3.x.x"

import negate from "../../../../../src/simple/math/negate/index.ts"

Deno.test("negate: involutive property", async (t) => {
	await t.step("double negation returns original value", () => {
		fc.assert(
			fc.property(fc.float(), (n) => {
				const twice = negate(negate(n))

				// Use Object.is for special values like -0, NaN
				return Object.is(n, twice) ||
					(Number.isNaN(n) && Number.isNaN(twice))
			}),
			{ numRuns: 1000 },
		)
	})

	await t.step("involutive for special values", () => {
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
			const twice = negate(negate(value))

			if (Number.isNaN(value)) {
				assertEquals(Number.isNaN(twice), true)
			} else if (Object.is(value, -0)) {
				// -0 → 0 → -0
				assertEquals(Object.is(twice, -0), true)
			} else {
				assertEquals(twice, value)
			}
		}
	})
})

Deno.test("negate: additive inverse property", async (t) => {
	await t.step("n + negate(n) = 0", () => {
		fc.assert(
			fc.property(fc.float({ noNaN: true }), (n) => {
				const sum = n + negate(n)

				// Handle infinity cases
				if (!Number.isFinite(n)) {
					return Number.isNaN(sum) // Infinity + -Infinity = NaN
				}

				// Check if sum is zero (considering -0)
				return sum === 0 || Object.is(sum, -0)
			}),
			{ numRuns: 1000 },
		)
	})
})

Deno.test("negate: sign reversal property", async (t) => {
	await t.step("sign(negate(n)) = -sign(n) for non-zero values", () => {
		fc.assert(
			fc.property(fc.float({ noNaN: true }), (n) => {
				if (n === 0 || Object.is(n, -0)) {
					// Zero has special behavior
					return true
				}

				const negated = negate(n)
				const signN = Math.sign(n)
				const signNegated = Math.sign(negated)

				return signNegated === -signN
			}),
			{ numRuns: 1000 },
		)
	})
})

Deno.test("negate: multiplication relationship", async (t) => {
	await t.step("negate(n) = n * -1", () => {
		fc.assert(
			fc.property(fc.float(), (n) => {
				const negated = negate(n)
				const multiplied = n * -1

				// Both NaN or both same value
				return Object.is(negated, multiplied) ||
					(Number.isNaN(negated) && Number.isNaN(multiplied))
			}),
			{ numRuns: 1000 },
		)
	})
})

Deno.test("negate: JSDoc examples (consolidated to 10)", async (t) => {
	await t.step("positive to negative", () => {
		assertEquals(negate(5), -5)
		assertEquals(negate(42), -42)
		assertEquals(negate(3.14), -3.14)
	})

	await t.step("negative to positive", () => {
		assertEquals(negate(-5), 5)
		assertEquals(negate(-42), 42)
		assertEquals(negate(-2.5), 2.5)
	})

	await t.step("zero handling", () => {
		assertEquals(negate(0), -0)
		assertEquals(negate(-0), 0)
		// Note: -0 === 0 in JavaScript, but Object.is can distinguish them
		assertEquals(Object.is(negate(0), -0), true)
		assertEquals(Object.is(negate(-0), 0), true)
	})

	await t.step("special values", () => {
		assertEquals(negate(Infinity), -Infinity)
		assertEquals(negate(-Infinity), Infinity)
		assertEquals(Number.isNaN(negate(NaN)), true)
		assertEquals(negate(Number.MAX_SAFE_INTEGER), -Number.MAX_SAFE_INTEGER)
		assertEquals(negate(Number.MIN_SAFE_INTEGER), -Number.MIN_SAFE_INTEGER)
	})

	await t.step("invalid inputs return NaN", () => {
		assertEquals(Number.isNaN(negate(null)), true)
		assertEquals(Number.isNaN(negate(undefined)), true)
		// @ts-ignore - Testing runtime behavior
		assertEquals(Number.isNaN(negate("5")), true)
		// @ts-ignore - Testing runtime behavior
		assertEquals(Number.isNaN(negate({})), true)
		// @ts-ignore - Testing runtime behavior
		assertEquals(Number.isNaN(negate([])), true)
	})

	await t.step("double negation identity", () => {
		assertEquals(negate(negate(5)), 5)
		assertEquals(negate(negate(-7)), -7)
	})

	await t.step("array operations", () => {
		const numbers = [1, -2, 3, -4, 5]
		const negated = numbers.map(negate)
		assertEquals(negated, [-1, 2, -3, 4, -5])

		const positives = [1, 2, 3, 4, 5]
		assertEquals(positives.map(negate), [-1, -2, -3, -4, -5])
	})

	await t.step("practical use - subtraction via addition", () => {
		const subtract = (a: number) => (b: number) => a + negate(b)
		assertEquals(subtract(10)(3), 7)
		assertEquals(subtract(5)(8), -3)
	})

	await t.step("coordinate reflection", () => {
		const reflectX = (point: { x: number; y: number }) => ({
			x: negate(point.x),
			y: point.y,
		})
		assertEquals(reflectX({ x: 5, y: 3 }), { x: -5, y: 3 })
	})

	await t.step("conditional negation", () => {
		const negateIf = (condition: boolean) => (n: number) =>
			condition ? negate(n) : n
		assertEquals(negateIf(true)(5), -5)
		assertEquals(negateIf(false)(5), 5)
	})
})

Deno.test("negate: error handling and null safety", async (t) => {
	await t.step("handles null and undefined", () => {
		assertEquals(Number.isNaN(negate(null)), true)
		assertEquals(Number.isNaN(negate(undefined)), true)
	})

	await t.step("NaN propagation", () => {
		const result = negate(NaN)
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("safe negate with validation", () => {
		const safeNegate = (value: unknown): number | null => {
			const num = typeof value === "number" ? value : NaN
			const result = negate(num)
			return Number.isNaN(result) ? null : result
		}
		assertEquals(safeNegate(5), -5)
		assertEquals(safeNegate("5"), null)
		assertEquals(safeNegate(null), null)
	})
})

Deno.test("negate: mathematical operations", async (t) => {
	await t.step("absolute value implementation", () => {
		const abs = (n: number): number => n < 0 ? negate(n) : n
		assertEquals(abs(-5), 5)
		assertEquals(abs(5), 5)
		assertEquals(abs(0), 0)
	})

	await t.step("vector negation", () => {
		const vector = [3, -4, 5]
		const negatedVector = vector.map(negate)
		assertEquals(negatedVector, [-3, 4, -5])
	})

	await t.step("alternating series", () => {
		const alternating = (n: number): number => n % 2 === 0 ? n : negate(n)
		const series = [1, 2, 3, 4, 5].map(alternating)
		assertEquals(series, [-1, 2, -3, 4, -5])
	})
})
