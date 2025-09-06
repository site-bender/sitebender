import { assert } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import add from "../../../../../src/simple/math/add/index.ts"
import multiply from "../../../../../src/simple/math/multiply/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

/**
 * Tests for distributive property:
 * a * (b + c) = (a * b) + (a * c)
 */

Deno.test("multiply - distributive over addition", () => {
	fc.assert(
		fc.property(
			fc.float({
				noNaN: true,
				noDefaultInfinity: true,
				min: -100,
				max: 100,
			}),
			fc.float({
				noNaN: true,
				noDefaultInfinity: true,
				min: -100,
				max: 100,
			}),
			fc.float({
				noNaN: true,
				noDefaultInfinity: true,
				min: -100,
				max: 100,
			}),
			(a, b, c) => {
				// Left side: a * (b + c)
				const sum = add(b)(c)
				const left = multiply(a)(sum)

				// Right side: (a * b) + (a * c)
				const product1 = multiply(a)(b)
				const product2 = multiply(a)(c)
				const right = add(product1)(product2)

				// Handle special cases
				if (Number.isNaN(left) && Number.isNaN(right)) {
					return true
				}

				// Distributive: a * (b + c) = (a * b) + (a * c)
				// Use relative tolerance for floating point comparison
				const tolerance = Math.abs(left) * 1e-10 + 1e-10
				return approximately(left, right, tolerance)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("multiply - right distributive over addition", () => {
	fc.assert(
		fc.property(
			fc.float({
				noNaN: true,
				noDefaultInfinity: true,
				min: -100,
				max: 100,
			}),
			fc.float({
				noNaN: true,
				noDefaultInfinity: true,
				min: -100,
				max: 100,
			}),
			fc.float({
				noNaN: true,
				noDefaultInfinity: true,
				min: -100,
				max: 100,
			}),
			(a, b, c) => {
				// Left side: (a + b) * c
				const sum = add(a)(b)
				const left = multiply(sum)(c)

				// Right side: (a * c) + (b * c)
				const product1 = multiply(a)(c)
				const product2 = multiply(b)(c)
				const right = add(product1)(product2)

				// Handle special cases
				if (Number.isNaN(left) && Number.isNaN(right)) {
					return true
				}

				// Right distributive: (a + b) * c = (a * c) + (b * c)
				const tolerance = Math.abs(left) * 1e-10 + 1e-10
				return approximately(left, right, tolerance)
			},
		),
		{ numRuns: 1000 },
	)
})
