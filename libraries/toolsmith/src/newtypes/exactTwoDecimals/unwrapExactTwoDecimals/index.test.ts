import { assertEquals } from "@std/assert"

import unsafeExactTwoDecimals from "@sitebender/toolsmith/newtypes/exactTwoDecimals/unsafeExactTwoDecimals/index.ts"

import unwrapExactTwoDecimals from "./index.ts"

Deno.test("unwrapExactTwoDecimals extracts number from ExactTwoDecimals with 2 decimals", () => {
	const value = unsafeExactTwoDecimals(19.99)
	const result = unwrapExactTwoDecimals(value)

	assertEquals(result, 19.99)
})

Deno.test("unwrapExactTwoDecimals extracts number from ExactTwoDecimals with 1 decimal", () => {
	const value = unsafeExactTwoDecimals(10.5)
	const result = unwrapExactTwoDecimals(value)

	assertEquals(result, 10.5)
})

Deno.test("unwrapExactTwoDecimals extracts number from whole number ExactTwoDecimals", () => {
	const value = unsafeExactTwoDecimals(100)
	const result = unwrapExactTwoDecimals(value)

	assertEquals(result, 100)
})

Deno.test("unwrapExactTwoDecimals extracts number from zero ExactTwoDecimals", () => {
	const value = unsafeExactTwoDecimals(0)
	const result = unwrapExactTwoDecimals(value)

	assertEquals(result, 0)
})

Deno.test("unwrapExactTwoDecimals extracts number from negative ExactTwoDecimals", () => {
	const value = unsafeExactTwoDecimals(-50.25)
	const result = unwrapExactTwoDecimals(value)

	assertEquals(result, -50.25)
})

Deno.test("unwrapExactTwoDecimals extracts number from small ExactTwoDecimals amount", () => {
	const value = unsafeExactTwoDecimals(0.01)
	const result = unwrapExactTwoDecimals(value)

	assertEquals(result, 0.01)
})
