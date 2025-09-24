import { assertEquals } from "@std/assert"

import isLeft from "../isLeft/index.ts"
import isRight from "../isRight/index.ts"
import left from "../left/index.ts"
import right from "../right/index.ts"
import chainLeft from "./index.ts"

Deno.test("chainLeft - sequences Left recovery computations", async (t) => {
	const recoverCache = (err: string) =>
		err === "DB_ERROR" ? right(0) : left<string, number>(err)
	const recoverDefault = (err: string) =>
		err === "CACHE_MISS" ? right(1) : left<string, number>(err)

	await t.step("should recover from first left", () => {
		const result = chainLeft<string, string, number>(recoverCache)(
			left<string, number>("DB_ERROR"),
		)
		assertEquals(isRight(result), true)
		if (isRight(result)) {
			assertEquals(result.right, 0)
		}
	})

	await t.step("should attempt second recovery", () => {
		const step1 = chainLeft<string, string, number>(recoverCache)(
			left<string, number>("CACHE_MISS"),
		)
		const step2 = chainLeft<string, string, number>(recoverDefault)(step1)
		assertEquals(isRight(step2), true)
		if (isRight(step2)) {
			assertEquals(step2.right, 1)
		}
	})

	await t.step("should remain left when unrecoverable", () => {
		const result = chainLeft<string, string, number>(recoverCache)(
			left<string, number>("FATAL"),
		)
		assertEquals(isLeft(result), true)
		if (isLeft(result)) {
			assertEquals(result.left, "FATAL")
		}
	})

	await t.step("should not execute on right", () => {
		let executed = false
		const fn = (_e: string) => {
			executed = true
			return right(5)
		}
		const result = chainLeft(fn)(right(10))
		assertEquals(isRight(result), true)
		assertEquals(executed, false)
	})
})
