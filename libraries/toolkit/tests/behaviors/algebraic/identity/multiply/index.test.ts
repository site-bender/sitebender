import { assert, assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import multiply from "../../../../../src/simple/math/multiply/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

/**
 * Tests for multiply identity element (1) and annihilator (0)
 */

Deno.test("multiply - identity element (1)", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true }),
			(a) => {
				// Multiplying by 1 is identity: a * 1 = a
				const result = multiply(a)(1)
				return Object.is(result, a) || approximately(result, a)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("multiply - annihilator element (0)", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, noDefaultInfinity: true }),
			(a) => {
				// Multiplying by 0 always gives 0: a * 0 = 0
				const result = multiply(a)(0)
				return Object.is(result, 0) || result === 0
			}
		),
		{ numRuns: 1000 }
	)
	
	// Special case: Infinity * 0 = NaN
	assert(Number.isNaN(multiply(Infinity)(0)))
	assert(Number.isNaN(multiply(-Infinity)(0)))
	assert(Number.isNaN(multiply(0)(Infinity)))
	assert(Number.isNaN(multiply(0)(-Infinity)))
})

Deno.test("multiply - JSDoc examples", async (t) => {
	// Basic multiplication
	await t.step("basic multiplication", () => {
		assertEquals(multiply(2)(3), 6)
		assertEquals(multiply(5)(4), 20)
		assertEquals(multiply(7)(8), 56)
	})
	
	// Negative numbers
	await t.step("negative numbers", () => {
		assertEquals(multiply(-5)(3), -15)
		assertEquals(multiply(-10)(-2), 20)
		assertEquals(multiply(5)(-3), -15)
	})
	
	// Decimal numbers
	await t.step("decimal numbers", () => {
		assertEquals(multiply(1.5)(2), 3)
		assertEquals(multiply(0.5)(0.5), 0.25)
		assertEquals(multiply(2.5)(4), 10)
	})
	
	// Zero multiplication
	await t.step("zero multiplication", () => {
		assertEquals(multiply(0)(5), 0)
		assertEquals(multiply(100)(0), 0)
		assertEquals(multiply(0)(0), 0)
	})
	
	// One multiplication
	await t.step("one multiplication", () => {
		assertEquals(multiply(1)(5), 5)
		assertEquals(multiply(5)(1), 5)
		assertEquals(multiply(1)(1), 1)
	})
	
	// Large numbers
	await t.step("large numbers", () => {
		assertEquals(multiply(1000000)(2), 2000000)
		assertEquals(multiply(999)(999), 998001)
	})
	
	// Very small numbers
	await t.step("very small numbers", () => {
		assertEquals(multiply(0.001)(0.001), 0.000001)
		assertEquals(multiply(0.0001)(10000), 1)
	})
	
	// Special values
	await t.step("special values", () => {
		assertEquals(multiply(Infinity)(2), Infinity)
		assertEquals(multiply(-Infinity)(2), -Infinity)
		assertEquals(multiply(-Infinity)(-1), Infinity)
		assert(Number.isNaN(multiply(Infinity)(0)))
		assert(Number.isNaN(multiply(5)(NaN)))
		assert(Number.isNaN(multiply(NaN)(NaN)))
	})
	
	// Invalid inputs
	await t.step("invalid inputs", () => {
		assert(Number.isNaN(multiply(null as any)(5)))
		assert(Number.isNaN(multiply(5)(undefined as any)))
		assert(Number.isNaN(multiply("5" as any)(3)))
		assert(Number.isNaN(multiply(5)("3" as any)))
		assert(Number.isNaN(multiply({} as any)(5)))
	})
})