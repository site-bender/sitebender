import { assert, assertEquals } from "@std/assert"

import _isCurrency from "./index.ts"

Deno.test("_isCurrency accepts valid currency with 2 decimal places", () => {
	const result = _isCurrency(19.99)

	assertEquals(result, true)
})

Deno.test("_isCurrency accepts currency with 1 decimal place", () => {
	const result = _isCurrency(10.5)

	assertEquals(result, true)
})

Deno.test("_isCurrency accepts whole number currency", () => {
	const result = _isCurrency(100)

	assertEquals(result, true)
})

Deno.test("_isCurrency accepts zero", () => {
	const result = _isCurrency(0)

	assertEquals(result, true)
})

Deno.test("_isCurrency accepts negative currency", () => {
	const result = _isCurrency(-50.25)

	assertEquals(result, true)
})

Deno.test("_isCurrency accepts small currency amounts", () => {
	const result = _isCurrency(0.01)

	assertEquals(result, true)
})

Deno.test("_isCurrency rejects Infinity", () => {
	const result = _isCurrency(Infinity)

	assertEquals(result, false)
})

Deno.test("_isCurrency rejects -Infinity", () => {
	const result = _isCurrency(-Infinity)

	assertEquals(result, false)
})

Deno.test("_isCurrency rejects NaN", () => {
	const result = _isCurrency(NaN)

	assertEquals(result, false)
})

Deno.test("_isCurrency rejects numbers with 3 decimal places", () => {
	const result = _isCurrency(19.999)

	assertEquals(result, false)
})

Deno.test("_isCurrency rejects numbers with 4 decimal places", () => {
	const result = _isCurrency(10.1234)

	assertEquals(result, false)
})

Deno.test("_isCurrency rejects numbers with many decimal places", () => {
	const result = _isCurrency(3.141592653589793)

	assertEquals(result, false)
})
