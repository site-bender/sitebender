import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import type ValidationError from "../../../types/ValidationError/index.ts"

import valid from "./index.ts"
import isValid from "../isValid/index.ts"

Deno.test("valid - creates Valid instances", async (t) => {
	await t.step("should create valid instance with number", () => {
		const result = valid(42)
		assertEquals(result._tag, "Valid")
		assertEquals(result.value, 42)
		assertEquals(isValid(result), true)
	})

	await t.step("should create valid instance with string", () => {
		const result = valid("hello")
		assertEquals(result._tag, "Valid")
		assertEquals(result.value, "hello")
		assertEquals(isValid(result), true)
	})

	await t.step("should create valid instance with object", () => {
		const data = { id: 1, name: "Alice" }
		const result = valid(data)
		assertEquals(result._tag, "Valid")
		assertEquals(result.value, data)
		assertEquals(isValid(result), true)
	})

	await t.step("should create valid instance with array", () => {
		const data = [1, 2, 3]
		const result = valid(data)
		assertEquals(result._tag, "Valid")
		assertEquals(result.value, data)
		assertEquals(isValid(result), true)
	})

	await t.step("should create valid instance with null", () => {
		const result = valid(null)
		assertEquals(result._tag, "Valid")
		assertEquals(result.value, null)
		assertEquals(isValid(result), true)
	})

	await t.step("should create valid instance with undefined", () => {
		const result = valid(undefined)
		assertEquals(result._tag, "Valid")
		assertEquals(result.value, undefined)
		assertEquals(isValid(result), true)
	})
})