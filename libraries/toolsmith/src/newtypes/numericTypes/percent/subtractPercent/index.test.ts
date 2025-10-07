import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import unsafePercent from "@sitebender/toolsmith/newtypes/percent/unsafePercent/index.ts"

import subtractPercent from "./index.ts"

Deno.test("subtractPercent subtracts two percentages", () => {
	const a = unsafePercent(0.75)
	const b = unsafePercent(0.25)
	const result = subtractPercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.5)
})

Deno.test("subtractPercent subtracts zero", () => {
	const a = unsafePercent(0.50)
	const b = unsafePercent(0)
	const result = subtractPercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.5)
})

Deno.test("subtractPercent subtracts to zero", () => {
	const a = unsafePercent(0.25)
	const b = unsafePercent(0.25)
	const result = subtractPercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("subtractPercent subtracts from 100%", () => {
	const a = unsafePercent(1)
	const b = unsafePercent(0.25)
	const result = subtractPercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.75)
})

Deno.test("subtractPercent subtracts small percentages", () => {
	const a = unsafePercent(0.0005)
	const b = unsafePercent(0.0002)
	const result = subtractPercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.0003)
})

Deno.test("subtractPercent curried application works", () => {
	const subtract25Percent = subtractPercent(unsafePercent(0.75))
	const result = subtract25Percent(unsafePercent(0.25))

	assert(isOk(result))
	assertEquals(result.value, 0.5)
})

Deno.test("subtractPercent rejects negative result with helpful error", () => {
	const a = unsafePercent(0.25)
	const b = unsafePercent(0.50)
	const result = subtractPercent(a)(b)

	assert(isError(result))
	assertEquals(result.error.code, "PERCENT_BELOW_MINIMUM")
	assertEquals(result.error.field, "percent")
	assert(result.error.suggestion.includes("non-negative"))
})

Deno.test("subtractPercent rejects result slightly below 0", () => {
	const a = unsafePercent(0.0001)
	const b = unsafePercent(0.0002)
	const result = subtractPercent(a)(b)

	assert(isError(result))
	assertEquals(result.error.code, "PERCENT_BELOW_MINIMUM")
})
