import { assertEquals } from "@std/assert"

import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/ValidationError/index.ts"

import invalid from "../invalid/index.ts"
import valid from "../valid/index.ts"
import getOrElse from "./index.ts"

// no need for isValid/isInvalid in these getOrElse tests

Deno.test("getOrElse - returns contained value for Valid and default for Invalid", async (t) => {
	await t.step("should return inner value when Valid", () => {
		const v = valid(123)

		const result = getOrElse(0)(v)

		assertEquals(result, 123)
	})

	await t.step("should return default when Invalid", () => {
		const errs: NonEmptyArray<ValidationError> = [
			{ field: "n", messages: ["must be positive"] },
		]

		const v = invalid<ValidationError, number>(errs)
		const result = getOrElse(0)(v)

		assertEquals(result, 0)
	})

	await t.step("should be type-safe with objects", () => {
		const fallback = { id: 0, name: "Guest" }
		const good = valid({ id: 1, name: "Alice" })
		const bad = invalid<ValidationError, typeof fallback>([
			{ field: "user", messages: ["not found"] },
		])

		const r1 = getOrElse(fallback)(good)
		const r2 = getOrElse(fallback)(bad)

		assertEquals(r1, { id: 1, name: "Alice" })
		assertEquals(r2, fallback)
	})
})
