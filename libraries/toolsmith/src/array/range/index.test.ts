import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import range from "./index.ts"

//++ Tests for range (numeric sequence generator)

Deno.test("range generates correct sequence", function testRangeBasic() {
	assertEquals(range(1)(5), [1, 2, 3, 4])
	assertEquals(range(0)(3), [0, 1, 2])
	assertEquals(range(5)(10), [5, 6, 7, 8, 9])
})

Deno.test("range handles zero-length range", function testRangeZeroLength() {
	assertEquals(range(5)(5), [])
})

Deno.test("range handles negative ranges", function testRangeNegative() {
	assertEquals(range(5)(2), [])
	assertEquals(range(10)(0), [])
})

Deno.test("range handles negative start values", function testRangeNegativeStart() {
	assertEquals(range(-5)(0), [-5, -4, -3, -2, -1])
	assertEquals(range(-3)(3), [-3, -2, -1, 0, 1, 2])
})

Deno.test("range handles single element", function testRangeSingle() {
	assertEquals(range(0)(1), [0])
	assertEquals(range(10)(11), [10])
})

Deno.test("range handles NaN values", function testRangeNaN() {
	assertEquals(range(NaN)(5), [])
	assertEquals(range(5)(NaN), [])
	assertEquals(range(NaN)(NaN), [])
})

Deno.test("range handles Infinity values", function testRangeInfinity() {
	assertEquals(range(0)(Infinity), [])
	assertEquals(range(Infinity)(0), [])
	assertEquals(range(-Infinity)(Infinity), [])
})

Deno.test("range handles large ranges", function testRangeLarge() {
	const result = range(0)(10000)
	assertEquals(result.length, 10000)
	assertEquals(result[0], 0)
	assertEquals(result[9999], 9999)
})

//++ Property-based tests

Deno.test("range property: result length equals end - start when valid", function testRangePropertyLength() {
	fc.assert(
		fc.property(
			fc.integer({ min: -1000, max: 1000 }),
			fc.integer({ min: 0, max: 1000 }),
			function testLength(start, delta) {
				const end = start + delta
				const result = range(start)(end)
				return result.length === delta
			},
		),
	)
})

Deno.test("range property: first element equals start", function testRangePropertyFirst() {
	fc.assert(
		fc.property(
			fc.integer({ min: -1000, max: 1000 }),
			fc.integer({ min: 1, max: 1000 }),
			function testFirst(start, delta) {
				const end = start + delta
				const result = range(start)(end)
				return result.length === 0 || result[0] === start
			},
		),
	)
})

Deno.test("range property: last element equals end - 1", function testRangePropertyLast() {
	fc.assert(
		fc.property(
			fc.integer({ min: -1000, max: 1000 }),
			fc.integer({ min: 1, max: 1000 }),
			function testLast(start, delta) {
				const end = start + delta
				const result = range(start)(end)
				return result.length === 0 || result[result.length - 1] === end - 1
			},
		),
	)
})

Deno.test("range property: all elements are consecutive integers", function testRangePropertyConsecutive() {
	fc.assert(
		fc.property(
			fc.integer({ min: -1000, max: 1000 }),
			fc.integer({ min: 1, max: 100 }),
			function testConsecutive(start, delta) {
				const end = start + delta
				const result = range(start)(end)

				if (result.length <= 1) {
					return true
				}

				function checkConsecutive(index: number): boolean {
					if (index >= result.length - 1) {
						return true
					}
					if (result[index + 1] !== result[index] + 1) {
						return false
					}
					return checkConsecutive(index + 1)
				}

				return checkConsecutive(0)
			},
		),
	)
})

Deno.test("range property: empty array for start >= end", function testRangePropertyEmpty() {
	fc.assert(
		fc.property(
			fc.integer({ min: -1000, max: 1000 }),
			fc.integer({ min: -1000, max: 0 }),
			function testEmpty(start, negativeDelta) {
				const end = start + negativeDelta
				const result = range(start)(end)
				return result.length === 0
			},
		),
	)
})

Deno.test("range property: result contains all integers in range", function testRangePropertyContainsAll() {
	fc.assert(
		fc.property(
			fc.integer({ min: -100, max: 100 }),
			fc.integer({ min: 1, max: 50 }),
			function testContainsAll(start, delta) {
				const end = start + delta
				const result = range(start)(end)

				function checkContains(n: number): boolean {
					if (n >= end) {
						return true
					}
					if (!result.includes(n)) {
						return false
					}
					return checkContains(n + 1)
				}

				return checkContains(start)
			},
		),
	)
})
