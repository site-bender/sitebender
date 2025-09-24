import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"

import _isValidIdentifier from "./index.ts"

Deno.test("_isValidIdentifier - returns true for valid identifiers starting with letter", () => {
	assertEquals(_isValidIdentifier("myFunction"), true)
	assertEquals(_isValidIdentifier("anotherFunc"), true)
	assertEquals(_isValidIdentifier("Component"), true)
	assertEquals(_isValidIdentifier("x"), true)
	assertEquals(_isValidIdentifier("ABC"), true)
})

Deno.test("_isValidIdentifier - returns true for identifiers starting with underscore", () => {
	assertEquals(_isValidIdentifier("_privateFunc"), true)
	assertEquals(_isValidIdentifier("__internal"), true)
	assertEquals(_isValidIdentifier("_"), true)
	assertEquals(_isValidIdentifier("_123"), true)
})

Deno.test("_isValidIdentifier - returns true for identifiers starting with dollar sign", () => {
	assertEquals(_isValidIdentifier("$element"), true)
	assertEquals(_isValidIdentifier("$$jquery"), true)
	assertEquals(_isValidIdentifier("$"), true)
	assertEquals(_isValidIdentifier("$123"), true)
})

Deno.test("_isValidIdentifier - returns false for identifiers starting with numbers", () => {
	assertEquals(_isValidIdentifier("123func"), false)
	assertEquals(_isValidIdentifier("0"), false)
	assertEquals(_isValidIdentifier("1abc"), false)
	assertEquals(_isValidIdentifier("9_function"), false)
	assertEquals(_isValidIdentifier("42"), false)
})

Deno.test("_isValidIdentifier - handles mixed case identifiers", () => {
	assertEquals(_isValidIdentifier("camelCase"), true)
	assertEquals(_isValidIdentifier("PascalCase"), true)
	assertEquals(_isValidIdentifier("SCREAMING_SNAKE"), true)
	assertEquals(_isValidIdentifier("mixedCASE123"), true)
})

Deno.test("_isValidIdentifier - returns false for empty string", () => {
	assertEquals(_isValidIdentifier(""), false)
})

Deno.test("_isValidIdentifier - handles identifiers with numbers after valid start", () => {
	assertEquals(_isValidIdentifier("func123"), true)
	assertEquals(_isValidIdentifier("test2"), true)
	assertEquals(_isValidIdentifier("my4Function"), true)
	assertEquals(_isValidIdentifier("_99bottles"), true)
	assertEquals(_isValidIdentifier("$100"), true)
})

Deno.test("_isValidIdentifier - returns false for special characters at start", () => {
	assertEquals(_isValidIdentifier("@function"), false)
	assertEquals(_isValidIdentifier("#id"), false)
	assertEquals(_isValidIdentifier("!important"), false)
	assertEquals(_isValidIdentifier("%value"), false)
	assertEquals(_isValidIdentifier("&reference"), false)
	assertEquals(_isValidIdentifier("*pointer"), false)
	assertEquals(_isValidIdentifier("+add"), false)
	assertEquals(_isValidIdentifier("-subtract"), false)
	assertEquals(_isValidIdentifier("=equals"), false)
})

Deno.test("_isValidIdentifier - handles Unicode letters", () => {
	// Note: The current regex only matches ASCII letters
	// These tests document the current behavior
	assertEquals(_isValidIdentifier("café"), true) // starts with 'c' which is valid
	assertEquals(_isValidIdentifier("über"), false) // starts with 'ü' which is not in [a-zA-Z]
	assertEquals(_isValidIdentifier("日本"), false) // Japanese characters not in [a-zA-Z]
	assertEquals(_isValidIdentifier("αlpha"), false) // Greek alpha not in [a-zA-Z]
})

Deno.test("_isValidIdentifier - handles whitespace at start", () => {
	assertEquals(_isValidIdentifier(" func"), false)
	assertEquals(_isValidIdentifier("\tfunc"), false)
	assertEquals(_isValidIdentifier("\nfunc"), false)
	assertEquals(_isValidIdentifier("\rfunc"), false)
})
