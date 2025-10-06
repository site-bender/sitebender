import { assert, assertEquals } from "@std/assert"

import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import unsafeEightDecimalPlaces from "@sitebender/toolsmith/newtypes/eightDecimalPlaces/unsafeEightDecimalPlaces/index.ts"

import multiplyEightDecimalPlaces from "./index.ts"

Deno.test("multiplyEightDecimalPlaces multiplies two positive numbers", () => {
	const a = unsafeEightDecimalPlaces(2)
	const b = unsafeEightDecimalPlaces(0.5)
	const result = multiplyEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 1)
})

Deno.test("multiplyEightDecimalPlaces multiplies satoshis", () => {
	const a = unsafeEightDecimalPlaces(0.00000001)
	const b = unsafeEightDecimalPlaces(100)
	const result = multiplyEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.000001)
})

Deno.test("multiplyEightDecimalPlaces multiplies by zero", () => {
	const a = unsafeEightDecimalPlaces(0.12345678)
	const b = unsafeEightDecimalPlaces(0)
	const result = multiplyEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("multiplyEightDecimalPlaces multiplies by one", () => {
	const a = unsafeEightDecimalPlaces(0.12345678)
	const b = unsafeEightDecimalPlaces(1)
	const result = multiplyEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.12345678)
})

Deno.test("multiplyEightDecimalPlaces multiplies negative numbers", () => {
	const a = unsafeEightDecimalPlaces(-2)
	const b = unsafeEightDecimalPlaces(0.5)
	const result = multiplyEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, -1)
})

Deno.test("multiplyEightDecimalPlaces multiplies two negative numbers", () => {
	const a = unsafeEightDecimalPlaces(-2)
	const b = unsafeEightDecimalPlaces(-0.5)
	const result = multiplyEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 1)
})

Deno.test("multiplyEightDecimalPlaces multiplies integers", () => {
	const a = unsafeEightDecimalPlaces(10)
	const b = unsafeEightDecimalPlaces(20)
	const result = multiplyEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 200)
})

Deno.test("multiplyEightDecimalPlaces is commutative", () => {
	const a = unsafeEightDecimalPlaces(0.00000003)
	const b = unsafeEightDecimalPlaces(100)
	const result1 = multiplyEightDecimalPlaces(a)(b)
	const result2 = multiplyEightDecimalPlaces(b)(a)

	assert(isOk(result1))
	assert(isOk(result2))
	assertEquals(result1.value, result2.value)
})

Deno.test("multiplyEightDecimalPlaces curried application works", () => {
	const double = multiplyEightDecimalPlaces(unsafeEightDecimalPlaces(2))
	const result = double(unsafeEightDecimalPlaces(0.00000005))

	assert(isOk(result))
	assertEquals(result.value, 0.0000001)
})
