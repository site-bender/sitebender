import {
	assertAlmostEquals,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import hypotenuse from "../../../../src/simple/trigonometry/hypotenuse/index.ts"
import approximately from "../../../helpers/assertions/approximately/index.ts"

Deno.test("hypotenuse - classic Pythagorean theorem", () => {
	// 3-4-5 triangle
	assertEquals(hypotenuse([3, 4]), 5)

	// 5-12-13 triangle
	assertEquals(hypotenuse([5, 12]), 13)

	// 8-15-17 triangle
	assertEquals(hypotenuse([8, 15]), 17)

	// 7-24-25 triangle
	assertEquals(hypotenuse([7, 24]), 25)
})

Deno.test("hypotenuse - 3D space", () => {
	// 2-3-6 gives √(4+9+36) = √49 = 7
	assertEquals(hypotenuse([2, 3, 6]), 7)

	// 1-2-2 gives √(1+4+4) = √9 = 3
	assertEquals(hypotenuse([1, 2, 2]), 3)

	// Unit cube diagonal: √3
	assertAlmostEquals(hypotenuse([1, 1, 1]), Math.sqrt(3), 1e-10)
})

Deno.test("hypotenuse - higher dimensions", () => {
	// 4D space
	assertAlmostEquals(hypotenuse([1, 2, 2, 2]), Math.sqrt(1 + 4 + 4 + 4), 1e-10)

	// 5D space - all ones gives √5
	assertAlmostEquals(hypotenuse([1, 1, 1, 1, 1]), Math.sqrt(5), 1e-10)

	// 10D space - all twos gives 2√10
	const tenDimensions = Array(10).fill(2)
	assertAlmostEquals(hypotenuse(tenDimensions), 2 * Math.sqrt(10), 1e-10)
})

Deno.test("hypotenuse - single dimension", () => {
	// Positive value
	assertEquals(hypotenuse([5]), 5)

	// Negative value (absolute value)
	assertEquals(hypotenuse([-5]), 5)

	// Zero
	assertEquals(hypotenuse([0]), 0)

	// Decimal
	assertEquals(hypotenuse([3.14]), 3.14)
})

Deno.test("hypotenuse - zero vector", () => {
	assertEquals(hypotenuse([0, 0]), 0)
	assertEquals(hypotenuse([0, 0, 0]), 0)
	assertEquals(hypotenuse([0, 0, 0, 0, 0]), 0)
})

Deno.test("hypotenuse - mixed positive and negative", () => {
	// Signs don't matter (squaring makes everything positive)
	assertEquals(hypotenuse([-3, 4]), 5)
	assertEquals(hypotenuse([3, -4]), 5)
	assertEquals(hypotenuse([-3, -4]), 5)

	// 3D with mixed signs
	assertEquals(hypotenuse([-2, 3, -6]), 7)
})

Deno.test("hypotenuse - large values (avoids overflow)", () => {
	// Should handle large values without overflow
	const large = 1e200
	assertAlmostEquals(
		hypotenuse([large, large]),
		Math.sqrt(2) * large,
		large * 1e-10,
	)

	// 3D large values
	assertAlmostEquals(
		hypotenuse([large, large, large]),
		Math.sqrt(3) * large,
		large * 1e-10,
	)
})

Deno.test("hypotenuse - small values (maintains precision)", () => {
	// Should handle small values without underflow
	const small = 1e-200
	assertAlmostEquals(
		hypotenuse([small, small]),
		Math.sqrt(2) * small,
		small * 1e-10,
	)

	// 3D small values
	assertAlmostEquals(
		hypotenuse([small, small, small]),
		Math.sqrt(3) * small,
		small * 1e-10,
	)
})

Deno.test("hypotenuse - empty array", () => {
	// Empty array returns 0 by convention
	assertEquals(hypotenuse([]), 0)
})

Deno.test("hypotenuse - JSDoc examples", () => {
	// Classic Pythagorean theorem
	assertEquals(hypotenuse([3, 4]), 5)
	assertEquals(hypotenuse([5, 12]), 13)

	// 3D space
	assertEquals(hypotenuse([2, 3, 6]), 7)
	assertAlmostEquals(hypotenuse([1, 2, 2, 2]), Math.sqrt(13), 1e-10)

	// Single dimension
	assertEquals(hypotenuse([5]), 5)
	assertEquals(hypotenuse([-5]), 5)

	// Zero vector
	assertEquals(hypotenuse([0, 0, 0]), 0)

	// Mixed positive and negative
	assertEquals(hypotenuse([-3, 4]), 5)

	// Large values
	const large = 1e200
	assertAlmostEquals(
		hypotenuse([large, large]),
		Math.sqrt(2) * large,
		large * 1e-10,
	)

	// Small values
	const small = 1e-200
	assertAlmostEquals(
		hypotenuse([small, small]),
		Math.sqrt(2) * small,
		small * 1e-10,
	)

	// Empty array
	assertEquals(hypotenuse([]), 0)

	// Invalid inputs
	assertEquals(Number.isNaN(hypotenuse(null)), true)
	assertEquals(Number.isNaN(hypotenuse([1, "2", 3] as any)), true)
	assertEquals(Number.isNaN(hypotenuse([1, null, 3] as any)), true)
})

Deno.test("hypotenuse - practical examples", () => {
	// Distance from origin in 2D
	const point2D = [3, 4]
	assertEquals(hypotenuse(point2D), 5)

	// Distance from origin in 3D
	const point3D = [1, 2, 2]
	assertEquals(hypotenuse(point3D), 3)

	// Vector magnitude
	const vector = [6, 8]
	assertEquals(hypotenuse(vector), 10)

	// Screen diagonal
	const screenWidth = 1920
	const screenHeight = 1080
	assertAlmostEquals(
		hypotenuse([screenWidth, screenHeight]),
		Math.sqrt(1920 * 1920 + 1080 * 1080),
		0.1,
	)

	// 3D game physics - velocity magnitude
	const velocity = [10, 5, -3]
	assertAlmostEquals(hypotenuse(velocity), Math.sqrt(100 + 25 + 9), 1e-10)

	// Signal processing - complex number magnitude
	const real = 3
	const imaginary = 4
	assertEquals(hypotenuse([real, imaginary]), 5)
})

Deno.test("hypotenuse - invalid inputs", () => {
	assertEquals(Number.isNaN(hypotenuse(null)), true)
	assertEquals(Number.isNaN(hypotenuse(undefined)), true)
	assertEquals(Number.isNaN(hypotenuse("array" as any)), true)
	assertEquals(Number.isNaN(hypotenuse(123 as any)), true)
	assertEquals(Number.isNaN(hypotenuse({} as any)), true)
})

Deno.test("hypotenuse - invalid array elements", () => {
	assertEquals(Number.isNaN(hypotenuse([1, 2, null] as any)), true)
	assertEquals(Number.isNaN(hypotenuse([1, undefined, 3] as any)), true)
	assertEquals(Number.isNaN(hypotenuse([1, "2", 3] as any)), true)
	assertEquals(Number.isNaN(hypotenuse([1, NaN, 3])), true)
	assertEquals(Number.isNaN(hypotenuse([1, {}, 3] as any)), true)
})

Deno.test("hypotenuse - special values", () => {
	// Infinity in array
	assertEquals(hypotenuse([Infinity, 1]), Infinity)
	assertEquals(hypotenuse([1, -Infinity]), Infinity)
	assertEquals(hypotenuse([Infinity, Infinity]), Infinity)

	// NaN in array
	assertEquals(Number.isNaN(hypotenuse([NaN, 1])), true)
	assertEquals(Number.isNaN(hypotenuse([1, NaN])), true)

	// Mixed zero and non-zero
	assertEquals(hypotenuse([0, 3, 4]), 5)
	assertEquals(hypotenuse([3, 0, 4]), 5)
})

// Property-based tests
Deno.test("hypotenuse - always non-negative", () => {
	fc.assert(
		fc.property(
			fc.array(fc.float({ noNaN: true }), { minLength: 1, maxLength: 10 }),
			(values) => {
				const result = hypotenuse(values)
				return !Number.isNaN(result) && result >= 0
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("hypotenuse - scaling property", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.float({
					noNaN: true,
					min: Math.fround(-100),
					max: Math.fround(100),
				}),
				{ minLength: 1, maxLength: 5 },
			),
			fc.float({ noNaN: true, min: Math.fround(0.1), max: Math.fround(10) }),
			(values, scale) => {
				const original = hypotenuse(values)
				const scaled = hypotenuse(values.map((v) => v * scale))
				return approximately(scaled, Math.abs(scale) * original, 1e-10)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("hypotenuse - triangle inequality", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.float({
					noNaN: true,
					min: Math.fround(-100),
					max: Math.fround(100),
				}),
				{ minLength: 2, maxLength: 5 },
			),
			fc.array(
				fc.float({
					noNaN: true,
					min: Math.fround(-100),
					max: Math.fround(100),
				}),
				{ minLength: 2, maxLength: 5 },
			),
			(a, b) => {
				// Make arrays same length
				const len = Math.min(a.length, b.length)
				const vecA = a.slice(0, len)
				const vecB = b.slice(0, len)
				const vecSum = vecA.map((v, i) => v + vecB[i])

				const hypA = hypotenuse(vecA)
				const hypB = hypotenuse(vecB)
				const hypSum = hypotenuse(vecSum)

				// Triangle inequality: |a + b| <= |a| + |b|
				return hypSum <= hypA + hypB + 1e-10
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("hypotenuse - equivalence to Math.hypot", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.float({
					noNaN: true,
					min: Math.fround(-1000),
					max: Math.fround(1000),
				}),
				{ minLength: 1, maxLength: 10 },
			),
			(values) => {
				const result = hypotenuse(values)
				const expected = Math.hypot(...values)
				return approximately(result, expected, 1e-10)
			},
		),
		{ numRuns: 1000 },
	)
})

// Tests for fallback implementation (when Math.hypot is not available)
Deno.test("hypotenuse - fallback implementation for classic Pythagorean theorem", () => {
	// Temporarily remove Math.hypot to test fallback
	const originalHypot = Math.hypot
	// @ts-ignore - intentionally setting to undefined
	Math.hypot = undefined

	try {
		// 3-4-5 triangle
		assertEquals(hypotenuse([3, 4]), 5)

		// 5-12-13 triangle
		assertEquals(hypotenuse([5, 12]), 13)

		// 8-15-17 triangle
		assertEquals(hypotenuse([8, 15]), 17)
	} finally {
		Math.hypot = originalHypot
	}
})

Deno.test("hypotenuse - fallback implementation handles zero vector", () => {
	const originalHypot = Math.hypot
	// @ts-ignore - intentionally setting to undefined
	Math.hypot = undefined

	try {
		assertEquals(hypotenuse([0, 0]), 0)
		assertEquals(hypotenuse([0, 0, 0]), 0)
		assertEquals(hypotenuse([0, 0, 0, 0, 0]), 0)
	} finally {
		Math.hypot = originalHypot
	}
})

Deno.test("hypotenuse - fallback implementation handles large values", () => {
	const originalHypot = Math.hypot
	// @ts-ignore - intentionally setting to undefined
	Math.hypot = undefined

	try {
		// Should handle large values without overflow
		const large = 1e200
		assertAlmostEquals(
			hypotenuse([large, large]),
			Math.sqrt(2) * large,
			large * 1e-10,
		)

		// 3D large values
		assertAlmostEquals(
			hypotenuse([large, large, large]),
			Math.sqrt(3) * large,
			large * 1e-10,
		)
	} finally {
		Math.hypot = originalHypot
	}
})

Deno.test("hypotenuse - fallback implementation handles small values", () => {
	const originalHypot = Math.hypot
	// @ts-ignore - intentionally setting to undefined
	Math.hypot = undefined

	try {
		// Should handle small values without underflow
		const small = 1e-200
		assertAlmostEquals(
			hypotenuse([small, small]),
			Math.sqrt(2) * small,
			small * 1e-10,
		)

		// 3D small values
		assertAlmostEquals(
			hypotenuse([small, small, small]),
			Math.sqrt(3) * small,
			small * 1e-10,
		)
	} finally {
		Math.hypot = originalHypot
	}
})

Deno.test("hypotenuse - fallback implementation handles mixed signs", () => {
	const originalHypot = Math.hypot
	// @ts-ignore - intentionally setting to undefined
	Math.hypot = undefined

	try {
		// Signs don't matter (squaring makes everything positive)
		assertEquals(hypotenuse([-3, 4]), 5)
		assertEquals(hypotenuse([3, -4]), 5)
		assertEquals(hypotenuse([-3, -4]), 5)

		// 3D with mixed signs
		assertEquals(hypotenuse([-2, 3, -6]), 7)
	} finally {
		Math.hypot = originalHypot
	}
})

Deno.test("hypotenuse - fallback implementation handles single dimension", () => {
	const originalHypot = Math.hypot
	// @ts-ignore - intentionally setting to undefined
	Math.hypot = undefined

	try {
		assertEquals(hypotenuse([5]), 5)
		assertEquals(hypotenuse([-5]), 5)
		assertEquals(hypotenuse([0]), 0)
		assertEquals(hypotenuse([3.14]), 3.14)
	} finally {
		Math.hypot = originalHypot
	}
})

Deno.test("hypotenuse - fallback implementation with various dimensions", () => {
	const originalHypot = Math.hypot
	// @ts-ignore - intentionally setting to undefined
	Math.hypot = undefined

	try {
		// 2D
		assertEquals(hypotenuse([3, 4]), 5)

		// 3D
		assertEquals(hypotenuse([2, 3, 6]), 7)
		assertEquals(hypotenuse([1, 2, 2]), 3)

		// 4D
		assertAlmostEquals(
			hypotenuse([1, 2, 2, 2]),
			Math.sqrt(1 + 4 + 4 + 4),
			1e-10,
		)

		// 5D
		assertAlmostEquals(hypotenuse([1, 1, 1, 1, 1]), Math.sqrt(5), 1e-10)

		// 10D
		const tenDimensions = Array(10).fill(2)
		assertAlmostEquals(hypotenuse(tenDimensions), 2 * Math.sqrt(10), 1e-10)
	} finally {
		Math.hypot = originalHypot
	}
})
