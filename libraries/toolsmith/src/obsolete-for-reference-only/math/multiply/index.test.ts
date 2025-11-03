import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import multiply from "./index.ts"

//++ Tests for multiply: number→(number→product) or Array<number>→product; undefined on non-finite
Deno.test("multiply: curried multiplication", () => {
	const times2 = multiply(2)
	const result = typeof times2 === "function" ? times2(3) : undefined
	assertEquals(result, 6)
})

Deno.test("multiply: array of numbers multiplies to product", () => {
	const result = multiply([2, 3, 4]) as number | undefined
	assertEquals(result, 24)
})

Deno.test("multiply: empty array returns 1 (multiplicative identity)", () => {
	const result = multiply([]) as number | undefined
	assertEquals(result, 1)
})

Deno.test("multiply: invalid multiplicand returns undefined (NaN)", () => {
	// @ts-ignore intentional invalid input per test rules
	const result = multiply(NaN as unknown as number)
	assertEquals(result, undefined)
})

Deno.test("multiply: invalid multiplier returns undefined (Infinity)", () => {
	const times2 = multiply(2)
	const result = typeof times2 === "function" ? times2(Infinity) : undefined
	assertEquals(result, undefined)
})

Deno.test("multiply: array with non-finite returns undefined", () => {
	const result = multiply([2, Infinity, 3]) as number | undefined
	assertEquals(result, undefined)
})

Deno.test("multiply: function return shape for number input", () => {
	const fn = multiply(5)
	assertEquals(typeof fn, "function")
	const result = typeof fn === "function" ? fn(7) : undefined
	assertEquals(result, 35)
})
