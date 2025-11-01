import { assertEquals } from "@std/assert"

import isNonEmptyString from "@sitebender/toolsmith/predicates/isNonEmptyString/index.ts"

Deno.test("isNonEmptyString returns true for non-empty strings", function returnsTrueForNonEmpty() {
	assertEquals(isNonEmptyString("Hello"), true)
	assertEquals(isNonEmptyString("A"), true)
	assertEquals(isNonEmptyString("Test string"), true)
	assertEquals(isNonEmptyString("123"), true)
})

Deno.test("isNonEmptyString returns true after trimming whitespace", function returnsTrueAfterTrim() {
	assertEquals(isNonEmptyString("  Hello  "), true)
	assertEquals(isNonEmptyString("\t\nTest\n\t"), true)
	assertEquals(isNonEmptyString(" A "), true)
})

Deno.test("isNonEmptyString returns false for empty strings", function returnsFalseForEmpty() {
	assertEquals(isNonEmptyString(""), false)
	assertEquals(isNonEmptyString("   "), false)
	assertEquals(isNonEmptyString("\t\n\r"), false)
	assertEquals(isNonEmptyString("     "), false)
})

Deno.test("isNonEmptyString returns false for non-strings", function returnsFalseForNonStrings() {
	assertEquals(isNonEmptyString(null as any), false)
	assertEquals(isNonEmptyString(undefined as any), false)
	assertEquals(isNonEmptyString(123 as any), false)
	assertEquals(isNonEmptyString({} as any), false)
	assertEquals(isNonEmptyString([] as any), false)
})
