import {
	assertAlmostEquals,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import cosine from "../../../../src/simple/trigonometry/cosine/index.ts"
import approximately from "../../../helpers/assertions/approximately/index.ts"

// Common angles for testing
const PI = Math.PI
const HALF_PI = Math.PI / 2
const QUARTER_PI = Math.PI / 4

Deno.test("cosine - basic angles", () => {
	// cos(0) = 1
	assertEquals(cosine(0), 1)

	// cos(π/2) ≈ 0
	assertEquals(approximately(cosine(HALF_PI), 0, 1e-10), true)

	// cos(π) = -1
	assertEquals(cosine(PI), -1)

	// cos(3π/2) ≈ 0
	assertEquals(approximately(cosine(3 * HALF_PI), 0, 1e-10), true)

	// cos(2π) = 1
	assertEquals(cosine(2 * PI), 1)
})

Deno.test("cosine - common angles", () => {
	// cos(π/4) = √2/2 ≈ 0.7071...
	assertAlmostEquals(cosine(QUARTER_PI), Math.sqrt(2) / 2, 1e-10)

	// cos(π/6) = √3/2 ≈ 0.8660...
	assertAlmostEquals(cosine(PI / 6), Math.sqrt(3) / 2, 1e-10)

	// cos(π/3) = 1/2
	assertAlmostEquals(cosine(PI / 3), 0.5, 1e-10)
})

Deno.test("cosine - negative angles (even function)", () => {
	// cos(-π/2) ≈ 0 (same as positive)
	assertEquals(approximately(cosine(-HALF_PI), 0, 1e-10), true)

	// cos(-π/3) = 0.5 (same as positive)
	assertAlmostEquals(cosine(-PI / 3), 0.5, 1e-10)

	// cos(-π/4) = √2/2 (same as positive)
	assertAlmostEquals(cosine(-QUARTER_PI), Math.sqrt(2) / 2, 1e-10)

	// cos(-π) = -1 (same as positive)
	assertEquals(cosine(-PI), -1)
})

Deno.test("cosine - periodicity", () => {
	// cos(x) = cos(x + 2π)
	assertAlmostEquals(cosine(QUARTER_PI), cosine(QUARTER_PI + 2 * PI), 1e-10)
	assertAlmostEquals(cosine(PI / 3), cosine(PI / 3 + 4 * PI), 1e-10)
	assertAlmostEquals(cosine(-PI / 6), cosine(-PI / 6 + 6 * PI), 1e-10)

	// cos(4π) = 1
	assertEquals(cosine(4 * PI), 1)
})

Deno.test("cosine - JSDoc examples", () => {
	// Common angles
	assertEquals(cosine(0), 1)
	assertEquals(approximately(cosine(HALF_PI), 0, 1e-10), true)
	assertEquals(cosine(PI), -1)
	assertEquals(approximately(cosine(3 * HALF_PI), 0, 1e-10), true)
	assertEquals(cosine(2 * PI), 1)

	// 45 degrees
	assertAlmostEquals(cosine(QUARTER_PI), Math.sqrt(2) / 2, 1e-10)

	// 30 degrees
	assertAlmostEquals(cosine(PI / 6), Math.sqrt(3) / 2, 1e-10)

	// 60 degrees
	assertAlmostEquals(cosine(PI / 3), 0.5, 1e-10)

	// Negative angles (even function)
	assertEquals(approximately(cosine(-HALF_PI), 0, 1e-10), true)
	assertAlmostEquals(cosine(-PI / 3), 0.5, 1e-10)

	// Large angles (periodic)
	assertEquals(cosine(4 * PI), 1)

	// Invalid inputs
	assertEquals(Number.isNaN(cosine(null)), true)
	assertEquals(Number.isNaN(cosine("0" as any)), true)
})

Deno.test("cosine - practical examples", () => {
	// Wave generation (phase shifted)
	const waveValue = (time: number, frequency: number) =>
		cosine(2 * PI * frequency * time)
	assertEquals(waveValue(0, 1), 1) // Starts at peak
	assertEquals(approximately(waveValue(0.25, 1), 0, 1e-10), true) // Quarter period

	// Circular motion
	const xPosition = (angle: number, radius: number) => radius * cosine(angle)
	assertEquals(xPosition(0, 10), 10) // Right of circle
	assertEquals(xPosition(PI, 10), -10) // Left of circle
	assertEquals(approximately(xPosition(HALF_PI, 10), 0, 1e-10), true) // Top of circle
})

Deno.test("cosine - invalid inputs", () => {
	assertEquals(Number.isNaN(cosine(null)), true)
	assertEquals(Number.isNaN(cosine(undefined)), true)
	assertEquals(Number.isNaN(cosine("0" as any)), true)
	assertEquals(Number.isNaN(cosine([] as any)), true)
	assertEquals(Number.isNaN(cosine({} as any)), true)
})

Deno.test("cosine - special values", () => {
	// Infinity
	assertEquals(Number.isNaN(cosine(Infinity)), true)
	assertEquals(Number.isNaN(cosine(-Infinity)), true)

	// NaN
	assertEquals(Number.isNaN(cosine(NaN)), true)

	// Very small values (cos(x) ≈ 1 - x²/2 for small x)
	assertAlmostEquals(cosine(1e-10), 1, 1e-20)
	assertAlmostEquals(cosine(-1e-10), 1, 1e-20)

	// Very large values (should still work due to periodicity)
	const largeAngle = 1000 * PI
	assertAlmostEquals(cosine(largeAngle), cosine(0), 1e-10)
})

// Property-based tests
Deno.test("cosine - bounded between -1 and 1", () => {
	fc.assert(
		fc.property(
			fc.float({
				noNaN: true,
				min: Math.fround(-1000),
				max: Math.fround(1000),
			}),
			(angle) => {
				const result = cosine(angle)
				return !Number.isNaN(result) && result >= -1 && result <= 1
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("cosine - even function property: cos(-x) = cos(x)", () => {
	fc.assert(
		fc.property(
			fc.float({
				noNaN: true,
				min: Math.fround(-100),
				max: Math.fround(100),
			}),
			(angle) => {
				const cosPositive = cosine(angle)
				const cosNegative = cosine(-angle)
				// Use tolerance for floating point comparison
				return approximately(cosPositive, cosNegative, 1e-10)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("cosine - Pythagorean identity: sin²(x) + cos²(x) = 1", () => {
	fc.assert(
		fc.property(
			fc.float({
				noNaN: true,
				min: Math.fround(-100),
				max: Math.fround(100),
			}),
			(angle) => {
				const cos = cosine(angle)
				const sin = Math.sin(angle) // Using Math.sin for testing
				const sumOfSquares = sin * sin + cos * cos
				return approximately(sumOfSquares, 1, 1e-10)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("cosine - periodicity property: cos(x + 2π) = cos(x)", () => {
	fc.assert(
		fc.property(
			fc.float({
				noNaN: true,
				min: Math.fround(-100),
				max: Math.fround(100),
			}),
			(angle) => {
				const original = cosine(angle)
				const shifted = cosine(angle + 2 * PI)
				return approximately(original, shifted, 1e-10)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("cosine - phase shift property: cos(x) = sin(x + π/2)", () => {
	fc.assert(
		fc.property(
			fc.float({
				noNaN: true,
				min: Math.fround(-100),
				max: Math.fround(100),
			}),
			(angle) => {
				const cos = cosine(angle)
				const shiftedSin = Math.sin(angle + HALF_PI)
				return approximately(cos, shiftedSin, 1e-10)
			},
		),
		{ numRuns: 1000 },
	)
})
