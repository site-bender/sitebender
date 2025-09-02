import {
	assertAlmostEquals,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import sine from "../../../../src/simple/trigonometry/sine/index.ts"
import approximately from "../../../helpers/assertions/approximately/index.ts"

// Common angles for testing
const PI = Math.PI
const HALF_PI = Math.PI / 2
const QUARTER_PI = Math.PI / 4

Deno.test("sine - basic angles", () => {
	// sin(0) = 0
	assertEquals(sine(0), 0)

	// sin(π/2) = 1
	assertEquals(sine(HALF_PI), 1)

	// sin(π) ≈ 0 (small floating point error)
	assertEquals(approximately(sine(PI), 0, 1e-10), true)

	// sin(3π/2) = -1
	assertEquals(sine(3 * HALF_PI), -1)

	// sin(2π) ≈ 0 (small floating point error)
	assertEquals(approximately(sine(2 * PI), 0, 1e-10), true)
})

Deno.test("sine - common angles", () => {
	// sin(π/4) = √2/2 ≈ 0.7071...
	assertAlmostEquals(sine(QUARTER_PI), Math.sqrt(2) / 2, 1e-10)

	// sin(π/6) = 1/2
	assertAlmostEquals(sine(PI / 6), 0.5, 1e-10)

	// sin(π/3) = √3/2 ≈ 0.8660...
	assertAlmostEquals(sine(PI / 3), Math.sqrt(3) / 2, 1e-10)
})

Deno.test("sine - negative angles", () => {
	// sin(-π/2) = -1
	assertEquals(sine(-HALF_PI), -1)

	// sin(-π/6) = -0.5
	assertAlmostEquals(sine(-PI / 6), -0.5, 1e-10)

	// sin(-π/4) = -√2/2
	assertAlmostEquals(sine(-QUARTER_PI), -Math.sqrt(2) / 2, 1e-10)
})

Deno.test("sine - periodicity", () => {
	// sin(x) = sin(x + 2π)
	assertAlmostEquals(sine(QUARTER_PI), sine(QUARTER_PI + 2 * PI), 1e-10)
	assertAlmostEquals(sine(PI / 3), sine(PI / 3 + 4 * PI), 1e-10)
	assertAlmostEquals(sine(-PI / 6), sine(-PI / 6 + 6 * PI), 1e-10)

	// sin(5π) ≈ 0
	assertEquals(approximately(sine(5 * PI), 0, 1e-10), true)
})

Deno.test("sine - JSDoc examples", () => {
	// Common angles
	assertEquals(sine(0), 0)
	assertEquals(sine(HALF_PI), 1)
	assertEquals(approximately(sine(PI), 0, 1e-10), true)
	assertEquals(sine(3 * HALF_PI), -1)
	assertEquals(approximately(sine(2 * PI), 0, 1e-10), true)

	// 45 degrees
	assertAlmostEquals(sine(QUARTER_PI), Math.sqrt(2) / 2, 1e-10)

	// 30 degrees
	assertAlmostEquals(sine(PI / 6), 0.5, 1e-10)

	// 60 degrees
	assertAlmostEquals(sine(PI / 3), Math.sqrt(3) / 2, 1e-10)

	// Negative angles
	assertEquals(sine(-HALF_PI), -1)
	assertAlmostEquals(sine(-PI / 6), -0.5, 1e-10)

	// Large angles (periodic)
	assertEquals(approximately(sine(5 * PI), 0, 1e-10), true)

	// Invalid inputs
	assertEquals(Number.isNaN(sine(null)), true)
	assertEquals(Number.isNaN(sine("1.57" as any)), true)
})

Deno.test("sine - practical examples", () => {
	// Wave generation
	const waveHeight = (time: number, frequency: number) =>
		sine(2 * PI * frequency * time)
	assertEquals(waveHeight(0.25, 1), 1) // Peak at quarter period
	assertEquals(approximately(waveHeight(0.5, 1), 0, 1e-10), true) // Zero crossing

	// Circular motion
	const yPosition = (angle: number, radius: number) => radius * sine(angle)
	assertEquals(yPosition(HALF_PI, 10), 10) // Top of circle
	assertEquals(yPosition(0, 10), 0) // Right of circle
	assertEquals(approximately(yPosition(PI, 10), 0, 1e-10), true) // Left of circle (approximately)
})

Deno.test("sine - invalid inputs", () => {
	assertEquals(Number.isNaN(sine(null)), true)
	assertEquals(Number.isNaN(sine(undefined)), true)
	assertEquals(Number.isNaN(sine("0" as any)), true)
	assertEquals(Number.isNaN(sine([] as any)), true)
	assertEquals(Number.isNaN(sine({} as any)), true)
})

Deno.test("sine - special values", () => {
	// Infinity
	assertEquals(Number.isNaN(sine(Infinity)), true)
	assertEquals(Number.isNaN(sine(-Infinity)), true)

	// NaN
	assertEquals(Number.isNaN(sine(NaN)), true)

	// Very small values
	assertAlmostEquals(sine(1e-10), 1e-10, 1e-20)
	assertAlmostEquals(sine(-1e-10), -1e-10, 1e-20)

	// Very large values (should still work due to periodicity)
	const largeAngle = 1000 * PI + QUARTER_PI
	assertAlmostEquals(sine(largeAngle), sine(QUARTER_PI), 1e-10)
})

// Property-based tests
Deno.test("sine - bounded between -1 and 1", () => {
	fc.assert(
		fc.property(
			fc.float({
				noNaN: true,
				min: Math.fround(-1000),
				max: Math.fround(1000),
			}),
			(angle) => {
				const result = sine(angle)
				return !Number.isNaN(result) && result >= -1 && result <= 1
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("sine - odd function property: sin(-x) = -sin(x)", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: Math.fround(-100), max: Math.fround(100) }),
			(angle) => {
				const sinPositive = sine(angle)
				const sinNegative = sine(-angle)
				// Use tolerance for floating point comparison
				return approximately(sinNegative, -sinPositive, 1e-10)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("sine - Pythagorean identity: sin²(x) + cos²(x) = 1", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: Math.fround(-100), max: Math.fround(100) }),
			(angle) => {
				const sin = sine(angle)
				const cos = Math.cos(angle) // Using Math.cos for testing
				const sumOfSquares = sin * sin + cos * cos
				return approximately(sumOfSquares, 1, 1e-10)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("sine - periodicity property: sin(x + 2π) = sin(x)", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: Math.fround(-100), max: Math.fround(100) }),
			(angle) => {
				const original = sine(angle)
				const shifted = sine(angle + 2 * PI)
				return approximately(original, shifted, 1e-10)
			},
		),
		{ numRuns: 1000 },
	)
})
