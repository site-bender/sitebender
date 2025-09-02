import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import round from "../../../../../src/simple/math/round/index.ts"

Deno.test("round", async (t) => {
	await t.step("rounding properties", async (t) => {
		await t.step("should round to nearest integer", () => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true }),
					(n) => {
						const result = round(n)

						// Special cases
						if (!isFinite(n)) {
							return result === n
						}

						// Result should be an integer
						if (isFinite(result)) {
							return Number.isInteger(result)
						}

						return true
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step(
			"should round to nearest integer with minimum distance",
			() => {
				fc.assert(
					fc.property(
						fc.float({ noNaN: true, min: -1e6, max: 1e6 }),
						(n) => {
							const result = round(n)

							// The distance to the rounded value should be at most 0.5
							const distance = Math.abs(result - n)
							return distance <= 0.5 + 1e-10 // Small epsilon for floating point
						},
					),
					{ numRuns: 1000 },
				)
			},
		)

		await t.step("should round halfway values using Math.round rules", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: -1000, max: 1000 }),
					(n) => {
						// JavaScript's Math.round uses "round half up" (toward positive infinity)
						// Positive: 0.5 -> 1, 1.5 -> 2, 2.5 -> 3
						// Negative: -0.5 -> 0, -1.5 -> -1, -2.5 -> -2

						const positiveHalf = n + 0.5
						const positiveResult = round(positiveHalf)
						// For n + 0.5, always round up (toward positive infinity)
						const expectedPositive = n + 1

						const negativeHalf = n - 0.5
						const negativeResult = round(negativeHalf)
						// For n - 0.5, Math.round rounds up (toward positive infinity)
						// This means we get the ceiling of n - 0.5
						let expectedNegative
						if (negativeHalf >= 0) {
							// If still positive, round to nearest (which is n for n - 0.5 where n >= 1)
							expectedNegative = n
						} else {
							// For negative values, Math.round rounds up (toward 0)
							// -1.5 -> -1, -2.5 -> -2, etc.
							expectedNegative = n
						}

						// Use regular equality (not Object.is) to handle -0 === 0
						return positiveResult === expectedPositive &&
							negativeResult === expectedNegative
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step("should be idempotent", () => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true }),
					(n) => {
						const once = round(n)
						const twice = round(once)

						// round(round(n)) should equal round(n)
						if (Number.isNaN(once)) {
							return Number.isNaN(twice)
						}
						return once === twice
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step("should preserve integers", () => {
			fc.assert(
				fc.property(
					fc.integer(),
					(n) => {
						return round(n) === n
					},
				),
				{ numRuns: 1000 },
			)
		})
	})

	await t.step("ordering properties", async (t) => {
		await t.step("should preserve monotonicity", () => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true, min: -1000, max: 1000 }),
					fc.float({ noNaN: true, min: -1000, max: 1000 }),
					(a, b) => {
						// If a <= b, then round(a) <= round(b)
						if (a <= b) {
							return round(a) <= round(b)
						}
						return true
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step("should have bounded error", () => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true, min: -1e6, max: 1e6 }),
					(n) => {
						const result = round(n)
						const error = result - n

						// Error should be between -0.5 and 0.5
						return error >= -0.5 - 1e-10 && error <= 0.5 + 1e-10
					},
				),
				{ numRuns: 1000 },
			)
		})
	})

	await t.step("relationship with other functions", async (t) => {
		await t.step("should relate to floor and ceiling", () => {
			fc.assert(
				fc.property(
					fc.float({ noNaN: true, min: -1000, max: 1000 }),
					(n) => {
						const rounded = round(n)
						const floored = Math.floor(n)
						const ceiled = Math.ceil(n)

						// round(n) should be either floor(n) or ceil(n)
						return rounded === floored || rounded === ceiled
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step("should equal floor for n < x.5", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: -1000, max: 1000 }),
					fc.float({
						noNaN: true,
						min: Math.fround(0.01),
						max: Math.fround(0.49),
					}), // Avoid exact 0 and very close to 0.5
					(base, fraction) => {
						const n = base + fraction
						// When fraction < 0.5, round goes to the nearest integer
						// For both positive and negative numbers with fraction < 0.5,
						// round equals floor (rounds down to the integer part)
						return round(n) === Math.floor(n)
					},
				),
				{ numRuns: 1000 },
			)
		})

		await t.step("should equal ceil for n > x.5", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: -1000, max: 1000 }),
					fc.float({
						noNaN: true,
						min: Math.fround(0.51),
						max: Math.fround(0.99),
					}), // Avoid being too close to 0.5
					(base, fraction) => {
						const n = base + fraction
						// When fraction > 0.5, round goes to the nearest integer
						// For both positive and negative numbers with fraction > 0.5,
						// round equals ceil (rounds up to the next integer)
						const rounded = round(n)
						const ceiling = Math.ceil(n)

						// Special case for -0: both 0 and -0 should be accepted as equal
						if (ceiling === 0 || rounded === 0) {
							return rounded === ceiling ||
								(Object.is(rounded, -0) && ceiling === 0)
						}

						return rounded === ceiling
					},
				),
				{ numRuns: 1000 },
			)
		})
	})

	await t.step("special values", async (t) => {
		await t.step("should handle positive numbers", () => {
			assertEquals(round(3.2), 3)
			assertEquals(round(3.7), 4)
			assertEquals(round(3.5), 4)
			assertEquals(round(0.1), 0)
			assertEquals(round(0.9), 1)
		})

		await t.step("should handle negative numbers", () => {
			assertEquals(round(-3.2), -3)
			assertEquals(round(-3.7), -4)
			assertEquals(round(-3.5), -3)
			assertEquals(round(-0.1), 0)
			assertEquals(round(-0.9), -1)
		})

		await t.step("should handle integers", () => {
			assertEquals(round(5), 5)
			assertEquals(round(-10), -10)
			assertEquals(round(0), 0)
			assertEquals(round(100), 100)
			assertEquals(round(-100), -100)
		})

		await t.step("should handle halfway cases", () => {
			assertEquals(round(0.5), 1)
			assertEquals(round(1.5), 2)
			assertEquals(round(2.5), 3)
			assertEquals(round(3.5), 4)
			assertEquals(round(-0.5), -0)
			assertEquals(round(-1.5), -1)
			assertEquals(round(-2.5), -2)
			assertEquals(round(-3.5), -3)
		})

		await t.step("should handle very small decimals", () => {
			assertEquals(round(0.1), 0)
			assertEquals(round(0.49999), 0)
			assertEquals(round(0.5), 1)
			assertEquals(round(0.50001), 1)
			assertEquals(round(0.9), 1)
		})

		await t.step("should handle large numbers", () => {
			assertEquals(round(1000000.3), 1000000)
			assertEquals(round(999999.9), 1000000)
			assertEquals(
				round(Number.MAX_SAFE_INTEGER - 0.4),
				Number.MAX_SAFE_INTEGER,
			)
			assertEquals(
				round(Number.MIN_SAFE_INTEGER + 0.4),
				Number.MIN_SAFE_INTEGER,
			)
		})

		await t.step("should handle special floating point values", () => {
			assertEquals(round(Infinity), Infinity)
			assertEquals(round(-Infinity), -Infinity)
			assertEquals(Number.isNaN(round(NaN)), true)
		})

		await t.step("should handle edge cases near zero", () => {
			assertEquals(round(0), 0)
			assertEquals(round(-0), -0)
			assertEquals(Object.is(round(-0), -0), true)
			assertEquals(round(Number.MIN_VALUE), 0)
			assertEquals(round(-Number.MIN_VALUE), -0)
		})
	})

	await t.step("error handling", async (t) => {
		await t.step("should return NaN for null", () => {
			assertEquals(Number.isNaN(round(null as any)), true)
		})

		await t.step("should return NaN for undefined", () => {
			assertEquals(Number.isNaN(round(undefined as any)), true)
		})

		await t.step("should return NaN for non-numeric values", () => {
			assertEquals(Number.isNaN(round("3.5" as any)), true)
			assertEquals(Number.isNaN(round("abc" as any)), true)
			assertEquals(Number.isNaN(round({} as any)), true)
			assertEquals(Number.isNaN(round([] as any)), true)
			assertEquals(Number.isNaN(round(true as any)), true)
			assertEquals(Number.isNaN(round(false as any)), true)
		})
	})

	await t.step("JSDoc examples", async (t) => {
		await t.step("basic rounding", () => {
			assertEquals(round(3.2), 3)
			assertEquals(round(3.7), 4)
			assertEquals(round(3.5), 4)
		})

		await t.step("negative numbers", () => {
			assertEquals(round(-3.2), -3)
			assertEquals(round(-3.7), -4)
			assertEquals(round(-3.5), -3)
		})

		await t.step("already integers", () => {
			assertEquals(round(5), 5)
			assertEquals(round(-10), -10)
			assertEquals(round(0), 0)
		})

		await t.step("very small decimals", () => {
			assertEquals(round(0.1), 0)
			assertEquals(round(0.49999), 0)
			assertEquals(round(0.5), 1)
			assertEquals(round(0.50001), 1)
			assertEquals(round(0.9), 1)
		})

		await t.step("large numbers", () => {
			assertEquals(round(1000000.3), 1000000)
			assertEquals(round(999999.9), 1000000)
			assertEquals(
				round(Number.MAX_SAFE_INTEGER - 0.4),
				Number.MAX_SAFE_INTEGER,
			)
		})

		await t.step("special values", () => {
			assertEquals(round(Infinity), Infinity)
			assertEquals(round(-Infinity), -Infinity)
			assertEquals(Number.isNaN(round(NaN)), true)
		})

		await t.step("invalid inputs", () => {
			assertEquals(Number.isNaN(round(null as any)), true)
			assertEquals(Number.isNaN(round(undefined as any)), true)
			assertEquals(Number.isNaN(round("3.5" as any)), true)
			assertEquals(Number.isNaN(round({} as any)), true)
			assertEquals(Number.isNaN(round([] as any)), true)
		})

		await t.step("rounding in calculations", () => {
			const average = (a: number, b: number) => round((a + b) / 2)
			assertEquals(average(3, 4), 4)
			assertEquals(average(3, 3), 3)
		})

		await t.step("percentage display", () => {
			const percent = 67.3
			const displayPercent = round(percent)
			assertEquals(displayPercent, 67)
		})

		await t.step("score rounding", () => {
			const score = 89.7
			const finalScore = round(score)
			assertEquals(finalScore, 90)
		})

		await t.step("temperature display", () => {
			const temp = 72.6
			const displayTemp = round(temp)
			assertEquals(displayTemp, 73)
		})

		await t.step("currency rounding", () => {
			const amount = 19.99
			const cents = round(amount * 100)
			assertEquals(cents, 1999)
		})

		await t.step("quantity rounding", () => {
			const items = 5.8
			const wholeItems = round(items)
			assertEquals(wholeItems, 6)
		})

		await t.step("time rounding", () => {
			const minutes = 45.7
			const wholeMinutes = round(minutes)
			assertEquals(wholeMinutes, 46)
		})

		await t.step("age calculation", () => {
			const exactAge = 25.8
			assertEquals(round(exactAge), 26)
		})

		await t.step("pixel positioning", () => {
			const xPosition = 150.7
			const yPosition = 200.3
			const pixel = { x: round(xPosition), y: round(yPosition) }
			assertEquals(pixel, { x: 151, y: 200 })
		})

		await t.step("frame rate rounding", () => {
			const fps = 59.94
			assertEquals(round(fps), 60)
		})

		await t.step("statistical rounding", () => {
			const mean = 73.5
			assertEquals(round(mean), 74)
			const median = 68.5
			assertEquals(round(median), 69)
		})

		await t.step("vote counting", () => {
			const votePercentage = 51.7
			assertEquals(round(votePercentage), 52)
		})

		await t.step("progress bar", () => {
			const progress = 67.3
			assertEquals(round(progress), 67)
		})

		await t.step("rating system", () => {
			const rating = 4.6
			assertEquals(round(rating), 5)
			const rating2 = 3.4
			assertEquals(round(rating2), 3)
		})

		await t.step("halfway cases", () => {
			assertEquals(round(2.5), 3)
			assertEquals(round(3.5), 4)
			assertEquals(round(4.5), 5)
			assertEquals(round(-2.5), -2)
			assertEquals(round(-3.5), -3)
		})

		await t.step("comparison with floor and ceil", () => {
			const n = 3.7
			assertEquals(Math.floor(n), 3)
			assertEquals(round(n), 4)
			assertEquals(Math.ceil(n), 4)
		})

		await t.step("discrete value mapping", () => {
			const continuous = 0.7
			const discrete = round(continuous * 10)
			assertEquals(discrete, 7)
		})

		await t.step("grid snapping", () => {
			const gridSize = 10
			const snapToGrid = (value: number) => round(value / gridSize) * gridSize
			assertEquals(snapToGrid(23), 20)
			assertEquals(snapToGrid(27), 30)
		})

		await t.step("quantization", () => {
			const analog = 127.8
			const digital = round(analog)
			assertEquals(digital, 128)
		})

		await t.step("division with rounding", () => {
			const divideAndRound = (a: number, b: number) => round(a / b)
			assertEquals(divideAndRound(10, 3), 3)
			assertEquals(divideAndRound(11, 3), 4)
		})

		await t.step("pipeline processing", () => {
			const process = (n: number) => round(Math.sqrt(n) * 10)
			assertEquals(process(2), 14)
		})

		await t.step("safe round with validation", () => {
			const safeRound = (value: unknown): number | null => {
				const num = typeof value === "number" ? value : NaN
				const result = round(num)
				return isNaN(result) ? null : result
			}
			assertEquals(safeRound(3.7), 4)
			assertEquals(safeRound("3.7"), null)
		})
	})

	await t.step("immutability", async (t) => {
		await t.step("should not modify the original value", () => {
			const original = 3.7
			const result = round(original)
			assertEquals(original, 3.7)
			assertEquals(result, 4)
		})
	})

	await t.step("performance characteristics", async (t) => {
		await t.step("should handle large arrays efficiently", () => {
			const values = Array.from({ length: 1000 }, (_, i) => i + 0.5)
			const rounded = values.map(round)
			const expected = Array.from({ length: 1000 }, (_, i) => i + 1)
			assertEquals(rounded, expected)
		})

		await t.step("should be consistent for repeated calls", () => {
			const value = 3.7
			const result1 = round(value)
			const result2 = round(value)
			const result3 = round(value)

			assertEquals(result1, 4)
			assertEquals(result2, 4)
			assertEquals(result3, 4)
		})
	})
})
