import { assertEquals } from "@std/assert"

import invalid from "../../../../monads/validation/invalid/index.ts"
import valid from "../../../../monads/validation/valid/index.ts"
import accumulateValidations from "./index.ts"

Deno.test("accumulateValidations should accumulate values when validation is Valid", () => {
	const accumulator = { values: [1, 2], errors: [] }
	const current = valid(3)

	const result = accumulateValidations(accumulator, current)

	assertEquals(result, { values: [1, 2, 3], errors: [] })
})

Deno.test("accumulateValidations should accumulate errors when validation is Invalid", () => {
	const accumulator = { values: [1, 2], errors: ["error1"] }
	const current = invalid(["error2", "error3"])

	const result = accumulateValidations(accumulator, current)

	assertEquals(result, {
		values: [1, 2],
		errors: ["error1", "error2", "error3"],
	})
})

Deno.test("accumulateValidations should accumulate values when starting fresh", () => {
	const accumulator = { values: [], errors: [] }
	const current = valid(1)

	const result = accumulateValidations(accumulator, current)

	assertEquals(result, { values: [1], errors: [] })
})

Deno.test("accumulateValidations should accumulate errors when starting fresh", () => {
	const accumulator = { values: [], errors: [] }
	const current = invalid(["error1"])

	const result = accumulateValidations(accumulator, current)

	assertEquals(result, { values: [], errors: ["error1"] })
})
