import { assertEquals } from "@std/assert"

import isChar from "@sitebender/toolsmith/predicates/isChar/index.ts"

Deno.test("isChar returns true for single ASCII characters", function returnsTrueForSingleAscii() {
	assertEquals(isChar("A"), true)
	assertEquals(isChar("z"), true)
	assertEquals(isChar("5"), true)
	assertEquals(isChar("!"), true)
	assertEquals(isChar(" "), true)
})

Deno.test("isChar returns true for single Unicode characters", function returnsTrueForSingleUnicode() {
	assertEquals(isChar("ñ"), true)
	assertEquals(isChar("€"), true)
	assertEquals(isChar("中"), true)
	assertEquals(isChar("😀"), true)
	assertEquals(isChar("🎉"), true)
})

Deno.test("isChar returns false for empty strings", function returnsFalseForEmpty() {
	assertEquals(isChar(""), false)
})

Deno.test("isChar returns false for multi-character strings", function returnsFalseForMultiChar() {
	assertEquals(isChar("AB"), false)
	assertEquals(isChar("Hello"), false)
	assertEquals(isChar("😀😀"), false)
	assertEquals(isChar("  "), false)
})

Deno.test("isChar returns false for non-strings", function returnsFalseForNonStrings() {
	assertEquals(isChar(null as any), false)
	assertEquals(isChar(undefined as any), false)
	assertEquals(isChar(123 as any), false)
	assertEquals(isChar({} as any), false)
	assertEquals(isChar([] as any), false)
})
