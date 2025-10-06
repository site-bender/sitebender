import { assert, assertEquals } from "@std/assert"

import type { Float } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeFloat from "./index.ts"

Deno.test("unsafeFloat brands a number as Float", () => {
	const result: Float = unsafeFloat(3.14)

	assertEquals(result, 3.14)
})

Deno.test("unsafeFloat works with zero", () => {
	const result: Float = unsafeFloat(0)

	assertEquals(result, 0)
})

Deno.test("unsafeFloat works with negative numbers", () => {
	const result: Float = unsafeFloat(-42.5)

	assertEquals(result, -42.5)
})

Deno.test("unsafeFloat works with integers", () => {
	const result: Float = unsafeFloat(100)

	assertEquals(result, 100)
})

Deno.test("unsafeFloat works with very small numbers", () => {
	const result: Float = unsafeFloat(0.0000001)

	assertEquals(result, 0.0000001)
})

Deno.test("unsafeFloat works with very large finite numbers", () => {
	const result: Float = unsafeFloat(1.7976931348623157e308)

	assertEquals(result, 1.7976931348623157e308)
})

Deno.test("unsafeFloat does not validate - accepts Infinity", () => {
	const result = unsafeFloat(Infinity)

	assertEquals(result, Infinity)
})

Deno.test("unsafeFloat does not validate - accepts -Infinity", () => {
	const result = unsafeFloat(-Infinity)

	assertEquals(result, -Infinity)
})

Deno.test("unsafeFloat does not validate - accepts NaN", () => {
	const result = unsafeFloat(NaN)

	assert(Number.isNaN(result))
})
