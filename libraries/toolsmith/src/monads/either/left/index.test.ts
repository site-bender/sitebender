import { assertEquals } from "@std/assert"

import left from "./index.ts"

Deno.test("left", async function leftTests(t) {
	await t.step("creates a Left with string value", function createsLeftString() {
		const result = left("error message")

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left, "error message")
		}
	})

	await t.step("creates a Left with number value", function createsLeftNumber() {
		const result = left(42)

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left, 42)
		}
	})

	await t.step("creates a Left with object value", function createsLeftObject() {
		const error = { field: "email", message: "Invalid format" }
		const result = left(error)

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left, error)
		}
	})

	await t.step("creates a Left with null value", function createsLeftNull() {
		const result = left(null)

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left, null)
		}
	})

	await t.step("creates a Left with undefined value", function createsLeftUndefined() {
		const result = left(undefined)

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left, undefined)
		}
	})

	await t.step("creates a Left with array value", function createsLeftArray() {
		const errors = ["error1", "error2", "error3"]
		const result = left(errors)

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left, errors)
		}
	})

	await t.step("preserves type information", function preservesTypes() {
		const result = left<string, number>("type error")

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left, "type error")
		}
		// TypeScript should infer Either<string, number>
	})

	await t.step("works with complex error types", function complexErrorTypes() {
		interface ValidationError {
			field: string
			message: string
			code: number
		}

		const error: ValidationError = {
			field: "username",
			message: "Already taken",
			code: 409
		}

		const result = left<ValidationError, string>(error)

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left.field, "username")
			assertEquals(result.left.message, "Already taken")
			assertEquals(result.left.code, 409)
		}
	})
})
