import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.x.x"

import digitSum from "../../../../../src/simple/math/digitSum/index.ts"

Deno.test("digitSum: basic functionality", async (t) => {
	await t.step("single digit numbers", () => {
		assertEquals(digitSum(0), 0)
		assertEquals(digitSum(1), 1)
		assertEquals(digitSum(5), 5)
		assertEquals(digitSum(9), 9)
	})
	
	await t.step("multiple digit numbers", () => {
		assertEquals(digitSum(10), 1)
		assertEquals(digitSum(12), 3)
		assertEquals(digitSum(123), 6)
		assertEquals(digitSum(456), 15)
		assertEquals(digitSum(999), 27)
		assertEquals(digitSum(1000), 1)
		assertEquals(digitSum(123456789), 45)
	})
	
	await t.step("negative numbers (absolute value)", () => {
		assertEquals(digitSum(-1), 1)
		assertEquals(digitSum(-9), 9)
		assertEquals(digitSum(-123), 6)
		assertEquals(digitSum(-456), 15)
		assertEquals(digitSum(-999), 27)
	})
	
	await t.step("decimal numbers (integer part only)", () => {
		assertEquals(digitSum(0.5), 0)
		assertEquals(digitSum(1.1), 1)
		assertEquals(digitSum(9.9), 9)
		assertEquals(digitSum(12.34), 3)
		assertEquals(digitSum(99.99), 18)
		assertEquals(digitSum(123.456), 6)
		assertEquals(digitSum(-12.34), 3)
	})
	
	await t.step("large numbers", () => {
		assertEquals(digitSum(9876543210), 45)
		assertEquals(digitSum(1111111111), 10)
		assertEquals(digitSum(1234567890), 45)
		assertEquals(digitSum(Number.MAX_SAFE_INTEGER), 76) // 9007199254740991
	})
	
	await t.step("powers of 10", () => {
		assertEquals(digitSum(10), 1)
		assertEquals(digitSum(100), 1)
		assertEquals(digitSum(1000), 1)
		assertEquals(digitSum(10000), 1)
		assertEquals(digitSum(100000), 1)
	})
	
	await t.step("special patterns", () => {
		assertEquals(digitSum(11111), 5)
		assertEquals(digitSum(12345), 15)
		assertEquals(digitSum(123321), 12)
		assertEquals(digitSum(101010), 3)
		assertEquals(digitSum(505050), 15)
	})
})

Deno.test("digitSum: mathematical properties", () => {
	// Digital root property: digitSum(n) ≡ n (mod 9) when n > 0
	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 1000000 }),
			(n) => {
				const sum = digitSum(n)
				const nMod9 = n % 9
				const sumMod9 = sum % 9
				// For non-zero numbers, n % 9 === 0 implies digitSum(n) % 9 === 0
				// Otherwise digitSum(n) % 9 === n % 9
				if (nMod9 === 0) {
					return sumMod9 === 0 || sum === 9
				}
				return sumMod9 === nMod9
			}
		),
		{ numRuns: 1000 }
	)
	
	// Additive property: digitSum(a) + digitSum(b) >= digitSum(a + b) (with exceptions for carries)
	fc.assert(
		fc.property(
			fc.nat({ max: 100000 }),
			fc.nat({ max: 100000 }),
			(a, b) => {
				const sumA = digitSum(a)
				const sumB = digitSum(b)
				const sumAB = digitSum(a + b)
				// When adding numbers, digit sum can decrease due to carries
				// But the relationship with mod 9 is preserved
				const leftMod9 = (sumA + sumB) % 9
				const rightMod9 = sumAB % 9
				return leftMod9 === rightMod9 || (leftMod9 === 0 && rightMod9 === 0)
			}
		),
		{ numRuns: 1000 }
	)
	
	// Multiplication by 9: digitSum(9 * n) = 9 for n > 0
	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 100000 }),
			(n) => {
				const result = digitSum(9 * n)
				// The digit sum of any multiple of 9 is divisible by 9
				return result % 9 === 0
			}
		),
		{ numRuns: 1000 }
	)
	
	// Idempotence for single digits
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 9 }),
			(n) => {
				return digitSum(n) === n
			}
		),
		{ numRuns: 10 }
	)
})

Deno.test("digitSum: special values", () => {
	assertEquals(digitSum(0), 0)
	assertEquals(digitSum(-0), 0)
	assertEquals(Number.isNaN(digitSum(Infinity)), true)
	assertEquals(Number.isNaN(digitSum(-Infinity)), true)
	assertEquals(Number.isNaN(digitSum(NaN)), true)
})

Deno.test("digitSum: error handling", () => {
	assertEquals(Number.isNaN(digitSum(null)), true)
	assertEquals(Number.isNaN(digitSum(undefined)), true)
	assertEquals(Number.isNaN(digitSum("123" as any)), true)
	assertEquals(Number.isNaN(digitSum("abc" as any)), true)
	assertEquals(Number.isNaN(digitSum({} as any)), true)
	assertEquals(Number.isNaN(digitSum([] as any)), true)
	assertEquals(Number.isNaN(digitSum((() => {}) as any)), true)
})

Deno.test("digitSum: JSDoc examples", async (t) => {
	await t.step("single digit", () => {
		assertEquals(digitSum(5), 5)
		assertEquals(digitSum(9), 9)
		assertEquals(digitSum(0), 0)
	})
	
	await t.step("multiple digits", () => {
		assertEquals(digitSum(123), 6)
		assertEquals(digitSum(456), 15)
		assertEquals(digitSum(999), 27)
		assertEquals(digitSum(1000), 1)
	})
	
	await t.step("negative numbers", () => {
		assertEquals(digitSum(-123), 6)
		assertEquals(digitSum(-456), 15)
		assertEquals(digitSum(-9), 9)
	})
	
	await t.step("decimal numbers", () => {
		assertEquals(digitSum(123.456), 6)
		assertEquals(digitSum(99.99), 18)
		assertEquals(digitSum(0.5), 0)
		assertEquals(digitSum(-12.34), 3)
	})
	
	await t.step("large numbers", () => {
		assertEquals(digitSum(123456789), 45)
		assertEquals(digitSum(9876543210), 45)
		assertEquals(digitSum(1111111111), 10)
	})
	
	await t.step("powers of 10", () => {
		assertEquals(digitSum(10), 1)
		assertEquals(digitSum(100), 1)
		assertEquals(digitSum(1000), 1)
		assertEquals(digitSum(10000), 1)
	})
	
	await t.step("special patterns", () => {
		assertEquals(digitSum(1234567890), 45)
		assertEquals(digitSum(123321), 12)
		assertEquals(digitSum(11111), 5)
		assertEquals(digitSum(12345), 15)
	})
	
	await t.step("edge cases", () => {
		assertEquals(digitSum(Number.MAX_SAFE_INTEGER), 76)
		assertEquals(digitSum(0), 0)
		assertEquals(digitSum(-0), 0)
	})
	
	await t.step("special values", () => {
		assertEquals(Number.isNaN(digitSum(Infinity)), true)
		assertEquals(Number.isNaN(digitSum(-Infinity)), true)
		assertEquals(Number.isNaN(digitSum(NaN)), true)
	})
	
	await t.step("invalid inputs", () => {
		assertEquals(Number.isNaN(digitSum(null)), true)
		assertEquals(Number.isNaN(digitSum(undefined)), true)
		assertEquals(Number.isNaN(digitSum("123" as any)), true)
		assertEquals(Number.isNaN(digitSum("abc" as any)), true)
		assertEquals(Number.isNaN(digitSum({} as any)), true)
		assertEquals(Number.isNaN(digitSum([] as any)), true)
	})
	
	await t.step("digital root calculation", () => {
		function digitalRoot(n: number): number {
			let sum = digitSum(n)
			while (sum >= 10 && !isNaN(sum)) {
				sum = digitSum(sum)
			}
			return sum
		}
		assertEquals(digitalRoot(123), 6)
		assertEquals(digitalRoot(456), 6)
		assertEquals(digitalRoot(9999), 9)
	})
	
	await t.step("divisibility by 3", () => {
		function isDivisibleBy3(n: number): boolean {
			return digitSum(n) % 3 === 0
		}
		assertEquals(isDivisibleBy3(123), true)
		assertEquals(isDivisibleBy3(124), false)
	})
	
	await t.step("divisibility by 9", () => {
		function isDivisibleBy9(n: number): boolean {
			return digitSum(n) % 9 === 0
		}
		assertEquals(isDivisibleBy9(999), true)
		assertEquals(isDivisibleBy9(998), false)
	})
	
	await t.step("checksum validation", () => {
		function validateChecksum(number: number, expected: number): boolean {
			return digitSum(number) === expected
		}
		assertEquals(validateChecksum(12345, 15), true)
	})
	
	await t.step("lucky number check", () => {
		function digitalRoot(n: number): number {
			let sum = digitSum(n)
			while (sum >= 10 && !isNaN(sum)) {
				sum = digitSum(sum)
			}
			return sum
		}
		function isLucky(n: number): boolean {
			const root = digitalRoot(n)
			return root === 7
		}
		assertEquals(isLucky(1234), false)
		assertEquals(isLucky(16), true)
	})
	
	await t.step("array operations", () => {
		const numbers = [123, 456, 789]
		const sums = numbers.map(digitSum)
		assertEquals(sums, [6, 15, 24])
		
		const range = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
		const withSum10 = range.filter(n => digitSum(n) === 10)
		assertEquals(withSum10, [19])
		
		const values = [321, 123, 213, 111, 222]
		values.sort((a, b) => digitSum(a) - digitSum(b))
		assertEquals(values, [111, 321, 123, 213, 222])
	})
	
	await t.step("safe calculation", () => {
		function safeDigitSum(value: unknown): number | null {
			const num = typeof value === 'number' ? digitSum(value) : NaN
			return isNaN(num) ? null : num
		}
		assertEquals(safeDigitSum(123), 6)
		assertEquals(safeDigitSum("invalid"), null)
	})
})

Deno.test("digitSum: property-based testing", () => {
	// Test that result is always non-negative for valid inputs
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, noDefaultInfinity: true }),
			(n) => {
				const result = digitSum(n)
				return Number.isNaN(result) || result >= 0
			}
		),
		{ numRuns: 1000 }
	)
	
	// Test that result is less than or equal to 9 * number of digits
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: Number.MAX_SAFE_INTEGER }),
			(n) => {
				const result = digitSum(n)
				const numDigits = n === 0 ? 1 : Math.floor(Math.log10(n)) + 1
				return result <= 9 * numDigits
			}
		),
		{ numRuns: 1000 }
	)
	
	// Test consistency: same input always produces same output
	fc.assert(
		fc.property(
			fc.float({ noNaN: true }),
			(n) => {
				const result1 = digitSum(n)
				const result2 = digitSum(n)
				return Object.is(result1, result2)
			}
		),
		{ numRuns: 1000 }
	)
	
	// Test that digitSum of a number between 0-9 is the number itself
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 9 }),
			(n) => {
				return digitSum(n) === n
			}
		),
		{ numRuns: 10 }
	)
	
	// Test absolute value property
	fc.assert(
		fc.property(
			fc.integer({ min: -1000000, max: 1000000 }),
			(n) => {
				return digitSum(n) === digitSum(-n)
			}
		),
		{ numRuns: 1000 }
	)
	
	// Test truncation property for decimals
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, noDefaultInfinity: true, min: -10000, max: 10000 }),
			(n) => {
				const truncated = Math.trunc(n)
				return digitSum(n) === digitSum(truncated)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("digitSum: performance characteristics", () => {
	// Test that function handles large numbers efficiently
	const largeNumbers = [
		Number.MAX_SAFE_INTEGER,
		Number.MAX_SAFE_INTEGER - 1,
		9999999999999999,
		1234567890123456
	]
	
	for (const n of largeNumbers) {
		const start = performance.now()
		const result = digitSum(n)
		const end = performance.now()
		
		// Should complete in less than 1ms
		assertEquals(end - start < 1, true, `digitSum(${n}) took ${end - start}ms`)
		assertEquals(typeof result, "number")
	}
})

Deno.test("digitSum: boundary conditions", () => {
	// Test numbers at various boundaries
	assertEquals(digitSum(0), 0)
	assertEquals(digitSum(1), 1)
	assertEquals(digitSum(9), 9)
	assertEquals(digitSum(10), 1)
	assertEquals(digitSum(99), 18)
	assertEquals(digitSum(100), 1)
	assertEquals(digitSum(999), 27)
	assertEquals(digitSum(1000), 1)
	assertEquals(digitSum(9999), 36)
	assertEquals(digitSum(10000), 1)
	
	// Test boundary between positive and negative
	assertEquals(digitSum(-1), 1)
	assertEquals(digitSum(-0), 0)
	assertEquals(digitSum(0), 0)
	assertEquals(digitSum(1), 1)
	
	// Test decimal boundaries
	assertEquals(digitSum(0.1), 0)
	assertEquals(digitSum(0.9), 0)
	assertEquals(digitSum(1.0), 1)
	assertEquals(digitSum(1.1), 1)
	assertEquals(digitSum(1.9), 1)
	assertEquals(digitSum(2.0), 2)
})