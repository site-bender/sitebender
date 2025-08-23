import { assert, assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import multiply from "../../../../../src/simple/math/multiply/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

/**
 * Tests for multiply associative property:
 * multiply(multiply(a)(b))(c) === multiply(a)(multiply(b)(c))
 */

Deno.test("multiply - associative property", () => {
	fc.assert(
		fc.property(
			fc.float({ noNaN: true, noDefaultInfinity: true, min: -1000, max: 1000 }),
			fc.float({ noNaN: true, noDefaultInfinity: true, min: -1000, max: 1000 }),
			fc.float({ noNaN: true, noDefaultInfinity: true, min: -1000, max: 1000 }),
			(a, b, c) => {
				const left = multiply(multiply(a)(b))(c)  // (a * b) * c
				const right = multiply(a)(multiply(b)(c)) // a * (b * c)
				
				// Handle special cases
				if (Number.isNaN(left) && Number.isNaN(right)) {
					return true
				}
				
				// Associative: (a * b) * c = a * (b * c)
				return Object.is(left, right) || approximately(left, right, 1e-9)
			}
		),
		{ numRuns: 1000 }
	)
})