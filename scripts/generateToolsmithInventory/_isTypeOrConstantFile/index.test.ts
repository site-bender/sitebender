import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"

import _isTypeOrConstantFile from "./index.ts"

Deno.test("_isTypeOrConstantFile - identifies types file", () => {
	const result = _isTypeOrConstantFile("src/types/index.ts")
	assertEquals(result, true)
})

Deno.test("_isTypeOrConstantFile - identifies constants file", () => {
	const result = _isTypeOrConstantFile("src/constants/index.ts")
	assertEquals(result, true)
})

Deno.test("_isTypeOrConstantFile - identifies nested types file", () => {
	const result = _isTypeOrConstantFile(
		"libraries/toolsmith/src/array/types/index.ts",
	)
	assertEquals(result, true)
})

Deno.test("_isTypeOrConstantFile - identifies nested constants file", () => {
	const result = _isTypeOrConstantFile(
		"scripts/generateToolsmithInventory/constants/index.ts",
	)
	assertEquals(result, true)
})

Deno.test("_isTypeOrConstantFile - returns false for regular index file", () => {
	const result = _isTypeOrConstantFile("src/architect/index.ts")
	assertEquals(result, false)
})

Deno.test("_isTypeOrConstantFile - returns false for function file", () => {
	const result = _isTypeOrConstantFile("src/utils/processData/index.ts")
	assertEquals(result, false)
})

Deno.test("_isTypeOrConstantFile - returns false for types folder without index.ts", () => {
	const result = _isTypeOrConstantFile("src/types/user.ts")
	assertEquals(result, false)
})

Deno.test("_isTypeOrConstantFile - returns false for constants folder without index.ts", () => {
	const result = _isTypeOrConstantFile("src/constants/config.ts")
	assertEquals(result, false)
})

Deno.test("_isTypeOrConstantFile - returns false for non-ts files", () => {
	const result = _isTypeOrConstantFile("src/types/index.js")
	assertEquals(result, false)
})

Deno.test("_isTypeOrConstantFile - handles deeply nested paths", () => {
	const result = _isTypeOrConstantFile("a/b/c/d/e/types/index.ts")
	assertEquals(result, true)
})

Deno.test("_isTypeOrConstantFile - case sensitive check", () => {
	const result = _isTypeOrConstantFile("src/Types/index.ts")
	assertEquals(result, false)
})

Deno.test("_isTypeOrConstantFile - returns false for similar but different paths", () => {
	const result = _isTypeOrConstantFile("src/mytypes/index.ts")
	assertEquals(result, false)
})
