import { assert, assertEquals } from "@std/assert"

import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import unsafeEightDecimalPlaces from "@sitebender/toolsmith/newtypes/eightDecimalPlaces/unsafeEightDecimalPlaces/index.ts"

import subtractEightDecimalPlaces from "./index.ts"

Deno.test("subtractEightDecimalPlaces subtracts two positive numbers", () => {
	const a = unsafeEightDecimalPlaces(0.99999999)
	const b = unsafeEightDecimalPlaces(0.12345678)
	const result = subtractEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.87654321)
})

Deno.test("subtractEightDecimalPlaces subtracts satoshis (2 - 1 = 1)", () => {
	const a = unsafeEightDecimalPlaces(0.00000002)
	const b = unsafeEightDecimalPlaces(0.00000001)
	const result = subtractEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.00000001)
})

Deno.test("subtractEightDecimalPlaces subtracts zero", () => {
	const a = unsafeEightDecimalPlaces(0.12345678)
	const b = unsafeEightDecimalPlaces(0)
	const result = subtractEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.12345678)
})

Deno.test("subtractEightDecimalPlaces subtracts from zero", () => {
	const a = unsafeEightDecimalPlaces(0)
	const b = unsafeEightDecimalPlaces(0.12345678)
	const result = subtractEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, -0.12345678)
})

Deno.test("subtractEightDecimalPlaces subtracts negative numbers", () => {
	const a = unsafeEightDecimalPlaces(-0.12345678)
	const b = unsafeEightDecimalPlaces(-0.87654321)
	const result = subtractEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.75308643)
})

Deno.test("subtractEightDecimalPlaces subtracts same number equals zero", () => {
	const a = unsafeEightDecimalPlaces(0.12345678)
	const b = unsafeEightDecimalPlaces(0.12345678)
	const result = subtractEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("subtractEightDecimalPlaces subtracts integers", () => {
	const a = unsafeEightDecimalPlaces(300)
	const b = unsafeEightDecimalPlaces(100)
	const result = subtractEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 200)
})

Deno.test("subtractEightDecimalPlaces curried application works", () => {
	const subtract5 = subtractEightDecimalPlaces(
		unsafeEightDecimalPlaces(0.00000010),
	)
	const result = subtract5(unsafeEightDecimalPlaces(0.00000003))

	assert(isOk(result))
	assertEquals(result.value, 0.00000007)
})
