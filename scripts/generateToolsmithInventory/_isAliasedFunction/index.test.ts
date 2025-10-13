import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"

import _isAliasedFunction from "./index.ts"

Deno.test("_isAliasedFunction - identifies basic re-export", () => {
	const content = `export { default } from "./standardDeviation/index.ts"`
	const result = _isAliasedFunction(content)
	assertEquals(result, true)
})

Deno.test("_isAliasedFunction - identifies re-export with relative path", () => {
	const content = `export { default } from "../utils/helper.ts"`
	const result = _isAliasedFunction(content)
	assertEquals(result, true)
})

Deno.test("_isAliasedFunction - identifies re-export with package import", () => {
	const content =
		`export { default } from "@sitebender/toolsmith/array/map"`
	const result = _isAliasedFunction(content)
	assertEquals(result, true)
})

Deno.test("_isAliasedFunction - requires exact string match (no extra spaces)", () => {
	// Function correctly looks for exact string "export { default } from"
	// This is expected behavior - extra spaces inside braces should not match
	const content = `export   {   default   }   from   "./someFunction"`
	const result = _isAliasedFunction(content)
	assertEquals(result, false)
})

Deno.test("_isAliasedFunction - matches with exact spacing only", () => {
	// Only the exact pattern "export { default } from" is matched
	const validContent = `export { default } from "./someFunction"`
	assertEquals(_isAliasedFunction(validContent), true)

	// Variations with different spacing are not matched
	const noSpaceInBraces = `export {default} from "./someFunction"`
	assertEquals(_isAliasedFunction(noSpaceInBraces), false)

	const extraSpaceInBraces = `export {  default  } from "./someFunction"`
	assertEquals(_isAliasedFunction(extraSpaceInBraces), false)

	const tabInBraces = `export {	default	} from "./someFunction"`
	assertEquals(_isAliasedFunction(tabInBraces), false)
})

Deno.test("_isAliasedFunction - returns false for normal export default", () => {
	const content = `export default function myFunction() { return 42; }`
	const result = _isAliasedFunction(content)
	assertEquals(result, false)
})

Deno.test("_isAliasedFunction - returns false for named exports", () => {
	const content = `export { myFunction } from "./myFunction"`
	const result = _isAliasedFunction(content)
	assertEquals(result, false)
})

Deno.test("_isAliasedFunction - returns false for regular import/export", () => {
	const content = `
import something from "./something"
export default something
	`
	const result = _isAliasedFunction(content)
	assertEquals(result, false)
})

Deno.test("_isAliasedFunction - returns false for empty content", () => {
	const content = ""
	const result = _isAliasedFunction(content)
	assertEquals(result, false)
})

Deno.test("_isAliasedFunction - identifies re-export with newlines", () => {
	const content = `
// This is an alias for the longer name
export { default } from "./standardDeviation/index.ts"
	`
	const result = _isAliasedFunction(content)
	assertEquals(result, true)
})

Deno.test("_isAliasedFunction - returns false for similar but different syntax", () => {
	const content = `export default from "./something"`
	const result = _isAliasedFunction(content)
	assertEquals(result, false)
})

Deno.test("_isAliasedFunction - case sensitive check", () => {
	const content = `Export { Default } From "./something"`
	const result = _isAliasedFunction(content)
	assertEquals(result, false)
})

Deno.test("_isAliasedFunction - identifies re-export in multiline file", () => {
	const content = `
// Some comments
import type { SomeType } from "./types"

// Re-export the main function
export { default } from "./implementation"

// Additional exports
export type { SomeType }
	`
	const result = _isAliasedFunction(content)
	assertEquals(result, true)
})
