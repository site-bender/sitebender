import { assertEquals } from "@std/assert"

import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/fp/validation/index.ts"

import failure from "../failure/index.ts"
import success from "../success/index.ts"
import orElse from "./index.ts"

Deno.test("orElse - returns original when Valid and calls alternative only when Invalid", async (t) => {
	await t.step("returns original Valid", () => {
		const original = success(42)
		let called = 0
		const alternative = () => {
			called++
			return success(0)
		}

		const result = orElse<number, number>(alternative)(original)

		assertEquals(result, original)
		assertEquals(called, 0)
	})

	await t.step("returns alternative for Invalid", () => {
		const errs: NonEmptyArray<ValidationError> = [
			{ field: "x", messages: ["bad"] },
		]
		const original = failure<ValidationError, number>(errs)
		let called = 0
		const alternative = () => {
			called++
			return success(99)
		}

		const result = orElse<ValidationError, number>(alternative)(original)

		assertEquals(result, success(99))
		assertEquals(called, 1)
	})
})
