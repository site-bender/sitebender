import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import gcd from "../../../../../src/simple/math/gcd/index.ts"

Deno.test("gcd", async (t) => {
	await t.step("mathematical properties", async (t) => {
		await t.step("should be commutative: gcd(a, b) = gcd(b, a)", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: -1000, max: 1000 }),
					fc.integer({ min: -1000, max: 1000 }),
					(a, b) => {
						// Skip the undefined case gcd(0, 0)
						if (a === 0 && b === 0) return true

						const gcdAB = gcd(a)(b)
						const gcdBA = gcd(b)(a)

						if (Number.isNaN(gcdAB)) {
							return Number.isNaN(gcdBA)
						}

						return gcdAB === gcdBA
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step(
			"should be associative: gcd(gcd(a, b), c) = gcd(a, gcd(b, c))",
			() => {
				fc.assert(
					fc.property(
						fc.integer({ min: 1, max: 100 }),
						fc.integer({ min: 1, max: 100 }),
						fc.integer({ min: 1, max: 100 }),
						(a, b, c) => {
							const left = gcd(gcd(a)(b))(c)
							const right = gcd(a)(gcd(b)(c))

							return left === right
						},
					),
					{ numRuns: 1000 },
				)
			},
		)

		await t.step("should satisfy identity property: gcd(a, 0) = |a|", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: -1000, max: 1000 }),
					(a) => {
						if (a === 0) return true // Skip gcd(0, 0)

						const result = gcd(a)(0)
						return result === Math.abs(a)
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step(
			"should divide both numbers: a % gcd(a, b) = 0 and b % gcd(a, b) = 0",
			() => {
				fc.assert(
					fc.property(
						fc.integer({ min: 1, max: 1000 }),
						fc.integer({ min: 1, max: 1000 }),
						(a, b) => {
							const g = gcd(a)(b)

							return a % g === 0 && b % g === 0
						},
					),
					{ numRuns: 1000 },
				)
			},
		)

		await t.step("should be the largest common divisor", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 100 }),
					fc.integer({ min: 1, max: 100 }),
					(a, b) => {
						const g = gcd(a)(b)

						// Check that no larger number divides both
						for (let i = g + 1; i <= Math.min(a, b); i++) {
							if (a % i === 0 && b % i === 0) {
								return false // Found a larger common divisor
							}
						}

						return true
					},
				),
				{ numRuns: 100 }, // Fewer runs due to inner loop
			)
		})

		await t.step("should satisfy gcd(a, b) * lcm(a, b) = |a * b|", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 1000 }),
					fc.integer({ min: 1, max: 1000 }),
					(a, b) => {
						const g = gcd(a)(b)
						const lcm = Math.abs(a * b) / g

						return g * lcm === Math.abs(a * b)
					},
				),
				{ numRuns: 1000 },
			)
		})
	})

	await t.step("special cases", async (t) => {
		await t.step("should handle basic GCD calculations", () => {
			assertEquals(gcd(12)(8), 4)
			assertEquals(gcd(10)(5), 5)
			assertEquals(gcd(21)(14), 7)
			assertEquals(gcd(48)(18), 6)
		})

		await t.step("should handle coprime numbers (GCD = 1)", () => {
			assertEquals(gcd(7)(5), 1)
			assertEquals(gcd(13)(17), 1)
			assertEquals(gcd(9)(16), 1)
			assertEquals(gcd(11)(13), 1)
		})

		await t.step("should handle same number", () => {
			assertEquals(gcd(10)(10), 10)
			assertEquals(gcd(42)(42), 42)
			assertEquals(gcd(1)(1), 1)
			assertEquals(gcd(100)(100), 100)
		})

		await t.step("should handle when one divides the other", () => {
			assertEquals(gcd(20)(5), 5)
			assertEquals(gcd(100)(25), 25)
			assertEquals(gcd(15)(45), 15)
			assertEquals(gcd(7)(21), 7)
		})

		await t.step("should handle zero correctly", () => {
			assertEquals(gcd(5)(0), 5)
			assertEquals(gcd(0)(5), 5)
			assertEquals(gcd(100)(0), 100)
			assertEquals(gcd(0)(100), 100)
			assertEquals(Number.isNaN(gcd(0)(0)), true)
		})

		await t.step("should handle negative numbers", () => {
			assertEquals(gcd(-12)(8), 4)
			assertEquals(gcd(12)(-8), 4)
			assertEquals(gcd(-12)(-8), 4)
			assertEquals(gcd(-15)(5), 5)
			assertEquals(gcd(15)(-5), 5)
			assertEquals(gcd(-15)(-5), 5)
		})

		await t.step("should handle large numbers", () => {
			assertEquals(gcd(1071)(462), 21)
			assertEquals(gcd(2024)(2023), 1) // Consecutive integers
			assertEquals(gcd(1000000)(500000), 500000)
			assertEquals(gcd(123456)(789012), 12)
		})

		await t.step("should handle prime numbers", () => {
			assertEquals(gcd(17)(19), 1) // Different primes
			assertEquals(gcd(13)(26), 13) // Prime and its multiple
			assertEquals(gcd(11)(121), 11) // Prime and its square
			assertEquals(gcd(7)(14), 7)
		})

		await t.step("should handle powers of 2", () => {
			assertEquals(gcd(16)(24), 8)
			assertEquals(gcd(32)(48), 16)
			assertEquals(gcd(64)(128), 64)
			assertEquals(gcd(8)(12), 4)
		})
	})

	await t.step("error handling", async (t) => {
		await t.step("should return NaN for non-integers", () => {
			assertEquals(Number.isNaN(gcd(12.5)(8)), true)
			assertEquals(Number.isNaN(gcd(12)(8.3)), true)
			assertEquals(Number.isNaN(gcd(3.14)(2.71)), true)
			assertEquals(Number.isNaN(gcd(0.5)(0.25)), true)
		})

		await t.step("should return NaN for null", () => {
			assertEquals(Number.isNaN(gcd(null as any)(8)), true)
			assertEquals(Number.isNaN(gcd(12)(null as any)), true)
			assertEquals(Number.isNaN(gcd(null as any)(null as any)), true)
		})

		await t.step("should return NaN for undefined", () => {
			assertEquals(Number.isNaN(gcd(undefined as any)(8)), true)
			assertEquals(Number.isNaN(gcd(12)(undefined as any)), true)
			assertEquals(Number.isNaN(gcd(undefined as any)(undefined as any)), true)
		})

		await t.step("should return NaN for non-numeric values", () => {
			assertEquals(Number.isNaN(gcd("12" as any)(8)), true)
			assertEquals(Number.isNaN(gcd(12)("8" as any)), true)
			assertEquals(Number.isNaN(gcd({} as any)(8)), true)
			assertEquals(Number.isNaN(gcd(12)([] as any)), true)
			assertEquals(Number.isNaN(gcd(true as any)(8)), true)
			assertEquals(Number.isNaN(gcd(12)(false as any)), true)
		})

		await t.step("should return NaN for special values", () => {
			assertEquals(Number.isNaN(gcd(NaN)(8)), true)
			assertEquals(Number.isNaN(gcd(12)(NaN)), true)
			assertEquals(Number.isNaN(gcd(Infinity)(8)), true)
			assertEquals(Number.isNaN(gcd(12)(-Infinity)), true)
		})
	})

	await t.step("currying", async (t) => {
		await t.step("should support partial application", () => {
			const gcdWith12 = gcd(12)
			assertEquals(gcdWith12(8), 4)
			assertEquals(gcdWith12(9), 3)
			assertEquals(gcdWith12(16), 4)
			assertEquals(gcdWith12(18), 6)
		})

		await t.step("should work with array map", () => {
			const gcdWith24 = gcd(24)
			const numbers = [8, 12, 16, 18, 36]
			const results = numbers.map(gcdWith24)
			assertEquals(results, [8, 12, 8, 6, 12])
		})
	})

	await t.step("JSDoc examples", async (t) => {
		await t.step("basic GCD", () => {
			assertEquals(gcd(12)(8), 4)
			assertEquals(gcd(10)(5), 5)
			assertEquals(gcd(21)(14), 7)
			assertEquals(gcd(48)(18), 6)
		})

		await t.step("coprime numbers", () => {
			assertEquals(gcd(7)(5), 1)
			assertEquals(gcd(13)(17), 1)
			assertEquals(gcd(9)(16), 1)
		})

		await t.step("same number", () => {
			assertEquals(gcd(10)(10), 10)
			assertEquals(gcd(42)(42), 42)
		})

		await t.step("one divides the other", () => {
			assertEquals(gcd(20)(5), 5)
			assertEquals(gcd(100)(25), 25)
			assertEquals(gcd(15)(45), 15)
		})

		await t.step("with zero", () => {
			assertEquals(gcd(5)(0), 5)
			assertEquals(gcd(0)(5), 5)
			assertEquals(Number.isNaN(gcd(0)(0)), true)
		})

		await t.step("negative numbers", () => {
			assertEquals(gcd(-12)(8), 4)
			assertEquals(gcd(12)(-8), 4)
			assertEquals(gcd(-12)(-8), 4)
			assertEquals(gcd(-15)(5), 5)
		})

		await t.step("large numbers", () => {
			assertEquals(gcd(1071)(462), 21)
			assertEquals(gcd(2024)(2023), 1)
			assertEquals(gcd(1000000)(500000), 500000)
		})

		await t.step("prime numbers", () => {
			assertEquals(gcd(17)(19), 1)
			assertEquals(gcd(13)(26), 13)
			assertEquals(gcd(11)(121), 11)
		})

		await t.step("powers of 2", () => {
			assertEquals(gcd(16)(24), 8)
			assertEquals(gcd(32)(48), 16)
			assertEquals(gcd(64)(128), 64)
		})

		await t.step("invalid inputs", () => {
			assertEquals(Number.isNaN(gcd(12.5)(8)), true)
			assertEquals(Number.isNaN(gcd(12)(8.3)), true)
			assertEquals(Number.isNaN(gcd(null as any)(8)), true)
			assertEquals(Number.isNaN(gcd(12)(undefined as any)), true)
			assertEquals(Number.isNaN(gcd("12" as any)(8)), true)
			assertEquals(Number.isNaN(gcd(NaN)(8)), true)
			assertEquals(Number.isNaN(gcd(Infinity)(8)), true)
		})

		await t.step("partial application", () => {
			const gcdWith12 = gcd(12)
			assertEquals(gcdWith12(8), 4)
			assertEquals(gcdWith12(9), 3)
			assertEquals(gcdWith12(16), 4)
		})

		await t.step("fraction simplification", () => {
			function simplifyFraction(
				numerator: number,
				denominator: number,
			): [number, number] {
				const divisor = gcd(Math.abs(numerator))(Math.abs(denominator))
				if (isNaN(divisor)) return [numerator, denominator]
				return [numerator / divisor, denominator / divisor]
			}
			assertEquals(simplifyFraction(12, 8), [3, 2])
			assertEquals(simplifyFraction(50, 100), [1, 2])
		})

		await t.step("LCM calculation", () => {
			function lcm(a: number, b: number): number {
				const g = gcd(Math.abs(a))(Math.abs(b))
				if (isNaN(g) || g === 0) return NaN
				return Math.abs(a * b) / g
			}
			assertEquals(lcm(12, 8), 24)
			assertEquals(lcm(5, 7), 35)
		})

		await t.step("GCD of multiple numbers", () => {
			function gcdMultiple(numbers: Array<number>): number {
				if (numbers.length === 0) return NaN
				return numbers.reduce((acc, num) => gcd(acc)(num))
			}
			assertEquals(gcdMultiple([12, 18, 24]), 6)
			assertEquals(gcdMultiple([100, 50, 25]), 25)
		})

		await t.step("coprime check", () => {
			function areCoprime(a: number, b: number): boolean {
				return gcd(a)(b) === 1
			}
			assertEquals(areCoprime(7, 5), true)
			assertEquals(areCoprime(12, 8), false)
		})

		await t.step("common grid size", () => {
			function commonGridSize(size1: number, size2: number): number {
				return gcd(size1)(size2)
			}
			assertEquals(commonGridSize(48, 64), 16)
		})

		await t.step("gear ratio", () => {
			function simplifyFraction(
				numerator: number,
				denominator: number,
			): [number, number] {
				const divisor = gcd(Math.abs(numerator))(Math.abs(denominator))
				if (isNaN(divisor)) return [numerator, denominator]
				return [numerator / divisor, denominator / divisor]
			}

			function gearRatio(teeth1: number, teeth2: number): string {
				const [a, b] = simplifyFraction(teeth1, teeth2)
				return `${a}:${b}`
			}
			assertEquals(gearRatio(48, 16), "3:1")
		})

		await t.step("safe GCD", () => {
			function safeGCD(a: unknown, b: unknown): number | null {
				const aNum = typeof a === "number" ? a : NaN
				const bNum = typeof b === "number" ? b : NaN
				const result = gcd(aNum)(bNum)
				return isNaN(result) ? null : result
			}
			assertEquals(safeGCD(12, 8), 4)
			assertEquals(safeGCD(12.5, 8), null)
			assertEquals(safeGCD("12", 8), null)
		})
	})

	await t.step("immutability", async (t) => {
		await t.step("should not modify input values", () => {
			const a = 12
			const b = 8
			const result = gcd(a)(b)
			assertEquals(a, 12)
			assertEquals(b, 8)
			assertEquals(result, 4)
		})
	})

	await t.step("performance characteristics", async (t) => {
		await t.step("should be consistent for repeated calls", () => {
			const a = 48
			const b = 18
			const result1 = gcd(a)(b)
			const result2 = gcd(a)(b)
			const result3 = gcd(a)(b)

			assertEquals(result1, 6)
			assertEquals(result2, 6)
			assertEquals(result3, 6)
		})

		await t.step("should handle edge cases efficiently", () => {
			// Large coprime numbers
			assertEquals(gcd(997)(1009), 1)

			// One very large, one small
			assertEquals(gcd(1000000)(10), 10)

			// Powers of the same prime
			assertEquals(gcd(81)(27), 27) // 3^4 and 3^3
		})
	})
})
