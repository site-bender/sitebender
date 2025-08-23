import { assertEquals, assertExists } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import ceiling from "../../../../../src/simple/math/ceiling/index.ts"

// ===========================
// Behavioral Properties
// ===========================

Deno.test("ceiling: monotonic property - if a <= b then ceiling(a) <= ceiling(b)", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			(a, b) => {
				const [smaller, larger] = a <= b ? [a, b] : [b, a]
				const ceilSmaller = ceiling(smaller)
				const ceilLarger = ceiling(larger)
				
				assertEquals(
					ceilSmaller <= ceilLarger,
					true,
					`Monotonicity violated: ceiling(${smaller}) = ${ceilSmaller} > ceiling(${larger}) = ${ceilLarger}`
				)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("ceiling: idempotent property - ceiling(ceiling(x)) === ceiling(x)", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			(n) => {
				const once = ceiling(n)
				const twice = ceiling(once)
				
				assertEquals(
					twice,
					once,
					`ceiling should be idempotent: ceiling(ceiling(${n})) = ${twice} !== ceiling(${n}) = ${once}`
				)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("ceiling: rounding up property - ceiling(x) >= x", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			(n) => {
				const result = ceiling(n)
				
				assertEquals(
					result >= n,
					true,
					`ceiling(${n}) = ${result} should be >= ${n}`
				)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("ceiling: integer property - ceiling always returns an integer", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			(n) => {
				const result = ceiling(n)
				
				assertEquals(
					Number.isInteger(result) || !Number.isFinite(result),
					true,
					`ceiling(${n}) = ${result} should be an integer or infinity`
				)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("ceiling: minimal distance property - ceiling(x) - x <= 1", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, noDefaultInfinity: true, min: -1e10, max: 1e10 }),
			(n) => {
				const result = ceiling(n)
				const distance = result - n
				
				assertEquals(
					distance <= 1,
					true,
					`ceiling(${n}) = ${result}, distance ${distance} should be <= 1`
				)
				
				// Additionally check it's in the range [0, 1)
				assertEquals(
					distance >= 0,
					true,
					`ceiling(${n}) = ${result}, distance ${distance} should be >= 0`
				)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("ceiling: integer invariant - ceiling(n) === n for integers", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: -1e10, max: 1e10 }),
			(n) => {
				const result = ceiling(n)
				
				assertEquals(
					result,
					n,
					`ceiling of integer ${n} should be ${n}, got ${result}`
				)
			}
		),
		{ numRuns: 1000 }
	)
})

// ===========================
// Edge Cases and Special Values
// ===========================

Deno.test("ceiling: special values", () => {
	assertEquals(ceiling(Infinity), Infinity, "ceiling(Infinity) should be Infinity")
	assertEquals(ceiling(-Infinity), -Infinity, "ceiling(-Infinity) should be -Infinity")
	assertEquals(Number.isNaN(ceiling(NaN)), true, "ceiling(NaN) should be NaN")
})

Deno.test("ceiling: zero handling", () => {
	assertEquals(ceiling(0), 0, "ceiling(0) should be 0")
	assertEquals(Object.is(ceiling(-0), -0), true, "ceiling(-0) should be -0")
})

Deno.test("ceiling: boundary values", () => {
	assertEquals(ceiling(Number.MAX_VALUE), Number.MAX_VALUE, "ceiling(MAX_VALUE)")
	assertEquals(ceiling(Number.MIN_VALUE), 1, "ceiling(MIN_VALUE) should be 1")
	assertEquals(Object.is(ceiling(-Number.MIN_VALUE), -0), true, "ceiling(-MIN_VALUE) should be -0")
})

// ===========================
// Null Safety
// ===========================

Deno.test("ceiling: null safety", () => {
	assertEquals(Number.isNaN(ceiling(null)), true, "ceiling(null) should be NaN")
	assertEquals(Number.isNaN(ceiling(undefined)), true, "ceiling(undefined) should be NaN")
})

Deno.test("ceiling: type safety", () => {
	// @ts-expect-error - Testing invalid input
	assertEquals(Number.isNaN(ceiling("5.7")), true, "ceiling(string) should be NaN")
	// @ts-expect-error - Testing invalid input
	assertEquals(Number.isNaN(ceiling("abc")), true, "ceiling(non-numeric string) should be NaN")
	// @ts-expect-error - Testing invalid input
	assertEquals(Number.isNaN(ceiling({})), true, "ceiling(object) should be NaN")
	// @ts-expect-error - Testing invalid input
	assertEquals(Number.isNaN(ceiling([])), true, "ceiling(array) should be NaN")
})

// ===========================
// JSDoc Examples (100% coverage)
// ===========================

Deno.test("ceiling: JSDoc examples - positive decimals round up", () => {
	assertEquals(ceiling(4.1), 5, "ceiling(4.1)")
	assertEquals(ceiling(4.5), 5, "ceiling(4.5)")
	assertEquals(ceiling(4.9), 5, "ceiling(4.9)")
	assertEquals(ceiling(0.1), 1, "ceiling(0.1)")
	assertEquals(ceiling(0.0001), 1, "ceiling(0.0001)")
})

Deno.test("ceiling: JSDoc examples - negative decimals round toward zero", () => {
	assertEquals(ceiling(-4.1), -4, "ceiling(-4.1)")
	assertEquals(ceiling(-4.5), -4, "ceiling(-4.5)")
	assertEquals(ceiling(-4.9), -4, "ceiling(-4.9)")
	assertEquals(Object.is(ceiling(-0.1), -0), true, "ceiling(-0.1) should be -0")
	assertEquals(Object.is(ceiling(-0.9999), -0), true, "ceiling(-0.9999) should be -0")
})

Deno.test("ceiling: JSDoc examples - integers remain unchanged", () => {
	assertEquals(ceiling(5), 5, "ceiling(5)")
	assertEquals(ceiling(-5), -5, "ceiling(-5)")
	assertEquals(ceiling(0), 0, "ceiling(0)")
	assertEquals(Object.is(ceiling(-0), -0), true, "ceiling(-0) should be -0")
})

Deno.test("ceiling: JSDoc examples - large numbers", () => {
	assertEquals(ceiling(1000000.1), 1000001, "ceiling(1000000.1)")
	assertEquals(ceiling(9999999.0001), 10000000, "ceiling(9999999.0001)")
})

Deno.test("ceiling: JSDoc examples - small numbers", () => {
	assertEquals(ceiling(1e-10), 1, "ceiling(1e-10)")
	assertEquals(Object.is(ceiling(-1e-10), -0), true, "ceiling(-1e-10) should be -0")
})

Deno.test("ceiling: JSDoc examples - special values", () => {
	assertEquals(ceiling(Infinity), Infinity, "ceiling(Infinity)")
	assertEquals(ceiling(-Infinity), -Infinity, "ceiling(-Infinity)")
	assertEquals(Number.isNaN(ceiling(NaN)), true, "ceiling(NaN)")
})

Deno.test("ceiling: JSDoc examples - edge cases", () => {
	assertEquals(ceiling(Number.MAX_VALUE), Number.MAX_VALUE, "ceiling(Number.MAX_VALUE)")
	assertEquals(ceiling(Number.MIN_VALUE), 1, "ceiling(Number.MIN_VALUE)")
	assertEquals(Object.is(ceiling(-Number.MIN_VALUE), -0), true, "ceiling(-Number.MIN_VALUE)")
})

Deno.test("ceiling: JSDoc examples - invalid inputs", () => {
	assertEquals(Number.isNaN(ceiling(null)), true, "ceiling(null)")
	assertEquals(Number.isNaN(ceiling(undefined)), true, "ceiling(undefined)")
	// @ts-expect-error - Testing invalid input
	assertEquals(Number.isNaN(ceiling("5.7")), true, "ceiling('5.7')")
	// @ts-expect-error - Testing invalid input
	assertEquals(Number.isNaN(ceiling("abc")), true, "ceiling('abc')")
	// @ts-expect-error - Testing invalid input
	assertEquals(Number.isNaN(ceiling({})), true, "ceiling({})")
	// @ts-expect-error - Testing invalid input
	assertEquals(Number.isNaN(ceiling([])), true, "ceiling([])")
})

Deno.test("ceiling: JSDoc examples - pagination calculations", () => {
	function calculatePages(totalItems: number, itemsPerPage: number): number {
		return ceiling(totalItems / itemsPerPage)
	}
	assertEquals(calculatePages(95, 10), 10, "95 items need 10 pages")
	assertEquals(calculatePages(100, 10), 10, "100 items need 10 pages exactly")
	assertEquals(calculatePages(101, 10), 11, "101 items need 11 pages")
})

Deno.test("ceiling: JSDoc examples - price rounding", () => {
	function roundUpPrice(price: number): number {
		return ceiling(price)
	}
	assertEquals(roundUpPrice(19.99), 20, "Round $19.99 up to $20")
	assertEquals(roundUpPrice(19.01), 20, "Round $19.01 up to $20")
})

Deno.test("ceiling: JSDoc examples - time calculations", () => {
	function minutesToHours(minutes: number): number {
		return ceiling(minutes / 60)
	}
	assertEquals(minutesToHours(90), 2, "90 minutes = 2 hours")
	assertEquals(minutesToHours(61), 2, "61 minutes = 2 hours")
	assertEquals(minutesToHours(60), 1, "60 minutes = 1 hour")
})

Deno.test("ceiling: JSDoc examples - storage allocation", () => {
	function calculateBlocks(bytes: number, blockSize: number = 4096): number {
		return ceiling(bytes / blockSize)
	}
	assertEquals(calculateBlocks(5000), 2, "5000 bytes need 2 blocks")
	assertEquals(calculateBlocks(4096), 1, "4096 bytes need 1 block exactly")
})

Deno.test("ceiling: JSDoc examples - batch processing", () => {
	function calculateBatches(items: number, batchSize: number): number {
		return ceiling(items / batchSize)
	}
	assertEquals(calculateBatches(250, 100), 3, "250 items need 3 batches of 100")
})

Deno.test("ceiling: JSDoc examples - resource allocation", () => {
	function serversNeeded(requests: number, requestsPerServer: number): number {
		return ceiling(requests / requestsPerServer)
	}
	assertEquals(serversNeeded(1500, 500), 3, "1500 requests need 3 servers")
})

Deno.test("ceiling: JSDoc examples - shipping calculations", () => {
	function boxesNeeded(items: number, itemsPerBox: number): number {
		return ceiling(items / itemsPerBox)
	}
	assertEquals(boxesNeeded(47, 12), 4, "47 items need 4 boxes")
})

Deno.test("ceiling: JSDoc examples - progress bar segments", () => {
	function progressSegments(progress: number, segments: number = 10): number {
		return ceiling(progress * segments / 100)
	}
	assertEquals(progressSegments(67), 7, "67% fills 7 segments out of 10")
})

Deno.test("ceiling: JSDoc examples - grid layout calculations", () => {
	function gridRows(items: number, columns: number): number {
		return ceiling(items / columns)
	}
	assertEquals(gridRows(25, 4), 7, "25 items in 4 columns need 7 rows")
})

Deno.test("ceiling: JSDoc examples - rate limiting", () => {
	function waitTime(requests: number, rateLimit: number): number {
		const seconds = requests / rateLimit
		return ceiling(seconds)
	}
	assertEquals(waitTime(150, 60), 3, "150 requests at 60/sec need 3 seconds")
})

Deno.test("ceiling: JSDoc examples - array chunking", () => {
	const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	const chunkSize = 3
	const chunks = ceiling(data.length / chunkSize)
	assertEquals(chunks, 4, "10 items in chunks of 3 need 4 chunks")
})

Deno.test("ceiling: JSDoc examples - memory alignment", () => {
	function alignToWord(bytes: number, wordSize: number = 4): number {
		return ceiling(bytes / wordSize) * wordSize
	}
	assertEquals(alignToWord(13), 16, "13 bytes aligned to 4-byte boundary is 16")
})

Deno.test("ceiling: JSDoc examples - safe calculation", () => {
	function safeCeil(value: unknown): number | null {
		const num = typeof value === 'number' ? ceiling(value) : NaN
		return isNaN(num) ? null : num
	}
	assertEquals(safeCeil(4.7), 5, "Safe ceiling of 4.7")
	assertEquals(safeCeil("invalid"), null, "Safe ceiling of invalid input")
})

// ===========================
// Type Verification
// ===========================

Deno.test("ceiling: type verification", () => {
	assertExists(ceiling)
	assertEquals(typeof ceiling, "function")
	assertEquals(typeof ceiling(5.5), "number")
})