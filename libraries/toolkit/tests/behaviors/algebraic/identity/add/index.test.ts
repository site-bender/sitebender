import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import add from "../../../../../src/simple/math/add/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"
import {
	edgeCaseNumber,
	finiteNumber,
} from "../../../../helpers/generators/numeric/index.ts"

Deno.test("add - identity element is zero: a + 0 = a", () => {
	fc.assert(
		fc.property(finiteNumber(), (a) => {
			const rightIdentity = add(a)(0)
			const leftIdentity = add(0)(a)
			
			return approximately(rightIdentity, a) && approximately(leftIdentity, a)
		}),
		{ numRuns: 1000 }
	)
})

Deno.test("add - zero identity with special values", () => {
	const specialValues = [
		0,
		-0,
		1,
		-1,
		Number.MAX_SAFE_INTEGER,
		Number.MIN_SAFE_INTEGER,
		Number.EPSILON,
		1e10,
		-1e10,
		0.1,
		-0.1,
		Math.PI,
		Math.E,
	]
	
	for (const value of specialValues) {
		assertEquals(add(value)(0), value, `${value} + 0 should equal ${value}`)
		assertEquals(add(0)(value), value, `0 + ${value} should equal ${value}`)
	}
})

Deno.test("add - zero identity with edge cases", () => {
	// Infinity cases
	assertEquals(add(Infinity)(0), Infinity)
	assertEquals(add(0)(Infinity), Infinity)
	assertEquals(add(-Infinity)(0), -Infinity)
	assertEquals(add(0)(-Infinity), -Infinity)
	
	// NaN cases - NaN is not affected by identity
	assertEquals(Number.isNaN(add(NaN)(0)), true)
	assertEquals(Number.isNaN(add(0)(NaN)), true)
})

Deno.test("add - negative zero behavior", () => {
	// JavaScript treats -0 and 0 as equal for most purposes
	// but Object.is can distinguish them
	assertEquals(add(5)(-0), 5)
	assertEquals(add(-0)(5), 5)
	
	// -0 + 0 = 0 (positive zero)
	assertEquals(Object.is(add(-0)(0), 0), true)
	assertEquals(Object.is(add(0)(-0), 0), true)
	
	// -0 + -0 = -0
	assertEquals(Object.is(add(-0)(-0), -0), true)
})

Deno.test("add - identity property in reduce operations", () => {
	fc.assert(
		fc.property(
			fc.array(finiteNumber(), { minLength: 0, maxLength: 20 }),
			(numbers) => {
				// Using 0 as initial value should give same result as sum
				const sumWithIdentity = numbers.reduce((acc, n) => add(acc)(n), 0)
				const expectedSum = numbers.reduce((acc, n) => acc + n, 0)
				
				const epsilon = Math.abs(expectedSum) * 1e-10
				return approximately(sumWithIdentity, expectedSum, Math.max(epsilon, 1e-10))
			}
		),
		{ numRuns: 500 }
	)
})

Deno.test("add - multiple identity applications", () => {
	fc.assert(
		fc.property(finiteNumber(), (a) => {
			// Adding zero multiple times should still give original value
			const multipleZeros = add(add(add(add(a)(0))(0))(0))(0)
			
			return approximately(multipleZeros, a)
		}),
		{ numRuns: 1000 }
	)
})

Deno.test("add - identity element uniqueness", () => {
	// Verify that 0 is the unique identity element
	// For any non-zero e, there exists an x such that x + e ≠ x
	const candidates = [0.1, -0.1, 1, -1, 0.01, -0.01]
	
	for (const candidate of candidates) {
		// For each candidate, show it's not an identity
		// by finding at least one x where x + candidate ≠ x
		const testValues = [1, 10, 100, -1, -10, -100]
		
		let isIdentity = true
		for (const x of testValues) {
			const result = add(x)(candidate)
			// If x + candidate ≠ x for any x, then candidate is not identity
			if (!approximately(result, x, 1e-12)) {
				isIdentity = false
				break
			}
		}
		
		// Candidate should NOT be an identity element
		assertEquals(isIdentity, false, `${candidate} should not be an identity element`)
	}
	
	// Verify 0 IS the identity element
	fc.assert(
		fc.property(finiteNumber(), (x) => {
			return approximately(add(x)(0), x) && approximately(add(0)(x), x)
		}),
		{ numRuns: 500 }
	)
})