import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import clamp from "../../../../src/simple/math/clamp/index.ts"

Deno.test("clamp - should constrain value within bounds", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true }),
			fc.float({ noNaN: true }),
			fc.float({ noNaN: true }),
			(a, b, value) => {
				const min = Math.min(a, b)
				const max = Math.max(a, b)
				const result = clamp(min)(max)(value)
				
				assertEquals(result >= min, true)
				assertEquals(result <= max, true)
				
				if (value >= min && value <= max) {
					assertEquals(result, value)
				} else if (value < min) {
					assertEquals(result, min)
				} else {
					assertEquals(result, max)
				}
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("clamp - should handle exact boundary values", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true }),
			fc.float({ noNaN: true }),
			(a, b) => {
				const min = Math.min(a, b)
				const max = Math.max(a, b)
				
				assertEquals(clamp(min)(max)(min), min)
				assertEquals(clamp(min)(max)(max), max)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("clamp - should handle same min and max (forces value)", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true }),
			fc.float({ noNaN: true }),
			(bound, value) => {
				const result = clamp(bound)(bound)(value)
				assertEquals(result, bound)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("clamp - idempotent property", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true }),
			fc.float({ noNaN: true }),
			fc.float({ noNaN: true }),
			(a, b, value) => {
				const min = Math.min(a, b)
				const max = Math.max(a, b)
				const clampFunc = clamp(min)(max)
				
				const once = clampFunc(value)
				const twice = clampFunc(once)
				
				assertEquals(twice, once)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("clamp - should preserve relative ordering within bounds", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true }),
			fc.float({ noNaN: true }),
			fc.float({ noNaN: true }),
			fc.float({ noNaN: true }),
			(a, b, v1, v2) => {
				const min = Math.min(a, b)
				const max = Math.max(a, b)
				const clampFunc = clamp(min)(max)
				
				const r1 = clampFunc(v1)
				const r2 = clampFunc(v2)
				
				// If both values are within bounds, ordering is preserved
				if (v1 >= min && v1 <= max && v2 >= min && v2 <= max) {
					if (v1 < v2) assertEquals(r1 <= r2, true)
					if (v1 > v2) assertEquals(r1 >= r2, true)
				}
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("clamp - should handle Infinity correctly", () => {
	assertEquals(clamp(0)(10)(Infinity), 10)
	assertEquals(clamp(0)(10)(-Infinity), 0)
	assertEquals(clamp(-Infinity)(Infinity)(42), 42)
	assertEquals(clamp(-Infinity)(10)(20), 10)
	assertEquals(clamp(0)(Infinity)(-10), 0)
})

Deno.test("clamp - should handle negative ranges", () => {
	assertEquals(clamp(-10)(-5)(-7), -7)
	assertEquals(clamp(-10)(-5)(-12), -10)
	assertEquals(clamp(-10)(-5)(-3), -5)
	assertEquals(clamp(-10)(-5)(-5), -5)
	assertEquals(clamp(-10)(-5)(-10), -10)
})

Deno.test("clamp - should handle mixed positive/negative ranges", () => {
	assertEquals(clamp(-5)(5)(0), 0)
	assertEquals(clamp(-5)(5)(7), 5)
	assertEquals(clamp(-5)(5)(-8), -5)
	assertEquals(clamp(-5)(5)(-5), -5)
	assertEquals(clamp(-5)(5)(5), 5)
})

Deno.test("clamp - should handle decimal numbers", () => {
	assertEquals(clamp(1.5)(2.5)(2.0), 2.0)
	assertEquals(clamp(1.5)(2.5)(3.0), 2.5)
	assertEquals(clamp(1.5)(2.5)(1.0), 1.5)
	assertEquals(clamp(1.5)(2.5)(1.5), 1.5)
	assertEquals(clamp(1.5)(2.5)(2.5), 2.5)
})

Deno.test("clamp - should return NaN for invalid range (min > max)", () => {
	assertEquals(Number.isNaN(clamp(10)(5)(7)), true)
	assertEquals(Number.isNaN(clamp(100)(-100)(0)), true)
	assertEquals(Number.isNaN(clamp(1)(0)(0.5)), true)
})

Deno.test("clamp - should return NaN for null or undefined inputs", () => {
	assertEquals(Number.isNaN(clamp(null as any)(10)(5)), true)
	assertEquals(Number.isNaN(clamp(undefined as any)(10)(5)), true)
	assertEquals(Number.isNaN(clamp(0)(null as any)(5)), true)
	assertEquals(Number.isNaN(clamp(0)(undefined as any)(5)), true)
	assertEquals(Number.isNaN(clamp(0)(10)(null as any)), true)
	assertEquals(Number.isNaN(clamp(0)(10)(undefined as any)), true)
})

Deno.test("clamp - should return NaN for non-number inputs", () => {
	assertEquals(Number.isNaN(clamp("0" as any)(10)(5)), true)
	assertEquals(Number.isNaN(clamp(0)("10" as any)(5)), true)
	assertEquals(Number.isNaN(clamp(0)(10)("5" as any)), true)
	assertEquals(Number.isNaN(clamp({} as any)(10)(5)), true)
	assertEquals(Number.isNaN(clamp(0)({} as any)(5)), true)
	assertEquals(Number.isNaN(clamp(0)(10)({} as any)), true)
})

Deno.test("clamp - should return NaN when value is NaN", () => {
	assertEquals(Number.isNaN(clamp(0)(10)(NaN)), true)
	assertEquals(Number.isNaN(clamp(-5)(5)(NaN)), true)
})

Deno.test("clamp - should handle NaN in min or max", () => {
	// When min is NaN, it passes the type check but fails comparisons, returns value unchanged
	assertEquals(clamp(NaN)(10)(5), 5)
	// When max is NaN, similar behavior - NaN comparisons fail, returns value
	assertEquals(clamp(0)(NaN)(5), 5)
	// When both are NaN, still returns value since comparisons fail
	assertEquals(clamp(NaN)(NaN)(5), 5)
})

// JSDoc examples
Deno.test("clamp - JSDoc example: basic clamping", () => {
	assertEquals(clamp(0)(10)(5), 5)
	assertEquals(clamp(0)(10)(15), 10)
	assertEquals(clamp(0)(10)(-5), 0)
})

Deno.test("clamp - JSDoc example: exactly at bounds", () => {
	assertEquals(clamp(0)(10)(0), 0)
	assertEquals(clamp(0)(10)(10), 10)
})

Deno.test("clamp - JSDoc example: decimal numbers", () => {
	assertEquals(clamp(1.5)(2.5)(2.0), 2.0)
	assertEquals(clamp(1.5)(2.5)(3.0), 2.5)
	assertEquals(clamp(1.5)(2.5)(1.0), 1.5)
})

Deno.test("clamp - JSDoc example: negative ranges", () => {
	assertEquals(clamp(-10)(-5)(-7), -7)
	assertEquals(clamp(-10)(-5)(-12), -10)
	assertEquals(clamp(-10)(-5)(-3), -5)
})

Deno.test("clamp - JSDoc example: mixed positive/negative", () => {
	assertEquals(clamp(-5)(5)(0), 0)
	assertEquals(clamp(-5)(5)(7), 5)
	assertEquals(clamp(-5)(5)(-8), -5)
})

Deno.test("clamp - JSDoc example: same min and max", () => {
	assertEquals(clamp(5)(5)(10), 5)
	assertEquals(clamp(5)(5)(3), 5)
	assertEquals(clamp(5)(5)(5), 5)
})

Deno.test("clamp - JSDoc example: invalid range", () => {
	assertEquals(Number.isNaN(clamp(10)(5)(7)), true)
})

Deno.test("clamp - JSDoc example: special values", () => {
	assertEquals(clamp(0)(10)(Infinity), 10)
	assertEquals(clamp(0)(10)(-Infinity), 0)
	assertEquals(clamp(-Infinity)(Infinity)(42), 42)
	assertEquals(Number.isNaN(clamp(0)(10)(NaN)), true)
})

Deno.test("clamp - JSDoc example: invalid inputs", () => {
	assertEquals(Number.isNaN(clamp(null as any)(10)(5)), true)
	assertEquals(Number.isNaN(clamp(0)(undefined as any)(5)), true)
	assertEquals(Number.isNaN(clamp(0)(10)(null as any)), true)
	assertEquals(Number.isNaN(clamp("0" as any)(10)(5)), true)
})

Deno.test("clamp - JSDoc example: partial application for specific ranges", () => {
	const clampPercent = clamp(0)(100)
	assertEquals(clampPercent(150), 100)
	assertEquals(clampPercent(-20), 0)
	assertEquals(clampPercent(75), 75)
})

Deno.test("clamp - JSDoc example: RGB color values", () => {
	const clampRGB = clamp(0)(255)
	assertEquals(clampRGB(300), 255)
	assertEquals(clampRGB(-50), 0)
	assertEquals(clampRGB(128), 128)
})

Deno.test("clamp - JSDoc example: angle normalization", () => {
	const clampAngle = clamp(0)(360)
	assertEquals(clampAngle(450), 360)
	assertEquals(clampAngle(-90), 0)
})

Deno.test("clamp - JSDoc example: volume control", () => {
	const clampVolume = clamp(0)(1)
	assertEquals(clampVolume(1.5), 1)
	assertEquals(clampVolume(-0.2), 0)
	assertEquals(clampVolume(0.75), 0.75)
})

Deno.test("clamp - JSDoc example: temperature limits", () => {
	const clampCelsius = clamp(-273.15)(Infinity)
	assertEquals(clampCelsius(-300), -273.15)
	assertEquals(clampCelsius(100), 100)
})

Deno.test("clamp - JSDoc example: array index bounds", () => {
	function safeIndex(arr: Array<unknown>, index: number): number {
		return clamp(0)(arr.length - 1)(index)
	}
	assertEquals(safeIndex([1, 2, 3, 4, 5], 7), 4)
	assertEquals(safeIndex([1, 2, 3], -2), 0)
})

Deno.test("clamp - JSDoc example: game physics", () => {
	const clampSpeed = clamp(0)(200)
	const playerSpeed = 250
	const actualSpeed = clampSpeed(playerSpeed)
	assertEquals(actualSpeed, 200)
})

Deno.test("clamp - JSDoc example: UI constraints", () => {
	function constrainPosition(x: number, y: number, width: number, height: number) {
		const clampX = clamp(0)(width)
		const clampY = clamp(0)(height)
		return {
			x: clampX(x),
			y: clampY(y)
		}
	}
	assertEquals(constrainPosition(150, -20, 100, 100), { x: 100, y: 0 })
})

Deno.test("clamp - JSDoc example: health/damage systems", () => {
	const clampHealth = clamp(0)(100)
	let health = 100
	health = clampHealth(health - 120)
	assertEquals(health, 0)
})

Deno.test("clamp - JSDoc example: zoom levels", () => {
	const clampZoom = clamp(0.5)(4)
	assertEquals(clampZoom(0.1), 0.5)
	assertEquals(clampZoom(10), 4)
})

Deno.test("clamp - JSDoc example: progress bar", () => {
	const clampProgress = clamp(0)(1)
	function updateProgress(current: number, total: number): number {
		return clampProgress(current / total)
	}
	assertEquals(updateProgress(150, 100), 1)
})

Deno.test("clamp - JSDoc example: animation frames", () => {
	const totalFrames = 60
	const clampFrame = clamp(0)(totalFrames - 1)
	assertEquals(clampFrame(75), 59)
})

Deno.test("clamp - JSDoc example: score systems", () => {
	const clampScore = clamp(0)(999999)
	const bonusMultiplier = 5
	const baseScore = 200000
	assertEquals(clampScore(baseScore * bonusMultiplier), 999999)
})

Deno.test("clamp - JSDoc example: difficulty settings", () => {
	const clampDifficulty = clamp(1)(10)
	assertEquals(clampDifficulty(0), 1)
	assertEquals(clampDifficulty(15), 10)
})

Deno.test("clamp - JSDoc example: pipeline processing", () => {
	const pipeline = [
		(x: number) => x * 2,
		clamp(-100)(100),
		(x: number) => x + 10
	]
	const process = (val: number) => 
		pipeline.reduce((acc, fn) => fn(acc), val)
	assertEquals(process(60), 110)
})

Deno.test("clamp - JSDoc example: safe calculation", () => {
	function safeClamp(min: unknown, max: unknown, value: unknown): number | null {
		const minNum = typeof min === 'number' ? min : NaN
		const maxNum = typeof max === 'number' ? max : NaN
		const valNum = typeof value === 'number' ? value : NaN
		const result = clamp(minNum)(maxNum)(valNum)
		return Number.isNaN(result) ? null : result
	}
	assertEquals(safeClamp(0, 10, 5), 5)
	assertEquals(safeClamp("0", 10, 5), 5) // NaN min doesn't cause NaN result
})

Deno.test("clamp - partial application", () => {
	const clamp0To10 = clamp(0)(10)
	assertEquals(clamp0To10(5), 5)
	assertEquals(clamp0To10(15), 10)
	assertEquals(clamp0To10(-5), 0)
	
	const clampTo10 = clamp(0)
	const clamp5To10 = clampTo10(10)
	assertEquals(clamp5To10(7), 7)
})