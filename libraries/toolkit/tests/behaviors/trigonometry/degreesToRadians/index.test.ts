import {
	assertAlmostEquals,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import degreesToRadians from "../../../../src/simple/trigonometry/degreesToRadians/index.ts"
import approximately from "../../../helpers/assertions/approximately/index.ts"

// Conversion constant
const DEG_TO_RAD = Math.PI / 180

Deno.test("degreesToRadians - common angles", () => {
	// 0 degrees = 0 radians
	assertEquals(degreesToRadians(0), 0)

	// 90 degrees = π/2 radians
	assertAlmostEquals(degreesToRadians(90), Math.PI / 2, 1e-10)

	// 180 degrees = π radians
	assertAlmostEquals(degreesToRadians(180), Math.PI, 1e-10)

	// 270 degrees = 3π/2 radians
	assertAlmostEquals(degreesToRadians(270), 3 * Math.PI / 2, 1e-10)

	// 360 degrees = 2π radians
	assertAlmostEquals(degreesToRadians(360), 2 * Math.PI, 1e-10)

	// 45 degrees = π/4 radians
	assertAlmostEquals(degreesToRadians(45), Math.PI / 4, 1e-10)
})

Deno.test("degreesToRadians - negative angles", () => {
	// -90 degrees = -π/2 radians
	assertAlmostEquals(degreesToRadians(-90), -Math.PI / 2, 1e-10)

	// -180 degrees = -π radians
	assertAlmostEquals(degreesToRadians(-180), -Math.PI, 1e-10)

	// -360 degrees = -2π radians
	assertAlmostEquals(degreesToRadians(-360), -2 * Math.PI, 1e-10)
})

Deno.test("degreesToRadians - decimal degrees", () => {
	// 30.5 degrees
	assertAlmostEquals(degreesToRadians(30.5), 30.5 * DEG_TO_RAD, 1e-10)

	// 1 degree
	assertAlmostEquals(degreesToRadians(1), DEG_TO_RAD, 1e-10)

	// 0.1 degrees
	assertAlmostEquals(degreesToRadians(0.1), 0.1 * DEG_TO_RAD, 1e-10)
})

Deno.test("degreesToRadians - large angles", () => {
	// 720 degrees = 4π radians
	assertAlmostEquals(degreesToRadians(720), 4 * Math.PI, 1e-10)

	// 1800 degrees = 10π radians
	assertAlmostEquals(degreesToRadians(1800), 10 * Math.PI, 1e-10)

	// -720 degrees = -4π radians
	assertAlmostEquals(degreesToRadians(-720), -4 * Math.PI, 1e-10)
})

Deno.test("degreesToRadians - JSDoc examples", () => {
	// Common angles
	assertEquals(degreesToRadians(0), 0)
	assertAlmostEquals(degreesToRadians(90), Math.PI / 2, 1e-10)
	assertAlmostEquals(degreesToRadians(180), Math.PI, 1e-10)
	assertAlmostEquals(degreesToRadians(270), 3 * Math.PI / 2, 1e-10)
	assertAlmostEquals(degreesToRadians(360), 2 * Math.PI, 1e-10)

	// 45 degrees
	assertAlmostEquals(degreesToRadians(45), Math.PI / 4, 1e-10)

	// Negative angles
	assertAlmostEquals(degreesToRadians(-90), -Math.PI / 2, 1e-10)
	assertAlmostEquals(degreesToRadians(-180), -Math.PI, 1e-10)

	// Decimal degrees
	assertAlmostEquals(degreesToRadians(30.5), 30.5 * DEG_TO_RAD, 1e-10)
	assertAlmostEquals(degreesToRadians(1), DEG_TO_RAD, 1e-10)

	// Large angles
	assertAlmostEquals(degreesToRadians(720), 4 * Math.PI, 1e-10)

	// Invalid inputs
	assertEquals(Number.isNaN(degreesToRadians(null)), true)
	assertEquals(Number.isNaN(degreesToRadians(undefined)), true)
	assertEquals(Number.isNaN(degreesToRadians("45" as any)), true)
})

Deno.test("degreesToRadians - practical examples", () => {
	// Converting for Math trigonometric functions
	const angle = 60
	const radians = degreesToRadians(angle)
	assertAlmostEquals(Math.sin(radians), Math.sqrt(3) / 2, 1e-10) // sin(60°) = √3/2

	// Rotation calculations
	const rotationDegrees = 45
	const rotationRadians = degreesToRadians(rotationDegrees)
	assertAlmostEquals(rotationRadians, Math.PI / 4, 1e-10)

	// Geographic calculations
	const latitude = 40.7128 // New York latitude in degrees
	const latRadians = degreesToRadians(latitude)
	assertAlmostEquals(latRadians, latitude * DEG_TO_RAD, 1e-10)
})

Deno.test("degreesToRadians - invalid inputs", () => {
	assertEquals(Number.isNaN(degreesToRadians(null)), true)
	assertEquals(Number.isNaN(degreesToRadians(undefined)), true)
	assertEquals(Number.isNaN(degreesToRadians("0" as any)), true)
	assertEquals(Number.isNaN(degreesToRadians([] as any)), true)
	assertEquals(Number.isNaN(degreesToRadians({} as any)), true)
})

Deno.test("degreesToRadians - special values", () => {
	// Infinity
	assertEquals(degreesToRadians(Infinity), Infinity)
	assertEquals(degreesToRadians(-Infinity), -Infinity)

	// NaN
	assertEquals(Number.isNaN(degreesToRadians(NaN)), true)

	// Very small values
	const tiny = 1e-10
	assertAlmostEquals(degreesToRadians(tiny), tiny * DEG_TO_RAD, 1e-20)

	// Very large values
	const large = 1e10
	assertEquals(degreesToRadians(large), large * DEG_TO_RAD)

	// Zero
	assertEquals(degreesToRadians(0), 0)
	assertEquals(Object.is(degreesToRadians(-0), -0), true)
})

// Property-based tests
Deno.test("degreesToRadians - conversion formula", () => {
	fc.assert(
		fc.property(
			fc.float({
				noNaN: true,
				min: Math.fround(-1000),
				max: Math.fround(1000),
			}),
			(degrees) => {
				const radians = degreesToRadians(degrees)
				const expected = degrees * (Math.PI / 180)
				return approximately(radians, expected, 1e-10)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("degreesToRadians - inverse relationship with radiansToDegrees", () => {
	const radiansToDegrees = (rad: number) => rad * (180 / Math.PI)

	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: Math.fround(-10), max: Math.fround(10) }),
			(radians) => {
				const degrees = radiansToDegrees(radians)
				const backToRadians = degreesToRadians(degrees)
				return approximately(backToRadians, radians, 1e-10)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("degreesToRadians - preserves sign", () => {
	fc.assert(
		fc.property(
			fc.float({
				noNaN: true,
				min: Math.fround(0.001),
				max: Math.fround(1000),
			}),
			(degrees) => {
				const positive = degreesToRadians(degrees)
				const negative = degreesToRadians(-degrees)
				return positive > 0 && negative < 0 &&
					approximately(positive, -negative, 1e-10)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("degreesToRadians - linearity", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: Math.fround(-100), max: Math.fround(100) }),
			fc.float({ noNaN: true, min: Math.fround(-100), max: Math.fround(100) }),
			(a, b) => {
				const sum = degreesToRadians(a + b)
				const separate = degreesToRadians(a) + degreesToRadians(b)
				return approximately(sum, separate, 1e-10)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("degreesToRadians - 360 degree cycle", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, min: Math.fround(-180), max: Math.fround(180) }),
			fc.integer({ min: -5, max: 5 }),
			(degrees, cycles) => {
				const original = degreesToRadians(degrees)
				const cycled = degreesToRadians(degrees + 360 * cycles)
				const expectedDiff = 2 * Math.PI * cycles
				return approximately(cycled - original, expectedDiff, 1e-10)
			},
		),
		{ numRuns: 1000 },
	)
})
