import { assertEquals, assertAlmostEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import radiansToDegrees from "../../../../src/simple/trigonometry/radiansToDegrees/index.ts"
import approximately from "../../../helpers/assertions/approximately/index.ts"

// Conversion constant
const RAD_TO_DEG = 180 / Math.PI

Deno.test("radiansToDegrees - common angles", () => {
	// 0 radians = 0 degrees
	assertEquals(radiansToDegrees(0), 0)
	
	// π/2 radians = 90 degrees
	assertEquals(radiansToDegrees(Math.PI / 2), 90)
	
	// π radians = 180 degrees
	assertEquals(radiansToDegrees(Math.PI), 180)
	
	// 3π/2 radians = 270 degrees
	assertEquals(radiansToDegrees(3 * Math.PI / 2), 270)
	
	// 2π radians = 360 degrees
	assertEquals(radiansToDegrees(2 * Math.PI), 360)
	
	// π/4 radians = 45 degrees
	assertEquals(radiansToDegrees(Math.PI / 4), 45)
})

Deno.test("radiansToDegrees - negative angles", () => {
	// -π/2 radians = -90 degrees
	assertEquals(radiansToDegrees(-Math.PI / 2), -90)
	
	// -π radians = -180 degrees
	assertEquals(radiansToDegrees(-Math.PI), -180)
	
	// -2π radians = -360 degrees
	assertEquals(radiansToDegrees(-2 * Math.PI), -360)
})

Deno.test("radiansToDegrees - small angles", () => {
	// 0.1 radians ≈ 5.729 degrees
	assertAlmostEquals(radiansToDegrees(0.1), 0.1 * RAD_TO_DEG, 1e-10)
	
	// 1 radian ≈ 57.295 degrees
	assertAlmostEquals(radiansToDegrees(1), RAD_TO_DEG, 1e-10)
	
	// 0.01 radians ≈ 0.5729 degrees
	assertAlmostEquals(radiansToDegrees(0.01), 0.01 * RAD_TO_DEG, 1e-10)
})

Deno.test("radiansToDegrees - large angles", () => {
	// 4π radians = 720 degrees
	assertEquals(radiansToDegrees(4 * Math.PI), 720)
	
	// 10π radians = 1800 degrees
	assertEquals(radiansToDegrees(10 * Math.PI), 1800)
	
	// -4π radians = -720 degrees
	assertEquals(radiansToDegrees(-4 * Math.PI), -720)
})

Deno.test("radiansToDegrees - JSDoc examples", () => {
	// Common angles
	assertEquals(radiansToDegrees(0), 0)
	assertEquals(radiansToDegrees(Math.PI / 2), 90)
	assertEquals(radiansToDegrees(Math.PI), 180)
	assertEquals(radiansToDegrees(3 * Math.PI / 2), 270)
	assertEquals(radiansToDegrees(2 * Math.PI), 360)
	
	// π/4 radians (45 degrees)
	assertEquals(radiansToDegrees(Math.PI / 4), 45)
	
	// Negative angles
	assertEquals(radiansToDegrees(-Math.PI / 2), -90)
	assertEquals(radiansToDegrees(-Math.PI), -180)
	
	// Small angles
	assertAlmostEquals(radiansToDegrees(0.1), 0.1 * RAD_TO_DEG, 1e-10)
	assertAlmostEquals(radiansToDegrees(1), RAD_TO_DEG, 1e-10)
	
	// Invalid inputs
	assertEquals(Number.isNaN(radiansToDegrees(null)), true)
	assertEquals(Number.isNaN(radiansToDegrees("1.57" as any)), true)
})

Deno.test("radiansToDegrees - practical examples", () => {
	// Converting Math function results
	const angle = Math.atan2(1, 1) // Returns radians
	assertEquals(radiansToDegrees(angle), 45)
	
	// Display rotation values
	const rotation = 0.7854 // radians (approximately π/4)
	assertAlmostEquals(radiansToDegrees(rotation), 45, 0.01)
	
	// Round-trip conversion (using a hypothetical degreesToRadians)
	const degreesToRadians = (deg: number) => deg * (Math.PI / 180)
	const original = 30
	const rad = degreesToRadians(original)
	assertAlmostEquals(radiansToDegrees(rad), 30, 1e-10)
})

Deno.test("radiansToDegrees - invalid inputs", () => {
	assertEquals(Number.isNaN(radiansToDegrees(null)), true)
	assertEquals(Number.isNaN(radiansToDegrees(undefined)), true)
	assertEquals(Number.isNaN(radiansToDegrees("0" as any)), true)
	assertEquals(Number.isNaN(radiansToDegrees([] as any)), true)
	assertEquals(Number.isNaN(radiansToDegrees({} as any)), true)
})

Deno.test("radiansToDegrees - special values", () => {
	// Infinity
	assertEquals(radiansToDegrees(Infinity), Infinity)
	assertEquals(radiansToDegrees(-Infinity), -Infinity)
	
	// NaN
	assertEquals(Number.isNaN(radiansToDegrees(NaN)), true)
	
	// Very small values
	const tiny = 1e-10
	assertAlmostEquals(radiansToDegrees(tiny), tiny * RAD_TO_DEG, 1e-20)
	
	// Very large values
	const large = 1e10
	assertEquals(radiansToDegrees(large), large * RAD_TO_DEG)
	
	// Zero
	assertEquals(radiansToDegrees(0), 0)
	assertEquals(Object.is(radiansToDegrees(-0), -0), true)
})

// Property-based tests
Deno.test("radiansToDegrees - conversion formula", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: Math.fround(-1000), max: Math.fround(1000) }),
			(radians) => {
				const degrees = radiansToDegrees(radians)
				const expected = radians * (180 / Math.PI)
				return approximately(degrees, expected, 1e-10)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("radiansToDegrees - inverse relationship with degreesToRadians", () => {
	const degreesToRadians = (deg: number) => deg * (Math.PI / 180)
	
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: Math.fround(-720), max: Math.fround(720) }),
			(degrees) => {
				const radians = degreesToRadians(degrees)
				const backToDegrees = radiansToDegrees(radians)
				return approximately(backToDegrees, degrees, 1e-10)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("radiansToDegrees - preserves sign", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: Math.fround(0.001), max: Math.fround(1000) }),
			(radians) => {
				const positive = radiansToDegrees(radians)
				const negative = radiansToDegrees(-radians)
				return positive > 0 && negative < 0 && approximately(positive, -negative, 1e-10)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("radiansToDegrees - linearity", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: Math.fround(-100), max: Math.fround(100) }),
			fc.float({ noNaN: true, min: Math.fround(-100), max: Math.fround(100) }),
			(a, b) => {
				const sum = radiansToDegrees(a + b)
				const separate = radiansToDegrees(a) + radiansToDegrees(b)
				return approximately(sum, separate, 1e-10)
			}
		),
		{ numRuns: 1000 }
	)
})