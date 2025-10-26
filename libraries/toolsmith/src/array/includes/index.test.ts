import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import includes from "./index.ts"

Deno.test("includes", async function includesTests(t) {
	await t.step(
		"returns true when item is in array",
		function returnsTrueWhenInArray() {
			const result = includes([1, 2, 3, 4, 5])(3)

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns false when item is not in array",
		function returnsFalseWhenNotInArray() {
			const result = includes([1, 2, 3, 4, 5])(6)

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns true when string is in array",
		function returnsTrueForString() {
			const result = includes(["hello", "world"])("hello")

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns false for empty array",
		function returnsFalseForEmptyArray() {
			const result = includes([])(1)

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns true when null is in array",
		function returnsTrueForNull() {
			const array: ReadonlyArray<number | null> = [1, null, 3]
			const result = includes(array)(null)

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true when undefined is in array",
		function returnsTrueForUndefined() {
			const array: ReadonlyArray<number | undefined> = [1, undefined, 3]
			const result = includes(array)(undefined)

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns false when null is not in array",
		function returnsFalseForNullNotInArray() {
			const array: ReadonlyArray<number> = [1, 2, 3]
			const result = includes(array)(null as never)

			assertEquals(result, false)
		},
	)

	await t.step(
		"is properly curried",
		function properlyCurried() {
			const arrayIncludes = includes([1, 2, 3, 4, 5])

			assertEquals(arrayIncludes(3), true)
			assertEquals(arrayIncludes(6), false)
			assertEquals(arrayIncludes(1), true)
		},
	)

	await t.step(
		"handles object comparisons by reference",
		function handlesObjectsByReference() {
			const obj1 = { id: 1 }
			const obj2 = { id: 2 }
			const obj3 = { id: 1 }

			const result1 = includes([obj1, obj2])(obj1)
			const result2 = includes([obj1, obj2])(obj3)

			assertEquals(result1, true)
			assertEquals(result2, false)
		},
	)

	await t.step(
		"handles boolean values",
		function handlesBooleans() {
			const result1 = includes([true, false])(true)
			const result2 = includes([true, false])(false)
			const result3 = includes([true])(false)

			assertEquals(result1, true)
			assertEquals(result2, true)
			assertEquals(result3, false)
		},
	)
})

Deno.test("includes - property: item in array returns true", function itemInArrayReturnsTrue() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			function propertyItemInArray(arr, item) {
				const arrayWithItem = [...arr, item]
				const result = includes(arrayWithItem)(item)

				assertEquals(result, true)
			},
		),
	)
})

Deno.test("includes - property: always returns boolean", function alwaysReturnsBoolean() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			function propertyReturnsBoolean(arr, item) {
				const result = includes(arr)(item)

				assertEquals(typeof result, "boolean")
			},
		),
	)
})

Deno.test("includes - property: empty array always returns false", function emptyArrayReturnsFalse() {
	fc.assert(
		fc.property(
			fc.integer(),
			function propertyEmptyArrayFalse(item) {
				const result = includes([])(item)

				assertEquals(result, false)
			},
		),
	)
})

Deno.test("includes - property: curried partial application works", function curriedPartialWorks() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			fc.integer(),
			function propertyCurriedWorks(arr, item1, item2) {
				const arrayIncludes = includes(arr)
				const result1 = arrayIncludes(item1)
				const result2 = arrayIncludes(item2)

				assertEquals(result1, arr.includes(item1))
				assertEquals(result2, arr.includes(item2))
			},
		),
	)
})
