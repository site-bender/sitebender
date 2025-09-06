import { assertEquals } from "jsr:@std/assert@1.0.10"
import * as fc from "npm:fast-check@3.x.x"

import max from "../../../../../src/simple/math/max/index.ts"

Deno.test("max: ordering properties", async (t) => {
	await t.step("commutative: max(a)(b) = max(b)(a)", () => {
		fc.assert(
			fc.property(fc.float(), fc.float(), (a, b) => {
				const result1 = max(a)(b)
				const result2 = max(b)(a)

				// Both NaN or both same value
				return Object.is(result1, result2) ||
					(Number.isNaN(result1) && Number.isNaN(result2))
			}),
			{ numRuns: 1000 },
		)
	})

	await t.step("associative: max(max(a)(b))(c) = max(a)(max(b)(c))", () => {
		fc.assert(
			fc.property(
				fc.float(),
				fc.float(),
				fc.float(),
				(a, b, c) => {
					const left = max(max(a)(b))(c)
					const right = max(a)(max(b)(c))

					return Object.is(left, right) ||
						(Number.isNaN(left) && Number.isNaN(right))
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("idempotent: max(a)(a) = a", () => {
		fc.assert(
			fc.property(fc.float(), (a) => {
				const result = max(a)(a)

				return Object.is(result, a) ||
					(Number.isNaN(result) && Number.isNaN(a))
			}),
			{ numRuns: 1000 },
		)
	})

	await t.step("identity element is -Infinity", () => {
		fc.assert(
			fc.property(fc.float({ noNaN: true }), (a) => {
				const result = max(a)(-Infinity)
				return result === a
			}),
			{ numRuns: 1000 },
		)
	})
})

Deno.test("max: total ordering", async (t) => {
	await t.step("max(a)(b) = a or b", () => {
		fc.assert(
			fc.property(
				fc.float({ noNaN: true }),
				fc.float({ noNaN: true }),
				(a, b) => {
					const result = max(a)(b)
					return result === a || result === b
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("max(a)(b) >= a and max(a)(b) >= b", () => {
		fc.assert(
			fc.property(
				fc.float({ noNaN: true }),
				fc.float({ noNaN: true }),
				(a, b) => {
					const result = max(a)(b)
					return result >= a && result >= b
				},
			),
			{ numRuns: 1000 },
		)
	})
})

Deno.test("max: JSDoc examples (consolidated to 10)", async (t) => {
	await t.step("basic comparisons", () => {
		assertEquals(max(5)(3), 5)
		assertEquals(max(3)(5), 5)
		assertEquals(max(10)(10), 10)
		assertEquals(max(0)(0), 0)
	})

	await t.step("negative numbers", () => {
		assertEquals(max(-5)(3), 3)
		assertEquals(max(-5)(-3), -3)
		assertEquals(max(-10)(-20), -10)
	})

	await t.step("mixed positive and negative", () => {
		assertEquals(max(-10)(10), 10)
		assertEquals(max(5)(-5), 5)
		assertEquals(max(-1)(0), 0)
	})

	await t.step("decimal numbers", () => {
		assertEquals(max(3.14)(2.71), 3.14)
		assertEquals(max(0.1)(0.2), 0.2)
		assertEquals(max(-0.5)(0.5), 0.5)
	})

	await t.step("special values", () => {
		assertEquals(max(Infinity)(100), Infinity)
		assertEquals(max(-Infinity)(100), 100)
		assertEquals(max(Infinity)(-Infinity), Infinity)
		assertEquals(max(-0)(0), 0)
	})

	await t.step("NaN propagation", () => {
		assertEquals(Number.isNaN(max(NaN)(5)), true)
		assertEquals(Number.isNaN(max(5)(NaN)), true)
		assertEquals(Number.isNaN(max(NaN)(NaN)), true)
	})

	await t.step("invalid inputs return NaN", () => {
		assertEquals(Number.isNaN(max(null)(5)), true)
		assertEquals(Number.isNaN(max(5)(undefined)), true)
		// @ts-ignore - Testing runtime behavior
		assertEquals(Number.isNaN(max("5")(3)), true)
	})

	await t.step("partial application", () => {
		const atLeast0 = max(0)
		assertEquals(atLeast0(5), 5)
		assertEquals(atLeast0(-5), 0)
		assertEquals(atLeast0(0), 0)

		const atLeast10 = max(10)
		assertEquals(atLeast10(5), 10)
		assertEquals(atLeast10(15), 15)
	})

	await t.step("array operations", () => {
		const numbers = [1, 5, 3, 9, 2]
		const maxValue = numbers.reduce((acc, n) => max(acc)(n))
		assertEquals(maxValue, 9)

		const values = [-5, -2, -8, -1, -3]
		const largest = values.reduce((acc, n) => max(acc)(n))
		assertEquals(largest, -1)
	})

	await t.step("practical applications", () => {
		// Clamping to minimum value
		const ensureMinimum = (min: number) => max(min)
		const ensurePositive = ensureMinimum(0)
		assertEquals(ensurePositive(-5), 0)
		assertEquals(ensurePositive(5), 5)

		// Finding peaks
		const isPeak = (prev: number, current: number, next: number): boolean =>
			max(prev)(current) === current && max(current)(next) === current
		assertEquals(isPeak(3, 5, 2), true)
		assertEquals(isPeak(3, 2, 5), false)

		// Competition scoring
		const bestAttempt = (attempts: Array<number>): number =>
			attempts.reduce((best, attempt) => max(best)(attempt), -Infinity)
		assertEquals(bestAttempt([8.5, 9.2, 8.9, 9.0]), 9.2)
	})
})

Deno.test("max: error handling and null safety", async (t) => {
	await t.step("handles null and undefined", () => {
		assertEquals(Number.isNaN(max(null)(5)), true)
		assertEquals(Number.isNaN(max(5)(null)), true)
		assertEquals(Number.isNaN(max(undefined)(5)), true)
		assertEquals(Number.isNaN(max(5)(undefined)), true)
		assertEquals(Number.isNaN(max(null)(null)), true)
	})

	await t.step("safe max with validation", () => {
		const safeMax = (a: unknown, b: unknown): number | null => {
			const aNum = typeof a === "number" ? a : NaN
			const bNum = typeof b === "number" ? b : NaN
			const result = max(aNum)(bNum)
			return Number.isNaN(result) ? null : result
		}
		assertEquals(safeMax(5, 3), 5)
		assertEquals(safeMax("5", 3), null)
		assertEquals(safeMax(5, null), null)
	})
})

Deno.test("max: special edge cases", async (t) => {
	await t.step("very small differences", () => {
		assertEquals(max(1.0000001)(1.0000002), 1.0000002)
		assertEquals(max(Number.MIN_VALUE)(0), Number.MIN_VALUE)
	})

	await t.step("large numbers", () => {
		assertEquals(
			max(Number.MAX_VALUE)(Number.MAX_VALUE - 1),
			Number.MAX_VALUE,
		)
		assertEquals(
			max(Number.MAX_SAFE_INTEGER)(Number.MAX_SAFE_INTEGER - 1),
			Number.MAX_SAFE_INTEGER,
		)
	})

	await t.step("boundary comparisons", () => {
		fc.assert(
			fc.property(fc.float({ noNaN: true }), (n) => {
				// max with itself
				const self = max(n)(n)
				return self === n
			}),
			{ numRuns: 1000 },
		)
	})
})
