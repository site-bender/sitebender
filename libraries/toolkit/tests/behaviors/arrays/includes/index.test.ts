import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import includes from "../../../../../toolkit/src/simple/array/includes/index.ts"
import indexOf from "../../../../../toolkit/src/simple/array/indexOf/index.ts"

// Test JSDoc examples
Deno.test("includes - JSDoc example 1: includes(3)([1, 2, 3, 4])", () => {
	const result = includes(3)([1, 2, 3, 4])
	assertEquals(result, true)
})

Deno.test("includes - JSDoc example 2: includes('hello')(['hi', 'bye'])", () => {
	const result = includes("hello")(["hi", "bye"])
	assertEquals(result, false)
})

Deno.test("includes - JSDoc example 3: includes(0)([0, false, null])", () => {
	const result = includes(0 as unknown)([0, false, null] as Array<unknown>)
	assertEquals(result, true)
})

Deno.test("includes - JSDoc example 4: hasThree([1, 2, 3])", () => {
	const hasThree = includes(3)
	assertEquals(hasThree([1, 2, 3]), true)
})

Deno.test("includes - JSDoc example 5: hasThree([4, 5, 6])", () => {
	const hasThree = includes(3)
	assertEquals(hasThree([4, 5, 6]), false)
})

// Edge cases
Deno.test("includes - finds NaN correctly", () => {
	const hasNaN = includes(NaN)
	assertEquals(hasNaN([1, NaN, 3]), true)
	assertEquals(hasNaN([1, 2, 3]), false)
})

Deno.test("includes - distinguishes between -0 and +0", () => {
	const hasNegZero = includes(-0)
	const hasPosZero = includes(0)
	// JavaScript's includes doesn't distinguish -0 from +0
	assertEquals(hasNegZero([0]), true)
	assertEquals(hasPosZero([-0]), true)
})

Deno.test("includes - works with undefined", () => {
	const hasUndefined = includes(undefined as unknown)
	assertEquals(hasUndefined([1, undefined, 3] as Array<unknown>), true)
	assertEquals(hasUndefined([1, 2, 3] as Array<unknown>), false)
	// deno-lint-ignore no-sparse-arrays
	assertEquals(hasUndefined([1, , 3] as Array<unknown>), true) // sparse array
})

Deno.test("includes - works with null", () => {
	const hasNull = includes(null as unknown)
	assertEquals(hasNull([1, null, 3] as Array<unknown>), true)
	assertEquals(hasNull([1, 2, 3] as Array<unknown>), false)
})

Deno.test("includes - empty array returns false", () => {
	const hasThree = includes(3)
	assertEquals(hasThree([]), false)
})

Deno.test("includes - single element arrays", () => {
	assertEquals(includes(1)([1]), true)
	assertEquals(includes(1)([2]), false)
})

Deno.test("includes - reference equality for objects", () => {
	const obj = { a: 1 }
	const hasObj = includes(obj)
	assertEquals(hasObj([obj, { a: 1 }]), true)
	assertEquals(hasObj([{ a: 1 }, { a: 1 }]), false) // different objects
})

Deno.test("includes - reference equality for arrays", () => {
	const arr = [1, 2]
	const hasArr = includes(arr)
	assertEquals(hasArr([arr, [1, 2]]), true)
	assertEquals(hasArr([[1, 2], [1, 2]]), false) // different arrays
})

Deno.test("includes - with strings", () => {
	const hasHello = includes("hello")
	assertEquals(hasHello(["hello", "world"]), true)
	assertEquals(hasHello(["Hello", "world"]), false) // case sensitive
})

Deno.test("includes - with booleans", () => {
	const hasTrue = includes(true)
	assertEquals(hasTrue([true, false]), true)
	assertEquals(hasTrue([false, false]), false)
	const hasTrueGeneric = includes(true as unknown)
	assertEquals(hasTrueGeneric([1, 0] as Array<unknown>), false) // strict equality
})

Deno.test("includes - with mixed types", () => {
	const hasThree = includes(3 as unknown)
	assertEquals(hasThree([1, "3", 3, true] as Array<unknown>), true)
	assertEquals(hasThree([1, "3", true] as Array<unknown>), false)
})

Deno.test("includes - with large arrays", () => {
	const arr = Array.from({ length: 10000 }, (_, i) => i)
	assertEquals(includes(9999)(arr), true)
	assertEquals(includes(10000)(arr), false)
})

// Property-based tests
Deno.test("includes - property: element in array returns true", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(arr, elem) => {
				const arrWithElem = [...arr, elem]
				return includes(elem)(arrWithElem) === true
			}
		)
	)
})

Deno.test("includes - property: element not in array returns false", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 0, max: 100 })),
			(arr) => {
				// Use an element guaranteed not to be in the array
				const notInArray = -1
				return includes(notInArray)(arr) === false
			}
		)
	)
})

Deno.test("includes - property: consistent with indexOf for non-zero values", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 1 })), // Avoid -0/+0 distinction
			fc.integer({ min: 1 }),
			(arr, elem) => {
				const hasElem = includes(elem)(arr)
				const ourIndexOf = indexOf(elem)(arr)
				// includes returns true if indexOf finds it
				return hasElem === (ourIndexOf !== undefined)
			}
		)
	)
})

Deno.test("includes - property: currying preserves behavior", () => {
	fc.assert(
		fc.property(
			fc.array(fc.string()),
			fc.string(),
			(arr, elem) => {
				const curried = includes(elem)
				const direct = arr.includes(elem)
				return curried(arr) === direct
			}
		)
	)
})

Deno.test("includes - handles null and undefined parameters", () => {
	const includesNull = includes(null as unknown as number)
	const includesUndefined = includes(undefined as unknown as number)
	
	assertEquals(includesNull([1, 2, null as unknown as number]), true)
	assertEquals(includesUndefined([1, 2, undefined as unknown as number]), true)
})