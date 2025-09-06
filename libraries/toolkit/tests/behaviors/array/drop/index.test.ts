import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import drop from "../../../../src/simple/array/drop/index.ts"

// Test JSDoc examples
Deno.test("drop: JSDoc examples", async (t) => {
	await t.step("drops first 2 elements from [1, 2, 3, 4, 5]", () => {
		assertEquals(drop(2)([1, 2, 3, 4, 5]), [3, 4, 5])
	})

	await t.step("drops 0 elements returns same array", () => {
		assertEquals(drop(0)([1, 2, 3]), [1, 2, 3])
	})

	await t.step("drops more than length returns empty array", () => {
		assertEquals(drop(10)([1, 2, 3]), [])
	})

	await t.step("negative n treated as 0", () => {
		assertEquals(drop(-1)([1, 2, 3]), [1, 2, 3])
	})

	await t.step("useful for skipping headers", () => {
		const skipHeader = drop(1)
		assertEquals(skipHeader(["header", "data1", "data2"]), [
			"data1",
			"data2",
		])
	})
})

// Property-based tests
Deno.test("drop: length property", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.integer({ min: 0, max: 100 }),
			(arr, n) => {
				const result = drop(n)(arr)
				const expectedLength = Math.max(0, arr.length - n)
				return result.length === expectedLength
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("drop: element preservation", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer({ min: 0, max: 100 }),
			(arr, n) => {
				const result = drop(n)(arr)
				// Each element in result should match the corresponding element in original
				return result.every((val, i) => val === arr[i + n])
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("drop: composition with take", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			(arr) => {
				const n = Math.floor(arr.length / 2)
				const dropped = drop(n)(arr)
				// Dropped elements should be the tail after skipping n
				const expected = arr.slice(n)
				return JSON.stringify(dropped) === JSON.stringify(expected)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("drop: dropping all elements", () => {
	fc.assert(
		fc.property(fc.array(fc.anything()), (arr) => {
			const result = drop(arr.length)(arr)
			return result.length === 0
		}),
		{ numRuns: 1000 },
	)
})

// Edge cases
Deno.test("drop: edge cases", async (t) => {
	await t.step("handles empty array", () => {
		assertEquals(drop(5)([]), [])
		assertEquals(drop(0)([]), [])
		assertEquals(drop(-1)([]), [])
	})

	await t.step("handles single element array", () => {
		assertEquals(drop(0)([42]), [42])
		assertEquals(drop(1)([42]), [])
		assertEquals(drop(2)([42]), [])
	})

	await t.step("handles dropping 1 element", () => {
		assertEquals(drop(1)([1, 2, 3, 4]), [2, 3, 4])
	})

	await t.step("handles negative numbers", () => {
		assertEquals(drop(-5)([1, 2, 3]), [1, 2, 3])
		assertEquals(drop(-100)([1, 2, 3]), [1, 2, 3])
		assertEquals(drop(-0)([1, 2, 3]), [1, 2, 3])
	})

	await t.step("handles NaN as n", () => {
		// NaN in numeric context behaves like 0
		assertEquals(drop(NaN)([1, 2, 3]), [1, 2, 3])
	})

	await t.step("handles Infinity as n", () => {
		assertEquals(drop(Infinity)([1, 2, 3]), [])
		assertEquals(drop(-Infinity)([1, 2, 3]), [1, 2, 3])
	})

	await t.step("handles decimal numbers", () => {
		// Decimals are handled by slice, which floors them
		assertEquals(drop(2.7)([1, 2, 3, 4, 5]), [3, 4, 5])
		assertEquals(drop(2.1)([1, 2, 3, 4, 5]), [3, 4, 5])
	})

	await t.step("handles arrays with undefined", () => {
		assertEquals(drop(2)([1, undefined, 3, undefined, 5]), [
			3,
			undefined,
			5,
		])
	})

	await t.step("handles arrays with null", () => {
		assertEquals(drop(2)([1, null, 3, null, 5]), [3, null, 5])
	})

	await t.step("handles arrays with NaN", () => {
		const result = drop(1)([1, NaN, 3])
		assertEquals(result.length, 2)
		assertEquals(Number.isNaN(result[0]), true)
		assertEquals(result[1], 3)
	})

	await t.step("handles arrays with mixed types", () => {
		assertEquals(drop(2)([1, "two", true, null, undefined]), [
			true,
			null,
			undefined,
		])
	})

	await t.step("handles sparse arrays", () => {
		// deno-lint-ignore no-sparse-arrays
		const sparse = [1, , 3, , 5]
		const result = drop(2)(sparse)
		assertEquals(result.length, 3)
		assertEquals(result[0], 3)
		assertEquals(1 in result, false) // hole preserved
		assertEquals(result[2], 5)
	})

	await t.step("handles large arrays", () => {
		const large = Array.from({ length: 10000 }, (_, i) => i)
		const result = drop(9995)(large)
		assertEquals(result, [9995, 9996, 9997, 9998, 9999])
	})

	await t.step("handles array with objects", () => {
		const obj1 = { a: 1 }
		const obj2 = { b: 2 }
		const obj3 = { c: 3 }
		const result = drop(1)([obj1, obj2, obj3])
		assertEquals(result, [obj2, obj3])
		assertEquals(result[0], obj2) // Same reference
	})
})

// Currying tests
Deno.test("drop: currying", async (t) => {
	await t.step("supports partial application", () => {
		const drop2 = drop(2)
		assertEquals(drop2([1, 2, 3, 4]), [3, 4])
		assertEquals(drop2(["a", "b", "c", "d"]), ["c", "d"])
	})

	await t.step("can be reused with different arrays", () => {
		const drop3 = drop(3)
		assertEquals(drop3([1, 2, 3, 4, 5]), [4, 5])
		assertEquals(drop3(["a", "b", "c", "d", "e"]), ["d", "e"])
		assertEquals(drop3([true, false, null, undefined, 0]), [undefined, 0])
	})

	await t.step("different drop functions are independent", () => {
		const drop1 = drop(1)
		const drop5 = drop(5)
		const arr = [1, 2, 3, 4, 5, 6, 7]
		assertEquals(drop1(arr), [2, 3, 4, 5, 6, 7])
		assertEquals(drop5(arr), [6, 7])
	})
})

// Immutability test
Deno.test("drop: immutability", () => {
	const original = [1, 2, 3, 4, 5]
	const result = drop(2)(original)

	assertEquals(result, [3, 4, 5])
	assertEquals(original, [1, 2, 3, 4, 5]) // Original unchanged

	// Modifying result should not affect original
	result[0] = 999
	assertEquals(original, [1, 2, 3, 4, 5])

	// For n <= 0, returns same array reference
	const same = drop(0)(original)
	assertEquals(same, original)
	assertEquals(same === original, true) // Same reference when n <= 0

	const sameNeg = drop(-1)(original)
	assertEquals(sameNeg === original, true) // Same reference for negative n
})

// Type preservation test
Deno.test("drop: type preservation", () => {
	// Number array
	const nums: Array<number> = [1, 2, 3, 4, 5]
	const droppedNums = drop(2)(nums)
	assertEquals(droppedNums, [3, 4, 5])

	// String array
	const strs: Array<string> = ["a", "b", "c", "d"]
	const droppedStrs = drop(1)(strs)
	assertEquals(droppedStrs, ["b", "c", "d"])

	// Mixed type array
	const mixed: Array<number | string> = [1, "two", 3, "four"]
	const droppedMixed = drop(2)(mixed)
	assertEquals(droppedMixed, [3, "four"])
})

// Practical use cases
Deno.test("drop: practical use cases", async (t) => {
	await t.step("skipping CSV headers", () => {
		const csvData = [
			"Name,Age,City",
			"Alice,30,NYC",
			"Bob,25,LA",
		]
		const skipHeader = drop(1)
		assertEquals(skipHeader(csvData), ["Alice,30,NYC", "Bob,25,LA"])
	})

	await t.step("pagination - skip items", () => {
		const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`)
		const page2 = drop(10)(items.slice(0, 20)) // Skip first 10 of first 20
		assertEquals(page2.length, 10)
		assertEquals(page2[0], "Item 11")
	})

	await t.step("removing command from args", () => {
		const args = ["node", "script.js", "--flag", "value"]
		const skipNodeAndScript = drop(2)
		assertEquals(skipNodeAndScript(args), ["--flag", "value"])
	})
})
