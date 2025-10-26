import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import hasKey from "./index.ts"

Deno.test("hasKey", async function hasKeyTests(t) {
	await t.step(
		"returns true when key exists in object",
		function returnsTrueWhenKeyExists() {
			const obj = { name: "Alice", age: 30 }
			const result = hasKey(obj)("name")

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns false when key does not exist",
		function returnsFalseWhenKeyDoesNotExist() {
			const obj = { name: "Alice", age: 30 }
			const result = hasKey(obj)("email")

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns true for numeric string keys",
		function returnsTrueForNumericKeys() {
			const obj = { "0": "zero", "1": "one" }
			const result = hasKey(obj)("0")

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns false for empty object",
		function returnsFalseForEmptyObject() {
			const obj = {}
			const result = hasKey(obj)("anyKey")

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns true when value is null",
		function returnsTrueWhenValueNull() {
			const obj = { key: null }
			const result = hasKey(obj)("key")

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true when value is undefined",
		function returnsTrueWhenValueUndefined() {
			const obj = { key: undefined }
			const result = hasKey(obj)("key")

			assertEquals(result, true)
		},
	)

	await t.step(
		"is properly curried",
		function properlyCurried() {
			const obj = { a: 1, b: 2, c: 3 }
			const objectHasKey = hasKey(obj)

			assertEquals(objectHasKey("a"), true)
			assertEquals(objectHasKey("b"), true)
			assertEquals(objectHasKey("d"), false)
		},
	)

	await t.step(
		"does not check prototype chain on plain objects",
		function doesNotCheckPrototype() {
			const parent = { inherited: "value" }
			const obj = { own: "value", ...parent }

			const result1 = hasKey(obj)("own")
			const result2 = hasKey(obj)("inherited")

			assertEquals(result1, true)
			assertEquals(result2, true)
		},
	)

	await t.step(
		"returns false for objects with custom prototypes",
		function returnsFalseForCustomPrototypes() {
			const obj = Object.create({ inherited: "value" })
			obj.own = "value"

			const result1 = hasKey(obj)("own")
			const result2 = hasKey(obj)("inherited")

			assertEquals(result1, false)
			assertEquals(result2, false)
		},
	)

	await t.step(
		"handles special characters in keys",
		function handlesSpecialCharacters() {
			const obj = { "key-with-dash": 1, "key.with.dot": 2 }

			const result1 = hasKey(obj)("key-with-dash")
			const result2 = hasKey(obj)("key.with.dot")

			assertEquals(result1, true)
			assertEquals(result2, true)
		},
	)

	await t.step(
		"handles empty string key",
		function handlesEmptyStringKey() {
			const obj = { "": "empty key" }
			const result = hasKey(obj)("")

			assertEquals(result, true)
		},
	)
})

Deno.test("hasKey - property: existing key returns true", function existingKeyReturnsTrue() {
	fc.assert(
		fc.property(
			fc.dictionary(fc.string(), fc.anything()),
			function propertyExistingKey(obj) {
				const keys = Object.keys(obj)
				if (keys.length === 0) return

				const key = keys[0]
				const result = hasKey(obj)(key)

				assertEquals(result, true)
			},
		),
	)
})

Deno.test("hasKey - property: always returns boolean", function alwaysReturnsBoolean() {
	fc.assert(
		fc.property(
			fc.dictionary(fc.string(), fc.anything()),
			fc.string(),
			function propertyReturnsBoolean(obj, key) {
				const result = hasKey(obj)(key)

				assertEquals(typeof result, "boolean")
			},
		),
	)
})

Deno.test("hasKey - property: curried partial application works", function curriedPartialWorks() {
	fc.assert(
		fc.property(
			fc.dictionary(fc.string(), fc.anything()),
			fc.string(),
			fc.string(),
			function propertyCurriedWorks(obj, key1, key2) {
				const objectHasKey = hasKey(obj)
				const result1 = objectHasKey(key1)
				const result2 = objectHasKey(key2)

				assertEquals(result1, Object.hasOwn(obj, key1))
				assertEquals(result2, Object.hasOwn(obj, key2))
			},
		),
	)
})
