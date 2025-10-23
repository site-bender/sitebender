import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isArray from "./index.ts"

Deno.test("isArray", async function isArrayTests(t) {
	await t.step(
		"returns true for arrays",
		function returnsTrueForArrays() {
			assertEquals(isArray([]), true)
			assertEquals(isArray([1, 2, 3]), true)
			assertEquals(isArray(["a", "b", "c"]), true)
			assertEquals(isArray([null, undefined]), true)
			assertEquals(isArray([{}, []]), true)
			assertEquals(isArray([[1, 2], [3, 4]]), true)
			assertEquals(isArray(new Array(5)), true)
			assertEquals(isArray(Array.from({ length: 3 })), true)
		},
	)

	await t.step(
		"returns false for array-like objects",
		function returnsFalseForArrayLike() {
			// Arguments object would be array-like but not an array
			const arrayLike = { 0: "a", 1: "b", length: 2 }
			assertEquals(isArray(arrayLike), false)

			// String is array-like but not an array
			assertEquals(isArray("abc"), false)
		},
	)

	await t.step(
		"returns false for primitives",
		function returnsFalseForPrimitives() {
			assertEquals(isArray(0), false)
			assertEquals(isArray(1), false)
			assertEquals(isArray(""), false)
			assertEquals(isArray("hello"), false)
			assertEquals(isArray(true), false)
			assertEquals(isArray(false), false)
			assertEquals(isArray(null), false)
			assertEquals(isArray(undefined), false)
			assertEquals(isArray(NaN), false)
			assertEquals(isArray(Infinity), false)
		},
	)

	await t.step(
		"returns false for objects",
		function returnsFalseForObjects() {
			assertEquals(isArray({}), false)
			assertEquals(isArray({ 0: 1, 1: 2, length: 2 }), false)
			assertEquals(isArray({ key: "value" }), false)
			assertEquals(isArray(new Date()), false)
			assertEquals(isArray(/regex/), false)
			assertEquals(isArray(new Set([1, 2, 3])), false)
			assertEquals(isArray(new Map([[1, 2]])), false)
		},
	)

	await t.step(
		"works as type guard",
		function typeGuard() {
			const value: Array<number> | string = [1, 2, 3]

			if (isArray(value)) {
				// TypeScript knows value is Array here
				assertEquals(value.length, 3)
				assertEquals(value[0], 1)
			}

			const stringValue: Array<number> | string = "hello"

			if (!isArray(stringValue)) {
				// TypeScript knows stringValue is string here
				assertEquals(stringValue.length, 5)
			}
		},
	)

	await t.step("works with nested filter", function nestedFilter() {
		const values = [
			[1, 2],
			"not array",
			[3, 4],
			42,
			[5, 6],
			null,
		]
		const arrays = values.filter(isArray)

		assertEquals(arrays.length, 3)
		assertEquals(arrays, [[1, 2], [3, 4], [5, 6]])
	})

	await t.step("works with array some/every", function arraySomeEvery() {
		const allArrays = [
			[1],
			[2],
			[3],
		]
		const someArrays = [
			[1],
			"not array",
			[3],
			42,
		]
		const noArrays = [1, "test", true, {}, null]

		assertEquals(allArrays.every(isArray), true)
		assertEquals(someArrays.every(isArray), false)
		assertEquals(noArrays.every(isArray), false)

		assertEquals(allArrays.some(isArray), true)
		assertEquals(someArrays.some(isArray), true)
		assertEquals(noArrays.some(isArray), false)
	})

	await t.step(
		"handles typed arrays",
		function typedArrays() {
			// TypedArrays are not regular arrays
			assertEquals(isArray(new Int8Array()), false)
			assertEquals(isArray(new Uint8Array()), false)
			assertEquals(isArray(new Int16Array()), false)
			assertEquals(isArray(new Uint16Array()), false)
			assertEquals(isArray(new Int32Array()), false)
			assertEquals(isArray(new Uint32Array()), false)
			assertEquals(isArray(new Float32Array()), false)
			assertEquals(isArray(new Float64Array()), false)

			// But arrays created from typed arrays are arrays
			const typedArray = new Uint8Array([1, 2, 3])
			const regularArray = Array.from(typedArray)
			assertEquals(isArray(regularArray), true)
		},
	)

	await t.step(
		"handles edge cases",
		function edgeCases() {
			// Empty array
			assertEquals(isArray([]), true)

			// Sparse array
			const sparse = []
			sparse[10] = "value"
			assertEquals(isArray(sparse), true)

			// Array with holes (using delete to create)
			const holes = [1, 2, 3]
			delete holes[1]
			assertEquals(isArray(holes), true)

			// Symbol
			const sym = Symbol("test")
			assertEquals(isArray(sym), false)

			// Function
			const fn = function () {}
			assertEquals(isArray(fn), false)

			// BigInt
			const big = BigInt(9007199254740991)
			assertEquals(isArray(big), false)

			// Array.prototype
			assertEquals(isArray(Array.prototype), true)
		},
	)
})

Deno.test("isArray - property: all arrays return true", function allArraysTrue() {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			function propertyAllArrays(value) {
				assertEquals(isArray(value), true)
			},
		),
	)
})

Deno.test("isArray - property: all non-arrays return false", function nonArraysFalse() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer(),
				fc.string(),
				fc.boolean(),
				fc.float(),
				fc.object(),
				fc.constant(null),
				fc.constant(undefined),
			),
			function propertyNonArrays(value) {
				assertEquals(isArray(value), false)
			},
		),
	)
})

Deno.test("isArray - property: idempotent", function idempotent() {
	fc.assert(
		fc.property(
			fc.anything(),
			function propertyIdempotent(value) {
				const first = isArray(value)
				const second = isArray(value)
				assertEquals(first, second)
			},
		),
	)
})

Deno.test("isArray - property: concat preserves array type", function concatPreservesType() {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.array(fc.anything()),
			function propertyConcatPreserves(a, b) {
				const result = a.concat(b)
				assertEquals(isArray(result), true)
			},
		),
	)
})

Deno.test("isArray - property: map preserves array type", function mapPreservesType() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertyMapPreserves(arr) {
				const result = arr.map(function double(x) {
					return x * 2
				})
				assertEquals(isArray(result), true)
			},
		),
	)
})

Deno.test("isArray - property: filter preserves array type", function filterPreservesType() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertyFilterPreserves(arr) {
				const result = arr.filter(function isEven(x) {
					return x % 2 === 0
				})
				assertEquals(isArray(result), true)
			},
		),
	)
})
