import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import unsafePercent from "@sitebender/toolsmith/newtypes/numericTypes/percent/unsafePercent/index.ts"

import dividePercent from "./index.ts"

Deno.test("dividePercent divides two percentages (50% ÷ 50% = 100%)", () => {
	const a = unsafePercent(0.5)
	const b = unsafePercent(0.5)
	const result = dividePercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 1)
})

Deno.test("dividePercent divides by 100% (returns same value)", () => {
	const a = unsafePercent(0.75)
	const b = unsafePercent(1)
	const result = dividePercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.75)
})

Deno.test("dividePercent 25% ÷ 50% = 50%", () => {
	const a = unsafePercent(0.25)
	const b = unsafePercent(0.5)
	const result = dividePercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.5)
})

Deno.test("dividePercent small percentages", () => {
	const a = unsafePercent(0.0001)
	const b = unsafePercent(0.0001)
	const result = dividePercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 1)
})

Deno.test("dividePercent curried application works", () => {
	const divideBy50Percent = dividePercent(unsafePercent(0.5))
	const result = divideBy50Percent(unsafePercent(0.5))

	assert(isOk(result))
	assertEquals(result.value, 1)
})

Deno.test("dividePercent rejects division by zero with helpful error", () => {
	const a = unsafePercent(0.5)
	const b = unsafePercent(0)
	const result = dividePercent(a)(b)

	assert(isError(result))
	assertEquals(result.error.code, "PERCENT_DIVISION_BY_ZERO")
	assertEquals(result.error.field, "divisor")
	assert(result.error.suggestion.includes("non-zero"))
})

Deno.test("dividePercent rejects result > 1.0 with helpful error", () => {
	const a = unsafePercent(0.75)
	const b = unsafePercent(0.25)
	const result = dividePercent(a)(b)

	assert(isError(result))
	assertEquals(result.error.code, "PERCENT_ABOVE_MAXIMUM")
	assertEquals(result.error.field, "percent")
	assert(result.error.suggestion.includes("at most 1"))
})

Deno.test("dividePercent 10% ÷ 5% would exceed 100%", () => {
	const a = unsafePercent(0.1)
	const b = unsafePercent(0.05)
	const result = dividePercent(a)(b)

	assert(isError(result))
	assertEquals(result.error.code, "PERCENT_ABOVE_MAXIMUM")
})
