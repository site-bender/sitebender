import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import divide from "../../../../../src/simple/math/divide/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"
import { finiteNumber } from "../../../../helpers/generators/numeric/index.ts"

Deno.test("divide - right identity is 1: a / 1 = a", () => {
	fc.assert(
		fc.property(finiteNumber(), (a) => {
			const result = divide(a)(1)
			return approximately(result, a)
		}),
		{ numRuns: 1000 }
	)
})

Deno.test("divide - dividing by -1 negates", () => {
	fc.assert(
		fc.property(finiteNumber(), (a) => {
			const result = divide(a)(-1)
			return approximately(result, -a)
		}),
		{ numRuns: 1000 }
	)
})

Deno.test("divide - zero divided by any non-zero is zero", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, noDefaultInfinity: true }).filter(n => n !== 0),
			(divisor) => {
				const result = divide(0)(divisor)
				// Check for both positive and negative zero
				return result === 0 || Object.is(result, -0)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("divide - self division equals 1", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, noDefaultInfinity: true }).filter(n => n !== 0),
			(a) => {
				const result = divide(a)(a)
				return approximately(result, 1)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("divide - reciprocal property", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, noDefaultInfinity: true }).filter(n => n !== 0),
			(a) => {
				// 1 / a = reciprocal
				// a * reciprocal = 1
				const reciprocal = divide(1)(a)
				const product = a * reciprocal
				return approximately(product, 1, Math.abs(product) * 1e-10)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("divide - identity with special values", () => {
	// Positive numbers
	assertEquals(divide(42)(1), 42)
	assertEquals(divide(3.14)(1), 3.14)
	assertEquals(divide(0.001)(1), 0.001)
	
	// Negative numbers
	assertEquals(divide(-42)(1), -42)
	assertEquals(divide(-3.14)(1), -3.14)
	
	// Edge cases
	assertEquals(divide(Number.MAX_SAFE_INTEGER)(1), Number.MAX_SAFE_INTEGER)
	assertEquals(divide(Number.MIN_SAFE_INTEGER)(1), Number.MIN_SAFE_INTEGER)
	assertEquals(divide(Number.EPSILON)(1), Number.EPSILON)
	
	// Infinity
	assertEquals(divide(Infinity)(1), Infinity)
	assertEquals(divide(-Infinity)(1), -Infinity)
})

Deno.test("divide - negation with -1", () => {
	const testValues = [
		1, -1, 42, -42, 0.5, -0.5,
		Math.PI, -Math.PI,
		Number.MAX_VALUE, -Number.MAX_VALUE
	]
	
	for (const value of testValues) {
		assertEquals(divide(value)(-1), -value, `${value} / -1 should equal ${-value}`)
	}
})

Deno.test("divide - identity preservation in chains", () => {
	fc.assert(
		fc.property(finiteNumber(), (a) => {
			// Dividing by 1 multiple times should preserve the value
			const result = divide(divide(divide(a)(1))(1))(1)
			return approximately(result, a)
		}),
		{ numRuns: 500 }
	)
})