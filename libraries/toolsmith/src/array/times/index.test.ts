import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import times from "./index.ts"

//++ Tests for times (function application generator)

Deno.test("times calls function n times", function testTimesBasic() {
	function identity(n: number): number {
		return n
	}

	assertEquals(times(5)(identity), [0, 1, 2, 3, 4])
	assertEquals(times(3)(identity), [0, 1, 2])
	assertEquals(times(1)(identity), [0])
})

Deno.test("times returns empty array for zero", function testTimesZero() {
	function identity(n: number): number {
		return n
	}

	assertEquals(times(0)(identity), [])
})

Deno.test("times returns empty array for negative count", function testTimesNegative() {
	function identity(n: number): number {
		return n
	}

	assertEquals(times(-1)(identity), [])
	assertEquals(times(-100)(identity), [])
})

Deno.test("times passes index to function", function testTimesIndex() {
	function double(n: number): number {
		return n * 2
	}

	assertEquals(times(4)(double), [0, 2, 4, 6])
})

Deno.test("times works with constant function", function testTimesConstant() {
	function constant(_n: number): string {
		return "x"
	}

	assertEquals(times(5)(constant), ["x", "x", "x", "x", "x"])
})

Deno.test("times works with complex transformations", function testTimesComplex() {
	function square(n: number): number {
		return n * n
	}

	assertEquals(times(5)(square), [0, 1, 4, 9, 16])
})

Deno.test("times works with string generation", function testTimesStrings() {
	function indexToLetter(n: number): string {
		return String.fromCharCode(65 + n)
	}

	assertEquals(times(5)(indexToLetter), ["A", "B", "C", "D", "E"])
})

Deno.test("times works with object generation", function testTimesObjects() {
	function createObject(n: number): { id: number } {
		return { id: n }
	}

	const result = times(3)(createObject)
	assertEquals(result, [{ id: 0 }, { id: 1 }, { id: 2 }])
})

Deno.test("times handles NaN", function testTimesNaN() {
	function identity(n: number): number {
		return n
	}

	assertEquals(times(NaN)(identity), [])
})

Deno.test("times handles Infinity", function testTimesInfinity() {
	function identity(n: number): number {
		return n
	}

	assertEquals(times(Infinity)(identity), [])
	assertEquals(times(-Infinity)(identity), [])
})

Deno.test("times truncates decimal to integer", function testTimesDecimal() {
	function identity(n: number): number {
		return n
	}

	assertEquals(times(3.7)(identity), [0, 1, 2])
	assertEquals(times(5.2)(identity), [0, 1, 2, 3, 4])
	assertEquals(times(2.9)(identity), [0, 1])
})

Deno.test("times handles large counts", function testTimesLarge() {
	function identity(n: number): number {
		return n
	}

	const result = times(10000)(identity)
	assertEquals(result.length, 10000)
	assertEquals(result[0], 0)
	assertEquals(result[9999], 9999)
})

//++ Property-based tests

Deno.test("times property: result length equals n when positive", function testTimesPropertyLength() {
	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 1000 }),
			function testLength(n) {
				function identity(x: number): number {
					return x
				}

				const result = times(n)(identity)
				return result.length === n
			},
		),
	)
})

Deno.test("times property: function called with correct indices", function testTimesPropertyIndices() {
	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 100 }),
			function testIndices(n) {
				function identity(x: number): number {
					return x
				}

				const result = times(n)(identity)

				function checkIndices(index: number): boolean {
					if (index >= n) {
						return true
					}
					if (result[index] !== index) {
						return false
					}
					return checkIndices(index + 1)
				}

				return checkIndices(0)
			},
		),
	)
})

Deno.test("times property: empty array for non-positive n", function testTimesPropertyEmpty() {
	fc.assert(
		fc.property(
			fc.integer({ min: -1000, max: 0 }),
			function testEmpty(n) {
				function identity(x: number): number {
					return x
				}

				const result = times(n)(identity)
				return result.length === 0
			},
		),
	)
})

Deno.test("times property: truncates decimals correctly", function testTimesPropertyTruncate() {
	fc.assert(
		fc.property(
			fc.double({ min: 1, max: 100, noNaN: true }),
			function testTruncate(n) {
				function identity(x: number): number {
					return x
				}

				const result = times(n)(identity)
				const expected = Math.floor(n)
				return result.length === expected
			},
		),
	)
})

Deno.test("times property: all elements derived from function", function testTimesPropertyDerived() {
	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 50 }),
			function testDerived(n) {
				function double(x: number): number {
					return x * 2
				}

				const result = times(n)(double)

				function checkDerived(index: number): boolean {
					if (index >= n) {
						return true
					}
					if (result[index] !== index * 2) {
						return false
					}
					return checkDerived(index + 1)
				}

				return checkDerived(0)
			},
		),
	)
})

Deno.test("times property: starts at index 0", function testTimesPropertyStartsAtZero() {
	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 100 }),
			function testStartsAtZero(n) {
				function identity(x: number): number {
					return x
				}

				const result = times(n)(identity)
				return result[0] === 0
			},
		),
	)
})
