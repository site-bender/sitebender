import { assert, assertEquals } from "@std/assert"

import unsafeFloat from "@sitebender/toolsmith/newtypes/float/unsafeFloat/index.ts"

import unwrapFloat from "./index.ts"

Deno.test("unwrapFloat extracts number from Float", () => {
	const float = unsafeFloat(3.14)
	const result = unwrapFloat(float)

	assertEquals(result, 3.14)
})

Deno.test("unwrapFloat works with zero", () => {
	const float = unsafeFloat(0)
	const result = unwrapFloat(float)

	assertEquals(result, 0)
})

Deno.test("unwrapFloat works with negative numbers", () => {
	const float = unsafeFloat(-42.5)
	const result = unwrapFloat(float)

	assertEquals(result, -42.5)
})

Deno.test("unwrapFloat works with integers", () => {
	const float = unsafeFloat(100)
	const result = unwrapFloat(float)

	assertEquals(result, 100)
})

Deno.test("unwrapFloat works with very small numbers", () => {
	const float = unsafeFloat(0.0000001)
	const result = unwrapFloat(float)

	assertEquals(result, 0.0000001)
})

Deno.test("unwrapFloat works with very large finite numbers", () => {
	const float = unsafeFloat(1.7976931348623157e308)
	const result = unwrapFloat(float)

	assertEquals(result, 1.7976931348623157e308)
})
