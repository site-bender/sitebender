import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import gcd from "../../../../../src/simple/math/gcd/index.ts"
import lcm from "../../../../../src/simple/math/lcm/index.ts"

Deno.test("lcm", async (t) => {
	await t.step("mathematical properties", async (t) => {
		await t.step("should be commutative: lcm(a, b) = lcm(b, a)", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 1000 }),
					fc.integer({ min: 1, max: 1000 }),
					(a, b) => {
						const lcmAB = lcm(a)(b)
						const lcmBA = lcm(b)(a)

						return lcmAB === lcmBA
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step(
			"should be associative: lcm(lcm(a, b), c) = lcm(a, lcm(b, c))",
			() => {
				fc.assert(
					fc.property(
						fc.integer({ min: 1, max: 100 }),
						fc.integer({ min: 1, max: 100 }),
						fc.integer({ min: 1, max: 100 }),
						(a, b, c) => {
							const left = lcm(lcm(a)(b))(c)
							const right = lcm(a)(lcm(b)(c))

							return left === right
						},
					),
					{ numRuns: 1000 },
				)
			},
		)

		await t.step(
			"should satisfy identity property: lcm(a, 1) = |a|",
			() => {
				fc.assert(
					fc.property(
						fc.integer({ min: -1000, max: 1000 }).filter((n) =>
							n !== 0
						),
						(a) => {
							const result = lcm(a)(1)
							return result === Math.abs(a)
						},
					),
					{ numRuns: 1000 },
				)
			},
		)

		await t.step(
			"should be divisible by both numbers: lcm(a, b) % a = 0 and lcm(a, b) % b = 0",
			() => {
				fc.assert(
					fc.property(
						fc.integer({ min: 1, max: 1000 }),
						fc.integer({ min: 1, max: 1000 }),
						(a, b) => {
							const l = lcm(a)(b)

							return l % a === 0 && l % b === 0
						},
					),
					{ numRuns: 1000 },
				)
			},
		)

		await t.step("should be the smallest common multiple", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 50 }),
					fc.integer({ min: 1, max: 50 }),
					(a, b) => {
						const l = lcm(a)(b)

						// Check that no smaller positive number is divisible by both
						for (let i = 1; i < l; i++) {
							if (i % a === 0 && i % b === 0) {
								return false // Found a smaller common multiple
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
						const l = lcm(a)(b)

						return g * l === Math.abs(a * b)
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step(
			"should satisfy lcm(a, gcd(a, b)) = a for positive integers",
			() => {
				fc.assert(
					fc.property(
						fc.integer({ min: 1, max: 1000 }),
						fc.integer({ min: 1, max: 1000 }),
						(a, b) => {
							const g = gcd(a)(b)
							const result = lcm(a)(g)

							return result === a
						},
					),
					{ numRuns: 1000 },
				)
			},
		)
	})

	await t.step("special cases", async (t) => {
		await t.step("should handle basic LCM calculations", () => {
			assertEquals(lcm(4)(6), 12)
			assertEquals(lcm(3)(5), 15)
			assertEquals(lcm(12)(18), 36)
			assertEquals(lcm(10)(15), 30)
			assertEquals(lcm(7)(21), 21)
		})

		await t.step("should handle coprime numbers (LCM = product)", () => {
			assertEquals(lcm(7)(11), 77)
			assertEquals(lcm(13)(17), 221)
			assertEquals(lcm(9)(16), 144)
			assertEquals(lcm(5)(7), 35)
		})

		await t.step("should handle same number", () => {
			assertEquals(lcm(10)(10), 10)
			assertEquals(lcm(42)(42), 42)
			assertEquals(lcm(1)(1), 1)
			assertEquals(lcm(100)(100), 100)
		})

		await t.step("should handle when one divides the other", () => {
			assertEquals(lcm(5)(20), 20)
			assertEquals(lcm(3)(15), 15)
			assertEquals(lcm(8)(24), 24)
			assertEquals(lcm(7)(21), 21)
		})

		await t.step("should handle negative numbers", () => {
			assertEquals(lcm(-4)(6), 12)
			assertEquals(lcm(4)(-6), 12)
			assertEquals(lcm(-4)(-6), 12)
			assertEquals(lcm(-15)(5), 15)
			assertEquals(lcm(15)(-5), 15)
			assertEquals(lcm(-15)(-5), 15)
		})

		await t.step("should handle large numbers", () => {
			assertEquals(lcm(100)(150), 300)
			assertEquals(lcm(1234)(5678), 3503326)
			assertEquals(lcm(999)(1001), 999999)
		})

		await t.step("should handle prime numbers", () => {
			assertEquals(lcm(17)(19), 323) // Product since coprime
			assertEquals(lcm(11)(22), 22) // 22 is multiple of 11
			assertEquals(lcm(13)(26), 26) // 26 is multiple of 13
			assertEquals(lcm(7)(14), 14) // 14 is multiple of 7
		})

		await t.step("should handle powers of 2", () => {
			assertEquals(lcm(16)(24), 48)
			assertEquals(lcm(32)(48), 96)
			assertEquals(lcm(64)(128), 128)
			assertEquals(lcm(8)(12), 24)
		})
	})

	await t.step("error handling", async (t) => {
		await t.step("should return NaN for zero", () => {
			assertEquals(Number.isNaN(lcm(0)(5)), true)
			assertEquals(Number.isNaN(lcm(5)(0)), true)
			assertEquals(Number.isNaN(lcm(0)(0)), true)
		})

		await t.step("should return NaN for non-integers", () => {
			assertEquals(Number.isNaN(lcm(12.5)(8)), true)
			assertEquals(Number.isNaN(lcm(12)(8.3)), true)
			assertEquals(Number.isNaN(lcm(3.14)(2.71)), true)
			assertEquals(Number.isNaN(lcm(0.5)(0.25)), true)
		})

		await t.step("should return NaN for null", () => {
			assertEquals(Number.isNaN(lcm(null as any)(8)), true)
			assertEquals(Number.isNaN(lcm(12)(null as any)), true)
			assertEquals(Number.isNaN(lcm(null as any)(null as any)), true)
		})

		await t.step("should return NaN for undefined", () => {
			assertEquals(Number.isNaN(lcm(undefined as any)(8)), true)
			assertEquals(Number.isNaN(lcm(12)(undefined as any)), true)
			assertEquals(
				Number.isNaN(lcm(undefined as any)(undefined as any)),
				true,
			)
		})

		await t.step("should return NaN for non-numeric values", () => {
			assertEquals(Number.isNaN(lcm("12" as any)(8)), true)
			assertEquals(Number.isNaN(lcm(12)("8" as any)), true)
			assertEquals(Number.isNaN(lcm({} as any)(8)), true)
			assertEquals(Number.isNaN(lcm(12)([] as any)), true)
			assertEquals(Number.isNaN(lcm(true as any)(8)), true)
			assertEquals(Number.isNaN(lcm(12)(false as any)), true)
		})

		await t.step("should return NaN for special values", () => {
			assertEquals(Number.isNaN(lcm(NaN)(8)), true)
			assertEquals(Number.isNaN(lcm(12)(NaN)), true)
			assertEquals(Number.isNaN(lcm(Infinity)(8)), true)
			assertEquals(Number.isNaN(lcm(12)(-Infinity)), true)
		})
	})

	await t.step("currying", async (t) => {
		await t.step("should support partial application", () => {
			const lcmWith12 = lcm(12)
			assertEquals(lcmWith12(8), 24)
			assertEquals(lcmWith12(9), 36)
			assertEquals(lcmWith12(16), 48)
			assertEquals(lcmWith12(18), 36)
		})

		await t.step("should work with array map", () => {
			const lcmWith10 = lcm(10)
			const numbers = [2, 4, 5, 8, 15]
			const results = numbers.map(lcmWith10)
			assertEquals(results, [10, 20, 10, 40, 30])
		})
	})

	await t.step("JSDoc examples", async (t) => {
		await t.step("basic LCM", () => {
			assertEquals(lcm(4)(6), 12)
			assertEquals(lcm(3)(5), 15)
			assertEquals(lcm(12)(18), 36)
			assertEquals(lcm(10)(15), 30)
			assertEquals(lcm(7)(21), 21)
		})

		await t.step("coprime numbers", () => {
			assertEquals(lcm(7)(11), 77)
			assertEquals(lcm(13)(17), 221)
			assertEquals(lcm(9)(16), 144)
		})

		await t.step("same number", () => {
			assertEquals(lcm(10)(10), 10)
			assertEquals(lcm(42)(42), 42)
		})

		await t.step("one divides the other", () => {
			assertEquals(lcm(5)(20), 20)
			assertEquals(lcm(3)(15), 15)
			assertEquals(lcm(8)(24), 24)
		})

		await t.step("with zero", () => {
			assertEquals(Number.isNaN(lcm(0)(5)), true)
			assertEquals(Number.isNaN(lcm(5)(0)), true)
			assertEquals(Number.isNaN(lcm(0)(0)), true)
		})

		await t.step("negative numbers", () => {
			assertEquals(lcm(-4)(6), 12)
			assertEquals(lcm(4)(-6), 12)
			assertEquals(lcm(-4)(-6), 12)
			assertEquals(lcm(-15)(5), 15)
		})

		await t.step("large numbers", () => {
			assertEquals(lcm(100)(150), 300)
			assertEquals(lcm(1234)(5678), 3503326)
			assertEquals(lcm(999)(1001), 999999)
		})

		await t.step("prime numbers", () => {
			assertEquals(lcm(17)(19), 323)
			assertEquals(lcm(11)(22), 22)
			assertEquals(lcm(13)(26), 26)
		})

		await t.step("powers of 2", () => {
			assertEquals(lcm(16)(24), 48)
			assertEquals(lcm(32)(48), 96)
			assertEquals(lcm(64)(128), 128)
		})

		await t.step("invalid inputs", () => {
			assertEquals(Number.isNaN(lcm(12.5)(8)), true)
			assertEquals(Number.isNaN(lcm(12)(8.3)), true)
			assertEquals(Number.isNaN(lcm(null as any)(8)), true)
			assertEquals(Number.isNaN(lcm(12)(undefined as any)), true)
			assertEquals(Number.isNaN(lcm("12" as any)(8)), true)
			assertEquals(Number.isNaN(lcm(NaN)(8)), true)
			assertEquals(Number.isNaN(lcm(Infinity)(8)), true)
		})

		await t.step("partial application", () => {
			const lcmWith12 = lcm(12)
			assertEquals(lcmWith12(8), 24)
			assertEquals(lcmWith12(9), 36)
			assertEquals(lcmWith12(16), 48)
		})

		await t.step("common denominator", () => {
			function commonDenominator(denom1: number, denom2: number): number {
				const result = lcm(denom1)(denom2)
				return isNaN(result) ? 0 : result
			}
			assertEquals(commonDenominator(3, 4), 12)
			assertEquals(commonDenominator(6, 8), 24)
		})

		await t.step("LCM of multiple numbers", () => {
			function lcmMultiple(numbers: Array<number>): number {
				if (numbers.length === 0) return NaN
				return numbers.reduce((acc, num) => lcm(acc)(num))
			}
			assertEquals(lcmMultiple([4, 6, 8]), 24)
			assertEquals(lcmMultiple([3, 5, 7]), 105)
		})

		await t.step("musical rhythm", () => {
			function rhythmSync(pattern1: number, pattern2: number): number {
				return lcm(pattern1)(pattern2)
			}
			assertEquals(rhythmSync(3, 4), 12)
		})

		await t.step("display refresh sync", () => {
			function syncRefreshRates(rate1: number, rate2: number): number {
				const divisor = gcd(rate1)(rate2)
				if (isNaN(divisor) || divisor === 0) return NaN
				return lcm(rate1)(rate2)
			}
			assertEquals(syncRefreshRates(60, 144), 720)
		})

		await t.step("tile pattern repeat", () => {
			function patternRepeatArea(width: number, height: number): number {
				const result = lcm(width)(height)
				return isNaN(result) ? 0 : result * result
			}
			assertEquals(patternRepeatArea(3, 4), 144)
		})

		await t.step("traffic light sync", () => {
			function trafficLightSync(red1: number, red2: number): number {
				return lcm(red1)(red2)
			}
			assertEquals(trafficLightSync(45, 60), 180)
		})

		await t.step("animation frame sync", () => {
			function animationSync(fps1: number, fps2: number): {
				frames1: number
				frames2: number
				duration: number
			} {
				const totalFrames = lcm(fps1)(fps2)
				if (isNaN(totalFrames)) {
					return { frames1: 0, frames2: 0, duration: 0 }
				}
				return {
					frames1: totalFrames / fps1,
					frames2: totalFrames / fps2,
					duration: totalFrames / Math.min(fps1, fps2),
				}
			}
			assertEquals(animationSync(24, 30), {
				frames1: 5,
				frames2: 4,
				duration: 5,
			})
		})

		await t.step("network packet alignment", () => {
			function packetAlignment(size1: number, size2: number): number {
				return lcm(size1)(size2)
			}
			assertEquals(packetAlignment(1500, 9000), 9000)
		})

		await t.step("orbital sync", () => {
			function orbitalSync(period1: number, period2: number): number {
				const days = lcm(Math.round(period1))(Math.round(period2))
				return isNaN(days) ? 0 : days
			}
			assertEquals(orbitalSync(365, 687), 250755)
		})

		await t.step("safe LCM", () => {
			function safeLCM(a: unknown, b: unknown): number | null {
				const aNum = typeof a === "number" ? a : NaN
				const bNum = typeof b === "number" ? b : NaN
				const result = lcm(aNum)(bNum)
				return isNaN(result) ? null : result
			}
			assertEquals(safeLCM(12, 8), 24)
			assertEquals(safeLCM(0, 8), null)
			assertEquals(safeLCM("12", 8), null)
		})
	})

	await t.step("immutability", async (t) => {
		await t.step("should not modify input values", () => {
			const a = 12
			const b = 8
			const result = lcm(a)(b)
			assertEquals(a, 12)
			assertEquals(b, 8)
			assertEquals(result, 24)
		})
	})

	await t.step("performance characteristics", async (t) => {
		await t.step("should be consistent for repeated calls", () => {
			const a = 15
			const b = 20
			const result1 = lcm(a)(b)
			const result2 = lcm(a)(b)
			const result3 = lcm(a)(b)

			assertEquals(result1, 60)
			assertEquals(result2, 60)
			assertEquals(result3, 60)
		})

		await t.step("should handle edge cases efficiently", () => {
			// Large coprime numbers
			assertEquals(lcm(997)(1009), 1005973)

			// One very large, one small
			assertEquals(lcm(1000000)(10), 1000000)

			// Powers of the same prime
			assertEquals(lcm(27)(81), 81) // 3^3 and 3^4
		})
	})
})
