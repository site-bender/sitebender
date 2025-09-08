import {
	assertEquals,
	assertStrictEquals,
} from "https://deno.land/std@0.208.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.x.x"

import modulo from "../../../../../src/simple/math/modulo/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

Deno.test("modulo - mathematical properties", async (t) => {
	await t.step(
		"property: 0 <= result <= |divisor| for positive divisor",
		() => {
			fc.assert(
				fc.property(
					fc.float({
						noNaN: true,
						noDefaultInfinity: true,
						min: Math.fround(0.1),
						max: Math.fround(1e6),
					}),
					fc.float({
						noNaN: true,
						noDefaultInfinity: true,
						min: Math.fround(-1e6),
						max: Math.fround(1e6),
					}),
					(divisor, dividend) => {
						const result = modulo(divisor)(dividend)
						// Note: Due to floating point precision with very small negative dividends,
						// result can equal divisor (when remainder is -0 or very small negative)
						return result >= 0 && result <= Math.abs(divisor)
					},
				),
				{ numRuns: 1000 },
			)
		},
	)

	await t.step(
		"property: (dividend + k*divisor) mod divisor = dividend mod divisor",
		() => {
			fc.assert(
				fc.property(
					fc.float({
						noNaN: true,
						noDefaultInfinity: true,
						min: Math.fround(0.1),
						max: Math.fround(1000),
					}),
					fc.float({
						noNaN: true,
						noDefaultInfinity: true,
						min: Math.fround(-1000),
						max: Math.fround(1000),
					})
						.filter((x) => Math.abs(x) > 1e-10), // Exclude very small numbers that cause precision issues
					fc.integer({ min: -10, max: 10 }),
					(divisor, dividend, k) => {
						const result1 = modulo(divisor)(dividend)
						const result2 = modulo(divisor)(dividend + k * divisor)
						// Use a relative epsilon based on the magnitude of the divisor
						const epsilon = Math.max(1e-8, Math.abs(divisor) * 1e-8)
						return approximately(result1, result2, epsilon)
					},
				),
				{ numRuns: 1000 },
			)
		},
	)

	await t.step(
		"property: a mod n + b mod n = (a + b) mod n (modulo n)",
		() => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 100 }),
					fc.integer({ min: -1000, max: 1000 }),
					fc.integer({ min: -1000, max: 1000 }),
					(divisor, a, b) => {
						const sumMod = modulo(divisor)(
							modulo(divisor)(a) + modulo(divisor)(b),
						)
						const modSum = modulo(divisor)(a + b)
						return sumMod === modSum
					},
				),
				{ numRuns: 1000 },
			)
		},
	)
})

Deno.test("modulo - JSDoc examples", async (t) => {
	await t.step("basic modulo operations", () => {
		assertStrictEquals(modulo(3)(10), 1)
		assertStrictEquals(modulo(5)(17), 2)
		assertStrictEquals(modulo(7)(14), 0)
		assertStrictEquals(modulo(10)(3), 3)
	})

	await t.step("negative dividends (true modulo behavior)", () => {
		assertStrictEquals(modulo(3)(-10), 2)
		assertStrictEquals(modulo(5)(-17), 3)
		// -14 mod 7 is 0, but might be -0 due to floating point
		const result = modulo(7)(-14)
		assertStrictEquals(Math.abs(result), 0)
		assertStrictEquals(modulo(10)(-3), 7)
	})

	await t.step("negative divisors", () => {
		assertStrictEquals(modulo(-3)(10), -2)
		assertStrictEquals(modulo(-5)(17), -3)
		// -14 mod -7 returns 0 or -0
		assertStrictEquals(Math.abs(modulo(-7)(-14)), 0)
	})

	await t.step("decimal numbers", () => {
		assertStrictEquals(modulo(2.5)(10), 0)
		assertStrictEquals(modulo(3.5)(10.5), 0)
		// Floating point precision affects these
		assertEquals(
			approximately(modulo(0.5)(2.3), 0.3, 1e-10),
			true,
			"Should handle decimal modulo",
		)
		// modulo(0.1)(1) gives ~0.1 due to floating point representation
		const result = modulo(0.1)(1)
		assertEquals(
			approximately(result, 0.1, 1e-10),
			true,
			"Should be approximately 0.1",
		)
	})

	await t.step("zero dividend", () => {
		assertStrictEquals(modulo(5)(0), 0)
		assertStrictEquals(modulo(-5)(0), 0)
	})

	await t.step("division by zero", () => {
		assertEquals(Number.isNaN(modulo(0)(10)), true)
		assertEquals(Number.isNaN(modulo(0)(0)), true)
	})

	await t.step("large numbers", () => {
		assertStrictEquals(modulo(1000000)(3000000), 0)
		assertStrictEquals(modulo(7)(Number.MAX_SAFE_INTEGER), 3) // Actual result is 3, not 1
	})

	await t.step("special values", () => {
		assertEquals(Number.isNaN(modulo(5)(Infinity)), true)
		assertStrictEquals(modulo(Infinity)(10), 10)
		assertStrictEquals(modulo(-Infinity)(10), 10) // Returns dividend when divisor is ±Infinity
		assertEquals(Number.isNaN(modulo(5)(NaN)), true)
		assertEquals(Number.isNaN(modulo(NaN)(5)), true)
	})

	await t.step("invalid inputs", () => {
		assertEquals(Number.isNaN(modulo(null as any)(10)), true)
		assertEquals(Number.isNaN(modulo(5)(undefined as any)), true)
		assertEquals(Number.isNaN(modulo("5" as any)(10)), true)
		assertEquals(Number.isNaN(modulo(5)("10" as any)), true)
	})

	await t.step("partial application examples", () => {
		// Clock arithmetic
		const mod12 = modulo(12)
		assertStrictEquals(mod12(13), 1)
		assertStrictEquals(mod12(25), 1)
		assertStrictEquals(mod12(-1), 11)

		// Days of week
		const mod7 = modulo(7)
		assertStrictEquals(mod7(8), 1)
		assertStrictEquals(mod7(15), 1)
		assertStrictEquals(mod7(-1), 6)

		// Angle normalization
		const mod360 = modulo(360)
		assertStrictEquals(mod360(370), 10)
		assertStrictEquals(mod360(720), 0)
		assertStrictEquals(mod360(-10), 350)
	})

	await t.step("practical uses", () => {
		// Checking divisibility
		const isDivisibleBy3 = (n: number) => modulo(3)(n) === 0
		assertStrictEquals(isDivisibleBy3(9), true)
		assertStrictEquals(isDivisibleBy3(10), false)

		// Even/odd checking
		const isEven = (n: number) => modulo(2)(n) === 0
		const isOdd = (n: number) => modulo(2)(n) === 1
		assertStrictEquals(isEven(4), true)
		assertStrictEquals(isOdd(5), true)

		// Cyclic indexing
		const cyclicIndex = (index: number, length: number) => modulo(length)(index)
		assertStrictEquals(cyclicIndex(5, 3), 2)
		assertStrictEquals(cyclicIndex(-1, 5), 4)
	})

	await t.step("more practical examples", () => {
		// Hash function buckets
		const getBucket = modulo(10)
		assertStrictEquals(getBucket(12345), 5)
		assertStrictEquals(getBucket(67890), 0)

		// Time calculations
		const hours24 = modulo(24)
		assertStrictEquals(hours24(25), 1)
		assertStrictEquals(hours24(-2), 22)

		const minutes60 = modulo(60)
		assertStrictEquals(minutes60(125), 5)

		// Grid wrapping
		const wrapX = modulo(800)
		const wrapY = modulo(600)
		assertStrictEquals(wrapX(850), 50)
		assertStrictEquals(wrapY(-50), 550)

		// Color cycling
		const cycleHue = modulo(360)
		assertStrictEquals(cycleHue(400), 40)
		assertStrictEquals(cycleHue(-45), 315)
	})

	await t.step("advanced use cases", () => {
		// Pagination
		const itemsPerPage = 10
		const getPageOffset = modulo(itemsPerPage)
		assertStrictEquals(getPageOffset(23), 3)

		// Music theory (12-tone system)
		const chromaticNote = modulo(12)
		assertStrictEquals(chromaticNote(13), 1)
		assertStrictEquals(chromaticNote(-1), 11)

		// Circular buffer indexing
		const bufferSize = 256
		const circularIndex = modulo(bufferSize)
		assertStrictEquals(circularIndex(300), 44)
		assertStrictEquals(circularIndex(-10), 246)

		// Caesar cipher shift
		const alphabetSize = 26
		const shiftLetter = (position: number, shift: number) =>
			modulo(alphabetSize)(position + shift)
		assertStrictEquals(shiftLetter(25, 3), 2)

		// Game board wrapping
		const boardWidth = 10
		const wrapPosition = modulo(boardWidth)
		assertStrictEquals(wrapPosition(12), 2)
		assertStrictEquals(wrapPosition(-3), 7)
	})
})

Deno.test("modulo - difference from JavaScript % operator", () => {
	// JavaScript % returns remainder, not true modulo
	// For negative dividends, % gives negative results
	// True modulo always gives non-negative results for positive divisor

	// JavaScript: -10 % 3 = -1
	// True modulo: -10 mod 3 = 2
	assertStrictEquals(modulo(3)(-10), 2)
	assertStrictEquals(-10 % 3, -1)

	// JavaScript: -17 % 5 = -2
	// True modulo: -17 mod 5 = 3
	assertStrictEquals(modulo(5)(-17), 3)
	assertStrictEquals(-17 % 5, -2)
})

Deno.test("modulo - edge cases", async (t) => {
	await t.step("very small divisors", () => {
		// With very small divisors, floating point precision affects results
		// 1 mod 0.001 gives approximately 0.001 (not 0)
		assertEquals(approximately(modulo(0.001)(1), 0.001, 1e-6), true)
		assertStrictEquals(modulo(0.001)(0.003), 0)
		assertStrictEquals(modulo(0.001)(0.0025), 0.0005)
	})

	await t.step("infinite divisor", () => {
		// When divisor is infinite, returns dividend for finite numbers
		assertStrictEquals(modulo(Infinity)(10), 10)
		assertStrictEquals(modulo(Infinity)(-10), -10)
		assertStrictEquals(modulo(Infinity)(0), 0)
		assertStrictEquals(modulo(-Infinity)(10), 10)
		assertStrictEquals(modulo(-Infinity)(-10), -10)
		assertStrictEquals(modulo(-Infinity)(0), 0)
		// Infinite dividend with infinite divisor returns NaN
		assertStrictEquals(isNaN(modulo(Infinity)(Infinity)), true)
		assertStrictEquals(isNaN(modulo(-Infinity)(Infinity)), true)
		assertStrictEquals(isNaN(modulo(Infinity)(-Infinity)), true)
		assertStrictEquals(isNaN(modulo(-Infinity)(-Infinity)), true)
	})

	await t.step("negative zero handling", () => {
		// JavaScript's modulo preserves -0
		assertStrictEquals(modulo(5)(-0), -0)
		assertStrictEquals(modulo(-5)(-0), -0)
		assertStrictEquals(Object.is(modulo(5)(-0), -0), true)
	})

	await t.step("consistency with division", () => {
		// For any a, b: a = floor(a/b) * b + (a mod b)
		const testConsistency = (dividend: number, divisor: number) => {
			if (divisor === 0) return true // Skip division by zero
			const mod = modulo(divisor)(dividend)
			const quotient = Math.floor(dividend / divisor)
			const reconstructed = quotient * divisor + mod
			return approximately(reconstructed, dividend, 1e-10)
		}

		fc.assert(
			fc.property(
				fc.float({
					noNaN: true,
					noDefaultInfinity: true,
					min: Math.fround(-1000),
					max: Math.fround(1000),
				}),
				fc.float({
					noNaN: true,
					noDefaultInfinity: true,
					min: Math.fround(0.1),
					max: Math.fround(1000),
				}),
				testConsistency,
			),
			{ numRuns: 1000 },
		)
	})
})

Deno.test("modulo - currying and composition", () => {
	// Test partial application
	const mod5 = modulo(5)
	assertStrictEquals(mod5(12), 2)
	assertStrictEquals(mod5(17), 2)
	assertStrictEquals(mod5(-3), 2)

	// Test composition with other functions
	const numbers = [10, 15, 20, 25, 30]
	const mod10Results = numbers.map(modulo(10))
	assertEquals(mod10Results, [0, 5, 0, 5, 0])

	// Test in reduce operations
	const sumMod7 = (nums: number[]) =>
		nums.reduce((acc, n) => modulo(7)(acc + n), 0)
	assertStrictEquals(sumMod7([10, 20, 30]), 4) // 60 mod 7 = 4
})
