import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.x.x"

import inRange from "../../../../../src/simple/math/inRange/index.ts"

Deno.test("inRange: basic functionality", async (t) => {
	await t.step("basic range checks", () => {
		assertEquals(inRange(0)(10)(5), true)
		assertEquals(inRange(0)(10)(0), true) // inclusive start
		assertEquals(inRange(0)(10)(10), false) // exclusive end
		assertEquals(inRange(0)(10)(-1), false)
		assertEquals(inRange(0)(10)(11), false)
	})

	await t.step("decimal ranges", () => {
		assertEquals(inRange(1.5)(2.5)(2.0), true)
		assertEquals(inRange(1.5)(2.5)(1.5), true)
		assertEquals(inRange(1.5)(2.5)(2.5), false)
		assertEquals(inRange(0.0)(1.0)(0.5), true)
		assertEquals(inRange(0.1)(0.9)(0.1), true)
		assertEquals(inRange(0.1)(0.9)(0.9), false)
	})

	await t.step("negative ranges", () => {
		assertEquals(inRange(-10)(-5)(-7), true)
		assertEquals(inRange(-10)(-5)(-10), true)
		assertEquals(inRange(-10)(-5)(-5), false)
		assertEquals(inRange(-10)(-5)(-3), false)
		assertEquals(inRange(-10)(-5)(-11), false)
	})

	await t.step("mixed positive/negative", () => {
		assertEquals(inRange(-5)(5)(0), true)
		assertEquals(inRange(-5)(5)(-5), true)
		assertEquals(inRange(-5)(5)(5), false)
		assertEquals(inRange(-5)(5)(-6), false)
		assertEquals(inRange(-5)(5)(6), false)
	})

	await t.step("swapped bounds (auto-corrected)", () => {
		assertEquals(inRange(10)(0)(5), true)
		assertEquals(inRange(5)(-5)(0), true)
		assertEquals(inRange(100)(50)(75), true)
		assertEquals(inRange(50)(100)(75), true)
	})

	await t.step("same start and end (empty range)", () => {
		assertEquals(inRange(5)(5)(5), false)
		assertEquals(inRange(5)(5)(4), false)
		assertEquals(inRange(5)(5)(6), false)
		assertEquals(inRange(0)(0)(0), false)
		assertEquals(inRange(-5)(-5)(-5), false)
	})

	await t.step("large numbers", () => {
		assertEquals(inRange(0)(1000000)(500000), true)
		assertEquals(
			inRange(Number.MIN_SAFE_INTEGER)(Number.MAX_SAFE_INTEGER)(0),
			true,
		)
		assertEquals(inRange(Number.MIN_SAFE_INTEGER)(0)(-1000000), true)
		assertEquals(inRange(0)(Number.MAX_SAFE_INTEGER)(1000000), true)
	})
})

Deno.test("inRange: special values", () => {
	assertEquals(inRange(0)(10)(Infinity), false)
	assertEquals(inRange(0)(10)(-Infinity), false)
	assertEquals(inRange(-Infinity)(Infinity)(42), true)
	assertEquals(inRange(-Infinity)(0)(-100), true)
	assertEquals(inRange(0)(Infinity)(100), true)
	assertEquals(inRange(0)(10)(NaN), false)
	assertEquals(inRange(NaN)(10)(5), false)
	assertEquals(inRange(0)(NaN)(5), false)
})

Deno.test("inRange: error handling", () => {
	assertEquals(inRange(null)(10)(5), false)
	assertEquals(inRange(0)(undefined)(5), false)
	assertEquals(inRange(0)(10)(null), false)
	assertEquals(inRange(undefined)(10)(5), false)
	assertEquals(inRange(0)(10)(undefined), false)
	assertEquals(inRange("0" as any)(10)(5), false)
	assertEquals(inRange(0)(10)("5" as any), false)
	assertEquals(inRange(0)("10" as any)(5), false)
	assertEquals(inRange({} as any)(10)(5), false)
	assertEquals(inRange(0)(10)([] as any), false)
})

Deno.test("inRange: mathematical properties", () => {
	// Property: if value is in [a, b), then it's not in [b, ∞) for finite b
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, noDefaultInfinity: true }),
			fc.float({ noNaN: true, noDefaultInfinity: true }),
			fc.float({ noNaN: true }),
			(a, b, value) => {
				const min = Math.min(a, b)
				const max = Math.max(a, b)

				if (min === max) return true // Skip empty ranges

				const inFirst = inRange(min)(max)(value)
				const inSecond = inRange(max)(max + 1000)(value)

				// If value is in [min, max), it cannot be >= max
				if (inFirst && value < max) {
					return !inSecond
				}
				return true
			},
		),
		{ numRuns: 1000 },
	)

	// Property: auto-swap ensures consistent results
	fc.assert(
		fc.property(
			fc.float({ noNaN: true }),
			fc.float({ noNaN: true }),
			fc.float({ noNaN: true }),
			(a, b, value) => {
				const result1 = inRange(a)(b)(value)
				const result2 = inRange(b)(a)(value)
				return result1 === result2
			},
		),
		{ numRuns: 1000 },
	)

	// Property: transitivity of ordering
	fc.assert(
		fc.property(
			fc.float({ noNaN: true }),
			fc.float({ noNaN: true }),
			fc.float({ noNaN: true }),
			(a, b, c) => {
				const [min, mid, max] = [a, b, c].sort((x, y) => x - y)

				// If value is in [min, mid), it's also in [min, max)
				if (inRange(min)(mid)(min + (mid - min) / 2)) {
					return inRange(min)(max)(min + (mid - min) / 2)
				}
				return true
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("inRange: JSDoc examples", async (t) => {
	await t.step("basic range checks", () => {
		assertEquals(inRange(0)(10)(5), true)
		assertEquals(inRange(0)(10)(0), true)
		assertEquals(inRange(0)(10)(10), false)
		assertEquals(inRange(0)(10)(-1), false)
		assertEquals(inRange(0)(10)(11), false)
	})

	await t.step("decimal ranges", () => {
		assertEquals(inRange(1.5)(2.5)(2.0), true)
		assertEquals(inRange(1.5)(2.5)(1.5), true)
		assertEquals(inRange(1.5)(2.5)(2.5), false)
		assertEquals(inRange(0.0)(1.0)(0.5), true)
	})

	await t.step("negative ranges", () => {
		assertEquals(inRange(-10)(-5)(-7), true)
		assertEquals(inRange(-10)(-5)(-10), true)
		assertEquals(inRange(-10)(-5)(-5), false)
		assertEquals(inRange(-10)(-5)(-3), false)
	})

	await t.step("mixed positive/negative", () => {
		assertEquals(inRange(-5)(5)(0), true)
		assertEquals(inRange(-5)(5)(-5), true)
		assertEquals(inRange(-5)(5)(5), false)
		assertEquals(inRange(-5)(5)(-6), false)
	})

	await t.step("swapped bounds", () => {
		assertEquals(inRange(10)(0)(5), true)
		assertEquals(inRange(5)(-5)(0), true)
	})

	await t.step("same start and end", () => {
		assertEquals(inRange(5)(5)(5), false)
		assertEquals(inRange(5)(5)(4), false)
		assertEquals(inRange(5)(5)(6), false)
	})

	await t.step("large numbers", () => {
		assertEquals(inRange(0)(1000000)(500000), true)
		assertEquals(
			inRange(Number.MIN_SAFE_INTEGER)(Number.MAX_SAFE_INTEGER)(0),
			true,
		)
	})

	await t.step("special values", () => {
		assertEquals(inRange(0)(10)(Infinity), false)
		assertEquals(inRange(0)(10)(-Infinity), false)
		assertEquals(inRange(-Infinity)(Infinity)(42), true)
		assertEquals(inRange(0)(10)(NaN), false)
	})

	await t.step("invalid inputs", () => {
		assertEquals(inRange(null)(10)(5), false)
		assertEquals(inRange(0)(undefined)(5), false)
		assertEquals(inRange(0)(10)(null), false)
		assertEquals(inRange("0" as any)(10)(5), false)
		assertEquals(inRange(0)(10)("5" as any), false)
	})

	await t.step("partial application", () => {
		const inRange0To10 = inRange(0)(10)
		assertEquals(inRange0To10(5), true)
		assertEquals(inRange0To10(15), false)
	})

	await t.step("percentage validation", () => {
		const isValidPercent = inRange(0)(101)
		assertEquals(isValidPercent(50), true)
		assertEquals(isValidPercent(100), true)
		assertEquals(isValidPercent(101), false)
	})

	await t.step("RGB color validation", () => {
		const isValidRGB = inRange(0)(256)
		assertEquals(isValidRGB(128), true)
		assertEquals(isValidRGB(255), true)
		assertEquals(isValidRGB(256), false)
	})

	await t.step("temperature ranges", () => {
		const isLiquidWater = inRange(0)(100)
		assertEquals(isLiquidWater(25), true)
		assertEquals(isLiquidWater(-5), false)
		assertEquals(isLiquidWater(105), false)
	})

	await t.step("array bounds checking", () => {
		function isValidIndex(arr: Array<unknown>, index: number): boolean {
			return inRange(0)(arr.length)(index)
		}
		assertEquals(isValidIndex([1, 2, 3, 4, 5], 3), true)
		assertEquals(isValidIndex([1, 2, 3], 3), false)
	})

	await t.step("age groups", () => {
		const isChild = inRange(0)(13)
		const isTeen = inRange(13)(20)
		const isAdult = inRange(18)(65)

		assertEquals(isChild(10), true)
		assertEquals(isTeen(15), true)
		assertEquals(isAdult(25), true)
		assertEquals(isAdult(70), false)
	})

	await t.step("grade ranges", () => {
		const isA = inRange(90)(101)
		const isB = inRange(80)(90)
		const isC = inRange(70)(80)

		assertEquals(isB(85), true)
		assertEquals(isA(95), true)
		assertEquals(isC(75), true)
	})

	await t.step("time validation", () => {
		const isValidHour = inRange(0)(24)
		const isValidMinute = inRange(0)(60)

		assertEquals(isValidHour(14), true)
		assertEquals(isValidMinute(75), false)
	})

	await t.step("game boundaries", () => {
		const isInBoundsX = inRange(0)(800)
		const isInBoundsY = inRange(0)(600)

		function isInGameArea(x: number, y: number): boolean {
			return isInBoundsX(x) && isInBoundsY(y)
		}
		assertEquals(isInGameArea(400, 300), true)
		assertEquals(isInGameArea(900, 300), false)
	})

	await t.step("HTTP status codes", () => {
		const isSuccess = inRange(200)(300)
		const isRedirect = inRange(300)(400)
		const isClientError = inRange(400)(500)
		const isServerError = inRange(500)(600)

		assertEquals(isClientError(404), true)
		assertEquals(isSuccess(200), true)
		assertEquals(isServerError(503), true)
		assertEquals(isRedirect(301), true)
	})

	await t.step("port number validation", () => {
		const isValidPort = inRange(1)(65536)
		assertEquals(isValidPort(8080), true)
		assertEquals(isValidPort(0), false)
		assertEquals(isValidPort(70000), false)
	})

	await t.step("filtering arrays", () => {
		const numbers = [-5, 0, 5, 10, 15, 20, 25]
		const inRange10To20 = inRange(10)(20)
		const filtered = numbers.filter(inRange10To20)
		assertEquals(filtered, [10, 15])
	})

	await t.step("date range", () => {
		const isSummer = inRange(172)(266)
		assertEquals(isSummer(200), true)
		assertEquals(isSummer(100), false)
		assertEquals(isSummer(300), false)
	})

	await t.step("difficulty settings", () => {
		const difficultyRanges = {
			easy: inRange(1)(4),
			medium: inRange(4)(7),
			hard: inRange(7)(10),
			extreme: inRange(10)(11),
		}
		assertEquals(difficultyRanges.medium(5), true)
		assertEquals(difficultyRanges.easy(2), true)
		assertEquals(difficultyRanges.hard(8), true)
	})

	await t.step("safe range check", () => {
		function safeInRange(
			start: unknown,
			end: unknown,
			value: unknown,
		): boolean {
			const s = typeof start === "number" ? start : NaN
			const e = typeof end === "number" ? end : NaN
			const v = typeof value === "number" ? value : NaN
			if (isNaN(s) || isNaN(e) || isNaN(v)) return false
			return inRange(s)(e)(v)
		}
		assertEquals(safeInRange(0, 10, 5), true)
		assertEquals(safeInRange("0", 10, 5), false)
	})
})

Deno.test("inRange: property-based testing", () => {
	// Property: value at start boundary is always included
	fc.assert(
		fc.property(
			fc.float({ noNaN: true }),
			fc.float({ noNaN: true }),
			(a, b) => {
				if (a === b) return true // Skip empty ranges
				const min = Math.min(a, b)
				const max = Math.max(a, b)
				return inRange(min)(max)(min) === true
			},
		),
		{ numRuns: 1000 },
	)

	// Property: value at end boundary is always excluded
	fc.assert(
		fc.property(
			fc.float({ noNaN: true }),
			fc.float({ noNaN: true }),
			(a, b) => {
				if (a === b) return true // Skip empty ranges
				const min = Math.min(a, b)
				const max = Math.max(a, b)
				return inRange(min)(max)(max) === false
			},
		),
		{ numRuns: 1000 },
	)

	// Property: values outside range return false
	fc.assert(
		fc.property(
			fc.float({
				noNaN: true,
				noDefaultInfinity: true,
				min: -1e6,
				max: 1e6,
			}),
			fc.float({
				noNaN: true,
				noDefaultInfinity: true,
				min: -1e6,
				max: 1e6,
			}),
			fc.float({ min: Math.fround(0.1), max: Math.fround(100) }),
			(a, b, offset) => {
				if (a === b) return true // Skip empty ranges
				const min = Math.min(a, b)
				const max = Math.max(a, b)

				// Ensure we're creating values that are actually outside the range
				// and avoid overflow issues
				if (!Number.isFinite(min - Math.abs(offset))) return true
				if (!Number.isFinite(max + Math.abs(offset))) return true

				// Test value below range
				const belowRange = min - Math.abs(offset)
				assertEquals(
					inRange(a)(b)(belowRange),
					false,
					`Expected ${belowRange} to be outside [${min}, ${max})`,
				)

				// Test value above range
				const aboveRange = max + Math.abs(offset)
				assertEquals(
					inRange(a)(b)(aboveRange),
					false,
					`Expected ${aboveRange} to be outside [${min}, ${max})`,
				)

				return true
			},
		),
		{ numRuns: 1000 },
	)

	// Property: consistency check - same input always produces same output
	fc.assert(
		fc.property(
			fc.float({ noNaN: true }),
			fc.float({ noNaN: true }),
			fc.float({ noNaN: true }),
			(start, end, value) => {
				const result1 = inRange(start)(end)(value)
				const result2 = inRange(start)(end)(value)
				return result1 === result2
			},
		),
		{ numRuns: 1000 },
	)

	// Property: empty range always returns false
	fc.assert(
		fc.property(
			fc.float({ noNaN: true }),
			fc.float({ noNaN: true }),
			(sameValue, testValue) => {
				return inRange(sameValue)(sameValue)(testValue) === false
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("inRange: currying and partial application", () => {
	const range0To10 = inRange(0)(10)
	assertEquals(range0To10(5), true)
	assertEquals(range0To10(15), false)
	assertEquals(range0To10(-5), false)
	assertEquals(range0To10(0), true)
	assertEquals(range0To10(10), false)

	const rangeFrom5 = inRange(5)
	const range5To10 = rangeFrom5(10)
	assertEquals(range5To10(7), true)
	assertEquals(range5To10(3), false)
	assertEquals(range5To10(12), false)

	// Test with array methods
	const numbers = [1, 5, 10, 15, 20, 25]
	const inRange5To15 = inRange(5)(15)
	const filtered = numbers.filter(inRange5To15)
	assertEquals(filtered, [5, 10])
})

Deno.test("inRange: edge cases", () => {
	// Zero ranges
	assertEquals(inRange(0)(0)(0), false)
	assertEquals(inRange(0)(0)(1), false)
	assertEquals(inRange(0)(0)(-1), false)

	// Very small ranges
	assertEquals(inRange(0)(0.0000001)(0), true)
	assertEquals(inRange(0)(0.0000001)(0.00000005), true)
	assertEquals(inRange(0)(0.0000001)(0.0000001), false)

	// Very large ranges
	const largeRange = inRange(-1e308)(1e308)
	assertEquals(largeRange(0), true)
	assertEquals(largeRange(1e307), true)
	assertEquals(largeRange(-1e307), true)

	// Precision edge cases
	// 0.1 + 0.2 = 0.30000000000000004 in JavaScript, which is > 0.3
	assertEquals(inRange(0.1 + 0.2)(0.4)(0.3), false) // 0.3 < 0.30000000000000004
	assertEquals(inRange(0)(0.1 + 0.2)(0.3), true) // 0.3 is in [0, 0.30000000000000004)
	assertEquals(inRange(0.3)(0.4)(0.1 + 0.2), true) // 0.30000000000000004 is in [0.3, 0.4)
})
