import { assert } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import multiply from "../../../../../src/simple/math/multiply/index.ts"

/**
 * Tests for multiply null/undefined/type safety
 */

Deno.test("multiply - null safety", () => {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.constant(null),
				fc.constant(undefined),
				fc.float(),
			),
			fc.oneof(
				fc.constant(null),
				fc.constant(undefined),
				fc.float(),
			),
			(a, b) => {
				const result = multiply(a as any)(b as any)

				// Should return NaN for any null/undefined input
				if (a == null || b == null) {
					return Number.isNaN(result)
				}

				// Otherwise should return a number
				return typeof result === "number"
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("multiply - type safety", () => {
	// Test with various invalid types
	const invalidInputs = [
		"string",
		"123",
		true,
		false,
		{},
		{ value: 5 },
		[],
		[1, 2, 3],
		() => 5,
		Symbol("test"),
		new Date(),
		/regex/,
	]

	for (const invalid of invalidInputs) {
		const result1 = multiply(invalid as any)(5)
		const result2 = multiply(5)(invalid as any)
		const result3 = multiply(invalid as any)(invalid as any)

		assert(
			Number.isNaN(result1),
			`Should return NaN for ${typeof invalid} as first arg`,
		)
		assert(
			Number.isNaN(result2),
			`Should return NaN for ${typeof invalid} as second arg`,
		)
		assert(
			Number.isNaN(result3),
			`Should return NaN for ${typeof invalid} as both args`,
		)
	}
})

Deno.test("multiply - NaN propagation", () => {
	fc.assert(
		fc.property(
			fc.float(),
			(a) => {
				// NaN propagates through multiplication
				const result1 = multiply(NaN)(a)
				const result2 = multiply(a)(NaN)
				const result3 = multiply(NaN)(NaN)

				return Number.isNaN(result1) &&
					Number.isNaN(result2) &&
					Number.isNaN(result3)
			},
		),
		{ numRuns: 100 },
	)
})

Deno.test("multiply - special number interactions", () => {
	// Infinity * number
	assert(multiply(Infinity)(5) === Infinity)
	assert(multiply(Infinity)(-5) === -Infinity)
	assert(multiply(-Infinity)(5) === -Infinity)
	assert(multiply(-Infinity)(-5) === Infinity)

	// Infinity * Infinity
	assert(multiply(Infinity)(Infinity) === Infinity)
	assert(multiply(Infinity)(-Infinity) === -Infinity)
	assert(multiply(-Infinity)(-Infinity) === Infinity)

	// Infinity * 0 = NaN (indeterminate form)
	assert(Number.isNaN(multiply(Infinity)(0)))
	assert(Number.isNaN(multiply(-Infinity)(0)))
	assert(Number.isNaN(multiply(0)(Infinity)))
	assert(Number.isNaN(multiply(0)(-Infinity)))

	// Very small * very large
	assert(multiply(Number.MIN_VALUE)(Number.MAX_VALUE) > 0)
	assert(multiply(Number.EPSILON)(Number.MAX_SAFE_INTEGER) > 0)
})

Deno.test("multiply - sign rules", () => {
	fc.assert(
		fc.property(
			fc.float({
				noNaN: true,
				noDefaultInfinity: true,
				min: Math.fround(0.001),
			}),
			fc.float({
				noNaN: true,
				noDefaultInfinity: true,
				min: Math.fround(0.001),
			}),
			(a, b) => {
				// Positive * Positive = Positive
				const pp = multiply(a)(b)
				assert(pp > 0, "Positive * Positive should be positive")

				// Positive * Negative = Negative
				const pn = multiply(a)(-b)
				assert(pn < 0, "Positive * Negative should be negative")

				// Negative * Positive = Negative
				const np = multiply(-a)(b)
				assert(np < 0, "Negative * Positive should be negative")

				// Negative * Negative = Positive
				const nn = multiply(-a)(-b)
				assert(nn > 0, "Negative * Negative should be positive")

				return true
			},
		),
		{ numRuns: 100 },
	)
})
