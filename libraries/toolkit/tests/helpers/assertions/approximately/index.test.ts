import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import approximately from "./index.ts"

// ===== Basic Functionality Tests =====

Deno.test("approximately: equal numbers", () => {
	assertEquals(approximately(1, 1), true)
	assertEquals(approximately(0, 0), true)
	assertEquals(approximately(-1, -1), true)
	assertEquals(approximately(1.5, 1.5), true)
})

Deno.test("approximately: nearly equal numbers with default epsilon", () => {
	assertEquals(approximately(1, 1 + 1e-11), true)
	assertEquals(approximately(1, 1 - 1e-11), true)
	assertEquals(approximately(1, 1 + 1e-9), false)
	assertEquals(approximately(1, 1 - 1e-9), false)
})

Deno.test("approximately: custom epsilon", () => {
	assertEquals(approximately(1, 1.01, 0.1), true)
	assertEquals(approximately(1, 1.01, 0.001), false)
	assertEquals(approximately(10, 10.5, 1), true)
	assertEquals(approximately(10, 10.5, 0.1), false)
})

Deno.test("approximately: zero values", () => {
	assertEquals(approximately(0, 0), true)
	assertEquals(approximately(0, 1e-11), true)
	assertEquals(approximately(0, -1e-11), true)
	assertEquals(approximately(0, 1e-9), false)
	assertEquals(approximately(0, -1e-9), false)
})

Deno.test("approximately: negative numbers", () => {
	assertEquals(approximately(-1, -1), true)
	assertEquals(approximately(-1, -1 + 1e-11), true)
	assertEquals(approximately(-1, -1 - 1e-11), true)
	assertEquals(approximately(-10, -10.0000000001), false) // Outside default epsilon
	assertEquals(approximately(-10, -9), false)
})

// ===== Special Values Tests =====

Deno.test("approximately: NaN values", () => {
	// Both NaN should be considered equal
	assertEquals(approximately(NaN, NaN), true)
	assertEquals(approximately(NaN, 1), false)
	assertEquals(approximately(1, NaN), false)
	assertEquals(approximately(NaN, Infinity), false)
})

Deno.test("approximately: Infinity values", () => {
	assertEquals(approximately(Infinity, Infinity), true)
	assertEquals(approximately(-Infinity, -Infinity), true)
	assertEquals(approximately(Infinity, -Infinity), false)
	assertEquals(approximately(Infinity, 1e100), false)
	assertEquals(approximately(-Infinity, -1e100), false)
	assertEquals(approximately(Infinity, NaN), false)
})

Deno.test("approximately: null and undefined", () => {
	// Both null
	assertEquals(approximately(null, null), true)
	
	// Both undefined
	assertEquals(approximately(undefined, undefined), true)
	
	// Mixed null/undefined
	assertEquals(approximately(null, undefined), false)
	assertEquals(approximately(undefined, null), false)
	
	// null/undefined with numbers
	assertEquals(approximately(null, 0), false)
	assertEquals(approximately(0, null), false)
	assertEquals(approximately(undefined, 0), false)
	assertEquals(approximately(0, undefined), false)
})

// ===== Edge Cases Tests =====

Deno.test("approximately: very small numbers", () => {
	const tiny = 1e-15
	assertEquals(approximately(tiny, 0), true) // Within default epsilon
	assertEquals(approximately(tiny, 2 * tiny), true) // Still within epsilon
	assertEquals(approximately(tiny, 1e-8), false) // Outside epsilon
})

Deno.test("approximately: very large numbers", () => {
	// Test with numbers where default epsilon (1e-10) is meaningful
	const large = 1000
	assertEquals(approximately(large, large), true)
	assertEquals(approximately(large, large + 1), false) // 1 is outside default epsilon
	assertEquals(approximately(large, large + 1e-11), true) // Within default epsilon
	assertEquals(approximately(large, large + 1e-9), false) // Outside default epsilon
	assertEquals(approximately(large, large * 2), false)
	
	// For truly huge numbers, use custom epsilon
	const huge = 1e15
	const bigEpsilon = 1000
	assertEquals(approximately(huge, huge + 100, bigEpsilon), true)
	assertEquals(approximately(huge, huge + 10000, bigEpsilon), false)
})

Deno.test("approximately: mixed sign", () => {
	assertEquals(approximately(1, -1), false)
	assertEquals(approximately(-0, 0), true) // -0 and 0 are approximately equal
	assertEquals(approximately(1e-11, -1e-11), true) // Both within epsilon of 0
	assertEquals(approximately(1, -1e-11), false)
})

// ===== Property-Based Tests =====

Deno.test("approximately property: reflexive", () => {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.float(),
				fc.constant(NaN),
				fc.constant(Infinity),
				fc.constant(-Infinity),
			),
			(a) => {
				// Every number is approximately equal to itself
				return approximately(a, a) === true
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("approximately property: symmetric", () => {
	fc.assert(
		fc.property(
			fc.float(),
			fc.float(),
			fc.float({ min: Math.fround(1e-15), max: 1 }),
			(a, b, epsilon) => {
				// If a ≈ b then b ≈ a
				return approximately(a, b, epsilon) === approximately(b, a, epsilon)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("approximately property: epsilon boundary", () => {
	// Test with specific values to avoid floating point issues
	// Values exactly epsilon apart should NOT be equal (uses < not <=)
	assertEquals(approximately(1, 1 + 1e-10, 1e-10), false)
	assertEquals(approximately(1, 1 - 1e-10, 1e-10), false)
	assertEquals(approximately(0, 1e-10, 1e-10), false)
	assertEquals(approximately(0, -1e-10, 1e-10), false)
	
	// Values just under epsilon apart SHOULD be equal
	assertEquals(approximately(1, 1 + 9e-11, 1e-10), true)
	assertEquals(approximately(1, 1 - 9e-11, 1e-10), true)
	assertEquals(approximately(0, 9e-11, 1e-10), true)
	assertEquals(approximately(0, -9e-11, 1e-10), true)
})

Deno.test("approximately property: within epsilon is approximately equal", () => {
	// Test that values strictly within epsilon are considered equal
	const testCases = [
		{ a: 0, b: 5e-11, epsilon: 1e-10 }, // half epsilon
		{ a: 1, b: 1 + 5e-11, epsilon: 1e-10 },
		{ a: -1, b: -1 - 5e-11, epsilon: 1e-10 },
		{ a: 100, b: 100.00005, epsilon: 0.001 },
		{ a: -100, b: -100.00005, epsilon: 0.001 },
	]
	
	for (const { a, b, epsilon } of testCases) {
		assertEquals(
			approximately(a, b, epsilon),
			true,
			`Failed for a=${a}, b=${b}, epsilon=${epsilon}`
		)
	}
})

// ===== Type Coercion Tests =====

Deno.test("approximately: type coercion", () => {
	// @ts-ignore - Testing runtime behavior with non-number types
	assertEquals(approximately("1", "1"), true) // Both strings coerce to NaN, and NaN === NaN in this function
	
	// @ts-ignore - Testing runtime behavior
	assertEquals(approximately(true, 1), false) // true !== 1 after coercion
	
	// @ts-ignore - Testing runtime behavior
	assertEquals(approximately(false, 0), false) // false !== 0 after coercion
	
	// @ts-ignore - Testing runtime behavior
	assertEquals(approximately({}, {}), false) // Objects don't pass null check and return false
	
	// @ts-ignore - Testing runtime behavior
	assertEquals(approximately([], []), false) // Arrays don't pass null check and return false
})

// ===== Documentation Examples =====

Deno.test("approximately: documentation examples", () => {
	// Basic usage
	assertEquals(approximately(1.0, 1.0 + 1e-11), true) // Within default epsilon
	assertEquals(approximately(1.0, 1.1), false)
	
	// Custom epsilon
	assertEquals(approximately(100, 100.5, 1), true) // 0.5 < 1
	assertEquals(approximately(100, 100.5, 0.1), false)
	
	// Special cases
	assertEquals(approximately(NaN, NaN), true)
	assertEquals(approximately(Infinity, Infinity), true)
	assertEquals(approximately(null, null), true)
	assertEquals(approximately(null, undefined), false)
})