import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import add from "../../../../../src/simple/math/add/index.ts"

Deno.test("add - returns NaN for null inputs", () => {
	assertEquals(Number.isNaN(add(null)(5)), true)
	assertEquals(Number.isNaN(add(5)(null)), true)
	assertEquals(Number.isNaN(add(null)(null)), true)
})

Deno.test("add - returns NaN for undefined inputs", () => {
	assertEquals(Number.isNaN(add(undefined)(5)), true)
	assertEquals(Number.isNaN(add(5)(undefined)), true)
	assertEquals(Number.isNaN(add(undefined)(undefined)), true)
})

Deno.test("add - returns NaN for non-number inputs", () => {
	const invalidInputs = [
		"5",
		"abc",
		{},
		[],
		[1, 2],
		() => 5,
		true,
		false,
		Symbol("test"),
	]

	for (const invalid of invalidInputs) {
		assertEquals(
			Number.isNaN(add(invalid as any)(5)),
			true,
			`Failed for ${String(invalid)}`,
		)
		assertEquals(
			Number.isNaN(add(5)(invalid as any)),
			true,
			`Failed for ${String(invalid)}`,
		)
	}
})

Deno.test("add - NaN propagation", () => {
	assertEquals(Number.isNaN(add(NaN)(5)), true)
	assertEquals(Number.isNaN(add(5)(NaN)), true)
	assertEquals(Number.isNaN(add(NaN)(NaN)), true)

	// NaN with special values
	assertEquals(Number.isNaN(add(NaN)(Infinity)), true)
	assertEquals(Number.isNaN(add(NaN)(-Infinity)), true)
	assertEquals(Number.isNaN(add(NaN)(0)), true)
})

Deno.test("add - handles mixed null/undefined/valid gracefully", () => {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.constant(null),
				fc.constant(undefined),
				fc.float({ noNaN: true }),
			),
			fc.oneof(
				fc.constant(null),
				fc.constant(undefined),
				fc.float({ noNaN: true }),
			),
			(a, b) => {
				const result = add(a)(b)

				// If either input is null/undefined, result must be NaN
				if (a == null || b == null) {
					return Number.isNaN(result)
				}

				// Otherwise result should be a number
				return typeof result === "number" && !Number.isNaN(result)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("add - consistent error handling in chains", () => {
	// Once NaN is introduced, it propagates through the chain
	const chain1 = add(add(5)(null))(10)
	assertEquals(Number.isNaN(chain1), true)

	const chain2 = add(5)(add(null)(10))
	assertEquals(Number.isNaN(chain2), true)

	const chain3 = add(add(5)(10))(null)
	assertEquals(Number.isNaN(chain3), true)
})

Deno.test("add - type safety with currying", () => {
	// Even with partial application, type checking should work
	const addNull = add(null)
	assertEquals(Number.isNaN(addNull(5)), true)
	assertEquals(Number.isNaN(addNull(0)), true)
	assertEquals(Number.isNaN(addNull(Infinity)), true)

	const addToUndefined = add(undefined)
	assertEquals(Number.isNaN(addToUndefined(5)), true)
	assertEquals(Number.isNaN(addToUndefined(0)), true)
})
