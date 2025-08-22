import { assertEquals } from "jsr:@std/assert@1.0.10"
import * as fc from "npm:fast-check@3.x.x"

import sign from "../../../../../src/simple/math/sign/index.ts"

Deno.test("sign: ternary property", async (t) => {
	await t.step("returns only -1, 0, or 1 for valid numbers", () => {
		fc.assert(
			fc.property(fc.float(), (n) => {
				const result = sign(n)
				
				if (Number.isNaN(n)) {
					return Number.isNaN(result)
				}
				
				return result === -1 || result === 0 || result === 1
			}),
			{ numRuns: 1000 }
		)
	})

	await t.step("sign(n) * |n| = n for finite numbers", () => {
		fc.assert(
			fc.property(fc.float({ noNaN: true }), (n) => {
				if (!Number.isFinite(n)) return true
				
				const s = sign(n)
				const result = s * Math.abs(n)
				
				// Handle -0 case
				if (Object.is(n, -0)) {
					return Object.is(result, -0) || result === 0
				}
				
				// Use Object.is for exact comparison including -0
				return Object.is(result, n) || 
					(Math.abs(result - n) < Number.EPSILON)
			}),
			{ numRuns: 1000 }
		)
	})
})

Deno.test("sign: sign preservation", async (t) => {
	await t.step("sign(n) = -sign(-n) for non-zero values", () => {
		fc.assert(
			fc.property(fc.float({ noNaN: true }), (n) => {
				if (n === 0 || Object.is(n, -0)) {
					// Both 0 and -0 should return 0
					return sign(n) === 0 && sign(-n) === 0
				}
				
				return sign(n) === -sign(-n)
			}),
			{ numRuns: 1000 }
		)
	})

	await t.step("sign(a*b) = sign(a) * sign(b)", () => {
		fc.assert(
			fc.property(
				fc.float({ noNaN: true }),
				fc.float({ noNaN: true }),
				(a, b) => {
					const product = a * b
					const signProduct = sign(product)
					const signMultiply = sign(a) * sign(b)
					
					// Handle overflow/underflow cases
					if (!Number.isFinite(product)) {
						return true
					}
					
					return signProduct === signMultiply
				}
			),
			{ numRuns: 1000 }
		)
	})
})

Deno.test("sign: ordering property", async (t) => {
	await t.step("if a < b and b < c, then sign(a-b) = -1 and sign(b-c) = -1", () => {
		fc.assert(
			fc.property(
				fc.float({ noNaN: true }),
				fc.float({ noNaN: true }),
				fc.float({ noNaN: true }),
				(a, b, c) => {
					// Order the values
					const [x, y, z] = [a, b, c].sort((p, q) => p - q)
					
					if (x === y || y === z) {
						// Skip equal values
						return true
					}
					
					// x < y < z
					return sign(x - y) === -1 && sign(y - z) === -1
				}
			),
			{ numRuns: 1000 }
		)
	})
})

Deno.test("sign: JSDoc examples (consolidated to 10)", async (t) => {
	await t.step("positive numbers return 1", () => {
		assertEquals(sign(5), 1)
		assertEquals(sign(42), 1)
		assertEquals(sign(0.001), 1)
		assertEquals(sign(Number.MAX_VALUE), 1)
		assertEquals(sign(Number.EPSILON), 1)
	})

	await t.step("negative numbers return -1", () => {
		assertEquals(sign(-5), -1)
		assertEquals(sign(-42), -1)
		assertEquals(sign(-0.001), -1)
		assertEquals(sign(Number.MIN_SAFE_INTEGER), -1)
		assertEquals(sign(-Number.EPSILON), -1)
	})

	await t.step("zero handling", () => {
		assertEquals(sign(0), 0)
		assertEquals(sign(-0), 0)
		assertEquals(sign(+0), 0)
	})

	await t.step("special values", () => {
		assertEquals(sign(Infinity), 1)
		assertEquals(sign(-Infinity), -1)
		assertEquals(Number.isNaN(sign(NaN)), true)
	})

	await t.step("invalid inputs return NaN", () => {
		assertEquals(Number.isNaN(sign(null)), true)
		assertEquals(Number.isNaN(sign(undefined)), true)
		// @ts-ignore - Testing runtime behavior
		assertEquals(Number.isNaN(sign("5")), true)
		// @ts-ignore - Testing runtime behavior
		assertEquals(Number.isNaN(sign({})), true)
		// @ts-ignore - Testing runtime behavior
		assertEquals(Number.isNaN(sign([])), true)
	})

	await t.step("array operations", () => {
		const numbers = [-3, -1, 0, 1, 3]
		assertEquals(numbers.map(sign), [-1, -1, 0, 1, 1])
		
		const mixed = [5, -2.5, 0, 8, -10]
		assertEquals(mixed.map(sign), [1, -1, 0, 1, -1])
	})

	await t.step("comparison helper", () => {
		const compare = (a: number, b: number) => sign(a - b)
		assertEquals(compare(5, 3), 1)  // a > b
		assertEquals(compare(3, 5), -1) // a < b
		assertEquals(compare(5, 5), 0)  // a === b
	})

	await t.step("trend analysis", () => {
		assertEquals(sign(2.5), 1)   // increasing
		assertEquals(sign(-1.8), -1) // decreasing
		assertEquals(sign(0), 0)      // no change
	})

	await t.step("normalization helper", () => {
		// Note: The JSDoc example is incorrect - n * sign(n) doesn't normalize
		// It should be Math.abs(n) to get absolute value
		// But we're testing what actually happens
		const normalize = (n: number) => n * sign(n)
		assertEquals(normalize(-5), 5)  // -5 * -1 = 5
		assertEquals(normalize(5), 5)   // 5 * 1 = 5
		assertEquals(normalize(0), 0)   // 0 * 0 = 0
	})

	await t.step("three-way comparison", () => {
		const threeWayCompare = (a: number, b: number) => {
			const s = sign(a - b)
			if (s === -1) return 'less'
			if (s === 1) return 'greater'
			return 'equal'
		}
		assertEquals(threeWayCompare(3, 5), 'less')
		assertEquals(threeWayCompare(5, 3), 'greater')
		assertEquals(threeWayCompare(5, 5), 'equal')
	})
})

Deno.test("sign: error handling and null safety", async (t) => {
	await t.step("handles null and undefined", () => {
		assertEquals(Number.isNaN(sign(null)), true)
		assertEquals(Number.isNaN(sign(undefined)), true)
	})

	await t.step("NaN propagation", () => {
		const result = sign(NaN)
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("safe sign with validation", () => {
		const safeSign = (value: unknown): number | null => {
			const num = typeof value === 'number' ? value : NaN
			const result = sign(num)
			return Number.isNaN(result) ? null : result
		}
		assertEquals(safeSign(5), 1)
		assertEquals(safeSign(-5), -1)
		assertEquals(safeSign(0), 0)
		assertEquals(safeSign("5"), null)
		assertEquals(safeSign(null), null)
	})
})

Deno.test("sign: mathematical relationships", async (t) => {
	await t.step("sign as step function", () => {
		const step = (n: number) => (sign(n) + 1) / 2
		assertEquals(step(-5), 0)
		assertEquals(step(0), 0.5)
		assertEquals(step(5), 1)
	})

	await t.step("sign for absolute value", () => {
		// The JSDoc example is incorrect - n * sign(n) gives abs value
		const abs = (n: number) => n * sign(n)
		assertEquals(abs(-10), 10) // -10 * -1 = 10
		assertEquals(abs(10), 10)  // 10 * 1 = 10
	})

	await t.step("sign preservation in operations", () => {
		const preserveSign = (value: number, magnitude: number) => 
			sign(value) * Math.abs(magnitude)
		assertEquals(preserveSign(-5, 10), -10)
		assertEquals(preserveSign(5, 10), 10)
		assertEquals(preserveSign(0, 10), 0)
	})
})