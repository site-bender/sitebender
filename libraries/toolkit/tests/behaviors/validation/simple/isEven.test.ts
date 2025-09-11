import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import isEven from "../../../../src/simple/validation/isEven/index.ts"

Deno.test("isEven: true for even integers including negatives and zero", () => {
	assertEquals(isEven(0), true)
	assertEquals(isEven(2), true)
	assertEquals(isEven(-2), true)
	assertEquals(isEven(100), true)
})

Deno.test("isEven: false for odd or non-integer values", () => {
	assertEquals(isEven(1), false)
	assertEquals(isEven(-1), false)
	assertEquals(isEven(2.5), false)
	assertEquals(isEven(NaN as unknown as number), false)
	assertEquals(isEven(Infinity as unknown as number), false)
	assertEquals(isEven("2" as unknown as number), false)
})
