import { assertEquals } from "@std/assert"

import failure from "../../validation/failure/index.ts"
import success from "../../validation/success/index.ts"
import ioValidation from "./index.ts"

Deno.test("ioValidation", async (t) => {
	await t.step("wraps a thunk returning Validation in IoValidation", () => {
		const computation = ioValidation(() => success(42))
		assertEquals(typeof computation, "function")
		const result = computation()
		assertEquals(result._tag, "Success")
		if (result._tag === "Success") {
			assertEquals(result.value, 42)
		}
	})

	await t.step("creates IoValidation from Success validation", () => {
		const successIo = ioValidation(() => success("success"))
		const result = successIo()
		assertEquals(result._tag, "Success")
		if (result._tag === "Success") {
			assertEquals(result.value, "success")
		}
	})

	await t.step("creates IoValidation from Failure validation", () => {
		const failureIo = ioValidation(() => failure(["error1", "error2"]))
		const result = failureIo()
		assertEquals(result._tag, "Failure")
		if (result._tag === "Failure") {
			assertEquals(result.errors, ["error1", "error2"])
		}
	})

	await t.step("defers computation until executed", () => {
		const computation = ioValidation(() => {
			return success(Math.random())
		})
		const result1 = computation()
		const result2 = computation()

		// Different values because computation runs each time
		assertEquals(result1._tag, "Success")
		assertEquals(result2._tag, "Success")
	})

	await t.step("works with complex Validation types", () => {
		type User = { readonly id: number; readonly name: string }
		type ValidationError = {
			readonly _tag: "ValidationError"
			readonly field: string
			readonly message: string
		}

		const userIo = ioValidation<ValidationError, User>(() =>
			success({ id: 1, name: "Alice" }),
		)
		const result = userIo()

		assertEquals(result._tag, "Success")
		if (result._tag === "Success") {
			assertEquals(result.value.id, 1)
			assertEquals(result.value.name, "Alice")
		}
	})

	await t.step("accumulates multiple errors", () => {
		type ValidationError = {
			readonly _tag: "ValidationError"
			readonly field: string
			readonly message: string
		}

		const validationIo = ioValidation<ValidationError, never>(() =>
			failure([
				{ _tag: "ValidationError", field: "email", message: "Invalid email" },
				{ _tag: "ValidationError", field: "age", message: "Must be positive" },
				{ _tag: "ValidationError", field: "name", message: "Required" },
			]),
		)
		const result = validationIo()

		assertEquals(result._tag, "Failure")
		if (result._tag === "Failure") {
			assertEquals(result.errors.length, 3)
			assertEquals(result.errors[0].field, "email")
			assertEquals(result.errors[1].field, "age")
			assertEquals(result.errors[2].field, "name")
		}
	})

	await t.step("maintains referential transparency", () => {
		const computation = ioValidation(() => success(42))
		const io1 = computation
		const io2 = computation

		assertEquals(io1, io2)
		assertEquals(typeof io1, "function")
		assertEquals(typeof io2, "function")
	})
})
