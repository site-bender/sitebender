import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import dropLast from "../../../../src/simple/array/dropLast/index.ts"

// Test JSDoc examples
Deno.test("dropLast: JSDoc examples", async (t) => {
	await t.step("drops last 2 elements from [1, 2, 3, 4, 5]", () => {
		assertEquals(dropLast(2)([1, 2, 3, 4, 5]), [1, 2, 3])
	})

	await t.step("drops 0 elements returns same array", () => {
		assertEquals(dropLast(0)([1, 2, 3]), [1, 2, 3])
	})

	await t.step("drops more than length returns empty array", () => {
		assertEquals(dropLast(10)([1, 2, 3]), [])
	})

	await t.step("negative n treated as 0", () => {
		assertEquals(dropLast(-1)([1, 2, 3]), [1, 2, 3])
	})

	await t.step("useful for removing trailing items", () => {
		const removeFooter = dropLast(1)
		assertEquals(removeFooter(["data1", "data2", "footer"]), ["data1", "data2"])
	})
})

// Property-based tests
Deno.test("dropLast: length property", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.integer({ min: 0, max: 100 }),
			(arr, n) => {
				const result = dropLast(n)(arr)
				const expectedLength = Math.max(0, arr.length - n)
				return result.length === expectedLength
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("dropLast: element preservation", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer({ min: 0, max: 100 }),
			(arr, n) => {
				const result = dropLast(n)(arr)
				// Each element in result should match the corresponding element in original
				return result.every((val, i) => val === arr[i])
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("dropLast: composition with takeLast", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			(arr) => {
				const n = Math.floor(arr.length / 2)
				const dropped = dropLast(n)(arr)
				// Dropped elements should be the head before the last n
				const expected = arr.slice(0, arr.length - n)
				return JSON.stringify(dropped) === JSON.stringify(expected)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("dropLast: dropping all elements", () => {
	fc.assert(
		fc.property(fc.array(fc.anything()), (arr) => {
			const result = dropLast(arr.length)(arr)
			return result.length === 0
		}),
		{ numRuns: 1000 }
	)
})

Deno.test("dropLast: complement of drop", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer({ min: 0, max: 50 }),
			(arr, n) => {
				if (n > arr.length) return true // Both would be empty
				const fromStart = arr.slice(0, n)  // Take first n
				const fromEnd = dropLast(arr.length - n)(arr)  // Drop all but first n
				return JSON.stringify(fromStart) === JSON.stringify(fromEnd)
			}
		),
		{ numRuns: 1000 }
	)
})

// Edge cases
Deno.test("dropLast: edge cases", async (t) => {
	await t.step("handles empty array", () => {
		assertEquals(dropLast(5)([]), [])
		assertEquals(dropLast(0)([]), [])
		assertEquals(dropLast(-1)([]), [])
	})

	await t.step("handles single element array", () => {
		assertEquals(dropLast(0)([42]), [42])
		assertEquals(dropLast(1)([42]), [])
		assertEquals(dropLast(2)([42]), [])
	})

	await t.step("handles dropping 1 element", () => {
		assertEquals(dropLast(1)([1, 2, 3, 4]), [1, 2, 3])
	})

	await t.step("handles negative numbers", () => {
		assertEquals(dropLast(-5)([1, 2, 3]), [1, 2, 3])
		assertEquals(dropLast(-100)([1, 2, 3]), [1, 2, 3])
		assertEquals(dropLast(-0)([1, 2, 3]), [1, 2, 3])
	})

	await t.step("handles NaN as n", () => {
		// NaN causes Math.max(0, array.length - NaN) to be Math.max(0, NaN) which is NaN
		// slice(0, NaN) returns empty array
		assertEquals(dropLast(NaN)([1, 2, 3]), [])
	})

	await t.step("handles Infinity as n", () => {
		assertEquals(dropLast(Infinity)([1, 2, 3]), [])
		assertEquals(dropLast(-Infinity)([1, 2, 3]), [1, 2, 3])
	})

	await t.step("handles decimal numbers", () => {
		// Decimals are handled in the calculation
		assertEquals(dropLast(2.7)([1, 2, 3, 4, 5]), [1, 2])
		assertEquals(dropLast(2.1)([1, 2, 3, 4, 5]), [1, 2])
	})

	await t.step("handles arrays with undefined", () => {
		assertEquals(dropLast(2)([1, undefined, 3, undefined, 5]), [1, undefined, 3])
	})

	await t.step("handles arrays with null", () => {
		assertEquals(dropLast(2)([1, null, 3, null, 5]), [1, null, 3])
	})

	await t.step("handles arrays with NaN", () => {
		const result = dropLast(1)([1, NaN, 3])
		assertEquals(result.length, 2)
		assertEquals(result[0], 1)
		assertEquals(Number.isNaN(result[1]), true)
	})

	await t.step("handles arrays with mixed types", () => {
		assertEquals(dropLast(2)([1, "two", true, null, undefined]), [1, "two", true])
	})

	await t.step("handles sparse arrays", () => {
		// deno-lint-ignore no-sparse-arrays
		const sparse = [1, , 3, , 5]
		const result = dropLast(2)(sparse)
		assertEquals(result.length, 3)
		assertEquals(result[0], 1)
		assertEquals(1 in result, false)  // hole preserved
		assertEquals(result[2], 3)
	})

	await t.step("handles large arrays", () => {
		const large = Array.from({ length: 10000 }, (_, i) => i)
		const result = dropLast(5)(large)
		assertEquals(result.length, 9995)
		assertEquals(result[result.length - 1], 9994)
	})

	await t.step("handles array with objects", () => {
		const obj1 = { a: 1 }
		const obj2 = { b: 2 }
		const obj3 = { c: 3 }
		const result = dropLast(1)([obj1, obj2, obj3])
		assertEquals(result, [obj1, obj2])
		assertEquals(result[0], obj1)  // Same reference
		assertEquals(result[1], obj2)  // Same reference
	})

	await t.step("handles two element array", () => {
		assertEquals(dropLast(1)([1, 2]), [1])
		assertEquals(dropLast(2)([1, 2]), [])
	})
})

// Currying tests
Deno.test("dropLast: currying", async (t) => {
	await t.step("supports partial application", () => {
		const dropLast2 = dropLast(2)
		assertEquals(dropLast2([1, 2, 3, 4]), [1, 2])
		assertEquals(dropLast2(["a", "b", "c", "d"]), ["a", "b"])
	})

	await t.step("can be reused with different arrays", () => {
		const dropLast3 = dropLast(3)
		assertEquals(dropLast3([1, 2, 3, 4, 5]), [1, 2])
		assertEquals(dropLast3(["a", "b", "c", "d", "e"]), ["a", "b"])
		assertEquals(dropLast3([true, false, null, undefined, 0]), [true, false])
	})

	await t.step("different dropLast functions are independent", () => {
		const dropLast1 = dropLast(1)
		const dropLast5 = dropLast(5)
		const arr = [1, 2, 3, 4, 5, 6, 7]
		assertEquals(dropLast1(arr), [1, 2, 3, 4, 5, 6])
		assertEquals(dropLast5(arr), [1, 2])
	})
})

// Immutability test
Deno.test("dropLast: immutability", () => {
	const original = [1, 2, 3, 4, 5]
	const result = dropLast(2)(original)
	
	assertEquals(result, [1, 2, 3])
	assertEquals(original, [1, 2, 3, 4, 5])  // Original unchanged
	
	// Modifying result should not affect original
	result[0] = 999
	assertEquals(original, [1, 2, 3, 4, 5])
	
	// For n <= 0, returns same array reference
	const same = dropLast(0)(original)
	assertEquals(same, original)
	assertEquals(same === original, true)  // Same reference when n <= 0
	
	const sameNeg = dropLast(-1)(original)
	assertEquals(sameNeg === original, true)  // Same reference for negative n
})

// Type preservation test
Deno.test("dropLast: type preservation", () => {
	// Number array
	const nums: Array<number> = [1, 2, 3, 4, 5]
	const droppedNums = dropLast(2)(nums)
	assertEquals(droppedNums, [1, 2, 3])

	// String array
	const strs: Array<string> = ["a", "b", "c", "d"]
	const droppedStrs = dropLast(1)(strs)
	assertEquals(droppedStrs, ["a", "b", "c"])

	// Mixed type array
	const mixed: Array<number | string> = [1, "two", 3, "four"]
	const droppedMixed = dropLast(2)(mixed)
	assertEquals(droppedMixed, [1, "two"])
})

// Practical use cases
Deno.test("dropLast: practical use cases", async (t) => {
	await t.step("removing file extension", () => {
		const parts = "document.backup.txt".split(".")
		const withoutExtension = dropLast(1)(parts).join(".")
		assertEquals(withoutExtension, "document.backup")
	})

	await t.step("removing trailing summary rows", () => {
		const report = [
			"Data row 1",
			"Data row 2",
			"Data row 3",
			"---",
			"Total: 3 rows"
		]
		const dataOnly = dropLast(2)(report)
		assertEquals(dataOnly, ["Data row 1", "Data row 2", "Data row 3"])
	})

	await t.step("trimming buffer overflow", () => {
		const buffer = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		const maxSize = 8
		const trimmed = dropLast(buffer.length - maxSize)(buffer)
		assertEquals(trimmed.length, 8)
		assertEquals(trimmed, [1, 2, 3, 4, 5, 6, 7, 8])
	})

	await t.step("removing checksum from data", () => {
		const dataWithChecksum = ["A", "B", "C", "D", "CRC32"]
		const dataOnly = dropLast(1)(dataWithChecksum)
		assertEquals(dataOnly, ["A", "B", "C", "D"])
	})
})