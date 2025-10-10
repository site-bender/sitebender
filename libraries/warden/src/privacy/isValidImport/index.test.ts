import { assertEquals } from "jsr:@std/assert@1.0.14"
import isValidImport from "./index.ts"

Deno.test("isValidImport - allows public to private in same scope", function testPublicToPrivateSameScope() {
	const result = isValidImport("src/foo/index.ts")("src/foo/_bar/index.ts")
	assertEquals(result, true)
})

Deno.test("isValidImport - denies public to private in different scope", function testPublicToPrivateDifferentScope() {
	const result = isValidImport("src/baz/index.ts")("src/foo/_bar/index.ts")
	assertEquals(result, false)
})

Deno.test("isValidImport - allows public to public", function testPublicToPublic() {
	const result = isValidImport("src/foo/index.ts")("src/bar/index.ts")
	assertEquals(result, true)
})

Deno.test("isValidImport - allows private to private in same parent", function testPrivateToPrivateSameParent() {
	const result = isValidImport("src/foo/_bar/index.ts")(
		"src/foo/_baz/index.ts",
	)
	assertEquals(result, true)
})

Deno.test("isValidImport - denies private to private in different parent", function testPrivateToPrivateDifferentParent() {
	const result = isValidImport("src/foo/_bar/index.ts")(
		"src/baz/_qux/index.ts",
	)
	assertEquals(result, false)
})

Deno.test("isValidImport - allows import from _shared by sibling", function testSharedBySibling() {
	const result = isValidImport("src/foo/index.ts")("src/_shared/index.ts")
	assertEquals(result, true)
})

Deno.test("isValidImport - denies _shared from different root", function testSharedDifferentRoot() {
	const result = isValidImport("lib/foo/index.ts")("src/_shared/index.ts")
	assertEquals(result, false)
})

Deno.test("isValidImport - allows nested private in same scope", function testNestedPrivateSameScope() {
	const result = isValidImport("src/foo/bar/index.ts")(
		"src/foo/_internal/index.ts",
	)
	assertEquals(result, true)
})

Deno.test("isValidImport - allows deeply nested scope", function testDeeplyNestedScope() {
	const result = isValidImport(
		"libraries/warden/src/privacy/validatePrivacy/index.ts",
	)("libraries/warden/src/privacy/_helpers/index.ts")
	assertEquals(result, true)
})

Deno.test("isValidImport - denies cross-library private import", function testCrossLibraryPrivate() {
	const result = isValidImport("libraries/toolsmith/src/index.ts")(
		"libraries/warden/src/privacy/_helpers/index.ts",
	)
	assertEquals(result, false)
})

Deno.test("isValidImport - allows public anywhere", function testPublicAnywhere() {
	const result = isValidImport("anywhere/src/index.ts")(
		"libraries/warden/src/enforce/enforce/index.ts",
	)
	assertEquals(result, true)
})

Deno.test("isValidImport - handles empty paths", function testEmptyPaths() {
	const result = isValidImport("")("")
	assertEquals(result, true) // Empty target is not private
})
