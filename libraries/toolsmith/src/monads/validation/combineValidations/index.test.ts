import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"

import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/fp/validation/index.ts"

import failure from "../failure/index.ts"
import isValid from "../isValid/index.ts"
import success from "../success/index.ts"
import accumulateErrors from "./accumulateErrors/index.ts"
import combineValidations from "./index.ts"

Deno.test("combineValidations - returns last valid when any are valid; accumulates errors otherwise", async (t) => {
	await t.step("last valid wins", () => {
		const vals: NonEmptyArray<ReturnType<typeof success<number>>> = [
			success(1),
			success(2),
			success(3),
		]

		const result = combineValidations(vals)

		assert(isValid(result))

		if (isValid(result)) {
			assertEquals(result.value, 3)
		}
	})

	await t.step("accumulates all errors when none valid", () => {
		const errs1: NonEmptyArray<ValidationError> = [{
			field: "a",
			messages: ["e1"],
		}]
		const errs2: NonEmptyArray<ValidationError> = [{
			field: "b",
			messages: ["e2"],
		}]

		const vals: NonEmptyArray<
			ReturnType<typeof failure<ValidationError, number>>
		> = [
			failure<ValidationError, number>(errs1),
			failure<ValidationError, number>(errs2),
		]

		const result = combineValidations<number>(vals)

		assert(!isValid(result))

		if (!isValid(result)) {
			assertEquals(result.errors.length, 2)
			assertEquals(result.errors[0].field, "a")
			assertEquals(result.errors[1].field, "b")
		}
	})
})

Deno.test("combineValidations/accumulateErrors - reducer collects errors and tracks last valid value", () => {
	const state = {
		errors: [] as Array<ValidationError>,
		lastValidValue: undefined as number | undefined,
	}

	const step1 = accumulateErrors(state, success(10))
	assertEquals(step1.lastValidValue, 10)

	const step2 = accumulateErrors(
		step1,
		failure<ValidationError, number>([{ field: "x", messages: ["e"] }]),
	)
	assertEquals(step2.errors, [{ field: "x", messages: ["e"] }])

	const step3 = accumulateErrors(step2, success(20))
	assertEquals(step3.lastValidValue, 20)
})
