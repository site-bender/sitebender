import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import head from "../../../../src/simple/array/head/index.ts"
import first from "../../../../src/simple/array/first/index.ts"

// Test JSDoc examples
Deno.test("head: JSDoc examples", async (t) => {
	await t.step("returns 1 for [1, 2, 3]", () => {
		assertEquals(head([1, 2, 3]), 1)
	})

	await t.step('returns "a" for ["a", "b"]', () => {
		assertEquals(head(["a", "b"]), "a")
	})

	await t.step("returns undefined for empty array", () => {
		assertEquals(head([]), undefined)
	})
})

// Property-based tests
Deno.test("head: idempotent property", () => {
	fc.assert(
		fc.property(fc.array(fc.anything(), { minLength: 1 }), (arr) => {
			const firstElement = head(arr)
			const singleElementArray = [firstElement]
			return head(singleElementArray) === firstElement
		}),
		{ numRuns: 1000 }
	)
})

Deno.test("head: consistency with array indexing", () => {
	fc.assert(
		fc.property(fc.array(fc.anything()), (arr) => {
			const headResult = head(arr)
			const indexResult = arr[0]
			// Both should be undefined for empty arrays, or the same value
			return headResult === indexResult
		}),
		{ numRuns: 1000 }
	)
})

Deno.test("head: consistency with at(0)", () => {
	fc.assert(
		fc.property(fc.array(fc.anything()), (arr) => {
			return Object.is(head(arr), arr.at(0))
		}),
		{ numRuns: 1000 }
	)
})

Deno.test("head: type preservation", () => {
	fc.assert(
		fc.property(fc.array(fc.integer(), { minLength: 1 }), (arr) => {
			const result = head(arr)
			return typeof result === "number"
		}),
		{ numRuns: 1000 }
	)
})

// Edge cases
Deno.test("head: edge cases", async (t) => {
	await t.step("handles single element array", () => {
		assertEquals(head([42]), 42)
	})

	await t.step("handles two element array", () => {
		assertEquals(head([1, 2]), 1)
	})

	await t.step("handles array with undefined as first element", () => {
		assertEquals(head([undefined, 1, 2]), undefined)
	})

	await t.step("handles array with null as first element", () => {
		assertEquals(head([null, 1, 2]), null)
	})

	await t.step("handles array with NaN as first element", () => {
		const result = head([NaN, 1, 2])
		assertEquals(Number.isNaN(result), true)
	})

	await t.step("handles array with false as first element", () => {
		assertEquals(head([false, true]), false)
	})

	await t.step("handles array with 0 as first element", () => {
		assertEquals(head([0, 1, 2]), 0)
	})

	await t.step("handles array with empty string as first element", () => {
		assertEquals(head(["", "a", "b"]), "")
	})

	await t.step("handles array with mixed types", () => {
		assertEquals(head([1, "two", true, null]), 1)
		assertEquals(head(["one", 2, false, undefined]), "one")
		assertEquals(head([true, 1, "test"]), true)
	})

	await t.step("handles array with objects", () => {
		const obj = { a: 1 }
		const arr = [obj, { b: 2 }]
		assertEquals(head(arr), obj)
		assertEquals(head(arr) === obj, true)  // Same reference
	})

	await t.step("handles array with arrays", () => {
		const innerArr = [1, 2]
		const arr = [innerArr, [3, 4]]
		assertEquals(head(arr), innerArr)
		assertEquals(head(arr) === innerArr, true)  // Same reference
	})

	await t.step("handles sparse arrays", () => {
		// deno-lint-ignore no-sparse-arrays
		const sparse = [, 2, 3]
		assertEquals(head(sparse), undefined)
	})

	await t.step("handles sparse arrays with value at first position", () => {
		// deno-lint-ignore no-sparse-arrays
		const sparse = [1, , 3]
		assertEquals(head(sparse), 1)
	})

	await t.step("handles very large arrays", () => {
		const large = Array.from({ length: 1000000 }, (_, i) => i)
		assertEquals(head(large), 0)
	})

	await t.step("handles array with Symbol", () => {
		const sym = Symbol("test")
		assertEquals(head([sym, "other"]), sym)
	})

	await t.step("handles array with functions", () => {
		const fn = () => "test"
		const arr = [fn, () => "other"]
		assertEquals(head(arr), fn)
		assertEquals(head(arr) === fn, true)  // Same reference
	})

	await t.step("handles array with Date objects", () => {
		const date = new Date("2024-01-01")
		const arr = [date, new Date("2024-01-02")]
		assertEquals(head(arr), date)
		assertEquals(head(arr) === date, true)  // Same reference
	})

	await t.step("handles array with RegExp", () => {
		const regex = /test/
		assertEquals(head([regex, /other/]), regex)
	})

	await t.step("handles array with Map", () => {
		const map = new Map([["key", "value"]])
		const arr = [map, new Map()]
		assertEquals(head(arr), map)
	})

	await t.step("handles array with Set", () => {
		const set = new Set([1, 2, 3])
		const arr = [set, new Set()]
		assertEquals(head(arr), set)
	})

	await t.step("handles negative zero", () => {
		assertEquals(Object.is(head([-0, 1]), -0), true)
	})

	await t.step("handles Infinity", () => {
		assertEquals(head([Infinity, 1]), Infinity)
		assertEquals(head([-Infinity, 1]), -Infinity)
	})
})

// Test that first is an alias for head
Deno.test("first: is an alias for head", async (t) => {
	await t.step("produces same results as head", () => {
		const testCases: Array<Array<unknown>> = [
			[1, 2, 3],
			["a", "b", "c"],
			[],
			[undefined],
			[null, 1],
			[NaN, 2],
			[{ a: 1 }, { b: 2 }]
		]
		
		for (const testCase of testCases) {
			const headResult = head(testCase)
			const firstResult = first(testCase)
			if (Number.isNaN(headResult)) {
				assertEquals(Number.isNaN(firstResult), true)
			} else {
				assertEquals(firstResult, headResult)
			}
		}
	})

	await t.step("functions are the same reference", () => {
		assertEquals(first, head)
	})
})

// Immutability test
Deno.test("head: immutability", () => {
	const original = [1, 2, 3, 4, 5]
	const firstElement = head(original)
	
	assertEquals(firstElement, 1)
	assertEquals(original, [1, 2, 3, 4, 5])  // Original unchanged
	
	// Getting head doesn't create a copy
	const obj = { value: 1 }
	const arr = [obj, { value: 2 }]
	const firstObj = head(arr)
	assertEquals(firstObj === obj, true)  // Same reference returned
})

// Type preservation test
Deno.test("head: type preservation", () => {
	// Number array
	const nums: Array<number> = [1, 2, 3]
	const firstNum: number | undefined = head(nums)
	assertEquals(firstNum, 1)

	// String array
	const strs: Array<string> = ["a", "b", "c"]
	const firstStr: string | undefined = head(strs)
	assertEquals(firstStr, "a")

	// Empty array
	const empty: Array<number> = []
	const firstEmpty: number | undefined = head(empty)
	assertEquals(firstEmpty, undefined)

	// Mixed type array
	const mixed: Array<number | string> = [1, "two", 3]
	const firstMixed: number | string | undefined = head(mixed)
	assertEquals(firstMixed, 1)
})

// Practical use cases
Deno.test("head: practical use cases", async (t) => {
	await t.step("getting first line of text", () => {
		const lines = ["First line", "Second line", "Third line"]
		assertEquals(head(lines), "First line")
	})

	await t.step("accessing first error", () => {
		const errors = [
			new Error("First error"),
			new Error("Second error")
		]
		const firstError = head(errors)
		assertEquals(firstError?.message, "First error")
	})

	await t.step("getting first command line argument", () => {
		const args = ["--flag", "value", "--other"]
		assertEquals(head(args), "--flag")
	})

	await t.step("safe access with optional chaining", () => {
		const maybeArray: Array<number> | undefined = undefined
		const result = maybeArray ? head(maybeArray) : undefined
		assertEquals(result, undefined)
	})

	await t.step("checking if array starts with specific value", () => {
		const startsWithOne = (arr: Array<number>) => head(arr) === 1
		assertEquals(startsWithOne([1, 2, 3]), true)
		assertEquals(startsWithOne([2, 3, 4]), false)
		assertEquals(startsWithOne([]), false)
	})

	await t.step("default value pattern", () => {
		const getFirstOrDefault = <T>(arr: Array<T>, defaultValue: T): T => 
			head(arr) ?? defaultValue
		
		assertEquals(getFirstOrDefault([1, 2, 3], 0), 1)
		assertEquals(getFirstOrDefault([], 0), 0)
		assertEquals(getFirstOrDefault([undefined, 2], 0), 0)
	})
})