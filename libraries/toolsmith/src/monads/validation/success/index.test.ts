import { assertEquals } from "@std/assert"

import isValid from "../isValid/index.ts"
// removed unused ValidationError type import

import valid from "./index.ts"

Deno.test("valid - creates Valid instances", async (t) => {
	await t.step("should create valid instance with number", () => {
		const result = valid(42)

		assertEquals(result._tag, "Valid")
		assertEquals(isValid(result), true)

		if (isValid(result)) {
			assertEquals(result.value, 42)
		}
	})

	await t.step("should create valid instance with string", () => {
		const result = valid("hello")

		assertEquals(result._tag, "Valid")
		assertEquals(isValid(result), true)

		if (isValid(result)) {
			assertEquals(result.value, "hello")
		}
	})

	await t.step("should create valid instance with object", () => {
		const data = { id: 1, name: "Alice" }
		const result = valid(data)

		assertEquals(result._tag, "Valid")
		assertEquals(isValid(result), true)

		if (isValid(result)) {
			assertEquals(result.value, data)
		}
	})

	await t.step("should create valid instance with array", () => {
		const data = [1, 2, 3]
		const result = valid(data)

		assertEquals(result._tag, "Valid")
		assertEquals(isValid(result), true)

		if (isValid(result)) {
			assertEquals(result.value, data)
		}
	})

	await t.step("should create valid instance with null", () => {
		const result = valid(null)

		assertEquals(result._tag, "Valid")
		assertEquals(isValid(result), true)

		if (isValid(result)) {
			assertEquals(result.value, null)
		}
	})

	await t.step("should create valid instance with undefined", () => {
		const result = valid(undefined)

		assertEquals(result._tag, "Valid")
		assertEquals(isValid(result), true)

		if (isValid(result)) {
			assertEquals(result.value, undefined)
		}
	})
})
