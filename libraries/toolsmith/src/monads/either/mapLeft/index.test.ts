import { assertEquals } from "@std/assert"

import isLeft from "../isLeft/index.ts"
import isRight from "../isRight/index.ts"
import left from "../left/index.ts"
import right from "../right/index.ts"
import mapLeft from "./index.ts"

Deno.test("mapLeft - transforms Left values", async (t) => {
	await t.step("should map over left string", () => {
		const enrich = (e: string) => `Error: ${e}`
		const result = mapLeft(enrich)(left("boom"))
		assertEquals(isLeft(result), true)
		if (isLeft(result)) {
			assertEquals(result.left, "Error: boom")
		}
	})

	await t.step("should preserve right state", () => {
		const enrich = (e: string) => `Error: ${e}`
		const r = right(42)
		const result = mapLeft(enrich)(r)
		assertEquals(isRight(result), true)
		if (isRight(result)) {
			assertEquals(result.right, 42)
		}
	})

	await t.step("should chain multiple mapLeft calls", () => {
		const upper = (e: string) => e.toUpperCase()
		const tag = (e: string) => ({ code: e })
		const step1 = left<string, number>("timeout")
		const step2 = mapLeft(upper)(step1)
		const step3 = mapLeft(tag)(step2)
		assertEquals(isLeft(step3), true)
		if (isLeft(step3)) {
			assertEquals(step3.left, { code: "TIMEOUT" })
		}
	})

	await t.step("should transform complex left object", () => {
		type Problem = { field: string; message: string }
		const addCode = (p: Problem) => ({ ...p, code: "E_FIELD" })
		const result = mapLeft(addCode)(left<Problem, number>({
			field: "age",
			message: "too young",
		}))
		assertEquals(isLeft(result), true)
		if (isLeft(result)) {
			assertEquals(result.left.code, "E_FIELD")
		}
	})
})
