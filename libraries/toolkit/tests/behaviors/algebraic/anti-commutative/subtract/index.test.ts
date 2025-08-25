import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import add from "../../../../../src/simple/math/add/index.ts"
import subtract from "../../../../../src/simple/math/subtract/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

/**
 * Tests for subtract anti-commutative property:
 * subtract(a)(b) === -subtract(b)(a)
 */

Deno.test("subtract - anti-commutative property", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, noDefaultInfinity: true }),
			fc.float({ noNaN: true, noDefaultInfinity: true }),
			(a, b) => {
				const result1 = subtract(a)(b)
				const result2 = subtract(b)(a)

				// Anti-commutative: a - b = -(b - a)
				return approximately(result1, -result2)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("subtract - JSDoc examples", async (t) => {
	// Basic subtraction
	await t.step("basic subtraction", () => {
		assertEquals(subtract(5)(3), 2)
		assertEquals(subtract(10)(7), 3)
		assertEquals(subtract(100)(25), 75)
	})

	// Negative results
	await t.step("negative results", () => {
		assertEquals(subtract(3)(5), -2)
		assertEquals(subtract(10)(20), -10)
		assertEquals(subtract(0)(5), -5)
	})

	// Negative numbers
	await t.step("negative numbers", () => {
		assertEquals(subtract(-5)(3), -8)
		assertEquals(subtract(-10)(-5), -5)
		assertEquals(subtract(5)(-3), 8)
	})

	// Decimal numbers
	await t.step("decimal numbers", () => {
		assertEquals(subtract(3.5)(1.2), 2.3)
		assertEquals(subtract(10.75)(0.25), 10.5)
		// Handle floating point precision
		assert(approximately(subtract(1)(0.1), 0.9))
	})

	// Zero operations
	await t.step("zero operations", () => {
		assertEquals(subtract(5)(0), 5)
		assertEquals(subtract(0)(0), 0)
		assertEquals(subtract(0)(10), -10)
	})

	// Same number (zero difference)
	await t.step("same number", () => {
		assertEquals(subtract(7)(7), 0)
		assertEquals(subtract(-3)(-3), 0)
	})

	// Large numbers
	await t.step("large numbers", () => {
		assertEquals(subtract(1000000)(500000), 500000)
		assertEquals(subtract(Number.MAX_SAFE_INTEGER)(1), 9007199254740990)
	})

	// Special values
	await t.step("special values", () => {
		assertEquals(subtract(Infinity)(100), Infinity)
		assertEquals(subtract(100)(Infinity), -Infinity)
		assert(Number.isNaN(subtract(Infinity)(Infinity)))
		assert(Number.isNaN(subtract(5)(NaN)))
		assert(Number.isNaN(subtract(NaN)(5)))
	})

	// Invalid inputs
	await t.step("invalid inputs", () => {
		assert(Number.isNaN(subtract(null as any)(5)))
		assert(Number.isNaN(subtract(5)(undefined as any)))
		assert(Number.isNaN(subtract("5" as any)(3)))
		assert(Number.isNaN(subtract(5)("3" as any)))
		assert(Number.isNaN(subtract({} as any)(5)))
	})

	// Partial application examples
	await t.step("partial application", () => {
		// Note: subtract(1)(5) means 1 - 5 = -4, not 5 - 1
		// To decrement, we need subtract(n)(1)
		const decrementFrom = subtract(1)
		assertEquals(decrementFrom(5), -4) // 1 - 5 = -4
		assertEquals(decrementFrom(10), -9) // 1 - 10 = -9

		const decrement = (n: number) => subtract(n)(1)
		assertEquals(decrement(5), 4) // 5 - 1 = 4
		assertEquals(decrement(10), 9) // 10 - 1 = 9

		const subtract10 = (n: number) => subtract(n)(10)
		assertEquals(subtract10(25), 15)
		assertEquals(subtract10(5), -5)

		const fromHundred = subtract(100)
		assertEquals(fromHundred(25), 75)
		assertEquals(fromHundred(150), -50)
	})

	// Array operations
	await t.step("array operations", () => {
		const numbers = [10, 20, 30, 40, 50]
		// subtract(5)(n) means 5 - n, not n - 5
		assertEquals(numbers.map((n) => subtract(n)(5)), [5, 15, 25, 35, 45])

		const values = [100, 200, 300]
		assertEquals(values.map((n) => subtract(n)(50)), [50, 150, 250])
	})

	// Practical examples (subset)
	await t.step("practical examples", () => {
		// Calculate change
		const oldValue = 100
		const newValue = 75
		const change = subtract(newValue)(oldValue)
		assertEquals(change, -25)

		// Temperature difference
		const highTemp = 30
		const lowTemp = 18
		const tempRange = subtract(highTemp)(lowTemp)
		assertEquals(tempRange, 12)

		// Price calculation
		const originalPrice = 99.99
		const discount = 20
		const salePrice = subtract(originalPrice)(discount)
		assertEquals(salePrice, 79.99)
	})

	// Array reduction
	await t.step("array reduction", () => {
		const expenses = [100, 20, 30, 15]
		const totalExpense = expenses.reduce(
			(acc, expense) => subtract(acc)(expense),
			500,
		)
		assertEquals(totalExpense, 335) // 500 - 100 - 20 - 30 - 15
	})

	// Difference between elements
	await t.step("difference between elements", () => {
		const sequence = [10, 15, 22, 30, 45]
		const differences = sequence.slice(1).map((val, i) =>
			subtract(val)(sequence[i])
		)
		assertEquals(differences, [5, 7, 8, 15])
	})
})

Deno.test("subtract - identity element", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true }),
			(a) => {
				// Subtracting 0 is identity: a - 0 = a
				const result = subtract(a)(0)
				return Object.is(result, a) || approximately(result, a)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("subtract - inverse relationship with add", () => {
	// Use imported add function

	fc.assert(
		fc.property(
			fc.float({ noNaN: true, noDefaultInfinity: true, min: -1e6, max: 1e6 }),
			fc.float({ noNaN: true, noDefaultInfinity: true, min: -1e6, max: 1e6 }),
			(a, b) => {
				// (a - b) + b = a
				const difference = subtract(a)(b)
				const restored = add(difference)(b)
				// Use relative tolerance for floating point comparison
				const tolerance = Math.max(Math.abs(a) * 1e-10, 1e-10)
				return approximately(restored, a, tolerance)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("subtract - NOT associative", () => {
	// Subtraction is NOT associative: (a - b) - c ≠ a - (b - c)
	const a = 10
	const b = 5
	const c = 3

	const left = subtract(subtract(a)(b))(c) // (10 - 5) - 3 = 2
	const right = subtract(a)(subtract(b)(c)) // 10 - (5 - 3) = 8

	assertEquals(left, 2)
	assertEquals(right, 8)
	assert(left !== right, "Subtraction should not be associative")
})

Deno.test("subtract - null safety", () => {
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
				const result = subtract(a as any)(b as any)

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

Deno.test("subtract - type safety", () => {
	// Test with various invalid types
	const invalidInputs = [
		"string",
		true,
		false,
		{},
		[],
		() => {},
		Symbol("test"),
	]

	for (const invalid of invalidInputs) {
		const result1 = subtract(invalid as any)(5)
		const result2 = subtract(5)(invalid as any)

		assert(Number.isNaN(result1), `Should return NaN for ${typeof invalid}`)
		assert(Number.isNaN(result2), `Should return NaN for ${typeof invalid}`)
	}
})

Deno.test("subtract - special number handling", () => {
	// Infinity handling
	assertEquals(subtract(Infinity)(Infinity), NaN)
	assertEquals(subtract(Infinity)(5), Infinity)
	assertEquals(subtract(5)(Infinity), -Infinity)
	assertEquals(subtract(-Infinity)(5), -Infinity)
	assertEquals(subtract(5)(-Infinity), Infinity)

	// NaN propagation
	assert(Number.isNaN(subtract(NaN)(5)))
	assert(Number.isNaN(subtract(5)(NaN)))
	assert(Number.isNaN(subtract(NaN)(NaN)))

	// Negative zero
	assertEquals(subtract(0)(0), 0)
	assertEquals(subtract(-0)(0), -0)
	assertEquals(subtract(0)(-0), 0)
})
