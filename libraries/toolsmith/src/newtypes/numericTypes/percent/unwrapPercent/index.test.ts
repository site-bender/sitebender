import { assertEquals } from "@std/assert"

import unsafePercent from "@sitebender/toolsmith/newtypes/percent/unsafePercent/index.ts"

import unwrapPercent from "./index.ts"

Deno.test("unwrapPercent extracts number from Percent", () => {
	const value = unsafePercent(0.5)
	const result = unwrapPercent(value)

	assertEquals(result, 0.5)
})

Deno.test("unwrapPercent works with zero", () => {
	const value = unsafePercent(0)
	const result = unwrapPercent(value)

	assertEquals(result, 0)
})

Deno.test("unwrapPercent works with one (100%)", () => {
	const value = unsafePercent(1)
	const result = unwrapPercent(value)

	assertEquals(result, 1)
})

Deno.test("unwrapPercent works with common percentages", () => {
	const value = unsafePercent(0.25)
	const result = unwrapPercent(value)

	assertEquals(result, 0.25)
})

Deno.test("unwrapPercent works with 4 decimal places", () => {
	const value = unsafePercent(0.1234)
	const result = unwrapPercent(value)

	assertEquals(result, 0.1234)
})

Deno.test("unwrapPercent works with tax rates", () => {
	const value = unsafePercent(0.0825)
	const result = unwrapPercent(value)

	assertEquals(result, 0.0825)
})

Deno.test("unwrapPercent works with small percentages", () => {
	const value = unsafePercent(0.0001)
	const result = unwrapPercent(value)

	assertEquals(result, 0.0001)
})
