import { assertEquals } from "@std/assert"

import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/fp/validation/index.ts"

import reduce from "../../../array/reduce/index.ts"
import failure from "../failure/index.ts"
import success from "../success/index.ts"
import accumulateErrors from "./accumulateErrors/index.ts"
import validateAll from "./index.ts"

Deno.test("validateAll - returns Valid when all validators pass; otherwise accumulates errors", async (t) => {
	const isPositive = (n: number) => n > 0
	const isLessThan100 = (n: number) => n < 100

	const posValidator = (n: number) =>
		isPositive(n) ? success(n) : failure<ValidationError, number>([{
			field: "number",
			messages: ["Must be positive"],
		}])

	const ltValidator = (n: number) =>
		isLessThan100(n) ? success(n) : failure<ValidationError, number>([{
			field: "number",
			messages: ["Must be less than 100"],
		}])

	await t.step("Valid when all pass", () => {
		const validators: NonEmptyArray<typeof posValidator> = [
			posValidator,
			ltValidator,
		]

		const result = validateAll(validators)(50)

		assertEquals(result._tag, "Valid")

		if (result._tag === "Valid") {
			assertEquals(result.value, 50)
		}
	})

	await t.step("Invalid with accumulated errors", () => {
		const validators: NonEmptyArray<typeof posValidator> = [
			posValidator,
			ltValidator,
		]

		const result = validateAll(validators)(-10)

		assertEquals(result._tag, "Invalid")

		if (result._tag === "Invalid") {
			// Only positive fails in this case; ensure single error present
			assertEquals(result.errors.length, 1)
			assertEquals(result.errors[0].field, "number")
		}
	})
})

Deno.test("accumulateErrors - reducer collects errors from validators for a fixed value", () => {
	const value = 5
	const validators = [
		(n: number) => success(n),
		(_n: number) =>
			failure<ValidationError, number>([{ field: "x", messages: ["bad"] }]),
	]

	const collected = reduce(accumulateErrors(value))([])(validators)

	assertEquals(collected, [{ field: "x", messages: ["bad"] }])
})
