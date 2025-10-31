import { assertEquals } from "@std/assert"

import unsafeRealNumber from "@sitebender/toolsmith/newtypes/numericTypes/realNumber/unsafeRealNumber/index.ts"

import unwrapRealNumber from "./index.ts"

Deno.test("unwrapRealNumber extracts number from RealNumber", () => {
	const value = unsafeRealNumber(3.14)
	const result = unwrapRealNumber(value)

	assertEquals(result, 3.14)
})

Deno.test("unwrapRealNumber works with zero", () => {
	const value = unsafeRealNumber(0)
	const result = unwrapRealNumber(value)

	assertEquals(result, 0)
})

Deno.test("unwrapRealNumber works with negative numbers", () => {
	const value = unsafeRealNumber(-42.5)
	const result = unwrapRealNumber(value)

	assertEquals(result, -42.5)
})

Deno.test("unwrapRealNumber works with integers", () => {
	const value = unsafeRealNumber(100)
	const result = unwrapRealNumber(value)

	assertEquals(result, 100)
})

Deno.test("unwrapRealNumber works with very small numbers", () => {
	const value = unsafeRealNumber(0.0000001)
	const result = unwrapRealNumber(value)

	assertEquals(result, 0.0000001)
})

Deno.test("unwrapRealNumber works with very large finite numbers", () => {
	const value = unsafeRealNumber(1.7976931348623157e308)
	const result = unwrapRealNumber(value)

	assertEquals(result, 1.7976931348623157e308)
})
