import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import lastIndexOf from "../../../../../toolkit/src/simple/array/lastIndexOf/index.ts"

// Test JSDoc examples
Deno.test("lastIndexOf - JSDoc example 1: lastIndexOf(3)([1, 2, 3, 2, 3])", () => {
	const result = lastIndexOf(3)([1, 2, 3, 2, 3])
	assertEquals(result, 4)
})

Deno.test("lastIndexOf - JSDoc example 2: lastIndexOf('hello')(['hello', 'world', 'hello'])", () => {
	const result = lastIndexOf("hello")(["hello", "world", "hello"])
	assertEquals(result, 2)
})

Deno.test("lastIndexOf - JSDoc example 3: lastIndexOf(5)([1, 2, 3])", () => {
	const result = lastIndexOf(5)([1, 2, 3])
	assertEquals(result, undefined)
})

Deno.test("lastIndexOf - JSDoc example 4: findLastThree([3, 1, 2, 3, 4])", () => {
	const findLastThree = lastIndexOf(3)
	assertEquals(findLastThree([3, 1, 2, 3, 4]), 3)
})

Deno.test("lastIndexOf - JSDoc example 5: findLastThree([1, 2, 4])", () => {
	const findLastThree = lastIndexOf(3)
	assertEquals(findLastThree([1, 2, 4]), undefined)
})

Deno.test("lastIndexOf - JSDoc example 6: lastIndexOf(NaN)([NaN, 1, NaN, 3])", () => {
	const result = lastIndexOf(NaN)([NaN, 1, NaN, 3])
	assertEquals(result, 2)
})

// Edge cases
Deno.test("lastIndexOf - finds NaN correctly", () => {
	const findLastNaN = lastIndexOf(NaN)
	assertEquals(findLastNaN([NaN, 1, NaN, 3]), 2)
	assertEquals(findLastNaN([1, 2, 3]), undefined)
	assertEquals(findLastNaN([NaN, NaN, NaN]), 2) // finds last NaN
})

Deno.test("lastIndexOf - distinguishes -0 and +0 with Object.is", () => {
	const findLastNegZero = lastIndexOf(-0)
	const findLastPosZero = lastIndexOf(0)
	// Object.is distinguishes -0 from +0
	assertEquals(findLastNegZero([-0, 1, -0]), 2)
	assertEquals(findLastNegZero([0, 1, 0]), undefined)
	assertEquals(findLastPosZero([0, 1, 0]), 2)
	assertEquals(findLastPosZero([-0, 1, -0]), undefined)
})

Deno.test("lastIndexOf - works with undefined", () => {
	const findLastUndefined = lastIndexOf(undefined as unknown)
	assertEquals(findLastUndefined([undefined, 1, undefined, 3] as Array<unknown>), 2)
	assertEquals(findLastUndefined([1, 2, 3] as Array<unknown>), undefined)
	// With Object.is, can find undefined in sparse arrays
	// deno-lint-ignore no-sparse-arrays
	assertEquals(findLastUndefined([, 1, , 3] as Array<unknown>), 2)
})

Deno.test("lastIndexOf - works with null", () => {
	const findLastNull = lastIndexOf(null as unknown)
	assertEquals(findLastNull([null, 1, null, 3] as Array<unknown>), 2)
	assertEquals(findLastNull([1, 2, 3] as Array<unknown>), undefined)
})

Deno.test("lastIndexOf - empty array returns undefined", () => {
	const findLastThree = lastIndexOf(3)
	assertEquals(findLastThree([]), undefined)
})

Deno.test("lastIndexOf - single element arrays", () => {
	assertEquals(lastIndexOf(1)([1]), 0)
	assertEquals(lastIndexOf(1)([2]), undefined)
})

Deno.test("lastIndexOf - last occurrence only", () => {
	const findLastThree = lastIndexOf(3)
	assertEquals(findLastThree([3, 3, 3, 3]), 3)
	assertEquals(findLastThree([3, 3, 3, 1]), 2)
	assertEquals(findLastThree([3, 3, 1, 2]), 1)
})

Deno.test("lastIndexOf - reference equality for objects", () => {
	const obj = { a: 1 }
	const findLastObj = lastIndexOf(obj)
	assertEquals(findLastObj([obj, { a: 1 }, obj]), 2)
	assertEquals(findLastObj([{ a: 1 }, { a: 1 }]), undefined)
})

Deno.test("lastIndexOf - reference equality for arrays", () => {
	const arr = [1, 2]
	const findLastArr = lastIndexOf(arr)
	assertEquals(findLastArr([arr, [1, 2], arr]), 2)
	assertEquals(findLastArr([[1, 2], [1, 2]]), undefined)
})

Deno.test("lastIndexOf - with strings", () => {
	const findLastHello = lastIndexOf("hello")
	assertEquals(findLastHello(["hello", "world", "hello"]), 2)
	assertEquals(findLastHello(["hello", "world"]), 0)
	assertEquals(findLastHello(["Hello", "world"]), undefined) // case sensitive
})

Deno.test("lastIndexOf - with booleans", () => {
	const findLastTrue = lastIndexOf(true)
	assertEquals(findLastTrue([true, false, true]), 2)
	assertEquals(findLastTrue([false, false]), undefined)
	const findLastTrueGeneric = lastIndexOf(true as unknown)
	assertEquals(findLastTrueGeneric([1, 0] as Array<unknown>), undefined) // strict equality
})

Deno.test("lastIndexOf - with mixed types", () => {
	const findLastThree = lastIndexOf(3 as unknown)
	assertEquals(findLastThree([3, "3", 3, true] as Array<unknown>), 2)
	assertEquals(findLastThree([1, "3", true] as Array<unknown>), undefined)
})

Deno.test("lastIndexOf - element at beginning only", () => {
	assertEquals(lastIndexOf(1)([1, 2, 3]), 0)
})

Deno.test("lastIndexOf - element at end only", () => {
	assertEquals(lastIndexOf(3)([1, 2, 3]), 2)
})

Deno.test("lastIndexOf - with large arrays", () => {
	const arr = Array.from({ length: 10000 }, (_, i) => i)
	assertEquals(lastIndexOf(0)(arr), 0)
	assertEquals(lastIndexOf(5000)(arr), 5000)
	assertEquals(lastIndexOf(9999)(arr), 9999)
	assertEquals(lastIndexOf(10000)(arr), undefined)
})

Deno.test("lastIndexOf - multiple occurrences throughout array", () => {
	const arr = [1, 2, 1, 3, 1, 4, 1]
	assertEquals(lastIndexOf(1)(arr), 6)
})

// Property-based tests
Deno.test("lastIndexOf - property: element in array returns valid index", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(arr, elem) => {
				const arrWithElem = [...arr, elem]
				const index = lastIndexOf(elem)(arrWithElem)
				return index !== undefined && 
					   index >= 0 && 
					   index < arrWithElem.length &&
					   arrWithElem[index] === elem
			}
		)
	)
})

Deno.test("lastIndexOf - property: element not in array returns undefined", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 0, max: 100 })),
			(arr) => {
				// Use an element guaranteed not to be in the array
				const notInArray = -1
				return lastIndexOf(notInArray)(arr) === undefined
			}
		)
	)
})

Deno.test("lastIndexOf - property: returns last occurrence", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 0, max: 10 })),
			fc.integer({ min: 0, max: 10 }),
			(arr, elem) => {
				const result = lastIndexOf(elem)(arr)
				if (result === undefined) {
					return !arr.includes(elem)
				}
				// Check it's the last occurrence
				for (let i = result + 1; i < arr.length; i++) {
					if (arr[i] === elem) return false
				}
				return arr[result] === elem
			}
		)
	)
})

Deno.test("lastIndexOf - property: handles all values correctly", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.anything(),
			(arr, elem) => {
				const ourIndex = lastIndexOf(elem)(arr)
				if (ourIndex === undefined) {
					// Element not found - verify it's really not there
					return !arr.some(x => Object.is(x, elem))
				} else {
					// Element found - verify it's at the right index and is the last
					return Object.is(arr[ourIndex], elem) &&
					       !arr.slice(ourIndex + 1).some(x => Object.is(x, elem))
				}
			}
		)
	)
})

Deno.test("lastIndexOf - property: lastIndexOf >= indexOf when element exists", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(arr, elem) => {
				const arrWithElem = [...arr, elem]
				const firstIndex = arrWithElem.indexOf(elem)
				const lastIndex = lastIndexOf(elem)(arrWithElem)
				return lastIndex !== undefined && lastIndex >= firstIndex
			}
		)
	)
})

Deno.test("lastIndexOf - handles null and undefined parameters", () => {
	const lastIndexOfNull = lastIndexOf(null as unknown as number)
	const lastIndexOfUndefined = lastIndexOf(undefined as unknown as number)
	
	assertEquals(lastIndexOfNull([1, null as unknown as number, 2, null as unknown as number]), 3)
	assertEquals(lastIndexOfUndefined([1, undefined as unknown as number, 2, undefined as unknown as number]), 3)
})