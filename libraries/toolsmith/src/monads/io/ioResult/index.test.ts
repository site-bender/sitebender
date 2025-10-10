import { assertEquals } from "@std/assert"

import error from "../../result/error/index.ts"
import ok from "../../result/ok/index.ts"
import runIO from "../runIO/index.ts"
import ioResult from "./index.ts"

Deno.test("ioResult", async (t) => {
	await t.step("wraps a thunk returning Result in IOResult", () => {
		const computation = ioResult(() => ok(42))
		assertEquals(typeof computation, "function")
		const result = computation()
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, 42)
		}
	})

	await t.step("creates IOResult from Ok result", () => {
		const successIO = ioResult(() => ok("success"))
		const result = runIO(successIO)
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "success")
		}
	})

	await t.step("creates IOResult from Error result", () => {
		const failureIO = ioResult(() => error("failed"))
		const result = runIO(failureIO)
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error, "failed")
		}
	})

	await t.step("defers computation until executed", () => {
		const computation = ioResult(() => {
			return ok(Math.random())
		})
		const result1 = runIO(computation)
		const result2 = runIO(computation)

		// Different values because computation runs each time
		assertEquals(result1._tag, "Ok")
		assertEquals(result2._tag, "Ok")
	})

	await t.step("works with complex Result types", () => {
		type User = { readonly id: number; readonly name: string }
		type UserError = { readonly _tag: "UserError"; readonly message: string }

		const userIO = ioResult<User, UserError>(() => ok({ id: 1, name: "Alice" }))
		const result = runIO(userIO)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value.id, 1)
			assertEquals(result.value.name, "Alice")
		}
	})

	await t.step("maintains referential transparency", () => {
		const computation = ioResult(() => ok(42))
		const io1 = computation
		const io2 = computation

		assertEquals(io1, io2)
		assertEquals(typeof io1, "function")
		assertEquals(typeof io2, "function")
	})
})
