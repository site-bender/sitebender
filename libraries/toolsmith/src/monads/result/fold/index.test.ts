import { assertEquals } from "@std/assert"

import ok from "../ok/index.ts"
import error from "../error/index.ts"
import fold from "./index.ts"

Deno.test("fold", async (t) => {
	await t.step("applies onOk handler for Ok result", () => {
		const result = fold
			((e: string) => `Error: ${e}`)
			((x: number) => `Success: ${x}`)
			(ok(42))

		assertEquals(result, "Success: 42")
	})

	await t.step("applies onErr handler for Err result", () => {
		const result = fold
			((e: string) => `Error: ${e}`)
			((x: number) => `Success: ${x}`)
			(error("failed"))

		assertEquals(result, "Error: failed")
	})

	await t.step("can transform to different type", () => {
		const toNumber = fold
			((_e: string) => 0)
			((x: number) => x)

		assertEquals(toNumber(ok(42)), 42)
		assertEquals(toNumber(error("failed")), 0)
	})

	await t.step("works with complex types", () => {
		type User = { id: number; name: string }
		type ApiError = { code: number; message: string }

		const handleResult = fold
			((e: ApiError) => `Error ${e.code}: ${e.message}`)
			((u: User) => `User: ${u.name}`)

		const okResult = ok<User>({ id: 1, name: "Alice" })
		const errResult = error<ApiError>({ code: 404, message: "Not found" })

		assertEquals(handleResult(okResult), "User: Alice")
		assertEquals(handleResult(errResult), "Error 404: Not found")
	})

	await t.step("can be used for side effects", () => {
		let sideEffect = ""

		fold
			((e: string) => { sideEffect = `err: ${e}` })
			((x: number) => { sideEffect = `ok: ${x}` })
			(ok(42))

		assertEquals(sideEffect, "ok: 42")

		fold
			((e: string) => { sideEffect = `err: ${e}` })
			((x: number) => { sideEffect = `ok: ${x}` })
			(error("failed"))

		assertEquals(sideEffect, "err: failed")
	})

	await t.step("returns same type from both branches", () => {
		const toBoolean = fold
			((_: string) => false)
			((x: number) => x > 0)

		assertEquals(toBoolean(ok(42)), true)
		assertEquals(toBoolean(ok(-5)), false)
		assertEquals(toBoolean(error("any error")), false)
	})
})
