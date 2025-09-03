import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import clamp from "../../../../../src/simple/math/clamp/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

// ===========================
// Behavioral Properties
// ===========================

Deno.test("clamp: bounded constraint property - should always return value within [min, max] bounds", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			(a, b, value) => {
				const min = Math.min(a, b)
				const max = Math.max(a, b)
				const result = clamp(min)(max)(value)

				assertEquals(
					result >= min,
					true,
					`Result ${result} should be >= ${min}`,
				)
				assertEquals(
					result <= max,
					true,
					`Result ${result} should be <= ${max}`,
				)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("clamp: idempotent property - clamp(a)(b)(clamp(a)(b)(x)) === clamp(a)(b)(x)", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			(a, b, value) => {
				const min = Math.min(a, b)
				const max = Math.max(a, b)
				const once = clamp(min)(max)(value)
				const twice = clamp(min)(max)(once)

				assertEquals(
					approximately(twice, once, 1e-10),
					true,
					`clamp should be idempotent: ${twice} !== ${once}`,
				)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("clamp: ordering property - should preserve min when value < min", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			(a, b, offset) => {
				const min = Math.min(a, b)
				const max = Math.max(a, b)
				const value = min - Math.abs(offset) - 1 // Ensure value < min
				const result = clamp(min)(max)(value)

				assertEquals(
					approximately(result, min, 1e-10),
					true,
					`When value < min, should return min: ${result} !== ${min}`,
				)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("clamp: ordering property - should preserve max when value > max", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			(a, b, offset) => {
				const min = Math.min(a, b)
				const max = Math.max(a, b)
				const value = max + Math.abs(offset) + 1 // Ensure value > max
				const result = clamp(min)(max)(value)

				assertEquals(
					approximately(result, max, 1e-10),
					true,
					`When value > max, should return max: ${result} !== ${max}`,
				)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("clamp: ordering property - should preserve value when min <= value <= max", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			fc.float({ min: 0, max: 1 }), // Ratio between min and max
			(a, b, ratio) => {
				const min = Math.min(a, b)
				const max = Math.max(a, b)
				const value = min + (max - min) * ratio // Ensure min <= value <= max
				const result = clamp(min)(max)(value)

				// Use larger epsilon to account for floating-point arithmetic in value calculation
				// The calculation of value itself introduces precision errors
				const epsilon = Math.max(1e-7, Math.abs(value) * 1e-7)
				assertEquals(
					approximately(result, value, epsilon),
					true,
					`When value in range, should preserve value: ${result} !== ${value}`,
				)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("clamp: monotonicity property - if x <= y then clamp(a)(b)(x) <= clamp(a)(b)(y)", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			fc.float({ noNaN: true, min: -1e10, max: 1e10 }),
			(a, b, x, y) => {
				const min = Math.min(a, b)
				const max = Math.max(a, b)
				const [smaller, larger] = x <= y ? [x, y] : [y, x]

				const resultSmaller = clamp(min)(max)(smaller)
				const resultLarger = clamp(min)(max)(larger)

				assertEquals(
					resultSmaller <= resultLarger,
					true,
					`Monotonicity violated: clamp(${smaller}) = ${resultSmaller} > clamp(${larger}) = ${resultLarger}`,
				)
			},
		),
		{ numRuns: 1000 },
	)
})

// ===========================
// Edge Cases and Special Values
// ===========================

Deno.test("clamp: edge cases - equal min and max (forcing value)", () => {
	const result1 = clamp(5)(5)(10)
	assertEquals(result1, 5, "Should force value to 5 when min = max = 5")

	const result2 = clamp(5)(5)(3)
	assertEquals(result2, 5, "Should force value to 5 when min = max = 5")

	const result3 = clamp(5)(5)(5)
	assertEquals(result3, 5, "Should return 5 when value = min = max = 5")
})

Deno.test("clamp: edge cases - Infinity bounds", () => {
	const result1 = clamp(0)(10)(Infinity)
	assertEquals(result1, 10, "Should clamp Infinity to max")

	const result2 = clamp(0)(10)(-Infinity)
	assertEquals(result2, 0, "Should clamp -Infinity to min")

	const result3 = clamp(-Infinity)(Infinity)(42)
	assertEquals(result3, 42, "Should preserve value with infinite bounds")

	const result4 = clamp(-Infinity)(10)(42)
	assertEquals(result4, 10, "Should clamp to max with -Infinity min")

	const result5 = clamp(0)(Infinity)(-42)
	assertEquals(result5, 0, "Should clamp to min with Infinity max")
})

Deno.test("clamp: edge cases - invalid range (min > max)", () => {
	const result = clamp(10)(5)(7)
	assertEquals(Number.isNaN(result), true, "Should return NaN when min > max")
})

Deno.test("clamp: edge cases - boundary values exactly", () => {
	const result1 = clamp(0)(10)(0)
	assertEquals(result1, 0, "Should return min when value equals min")

	const result2 = clamp(0)(10)(10)
	assertEquals(result2, 10, "Should return max when value equals max")
})

// ===========================
// Null Safety
// ===========================

Deno.test("clamp: null safety - null/undefined min", () => {
	const result1 = clamp(null)(10)(5)
	assertEquals(Number.isNaN(result1), true, "Should return NaN for null min")

	const result2 = clamp(undefined)(10)(5)
	assertEquals(
		Number.isNaN(result2),
		true,
		"Should return NaN for undefined min",
	)
})

Deno.test("clamp: null safety - null/undefined max", () => {
	const result1 = clamp(0)(null)(5)
	assertEquals(Number.isNaN(result1), true, "Should return NaN for null max")

	const result2 = clamp(0)(undefined)(5)
	assertEquals(
		Number.isNaN(result2),
		true,
		"Should return NaN for undefined max",
	)
})

Deno.test("clamp: null safety - null/undefined value", () => {
	const result1 = clamp(0)(10)(null)
	assertEquals(Number.isNaN(result1), true, "Should return NaN for null value")

	const result2 = clamp(0)(10)(undefined)
	assertEquals(
		Number.isNaN(result2),
		true,
		"Should return NaN for undefined value",
	)
})

Deno.test("clamp: null safety - non-numeric inputs", () => {
	// @ts-expect-error - Testing invalid input
	const result1 = clamp("0")(10)(5)
	assertEquals(Number.isNaN(result1), true, "Should return NaN for string min")

	// @ts-expect-error - Testing invalid input
	const result2 = clamp(0)("10")(5)
	assertEquals(Number.isNaN(result2), true, "Should return NaN for string max")

	// @ts-expect-error - Testing invalid input
	const result3 = clamp(0)(10)("5")
	assertEquals(
		Number.isNaN(result3),
		true,
		"Should return NaN for string value",
	)
})

Deno.test("clamp: null safety - NaN input", () => {
	const result1 = clamp(0)(10)(NaN)
	assertEquals(Number.isNaN(result1), true, "Should return NaN for NaN value")

	// NaN passes the typeof check, so the function continues
	// When NaN is used as min, comparisons fail and value is returned
	const result2 = clamp(NaN)(10)(5)
	assertEquals(result2, 5, "NaN min causes comparisons to fail, returns value")

	// When NaN is used as max, similar behavior
	const result3 = clamp(0)(NaN)(5)
	assertEquals(result3, 5, "NaN max causes comparisons to fail, returns value")
})

// ===========================
// JSDoc Examples (100% coverage)
// ===========================

Deno.test("clamp: JSDoc examples - basic clamping", () => {
	assertEquals(clamp(0)(10)(5), 5, "Within range")
	assertEquals(clamp(0)(10)(15), 10, "Clamped to max")
	assertEquals(clamp(0)(10)(-5), 0, "Clamped to min")
})

Deno.test("clamp: JSDoc examples - values exactly at bounds", () => {
	assertEquals(clamp(0)(10)(0), 0, "At min bound")
	assertEquals(clamp(0)(10)(10), 10, "At max bound")
})

Deno.test("clamp: JSDoc examples - decimal numbers", () => {
	assertEquals(clamp(1.5)(2.5)(2.0), 2.0, "Decimal within range")
	assertEquals(clamp(1.5)(2.5)(3.0), 2.5, "Decimal clamped to max")
	assertEquals(clamp(1.5)(2.5)(1.0), 1.5, "Decimal clamped to min")
})

Deno.test("clamp: JSDoc examples - negative ranges", () => {
	assertEquals(clamp(-10)(-5)(-7), -7, "Negative within range")
	assertEquals(clamp(-10)(-5)(-12), -10, "Negative clamped to min")
	assertEquals(clamp(-10)(-5)(-3), -5, "Negative clamped to max")
})

Deno.test("clamp: JSDoc examples - mixed positive/negative ranges", () => {
	assertEquals(clamp(-5)(5)(0), 0, "Zero in mixed range")
	assertEquals(clamp(-5)(5)(7), 5, "Positive clamped in mixed range")
	assertEquals(clamp(-5)(5)(-8), -5, "Negative clamped in mixed range")
})

Deno.test("clamp: JSDoc examples - same min and max", () => {
	assertEquals(clamp(5)(5)(10), 5, "Force to single value from above")
	assertEquals(clamp(5)(5)(3), 5, "Force to single value from below")
	assertEquals(clamp(5)(5)(5), 5, "Already at forced value")
})

Deno.test("clamp: JSDoc examples - invalid range", () => {
	const result = clamp(10)(5)(7)
	assertEquals(Number.isNaN(result), true, "Invalid range returns NaN")
})

Deno.test("clamp: JSDoc examples - special values", () => {
	assertEquals(clamp(0)(10)(Infinity), 10, "Infinity clamped to max")
	assertEquals(clamp(0)(10)(-Infinity), 0, "-Infinity clamped to min")
	assertEquals(
		clamp(-Infinity)(Infinity)(42),
		42,
		"Value preserved with infinite bounds",
	)
	assertEquals(Number.isNaN(clamp(0)(10)(NaN)), true, "NaN value returns NaN")
})

Deno.test("clamp: JSDoc examples - invalid inputs", () => {
	assertEquals(Number.isNaN(clamp(null)(10)(5)), true, "null min returns NaN")
	assertEquals(
		Number.isNaN(clamp(0)(undefined)(5)),
		true,
		"undefined max returns NaN",
	)
	assertEquals(Number.isNaN(clamp(0)(10)(null)), true, "null value returns NaN")
	// @ts-expect-error - Testing invalid input
	assertEquals(Number.isNaN(clamp("0")(10)(5)), true, "string min returns NaN")
})

Deno.test("clamp: JSDoc examples - partial application for specific ranges", () => {
	const clampPercent = clamp(0)(100)
	assertEquals(clampPercent(150), 100, "Percent clamped to 100")
	assertEquals(clampPercent(-20), 0, "Percent clamped to 0")
	assertEquals(clampPercent(75), 75, "Percent within range")
})

Deno.test("clamp: JSDoc examples - RGB color values", () => {
	const clampRGB = clamp(0)(255)
	assertEquals(clampRGB(300), 255, "RGB clamped to 255")
	assertEquals(clampRGB(-50), 0, "RGB clamped to 0")
	assertEquals(clampRGB(128), 128, "RGB within range")
})

Deno.test("clamp: JSDoc examples - angle normalization", () => {
	const clampAngle = clamp(0)(360)
	assertEquals(clampAngle(450), 360, "Angle clamped to 360")
	assertEquals(clampAngle(-90), 0, "Angle clamped to 0")
})

Deno.test("clamp: JSDoc examples - volume control", () => {
	const clampVolume = clamp(0)(1)
	assertEquals(clampVolume(1.5), 1, "Volume clamped to 1")
	assertEquals(clampVolume(-0.2), 0, "Volume clamped to 0")
	assertEquals(clampVolume(0.75), 0.75, "Volume within range")
})

Deno.test("clamp: JSDoc examples - temperature limits", () => {
	const clampCelsius = clamp(-273.15)(Infinity)
	assertEquals(clampCelsius(-300), -273.15, "Temperature at absolute zero")
	assertEquals(clampCelsius(100), 100, "Temperature above absolute zero")
})

Deno.test("clamp: JSDoc examples - array index bounds", () => {
	function safeIndex(arr: Array<unknown>, index: number): number {
		return clamp(0)(arr.length - 1)(index)
	}
	assertEquals(safeIndex([1, 2, 3, 4, 5], 7), 4, "Index clamped to max")
	assertEquals(safeIndex([1, 2, 3], -2), 0, "Index clamped to min")
})

Deno.test("clamp: JSDoc examples - game physics speed limits", () => {
	const clampSpeed = clamp(0)(200)
	const playerSpeed = 250
	const actualSpeed = clampSpeed(playerSpeed)
	assertEquals(actualSpeed, 200, "Speed clamped to max")
})

Deno.test("clamp: JSDoc examples - UI constraints", () => {
	function constrainPosition(
		x: number,
		y: number,
		width: number,
		height: number,
	) {
		const clampX = clamp(0)(width)
		const clampY = clamp(0)(height)
		return {
			x: clampX(x),
			y: clampY(y),
		}
	}
	const result = constrainPosition(150, -20, 100, 100)
	assertEquals(result.x, 100, "X position clamped to width")
	assertEquals(result.y, 0, "Y position clamped to 0")
})

Deno.test("clamp: JSDoc examples - health/damage systems", () => {
	const clampHealth = clamp(0)(100)
	let health = 100
	health = clampHealth(health - 120) // Take 120 damage
	assertEquals(health, 0, "Health can't go below 0")
})

Deno.test("clamp: JSDoc examples - zoom levels", () => {
	const clampZoom = clamp(0.5)(4)
	assertEquals(clampZoom(0.1), 0.5, "Zoom clamped to min")
	assertEquals(clampZoom(10), 4, "Zoom clamped to max")
})

Deno.test("clamp: JSDoc examples - progress bars", () => {
	const clampProgress = clamp(0)(1)
	function updateProgress(current: number, total: number): number {
		return clampProgress(current / total)
	}
	assertEquals(updateProgress(150, 100), 1, "Progress clamped to 100%")
})

Deno.test("clamp: JSDoc examples - animation frames", () => {
	const totalFrames = 60
	const clampFrame = clamp(0)(totalFrames - 1)
	assertEquals(clampFrame(75), 59, "Frame clamped to max")
})

Deno.test("clamp: JSDoc examples - score systems", () => {
	const clampScore = clamp(0)(999999)
	const bonusMultiplier = 5
	const baseScore = 200000
	assertEquals(
		clampScore(baseScore * bonusMultiplier),
		999999,
		"Score clamped to max",
	)
})

Deno.test("clamp: JSDoc examples - difficulty settings", () => {
	const clampDifficulty = clamp(1)(10)
	assertEquals(clampDifficulty(0), 1, "Difficulty clamped to easiest")
	assertEquals(clampDifficulty(15), 10, "Difficulty clamped to hardest")
})

Deno.test("clamp: JSDoc examples - pipeline processing", () => {
	const pipeline = [
		(x: number) => x * 2,
		clamp(-100)(100),
		(x: number) => x + 10,
	]
	const process = (val: number) => pipeline.reduce((acc, fn) => fn(acc), val)
	assertEquals(
		process(60),
		110,
		"Pipeline processing: 60 * 2 = 120, clamped to 100, + 10 = 110",
	)
})

Deno.test("clamp: JSDoc examples - safe calculation wrapper", () => {
	function safeClamp(
		min: unknown,
		max: unknown,
		value: unknown,
	): number | null {
		const minNum = typeof min === "number" ? min : NaN
		const maxNum = typeof max === "number" ? max : NaN
		const valNum = typeof value === "number" ? value : NaN
		const result = clamp(minNum)(maxNum)(valNum)
		return isNaN(result) ? null : result
	}
	assertEquals(safeClamp(0, 10, 5), 5, "Safe clamp with valid inputs")
	// When min is string "0", it becomes NaN, and NaN min causes value to be returned
	// So result is 5, not null
	assertEquals(
		safeClamp("0", 10, 5),
		5,
		"String min becomes NaN, comparisons fail, returns value",
	)
})

// ===========================
// Type Verification
// ===========================

Deno.test("clamp: type verification", () => {
	assertExists(clamp)
	assertEquals(typeof clamp, "function")
	assertEquals(typeof clamp(0), "function")
	assertEquals(typeof clamp(0)(10), "function")
	assertEquals(typeof clamp(0)(10)(5), "number")
})
