import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import add from "./index.ts"

//++ Tests for add: number→(number→sum) or Array<number>→sum; undefined on non-finite
Deno.test("add: curried number addition", () => {
	const add2 = add(2)
	const result = typeof add2 === "function" ? add2(3) : undefined
	assertEquals(result, 5)
})

Deno.test("add: array of numbers sums to total", () => {
	const result = add([1, 2, 3]) as number | undefined
	assertEquals(result, 6)
})

Deno.test("add: empty array returns 0", () => {
	const result = add([]) as number | undefined
	assertEquals(result, 0)
})

Deno.test("add: invalid augend returns undefined (NaN)", () => {
	// @ts-ignore intentional invalid input per test rules
	const result = add(NaN as unknown as number)
	assertEquals(result, undefined)
})

Deno.test("add: invalid addend returns undefined (Infinity)", () => {
	const add2 = add(2)
	const result = typeof add2 === "function" ? add2(Infinity) : undefined
	assertEquals(result, undefined)
})

Deno.test("add: array with non-finite returns undefined", () => {
	const result = add([1, Infinity, 2]) as number | undefined
	assertEquals(result, undefined)
})

Deno.test("add: function return shape for number input", () => {
	const fn = add(5)
	assertEquals(typeof fn, "function")
	const result = typeof fn === "function" ? fn(7) : undefined
	assertEquals(result, 12)
})
