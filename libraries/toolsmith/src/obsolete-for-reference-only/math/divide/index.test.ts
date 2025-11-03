import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import divide from "./index.ts"

//++ Tests for divide: number→(number→quotient); undefined on non-finite or zero divisor
Deno.test("divide: curried with divisor first", () => {
	const by2 = divide(2)
	const result = typeof by2 === "function" ? by2(10) : undefined
	assertEquals(result, 5)
})

Deno.test("divide: zero divisor returns undefined", () => {
	const by0 = divide(0)
	const result = typeof by0 === "function" ? by0(10) : undefined
	assertEquals(result, undefined)
})

Deno.test("divide: non-finite inputs return undefined", () => {
	// @ts-ignore intentional invalid input
	const byNaN = divide(NaN as unknown as number)
	const r1 = typeof byNaN === "function" ? byNaN(10) : undefined
	assertEquals(r1, undefined)

	const by2 = divide(2)
	// @ts-ignore intentional invalid input
	const r2 = typeof by2 === "function"
		? by2(NaN as unknown as number)
		: undefined
	assertEquals(r2, undefined)
})
