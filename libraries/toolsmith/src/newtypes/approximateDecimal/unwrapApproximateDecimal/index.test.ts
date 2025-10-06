import { assertEquals } from "@std/assert"

import unsafeApproximateDecimal from "@sitebender/toolsmith/newtypes/approximateDecimal/unsafeApproximateDecimal/index.ts"

import unwrapApproximateDecimal from "./index.ts"

Deno.test("unwrapApproximateDecimal extracts number from ApproximateDecimal", () => {
	const value = unsafeApproximateDecimal(3.14)
	const result = unwrapApproximateDecimal(value)

	assertEquals(result, 3.14)
})

Deno.test("unwrapApproximateDecimal works with zero", () => {
	const value = unsafeApproximateDecimal(0)
	const result = unwrapApproximateDecimal(value)

	assertEquals(result, 0)
})

Deno.test("unwrapApproximateDecimal works with negative numbers", () => {
	const value = unsafeApproximateDecimal(-42.5)
	const result = unwrapApproximateDecimal(value)

	assertEquals(result, -42.5)
})

Deno.test("unwrapApproximateDecimal works with integers", () => {
	const value = unsafeApproximateDecimal(100)
	const result = unwrapApproximateDecimal(value)

	assertEquals(result, 100)
})

Deno.test("unwrapApproximateDecimal works with very small numbers", () => {
	const value = unsafeApproximateDecimal(0.0000001)
	const result = unwrapApproximateDecimal(value)

	assertEquals(result, 0.0000001)
})

Deno.test("unwrapApproximateDecimal works with very large finite numbers", () => {
	const value = unsafeApproximateDecimal(1.7976931348623157e308)
	const result = unwrapApproximateDecimal(value)

	assertEquals(result, 1.7976931348623157e308)
})
