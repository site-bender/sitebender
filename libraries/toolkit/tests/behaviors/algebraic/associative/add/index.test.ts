import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import add from "../../../../../src/simple/math/add/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"
import finiteNumber from "../../../../helpers/generators/numeric/index.ts"

Deno.test("add - associative property: (a + b) + c = a + (b + c)", () => {
	fc.assert(
		fc.property(
			finiteNumber(),
			finiteNumber(),
			finiteNumber(),
			(a, b, c) => {
				const leftAssociative = add(add(a)(b))(c)
				const rightAssociative = add(a)(add(b)(c))

				// Handle NaN cases
				if (
					Number.isNaN(leftAssociative) &&
					Number.isNaN(rightAssociative)
				) {
					return true
				}

				// Use relative epsilon based on the magnitude of the numbers involved
				// When numbers nearly cancel out, we need to be more forgiving
				const maxInput = Math.max(Math.abs(a), Math.abs(b), Math.abs(c))
				const maxOutput = Math.max(
					Math.abs(leftAssociative),
					Math.abs(rightAssociative),
				)

				// Use the larger of input-based or output-based epsilon
				const epsilon = Math.max(
					maxInput * 1e-9, // Relative to input magnitude
					maxOutput * 1e-9, // Relative to output magnitude
					1e-9, // Absolute minimum
				)

				return approximately(leftAssociative, rightAssociative, epsilon)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("add - associative with special values", () => {
	// Test associativity with specific edge cases
	const testCases = [
		[0, 0, 0],
		[1, 2, 3],
		[-1, -2, -3],
		[0.1, 0.2, 0.3],
		[Number.MAX_SAFE_INTEGER, 0, 0],
		[1e10, 1e10, 1e10],
	]

	for (const [a, b, c] of testCases) {
		const leftAssociative = add(add(a)(b))(c)
		const rightAssociative = add(a)(add(b)(c))

		const maxValue = Math.max(
			Math.abs(leftAssociative),
			Math.abs(rightAssociative),
		)
		const epsilon = maxValue * 1e-10

		assertEquals(
			approximately(
				leftAssociative,
				rightAssociative,
				Math.max(epsilon, 1e-10),
			),
			true,
			`Failed for (${a} + ${b}) + ${c} vs ${a} + (${b} + ${c})`,
		)
	}
})

Deno.test("add - associative property preserves NaN propagation", () => {
	// NaN in any position should propagate through associative operations
	assertEquals(Number.isNaN(add(add(NaN)(5))(3)), true)
	assertEquals(Number.isNaN(add(NaN)(add(5)(3))), true)

	assertEquals(Number.isNaN(add(add(5)(NaN))(3)), true)
	assertEquals(Number.isNaN(add(5)(add(NaN)(3))), true)

	assertEquals(Number.isNaN(add(add(5)(3))(NaN)), true)
	assertEquals(Number.isNaN(add(5)(add(3)(NaN))), true)
})

Deno.test("add - multiple associative groupings", () => {
	fc.assert(
		fc.property(
			fc.array(finiteNumber(), { minLength: 4, maxLength: 10 }),
			(numbers) => {
				if (numbers.length < 4) return true

				// Test different ways of associating the same numbers
				const [a, b, c, d, ...rest] = numbers

				// ((a + b) + c) + d
				const grouping1 = rest.reduce(
					(acc, n) => add(acc)(n),
					add(add(add(a)(b))(c))(d),
				)

				// (a + b) + (c + d)
				const grouping2 = rest.reduce(
					(acc, n) => add(acc)(n),
					add(add(a)(b))(add(c)(d)),
				)

				// a + ((b + c) + d)
				const grouping3 = rest.reduce(
					(acc, n) => add(acc)(n),
					add(a)(add(add(b)(c))(d)),
				)

				// a + (b + (c + d))
				const grouping4 = rest.reduce(
					(acc, n) => add(acc)(n),
					add(a)(add(b)(add(c)(d))),
				)

				const max = Math.max(
					Math.abs(grouping1),
					Math.abs(grouping2),
					Math.abs(grouping3),
					Math.abs(grouping4),
				)
				const epsilon = max * 1e-9

				return approximately(
					grouping1,
					grouping2,
					Math.max(epsilon, 1e-9),
				) &&
					approximately(
						grouping2,
						grouping3,
						Math.max(epsilon, 1e-9),
					) &&
					approximately(grouping3, grouping4, Math.max(epsilon, 1e-9))
			},
		),
		{ numRuns: 500 },
	)
})
