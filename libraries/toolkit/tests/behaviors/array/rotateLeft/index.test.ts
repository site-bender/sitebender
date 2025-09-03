import { assertEquals } from "jsr:@std/assert@1"
import { assertType, type IsExact } from "jsr:@std/testing@1/types"
import * as fc from "npm:fast-check@3"

import rotateLeft from "../../../../src/simple/array/rotateLeft/index.ts"

Deno.test("rotateLeft: rotates elements left by 1", () => {
	const array = [1, 2, 3, 4, 5]
	const result = rotateLeft(1)(array)
	assertEquals(result, [2, 3, 4, 5, 1])
})

Deno.test("rotateLeft: rotates elements left by 2", () => {
	const array = [1, 2, 3, 4, 5]
	const result = rotateLeft(2)(array)
	assertEquals(result, [3, 4, 5, 1, 2])
})

Deno.test("rotateLeft: rotates by 0 returns same array content", () => {
	const array = [1, 2, 3, 4, 5]
	const result = rotateLeft(0)(array)
	assertEquals(result, [1, 2, 3, 4, 5])
})

Deno.test("rotateLeft: negative rotation rotates right", () => {
	const array = [1, 2, 3, 4, 5]
	const result = rotateLeft(-1)(array)
	assertEquals(result, [5, 1, 2, 3, 4])
})

Deno.test("rotateLeft: negative rotation by 2 rotates right", () => {
	const array = [1, 2, 3, 4, 5]
	const result = rotateLeft(-2)(array)
	assertEquals(result, [4, 5, 1, 2, 3])
})

Deno.test("rotateLeft: rotation wraps around for large values", () => {
	const array = [1, 2, 3, 4, 5]
	// Rotating by 7 is same as rotating by 2 (7 % 5 = 2)
	const result = rotateLeft(7)(array)
	assertEquals(result, [3, 4, 5, 1, 2])
})

Deno.test("rotateLeft: full rotation returns same order", () => {
	const array = [1, 2, 3, 4, 5]
	const result = rotateLeft(5)(array)
	assertEquals(result, [1, 2, 3, 4, 5])
})

Deno.test("rotateLeft: multiple full rotations return same order", () => {
	const array = [1, 2, 3]
	const result = rotateLeft(9)(array) // 9 % 3 = 0
	assertEquals(result, [1, 2, 3])
})

Deno.test("rotateLeft: handles empty array", () => {
	const array: number[] = []
	const result = rotateLeft(5)(array)
	assertEquals(result, [])
})

Deno.test("rotateLeft: handles null input", () => {
	const result = rotateLeft(3)(null)
	assertEquals(result, [])
})

Deno.test("rotateLeft: handles undefined input", () => {
	const result = rotateLeft(3)(undefined)
	assertEquals(result, [])
})

Deno.test("rotateLeft: handles single element array", () => {
	const array = [42]
	const result = rotateLeft(5)(array)
	assertEquals(result, [42])
})

Deno.test("rotateLeft: handles two element array", () => {
	const array = [1, 2]
	assertEquals(rotateLeft(1)(array), [2, 1])
	assertEquals(rotateLeft(2)(array), [1, 2])
	assertEquals(rotateLeft(3)(array), [2, 1])
})

Deno.test("rotateLeft: works with string arrays", () => {
	const array = ["a", "b", "c", "d"]
	const result = rotateLeft(1)(array)
	assertEquals(result, ["b", "c", "d", "a"])
})

Deno.test("rotateLeft: works with object arrays", () => {
	const obj1 = { id: 1 }
	const obj2 = { id: 2 }
	const obj3 = { id: 3 }
	const array = [obj1, obj2, obj3]
	const result = rotateLeft(1)(array)
	assertEquals(result, [obj2, obj3, obj1])
	// Verify it's the same objects (reference equality)
	assertEquals(result[0], obj2)
	assertEquals(result[1], obj3)
	assertEquals(result[2], obj1)
})

Deno.test("rotateLeft: preserves array immutability", () => {
	const array = [1, 2, 3, 4, 5]
	const result = rotateLeft(2)(array)
	assertEquals(array, [1, 2, 3, 4, 5]) // Original unchanged
	assertEquals(result, [3, 4, 5, 1, 2]) // New array
})

Deno.test("rotateLeft: is properly curried", () => {
	const rotateByTwo = rotateLeft(2)
	
	assertEquals(rotateByTwo([1, 2, 3]), [3, 1, 2])
	assertEquals(rotateByTwo(["a", "b", "c"]), ["c", "a", "b"])
})

Deno.test("rotateLeft: handles very large negative rotations", () => {
	const array = [1, 2, 3]
	// -10 % 3 = -1, then (-1 + 3) % 3 = 2
	// So rotating left by -10 is same as rotating left by 2
	const result = rotateLeft(-10)(array)
	assertEquals(result, [3, 1, 2])
})

Deno.test("rotateLeft: handles NaN rotation", () => {
	const array = [1, 2, 3]
	const result = rotateLeft(NaN)(array)
	// NaN % len = NaN, then (NaN + len) % len = NaN
	// So normalizedN will be NaN, which !== 0
	// array.slice(NaN) returns entire array
	assertEquals(result, [1, 2, 3])
})

Deno.test("rotateLeft: handles Infinity rotation", () => {
	const array = [1, 2, 3]
	const result = rotateLeft(Infinity)(array)
	// Infinity % 3 = NaN, then (NaN + 3) % 3 = NaN
	assertEquals(result, [1, 2, 3])
})

Deno.test("rotateLeft: handles -Infinity rotation", () => {
	const array = [1, 2, 3]
	const result = rotateLeft(-Infinity)(array)
	// -Infinity % 3 = NaN, then (NaN + 3) % 3 = NaN
	assertEquals(result, [1, 2, 3])
})

// Type tests
Deno.test("rotateLeft: type inference", () => {
	const numArray = [1, 2, 3]
	const numResult = rotateLeft(1)(numArray)
	assertType<IsExact<typeof numResult, number[]>>(true)
	
	const strArray = ["a", "b", "c"]
	const strResult = rotateLeft(2)(strArray)
	assertType<IsExact<typeof strResult, string[]>>(true)
})

// Property-based tests
Deno.test("rotateLeft: property - maintains array length", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.integer(),
			(array, n) => {
				const result = rotateLeft(n)(array)
				return result.length === array.length
			},
		),
	)
})

Deno.test("rotateLeft: property - contains same elements", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(array, n) => {
				const result = rotateLeft(n)(array)
				// Sort to compare contents regardless of order
				const sortedOriginal = [...array].sort((a, b) => a - b)
				const sortedResult = [...result].sort((a, b) => a - b)
				return JSON.stringify(sortedOriginal) === JSON.stringify(sortedResult)
			},
		),
	)
})

Deno.test("rotateLeft: property - rotating by array length returns same order", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { minLength: 1 }),
			(array) => {
				const result = rotateLeft(array.length)(array)
				return JSON.stringify(result) === JSON.stringify(array)
			},
		),
	)
})

Deno.test("rotateLeft: property - inverse operations cancel", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { minLength: 1 }),
			fc.integer({ min: -100, max: 100 }),
			(array, n) => {
				// Rotating left by n then right by n (left by -n) should restore original
				const rotated = rotateLeft(n)(array)
				const restored = rotateLeft(-n)(rotated)
				return JSON.stringify(restored) === JSON.stringify(array)
			},
		),
	)
})

Deno.test("rotateLeft: property - composition of rotations", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { minLength: 1 }),
			fc.integer({ min: -50, max: 50 }),
			fc.integer({ min: -50, max: 50 }),
			(array, n1, n2) => {
				// Rotating by n1 then n2 should equal rotating by n1 + n2
				const rotated1 = rotateLeft(n2)(rotateLeft(n1)(array))
				const rotated2 = rotateLeft(n1 + n2)(array)
				return JSON.stringify(rotated1) === JSON.stringify(rotated2)
			},
		),
	)
})