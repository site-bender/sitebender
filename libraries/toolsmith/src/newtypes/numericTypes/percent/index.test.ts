import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import percent from "./index.ts"

Deno.test("percent accepts zero (0%)", () => {
	const result = percent(0)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("percent accepts one (100%)", () => {
	const result = percent(1)

	assert(isOk(result))
	assertEquals(result.value, 1)
})

Deno.test("percent accepts 0.5 (50%)", () => {
	const result = percent(0.5)

	assert(isOk(result))
	assertEquals(result.value, 0.5)
})

Deno.test("percent accepts 1 decimal place", () => {
	const result = percent(0.1)

	assert(isOk(result))
	assertEquals(result.value, 0.1)
})

Deno.test("percent accepts 2 decimal places", () => {
	const result = percent(0.25)

	assert(isOk(result))
	assertEquals(result.value, 0.25)
})

Deno.test("percent accepts 4 decimal places", () => {
	const result = percent(0.1234)

	assert(isOk(result))
	assertEquals(result.value, 0.1234)
})

Deno.test("percent accepts common tax rate (8.25%)", () => {
	const result = percent(0.0825)

	assert(isOk(result))
	assertEquals(result.value, 0.0825)
})

Deno.test("percent accepts small percentage (0.01%)", () => {
	const result = percent(0.0001)

	assert(isOk(result))
	assertEquals(result.value, 0.0001)
})

Deno.test("percent accepts 15% (sales tax)", () => {
	const result = percent(0.15)

	assert(isOk(result))
	assertEquals(result.value, 0.15)
})

Deno.test("percent accepts 99.99%", () => {
	const result = percent(0.9999)

	assert(isOk(result))
	assertEquals(result.value, 0.9999)
})

Deno.test("percent rejects 5 decimal places with helpful error", () => {
	const result = percent(0.12345)

	assert(isError(result))
	assertEquals(result.error.code, "PERCENT_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "percent")
	assertEquals(result.error.received, 0.12345)
	assertEquals(result.error.expected, "Number with at most 4 decimal places")
	assert(result.error.suggestion.includes("4 decimal places"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("percent rejects negative values with helpful error", () => {
	const result = percent(-0.5)

	assert(isError(result))
	assertEquals(result.error.code, "PERCENT_BELOW_MINIMUM")
	assertEquals(result.error.field, "percent")
	assertEquals(result.error.received, -0.5)
	assertEquals(result.error.expected, "Number between 0 and 1")
	assert(result.error.suggestion.includes("non-negative"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("percent rejects values > 1 with helpful error", () => {
	const result = percent(1.5)

	assert(isError(result))
	assertEquals(result.error.code, "PERCENT_ABOVE_MAXIMUM")
	assertEquals(result.error.field, "percent")
	assertEquals(result.error.received, 1.5)
	assertEquals(result.error.expected, "Number between 0 and 1")
	assert(result.error.suggestion.includes("at most 1"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("percent rejects Infinity with helpful error", () => {
	const result = percent(Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "PERCENT_NOT_FINITE")
	assertEquals(result.error.field, "percent")
	assertEquals(result.error.received, Infinity)
	assertEquals(
		result.error.expected,
		"Finite number in range 0-1 with at most 4 decimal places",
	)
	assert(result.error.suggestion.includes("finite"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("percent rejects -Infinity with helpful error", () => {
	const result = percent(-Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "PERCENT_NOT_FINITE")
	assertEquals(result.error.field, "percent")
})

Deno.test("percent rejects NaN with helpful error", () => {
	const result = percent(NaN)

	assert(isError(result))
	assertEquals(result.error.code, "PERCENT_NOT_FINITE")
	assertEquals(result.error.field, "percent")
	assert(Number.isNaN(result.error.received))
})
