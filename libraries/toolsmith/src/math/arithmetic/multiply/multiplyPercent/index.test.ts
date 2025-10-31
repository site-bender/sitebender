import { assert, assertEquals } from "@std/assert"

import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import unsafePercent from "@sitebender/toolsmith/newtypes/numericTypes/percent/unsafePercent/index.ts"

import multiplyPercent from "./index.ts"

Deno.test("multiplyPercent multiplies two percentages (50% × 20% = 10%)", () => {
	const a = unsafePercent(0.5)
	const b = unsafePercent(0.2)
	const result = multiplyPercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.1)
})

Deno.test("multiplyPercent multiplies by zero", () => {
	const a = unsafePercent(0.75)
	const b = unsafePercent(0)
	const result = multiplyPercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("multiplyPercent multiplies by one (100%)", () => {
	const a = unsafePercent(0.75)
	const b = unsafePercent(1)
	const result = multiplyPercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.75)
})

Deno.test("multiplyPercent multiplies 100% × 100% = 100%", () => {
	const a = unsafePercent(1)
	const b = unsafePercent(1)
	const result = multiplyPercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 1)
})

Deno.test("multiplyPercent compounding interest example (4.5% × 80%)", () => {
	const a = unsafePercent(0.045)
	const b = unsafePercent(0.8)
	const result = multiplyPercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.036)
})

Deno.test("multiplyPercent small percentages", () => {
	const a = unsafePercent(0.01)
	const b = unsafePercent(0.01)
	const result = multiplyPercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.0001)
})

Deno.test("multiplyPercent is commutative", () => {
	const a = unsafePercent(0.5)
	const b = unsafePercent(0.2)
	const result1 = multiplyPercent(a)(b)
	const result2 = multiplyPercent(b)(a)

	assert(isOk(result1))
	assert(isOk(result2))
	assertEquals(result1.value, result2.value)
})

Deno.test("multiplyPercent curried application works", () => {
	const multiplyBy50Percent = multiplyPercent(unsafePercent(0.5))
	const result = multiplyBy50Percent(unsafePercent(0.2))

	assert(isOk(result))
	assertEquals(result.value, 0.1)
})

Deno.test("multiplyPercent 25% × 25% = 6.25%", () => {
	const a = unsafePercent(0.25)
	const b = unsafePercent(0.25)
	const result = multiplyPercent(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.0625)
})
