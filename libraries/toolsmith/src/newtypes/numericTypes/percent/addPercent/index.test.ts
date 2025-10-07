import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import unsafePercent from "@sitebender/toolsmith/newtypes/percent/unsafePercent/index.ts"

import addPercent from "./index.ts"

Deno.test("addPercent adds two percentages", () => {
	const a = unsafePercent(0.25)
	const b = unsafePercent(0.30)
	const result = addPercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.55)
})

Deno.test("addPercent adds to zero", () => {
	const a = unsafePercent(0.25)
	const b = unsafePercent(0)
	const result = addPercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.25)
})

Deno.test("addPercent adds zero to zero", () => {
	const a = unsafePercent(0)
	const b = unsafePercent(0)
	const result = addPercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("addPercent adds to reach exactly 1.0 (100%)", () => {
	const a = unsafePercent(0.6)
	const b = unsafePercent(0.4)
	const result = addPercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 1)
})

Deno.test("addPercent adds small percentages", () => {
	const a = unsafePercent(0.0001)
	const b = unsafePercent(0.0002)
	const result = addPercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.0003)
})

Deno.test("addPercent is commutative", () => {
	const a = unsafePercent(0.25)
	const b = unsafePercent(0.30)
	const result1 = addPercent(a)(b)
	const result2 = addPercent(b)(a)

	assert(isOk(result1))
	assert(isOk(result2))
	assertEquals(result1.value, result2.value)
})

Deno.test("addPercent curried application works", () => {
	const add25Percent = addPercent(unsafePercent(0.25))
	const result = add25Percent(unsafePercent(0.30))

	assert(isOk(result))
	assertEquals(result.value, 0.55)
})

Deno.test("addPercent rejects sum > 1.0 with helpful error", () => {
	const a = unsafePercent(0.7)
	const b = unsafePercent(0.5)
	const result = addPercent(a)(b)

	assert(isError(result))
	assertEquals(result.error.code, "PERCENT_ABOVE_MAXIMUM")
	assertEquals(result.error.field, "percent")
	assert(result.error.suggestion.includes("at most 1"))
})

Deno.test("addPercent rejects sum slightly > 1.0", () => {
	const a = unsafePercent(0.9999)
	const b = unsafePercent(0.0002)
	const result = addPercent(a)(b)

	assert(isError(result))
	assertEquals(result.error.code, "PERCENT_ABOVE_MAXIMUM")
})
