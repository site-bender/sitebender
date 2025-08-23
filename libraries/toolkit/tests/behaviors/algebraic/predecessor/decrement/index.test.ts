import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import * as fc from "npm:fast-check@3"

import decrement from "../../../../../src/simple/math/decrement/index.ts"
import increment from "../../../../../src/simple/math/increment/index.ts"

Deno.test("decrement", async (t) => {
	await t.step("predecessor properties", async (t) => {
		await t.step("should subtract exactly 1 from any number", () => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true }),
					(n) => {
						const result = decrement(n)
						
						// For finite numbers, decrement subtracts exactly 1
						if (isFinite(n)) {
							return result === n - 1
						}
						
						// For infinite values, they remain unchanged
						if (n === Infinity) return result === Infinity
						if (n === -Infinity) return result === -Infinity
						
						return true
					}
				),
				{ numRuns: 1000 }
			)
		})

		await t.step("should be the predecessor function", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: -1000000, max: 1000000 }),
					(n) => {
						// decrement(n) should be the largest integer less than n
						const result = decrement(n)
						return result === n - 1
					}
				),
				{ numRuns: 1000 }
			)
		})

		await t.step("should preserve ordering (monotonic)", () => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true }),
					fc.float({ noNaN: true }),
					(a, b) => {
						const decA = decrement(a)
						const decB = decrement(b)
						
						// Handle special cases first
						if (!isFinite(a) || !isFinite(b)) {
							if (a === b) return decA === decB
							if (a < b) return decA < decB
							return decA > decB
						}
						
						// For finite numbers, account for floating-point precision
						const epsilon = 1e-10
						
						// If a < b, then decrement(a) < decrement(b)
						if (a < b && Math.abs(a - b) > epsilon) {
							return decA < decB
						}
						// If a > b, then decrement(a) > decrement(b)
						if (a > b && Math.abs(a - b) > epsilon) {
							return decA > decB
						}
						// If a ≈ b, then decrement(a) ≈ decrement(b)
						return Math.abs(decA - decB) < epsilon
					}
				),
				{ numRuns: 1000 }
			)
		})

		await t.step("should be injective (one-to-one) for practical values", () => {
			fc.assert(
				fc.property(
					// Test only with integers where the property actually holds
					fc.integer({ min: -1000000, max: 1000000 }),
					fc.integer({ min: -1000000, max: 1000000 }),
					(a, b) => {
						const decA = decrement(a)
						const decB = decrement(b)
						
						// If decrement(a) === decrement(b), then a === b
						// This property holds perfectly for integers
						if (decA === decB) {
							return a === b
						}
						
						return true
					}
				),
				{ numRuns: 1000 }
			)
		})
	})

	await t.step("inverse relationship", async (t) => {
		await t.step("should be inverse of increment", () => {
			fc.assert(
				fc.property(
					fc.oneof(
						fc.integer({ min: -1000000, max: 1000000 }),
						fc.float({ noNaN: true, min: -1000, max: 1000 })
							// Filter out very small numbers where precision is lost
							.filter(n => Math.abs(n) > 1e-8 || n === 0)
					),
					(n) => {
						// decrement(increment(n)) === n
						const result1 = decrement(increment(n))
						// increment(decrement(n)) === n
						const result2 = increment(decrement(n))
						
						if (isFinite(n)) {
							// Accept that -0 becomes 0 through arithmetic
							const isZero = (x: number) => x === 0 || Object.is(x, -0)
							if (isZero(n)) {
								return isZero(result1) && isZero(result2)
							}
							
							return result1 === n && result2 === n
						}
						
						// Special cases
						if (n === Infinity) return result1 === Infinity && result2 === Infinity
						if (n === -Infinity) return result1 === -Infinity && result2 === -Infinity
						
						return true
					}
				),
				{ numRuns: 1000 }
			)
		})
	})

	await t.step("algebraic properties", async (t) => {
		await t.step("should distribute over subtraction: decrement(a - b) = decrement(a) - b", () => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true, min: -1e6, max: 1e6 }),
					fc.float({ noNaN: true, min: -1e6, max: 1e6 }),
					(a, b) => {
						const left = decrement(a - b)
						const right = decrement(a) - b
						
						// Account for floating point precision
						return Math.abs(left - right) < 1e-10
					}
				),
				{ numRuns: 1000 }
			)
		})

		await t.step("should be translation: decrement(decrement(n)) = n - 2", () => {
			fc.assert(
				fc.property(
					fc.oneof(
						fc.integer({ min: -1000000, max: 1000000 }),
						fc.float({ noNaN: true, min: -1000, max: 1000 })
					),
					(n) => {
						const result = decrement(decrement(n))
						const expected = n - 2
						
						if (isFinite(n)) {
							// For floating point numbers, we need to account for precision
							// The error accumulates with operations
							// For very small numbers, use absolute epsilon; for larger numbers, use relative
							const epsilon = Math.max(
								Math.abs(expected) * Number.EPSILON * 4,  // Relative epsilon
								Number.EPSILON * 10  // Absolute minimum epsilon
							)
							return Math.abs(result - expected) <= epsilon
						}
						
						// Special cases
						if (n === Infinity) return result === Infinity
						if (n === -Infinity) return result === -Infinity
						
						return true
					}
				),
				{ numRuns: 1000 }
			)
		})
	})

	await t.step("special values", async (t) => {
		await t.step("should handle zero correctly", () => {
			assertEquals(decrement(0), -1)
			assertEquals(decrement(-0), -1)
		})

		await t.step("should handle positive numbers", () => {
			assertEquals(decrement(1), 0)
			assertEquals(decrement(2), 1)
			assertEquals(decrement(10), 9)
			assertEquals(decrement(100), 99)
		})

		await t.step("should handle negative numbers", () => {
			assertEquals(decrement(-1), -2)
			assertEquals(decrement(-10), -11)
			assertEquals(decrement(-100), -101)
			assertEquals(decrement(-1000), -1001)
		})

		await t.step("should handle decimal numbers", () => {
			assertEquals(decrement(5.5), 4.5)
			// Note: 1.1 - 1 has floating point precision issues
			assertEquals(Math.abs(decrement(1.1) - 0.1) < 1e-10, true)
			assertEquals(decrement(0.5), -0.5)
			assertEquals(decrement(-0.5), -1.5)
			assertEquals(decrement(3.14159), 2.14159)
		})

		await t.step("should handle special floating point values", () => {
			assertEquals(decrement(Infinity), Infinity)
			assertEquals(decrement(-Infinity), -Infinity)
			assertEquals(Number.isNaN(decrement(NaN)), true)
		})

		await t.step("should handle boundary values", () => {
			// Near MAX_SAFE_INTEGER
			assertEquals(decrement(Number.MAX_SAFE_INTEGER), Number.MAX_SAFE_INTEGER - 1)
			assertEquals(decrement(Number.MAX_SAFE_INTEGER - 1), Number.MAX_SAFE_INTEGER - 2)
			
			// Near MIN_SAFE_INTEGER
			assertEquals(decrement(Number.MIN_SAFE_INTEGER + 1), Number.MIN_SAFE_INTEGER)
			assertEquals(decrement(Number.MIN_SAFE_INTEGER), Number.MIN_SAFE_INTEGER - 1)
			
			// Very small positive numbers
			assertEquals(decrement(Number.MIN_VALUE), -1 + Number.MIN_VALUE)
			assertEquals(decrement(-Number.MIN_VALUE), -1 - Number.MIN_VALUE)
		})
	})

	await t.step("error handling", async (t) => {
		await t.step("should return NaN for null", () => {
			assertEquals(Number.isNaN(decrement(null as any)), true)
		})

		await t.step("should return NaN for undefined", () => {
			assertEquals(Number.isNaN(decrement(undefined as any)), true)
		})

		await t.step("should return NaN for non-numeric values", () => {
			assertEquals(Number.isNaN(decrement("5" as any)), true)
			assertEquals(Number.isNaN(decrement("abc" as any)), true)
			assertEquals(Number.isNaN(decrement({} as any)), true)
			assertEquals(Number.isNaN(decrement([] as any)), true)
			assertEquals(Number.isNaN(decrement(true as any)), true)
			assertEquals(Number.isNaN(decrement(false as any)), true)
		})
	})

	await t.step("JSDoc examples", async (t) => {
		await t.step("basic decrement", () => {
			assertEquals(decrement(5), 4)
			assertEquals(decrement(1), 0)
			assertEquals(decrement(0), -1)
			assertEquals(decrement(-1), -2)
		})

		await t.step("decimal numbers", () => {
			assertEquals(decrement(5.5), 4.5)
			// Note: 1.1 - 1 has floating point precision issues
			assertEquals(Math.abs(decrement(1.1) - 0.1) < 1e-10, true)
			assertEquals(decrement(0.5), -0.5)
			assertEquals(decrement(-0.5), -1.5)
		})

		await t.step("large numbers", () => {
			assertEquals(decrement(1000000), 999999)
			assertEquals(decrement(Number.MAX_SAFE_INTEGER), Number.MAX_SAFE_INTEGER - 1)
		})

		await t.step("small numbers", () => {
			assertEquals(decrement(Number.MIN_VALUE), -1 + Number.MIN_VALUE)
			assertEquals(decrement(-Number.MIN_VALUE), -1 - Number.MIN_VALUE)
		})

		await t.step("special values", () => {
			assertEquals(decrement(Infinity), Infinity)
			assertEquals(decrement(-Infinity), -Infinity)
			assertEquals(Number.isNaN(decrement(NaN)), true)
		})

		await t.step("edge cases", () => {
			assertEquals(decrement(1), 0)
			assertEquals(decrement(-0), -1)
		})

		await t.step("invalid inputs", () => {
			assertEquals(Number.isNaN(decrement(null as any)), true)
			assertEquals(Number.isNaN(decrement(undefined as any)), true)
			assertEquals(Number.isNaN(decrement("5" as any)), true)
			assertEquals(Number.isNaN(decrement("abc" as any)), true)
			assertEquals(Number.isNaN(decrement({} as any)), true)
			assertEquals(Number.isNaN(decrement([] as any)), true)
		})

		await t.step("loop counter", () => {
			let counter = 10
			const results: Array<number> = []
			while (counter > 0) {
				results.push(counter)
				counter = decrement(counter)
			}
			assertEquals(results, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
		})

		await t.step("array indexing", () => {
			const arr = ['a', 'b', 'c', 'd', 'e']
			let index = arr.length
			index = decrement(index)
			assertEquals(index, 4) // last valid index
		})

		await t.step("countdown timer", () => {
			function countdown(seconds: number): Array<number> {
				const result: Array<number> = []
				let current = seconds
				while (current >= 0) {
					result.push(current)
					current = decrement(current)
				}
				return result
			}
			assertEquals(countdown(5), [5, 4, 3, 2, 1, 0])
		})

		await t.step("page navigation", () => {
			let currentPage = 10
			const previousPage = decrement(currentPage)
			assertEquals(previousPage, 9)
		})

		await t.step("level/stage progression", () => {
			const currentLevel = 5
			const previousLevel = decrement(currentLevel)
			assertEquals(previousLevel, 4)
		})

		await t.step("stock inventory", () => {
			let itemsInStock = 100
			itemsInStock = decrement(itemsInStock)
			assertEquals(itemsInStock, 99)
		})

		await t.step("array operations", () => {
			const numbers = [5, 4, 3, 2, 1]
			const decremented = numbers.map(decrement)
			assertEquals(decremented, [4, 3, 2, 1, 0])
		})

		await t.step("health/lives system", () => {
			let lives = 3
			lives = decrement(lives)
			assertEquals(lives, 2)
		})

		await t.step("score penalty", () => {
			let score = 1000
			const penalty = () => decrement(score)
			score = penalty()
			assertEquals(score, 999)
		})

		await t.step("date calculations", () => {
			const dayOfMonth = 15
			const yesterday = decrement(dayOfMonth)
			assertEquals(yesterday, 14)
		})

		await t.step("recursive backward traversal", () => {
			const results: Array<number> = []
			function reverseTraverse(from: number, to: number): void {
				if (from < to) return
				results.push(from)
				reverseTraverse(decrement(from), to)
			}
			reverseTraverse(5, 2)
			assertEquals(results, [5, 4, 3, 2])
		})

		await t.step("queue size tracking", () => {
			let queueSize = 10
			function dequeue(): number {
				queueSize = decrement(queueSize)
				return queueSize
			}
			assertEquals(dequeue(), 9)
			assertEquals(dequeue(), 8)
		})

		await t.step("iteration with functional approach", () => {
			let callCount = 0
			function repeat(n: number, fn: () => void): void {
				if (n <= 0) return
				fn()
				repeat(decrement(n), fn)
			}
			repeat(3, () => callCount++)
			assertEquals(callCount, 3)
		})

		await t.step("building sequences", () => {
			function decrementSequence(start: number, count: number): Array<number> {
				const result: Array<number> = []
				let current = start
				for (let i = 0; i < count; i++) {
					result.push(current)
					current = decrement(current)
				}
				return result
			}
			assertEquals(decrementSequence(10, 5), [10, 9, 8, 7, 6])
		})

		await t.step("comparison with manual subtraction", () => {
			const n = 100
			const manual = n - 1
			const functional = decrement(n)
			assertEquals(manual === functional, true)
		})

		await t.step("pipeline processing", () => {
			const pipeline = [
				(x: number) => x * 2,
				decrement,
				(x: number) => x / 3
			]
			const result = pipeline.reduce((acc, fn) => fn(acc), 6)
			assertEquals(Math.abs(result - 3.6666666666666665) < 1e-10, true)
		})

		await t.step("safe decrement with validation", () => {
			function safeDecrement(value: unknown): number | null {
				const num = typeof value === 'number' ? decrement(value) : NaN
				return isNaN(num) ? null : num
			}
			assertEquals(safeDecrement(5), 4)
			assertEquals(safeDecrement("invalid"), null)
		})
	})

	await t.step("immutability", async (t) => {
		await t.step("should not modify the original value", () => {
			const original = 5
			const result = decrement(original)
			assertEquals(original, 5)
			assertEquals(result, 4)
		})
	})

	await t.step("performance characteristics", async (t) => {
		await t.step("should be consistent for repeated calls", () => {
			const value = 42
			const result1 = decrement(value)
			const result2 = decrement(value)
			const result3 = decrement(value)
			
			assertEquals(result1, 41)
			assertEquals(result2, 41)
			assertEquals(result3, 41)
		})
	})
})