import { assertEquals } from "@std/assert"

import type { Validation } from "../../../types/Validation/index.ts"
import type ValidationError from "../../../types/ValidationError/index.ts"

import invalid from "../invalid/index.ts"
import isInvalid from "../isInvalid/index.ts"
import isValid from "../isValid/index.ts"
import valid from "../valid/index.ts"
import chain from "./index.ts"

Deno.test("chain - sequences validation computations", async (t) => {
	const validateAge = (age: number) =>
		age >= 18
			? valid(age)
			: invalid<ValidationError>([{ field: "age", messages: ["must be 18+"] }])

	const validateNotTooOld = (age: number) =>
		age <= 65 ? valid(age) : invalid<ValidationError>([{
			field: "age",
			messages: ["must be 65 or under"],
		}])

	await t.step("should chain successful validations", () => {
		const result = chain(validateNotTooOld)(validateAge(25))
		assertEquals(isValid(result), true)

		if (isValid(result)) {
			assertEquals(result.value, 25)
		}
	})

	await t.step("should short-circuit on first failure", () => {
		const result = chain(validateNotTooOld)(validateAge(15))

		assertEquals(isInvalid(result), true)
		if (isInvalid(result)) {
			assertEquals(result.errors[0].messages[0], "must be 18+")
		}
	})

	await t.step("should fail on second validation", () => {
		const result = chain(validateNotTooOld)(validateAge(70))

		assertEquals(isInvalid(result), true)
		if (isInvalid(result)) {
			assertEquals(result.errors[0].messages[0], "must be 65 or under")
		}
	})

	await t.step("should not execute function on invalid input", () => {
		let executed = false
		const fn = (n: number): Validation<ValidationError, number> => {
			executed = true
			return valid(n * 2) as Validation<ValidationError, number>
		}

		const errors: [ValidationError, ...ValidationError[]] = [{
			field: "test",
			messages: ["error"],
		}]
		const result = chain(fn)(invalid<ValidationError>(errors))

		assertEquals(executed, false)
		assertEquals(isInvalid(result), true)
	})

	await t.step("should chain multiple operations", () => {
		const parseNumber = (s: string) => {
			const n = Number(s)
			return isNaN(n) ? invalid<string>(["not a number"]) : valid(n)
		}

		const checkPositive = (n: number) =>
			n > 0 ? valid(n) : invalid<string>(["must be positive"])

		const doubleIt = (n: number): Validation<string, number> =>
			valid(n * 2) as Validation<string, number>

		const step1 = parseNumber("21")
		const step2 = chain(checkPositive)(step1)
		const step3 = chain(doubleIt)(step2)

		assertEquals(isValid(step3), true)
		if (isValid(step3)) {
			assertEquals(step3.value, 42)
		}
	})
})
