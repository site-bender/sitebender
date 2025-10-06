import { assert, assertEquals } from "@std/assert"

import type { Percent } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafePercent from "./index.ts"

Deno.test("unsafePercent brands a number as Percent", () => {
	const result: Percent = unsafePercent(0.5)

	assertEquals(result, 0.5)
})

Deno.test("unsafePercent works with zero", () => {
	const result: Percent = unsafePercent(0)

	assertEquals(result, 0)
})

Deno.test("unsafePercent works with one (100%)", () => {
	const result: Percent = unsafePercent(1)

	assertEquals(result, 1)
})

Deno.test("unsafePercent works with common percentages", () => {
	const result: Percent = unsafePercent(0.25)

	assertEquals(result, 0.25)
})

Deno.test("unsafePercent works with 4 decimal places", () => {
	const result: Percent = unsafePercent(0.1234)

	assertEquals(result, 0.1234)
})

Deno.test("unsafePercent works with tax rates", () => {
	const result: Percent = unsafePercent(0.0825)

	assertEquals(result, 0.0825)
})

Deno.test("unsafePercent does not validate - accepts values > 1", () => {
	const result = unsafePercent(2)

	assertEquals(result, 2)
})

Deno.test("unsafePercent does not validate - accepts negative values", () => {
	const result = unsafePercent(-0.5)

	assertEquals(result, -0.5)
})

Deno.test("unsafePercent does not validate - accepts 5 decimal places", () => {
	const result = unsafePercent(0.12345)

	assertEquals(result, 0.12345)
})

Deno.test("unsafePercent does not validate - accepts Infinity", () => {
	const result = unsafePercent(Infinity)

	assertEquals(result, Infinity)
})

Deno.test("unsafePercent does not validate - accepts -Infinity", () => {
	const result = unsafePercent(-Infinity)

	assertEquals(result, -Infinity)
})

Deno.test("unsafePercent does not validate - accepts NaN", () => {
	const result = unsafePercent(NaN)

	assert(Number.isNaN(result))
})
