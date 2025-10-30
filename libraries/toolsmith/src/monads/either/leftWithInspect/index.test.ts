import { assertEquals } from "@std/assert"

import leftWithInspect from "./index.ts"

Deno.test("leftWithInspect", async (t) => {
	await t.step("creates Left with _tag", () => {
		const result = leftWithInspect<string, number>("error")

		assertEquals(result._tag, "Left")
	})

	await t.step("stores error value in left property", () => {
		const result = leftWithInspect<string, number>("error message")

		if (result._tag === "Left") {
			assertEquals(result.left, "error message")
		}
	})

	await t.step("handles string errors", () => {
		const result = leftWithInspect<string, number>("simple error")

		if (result._tag === "Left") {
			assertEquals(result.left, "simple error")
		}
	})

	await t.step("handles Error instances", () => {
		const error = new Error("Something went wrong")
		const result = leftWithInspect<Error, number>(error)

		if (result._tag === "Left") {
			assertEquals(result.left.message, "Something went wrong")
		}
	})

	await t.step("handles null values", () => {
		const result = leftWithInspect<null, number>(null)

		if (result._tag === "Left") {
			assertEquals(result.left, null)
		}
	})

	await t.step("handles undefined values", () => {
		const result = leftWithInspect<undefined, number>(undefined)

		if (result._tag === "Left") {
			assertEquals(result.left, undefined)
		}
	})

	await t.step("handles numeric errors", () => {
		const result = leftWithInspect<number, string>(404)

		if (result._tag === "Left") {
			assertEquals(result.left, 404)
		}
	})

	await t.step("handles complex object errors", () => {
		type ValidationError = {
			readonly field: string
			readonly message: string
			readonly code: number
		}

		const error: ValidationError = {
			field: "email",
			message: "Invalid format",
			code: 400,
		}

		const result = leftWithInspect<ValidationError, string>(error)

		if (result._tag === "Left") {
			assertEquals(result.left.field, "email")
			assertEquals(result.left.message, "Invalid format")
			assertEquals(result.left.code, 400)
		}
	})

	await t.step("handles array errors", () => {
		const errors = ["error1", "error2", "error3"]
		const result = leftWithInspect<Array<string>, number>(errors)

		if (result._tag === "Left") {
			assertEquals(result.left.length, 3)
			assertEquals(result.left[0], "error1")
		}
	})

	await t.step("type parameter A defaults to never", () => {
		const result = leftWithInspect("error")

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left, "error")
		}
	})
})
