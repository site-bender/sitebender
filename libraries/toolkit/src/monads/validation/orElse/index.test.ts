import { assertEquals } from "@std/assert"

import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/ValidationError/index.ts"

import invalid from "../invalid/index.ts"
import valid from "../valid/index.ts"
import orElse from "./index.ts"

Deno.test("orElse - returns original when Valid and calls alternative only when Invalid", async (t) => {
	await t.step("returns original Valid", () => {
		const original = valid(42)
		let called = 0
		const alternative = () => {
			called++
			return valid(0)
		}

		const result = orElse<number, number>(alternative)(original)

		assertEquals(result, original)
		assertEquals(called, 0)
	})

	await t.step("returns alternative for Invalid", () => {
		const errs: NonEmptyArray<ValidationError> = [
			{ field: "x", messages: ["bad"] },
		]
		const original = invalid<ValidationError, number>(errs)
		let called = 0
		const alternative = () => {
			called++
			return valid(99)
		}

		const result = orElse<ValidationError, number>(alternative)(original)

		assertEquals(result, valid(99))
		assertEquals(called, 1)
	})
})
