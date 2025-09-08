import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import compact from "../../../../src/simple/array/compact/index.ts"

// JSDoc examples
Deno.test("compact - removes undefined values but keeps null", () => {
	assertEquals(compact([1, null, 2, undefined, 3]), [1, null, 2, 3])
})

Deno.test("compact - handles strings with null and undefined", () => {
	assertEquals(compact(["a", null, "b", undefined]), ["a", null, "b"])
})

Deno.test("compact - preserves all falsy values except undefined", () => {
	assertEquals(compact([0, false, "", null, NaN, undefined]), [
		0,
		false,
		"",
		null,
		NaN,
	])
})

// Edge cases
Deno.test("compact - handles empty array", () => {
	assertEquals(compact([]), [])
})

Deno.test("compact - handles array with only undefined", () => {
	assertEquals(compact([undefined, undefined, undefined]), [])
})

Deno.test("compact - handles array with no undefined", () => {
	assertEquals(compact([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
})

Deno.test("compact - handles array with only null", () => {
	assertEquals(compact([null, null, null]), [null, null, null])
})

Deno.test("compact - handles mixed types", () => {
	const input = [
		1,
		"hello",
		true,
		null,
		undefined,
		{ a: 1 },
		[1, 2],
		undefined,
	]
	const expected = [1, "hello", true, null, { a: 1 }, [1, 2]]
	assertEquals(compact(input), expected)
})

// Falsy values preservation
Deno.test("compact - preserves zero", () => {
	assertEquals(compact([0, undefined, 0]), [0, 0])
})

Deno.test("compact - preserves false", () => {
	assertEquals(compact([false, undefined, false]), [false, false])
})

Deno.test("compact - preserves empty string", () => {
	assertEquals(compact(["", undefined, ""]), ["", ""])
})

Deno.test("compact - preserves NaN", () => {
	const result = compact([NaN, undefined, NaN])
	assertEquals(result.length, 2)
	assertEquals(Number.isNaN(result[0]), true)
	assertEquals(Number.isNaN(result[1]), true)
})

// Complex values
Deno.test("compact - handles objects", () => {
	const obj1 = { a: 1 }
	const obj2 = { b: 2 }
	assertEquals(compact([obj1, undefined, obj2, undefined]), [obj1, obj2])
})

Deno.test("compact - handles arrays as elements", () => {
	const arr1 = [1, 2]
	const arr2 = [3, 4]
	assertEquals(compact([arr1, undefined, arr2, undefined]), [arr1, arr2])
})

Deno.test("compact - handles functions", () => {
	const fn1 = () => 1
	const fn2 = () => 2
	assertEquals(compact([fn1, undefined, fn2, undefined]), [fn1, fn2])
})

// Sparse arrays
Deno.test("compact - handles sparse arrays", () => {
	// deno-lint-ignore no-sparse-arrays
	const sparse = [1, , 2, undefined, 3, ,]
	// Sparse array holes become undefined when accessed
	assertEquals(compact(sparse), [1, 2, 3])
})

// Property-based tests
Deno.test("compact property - removes all undefined values", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.oneof(
					fc.anything(),
					fc.constant(undefined),
				),
			),
			(arr) => {
				const result = compact(arr)
				return !result.includes(undefined)
			},
		),
	)
})

Deno.test("compact property - preserves all non-undefined values", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.oneof(
					fc.integer(),
					fc.string(),
					fc.boolean(),
					fc.constant(null),
				),
			),
			(arr) => {
				const result = compact(arr)
				return result.length === arr.length &&
					arr.every((val, idx) => val === result[idx])
			},
		),
	)
})

Deno.test("compact property - result length <= original length", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.oneof(
					fc.anything(),
					fc.constant(undefined),
				),
			),
			(arr) => {
				const result = compact(arr)
				return result.length <= arr.length
			},
		),
	)
})

Deno.test("compact property - preserves element order", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.oneof(
					fc.integer(),
					fc.constant(undefined),
				),
			),
			(arr) => {
				const result = compact(arr)
				const nonUndefinedOriginal = arr.filter((x) => x !== undefined)
				return result.every((val, idx) => val === nonUndefinedOriginal[idx])
			},
		),
	)
})

Deno.test("compact property - idempotent", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.oneof(
					fc.anything(),
					fc.constant(undefined),
				),
			),
			(arr) => {
				const once = compact(arr)
				const twice = compact(once)
				return JSON.stringify(once) === JSON.stringify(twice)
			},
		),
	)
})

// Type safety
Deno.test("compact - maintains type safety", () => {
	const input: Array<number | undefined> = [1, undefined, 2, undefined, 3]
	const result: Array<number> = compact(input)
	assertEquals(result, [1, 2, 3])
})

Deno.test("compact - works with union types", () => {
	const input: Array<string | number | undefined | null> = [
		"a",
		1,
		undefined,
		null,
		"b",
		2,
		undefined,
	]
	const result: Array<string | number | null> = compact(input)
	assertEquals(result, ["a", 1, null, "b", 2])
})

// Immutability
Deno.test("compact - doesn't modify original array", () => {
	const original = [1, undefined, 2, undefined, 3]
	const result = compact(original)
	assertEquals(result, [1, 2, 3])
	assertEquals(original, [1, undefined, 2, undefined, 3])
})

// Special number values
Deno.test("compact - handles Infinity", () => {
	assertEquals(compact([Infinity, undefined, -Infinity]), [
		Infinity,
		-Infinity,
	])
})

Deno.test("compact - handles negative zero", () => {
	const result = compact([-0, undefined, 0])
	assertEquals(result.length, 2)
	assertEquals(Object.is(result[0], -0), true)
	assertEquals(Object.is(result[1], 0), true)
})
