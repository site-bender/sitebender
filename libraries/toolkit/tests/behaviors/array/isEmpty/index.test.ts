import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import isEmpty from "../../../../src/simple/array/isEmpty/index.ts"

// JSDoc examples
Deno.test("isEmpty - returns true for empty array", () => {
	assertEquals(isEmpty([]), true)
})

Deno.test("isEmpty - returns false for non-empty array", () => {
	assertEquals(isEmpty([1, 2, 3]), false)
})

Deno.test("isEmpty - returns false for array with undefined", () => {
	assertEquals(isEmpty([undefined]), false)
})

Deno.test("isEmpty - returns false for array with null", () => {
	assertEquals(isEmpty([null]), false)
})

// Non-array handling
Deno.test("isEmpty - returns false for null", () => {
	// deno-lint-ignore no-explicit-any
	assertEquals(isEmpty(null as any), false)
})

Deno.test("isEmpty - returns false for undefined", () => {
	// deno-lint-ignore no-explicit-any
	assertEquals(isEmpty(undefined as any), false)
})

Deno.test("isEmpty - returns false for empty string", () => {
	// deno-lint-ignore no-explicit-any
	assertEquals(isEmpty("" as any), false)
})

Deno.test("isEmpty - returns false for empty object", () => {
	// deno-lint-ignore no-explicit-any
	assertEquals(isEmpty({} as any), false)
})

// Use cases from JSDoc
Deno.test("isEmpty - filters out empty arrays", () => {
	const arrays = [[], [1], [], [2, 3]]
	const nonEmpty = arrays.filter((arr) => !isEmpty(arr))
	assertEquals(nonEmpty, [[1], [2, 3]])
})

// Edge cases
Deno.test("isEmpty - handles arrays with various falsy values", () => {
	assertEquals(isEmpty([0]), false)
	assertEquals(isEmpty([false]), false)
	assertEquals(isEmpty([""]), false)
	assertEquals(isEmpty([NaN]), false)
})

Deno.test("isEmpty - handles arrays with single element", () => {
	assertEquals(isEmpty([1]), false)
	assertEquals(isEmpty([{}]), false)
	assertEquals(isEmpty([[]]), false)
})

Deno.test("isEmpty - handles arrays with multiple elements", () => {
	assertEquals(isEmpty([1, 2]), false)
	assertEquals(isEmpty([1, 2, 3, 4, 5]), false)
})

// Sparse arrays
Deno.test("isEmpty - handles sparse arrays", () => {
	// deno-lint-ignore no-sparse-arrays
	const sparse = [, , ,]
	assertEquals(isEmpty(sparse), false) // Has length 3
})

// Property-based tests
Deno.test("isEmpty property - empty array always returns true", () => {
	fc.assert(
		fc.property(
			fc.constant([]),
			(arr) => {
				return isEmpty(arr) === true
			},
		),
	)
})

Deno.test("isEmpty property - non-empty arrays always return false", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { minLength: 1 }),
			(arr) => {
				return isEmpty(arr) === false
			},
		),
	)
})

Deno.test("isEmpty property - consistent with length check", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(arr) => {
				return isEmpty(arr) === (arr.length === 0)
			},
		),
	)
})

Deno.test("isEmpty property - non-arrays always return false", () => {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer(),
				fc.string(),
				fc.boolean(),
				fc.object(),
				fc.constant(null),
				fc.constant(undefined),
			),
			(value) => {
				// deno-lint-ignore no-explicit-any
				return isEmpty(value as any) === false
			},
		),
	)
})

// Type safety
Deno.test("isEmpty - maintains type safety", () => {
	const result: boolean = isEmpty([1, 2, 3])
	assertEquals(typeof result, "boolean")
})

// Immutability
Deno.test("isEmpty - doesn't modify input array", () => {
	const original: number[] = []
	const result = isEmpty(original)
	assertEquals(result, true)
	assertEquals(original, [])
	assertEquals(original.length, 0)
})
