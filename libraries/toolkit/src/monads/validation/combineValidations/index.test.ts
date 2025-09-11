import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"

import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/ValidationError/index.ts"

import invalid from "../invalid/index.ts"
import isValid from "../isValid/index.ts"
import valid from "../valid/index.ts"
import accumulateErrors from "./accumulateErrors/index.ts"
import combineValidations from "./index.ts"

Deno.test("combineValidations - returns last valid when any are valid; accumulates errors otherwise", async (t) => {
	await t.step("last valid wins", () => {
		const vals: NonEmptyArray<ReturnType<typeof valid<number>>> = [
			valid(1),
			valid(2),
			valid(3),
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
			ReturnType<typeof invalid<ValidationError, number>>
		> = [
			invalid<ValidationError, number>(errs1),
			invalid<ValidationError, number>(errs2),
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

	const step1 = accumulateErrors(state, valid(10))
	assertEquals(step1.lastValidValue, 10)

	const step2 = accumulateErrors(
		step1,
		invalid<ValidationError, number>([{ field: "x", messages: ["e"] }]),
	)
	assertEquals(step2.errors, [{ field: "x", messages: ["e"] }])

	const step3 = accumulateErrors(step2, valid(20))
	assertEquals(step3.lastValidValue, 20)
})
