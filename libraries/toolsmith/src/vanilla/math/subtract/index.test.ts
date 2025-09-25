import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import subtract from "./index.ts"

//++ Tests for subtract: subtrahend→(minuend→minuend−subtrahend); undefined on non-finite
Deno.test("subtract: curried subtrahend then minuend", () => {
	const minus5 = subtract(5)
	const result = typeof minus5 === "function" ? minus5(3) : undefined
	assertEquals(result, -2)
})

Deno.test("subtract: positive difference when minuend > subtrahend", () => {
	const minus3 = subtract(3)
	const result = typeof minus3 === "function" ? minus3(5) : undefined
	assertEquals(result, 2)
})

Deno.test("subtract: non-finite inputs return undefined", () => {
	// @ts-ignore intentional invalid input
	const minusNaN = subtract(NaN as unknown as number)
	const r1 = typeof minusNaN === "function" ? minusNaN(3) : undefined
	assertEquals(r1, undefined)

	const minus5 = subtract(5)
	// @ts-ignore intentional invalid input
	const r2 = typeof minus5 === "function"
		? minus5(NaN as unknown as number)
		: undefined
	assertEquals(r2, undefined)
})
