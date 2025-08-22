import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import add from "../../../../../src/simple/math/add/index.ts"
import {
	edgeCaseNumber,
	finiteNumber,
	nullableNumber,
} from "../../../../helpers/generators/numeric/index.ts"

Deno.test("add - commutative property: a + b = b + a", () => {
	fc.assert(
		fc.property(finiteNumber(), finiteNumber(), (a, b) => {
			const result1 = add(a)(b)
			const result2 = add(b)(a)
			
			// Use Object.is for exact comparison including -0/+0 distinction
			return Object.is(result1, result2) ||
				(Number.isNaN(result1) && Number.isNaN(result2))
		}),
		{ numRuns: 1000 }
	)
})

Deno.test("add - commutative with edge case numbers", () => {
	fc.assert(
		fc.property(edgeCaseNumber(), edgeCaseNumber(), (a, b) => {
			const result1 = add(a)(b)
			const result2 = add(b)(a)
			
			// Should be commutative even with edge cases
			return Object.is(result1, result2) ||
				(Number.isNaN(result1) && Number.isNaN(result2))
		}),
		{ numRuns: 1000 }
	)
})

Deno.test("add - commutative with null/undefined", () => {
	fc.assert(
		fc.property(nullableNumber(), nullableNumber(), (a, b) => {
			const result1 = add(a)(b)
			const result2 = add(b)(a)
			
			// Both should return NaN for any null/undefined input
			if (a == null || b == null) {
				return Number.isNaN(result1) && Number.isNaN(result2)
			}
			
			return Object.is(result1, result2)
		}),
		{ numRuns: 1000 }
	)
})

Deno.test("add - commutative with special value pairs", () => {
	const testPairs = [
		[0, 1],
		[1, -1],
		[Infinity, 1],
		[Infinity, -Infinity],
		[NaN, 5],
		[Number.MAX_VALUE, Number.MIN_VALUE],
		[Number.EPSILON, 1],
		[Math.PI, Math.E],
	]
	
	for (const [a, b] of testPairs) {
		const result1 = add(a)(b)
		const result2 = add(b)(a)
		
		assertEquals(
			Object.is(result1, result2) || (Number.isNaN(result1) && Number.isNaN(result2)),
			true,
			`Failed: ${a} + ${b} !== ${b} + ${a}`
		)
	}
})

Deno.test("add - commutative in practical scenarios", () => {
	// Price calculation
	const price = 99.99
	const tax = 8.25
	assertEquals(add(price)(tax), add(tax)(price))
	
	// Coordinate translation
	const x = 150
	const dx = -25
	assertEquals(add(x)(dx), add(dx)(x))
	
	// Score accumulation
	const baseScore = 85
	const bonus = 15
	assertEquals(add(baseScore)(bonus), add(bonus)(baseScore))
})