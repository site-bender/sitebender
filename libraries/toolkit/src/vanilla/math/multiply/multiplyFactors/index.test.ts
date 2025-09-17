import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import { MULTIPLICATIVE_IDENTITY } from "../../constants/index.ts"
import reduce from "../../../array/reduce/index.ts"
import multiplyFactors from "./index.ts"

//++ Tests for multiplyFactors: (product, value) => product * value
Deno.test("multiplyFactors: direct calls", () => {
	assertEquals(multiplyFactors(1, 2), 2)
	assertEquals(multiplyFactors(6, 3), 18)
})

Deno.test("multiplyFactors: reduce over array", () => {
	const result = reduce(multiplyFactors)(MULTIPLICATIVE_IDENTITY)([2, 3, 4])
	assertEquals(result, 24)
})

Deno.test("multiplyFactors: reduce with zero annihilator", () => {
	const result = reduce(multiplyFactors)(MULTIPLICATIVE_IDENTITY)([5, 0, 7])
	assertEquals(result, 0)
})

Deno.test("multiplyFactors: empty array returns initial (identity)", () => {
	const result = reduce(multiplyFactors)(7)([])
	assertEquals(result, 7)
})
