import { assertEquals } from "@std/assert"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"

import Left from "./index.ts"

describe("Left", () => {
	it("creates a failed Result with ok: false", () => {
		const result = Left("error")
		assertEquals(result.ok, false)
	})

	it("stores the error in the error property", () => {
		const result = Left("error message")
		if (!result.ok) {
			assertEquals(result.error, "error message")
		}
	})

	it("works with string errors", () => {
		const result = Left("failed")
		assertEquals(result.ok, false)
		if (!result.ok) {
			assertEquals(result.error, "failed")
		}
	})

	it("works with object errors", () => {
		const error = { type: "ValidationError", message: "Invalid input" }
		const result = Left(error)
		assertEquals(result.ok, false)
		if (!result.ok) {
			assertEquals(result.error, error)
		}
	})

	it("works with Error objects", () => {
		const error = new Error("Something went wrong")
		const result = Left(error)
		assertEquals(result.ok, false)
		if (!result.ok) {
			assertEquals(result.error, error)
		}
	})

	it("works with number errors", () => {
		const result = Left(404)
		assertEquals(result.ok, false)
		if (!result.ok) {
			assertEquals(result.error, 404)
		}
	})

	it("works with array errors", () => {
		const errors = ["error1", "error2"]
		const result = Left(errors)
		assertEquals(result.ok, false)
		if (!result.ok) {
			assertEquals(result.error, errors)
		}
	})

	it("works with null as error", () => {
		const result = Left(null)
		assertEquals(result.ok, false)
		if (!result.ok) {
			assertEquals(result.error, null)
		}
	})

	it("works with undefined as error", () => {
		const result = Left(undefined)
		assertEquals(result.ok, false)
		if (!result.ok) {
			assertEquals(result.error, undefined)
		}
	})

	it("creates result object with correct structure", () => {
		const result = Left("error")
		assertEquals(typeof result, "object")
		assertEquals("ok" in result, true)
		assertEquals("error" in result, true)
		assertEquals("value" in result, false)
	})
})
