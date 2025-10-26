import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import includes from "./index.ts"

Deno.test("includes", async function includesTests(t) {
	await t.step(
		"returns true when item is in set",
		function returnsTrueWhenInSet() {
			const set = new Set([1, 2, 3, 4, 5])
			const result = includes(set)(3)

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns false when item is not in set",
		function returnsFalseWhenNotInSet() {
			const set = new Set([1, 2, 3, 4, 5])
			const result = includes(set)(6)

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns true when string is in set",
		function returnsTrueForString() {
			const set = new Set(["hello", "world"])
			const result = includes(set)("hello")

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns false for empty set",
		function returnsFalseForEmptySet() {
			const set = new Set()
			const result = includes(set)(1)

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns true when null is in set",
		function returnsTrueForNull() {
			const set: ReadonlySet<number | null> = new Set([1, null, 3])
			const result = includes(set)(null)

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true when undefined is in set",
		function returnsTrueForUndefined() {
			const set: ReadonlySet<number | undefined> = new Set([1, undefined, 3])
			const result = includes(set)(undefined)

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns false when null is not in set",
		function returnsFalseForNullNotInSet() {
			const set: ReadonlySet<number> = new Set([1, 2, 3])
			const result = includes(set)(null as never)

			assertEquals(result, false)
		},
	)

	await t.step(
		"is properly curried",
		function properlyCurried() {
			const set = new Set([1, 2, 3, 4, 5])
			const setIncludes = includes(set)

			assertEquals(setIncludes(3), true)
			assertEquals(setIncludes(6), false)
			assertEquals(setIncludes(1), true)
		},
	)

	await t.step(
		"handles object comparisons by reference",
		function handlesObjectsByReference() {
			const obj1 = { id: 1 }
			const obj2 = { id: 2 }
			const obj3 = { id: 1 }
			const set = new Set([obj1, obj2])

			const result1 = includes(set)(obj1)
			const result2 = includes(set)(obj3)

			assertEquals(result1, true)
			assertEquals(result2, false)
		},
	)

	await t.step(
		"handles boolean values",
		function handlesBooleans() {
			const set = new Set([true, false])

			const result1 = includes(set)(true)
			const result2 = includes(set)(false)

			assertEquals(result1, true)
			assertEquals(result2, true)
		},
	)

	await t.step(
		"handles ReadonlySet type",
		function handlesReadonlySet() {
			const set: ReadonlySet<number> = new Set([1, 2, 3])
			const result = includes(set)(2)

			assertEquals(result, true)
		},
	)
})

Deno.test("includes - property: item in set returns true", function itemInSetReturnsTrue() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			function propertyItemInSet(arr, item) {
				const set = new Set([...arr, item])
				const result = includes(set)(item)

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
				const set = new Set(arr)
				const result = includes(set)(item)

				assertEquals(typeof result, "boolean")
			},
		),
	)
})

Deno.test("includes - property: empty set always returns false", function emptySetReturnsFalse() {
	fc.assert(
		fc.property(
			fc.integer(),
			function propertyEmptySetFalse(item) {
				const set = new Set()
				const result = includes(set)(item)

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
				const set = new Set(arr)
				const setIncludes = includes(set)
				const result1 = setIncludes(item1)
				const result2 = setIncludes(item2)

				assertEquals(result1, set.has(item1))
				assertEquals(result2, set.has(item2))
			},
		),
	)
})
