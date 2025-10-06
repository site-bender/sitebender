import { assertEquals } from "@std/assert"

import unsafeDecimal0 from "@sitebender/toolsmith/newtypes/decimal0/unsafeDecimal0/index.ts"
import unwrapDecimal0 from "./index.ts"

Deno.test("unwrapDecimal0 extracts number from whole number Decimal0", () => {
	const decimal0 = unsafeDecimal0(100)
	const result = unwrapDecimal0(decimal0)

	assertEquals(result, 100)
})

Deno.test("unwrapDecimal0 extracts number from zero Decimal0", () => {
	const decimal0 = unsafeDecimal0(0)
	const result = unwrapDecimal0(decimal0)

	assertEquals(result, 0)
})

Deno.test("unwrapDecimal0 extracts number from negative Decimal0", () => {
	const decimal0 = unsafeDecimal0(-50)
	const result = unwrapDecimal0(decimal0)

	assertEquals(result, -50)
})

Deno.test("unwrapDecimal0 extracts number from large Decimal0", () => {
	const decimal0 = unsafeDecimal0(1000000)
	const result = unwrapDecimal0(decimal0)

	assertEquals(result, 1000000)
})
