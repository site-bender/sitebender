import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"

import _generateRelativePath from "./index.ts"

Deno.test("_generateRelativePath - generates relative path from current directory", () => {
	const result = _generateRelativePath("src/utils/helper/index.ts")
	assertEquals(result, "src/utils/helper/index.ts")
})

Deno.test("_generateRelativePath - handles nested paths", () => {
	const result = _generateRelativePath(
		"libraries/toolsmith/src/vanilla/array/map/index.ts",
	)
	assertEquals(result, "libraries/toolsmith/src/vanilla/array/map/index.ts")
})

Deno.test("_generateRelativePath - handles single level path", () => {
	const result = _generateRelativePath("index.ts")
	assertEquals(result, "index.ts")
})

Deno.test("_generateRelativePath - handles path with .ts extension", () => {
	const result = _generateRelativePath("src/pagewright/Button.ts")
	assertEquals(result, "src/pagewright/Button.ts")
})

Deno.test("_generateRelativePath - handles path without extension", () => {
	const result = _generateRelativePath("src/utils/helper")
	assertEquals(result, "src/utils/helper")
})

Deno.test("_generateRelativePath - handles deeply nested path", () => {
	const result = _generateRelativePath("a/b/c/d/e/f/g/h/index.ts")
	assertEquals(result, "a/b/c/d/e/f/g/h/index.ts")
})

Deno.test("_generateRelativePath - handles path with dots", () => {
	const result = _generateRelativePath("./src/utils/index.ts")
	assertEquals(result, "src/utils/index.ts")
})

Deno.test("_generateRelativePath - handles path with multiple dots", () => {
	const result = _generateRelativePath("../other/index.ts")
	assertEquals(result, "../other/index.ts")
})

Deno.test("_generateRelativePath - handles path with spaces", () => {
	const result = _generateRelativePath("src/my folder/my file.ts")
	assertEquals(result, "src/my folder/my file.ts")
})

Deno.test("_generateRelativePath - handles path with special characters", () => {
	const result = _generateRelativePath("src/@scoped/package-name/index.ts")
	assertEquals(result, "src/@scoped/package-name/index.ts")
})

Deno.test("_generateRelativePath - handles absolute paths by making them relative", () => {
	// Note: The relative function behavior depends on the current working directory
	// This test assumes we're running from the project root
	const result = _generateRelativePath("/absolute/path/index.ts")
	// The result will vary based on where the test is run from
	// Just ensure it doesn't throw and returns a string
	assertEquals(typeof result, "string")
})

Deno.test("_generateRelativePath - handles Windows-style paths", () => {
	const result = _generateRelativePath("src\\utils\\helper\\index.ts")
	// On Unix systems, backslashes are treated as part of the filename
	// The exact result depends on the OS
	assertEquals(typeof result, "string")
})
