import { assertEquals } from "@std/assert"

import nothing from "./index.ts"

Deno.test("nothing", async function nothingTests(t) {
	await t.step("creates a Nothing value", function createsNothing() {
		const result = nothing()

		assertEquals(result._tag, "Nothing")
		assertEquals(Object.keys(result), ["_tag"])
	})

	await t.step("has no value property", function hasNoValueProperty() {
		const result = nothing()

		assertEquals(result._tag, "Nothing")
		assertEquals("value" in result, false)
	})

	await t.step("works with type parameters", function typeParameters() {
		const nothingString = nothing<string>()
		const nothingNumber = nothing<number>()
		const nothingObject = nothing<{ id: number }>()

		assertEquals(nothingString._tag, "Nothing")
		assertEquals(nothingNumber._tag, "Nothing")
		assertEquals(nothingObject._tag, "Nothing")
	})

	await t.step("all Nothing values are structurally equal", function structuralEquality() {
		const nothing1 = nothing()
		const nothing2 = nothing()
		const nothing3 = nothing<string>()
		const nothing4 = nothing<number>()

		assertEquals(nothing1, nothing2)
		assertEquals(nothing1, nothing3)
		assertEquals(nothing1, nothing4)
		assertEquals(nothing3, nothing4)
	})

	await t.step("can be used in array of Maybe", function arrayOfMaybe() {
		const values = [
			nothing(),
			nothing<number>(),
			nothing<string>()
		]

		assertEquals(values.every(v => v._tag === "Nothing"), true)
		assertEquals(values.length, 3)
	})

	await t.step("consistent object shape", function objectShape() {
		const result = nothing()

		assertEquals(typeof result, "object")
		assertEquals(result !== null, true)
		assertEquals(result._tag, "Nothing")
		assertEquals(Object.getOwnPropertyNames(result), ["_tag"])
	})

	await t.step("base structure", function baseStructure() {
		const result = nothing()

		// Check initial structure
		assertEquals(result._tag, "Nothing")
		assertEquals("value" in result, false)

		// Note: Objects in JavaScript are mutable by default unless frozen
		// The Nothing function returns a plain object that can be mutated
		// This is expected behavior unless the implementation uses Object.freeze
	})

	await t.step("JSON serialization", function jsonSerialization() {
		const result = nothing()
		const json = JSON.stringify(result)
		const parsed = JSON.parse(json)

		assertEquals(parsed._tag, "Nothing")
		assertEquals(Object.keys(parsed), ["_tag"])
	})
})
