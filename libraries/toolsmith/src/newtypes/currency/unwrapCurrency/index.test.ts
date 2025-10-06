import { assertEquals } from "@std/assert"

import unsafeCurrency from "@sitebender/toolsmith/newtypes/currency/unsafeCurrency/index.ts"
import unwrapCurrency from "./index.ts"

Deno.test("unwrapCurrency extracts number from Currency with 2 decimals", () => {
	const currency = unsafeCurrency(19.99)
	const result = unwrapCurrency(currency)

	assertEquals(result, 19.99)
})

Deno.test("unwrapCurrency extracts number from Currency with 1 decimal", () => {
	const currency = unsafeCurrency(10.5)
	const result = unwrapCurrency(currency)

	assertEquals(result, 10.5)
})

Deno.test("unwrapCurrency extracts number from whole number Currency", () => {
	const currency = unsafeCurrency(100)
	const result = unwrapCurrency(currency)

	assertEquals(result, 100)
})

Deno.test("unwrapCurrency extracts number from zero Currency", () => {
	const currency = unsafeCurrency(0)
	const result = unwrapCurrency(currency)

	assertEquals(result, 0)
})

Deno.test("unwrapCurrency extracts number from negative Currency", () => {
	const currency = unsafeCurrency(-50.25)
	const result = unwrapCurrency(currency)

	assertEquals(result, -50.25)
})

Deno.test("unwrapCurrency extracts number from small Currency amount", () => {
	const currency = unsafeCurrency(0.01)
	const result = unwrapCurrency(currency)

	assertEquals(result, 0.01)
})
