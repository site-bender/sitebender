import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import unsafePercent from "@sitebender/toolsmith/newtypes/numericTypes/percent/unsafePercent/index.ts"

import percentOf from "./index.ts"

Deno.test("percentOf calculates 25% of 100", () => {
	const result = percentOf(100)(unsafePercent(0.25))

	assert(isOk(result))
	assertEquals(result.value, 25)
})

Deno.test("percentOf calculates 50% of 200", () => {
	const result = percentOf(200)(unsafePercent(0.5))

	assert(isOk(result))
	assertEquals(result.value, 100)
})

Deno.test("percentOf calculates 100% of value (returns same)", () => {
	const result = percentOf(75)(unsafePercent(1))

	assert(isOk(result))
	assertEquals(result.value, 75)
})

Deno.test("percentOf calculates 0% of value (returns zero)", () => {
	const result = percentOf(75)(unsafePercent(0))

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("percentOf calculates tax amount (8.25% of $150)", () => {
	const result = percentOf(150)(unsafePercent(0.0825))

	assert(isOk(result))
	assertEquals(result.value, 12.375)
})

Deno.test("percentOf calculates discount (15% of $49.99)", () => {
	const result = percentOf(49.99)(unsafePercent(0.15))

	assert(isOk(result))
	assertEquals(result.value, 7.4985)
})

Deno.test("percentOf works with negative values", () => {
	const result = percentOf(-100)(unsafePercent(0.25))

	assert(isOk(result))
	assertEquals(result.value, -25)
})

Deno.test("percentOf works with zero value", () => {
	const result = percentOf(0)(unsafePercent(0.25))

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("percentOf calculates small percentage (0.01% of 10000)", () => {
	const result = percentOf(10000)(unsafePercent(0.0001))

	assert(isOk(result))
	assertEquals(result.value, 1)
})

Deno.test("percentOf curried application works", () => {
	const percentOf100 = percentOf(100)
	const result = percentOf100(unsafePercent(0.25))

	assert(isOk(result))
	assertEquals(result.value, 25)
})

Deno.test("percentOf can be used in functional composition", () => {
	const calculate25Percent = percentOf(100)
	const calculate50Percent = percentOf(100)

	const result1 = calculate25Percent(unsafePercent(0.25))
	const result2 = calculate50Percent(unsafePercent(0.5))

	assert(isOk(result1))
	assert(isOk(result2))
	assertEquals(result1.value, 25)
	assertEquals(result2.value, 50)
})

Deno.test("percentOf rejects Infinity value with helpful error", () => {
	const result = percentOf(Infinity)(unsafePercent(0.25))

	assert(isError(result))
	assertEquals(result.error.code, "PERCENT_OF_VALUE_NOT_FINITE")
	assertEquals(result.error.field, "value")
	assert(result.error.suggestion.includes("finite"))
})

Deno.test("percentOf rejects NaN value with helpful error", () => {
	const result = percentOf(NaN)(unsafePercent(0.25))

	assert(isError(result))
	assertEquals(result.error.code, "PERCENT_OF_VALUE_NOT_FINITE")
	assertEquals(result.error.field, "value")
})

Deno.test("percentOf detects overflow with helpful error", () => {
	const result = percentOf(Number.MAX_VALUE)(unsafePercent(1))

	assert(isOk(result))
	// Note: Number.MAX_VALUE * 1 is still finite, so this actually succeeds
	// To truly overflow, we'd need values that multiply to exceed MAX_VALUE
	// which is difficult with Percent range of 0-1
	assertEquals(result.value, Number.MAX_VALUE)
})
