import { assertEquals, assertAlmostEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import tangent from "../../../../src/simple/trigonometry/tangent/index.ts"
import approximately from "../../../helpers/assertions/approximately/index.ts"

// Common angles for testing
const PI = Math.PI
const HALF_PI = Math.PI / 2
const QUARTER_PI = Math.PI / 4

Deno.test("tangent - basic angles", () => {
	// tan(0) = 0
	assertEquals(tangent(0), 0)
	
	// tan(π/4) = 1
	assertAlmostEquals(tangent(QUARTER_PI), 1, 1e-10)
	
	// tan(π) ≈ 0 (small floating point error)
	assertEquals(approximately(tangent(PI), 0, 1e-10), true)
	
	// tan(-π/4) = -1
	assertAlmostEquals(tangent(-QUARTER_PI), -1, 1e-10)
})

Deno.test("tangent - common angles", () => {
	// tan(π/6) = 1/√3 ≈ 0.5773...
	assertAlmostEquals(tangent(PI / 6), 1 / Math.sqrt(3), 1e-10)
	
	// tan(π/3) = √3 ≈ 1.732...
	assertAlmostEquals(tangent(PI / 3), Math.sqrt(3), 1e-10)
	
	// tan(3π/4) = -1 (135 degrees)
	assertAlmostEquals(tangent(3 * QUARTER_PI), -1, 1e-10)
})

Deno.test("tangent - negative angles", () => {
	// tan(-π/6) = -1/√3
	assertAlmostEquals(tangent(-PI / 6), -1 / Math.sqrt(3), 1e-10)
	
	// tan(-π/3) = -√3
	assertAlmostEquals(tangent(-PI / 3), -Math.sqrt(3), 1e-10)
})

Deno.test("tangent - asymptotes", () => {
	// tan(π/2) approaches infinity
	const tanHalfPi = tangent(HALF_PI)
	assertEquals(tanHalfPi > 1e10, true) // Very large positive number
	
	// tan(-π/2) approaches negative infinity
	const tanNegHalfPi = tangent(-HALF_PI)
	assertEquals(tanNegHalfPi < -1e10, true) // Very large negative number
	
	// tan(3π/2) approaches infinity
	const tan3HalfPi = tangent(3 * HALF_PI)
	assertEquals(tan3HalfPi > 1e10, true)
})

Deno.test("tangent - periodicity", () => {
	// tan(x) = tan(x + π) (period is π, not 2π)
	assertAlmostEquals(tangent(QUARTER_PI), tangent(QUARTER_PI + PI), 1e-10)
	assertAlmostEquals(tangent(PI / 6), tangent(PI / 6 + PI), 1e-10)
	assertAlmostEquals(tangent(-PI / 3), tangent(-PI / 3 + 2 * PI), 1e-10)
	
	// tan(5π/4) = 1 (same as π/4)
	assertAlmostEquals(tangent(5 * QUARTER_PI), 1, 1e-10)
})

Deno.test("tangent - JSDoc examples", () => {
	// Common angles
	assertEquals(tangent(0), 0)
	assertAlmostEquals(tangent(QUARTER_PI), 1, 1e-10)
	assertEquals(approximately(tangent(PI), 0, 1e-10), true)
	assertAlmostEquals(tangent(-QUARTER_PI), -1, 1e-10)
	
	// 30 degrees
	assertAlmostEquals(tangent(PI / 6), 1 / Math.sqrt(3), 1e-10)
	
	// 60 degrees
	assertAlmostEquals(tangent(PI / 3), Math.sqrt(3), 1e-10)
	
	// Asymptotes
	assertEquals(tangent(HALF_PI) > 1e10, true)
	assertEquals(tangent(-HALF_PI) < -1e10, true)
	
	// Negative angles
	assertAlmostEquals(tangent(-PI / 6), -1 / Math.sqrt(3), 1e-10)
	
	// Large angles (periodic)
	assertAlmostEquals(tangent(5 * QUARTER_PI), 1, 1e-10)
	
	// Invalid inputs
	assertEquals(Number.isNaN(tangent(null)), true)
	assertEquals(Number.isNaN(tangent("0.785" as any)), true)
})

Deno.test("tangent - practical examples", () => {
	// Slope calculation
	const slope = (angle: number) => tangent(angle)
	assertAlmostEquals(slope(QUARTER_PI), 1, 1e-10) // 45° slope = 100% grade
	assertAlmostEquals(slope(PI / 6), 1 / Math.sqrt(3), 1e-10) // 30° slope ≈ 58% grade
	
	// Shadow length calculation
	const shadowLength = (height: number, sunAngle: number) =>
		height / tangent(sunAngle)
	assertAlmostEquals(shadowLength(10, QUARTER_PI), 10, 1e-10) // 45° sun angle
	assertAlmostEquals(shadowLength(10, PI / 3), 10 / Math.sqrt(3), 1e-10) // 60° sun angle
})

Deno.test("tangent - invalid inputs", () => {
	assertEquals(Number.isNaN(tangent(null)), true)
	assertEquals(Number.isNaN(tangent(undefined)), true)
	assertEquals(Number.isNaN(tangent("0" as any)), true)
	assertEquals(Number.isNaN(tangent([] as any)), true)
	assertEquals(Number.isNaN(tangent({} as any)), true)
})

Deno.test("tangent - special values", () => {
	// Infinity
	assertEquals(Number.isNaN(tangent(Infinity)), true)
	assertEquals(Number.isNaN(tangent(-Infinity)), true)
	
	// NaN
	assertEquals(Number.isNaN(tangent(NaN)), true)
	
	// Very small values (tan(x) ≈ x for small x)
	assertAlmostEquals(tangent(1e-10), 1e-10, 1e-20)
	assertAlmostEquals(tangent(-1e-10), -1e-10, 1e-20)
	
	// Very large values (should still work due to periodicity)
	const largeAngle = 1000 * PI + QUARTER_PI
	assertAlmostEquals(tangent(largeAngle), tangent(QUARTER_PI), 1e-10)
})

// Property-based tests
Deno.test("tangent - odd function property: tan(-x) = -tan(x)", () => {
	fc.assert(
		fc.property(
			// Avoid values near asymptotes (multiples of π/2)
			fc.float({ 
				noNaN: true, 
				min: Math.fround(-PI/3), 
				max: Math.fround(PI/3) 
			}),
			(angle) => {
				const tanPositive = tangent(angle)
				const tanNegative = tangent(-angle)
				// Use tolerance for floating point comparison
				return approximately(tanNegative, -tanPositive, 1e-10)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("tangent - identity: tan(x) = sin(x)/cos(x)", () => {
	fc.assert(
		fc.property(
			// Avoid values near asymptotes
			fc.float({ 
				noNaN: true, 
				min: Math.fround(-PI/3), 
				max: Math.fround(PI/3) 
			}),
			(angle) => {
				const tan = tangent(angle)
				const sinCosRatio = Math.sin(angle) / Math.cos(angle)
				return approximately(tan, sinCosRatio, 1e-10)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("tangent - periodicity property: tan(x + π) = tan(x)", () => {
	fc.assert(
		fc.property(
			// Avoid values near asymptotes
			fc.float({ 
				noNaN: true, 
				min: Math.fround(-PI/3), 
				max: Math.fround(PI/3) 
			}),
			(angle) => {
				const original = tangent(angle)
				const shifted = tangent(angle + PI)
				return approximately(original, shifted, 1e-10)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("tangent - product identity: tan(x) * cot(x) = 1 (when defined)", () => {
	fc.assert(
		fc.property(
			// Avoid values near 0 and asymptotes
			fc.float({ 
				noNaN: true, 
				min: Math.fround(0.1), 
				max: Math.fround(PI/3) 
			}),
			(angle) => {
				const tan = tangent(angle)
				const cot = 1 / tan // cotangent
				const product = tan * cot
				return approximately(product, 1, 1e-10)
			}
		),
		{ numRuns: 1000 }
	)
})