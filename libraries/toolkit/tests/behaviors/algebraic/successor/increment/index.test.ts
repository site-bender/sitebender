import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import * as fc from "npm:fast-check@3"

import increment from "../../../../../src/simple/math/increment/index.ts"

Deno.test("increment", async (t) => {
	await t.step("successor properties", async (t) => {
		await t.step("should add exactly 1 to any number", () => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true }),
					(n) => {
						const result = increment(n)
						
						// For finite numbers, increment adds exactly 1
						if (isFinite(n)) {
							return result === n + 1
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

		await t.step("should be the successor function", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: -1000000, max: 1000000 }),
					(n) => {
						// increment(n) should be the smallest integer greater than n
						const result = increment(n)
						return result === n + 1
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
						const incA = increment(a)
						const incB = increment(b)
						
						// If a < b, then increment(a) < increment(b)
						if (a < b) {
							return incA < incB || (Number.isNaN(incA) && Number.isNaN(incB))
						}
						// If a > b, then increment(a) > increment(b)
						if (a > b) {
							return incA > incB || (Number.isNaN(incA) && Number.isNaN(incB))
						}
						// If a === b, then increment(a) === increment(b)
						// Use Object.is for exact comparison (handles -0 === 0 case)
						return Object.is(incA, incB)
					}
				),
				{ numRuns: 1000 }
			)
		})

		await t.step("should be injective (one-to-one)", () => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true }),
					fc.float({ noNaN: true }),
					(a, b) => {
						const incA = increment(a)
						const incB = increment(b)
						
						// If increment(a) === increment(b), then a === b
						// Use Object.is for exact equality
						if (Object.is(incA, incB)) {
							return Object.is(a, b)
						}
						return true
					}
				),
				{ numRuns: 1000 }
			)
		})
	})

	await t.step("algebraic properties", async (t) => {
		await t.step("should distribute over addition: increment(a + b) = increment(a) + b", () => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true, min: -1e6, max: 1e6 }),
					fc.float({ noNaN: true, min: -1e6, max: 1e6 }),
					(a, b) => {
						const left = increment(a + b)
						const right = increment(a) + b
						
						// Account for floating point precision
						return Math.abs(left - right) < 1e-10
					}
				),
				{ numRuns: 1000 }
			)
		})

		await t.step("should be translation: increment(increment(n)) = n + 2", () => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true }),
					(n) => {
						const result = increment(increment(n))
						
						if (isFinite(n)) {
							// Use Object.is for exact comparison or allow small epsilon for floating point
							return Object.is(result, n + 2) || Math.abs(result - (n + 2)) < 1e-10
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
			assertEquals(increment(0), 1)
			assertEquals(increment(-0), 1)
		})

		await t.step("should handle negative numbers", () => {
			assertEquals(increment(-1), 0)
			assertEquals(increment(-2), -1)
			assertEquals(increment(-10), -9)
			assertEquals(increment(-100), -99)
		})

		await t.step("should handle positive numbers", () => {
			assertEquals(increment(1), 2)
			assertEquals(increment(10), 11)
			assertEquals(increment(100), 101)
			assertEquals(increment(1000), 1001)
		})

		await t.step("should handle decimal numbers", () => {
			assertEquals(increment(5.5), 6.5)
			assertEquals(increment(0.9), 1.9)
			assertEquals(increment(-0.5), 0.5)
			assertEquals(increment(-1.5), -0.5)
			assertEquals(increment(3.14159), 4.14159)
		})

		await t.step("should handle special floating point values", () => {
			assertEquals(increment(Infinity), Infinity)
			assertEquals(increment(-Infinity), -Infinity)
			assertEquals(Number.isNaN(increment(NaN)), true)
		})

		await t.step("should handle boundary values", () => {
			// Near MAX_SAFE_INTEGER
			assertEquals(increment(Number.MAX_SAFE_INTEGER - 1), Number.MAX_SAFE_INTEGER)
			assertEquals(increment(Number.MAX_SAFE_INTEGER), Number.MAX_SAFE_INTEGER + 1)
			
			// Near MIN_SAFE_INTEGER
			assertEquals(increment(Number.MIN_SAFE_INTEGER), Number.MIN_SAFE_INTEGER + 1)
			assertEquals(increment(Number.MIN_SAFE_INTEGER + 1), Number.MIN_SAFE_INTEGER + 2)
			
			// Very small positive numbers
			assertEquals(increment(Number.MIN_VALUE), 1 + Number.MIN_VALUE)
			assertEquals(increment(-Number.MIN_VALUE), 1 - Number.MIN_VALUE)
		})
	})

	await t.step("error handling", async (t) => {
		await t.step("should return NaN for null", () => {
			assertEquals(Number.isNaN(increment(null as any)), true)
		})

		await t.step("should return NaN for undefined", () => {
			assertEquals(Number.isNaN(increment(undefined as any)), true)
		})

		await t.step("should return NaN for non-numeric values", () => {
			assertEquals(Number.isNaN(increment("5" as any)), true)
			assertEquals(Number.isNaN(increment("abc" as any)), true)
			assertEquals(Number.isNaN(increment({} as any)), true)
			assertEquals(Number.isNaN(increment([] as any)), true)
			assertEquals(Number.isNaN(increment(true as any)), true)
			assertEquals(Number.isNaN(increment(false as any)), true)
		})
	})

	await t.step("JSDoc examples", async (t) => {
		await t.step("basic increment", () => {
			assertEquals(increment(5), 6)
			assertEquals(increment(0), 1)
			assertEquals(increment(-1), 0)
			assertEquals(increment(-2), -1)
		})

		await t.step("decimal numbers", () => {
			assertEquals(increment(5.5), 6.5)
			assertEquals(increment(0.9), 1.9)
			assertEquals(increment(-0.5), 0.5)
			assertEquals(increment(-1.5), -0.5)
		})

		await t.step("large numbers", () => {
			assertEquals(increment(999999), 1000000)
			assertEquals(increment(Number.MAX_SAFE_INTEGER - 1), Number.MAX_SAFE_INTEGER)
			assertEquals(increment(Number.MAX_SAFE_INTEGER), Number.MAX_SAFE_INTEGER + 1)
		})

		await t.step("small numbers", () => {
			assertEquals(increment(Number.MIN_VALUE), 1 + Number.MIN_VALUE)
			assertEquals(increment(-Number.MIN_VALUE), 1 - Number.MIN_VALUE)
		})

		await t.step("special values", () => {
			assertEquals(increment(Infinity), Infinity)
			assertEquals(increment(-Infinity), -Infinity)
			assertEquals(Number.isNaN(increment(NaN)), true)
		})

		await t.step("edge cases", () => {
			assertEquals(increment(-1), 0)
			assertEquals(increment(-0), 1)
		})

		await t.step("invalid inputs", () => {
			assertEquals(Number.isNaN(increment(null as any)), true)
			assertEquals(Number.isNaN(increment(undefined as any)), true)
			assertEquals(Number.isNaN(increment("5" as any)), true)
			assertEquals(Number.isNaN(increment("abc" as any)), true)
			assertEquals(Number.isNaN(increment({} as any)), true)
			assertEquals(Number.isNaN(increment([] as any)), true)
		})

		await t.step("loop counter", () => {
			let counter = 0
			const results: Array<number> = []
			while (counter < 10) {
				results.push(counter)
				counter = increment(counter)
			}
			assertEquals(results, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
		})

		await t.step("array indexing", () => {
			const arr = ['a', 'b', 'c', 'd', 'e']
			let index = 0
			index = increment(index)
			assertEquals(arr[index], 'b')
		})

		await t.step("generate sequence", () => {
			function sequence(start: number, count: number): Array<number> {
				const result: Array<number> = []
				let current = start
				for (let i = 0; i < count; i++) {
					result.push(current)
					current = increment(current)
				}
				return result
			}
			assertEquals(sequence(5, 5), [5, 6, 7, 8, 9])
		})

		await t.step("page navigation", () => {
			let currentPage = 1
			const nextPage = increment(currentPage)
			assertEquals(nextPage, 2)
		})

		await t.step("level progression", () => {
			const currentLevel = 5
			const nextLevel = increment(currentLevel)
			assertEquals(nextLevel, 6)
		})

		await t.step("score tracking", () => {
			let score = 0
			score = increment(score)
			assertEquals(score, 1)
		})

		await t.step("array operations", () => {
			const numbers = [1, 2, 3, 4, 5]
			const incremented = numbers.map(increment)
			assertEquals(incremented, [2, 3, 4, 5, 6])
		})

		await t.step("ID generation", () => {
			let lastId = 1000
			function generateId(): number {
				lastId = increment(lastId)
				return lastId
			}
			assertEquals(generateId(), 1001)
			assertEquals(generateId(), 1002)
		})

		await t.step("counter object", () => {
			const counter = {
				value: 0,
				next() {
					this.value = increment(this.value)
					return this.value
				}
			}
			assertEquals(counter.next(), 1)
			assertEquals(counter.next(), 2)
		})

		await t.step("date calculations", () => {
			const dayOfMonth = 15
			const tomorrow = increment(dayOfMonth)
			assertEquals(tomorrow, 16)
		})

		await t.step("iteration helper", () => {
			const iterations: Array<number> = []
			function times(n: number, fn: (i: number) => void): void {
				let i = 0
				while (i < n) {
					fn(i)
					i = increment(i)
				}
			}
			times(3, i => iterations.push(i))
			assertEquals(iterations, [0, 1, 2])
		})

		await t.step("step counter", () => {
			let steps = 0
			function takeStep(): number {
				steps = increment(steps)
				return steps
			}
			assertEquals(takeStep(), 1)
			assertEquals(takeStep(), 2)
		})

		await t.step("version numbering", () => {
			const version = {
				major: 1,
				minor: 2,
				patch: 3
			}
			version.patch = increment(version.patch)
			assertEquals(version, { major: 1, minor: 2, patch: 4 })
		})

		await t.step("building number sequences", () => {
			function range(start: number, end: number): Array<number> {
				const result: Array<number> = []
				let current = start
				while (current <= end) {
					result.push(current)
					current = increment(current)
				}
				return result
			}
			assertEquals(range(5, 10), [5, 6, 7, 8, 9, 10])
		})

		await t.step("recursive countdown", () => {
			const results: Array<number> = []
			function countUp(from: number, to: number): void {
				if (from > to) return
				results.push(from)
				countUp(increment(from), to)
			}
			countUp(1, 3)
			assertEquals(results, [1, 2, 3])
		})

		await t.step("comparison with manual addition", () => {
			const n = 100
			const manual = n + 1
			const functional = increment(n)
			assertEquals(manual === functional, true)
		})

		await t.step("pipeline processing", () => {
			const pipeline = [
				increment,
				(x: number) => x * 2,
				increment
			]
			const result = pipeline.reduce((acc, fn) => fn(acc), 5)
			assertEquals(result, 13) // ((5 + 1) * 2 + 1)
		})

		await t.step("finding next available", () => {
			function findNextAvailable(used: Set<number>, start: number = 0): number {
				let current = start
				while (used.has(current)) {
					current = increment(current)
				}
				return current
			}
			assertEquals(findNextAvailable(new Set([1, 2, 3, 5, 6]), 1), 4)
		})

		await t.step("safe increment with validation", () => {
			function safeIncrement(value: unknown): number | null {
				const num = typeof value === 'number' ? increment(value) : NaN
				return isNaN(num) ? null : num
			}
			assertEquals(safeIncrement(5), 6)
			assertEquals(safeIncrement("invalid"), null)
		})
	})

	await t.step("immutability", async (t) => {
		await t.step("should not modify the original value", () => {
			const original = 5
			const result = increment(original)
			assertEquals(original, 5)
			assertEquals(result, 6)
		})
	})

	await t.step("performance characteristics", async (t) => {
		await t.step("should be consistent for repeated calls", () => {
			const value = 42
			const result1 = increment(value)
			const result2 = increment(value)
			const result3 = increment(value)
			
			assertEquals(result1, 43)
			assertEquals(result2, 43)
			assertEquals(result3, 43)
		})
	})
})