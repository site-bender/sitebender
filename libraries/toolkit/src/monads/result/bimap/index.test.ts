import { assertEquals } from "@std/assert"

import ok from "../ok/index.ts"
import err from "../err/index.ts"
import bimap from "./index.ts"

Deno.test("bimap", async (t) => {
	await t.step("transforms Ok value with onOk function", () => {
		const transform = bimap(
			(e: string) => e.toUpperCase(),
			(x: number) => x * 2
		)
		const result = transform(ok(5))
		assertEquals(result._tag, "Right")
		assertEquals((result as any).right, 10)
	})

	await t.step("transforms Err value with onErr function", () => {
		const transform = bimap(
			(e: string) => e.toUpperCase(),
			(x: number) => x * 2
		)
		const result = transform(err("fail"))
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, "FAIL")
	})

	await t.step("can change both types", () => {
		const transform = bimap(
			(e: string) => ({ error: e }),
			(x: number) => x.toString()
		)

		const okResult = transform(ok(42))
		assertEquals(okResult._tag, "Right")
		assertEquals((okResult as any).right, "42")

		const errResult = transform(err("not found"))
		assertEquals(errResult._tag, "Left")
		assertEquals((errResult as any).left, { error: "not found" })
	})

	await t.step("works with identity functions", () => {
		const identity = bimap(
			(e: string) => e,
			(x: number) => x
		)

		const okResult = ok(42)
		const errResult = err("error")

		assertEquals(identity(okResult), okResult)
		assertEquals(identity(errResult), errResult)
	})

	await t.step("composes with itself", () => {
		const first = bimap(
			(e: string) => `Error: ${e}`,
			(x: number) => x * 2
		)
		const second = bimap(
			(e: string) => e.toUpperCase(),
			(x: number) => x + 10
		)

		const okResult = second(first(ok(5)))
		assertEquals(okResult._tag, "Right")
		assertEquals((okResult as any).right, 20)

		const errResult = second(first(err("failed")))
		assertEquals(errResult._tag, "Left")
		assertEquals((errResult as any).left, "ERROR: FAILED")
	})

	await t.step("handles complex transformations", () => {
		type User = { id: number; name: string }
		type ApiError = { code: number; message: string }

		const transform = bimap(
			(e: string): ApiError => ({ code: 500, message: e }),
			(u: User) => u.name.toUpperCase()
		)

		const okResult = transform(ok({ id: 1, name: "alice" }))
		assertEquals(okResult._tag, "Right")
		assertEquals((okResult as any).right, "ALICE")

		const errResult = transform(err("Connection failed"))
		assertEquals(errResult._tag, "Left")
		assertEquals((errResult as any).left, { code: 500, message: "Connection failed" })
	})
})
