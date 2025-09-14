import { assertEquals } from "@std/assert"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"

import Right from "./index.ts"

describe("Right", () => {
	it("creates a successful Result with ok: true", () => {
		const result = Right(42)
		assertEquals(result.ok, true)
	})

	it("stores the value in the value property", () => {
		const result = Right(42)
		if (result.ok) {
			assertEquals(result.value, 42)
		}
	})

	it("works with string values", () => {
		const result = Right("success")
		assertEquals(result.ok, true)
		if (result.ok) {
			assertEquals(result.value, "success")
		}
	})

	it("works with object values", () => {
		const obj = { name: "test", count: 5 }
		const result = Right(obj)
		assertEquals(result.ok, true)
		if (result.ok) {
			assertEquals(result.value, obj)
		}
	})

	it("works with array values", () => {
		const arr = [1, 2, 3]
		const result = Right(arr)
		assertEquals(result.ok, true)
		if (result.ok) {
			assertEquals(result.value, arr)
		}
	})

	it("works with null values", () => {
		const result = Right(null)
		assertEquals(result.ok, true)
		if (result.ok) {
			assertEquals(result.value, null)
		}
	})

	it("works with undefined values", () => {
		const result = Right(undefined)
		assertEquals(result.ok, true)
		if (result.ok) {
			assertEquals(result.value, undefined)
		}
	})

	it("works with boolean values", () => {
		const result = Right(false)
		assertEquals(result.ok, true)
		if (result.ok) {
			assertEquals(result.value, false)
		}
	})

	it("creates result object with correct structure", () => {
		const result = Right(42)
		assertEquals(typeof result, "object")
		assertEquals("ok" in result, true)
		assertEquals("value" in result, true)
		assertEquals("error" in result, false)
	})
})
