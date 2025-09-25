import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import reduce from "../../../array/reduce/index.ts"
import { ADDITIVE_IDENTITY } from "../../constants/index.ts"
import sumAddends from "./index.ts"

//++ Tests for sumAddends: (total, value) => total + value
Deno.test("sumAddends: direct calls", () => {
	assertEquals(sumAddends(0, 1), 1)
	assertEquals(sumAddends(3, 4), 7)
})

Deno.test("sumAddends: reduce over array", () => {
	const result = reduce(sumAddends)(ADDITIVE_IDENTITY)([1, 2, 3])
	assertEquals(result, 6)
})

Deno.test("sumAddends: reduce with negatives", () => {
	const result = reduce(sumAddends)(ADDITIVE_IDENTITY)([5, -2, -3])
	assertEquals(result, 0)
})

Deno.test("sumAddends: empty array returns initial", () => {
	const result = reduce(sumAddends)(42)([])
	assertEquals(result, 42)
})
