import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import cartesianProduct from "../../../../src/simple/array/cartesianProduct/index.ts"
import xprod from "../../../../src/simple/array/xprod/index.ts"

// Verify that xprod is an alias for cartesianProduct
Deno.test("xprod - is an alias for cartesianProduct", () => {
	assertEquals(xprod, cartesianProduct)
})

// Test basic functionality to ensure the alias works
Deno.test("xprod - basic functionality works", () => {
	assertEquals(xprod([1, 2])([3, 4]), [[1, 3], [1, 4], [2, 3], [2, 4]])
})

Deno.test("xprod - handles empty arrays", () => {
	assertEquals(xprod([])([1, 2]), [])
	assertEquals(xprod([1, 2])([]), [])
})

Deno.test("xprod - handles mixed types", () => {
	assertEquals(xprod(["a", "b"])([1, 2]), [
		["a", 1],
		["a", 2],
		["b", 1],
		["b", 2],
	])
})

Deno.test("xprod - partial application works", () => {
	const withNumbers = xprod([1, 2, 3])
	assertEquals(withNumbers(["a", "b"]), [
		[1, "a"],
		[1, "b"],
		[2, "a"],
		[2, "b"],
		[3, "a"],
		[3, "b"],
	])
})

// Type safety
Deno.test("xprod - maintains type safety", () => {
	const result = xprod([1, 2])(["a", "b"])
	assertEquals(result, [[1, "a"], [1, "b"], [2, "a"], [2, "b"]])
})
