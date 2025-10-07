import { assert, assertEquals } from "@std/assert"

import type { RealNumber } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeRealNumber from "./index.ts"

Deno.test("unsafeRealNumber brands a number as RealNumber", () => {
	const result: RealNumber = unsafeRealNumber(3.14)

	assertEquals(result, 3.14)
})

Deno.test("unsafeRealNumber works with zero", () => {
	const result: RealNumber = unsafeRealNumber(0)

	assertEquals(result, 0)
})

Deno.test("unsafeRealNumber works with negative numbers", () => {
	const result: RealNumber = unsafeRealNumber(-42.5)

	assertEquals(result, -42.5)
})

Deno.test("unsafeRealNumber works with integers", () => {
	const result: RealNumber = unsafeRealNumber(100)

	assertEquals(result, 100)
})

Deno.test("unsafeRealNumber works with very small numbers", () => {
	const result: RealNumber = unsafeRealNumber(0.0000001)

	assertEquals(result, 0.0000001)
})

Deno.test("unsafeRealNumber works with very large finite numbers", () => {
	const result: RealNumber = unsafeRealNumber(
		1.7976931348623157e308,
	)

	assertEquals(result, 1.7976931348623157e308)
})

Deno.test("unsafeRealNumber does not validate - accepts Infinity", () => {
	const result = unsafeRealNumber(Infinity)

	assertEquals(result, Infinity)
})

Deno.test("unsafeRealNumber does not validate - accepts -Infinity", () => {
	const result = unsafeRealNumber(-Infinity)

	assertEquals(result, -Infinity)
})

Deno.test("unsafeRealNumber does not validate - accepts NaN", () => {
	const result = unsafeRealNumber(NaN)

	assert(Number.isNaN(result))
})
