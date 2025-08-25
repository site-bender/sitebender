import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import indexOf from "../../../../../toolkit/src/simple/array/indexOf/index.ts"

// Test JSDoc examples
Deno.test("indexOf - JSDoc example 1: indexOf(3)([1, 2, 3, 2, 3])", () => {
	const result = indexOf(3)([1, 2, 3, 2, 3])
	assertEquals(result, 2)
})

Deno.test("indexOf - JSDoc example 2: indexOf('hello')(['hi', 'hello', 'world'])", () => {
	const result = indexOf("hello")(["hi", "hello", "world"])
	assertEquals(result, 1)
})

Deno.test("indexOf - JSDoc example 3: indexOf(5)([1, 2, 3])", () => {
	const result = indexOf(5)([1, 2, 3])
	assertEquals(result, undefined)
})

Deno.test("indexOf - JSDoc example 4: findThree([1, 2, 3, 4])", () => {
	const findThree = indexOf(3)
	assertEquals(findThree([1, 2, 3, 4]), 2)
})

Deno.test("indexOf - JSDoc example 5: findThree([5, 6, 7])", () => {
	const findThree = indexOf(3)
	assertEquals(findThree([5, 6, 7]), undefined)
})

Deno.test("indexOf - JSDoc example 6: indexOf(NaN)([1, NaN, 3])", () => {
	const result = indexOf(NaN)([1, NaN, 3])
	assertEquals(result, 1)
})

// Edge cases
Deno.test("indexOf - finds NaN correctly", () => {
	const findNaN = indexOf(NaN)
	assertEquals(findNaN([1, NaN, 3]), 1)
	assertEquals(findNaN([1, 2, 3]), undefined)
	assertEquals(findNaN([NaN, NaN, NaN]), 0) // finds first NaN
})

Deno.test("indexOf - distinguishes -0 and +0 with Object.is", () => {
	const findNegZero = indexOf(-0)
	const findPosZero = indexOf(0)
	// Object.is distinguishes -0 from +0
	assertEquals(findNegZero([-0, 1]), 0)
	assertEquals(findNegZero([0, 1]), undefined)
	assertEquals(findPosZero([0, 1]), 0)
	assertEquals(findPosZero([-0, 1]), undefined)
})

Deno.test("indexOf - works with undefined", () => {
	const findUndefined = indexOf(undefined as unknown)
	assertEquals(findUndefined([1, undefined, 3] as Array<unknown>), 1)
	assertEquals(findUndefined([1, 2, 3] as Array<unknown>), undefined)
	// With Object.is, can find undefined in sparse arrays
	// deno-lint-ignore no-sparse-arrays
	assertEquals(findUndefined([1, , 3] as Array<unknown>), 1)
})

Deno.test("indexOf - works with null", () => {
	const findNull = indexOf(null as unknown)
	assertEquals(findNull([1, null, 3] as Array<unknown>), 1)
	assertEquals(findNull([1, 2, 3] as Array<unknown>), undefined)
})

Deno.test("indexOf - empty array returns undefined", () => {
	const findThree = indexOf(3)
	assertEquals(findThree([]), undefined)
})

Deno.test("indexOf - single element arrays", () => {
	assertEquals(indexOf(1)([1]), 0)
	assertEquals(indexOf(1)([2]), undefined)
})

Deno.test("indexOf - first occurrence only", () => {
	const findThree = indexOf(3)
	assertEquals(findThree([3, 3, 3, 3]), 0)
	assertEquals(findThree([1, 3, 3, 3]), 1)
	assertEquals(findThree([1, 2, 3, 3]), 2)
})

Deno.test("indexOf - reference equality for objects", () => {
	const obj = { a: 1 }
	const findObj = indexOf(obj)
	assertEquals(findObj([{ a: 1 }, obj, { a: 1 }]), 1)
	assertEquals(findObj([{ a: 1 }, { a: 1 }]), undefined)
})

Deno.test("indexOf - reference equality for arrays", () => {
	const arr = [1, 2]
	const findArr = indexOf(arr)
	assertEquals(findArr([[1, 2], arr, [1, 2]]), 1)
	assertEquals(findArr([[1, 2], [1, 2]]), undefined)
})

Deno.test("indexOf - with strings", () => {
	const findHello = indexOf("hello")
	assertEquals(findHello(["hello", "world"]), 0)
	assertEquals(findHello(["world", "hello"]), 1)
	assertEquals(findHello(["Hello", "world"]), undefined) // case sensitive
})

Deno.test("indexOf - with booleans", () => {
	const findTrue = indexOf(true)
	assertEquals(findTrue([false, true, false]), 1)
	assertEquals(findTrue([false, false]), undefined)
	const findTrueGeneric = indexOf(true as unknown)
	assertEquals(findTrueGeneric([1, 0] as Array<unknown>), undefined) // strict equality
})

Deno.test("indexOf - with mixed types", () => {
	const findThree = indexOf(3 as unknown)
	assertEquals(findThree([1, "3", 3, true] as Array<unknown>), 2)
	assertEquals(findThree([1, "3", true] as Array<unknown>), undefined)
})

Deno.test("indexOf - element at beginning", () => {
	assertEquals(indexOf(1)([1, 2, 3]), 0)
})

Deno.test("indexOf - element at end", () => {
	assertEquals(indexOf(3)([1, 2, 3]), 2)
})

Deno.test("indexOf - with large arrays", () => {
	const arr = Array.from({ length: 10000 }, (_, i) => i)
	assertEquals(indexOf(0)(arr), 0)
	assertEquals(indexOf(5000)(arr), 5000)
	assertEquals(indexOf(9999)(arr), 9999)
	assertEquals(indexOf(10000)(arr), undefined)
})

// Property-based tests
Deno.test("indexOf - property: element in array returns valid index", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(arr, elem) => {
				const arrWithElem = [...arr, elem]
				const index = indexOf(elem)(arrWithElem)
				return index !== undefined && 
					   index >= 0 && 
					   index < arrWithElem.length &&
					   arrWithElem[index] === elem
			}
		)
	)
})

Deno.test("indexOf - property: element not in array returns undefined", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 0, max: 100 })),
			(arr) => {
				// Use an element guaranteed not to be in the array
				const notInArray = -1
				return indexOf(notInArray)(arr) === undefined
			}
		)
	)
})

Deno.test("indexOf - property: returns first occurrence", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 0, max: 10 })),
			fc.integer({ min: 0, max: 10 }),
			(arr, elem) => {
				const result = indexOf(elem)(arr)
				if (result === undefined) {
					return !arr.includes(elem)
				}
				// Check it's the first occurrence
				for (let i = 0; i < result; i++) {
					if (arr[i] === elem) return false
				}
				return arr[result] === elem
			}
		)
	)
})

Deno.test("indexOf - property: handles all values correctly", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.anything(),
			(arr, elem) => {
				const ourIndex = indexOf(elem)(arr)
				if (ourIndex === undefined) {
					// Element not found - verify it's really not there
					return !arr.some(x => Object.is(x, elem))
				} else {
					// Element found - verify it's at the right index and is the first
					return Object.is(arr[ourIndex], elem) &&
					       !arr.slice(0, ourIndex).some(x => Object.is(x, elem))
				}
			}
		)
	)
})

Deno.test("indexOf - handles null and undefined parameters", () => {
	const indexOfNull = indexOf(null as unknown as number)
	const indexOfUndefined = indexOf(undefined as unknown as number)
	
	assertEquals(indexOfNull([1, null as unknown as number, 2]), 1)
	assertEquals(indexOfUndefined([1, undefined as unknown as number, 2]), 1)
})