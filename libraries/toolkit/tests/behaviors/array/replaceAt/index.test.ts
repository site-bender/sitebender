import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import replaceAt from "../../../../src/simple/array/replaceAt/index.ts"

// Test JSDoc examples
Deno.test("replaceAt - JSDoc example 1: double number at index", () => {
	const result = replaceAt<number>(1)((n: number) => n * 2)([1, 2, 3, 4])
	assertEquals(result, [1, 4, 3, 4])
})

Deno.test("replaceAt - JSDoc example 2: uppercase string", () => {
	const result = replaceAt<string>(0)((s: string) => s.toUpperCase())(["hello", "world"])
	assertEquals(result, ["HELLO", "world"])
})

Deno.test("replaceAt - JSDoc example 3: out of bounds index", () => {
	const result = replaceAt<number>(10)((x: number) => x)([1, 2, 3])
	assertEquals(result, [1, 2, 3])
})

Deno.test("replaceAt - JSDoc example 4: partial application", () => {
	const doubleSecond = replaceAt<number>(1)((n: number) => n * 2)
	const result = doubleSecond([10, 20, 30])
	assertEquals(result, [10, 40, 30])
})

// Edge cases
Deno.test("replaceAt - empty array", () => {
	const result = replaceAt<unknown>(0)((x: unknown) => x)([])
	assertEquals(result, [])
})

Deno.test("replaceAt - single element array at index 0", () => {
	const result = replaceAt<number>(0)((n: number) => n * 10)([5])
	assertEquals(result, [50])
})

Deno.test("replaceAt - single element array with invalid index", () => {
	const result = replaceAt<number>(1)((n: number) => n * 10)([5])
	assertEquals(result, [5])
})

Deno.test("replaceAt - negative index", () => {
	const result = replaceAt<number>(-1)((n: number) => n * 2)([1, 2, 3])
	assertEquals(result, [1, 2, 3]) // Returns unchanged
})

Deno.test("replaceAt - last valid index", () => {
	const result = replaceAt<number>(2)((n: number) => n + 10)([1, 2, 3])
	assertEquals(result, [1, 2, 13])
})

Deno.test("replaceAt - with undefined", () => {
	const result = replaceAt<number | undefined>(1)(() => undefined)([1, 2, 3] as Array<number | undefined>)
	assertEquals(result, [1, undefined, 3])
})

Deno.test("replaceAt - with null", () => {
	const result = replaceAt<string | null>(0)(() => null)(["a", "b"] as Array<string | null>)
	assertEquals(result, [null, "b"])
})

Deno.test("replaceAt - with NaN", () => {
	const result = replaceAt<number>(1)(() => NaN)([1, 2, 3])
	assertEquals(result[0], 1)
	assertEquals(Number.isNaN(result[1]), true)
	assertEquals(result[2], 3)
})

Deno.test("replaceAt - identity function", () => {
	const result = replaceAt<number>(1)((x: number) => x)([1, 2, 3])
	assertEquals(result, [1, 2, 3])
})

Deno.test("replaceAt - complex transformation", () => {
	const users = [
		{ name: "Alice", age: 30 },
		{ name: "Bob", age: 25 },
		{ name: "Charlie", age: 35 }
	]
	type User = typeof users[0]
	const result = replaceAt<User>(1)((user: User) => ({ ...user, age: user.age + 1 }))(users)
	assertEquals(result, [
		{ name: "Alice", age: 30 },
		{ name: "Bob", age: 26 },
		{ name: "Charlie", age: 35 }
	])
})

Deno.test("replaceAt - with sparse array", () => {
	// deno-lint-ignore no-sparse-arrays
	const sparse = [1, , 3]
	const result = replaceAt<number | undefined | string>(1)((x: number | undefined | string) => x ?? "filled")(sparse as Array<number | undefined | string>)
	assertEquals(result, [1, "filled", 3])
})

Deno.test("replaceAt - string manipulation", () => {
	const words = ["hello", "world", "foo"]
	const result = replaceAt<string>(1)((s: string) => s.repeat(2))(words)
	assertEquals(result, ["hello", "worldworld", "foo"])
})

Deno.test("replaceAt - boolean toggle", () => {
	const flags = [true, false, true, false]
	const result = replaceAt<boolean>(2)((b: boolean) => !b)(flags)
	assertEquals(result, [true, false, false, false])
})

Deno.test("replaceAt - array element transformation", () => {
	const matrix = [[1, 2], [3, 4], [5, 6]]
	const result = replaceAt<number[]>(1)((arr: number[]) => arr.map(x => x * 10))(matrix)
	assertEquals(result, [[1, 2], [30, 40], [5, 6]])
})

Deno.test("replaceAt - currying stages", () => {
	const replaceAtTwo = replaceAt<number>(2)
	const squareIt = replaceAtTwo((n: number) => n * n)
	
	assertEquals(squareIt([1, 2, 3, 4]), [1, 2, 9, 4])
	assertEquals(squareIt([5, 6, 7, 8]), [5, 6, 49, 8])
})

Deno.test("replaceAt - boundary conditions", () => {
	const arr = [10, 20, 30, 40, 50]
	
	// First element
	assertEquals(replaceAt<number>(0)((n: number) => n / 10)(arr), [1, 20, 30, 40, 50])
	
	// Last element
	assertEquals(replaceAt<number>(4)((n: number) => n / 10)(arr), [10, 20, 30, 40, 5])
	
	// One past last (out of bounds)
	assertEquals(replaceAt<number>(5)((n: number) => n / 10)(arr), [10, 20, 30, 40, 50])
})

// Property-based tests
Deno.test("replaceAt - property: result length equals input length", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(array, index) => {
				const result = replaceAt<number>(index)((n: number) => n * 2)(array)
				return result.length === array.length
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("replaceAt - property: only element at index is changed for valid index", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			(array) => {
				const index = Math.floor(Math.random() * array.length)
				const marker = Symbol("changed")
				const result = replaceAt<unknown>(index)(() => marker)(array)
				
				// Check all elements except at index are unchanged
				for (let i = 0; i < array.length; i++) {
					if (i === index) {
						if (result[i] !== marker) return false
					} else {
						if (result[i] !== array[i]) return false
					}
				}
				return true
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("replaceAt - property: out of bounds returns identical array", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.oneof(
				fc.integer({ max: -1 }),
				fc.integer({ min: 100 })
			),
			(array, invalidIndex) => {
				const result = replaceAt<number>(invalidIndex)((n: number) => n * 2)(array)
				return result === array // Should be same reference
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("replaceAt - property: replacer function receives correct value", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			(array) => {
				const index = Math.floor(Math.random() * array.length)
				const expectedValue = array[index]
				let receivedValue: number | undefined
				
				replaceAt<number>(index)((value: number) => {
					receivedValue = value
					return value
				})(array)
				
				return receivedValue === expectedValue
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("replaceAt - property: immutability", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(array, index) => {
				const original = [...array]
				replaceAt<number>(index)((n: number) => n * 2)(array)
				
				// Original should be unchanged
				return array.length === original.length &&
					array.every((v, i) => v === original[i])
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("replaceAt - property: identity replacer returns equal array", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(array, index) => {
				const result = replaceAt<number>(index)((x: number) => x)(array)
				
				return result.length === array.length &&
					result.every((v, i) => v === array[i])
			}
		),
		{ numRuns: 1000 }
	)
})