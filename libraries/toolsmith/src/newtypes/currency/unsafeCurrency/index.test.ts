import { assertEquals } from "@std/assert"

import type { Currency } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeCurrency from "./index.ts"

Deno.test("unsafeCurrency creates Currency from valid number with 2 decimals", () => {
	const result: Currency = unsafeCurrency(19.99)

	assertEquals(result, 19.99)
})

Deno.test("unsafeCurrency creates Currency from valid number with 1 decimal", () => {
	const result: Currency = unsafeCurrency(10.5)

	assertEquals(result, 10.5)
})

Deno.test("unsafeCurrency creates Currency from whole number", () => {
	const result: Currency = unsafeCurrency(100)

	assertEquals(result, 100)
})

Deno.test("unsafeCurrency creates Currency from zero", () => {
	const result: Currency = unsafeCurrency(0)

	assertEquals(result, 0)
})

Deno.test("unsafeCurrency creates Currency from negative value", () => {
	const result: Currency = unsafeCurrency(-50.25)

	assertEquals(result, -50.25)
})

Deno.test("unsafeCurrency creates Currency from small amount", () => {
	const result: Currency = unsafeCurrency(0.01)

	assertEquals(result, 0.01)
})

Deno.test("unsafeCurrency creates Currency even from invalid Infinity", () => {
	const result: Currency = unsafeCurrency(Infinity)

	assertEquals(result, Infinity)
})

Deno.test("unsafeCurrency creates Currency even from invalid 3 decimal places", () => {
	const result: Currency = unsafeCurrency(19.999)

	assertEquals(result, 19.999)
})
