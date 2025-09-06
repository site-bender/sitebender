import { assertEquals } from "jsr:@std/assert@1.0.10"
import * as fc from "npm:fast-check@3.x.x"

import min from "../../../../../src/simple/math/min/index.ts"

Deno.test("min: ordering properties", async (t) => {
	await t.step("commutative: min(a)(b) = min(b)(a)", () => {
		fc.assert(
			fc.property(fc.float(), fc.float(), (a, b) => {
				const result1 = min(a)(b)
				const result2 = min(b)(a)

				// Both NaN or both same value
				return Object.is(result1, result2) ||
					(Number.isNaN(result1) && Number.isNaN(result2))
			}),
			{ numRuns: 1000 },
		)
	})

	await t.step("associative: min(min(a)(b))(c) = min(a)(min(b)(c))", () => {
		fc.assert(
			fc.property(
				fc.float(),
				fc.float(),
				fc.float(),
				(a, b, c) => {
					const left = min(min(a)(b))(c)
					const right = min(a)(min(b)(c))

					return Object.is(left, right) ||
						(Number.isNaN(left) && Number.isNaN(right))
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("idempotent: min(a)(a) = a", () => {
		fc.assert(
			fc.property(fc.float(), (a) => {
				const result = min(a)(a)

				return Object.is(result, a) ||
					(Number.isNaN(result) && Number.isNaN(a))
			}),
			{ numRuns: 1000 },
		)
	})

	await t.step("identity element is Infinity", () => {
		fc.assert(
			fc.property(fc.float({ noNaN: true }), (a) => {
				const result = min(a)(Infinity)
				return result === a
			}),
			{ numRuns: 1000 },
		)
	})
})

Deno.test("min: total ordering", async (t) => {
	await t.step("min(a)(b) = a or b", () => {
		fc.assert(
			fc.property(
				fc.float({ noNaN: true }),
				fc.float({ noNaN: true }),
				(a, b) => {
					const result = min(a)(b)
					return result === a || result === b
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("min(a)(b) <= a and min(a)(b) <= b", () => {
		fc.assert(
			fc.property(
				fc.float({ noNaN: true }),
				fc.float({ noNaN: true }),
				(a, b) => {
					const result = min(a)(b)
					return result <= a && result <= b
				},
			),
			{ numRuns: 1000 },
		)
	})
})

Deno.test("min: duality with max", async (t) => {
	await t.step("min(a)(b) = -max(-a)(-b)", () => {
		fc.assert(
			fc.property(
				fc.float({ noNaN: true }),
				fc.float({ noNaN: true }),
				(a, b) => {
					const minResult = min(a)(b)
					const maxNegated = -Math.max(-a, -b)

					// Handle -0 and 0 cases
					return Object.is(minResult, maxNegated) ||
						Math.abs(minResult - maxNegated) < Number.EPSILON
				},
			),
			{ numRuns: 1000 },
		)
	})
})

Deno.test("min: JSDoc examples (consolidated to 10)", async (t) => {
	await t.step("basic comparisons", () => {
		assertEquals(min(5)(3), 3)
		assertEquals(min(10)(20), 10)
		assertEquals(min(7)(7), 7)
	})

	await t.step("negative numbers", () => {
		assertEquals(min(-5)(3), -5)
		assertEquals(min(-10)(-20), -20)
		assertEquals(min(0)(-1), -1)
	})

	await t.step("decimal numbers", () => {
		assertEquals(min(1.5)(2.3), 1.5)
		assertEquals(min(0.1)(0.2), 0.1)
		assertEquals(min(99.99)(99.98), 99.98)
	})

	await t.step("zero comparisons", () => {
		assertEquals(min(0)(5), 0)
		assertEquals(min(0)(-5), -5)
		assertEquals(min(0)(0), 0)
	})

	await t.step("large numbers", () => {
		assertEquals(min(1000000)(2000000), 1000000)
		assertEquals(min(Number.MAX_SAFE_INTEGER)(0), 0)
		assertEquals(min(Number.MIN_SAFE_INTEGER)(0), Number.MIN_SAFE_INTEGER)
	})

	await t.step("special values", () => {
		assertEquals(min(Infinity)(100), 100)
		assertEquals(min(-Infinity)(100), -Infinity)
		assertEquals(min(-Infinity)(Infinity), -Infinity)
	})

	await t.step("NaN propagation", () => {
		assertEquals(Number.isNaN(min(5)(NaN)), true)
		assertEquals(Number.isNaN(min(NaN)(5)), true)
		assertEquals(Number.isNaN(min(NaN)(NaN)), true)
	})

	await t.step("invalid inputs return NaN", () => {
		assertEquals(Number.isNaN(min(null)(5)), true)
		assertEquals(Number.isNaN(min(5)(undefined)), true)
		// @ts-ignore - Testing runtime behavior
		assertEquals(Number.isNaN(min("5")(3)), true)
		// @ts-ignore - Testing runtime behavior
		assertEquals(Number.isNaN(min({})(5)), true)
	})

	await t.step("partial application", () => {
		const atMost10 = min(10)
		assertEquals(atMost10(5), 5)
		assertEquals(atMost10(15), 10)
		assertEquals(atMost10(10), 10)

		const atMost0 = min(0)
		assertEquals(atMost0(5), 0)
		assertEquals(atMost0(-5), -5)
	})

	await t.step("array operations", () => {
		const numbers = [5, 2, 8, 1, 9]
		const minValue = numbers.reduce((acc, n) => min(acc)(n))
		assertEquals(minValue, 1)

		const temperatures = [72, 68, 75, 71, 70]
		const coolest = temperatures.reduce((acc, temp) => min(acc)(temp))
		assertEquals(coolest, 68)
	})
})

Deno.test("min: error handling and null safety", async (t) => {
	await t.step("handles null and undefined", () => {
		assertEquals(Number.isNaN(min(null)(5)), true)
		assertEquals(Number.isNaN(min(5)(null)), true)
		assertEquals(Number.isNaN(min(undefined)(5)), true)
		assertEquals(Number.isNaN(min(5)(undefined)), true)
		assertEquals(Number.isNaN(min(null)(undefined)), true)
	})

	await t.step("safe min with validation", () => {
		const safeMin = (a: unknown, b: unknown): number | null => {
			const aNum = typeof a === "number" ? a : NaN
			const bNum = typeof b === "number" ? b : NaN
			const result = min(aNum)(bNum)
			return Number.isNaN(result) ? null : result
		}
		assertEquals(safeMin(5, 3), 3)
		assertEquals(safeMin("5", 3), null)
		assertEquals(safeMin(5, null), null)
	})
})

Deno.test("min: practical applications", async (t) => {
	await t.step("clamping to maximum value", () => {
		const clampToMax = (max: number) => min(max)
		const clampTo100 = clampToMax(100)
		assertEquals(clampTo100(50), 50)
		assertEquals(clampTo100(150), 100)
	})

	await t.step("finding valleys", () => {
		const isValley = (
			prev: number,
			current: number,
			next: number,
		): boolean =>
			min(prev)(current) === current && min(current)(next) === current
		assertEquals(isValley(5, 2, 3), true)
		assertEquals(isValley(2, 5, 3), false)
	})

	await t.step("worst case analysis", () => {
		const worstCase = (scenarios: Array<number>): number =>
			scenarios.reduce(
				(worst, scenario) => min(worst)(scenario),
				Infinity,
			)
		assertEquals(worstCase([10, 5, 8, 3, 12]), 3)
	})
})
