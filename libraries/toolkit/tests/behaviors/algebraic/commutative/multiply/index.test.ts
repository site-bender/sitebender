import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import multiply from "../../../../../src/simple/math/multiply/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

/**
 * Tests for multiply commutative property:
 * multiply(a)(b) === multiply(b)(a)
 */

Deno.test("multiply - commutative property", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true }),
			fc.float({ noNaN: true }),
			(a, b) => {
				const result1 = multiply(a)(b)
				const result2 = multiply(b)(a)

				// Handle special cases
				if (Number.isNaN(result1) && Number.isNaN(result2)) {
					return true
				}

				// Commutative: a * b = b * a
				return Object.is(result1, result2) || approximately(result1, result2)
			},
		),
		{ numRuns: 1000 },
	)
})
