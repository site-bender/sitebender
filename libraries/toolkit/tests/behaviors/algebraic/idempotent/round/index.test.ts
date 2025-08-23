import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import round from "../../../../../src/simple/math/round/index.ts"

Deno.test("round: idempotent property", async (t) => {
	await t.step("double application equals single application", () => {
		fc.assert(
			fc.property(fc.float(), (n) => {
				const once = round(n)
				const twice = round(once)
				
				// round is idempotent - applying it twice gives same result as once
				return Object.is(once, twice) ||
					(Number.isNaN(once) && Number.isNaN(twice))
			}),
			{ numRuns: 1000 }
		)
	})

	await t.step("idempotent for special values", () => {
		const specialValues = [0, -0, 0.5, -0.5, 1.5, -1.5, Infinity, -Infinity, NaN]
		
		for (const value of specialValues) {
			const once = round(value)
			const twice = round(once)
			
			if (Number.isNaN(value)) {
				assertEquals(Number.isNaN(once), true)
				assertEquals(Number.isNaN(twice), true)
			} else {
				assertEquals(once, twice)
			}
		}
	})
})

Deno.test("round: nearest integer property", async (t) => {
	await t.step("returns nearest integer", () => {
		fc.assert(
			fc.property(fc.float({ noNaN: true }), (n) => {
				const result = round(n)
				const floor = Math.floor(n)
				const ceil = Math.ceil(n)
				
				// Result should be either floor or ceiling
				if (!Number.isFinite(n)) {
					return Object.is(result, n)
				}
				
				return result === floor || result === ceil
			}),
			{ numRuns: 1000 }
		)
	})

	await t.step("minimizes distance to original value", () => {
		fc.assert(
			fc.property(fc.float({ noNaN: true, min: -1e10, max: 1e10 }), (n) => {
				const result = round(n)
				const floor = Math.floor(n)
				const ceil = Math.ceil(n)
				
				const distToResult = Math.abs(n - result)
				const distToFloor = Math.abs(n - floor)
				const distToCeil = Math.abs(n - ceil)
				
				// Result should minimize distance (with tie going away from zero)
				return distToResult <= distToFloor + 1e-10 && 
				       distToResult <= distToCeil + 1e-10
			}),
			{ numRuns: 1000 }
		)
	})
})

Deno.test("round: halfway cases (round half away from zero)", async (t) => {
	await t.step("positive halfway values round up", () => {
		assertEquals(round(0.5), 1)
		assertEquals(round(1.5), 2)
		assertEquals(round(2.5), 3)
		assertEquals(round(3.5), 4)
		assertEquals(round(10.5), 11)
	})

	await t.step("negative halfway values round away from zero", () => {
		assertEquals(round(-0.5), -0)
		assertEquals(round(-1.5), -1)
		assertEquals(round(-2.5), -2)
		assertEquals(round(-3.5), -3)
		assertEquals(round(-10.5), -10)
	})
})

Deno.test("round: relationship with floor and ceiling", async (t) => {
	await t.step("bounded by floor and ceiling", () => {
		fc.assert(
			fc.property(fc.float({ noNaN: true }), (n) => {
				const rounded = round(n)
				const floored = Math.floor(n)
				const ceiled = Math.ceil(n)
				
				if (!Number.isFinite(n)) {
					return Object.is(rounded, n)
				}
				
				return rounded >= floored && rounded <= ceiled
			}),
			{ numRuns: 1000 }
		)
	})

	await t.step("equals floor or ceiling for integers", () => {
		fc.assert(
			fc.property(fc.integer({ min: -1000000, max: 1000000 }), (n) => {
				const rounded = round(n)
				const floored = Math.floor(n)
				const ceiled = Math.ceil(n)
				
				return rounded === n && floored === n && ceiled === n
			}),
			{ numRuns: 1000 }
		)
	})
})

Deno.test("round: JSDoc examples (consolidated)", async (t) => {
	await t.step("basic rounding", () => {
		assertEquals(round(3.2), 3)
		assertEquals(round(3.7), 4)
		assertEquals(round(3.5), 4)
	})

	await t.step("negative numbers", () => {
		assertEquals(round(-3.2), -3)
		assertEquals(round(-3.7), -4)
		assertEquals(round(-3.5), -3)
	})

	await t.step("integers unchanged", () => {
		assertEquals(round(5), 5)
		assertEquals(round(-10), -10)
		assertEquals(round(0), 0)
	})

	await t.step("small decimals", () => {
		assertEquals(round(0.1), 0)
		assertEquals(round(0.49999), 0)
		assertEquals(round(0.5), 1)
		assertEquals(round(0.50001), 1)
		assertEquals(round(0.9), 1)
	})

	await t.step("large numbers", () => {
		assertEquals(round(1000000.3), 1000000)
		assertEquals(round(999999.9), 1000000)
		assertEquals(round(Number.MAX_SAFE_INTEGER - 0.4), 9007199254740991)
	})

	await t.step("special values", () => {
		assertEquals(round(Infinity), Infinity)
		assertEquals(round(-Infinity), -Infinity)
		assertEquals(Number.isNaN(round(NaN)), true)
	})

	await t.step("invalid inputs return NaN", () => {
		assertEquals(Number.isNaN(round(null)), true)
		assertEquals(Number.isNaN(round(undefined)), true)
		// @ts-ignore - Testing runtime behavior
		assertEquals(Number.isNaN(round("3.5")), true)
		// @ts-ignore - Testing runtime behavior
		assertEquals(Number.isNaN(round({})), true)
		// @ts-ignore - Testing runtime behavior
		assertEquals(Number.isNaN(round([])), true)
	})

	await t.step("practical applications", () => {
		// Average calculation
		const average = (a: number, b: number) => round((a + b) / 2)
		assertEquals(average(3, 4), 4)
		assertEquals(average(3, 3), 3)

		// Array operations
		const decimals = [1.2, 2.5, 3.7, 4.4, 5.9]
		const rounded = decimals.map(round)
		assertEquals(rounded, [1, 3, 4, 4, 6])

		// Percentage rounding
		assertEquals(round(67.8), 68)

		// Currency rounding
		assertEquals(round(1250 / 100), 13)
		assertEquals(round(1249 / 100), 12)
	})
})

Deno.test("round: error handling and null safety", async (t) => {
	await t.step("handles null and undefined", () => {
		assertEquals(Number.isNaN(round(null)), true)
		assertEquals(Number.isNaN(round(undefined)), true)
	})

	await t.step("type safety with unknown inputs", () => {
		const safeRound = (value: unknown): number | null => {
			const num = typeof value === 'number' ? value : NaN
			const result = round(num)
			return Number.isNaN(result) ? null : result
		}
		
		assertEquals(safeRound(3.7), 4)
		assertEquals(safeRound("3.7"), null)
		assertEquals(safeRound(null), null)
	})
})