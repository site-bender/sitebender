import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import hasValue from "./index.ts"

Deno.test("hasValue", async function hasValueTests(t) {
	await t.step(
		"returns true when value exists in object",
		function returnsTrueWhenValueExists() {
			const obj = { name: "Alice", age: 30 }
			const result = hasValue(obj)("Alice")

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns false when value does not exist",
		function returnsFalseWhenValueDoesNotExist() {
			const obj = { name: "Alice", age: 30 }
			const result = hasValue(obj)("Bob")

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns true when number value exists",
		function returnsTrueForNumber() {
			const obj = { a: 1, b: 2, c: 3 }
			const result = hasValue(obj)(2)

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns false for empty object",
		function returnsFalseForEmptyObject() {
			const obj = {}
			const result = hasValue(obj)("any")

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns true when null value exists",
		function returnsTrueWhenNull() {
			const obj = { key: null }
			const result = hasValue(obj)(null)

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true when undefined value exists",
		function returnsTrueWhenUndefined() {
			const obj = { key: undefined }
			const result = hasValue(obj)(undefined)

			assertEquals(result, true)
		},
	)

	await t.step(
		"is properly curried",
		function properlyCurried() {
			const obj = { a: 1, b: 2, c: 3 }
			const objectHasValue = hasValue(obj)

			assertEquals(objectHasValue(1), true)
			assertEquals(objectHasValue(2), true)
			assertEquals(objectHasValue(4), false)
		},
	)

	await t.step(
		"returns true for duplicate values",
		function returnsTrueForDuplicates() {
			const obj = { a: "same", b: "same", c: "different" }
			const result = hasValue(obj)("same")

			assertEquals(result, true)
		},
	)

	await t.step(
		"handles boolean values",
		function handlesBooleanValues() {
			const obj = { a: true, b: false }

			const result1 = hasValue(obj)(true)
			const result2 = hasValue(obj)(false)

			assertEquals(result1, true)
			assertEquals(result2, true)
		},
	)

	await t.step(
		"compares objects by reference",
		function comparesByReference() {
			const obj1 = { id: 1 }
			const obj2 = { id: 1 }
			const container = { a: obj1 }

			const result1 = hasValue(container)(obj1)
			const result2 = hasValue(container)(obj2)

			assertEquals(result1, true)
			assertEquals(result2, false)
		},
	)

	await t.step(
		"handles zero and empty string",
		function handlesZeroAndEmptyString() {
			const obj = { a: 0, b: "" }

			const result1 = hasValue(obj)(0)
			const result2 = hasValue(obj)("")

			assertEquals(result1, true)
			assertEquals(result2, true)
		},
	)
})

Deno.test("hasValue - property: existing value returns true", function existingValueReturnsTrue() {
	fc.assert(
		fc.property(
			fc.dictionary(fc.string(), fc.integer()),
			function propertyExistingValue(obj) {
				const values = Object.values(obj)
				if (values.length === 0) return

				const value = values[0]
				const result = hasValue(obj)(value)

				assertEquals(result, true)
			},
		),
	)
})

Deno.test("hasValue - property: always returns boolean", function alwaysReturnsBoolean() {
	fc.assert(
		fc.property(
			fc.dictionary(fc.string(), fc.integer()),
			fc.integer(),
			function propertyReturnsBoolean(obj, value) {
				const result = hasValue(obj)(value)

				assertEquals(typeof result, "boolean")
			},
		),
	)
})

Deno.test("hasValue - property: curried partial application works", function curriedPartialWorks() {
	fc.assert(
		fc.property(
			fc.dictionary(fc.string(), fc.integer()),
			fc.integer(),
			fc.integer(),
			function propertyCurriedWorks(obj, value1, value2) {
				const objectHasValue = hasValue(obj)
				const result1 = objectHasValue(value1)
				const result2 = objectHasValue(value2)

				const values = Object.values(obj)
				assertEquals(result1, values.includes(value1))
				assertEquals(result2, values.includes(value2))
			},
		),
	)
})
