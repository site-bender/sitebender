import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import init from "../../../../src/simple/array/init/index.ts"

// ===== Basic Functionality Tests =====

Deno.test("init - basic usage", () => {
	assertEquals(init([1, 2, 3, 4]), [1, 2, 3])
	assertEquals(init(["a", "b", "c"]), ["a", "b"])
	assertEquals(init([true, false, true]), [true, false])
})

Deno.test("init - edge cases", () => {
	// Empty array
	assertEquals(init([]), [])
	
	// Single element
	assertEquals(init([42]), [])
	assertEquals(init(["single"]), [])
	
	// Two elements
	assertEquals(init([1, 2]), [1])
	assertEquals(init(["first", "second"]), ["first"])
})

Deno.test("init - JSDoc examples - basic", () => {
	// Basic usage
	assertEquals(init([1, 2, 3, 4]), [1, 2, 3])
	
	// String array
	assertEquals(init(["a", "b", "c"]), ["a", "b"])
	
	// Single element returns empty
	assertEquals(init([42]), [])
	
	// Empty array returns empty
	assertEquals(init([]), [])
	
	// Two elements
	assertEquals(init([1, 2]), [1])
})

Deno.test("init - JSDoc examples - sentinel removal", () => {
	// Remove trailing sentinel
	const data = [10, 20, 30, -1] // -1 is sentinel
	assertEquals(init(data), [10, 20, 30])
})

Deno.test("init - JSDoc examples - process all but last", () => {
	// Process all but last line
	const lines = ["header", "data1", "data2", "footer"]
	assertEquals(init(lines), ["header", "data1", "data2"])
})

Deno.test("init - JSDoc examples - path traversal", () => {
	// Path traversal
	const path = ["root", "users", "john", "documents", "file.txt"]
	const directory = init(path) // Get directory path
	assertEquals(directory, ["root", "users", "john", "documents"])
	const filename = path[path.length - 1]
	assertEquals(filename, "file.txt")
})

Deno.test("init - JSDoc examples - token processing", () => {
	// Remove trailing punctuation token
	const tokens = ["Hello", "world", "!"]
	assertEquals(init(tokens), ["Hello", "world"])
})

Deno.test("init - JSDoc examples - breadcrumb navigation", () => {
	// Breadcrumb navigation
	const breadcrumbs = ["Home", "Products", "Electronics", "Phones"]
	const parentPath = init(breadcrumbs)
	assertEquals(parentPath, ["Home", "Products", "Electronics"])
})

Deno.test("init - JSDoc examples - undo last action", () => {
	// Undo last action
	const actions = ["create", "edit", "save", "delete"]
	const withoutLastAction = init(actions)
	assertEquals(withoutLastAction, ["create", "edit", "save"])
})

Deno.test("init - JSDoc examples - mixed types", () => {
	// Mixed types
	assertEquals(init([1, "two", { three: 3 }, [4]]), [1, "two", { three: 3 }])
})

Deno.test("init - JSDoc examples - null and undefined", () => {
	// Handle null/undefined gracefully
	assertEquals(init(null), [])
	assertEquals(init(undefined), [])
})

Deno.test("init - JSDoc examples - build pairs", () => {
	// Build pairs for comparison
	const values = [10, 20, 30, 40]
	const withPrevious = init(values).map((v, i) => [v, values[i + 1]])
	assertEquals(withPrevious, [[10, 20], [20, 30], [30, 40]])
})

Deno.test("init - JSDoc examples - remove terminator", () => {
	// Remove terminator
	const protocol = ["START", "DATA", "DATA", "END"]
	assertEquals(init(protocol), ["START", "DATA", "DATA"])
})

Deno.test("init - type preservation", () => {
	// Numbers
	const numbers = [1, 2, 3, 4, 5]
	const numbersInit: Array<number> = init(numbers)
	assertEquals(numbersInit, [1, 2, 3, 4])
	
	// Strings
	const strings = ["a", "b", "c"]
	const stringsInit: Array<string> = init(strings)
	assertEquals(stringsInit, ["a", "b"])
	
	// Objects
	const objects = [{ id: 1 }, { id: 2 }, { id: 3 }]
	const objectsInit = init(objects)
	assertEquals(objectsInit, [{ id: 1 }, { id: 2 }])
})

Deno.test("init - immutability", () => {
	const original = [1, 2, 3, 4]
	const result = init(original)
	
	// Original unchanged
	assertEquals(original, [1, 2, 3, 4])
	assertEquals(result, [1, 2, 3])
	
	// Result is new array
	assertEquals(original === result, false)
	
	// Modifying result doesn't affect original
	result[0] = 999
	assertEquals(original[0], 1)
})

Deno.test("init - special values", () => {
	// With undefined
	assertEquals(init([undefined, 1, 2]), [undefined, 1])
	assertEquals(init([1, 2, undefined]), [1, 2])
	
	// With null
	assertEquals(init([null, 1, 2]), [null, 1])
	assertEquals(init([1, 2, null]), [1, 2])
	
	// With NaN
	const resultNaN = init([NaN, 1, 2])
	assertEquals(resultNaN.length, 2)
	assertEquals(Number.isNaN(resultNaN[0]), true)
	assertEquals(resultNaN[1], 1)
	
	const withNaN = init([1, NaN, 2])
	assertEquals(withNaN.length, 2)
	assertEquals(withNaN[0], 1)
	assertEquals(Number.isNaN(withNaN[1]), true)
	
	// With Infinity
	assertEquals(init([Infinity, -Infinity, 0]), [Infinity, -Infinity])
	assertEquals(init([0, Infinity, -Infinity]), [0, Infinity])
})

Deno.test("init - sparse arrays", () => {
	// deno-lint-ignore no-sparse-arrays
	const sparse = [1, , 3, 4]
	const result = init(sparse)
	assertEquals(result.length, 3)
	assertEquals(result[0], 1)
	assertEquals(result[1], undefined)
	assertEquals(result[2], 3)
	
	// deno-lint-ignore no-sparse-arrays
	const verySpare = [, , , ]
	const sparseResult = init(verySpare)
	assertEquals(sparseResult.length, 2)
	assertEquals(sparseResult[0], undefined)
	assertEquals(sparseResult[1], undefined)
})

Deno.test("init - nested arrays", () => {
	const nested = [[1, 2], [3, 4], [5, 6]]
	assertEquals(init(nested), [[1, 2], [3, 4]])
	
	const deep = [[[1]], [[2]], [[3]]]
	assertEquals(init(deep), [[[1]], [[2]]])
})

// ===== Property-Based Tests =====

Deno.test("init property: length is original length - 1 (or 0)", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(arr) => {
				const result = init(arr)
				const expectedLength = Math.max(0, arr.length - 1)
				return result.length === expectedLength
			}
		)
	)
})

Deno.test("init property: elements match original up to length-1", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { minLength: 1 }),
			(arr) => {
				const result = init(arr)
				return result.every((elem, i) => elem === arr[i])
			}
		)
	)
})

Deno.test("init property: init of init removes last two elements", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 2 }),
			(arr) => {
				const onceInit = init(arr)
				const twiceInit = init(onceInit)
				const expected = arr.slice(0, -2)
				return twiceInit.length === expected.length &&
					twiceInit.every((elem, i) => elem === expected[i])
			}
		)
	)
})

Deno.test("init property: idempotent for empty and single element arrays", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { maxLength: 1 }),
			(arr) => {
				const once = init(arr)
				const twice = init(once)
				return once.length === 0 && twice.length === 0
			}
		)
	)
})

Deno.test("init property: preserves element order", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 2 }),
			(arr) => {
				const result = init(arr)
				// Check that all elements are in same order
				for (let i = 0; i < result.length; i++) {
					if (result[i] !== arr[i]) {
						return false
					}
				}
				return true
			}
		)
	)
})

Deno.test("init property: complements last", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			(arr) => {
				const initPart = init(arr)
				const lastPart = arr[arr.length - 1]
				// Concatenating init with last should give original
				const reconstructed = [...initPart, lastPart]
				return reconstructed.length === arr.length &&
					reconstructed.every((elem, i) => elem === arr[i])
			}
		)
	)
})

Deno.test("init property: handles null and undefined", () => {
	assertEquals(init(null), [])
	assertEquals(init(undefined), [])
	
	// Type check that it accepts these
	const nullResult: Array<never> = init(null)
	const undefinedResult: Array<never> = init(undefined)
	assertEquals(nullResult, [])
	assertEquals(undefinedResult, [])
})