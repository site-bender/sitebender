import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import divide from "../../../../../src/simple/math/divide/index.ts"

Deno.test("divide - division by zero returns NaN", () => {
	assertEquals(Number.isNaN(divide(10)(0)), true)
	assertEquals(Number.isNaN(divide(0)(0)), true)
	assertEquals(Number.isNaN(divide(-5)(0)), true)
	assertEquals(Number.isNaN(divide(Infinity)(0)), true)
	assertEquals(Number.isNaN(divide(-Infinity)(0)), true)
	assertEquals(Number.isNaN(divide(NaN)(0)), true)
})

Deno.test("divide - returns NaN for null inputs", () => {
	assertEquals(Number.isNaN(divide(null)(5)), true)
	assertEquals(Number.isNaN(divide(10)(null)), true)
	assertEquals(Number.isNaN(divide(null)(null)), true)
})

Deno.test("divide - returns NaN for undefined inputs", () => {
	assertEquals(Number.isNaN(divide(undefined)(5)), true)
	assertEquals(Number.isNaN(divide(10)(undefined)), true)
	assertEquals(Number.isNaN(divide(undefined)(undefined)), true)
})

Deno.test("divide - returns NaN for non-number inputs", () => {
	const invalidInputs = [
		"10",
		"abc",
		{},
		[],
		[1, 2],
		() => 5,
		true,
		false,
		Symbol("test"),
	]
	
	for (const invalid of invalidInputs) {
		assertEquals(
			Number.isNaN(divide(invalid as any)(2)),
			true,
			`Failed for dividend ${String(invalid)}`
		)
		assertEquals(
			Number.isNaN(divide(10)(invalid as any)),
			true,
			`Failed for divisor ${String(invalid)}`
		)
	}
})

Deno.test("divide - NaN propagation", () => {
	// NaN as dividend
	assertEquals(Number.isNaN(divide(NaN)(5)), true)
	assertEquals(Number.isNaN(divide(NaN)(-5)), true)
	assertEquals(Number.isNaN(divide(NaN)(Infinity)), true)
	
	// NaN as divisor
	assertEquals(Number.isNaN(divide(5)(NaN)), true)
	assertEquals(Number.isNaN(divide(-5)(NaN)), true)
	assertEquals(Number.isNaN(divide(Infinity)(NaN)), true)
	
	// Both NaN
	assertEquals(Number.isNaN(divide(NaN)(NaN)), true)
})

Deno.test("divide - handles special value edge cases", () => {
	// Infinity cases
	assertEquals(divide(Infinity)(2), Infinity)
	assertEquals(divide(-Infinity)(2), -Infinity)
	assertEquals(divide(10)(Infinity), 0)
	assertEquals(divide(10)(-Infinity), -0)
	assertEquals(Number.isNaN(divide(Infinity)(Infinity)), true)
	assertEquals(Number.isNaN(divide(-Infinity)(Infinity)), true)
	
	// Zero cases (when not dividing by zero)
	assertEquals(divide(0)(5), 0)
	assertEquals(Object.is(divide(0)(-5), -0), true) // Negative zero
})

Deno.test("divide - error handling in chains", () => {
	// Once NaN is introduced, it propagates
	const chain1 = divide(divide(10)(0))(2)
	assertEquals(Number.isNaN(chain1), true)
	
	const chain2 = divide(10)(divide(5)(0))
	assertEquals(Number.isNaN(chain2), true)
	
	// Null propagation
	const chain3 = divide(divide(10)(null))(2)
	assertEquals(Number.isNaN(chain3), true)
})

Deno.test("divide - consistent null/undefined handling", () => {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.constant(null),
				fc.constant(undefined),
				fc.float({ noNaN: true })
			),
			fc.oneof(
				fc.constant(null),
				fc.constant(undefined),
				fc.float({ noNaN: true })
			),
			(dividend, divisor) => {
				const result = divide(dividend)(divisor)
				
				// If either input is null/undefined, result must be NaN
				if (dividend == null || divisor == null) {
					return Number.isNaN(result)
				}
				
				// If divisor is 0, result must be NaN
				if (divisor === 0) {
					return Number.isNaN(result)
				}
				
				// Otherwise result should be a valid number
				return typeof result === "number"
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("divide - partial application with invalid values", () => {
	// Partial application with null/undefined
	const divideNull = divide(null)
	assertEquals(Number.isNaN(divideNull(5)), true)
	assertEquals(Number.isNaN(divideNull(0)), true)
	
	const divideByNull = (n: number) => divide(n)(null)
	assertEquals(Number.isNaN(divideByNull(10)), true)
	assertEquals(Number.isNaN(divideByNull(0)), true)
	
	// Partial application with zero divisor
	const divideByZero = (n: number) => divide(n)(0)
	assertEquals(Number.isNaN(divideByZero(10)), true)
	assertEquals(Number.isNaN(divideByZero(-5)), true)
	assertEquals(Number.isNaN(divideByZero(Infinity)), true)
})