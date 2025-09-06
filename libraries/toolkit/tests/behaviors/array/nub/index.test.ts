import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import nub from "../../../../src/simple/array/nub/index.ts"
import unique from "../../../../src/simple/array/unique/index.ts"

// Test JSDoc examples
Deno.test("nub: JSDoc examples", async (t) => {
	await t.step("basic duplicate removal", () => {
		assertEquals(nub([1, 2, 3, 2, 1, 4]), [1, 2, 3, 4])
	})

	await t.step("string deduplication", () => {
		assertEquals(
			nub(["apple", "banana", "apple", "cherry", "banana"]),
			["apple", "banana", "cherry"],
		)
	})

	await t.step("mixed types", () => {
		assertEquals(nub([1, "1", 2, "2", 1, "1"]), [1, "1", 2, "2"])
	})

	await t.step("boolean values", () => {
		assertEquals(nub([true, false, true, false, true]), [true, false])
	})

	await t.step("objects with reference equality", () => {
		const obj1 = { id: 1 }
		const obj2 = { id: 2 }
		const obj3 = { id: 1 } // Different object, same content
		assertEquals(nub([obj1, obj2, obj1, obj3]), [obj1, obj2, obj3])
	})

	await t.step("arrays with reference equality", () => {
		const arr1 = [1, 2]
		const arr2 = [3, 4]
		const arr3 = [1, 2] // Different reference
		assertEquals(nub([arr1, arr2, arr1, arr3]), [arr1, arr2, arr3])
	})

	await t.step("NaN handling", () => {
		const result = nub([NaN, 1, NaN, 2, NaN])
		assertEquals(result.length, 3)
		assertEquals(Number.isNaN(result[0]), true)
		assertEquals(result[1], 1)
		assertEquals(result[2], 2)
	})

	await t.step("null and undefined", () => {
		assertEquals(nub([null, undefined, null, undefined, 0]), [
			null,
			undefined,
			0,
		])
	})

	await t.step("zero and negative zero", () => {
		assertEquals(nub([0, -0, 0, -0]), [0])
	})

	await t.step("symbols", () => {
		const sym1 = Symbol("a")
		const sym2 = Symbol("b")
		const sym3 = Symbol("a") // Different symbol, same description
		assertEquals(nub([sym1, sym2, sym1, sym3]), [sym1, sym2, sym3])
	})

	await t.step("empty array", () => {
		assertEquals(nub([]), [])
	})

	await t.step("single element", () => {
		assertEquals(nub([42]), [42])
	})

	await t.step("all unique elements", () => {
		assertEquals(nub([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
	})

	await t.step("all duplicate elements", () => {
		assertEquals(nub([7, 7, 7, 7, 7]), [7])
	})

	await t.step("remove duplicate words", () => {
		const text = "the quick brown fox jumps over the lazy dog the"
		assertEquals(
			nub(text.split(" ")),
			["the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog"],
		)
	})

	await t.step("deduplicate IDs", () => {
		const ids = [101, 102, 103, 101, 104, 102, 105]
		assertEquals(nub(ids), [101, 102, 103, 104, 105])
	})

	await t.step("clean up tags", () => {
		const tags = [
			"javascript",
			"typescript",
			"javascript",
			"react",
			"typescript",
		]
		assertEquals(nub(tags), ["javascript", "typescript", "react"])
	})

	await t.step("process log levels", () => {
		const logs = ["INFO", "ERROR", "INFO", "WARN", "ERROR", "DEBUG"]
		assertEquals(nub(logs), ["INFO", "ERROR", "WARN", "DEBUG"])
	})

	await t.step("unique characters in string", () => {
		assertEquals(nub("mississippi".split("")), ["m", "i", "s", "p"])
	})

	await t.step("dates compared by reference", () => {
		const date1 = new Date("2024-01-01")
		const date2 = new Date("2024-01-02")
		const date3 = new Date("2024-01-01") // Same date, different object
		assertEquals(nub([date1, date2, date1, date3]), [date1, date2, date3])
	})

	await t.step("chain with other operations", () => {
		const numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
		assertEquals(nub(numbers).filter((n) => n % 2 === 0), [2, 4])
	})

	await t.step("handle null input", () => {
		assertEquals(nub(null), [])
	})

	await t.step("handle undefined input", () => {
		assertEquals(nub(undefined), [])
	})

	await t.step("large arrays", () => {
		const large = Array(10000).fill(0).map((_, i) => i % 100)
		assertEquals(nub(large).length, 100)
	})

	await t.step("preserve first occurrence order", () => {
		assertEquals(nub([3, 1, 2, 1, 3, 2, 4]), [3, 1, 2, 4])
	})

	await t.step("infinity values", () => {
		assertEquals(nub([Infinity, -Infinity, Infinity, 0, -Infinity]), [
			Infinity,
			-Infinity,
			0,
		])
	})

	await t.step("function deduplication by reference", () => {
		const fn1 = () => 1
		const fn2 = () => 2
		const fn3 = () => 1 // Different function
		assertEquals(nub([fn1, fn2, fn1, fn3]), [fn1, fn2, fn3])
	})

	await t.step("remove duplicate error messages", () => {
		const errors = [
			"Connection failed",
			"Timeout error",
			"Connection failed",
			"Invalid input",
			"Timeout error",
		]
		assertEquals(nub(errors), [
			"Connection failed",
			"Timeout error",
			"Invalid input",
		])
	})

	await t.step("unique values from form inputs", () => {
		const formValues = [
			"option1",
			"option2",
			"option1",
			"option3",
			"option2",
		]
		assertEquals(nub(formValues), ["option1", "option2", "option3"])
	})
})

// Property-based tests
Deno.test("nub: idempotent property", () => {
	fc.assert(
		fc.property(fc.array(fc.anything()), (arr) => {
			const deduped = nub(arr)
			const doubleDeduped = nub(deduped)
			return JSON.stringify(deduped) === JSON.stringify(doubleDeduped)
		}),
		{ numRuns: 1000 },
	)
})

Deno.test("nub: no duplicates in result", () => {
	fc.assert(
		fc.property(fc.array(fc.integer()), (arr) => {
			const deduped = nub(arr)
			const uniqueSet = new Set(deduped)
			return deduped.length === uniqueSet.size
		}),
		{ numRuns: 1000 },
	)
})

Deno.test("nub: result is subset of original", () => {
	fc.assert(
		fc.property(fc.array(fc.integer()), (arr) => {
			const deduped = nub(arr)
			const originalSet = new Set(arr)
			return deduped.every((item) => originalSet.has(item))
		}),
		{ numRuns: 1000 },
	)
})

Deno.test("nub: preserves first occurrence order", () => {
	fc.assert(
		fc.property(fc.array(fc.integer()), (arr) => {
			const deduped = nub(arr)
			// For each element in deduped, its index should be the first occurrence in original
			return deduped.every((val, i) => {
				const firstIndex = arr.indexOf(val)
				// Check that all elements before this in deduped appeared before in original
				return deduped.slice(0, i).every((prevVal) => {
					return arr.indexOf(prevVal) < firstIndex
				})
			})
		}),
		{ numRuns: 1000 },
	)
})

Deno.test("nub: length never increases", () => {
	fc.assert(
		fc.property(fc.array(fc.anything()), (arr) => {
			const deduped = nub(arr)
			return deduped.length <= arr.length
		}),
		{ numRuns: 1000 },
	)
})

// Edge cases
Deno.test("nub: edge cases", async (t) => {
	await t.step("handles sparse arrays", () => {
		// deno-lint-ignore no-sparse-arrays
		const sparse = [1, , , 2, , 1, 2]
		const result = nub(sparse)
		assertEquals(result, [1, undefined, 2])
	})

	await t.step("handles array-like objects", () => {
		// @ts-ignore - Testing invalid input
		assertEquals(nub({ 0: 1, 1: 2, 2: 1, length: 3 }), [])
	})

	await t.step("handles strings", () => {
		// @ts-ignore - Testing invalid input
		assertEquals(nub("hello"), [])
	})

	await t.step("handles numbers", () => {
		// @ts-ignore - Testing invalid input
		assertEquals(nub(123), [])
	})

	await t.step("handles very large arrays efficiently", () => {
		const large = Array.from({ length: 100000 }, (_, i) => i % 1000)
		const result = nub(large)
		assertEquals(result.length, 1000)
	})

	await t.step("handles arrays with only undefined", () => {
		assertEquals(nub([undefined, undefined, undefined]), [undefined])
	})

	await t.step("handles arrays with only null", () => {
		assertEquals(nub([null, null, null]), [null])
	})

	await t.step("handles arrays with only NaN", () => {
		const result = nub([NaN, NaN, NaN])
		assertEquals(result.length, 1)
		assertEquals(Number.isNaN(result[0]), true)
	})

	await t.step("handles mixed primitives and objects", () => {
		const obj = { a: 1 }
		const arr = [1, 2]
		const result = nub([1, "1", true, obj, arr, 1, "1", true, obj, arr])
		assertEquals(result, [1, "1", true, obj, arr])
	})

	await t.step("handles RegExp objects", () => {
		const regex1 = /test/
		const regex2 = /test/ // Different object
		const regex3 = /other/
		assertEquals(nub([regex1, regex2, regex1, regex3]), [
			regex1,
			regex2,
			regex3,
		])
	})

	await t.step("handles Error objects", () => {
		const err1 = new Error("test")
		const err2 = new Error("test") // Different object
		const err3 = new Error("other")
		assertEquals(nub([err1, err2, err1, err3]), [err1, err2, err3])
	})
})

// Test that unique is an alias for nub
Deno.test("unique: is an alias for nub", async (t) => {
	await t.step("produces same results as nub", () => {
		const testCases: Array<Array<unknown>> = [
			[1, 2, 2, 3, 1, 4],
			["a", "b", "a", "c"],
			[],
			[NaN, NaN, 0, -0],
			[null, undefined, null, undefined],
		]

		for (const testCase of testCases) {
			assertEquals(unique(testCase), nub(testCase))
		}
	})

	await t.step("handles null and undefined same as nub", () => {
		assertEquals(unique(null), nub(null))
		assertEquals(unique(undefined), nub(undefined))
	})

	await t.step("functions are the same reference", () => {
		assertEquals(unique, nub)
	})
})

// Immutability test
Deno.test("nub: immutability", () => {
	const original = [1, 2, 2, 3, 1]
	const deduped = nub(original)

	assertEquals(deduped, [1, 2, 3])
	assertEquals(original, [1, 2, 2, 3, 1]) // Original unchanged

	// Modifying deduped should not affect original
	deduped[0] = 999
	assertEquals(original, [1, 2, 2, 3, 1])
})

// Type preservation test
Deno.test("nub: type preservation", () => {
	// Number array
	const nums: Array<number> = [1, 2, 2, 3]
	const dedupedNums: Array<number> = nub(nums)
	assertEquals(dedupedNums, [1, 2, 3])

	// String array
	const strs: Array<string> = ["a", "b", "a"]
	const dedupedStrs: Array<string> = nub(strs)
	assertEquals(dedupedStrs, ["a", "b"])

	// Mixed type array
	const mixed: Array<number | string> = [1, "two", 1, "two"]
	const dedupedMixed: Array<number | string> = nub(mixed)
	assertEquals(dedupedMixed, [1, "two"])

	// Readonly array
	const readonly: ReadonlyArray<number> = [1, 2, 2, 3]
	const dedupedReadonly: Array<number> = nub(readonly)
	assertEquals(dedupedReadonly, [1, 2, 3])
})
