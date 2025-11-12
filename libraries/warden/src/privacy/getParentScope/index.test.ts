import { assertEquals } from "jsr:@std/assert@1.0.14"
import getParentScope from "./index.ts"

Deno.test("getParentScope - extracts parent scope from private function", function testParentScopeExtraction() {
	const result = getParentScope("src/foo/_bar/index.ts")
	assertEquals(result, "src/foo/")
})

Deno.test("getParentScope - extracts parent scope from top-level private", function testTopLevelPrivate() {
	const result = getParentScope("src/_normalizePath/index.ts")
	assertEquals(result, "src/")
})

Deno.test("getParentScope - extracts parent scope from nested private folders", function testNestedPrivate() {
	const result = getParentScope("src/foo/_validateInput/_checkFormat/index.ts")
	assertEquals(result, "src/foo/_validateInput/")
})

Deno.test("getParentScope - returns empty string for public function", function testPublicFunction() {
	const result = getParentScope("src/foo/bar/index.ts")
	assertEquals(result, "")
})

Deno.test("getParentScope - handles empty path", function testEmptyPath() {
	const result = getParentScope("")
	assertEquals(result, "")
})

Deno.test("getParentScope - handles root-level private", function testRootLevelPrivate() {
	const result = getParentScope("_private/index.ts")
	assertEquals(result, "")
})

Deno.test("getParentScope - handles deeply nested structure", function testDeeplyNested() {
	const result = getParentScope(
		"libraries/warden/src/privacy/_normalizePath/validate/index.ts",
	)
	assertEquals(result, "libraries/warden/src/privacy/")
})

Deno.test("getParentScope - handles multiple private folders (uses last one)", function testMultiplePrivateFolders() {
	const result = getParentScope("src/_normalizePath/_convertFormat/index.ts")
	assertEquals(result, "src/_normalizePath/")
})

Deno.test("getParentScope - handles single underscore (not valid private)", function testSingleUnderscore() {
	const result = getParentScope("src/_/index.ts")
	assertEquals(result, "")
})
