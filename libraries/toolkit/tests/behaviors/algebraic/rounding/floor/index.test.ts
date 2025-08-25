import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import floor from "../../../../../src/simple/math/floor/index.ts"

// ===========================
// Behavioral Properties
// ===========================

Deno.test("floor: monotonic property - if a <= b then floor(a) <= floor(b)", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			(a, b) => {
				const [smaller, larger] = a <= b ? [a, b] : [b, a]
				const floorSmaller = floor(smaller)
				const floorLarger = floor(larger)

				assertEquals(
					floorSmaller <= floorLarger,
					true,
					`Monotonicity violated: floor(${smaller}) = ${floorSmaller} > floor(${larger}) = ${floorLarger}`,
				)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("floor: idempotent property - floor(floor(x)) === floor(x)", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			(n) => {
				const once = floor(n)
				const twice = floor(once)

				assertEquals(
					twice,
					once,
					`floor should be idempotent: floor(floor(${n})) = ${twice} !== floor(${n}) = ${once}`,
				)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("floor: rounding down property - floor(x) <= x", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			(n) => {
				const result = floor(n)

				assertEquals(
					result <= n,
					true,
					`floor(${n}) = ${result} should be <= ${n}`,
				)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("floor: integer property - floor always returns an integer", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			(n) => {
				const result = floor(n)

				assertEquals(
					Number.isInteger(result) || !Number.isFinite(result),
					true,
					`floor(${n}) = ${result} should be an integer or infinity`,
				)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("floor: minimal distance property - 0 <= x - floor(x) <= 1", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, noDefaultInfinity: true, min: -1e10, max: 1e10 }),
			(n) => {
				const result = floor(n)
				const distance = n - result

				// For most numbers, distance is in [0, 1)
				// But due to floating point precision, very small negative numbers
				// might result in distance exactly 1
				assertEquals(
					distance >= 0 && distance <= 1,
					true,
					`floor(${n}) = ${result}, distance ${distance} should be in [0, 1]`,
				)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("floor: integer invariant - floor(n) === n for integers", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: -1e10, max: 1e10 }),
			(n) => {
				const result = floor(n)

				assertEquals(
					result,
					n,
					`floor of integer ${n} should be ${n}, got ${result}`,
				)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("floor: relationship with ceiling - floor(x) + 1 >= ceiling(x) for any x", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			(n) => {
				const floorResult = floor(n)
				const ceilResult = Math.ceil(n)

				assertEquals(
					floorResult === ceilResult || floorResult + 1 === ceilResult,
					true,
					`floor(${n}) = ${floorResult} and ceil(${n}) = ${ceilResult} should differ by at most 1`,
				)
			},
		),
		{ numRuns: 1000 },
	)
})

// ===========================
// Edge Cases and Special Values
// ===========================

Deno.test("floor: special values", () => {
	assertEquals(floor(Infinity), Infinity, "floor(Infinity) should be Infinity")
	assertEquals(
		floor(-Infinity),
		-Infinity,
		"floor(-Infinity) should be -Infinity",
	)
	assertEquals(Number.isNaN(floor(NaN)), true, "floor(NaN) should be NaN")
})

Deno.test("floor: zero handling", () => {
	assertEquals(floor(0), 0, "floor(0) should be 0")
	assertEquals(Object.is(floor(-0), -0), true, "floor(-0) should be -0")
})

Deno.test("floor: boundary values", () => {
	assertEquals(floor(Number.MAX_VALUE), Number.MAX_VALUE, "floor(MAX_VALUE)")
	assertEquals(floor(Number.MIN_VALUE), 0, "floor(MIN_VALUE) should be 0")
	assertEquals(floor(-Number.MIN_VALUE), -1, "floor(-MIN_VALUE) should be -1")
})

// ===========================
// Null Safety
// ===========================

Deno.test("floor: null safety", () => {
	assertEquals(Number.isNaN(floor(null)), true, "floor(null) should be NaN")
	assertEquals(
		Number.isNaN(floor(undefined)),
		true,
		"floor(undefined) should be NaN",
	)
})

Deno.test("floor: type safety", () => {
	// @ts-expect-error - Testing invalid input
	assertEquals(Number.isNaN(floor("5.7")), true, "floor(string) should be NaN")
	// @ts-expect-error - Testing invalid input
	assertEquals(
		Number.isNaN(floor("abc")),
		true,
		"floor(non-numeric string) should be NaN",
	)
	// @ts-expect-error - Testing invalid input
	assertEquals(Number.isNaN(floor({})), true, "floor(object) should be NaN")
	// @ts-expect-error - Testing invalid input
	assertEquals(Number.isNaN(floor([])), true, "floor(array) should be NaN")
})

// ===========================
// JSDoc Examples (10 most representative)
// ===========================

Deno.test("floor: JSDoc examples - positive decimals round down", () => {
	assertEquals(floor(4.9), 4, "floor(4.9)")
	assertEquals(floor(4.5), 4, "floor(4.5)")
	assertEquals(floor(4.1), 4, "floor(4.1)")
	assertEquals(floor(0.9), 0, "floor(0.9)")
	assertEquals(floor(0.1), 0, "floor(0.1)")
	assertEquals(floor(0.0001), 0, "floor(0.0001)")
})

Deno.test("floor: JSDoc examples - negative decimals round away from zero", () => {
	assertEquals(floor(-4.1), -5, "floor(-4.1)")
	assertEquals(floor(-4.5), -5, "floor(-4.5)")
	assertEquals(floor(-4.9), -5, "floor(-4.9)")
	assertEquals(floor(-0.1), -1, "floor(-0.1)")
	assertEquals(floor(-0.9999), -1, "floor(-0.9999)")
})

Deno.test("floor: JSDoc examples - integers remain unchanged", () => {
	assertEquals(floor(5), 5, "floor(5)")
	assertEquals(floor(-5), -5, "floor(-5)")
	assertEquals(floor(0), 0, "floor(0)")
	assertEquals(Object.is(floor(-0), -0), true, "floor(-0) should be -0")
})

Deno.test("floor: JSDoc examples - special values and edge cases", () => {
	assertEquals(floor(Infinity), Infinity, "floor(Infinity)")
	assertEquals(floor(-Infinity), -Infinity, "floor(-Infinity)")
	assertEquals(Number.isNaN(floor(NaN)), true, "floor(NaN)")
	assertEquals(
		floor(Number.MAX_VALUE),
		Number.MAX_VALUE,
		"floor(Number.MAX_VALUE)",
	)
	assertEquals(floor(Number.MIN_VALUE), 0, "floor(Number.MIN_VALUE)")
	assertEquals(floor(-Number.MIN_VALUE), -1, "floor(-Number.MIN_VALUE)")
})

Deno.test("floor: JSDoc examples - integer division", () => {
	function integerDivision(dividend: number, divisor: number): number {
		return floor(dividend / divisor)
	}
	assertEquals(integerDivision(7, 3), 2, "7 ÷ 3 = 2")
	assertEquals(integerDivision(-7, 3), -3, "-7 ÷ 3 = -3")
	assertEquals(integerDivision(10, 3), 3, "10 ÷ 3 = 3")
})

Deno.test("floor: JSDoc examples - pagination calculation", () => {
	function getPage(itemIndex: number, itemsPerPage: number): number {
		return floor(itemIndex / itemsPerPage) + 1
	}
	assertEquals(getPage(25, 10), 3, "Item 25 is on page 3")
	assertEquals(getPage(0, 10), 1, "Item 0 is on page 1")
	assertEquals(getPage(10, 10), 2, "Item 10 is on page 2")
})

Deno.test("floor: JSDoc examples - truncating to decimal places", () => {
	function truncateDecimals(num: number, decimals: number): number {
		const multiplier = Math.pow(10, decimals)
		return floor(num * multiplier) / multiplier
	}
	assertEquals(truncateDecimals(3.14159, 2), 3.14, "Truncate π to 2 decimals")
	assertEquals(
		truncateDecimals(9.9999, 3),
		9.999,
		"Truncate 9.9999 to 3 decimals",
	)
	assertEquals(truncateDecimals(1.005, 2), 1.00, "Truncate 1.005 to 2 decimals")
})

Deno.test("floor: JSDoc examples - random integer generation", () => {
	function randomInt(min: number, max: number): number {
		// Use a fixed value for testing instead of Math.random()
		const random = 0.5 // Midpoint for predictable testing
		return floor(random * (max - min + 1)) + min
	}
	assertEquals(randomInt(1, 6), 4, "Mid-range dice roll")
	assertEquals(randomInt(0, 10), 5, "Mid-range 0-10")
})

Deno.test("floor: JSDoc examples - floor modulo operation", () => {
	function floorMod(a: number, b: number): number {
		return a - floor(a / b) * b
	}
	assertEquals(floorMod(7, 3), 1, "7 mod 3 = 1")
	assertEquals(floorMod(-7, 3), 2, "-7 mod 3 = 2 (floor modulo)")
	assertEquals(floorMod(10, 3), 1, "10 mod 3 = 1")
})

Deno.test("floor: JSDoc examples - safe floor with validation", () => {
	function safeFloor(value: unknown): number | null {
		const num = typeof value === "number" ? floor(value) : NaN
		return isNaN(num) ? null : num
	}
	assertEquals(safeFloor(4.7), 4, "Safe floor of 4.7")
	assertEquals(safeFloor("invalid"), null, "Safe floor of invalid input")
	assertEquals(safeFloor(null), null, "Safe floor of null")
})

// ===========================
// Type Verification
// ===========================

Deno.test("floor: type verification", () => {
	assertExists(floor)
	assertEquals(typeof floor, "function")
	assertEquals(typeof floor(5.5), "number")
})
