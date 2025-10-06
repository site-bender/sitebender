import { assert, assertEquals } from "@std/assert"

import type { ApproximateDecimal } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeApproximateDecimal from "./index.ts"

Deno.test("unsafeApproximateDecimal brands a number as ApproximateDecimal", () => {
	const result: ApproximateDecimal = unsafeApproximateDecimal(3.14)

	assertEquals(result, 3.14)
})

Deno.test("unsafeApproximateDecimal works with zero", () => {
	const result: ApproximateDecimal = unsafeApproximateDecimal(0)

	assertEquals(result, 0)
})

Deno.test("unsafeApproximateDecimal works with negative numbers", () => {
	const result: ApproximateDecimal = unsafeApproximateDecimal(-42.5)

	assertEquals(result, -42.5)
})

Deno.test("unsafeApproximateDecimal works with integers", () => {
	const result: ApproximateDecimal = unsafeApproximateDecimal(100)

	assertEquals(result, 100)
})

Deno.test("unsafeApproximateDecimal works with very small numbers", () => {
	const result: ApproximateDecimal = unsafeApproximateDecimal(0.0000001)

	assertEquals(result, 0.0000001)
})

Deno.test("unsafeApproximateDecimal works with very large finite numbers", () => {
	const result: ApproximateDecimal = unsafeApproximateDecimal(
		1.7976931348623157e308,
	)

	assertEquals(result, 1.7976931348623157e308)
})

Deno.test("unsafeApproximateDecimal does not validate - accepts Infinity", () => {
	const result = unsafeApproximateDecimal(Infinity)

	assertEquals(result, Infinity)
})

Deno.test("unsafeApproximateDecimal does not validate - accepts -Infinity", () => {
	const result = unsafeApproximateDecimal(-Infinity)

	assertEquals(result, -Infinity)
})

Deno.test("unsafeApproximateDecimal does not validate - accepts NaN", () => {
	const result = unsafeApproximateDecimal(NaN)

	assert(Number.isNaN(result))
})
