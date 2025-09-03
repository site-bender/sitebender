import { assertEquals, assertExists } from "jsr:@std/assert@1"
import { assertType, type IsExact } from "jsr:@std/testing@1/types"
import * as fc from "npm:fast-check@3"

import sample from "../../../../src/simple/array/sample/index.ts"

Deno.test("sample: returns element from array", () => {
	const array = [1, 2, 3, 4, 5]
	const result = sample(array)
	assertExists(result)
	assertEquals(array.includes(result), true)
})

Deno.test("sample: returns single element from single-element array", () => {
	const array = [42]
	const result = sample(array)
	assertEquals(result, 42)
})

Deno.test("sample: returns undefined for empty array", () => {
	const array: number[] = []
	const result = sample(array)
	assertEquals(result, undefined)
})

Deno.test("sample: returns undefined for null input", () => {
	const result = sample(null)
	assertEquals(result, undefined)
})

Deno.test("sample: returns undefined for undefined input", () => {
	const result = sample(undefined)
	assertEquals(result, undefined)
})

Deno.test("sample: works with string arrays", () => {
	const array = ["red", "green", "blue", "yellow"]
	const result = sample(array)
	if (result !== undefined) {
		assertEquals(array.includes(result), true)
	}
})

Deno.test("sample: works with object arrays", () => {
	const obj1 = { id: 1, name: "Alice" }
	const obj2 = { id: 2, name: "Bob" }
	const obj3 = { id: 3, name: "Charlie" }
	const array = [obj1, obj2, obj3]
	const result = sample(array)
	
	assertExists(result)
	assertEquals(array.includes(result), true)
	// Verify it returns the actual object reference
	assertEquals(
		result === obj1 || result === obj2 || result === obj3,
		true,
	)
})

Deno.test("sample: handles arrays with null/undefined elements", () => {
	const array = [1, null, 3, undefined, 5]
	const result = sample(array)
	// Result could be any element including null or undefined
	assertEquals(array.includes(result as any), true)
})

Deno.test("sample: handles arrays with duplicate elements", () => {
	const array = ["a", "a", "b"]
	const result = sample(array)
	assertExists(result)
	assertEquals(result === "a" || result === "b", true)
})

Deno.test("sample: distribution test for uniformity", () => {
	// This test is probabilistic and may rarely fail
	const array = [1, 2, 3]
	const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0 }
	const iterations = 30000
	
	for (let i = 0; i < iterations; i++) {
		const result = sample(array)
		if (result !== undefined) {
			counts[result]++
		}
	}
	
	// Each element should appear roughly 1/3 of the time
	// Allow for statistical variance (within 5% of expected)
	const expectedCount = iterations / 3
	const tolerance = expectedCount * 0.05
	
	for (const count of Object.values(counts)) {
		assertEquals(
			Math.abs(count - expectedCount) < tolerance,
			true,
			`Distribution seems non-uniform: ${JSON.stringify(counts)}`,
		)
	}
})

Deno.test("sample: handles large arrays", () => {
	const array = Array.from({ length: 1000 }, (_, i) => i)
	const result = sample(array)
	assertExists(result)
	assertEquals(result >= 0 && result < 1000, true)
})

Deno.test("sample: preserves array immutability", () => {
	const array = [1, 2, 3, 4, 5]
	const originalCopy = [...array]
	sample(array)
	assertEquals(array, originalCopy) // Array unchanged
})

Deno.test("sample: handles arrays with mixed types", () => {
	const array = [1, "two", true, null, { id: 5 }] as const
	const result = sample(array)
	assertEquals(array.includes(result as any), true)
})

// Type tests
Deno.test("sample: type inference", () => {
	const numArray = [1, 2, 3]
	const numResult = sample(numArray)
	assertType<IsExact<typeof numResult, number | undefined>>(true)
	
	const strArray = ["a", "b", "c"]
	const strResult = sample(strArray)
	assertType<IsExact<typeof strResult, string | undefined>>(true)
	
	const mixedArray = [1, "two", true] as const
	const mixedResult = sample(mixedArray)
	assertType<IsExact<typeof mixedResult, 1 | "two" | true | undefined>>(true)
})

// Property-based tests
Deno.test("sample: property - always returns element from array or undefined", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(array) => {
				const result = sample(array)
				if (array.length === 0) {
					return result === undefined
				} else {
					return array.includes(result)
				}
			},
		),
	)
})

Deno.test("sample: property - single element arrays always return that element", () => {
	fc.assert(
		fc.property(
			fc.anything(),
			(element) => {
				const result = sample([element])
				return result === element
			},
		),
	)
})

Deno.test("sample: property - never mutates input array", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(array) => {
				const original = [...array]
				sample(array)
				return JSON.stringify(array) === JSON.stringify(original)
			},
		),
	)
})

Deno.test("sample: property - empty arrays always return undefined", () => {
	fc.assert(
		fc.property(
			fc.constant([]),
			(array) => {
				return sample(array) === undefined
			},
		),
	)
})

Deno.test("sample: coverage - Math.random edge cases", () => {
	// Save original Math.random
	const originalRandom = Math.random
	
	try {
		// Test when Math.random returns 0 (selects first element)
		Math.random = () => 0
		assertEquals(sample([10, 20, 30]), 10)
		
		// Test when Math.random returns 0.999... (selects last element)
		Math.random = () => 0.9999999
		assertEquals(sample([10, 20, 30]), 30)
		
		// Test when Math.random returns exactly 0.5 (middle element)
		Math.random = () => 0.5
		assertEquals(sample([10, 20, 30, 40]), 30)
	} finally {
		// Restore original Math.random
		Math.random = originalRandom
	}
})