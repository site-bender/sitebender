import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import reverse from "../../../../src/simple/array/reverse/index.ts"

// Test JSDoc examples
Deno.test("reverse: JSDoc examples", async (t) => {
	await t.step("reverses [1, 2, 3] to [3, 2, 1]", () => {
		assertEquals(reverse([1, 2, 3]), [3, 2, 1])
	})

	await t.step('reverses ["a", "b", "c"] to ["c", "b", "a"]', () => {
		assertEquals(reverse(["a", "b", "c"]), ["c", "b", "a"])
	})

	await t.step("returns empty array for empty array", () => {
		assertEquals(reverse([]), [])
	})

	await t.step("returns single element array unchanged", () => {
		assertEquals(reverse([42]), [42])
	})

	await t.step("preserves original array", () => {
		const original = [1, 2, 3, 4]
		const reversed = reverse(original)
		assertEquals(reversed, [4, 3, 2, 1])
		assertEquals(original, [1, 2, 3, 4]) // original unchanged
	})
})

// Property-based tests
Deno.test("reverse: involutory property (reverse twice returns original)", () => {
	fc.assert(
		fc.property(fc.array(fc.anything()), (arr) => {
			const reversed = reverse(arr)
			const doubleReversed = reverse(reversed)
			// Use JSON.stringify for deep comparison of arrays with objects
			return JSON.stringify(doubleReversed) === JSON.stringify(arr)
		}),
		{ numRuns: 1000 },
	)
})

Deno.test("reverse: length preservation", () => {
	fc.assert(
		fc.property(fc.array(fc.anything()), (arr) => {
			const reversed = reverse(arr)
			return reversed.length === arr.length
		}),
		{ numRuns: 1000 },
	)
})

Deno.test("reverse: first becomes last, last becomes first", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			(arr) => {
				const reversed = reverse(arr)
				return reversed[0] === arr[arr.length - 1] &&
					reversed[reversed.length - 1] === arr[0]
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("reverse: element correspondence", () => {
	fc.assert(
		fc.property(fc.array(fc.integer()), (arr) => {
			const reversed = reverse(arr)
			return arr.every((_, i) => reversed[i] === arr[arr.length - 1 - i])
		}),
		{ numRuns: 1000 },
	)
})

// Edge cases
Deno.test("reverse: edge cases", async (t) => {
	await t.step("handles array with undefined values", () => {
		assertEquals(reverse([1, undefined, 3]), [3, undefined, 1])
	})

	await t.step("handles array with null values", () => {
		assertEquals(reverse([1, null, 3]), [3, null, 1])
	})

	await t.step("handles array with NaN values", () => {
		const result = reverse([1, NaN, 3])
		assertEquals(result[0], 3)
		assertEquals(Number.isNaN(result[1]), true)
		assertEquals(result[2], 1)
	})

	await t.step("handles array with mixed types", () => {
		assertEquals(
			reverse([1, "two", true, null, undefined]),
			[undefined, null, true, "two", 1],
		)
	})

	await t.step("handles array with objects", () => {
		const obj1 = { a: 1 }
		const obj2 = { b: 2 }
		const result = reverse([obj1, obj2])
		assertEquals(result[0], obj2)
		assertEquals(result[1], obj1)
	})

	await t.step("handles sparse arrays", () => {
		// deno-lint-ignore no-sparse-arrays
		const sparse = [1, , , 4]
		const reversed = reverse(sparse)
		assertEquals(reversed.length, 4)
		assertEquals(reversed[0], 4)
		// Note: toReversed() converts holes to undefined values
		assertEquals(reversed[1], undefined)
		assertEquals(reversed[2], undefined)
		assertEquals(reversed[3], 1)
	})

	await t.step("handles array with duplicate values", () => {
		assertEquals(reverse([1, 2, 2, 3]), [3, 2, 2, 1])
	})

	await t.step("handles two element array", () => {
		assertEquals(reverse([1, 2]), [2, 1])
	})

	await t.step("handles large arrays", () => {
		const large = Array.from({ length: 1000 }, (_, i) => i)
		const reversed = reverse(large)
		assertEquals(reversed[0], 999)
		assertEquals(reversed[999], 0)
		assertEquals(reversed.length, 1000)
	})
})

// Null safety tests
Deno.test("reverse: null safety", async (t) => {
	await t.step("handles null input", () => {
		assertEquals(reverse(null), [])
	})

	await t.step("handles undefined input", () => {
		assertEquals(reverse(undefined), [])
	})

	await t.step("handles non-array input (number)", () => {
		// @ts-ignore - Testing runtime behavior
		assertEquals(reverse(42), [])
	})

	await t.step("handles non-array input (string)", () => {
		// @ts-ignore - Testing runtime behavior
		assertEquals(reverse("hello"), [])
	})

	await t.step("handles non-array input (object)", () => {
		// @ts-ignore - Testing runtime behavior
		assertEquals(reverse({ foo: "bar" }), [])
	})

	await t.step("handles non-array input (boolean)", () => {
		// @ts-ignore - Testing runtime behavior
		assertEquals(reverse(true), [])
	})
})

// Immutability test
Deno.test("reverse: immutability", () => {
	const original = [1, 2, 3, 4, 5]
	const reversed = reverse(original)

	// Modifying reversed should not affect original
	reversed[0] = 999
	assertEquals(original, [1, 2, 3, 4, 5])

	// Modifying original should not affect reversed
	original[0] = 888
	assertEquals(reversed[0], 999) // Still has our modification
	assertEquals(reversed.slice(1), [4, 3, 2, 1])
})

// Type preservation test
Deno.test("reverse: type preservation", () => {
	// Number array
	const nums: Array<number> = [1, 2, 3]
	const reversedNums: Array<number> = reverse(nums)
	assertEquals(reversedNums, [3, 2, 1])

	// String array
	const strs: Array<string> = ["a", "b", "c"]
	const reversedStrs: Array<string> = reverse(strs)
	assertEquals(reversedStrs, ["c", "b", "a"])

	// Mixed type array
	const mixed: Array<number | string> = [1, "two", 3]
	const reversedMixed: Array<number | string> = reverse(mixed)
	assertEquals(reversedMixed, [3, "two", 1])
})
