import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import is from "./index.ts"

Deno.test("is", async function isTests(t) {
	await t.step(
		"returns true for same values using Object.is",
		function returnsTrueForSameValues() {
			assertEquals(is(42)(42), true)
			assertEquals(is("hello")("hello"), true)
			assertEquals(is(true)(true), true)
			assertEquals(is(false)(false), true)
			assertEquals(is(null)(null), true)
			assertEquals(is(undefined)(undefined), true)
		},
	)

	await t.step(
		"returns true for +0 and +0",
		function returnsTrueForPositiveZeros() {
			assertEquals(is(+0)(+0), true)
		},
	)

	await t.step(
		"returns true for -0 and -0",
		function returnsTrueForNegativeZeros() {
			assertEquals(is(-0)(-0), true)
		},
	)

	await t.step(
		"returns false for +0 and -0",
		function returnsFalseForDifferentZeros() {
			assertEquals(is(+0)(-0), false)
			assertEquals(is(-0)(+0), false)
		},
	)

	await t.step(
		"returns true for NaN and NaN",
		function returnsTrueForNaNs() {
			assertEquals(is(NaN)(NaN), true)
		},
	)

	await t.step(
		"returns false for different values",
		function returnsFalseForDifferentValues() {
			assertEquals(is(42)(43), false)
			assertEquals(is("hello")("world"), false)
			assertEquals(is(true)(false), false)
			assertEquals(is(null)(undefined), false)
		},
	)

	await t.step(
		"returns false for different object instances",
		function returnsFalseForDifferentObjects() {
			const obj1 = { a: 1 }
			const obj2 = { a: 1 }
			assertEquals(is(obj1)(obj2), false)
		},
	)

	await t.step(
		"returns true for same object reference",
		function returnsTrueForSameObjectReference() {
			const obj = { a: 1 }
			assertEquals(is(obj)(obj), true)
		},
	)

	await t.step(
		"is curried",
		function isCurried() {
			const isFortyTwo = is(42)
			assertEquals(isFortyTwo(42), true)
			assertEquals(isFortyTwo(43), false)
		},
	)
})

Deno.test("is - property: reflexive (value is itself)", function reflexive() {
	fc.assert(
		fc.property(
			fc.anything(),
			function propertyReflexive(value) {
				assertEquals(is(value)(value), true)
			},
		),
	)
})

Deno.test("is - property: symmetric (if a is b, then b is a)", function symmetric() {
	fc.assert(
		fc.property(
			fc.anything(),
			fc.anything(),
			function propertySymmetric(a, b) {
				assertEquals(is(a)(b), is(b)(a))
			},
		),
	)
})
