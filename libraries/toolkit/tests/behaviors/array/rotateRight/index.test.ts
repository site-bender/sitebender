import { assertEquals } from "jsr:@std/assert@1"
import { assertType, type IsExact } from "jsr:@std/testing@1/types"
import * as fc from "npm:fast-check@3"

import rotateRight from "../../../../src/simple/array/rotateRight/index.ts"

Deno.test("rotateRight: rotates elements right by 1", () => {
	const array = [1, 2, 3, 4, 5]
	const result = rotateRight(1)(array)
	assertEquals(result, [5, 1, 2, 3, 4])
})

Deno.test("rotateRight: rotates elements right by 2", () => {
	const array = [1, 2, 3, 4, 5]
	const result = rotateRight(2)(array)
	assertEquals(result, [4, 5, 1, 2, 3])
})

Deno.test("rotateRight: rotates by 0 returns same array content", () => {
	const array = [1, 2, 3, 4, 5]
	const result = rotateRight(0)(array)
	assertEquals(result, [1, 2, 3, 4, 5])
})

Deno.test("rotateRight: negative rotation rotates left", () => {
	const array = [1, 2, 3, 4, 5]
	const result = rotateRight(-1)(array)
	assertEquals(result, [2, 3, 4, 5, 1])
})

Deno.test("rotateRight: negative rotation by 2 rotates left", () => {
	const array = [1, 2, 3, 4, 5]
	const result = rotateRight(-2)(array)
	assertEquals(result, [3, 4, 5, 1, 2])
})

Deno.test("rotateRight: rotation wraps around for large values", () => {
	const array = [1, 2, 3, 4, 5]
	// Rotating by 7 is same as rotating by 2 (7 % 5 = 2)
	const result = rotateRight(7)(array)
	assertEquals(result, [4, 5, 1, 2, 3])
})

Deno.test("rotateRight: full rotation returns same order", () => {
	const array = [1, 2, 3, 4, 5]
	const result = rotateRight(5)(array)
	assertEquals(result, [1, 2, 3, 4, 5])
})

Deno.test("rotateRight: multiple full rotations return same order", () => {
	const array = [1, 2, 3]
	const result = rotateRight(9)(array) // 9 % 3 = 0
	assertEquals(result, [1, 2, 3])
})

Deno.test("rotateRight: handles empty array", () => {
	const array: number[] = []
	const result = rotateRight(5)(array)
	assertEquals(result, [])
})

Deno.test("rotateRight: handles null input", () => {
	const result = rotateRight(3)(null)
	assertEquals(result, [])
})

Deno.test("rotateRight: handles undefined input", () => {
	const result = rotateRight(3)(undefined)
	assertEquals(result, [])
})

Deno.test("rotateRight: handles single element array", () => {
	const array = [42]
	const result = rotateRight(5)(array)
	assertEquals(result, [42])
})

Deno.test("rotateRight: handles two element array", () => {
	const array = [1, 2]
	assertEquals(rotateRight(1)(array), [2, 1])
	assertEquals(rotateRight(2)(array), [1, 2])
	assertEquals(rotateRight(3)(array), [2, 1])
})

Deno.test("rotateRight: works with string arrays", () => {
	const array = ["a", "b", "c", "d"]
	const result = rotateRight(1)(array)
	assertEquals(result, ["d", "a", "b", "c"])
})

Deno.test("rotateRight: works with object arrays", () => {
	const obj1 = { id: 1 }
	const obj2 = { id: 2 }
	const obj3 = { id: 3 }
	const array = [obj1, obj2, obj3]
	const result = rotateRight(1)(array)
	assertEquals(result, [obj3, obj1, obj2])
	// Verify it's the same objects (reference equality)
	assertEquals(result[0], obj3)
	assertEquals(result[1], obj1)
	assertEquals(result[2], obj2)
})

Deno.test("rotateRight: preserves array immutability", () => {
	const array = [1, 2, 3, 4, 5]
	const result = rotateRight(2)(array)
	assertEquals(array, [1, 2, 3, 4, 5]) // Original unchanged
	assertEquals(result, [4, 5, 1, 2, 3]) // New array
})

Deno.test("rotateRight: is properly curried", () => {
	const rotateByTwo = rotateRight(2)

	assertEquals(rotateByTwo([1, 2, 3]), [2, 3, 1])
	assertEquals(rotateByTwo(["a", "b", "c"]), ["b", "c", "a"])
})

Deno.test("rotateRight: handles very large negative rotations", () => {
	const array = [1, 2, 3]
	// -10 % 3 = -1, then (-1 + 3) % 3 = 2
	// So rotating right by -10 is same as rotating right by 2
	const result = rotateRight(-10)(array)
	assertEquals(result, [2, 3, 1])
})

Deno.test("rotateRight: handles NaN rotation", () => {
	const array = [1, 2, 3]
	const result = rotateRight(NaN)(array)
	// NaN % len = NaN, then (NaN + len) % len = NaN
	// So normalizedN will be NaN, which !== 0
	// array.slice(-NaN) returns entire array
	assertEquals(result, [1, 2, 3])
})

Deno.test("rotateRight: handles Infinity rotation", () => {
	const array = [1, 2, 3]
	const result = rotateRight(Infinity)(array)
	// Infinity % 3 = NaN, then (NaN + 3) % 3 = NaN
	assertEquals(result, [1, 2, 3])
})

Deno.test("rotateRight: handles -Infinity rotation", () => {
	const array = [1, 2, 3]
	const result = rotateRight(-Infinity)(array)
	// -Infinity % 3 = NaN, then (NaN + 3) % 3 = NaN
	assertEquals(result, [1, 2, 3])
})

// Type tests
Deno.test("rotateRight: type inference", () => {
	const numArray = [1, 2, 3]
	const numResult = rotateRight(1)(numArray)
	assertType<IsExact<typeof numResult, number[]>>(true)

	const strArray = ["a", "b", "c"]
	const strResult = rotateRight(2)(strArray)
	assertType<IsExact<typeof strResult, string[]>>(true)
})

// Property-based tests
Deno.test("rotateRight: property - maintains array length", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.integer(),
			(array, n) => {
				const result = rotateRight(n)(array)
				return result.length === array.length
			},
		),
	)
})

Deno.test("rotateRight: property - contains same elements", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(array, n) => {
				const result = rotateRight(n)(array)
				// Sort to compare contents regardless of order
				const sortedOriginal = [...array].sort((a, b) => a - b)
				const sortedResult = [...result].sort((a, b) => a - b)
				return JSON.stringify(sortedOriginal) === JSON.stringify(sortedResult)
			},
		),
	)
})

Deno.test("rotateRight: property - rotating by array length returns same order", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { minLength: 1 }),
			(array) => {
				const result = rotateRight(array.length)(array)
				return JSON.stringify(result) === JSON.stringify(array)
			},
		),
	)
})

Deno.test("rotateRight: property - inverse operations cancel", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { minLength: 1 }),
			fc.integer({ min: -100, max: 100 }),
			(array, n) => {
				// Rotating right by n then left by n (right by -n) should restore original
				const rotated = rotateRight(n)(array)
				const restored = rotateRight(-n)(rotated)
				return JSON.stringify(restored) === JSON.stringify(array)
			},
		),
	)
})

Deno.test("rotateRight: property - composition of rotations", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { minLength: 1 }),
			fc.integer({ min: -50, max: 50 }),
			fc.integer({ min: -50, max: 50 }),
			(array, n1, n2) => {
				// Rotating by n1 then n2 should equal rotating by n1 + n2
				const rotated1 = rotateRight(n2)(rotateRight(n1)(array))
				const rotated2 = rotateRight(n1 + n2)(array)
				return JSON.stringify(rotated1) === JSON.stringify(rotated2)
			},
		),
	)
})
