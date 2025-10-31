import { assert, assertEquals } from "@std/assert"

import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import unsafeEightDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/eightDecimalPlaces/unsafeEightDecimalPlaces/index.ts"

import addEightDecimalPlaces from "./index.ts"

Deno.test("addEightDecimalPlaces adds two positive numbers", () => {
	const a = unsafeEightDecimalPlaces(0.12345678)
	const b = unsafeEightDecimalPlaces(0.87654321)
	const result = addEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.99999999)
})

Deno.test("addEightDecimalPlaces adds satoshis (1 + 1 = 2)", () => {
	const a = unsafeEightDecimalPlaces(0.00000001)
	const b = unsafeEightDecimalPlaces(0.00000001)
	const result = addEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.00000002)
})

Deno.test("addEightDecimalPlaces adds zero", () => {
	const a = unsafeEightDecimalPlaces(0.12345678)
	const b = unsafeEightDecimalPlaces(0)
	const result = addEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.12345678)
})

Deno.test("addEightDecimalPlaces adds negative numbers", () => {
	const a = unsafeEightDecimalPlaces(-0.12345678)
	const b = unsafeEightDecimalPlaces(-0.87654321)
	const result = addEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, -0.99999999)
})

Deno.test("addEightDecimalPlaces adds positive and negative", () => {
	const a = unsafeEightDecimalPlaces(1.00000000)
	const b = unsafeEightDecimalPlaces(-0.50000000)
	const result = addEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.5)
})

Deno.test("addEightDecimalPlaces adds integers", () => {
	const a = unsafeEightDecimalPlaces(100)
	const b = unsafeEightDecimalPlaces(200)
	const result = addEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 300)
})

Deno.test("addEightDecimalPlaces is commutative", () => {
	const a = unsafeEightDecimalPlaces(0.12345678)
	const b = unsafeEightDecimalPlaces(0.87654321)
	const result1 = addEightDecimalPlaces(a)(b)
	const result2 = addEightDecimalPlaces(b)(a)

	assert(isOk(result1))
	assert(isOk(result2))
	assertEquals(result1.value, result2.value)
})

Deno.test("addEightDecimalPlaces curried application works", () => {
	const add5 = addEightDecimalPlaces(unsafeEightDecimalPlaces(0.00000005))
	const result = add5(unsafeEightDecimalPlaces(0.00000003))

	assert(isOk(result))
	assertEquals(result.value, 0.00000008)
})
