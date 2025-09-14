import { assertEquals } from "@std/assert"

import ok from "../ok/index.ts"
import err from "../err/index.ts"
import orElse from "./index.ts"

Deno.test("orElse", async (t) => {
	await t.step("returns original Ok unchanged", () => {
		const fallback = orElse(() => ok(0))
		const result = fallback(ok(42))
		assertEquals(result._tag, "Right")
		assertEquals((result as any).right, 42)
	})

	await t.step("returns alternative for Err", () => {
		const fallback = orElse(() => ok(0))
		const result = fallback(err("failed"))
		assertEquals(result._tag, "Right")
		assertEquals((result as any).right, 0)
	})

	await t.step("can use error value to compute alternative", () => {
		const tryRecover = orElse((e: string) =>
			e === "retry" ? ok(1) : err("fatal")
		)

		const retryResult = tryRecover(err("retry"))
		assertEquals(retryResult._tag, "Right")
		assertEquals((retryResult as any).right, 1)

		const fatalResult = tryRecover(err("other"))
		assertEquals(fatalResult._tag, "Left")
		assertEquals((fatalResult as any).left, "fatal")
	})

	await t.step("can chain multiple orElse", () => {
		const firstFallback = orElse((e: string) =>
			e === "first" ? ok(1) : err(e)
		)
		const secondFallback = orElse((e: string) =>
			e === "second" ? ok(2) : err(e)
		)
		const defaultFallback = orElse(() => ok(0))

		const chain = (r: any) => defaultFallback(secondFallback(firstFallback(r)))

		assertEquals(chain(ok(42)), ok(42))
		assertEquals(chain(err("first")), ok(1))
		assertEquals(chain(err("second")), ok(2))
		assertEquals(chain(err("other")), ok(0))
	})

	await t.step("can return different error type", () => {
		const standardizeError = orElse((e: string) =>
			err({ code: 500, message: e })
		)

		const result = standardizeError(err("Database error"))
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, { code: 500, message: "Database error" })
	})

	await t.step("works with complex recovery logic", () => {
		const recover = orElse((e: { code: number; message: string }) => {
			if (e.code === 404) return ok(null)
			if (e.code === 403) return ok({ id: 0, name: "Guest" })
			return err(e)
		})

		const notFound = recover(err({ code: 404, message: "Not found" }))
		assertEquals(notFound._tag, "Right")
		assertEquals((notFound as any).right, null)

		const forbidden = recover(err({ code: 403, message: "Forbidden" }))
		assertEquals(forbidden._tag, "Right")
		assertEquals((forbidden as any).right, { id: 0, name: "Guest" })

		const serverError = recover(err({ code: 500, message: "Server error" }))
		assertEquals(serverError._tag, "Left")
		assertEquals((serverError as any).left, { code: 500, message: "Server error" })
	})
})
