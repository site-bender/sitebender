import { assertEquals } from "jsr:@std/assert@1.0.14"
import isPrivateFunction from "./index.ts"

Deno.test("isPrivateFunction - detects private function with underscore folder", function testPrivateWithUnderscore() {
	const result = isPrivateFunction("src/foo/_bar/index.ts")
	assertEquals(result, true)
})

Deno.test("isPrivateFunction - detects public function without underscore", function testPublicWithoutUnderscore() {
	const result = isPrivateFunction("src/foo/bar/index.ts")
	assertEquals(result, false)
})

Deno.test("isPrivateFunction - detects private shared folder", function testPrivateShared() {
	const result = isPrivateFunction("src/_shared/index.ts")
	assertEquals(result, true)
})

Deno.test("isPrivateFunction - handles nested private folders", function testNestedPrivate() {
	const result = isPrivateFunction("src/foo/_internal/_helpers/index.ts")
	assertEquals(result, true)
})

Deno.test("isPrivateFunction - handles empty path", function testEmptyPath() {
	const result = isPrivateFunction("")
	assertEquals(result, false)
})

Deno.test("isPrivateFunction - handles root path", function testRootPath() {
	const result = isPrivateFunction("/")
	assertEquals(result, false)
})

Deno.test("isPrivateFunction - handles single underscore as folder name", function testSingleUnderscore() {
	const result = isPrivateFunction("src/_/index.ts")
	assertEquals(result, false) // Single underscore alone is not valid
})

Deno.test("isPrivateFunction - handles underscore in filename not folder", function testUnderscoreInFilename() {
	const result = isPrivateFunction("src/foo/_index.ts")
	assertEquals(result, true) // "_index.ts" is treated as a folder segment
})

Deno.test("isPrivateFunction - handles multiple levels deep", function testMultipleLevelsDeep() {
	const result = isPrivateFunction(
		"libraries/warden/src/privacy/_helpers/validate/index.ts",
	)
	assertEquals(result, true)
})

Deno.test("isPrivateFunction - public function multiple levels", function testPublicMultipleLevels() {
	const result = isPrivateFunction(
		"libraries/warden/src/privacy/validate/index.ts",
	)
	assertEquals(result, false)
})
