import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"

import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/ValidationError/index.ts"

import invalid from "../invalid/index.ts"
import valid from "../valid/index.ts"
import mapErrors from "./index.ts"

Deno.test("mapErrors - transforms only Invalid branch and preserves NonEmptyArray", async (t) => {
	await t.step("preserves Valid unchanged", () => {
		const v = valid(10)

		const result = mapErrors<ValidationError, { msg: string }>((e) => ({
			msg: e.messages.join(","),
		}))(v)

		assertEquals(result, v)
	})

	await t.step("transforms errors in Invalid", () => {
		const errs: NonEmptyArray<ValidationError> = [
			{ field: "name", messages: ["required", "too short"] },
		]
		const v = invalid<ValidationError, number>(errs)
		const result = mapErrors<ValidationError, string>((e) =>
			`${e.field}:${e.messages.join("|")}`
		)(v)

		assertEquals(result._tag, "Invalid")

		if (result._tag === "Invalid") {
			assert(Array.isArray(result.errors))
			assert(result.errors.length > 0)
			assertEquals(result.errors[0], "name:required|too short")
		}
	})
})
