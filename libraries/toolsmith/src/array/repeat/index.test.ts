import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import repeat from "./index.ts"

//++ Tests for repeat (array value repetition)

Deno.test("repeat returns empty array for zero count", function testRepeatZero() {
	assertEquals(repeat(0)("x"), [])
	assertEquals(repeat(0)(42), [])
})

Deno.test("repeat returns empty array for negative counts", function testRepeatNegative() {
	assertEquals(repeat(-1)("x"), [])
	assertEquals(repeat(-100)(42), [])
})

Deno.test("repeat repeats string values", function testRepeatStrings() {
	assertEquals(repeat(3)("a"), ["a", "a", "a"])
	assertEquals(repeat(1)("hello"), ["hello"])
	assertEquals(repeat(5)("x"), ["x", "x", "x", "x", "x"])
})

Deno.test("repeat repeats number values", function testRepeatNumbers() {
	assertEquals(repeat(2)(42), [42, 42])
	assertEquals(repeat(4)(0), [0, 0, 0, 0])
	assertEquals(repeat(3)(-7), [-7, -7, -7])
})

Deno.test("repeat repeats boolean values", function testRepeatBooleans() {
	assertEquals(repeat(2)(true), [true, true])
	assertEquals(repeat(3)(false), [false, false, false])
})

Deno.test("repeat preserves reference for objects", function testRepeatObjects() {
	const obj = { a: 1 }
	const arr = repeat(2)(obj)
	assertEquals(arr[0], obj)
	assertEquals(arr[1], obj)
	assertEquals(arr.length, 2)
})

Deno.test("repeat preserves reference for arrays", function testRepeatArrays() {
	const innerArray = [1, 2, 3]
	const result = repeat(3)(innerArray)
	assertEquals(result[0], innerArray)
	assertEquals(result[1], innerArray)
	assertEquals(result[2], innerArray)
})

Deno.test("repeat handles null and undefined", function testRepeatNullish() {
	assertEquals(repeat(2)(null), [null, null])
	assertEquals(repeat(3)(undefined), [undefined, undefined, undefined])
})

Deno.test("repeat handles large counts", function testRepeatLarge() {
	const result = repeat(10000)(42)
	assertEquals(result.length, 10000)
	assertEquals(result[0], 42)
	assertEquals(result[9999], 42)
})

Deno.test("repeat handles single item", function testRepeatSingle() {
	assertEquals(repeat(1)("x"), ["x"])
	assertEquals(repeat(1)(42), [42])
})

//++ Property-based tests

Deno.test("repeat property: result length equals count when positive", function testRepeatPropertyLength() {
	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 1000 }),
			fc.anything(),
			function testLength(count, item) {
				const result = repeat(count)(item)
				return result.length === count
			},
		),
	)
})

Deno.test("repeat property: all elements are identical", function testRepeatPropertyIdentical() {
	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 100 }),
			fc.anything(),
			function testIdentical(count, item) {
				const result = repeat(count)(item)

				function checkAllIdentical(index: number): boolean {
					if (index >= result.length) {
						return true
					}

					const resultItem = result[index]

					if (Number.isNaN(item) && Number.isNaN(resultItem)) {
						return checkAllIdentical(index + 1)
					}

					if (resultItem !== item) {
						return false
					}

					return checkAllIdentical(index + 1)
				}

				return checkAllIdentical(0)
			},
		),
	)
})

Deno.test("repeat property: empty array for non-positive count", function testRepeatPropertyEmpty() {
	fc.assert(
		fc.property(
			fc.integer({ min: -1000, max: 0 }),
			fc.anything(),
			function testEmpty(count, item) {
				const result = repeat(count)(item)
				return result.length === 0
			},
		),
	)
})

Deno.test("repeat property: objects share same reference", function testRepeatPropertyReference() {
	fc.assert(
		fc.property(
			fc.integer({ min: 2, max: 50 }),
			function testReference(count) {
				const obj = { value: 42 }
				const result = repeat(count)(obj)

				function checkAllSameReference(index: number): boolean {
					if (index >= result.length) {
						return true
					}
					if (result[index] !== obj) {
						return false
					}
					return checkAllSameReference(index + 1)
				}

				return checkAllSameReference(0)
			},
		),
	)
})
