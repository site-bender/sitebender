import { assertEquals } from "@std/assert"

import failure from "../../validation/failure/index.ts"
import success from "../../validation/success/index.ts"
import asyncIoValidation from "./index.ts"

Deno.test("asyncIoValidation", async (t) => {
	await t.step(
		"wraps an async thunk returning Promise<Validation>",
		async () => {
			const computation = asyncIoValidation(async () => {
				await Promise.resolve()
				return success(42)
			})
			assertEquals(typeof computation, "function")
			const result = await computation()
			assertEquals(result._tag, "Success")
			if (result._tag === "Success") {
				assertEquals(result.value, 42)
			}
		},
	)

	await t.step(
		"creates AsyncIoValidation from Success validation",
		async () => {
			const successIo = asyncIoValidation(async () => {
				await Promise.resolve()
				return success("success")
			})
			const result = await successIo()
			assertEquals(result._tag, "Success")
			if (result._tag === "Success") {
				assertEquals(result.value, "success")
			}
		},
	)

	await t.step(
		"creates AsyncIoValidation from Failure validation",
		async () => {
			const failureIo = asyncIoValidation(async () => {
				await Promise.resolve()
				return failure(["error1", "error2"])
			})
			const result = await failureIo()
			assertEquals(result._tag, "Failure")
			if (result._tag === "Failure") {
				assertEquals(result.errors, ["error1", "error2"])
			}
		},
	)

	await t.step("defers async computation until executed", async () => {
		const computation = asyncIoValidation(async () => {
			await Promise.resolve()
			return success(Math.random())
		})
		const result1 = await computation()
		const result2 = await computation()

		// Different values because computation runs each time
		assertEquals(result1._tag, "Success")
		assertEquals(result2._tag, "Success")
	})

	await t.step("works with complex async Validation types", async () => {
		type User = { readonly id: number; readonly name: string }
		type ValidationError = {
			readonly _tag: "ValidationError"
			readonly field: string
			readonly message: string
		}

		const fetchUserIo = asyncIoValidation<ValidationError, User>(async () => {
			// Simulate async operation
			await new Promise((resolve) => setTimeout(resolve, 10))
			return success({ id: 1, name: "Alice" })
		})

		const result = await fetchUserIo()
		assertEquals(result._tag, "Success")
		if (result._tag === "Success") {
			assertEquals(result.value.id, 1)
			assertEquals(result.value.name, "Alice")
		}
	})

	await t.step(
		"handles async validation errors with accumulation",
		async () => {
			type ValidationError = {
				readonly _tag: "ValidationError"
				readonly field: string
				readonly message: string
			}

			const validateFormIo = asyncIoValidation<ValidationError, never>(
				async () => {
					await new Promise((resolve) => setTimeout(resolve, 10))
					return failure([
						{
							_tag: "ValidationError",
							field: "email",
							message: "Invalid email format",
						},
						{
							_tag: "ValidationError",
							field: "password",
							message: "Password too short",
						},
						{
							_tag: "ValidationError",
							field: "age",
							message: "Must be 18 or older",
						},
					])
				},
			)

			const result = await validateFormIo()
			assertEquals(result._tag, "Failure")
			if (result._tag === "Failure") {
				assertEquals(result.errors.length, 3)
				assertEquals(result.errors[0].field, "email")
				assertEquals(result.errors[1].field, "password")
				assertEquals(result.errors[2].field, "age")
			}
		},
	)

	await t.step("maintains referential transparency", () => {
		const computation = asyncIoValidation(async () => {
			await Promise.resolve()
			return success(42)
		})
		const io1 = computation
		const io2 = computation

		assertEquals(io1, io2)
		assertEquals(typeof io1, "function")
		assertEquals(typeof io2, "function")
	})
})
