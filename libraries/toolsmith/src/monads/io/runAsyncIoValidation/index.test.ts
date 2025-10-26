import { assertEquals } from "@std/assert"

import failure from "../../validation/failure/index.ts"
import success from "../../validation/success/index.ts"
import asyncIoValidation from "../asyncIoValidation/index.ts"
import runAsyncIoValidation from "./index.ts"

Deno.test("runAsyncIoValidation", async (t) => {
	await t.step("executes AsyncIoValidation and returns Success", async () => {
		const asyncIo = asyncIoValidation(async () => {
			await Promise.resolve()
			return success(42)
		})
		const result = await runAsyncIoValidation(asyncIo)
		assertEquals(result._tag, "Success")
		if (result._tag === "Success") {
			assertEquals(result.value, 42)
		}
	})

	await t.step("executes AsyncIoValidation and returns Failure", async () => {
		const asyncIo = asyncIoValidation(async () => {
			await Promise.resolve()
			return failure(["error1", "error2"])
		})
		const result = await runAsyncIoValidation(asyncIo)
		assertEquals(result._tag, "Failure")
		if (result._tag === "Failure") {
			assertEquals(result.errors, ["error1", "error2"])
		}
	})

	await t.step("actually awaits the async computation", async () => {
		let executed = false
		const asyncIo = asyncIoValidation(async () => {
			await new Promise((resolve) => setTimeout(resolve, 10))
			executed = true
			return success("done")
		})

		assertEquals(executed, false)
		const result = await runAsyncIoValidation(asyncIo)
		assertEquals(executed, true)
		assertEquals(result._tag, "Success")
	})

	await t.step("works with complex validation types", async () => {
		type ValidationError = {
			readonly _tag: "ValidationError"
			readonly field: string
			readonly message: string
		}
		type User = { readonly id: number; readonly name: string }

		const asyncIo = asyncIoValidation<ValidationError, User>(async () => {
			await new Promise((resolve) => setTimeout(resolve, 10))
			return success({ id: 1, name: "Alice" })
		})

		const result = await runAsyncIoValidation(asyncIo)
		assertEquals(result._tag, "Success")
		if (result._tag === "Success") {
			assertEquals(result.value.id, 1)
			assertEquals(result.value.name, "Alice")
		}
	})

	await t.step("handles accumulated errors", async () => {
		type ValidationError = {
			readonly _tag: "ValidationError"
			readonly field: string
			readonly message: string
		}

		const asyncIo = asyncIoValidation<ValidationError, never>(async () => {
			await new Promise((resolve) => setTimeout(resolve, 10))
			return failure([
				{ _tag: "ValidationError", field: "email", message: "Invalid" },
				{ _tag: "ValidationError", field: "age", message: "Too young" },
				{ _tag: "ValidationError", field: "name", message: "Required" },
			])
		})

		const result = await runAsyncIoValidation(asyncIo)
		assertEquals(result._tag, "Failure")
		if (result._tag === "Failure") {
			assertEquals(result.errors.length, 3)
			assertEquals(result.errors[0].field, "email")
			assertEquals(result.errors[1].field, "age")
			assertEquals(result.errors[2].field, "name")
		}
	})

	await t.step("can be called multiple times", async () => {
		let counter = 0
		const asyncIo = asyncIoValidation(async () => {
			await Promise.resolve()
			counter++
			return success(counter)
		})

		const result1 = await runAsyncIoValidation(asyncIo)
		const result2 = await runAsyncIoValidation(asyncIo)

		assertEquals(result1._tag, "Success")
		assertEquals(result2._tag, "Success")
		if (result1._tag === "Success" && result2._tag === "Success") {
			assertEquals(result1.value, 1)
			assertEquals(result2.value, 2)
		}
	})
})
