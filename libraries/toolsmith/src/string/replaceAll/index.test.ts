import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import replaceAll from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Plain String Path Tests

Deno.test("replaceAll - string search with string replace", function testStringSearchStringReplace() {
	const result = replaceAll("o")("0")("foo bar boo")
	assertEquals(result, "f00 bar b00")
})

Deno.test("replaceAll - string search with no matches", function testStringSearchNoMatch() {
	const result = replaceAll("x")("y")("foo bar boo")
	assertEquals(result, "foo bar boo")
})

Deno.test("replaceAll - string search with function replace", function testStringSearchFunctionReplace() {
	const result = replaceAll("o")(function replaceFunction(
		_match: string,
		index: number,
	) {
		return `[${index}]`
	})("foo bar boo")
	assertEquals(result, "f[1][2] bar b[9][10]")
})

Deno.test("replaceAll - RegExp search with string replace", function testRegExpSearchStringReplace() {
	const result = replaceAll(/o/g)("0")("foo bar boo")
	assertEquals(result, "f00 bar b00")
})

Deno.test("replaceAll - RegExp search without global flag gets added", function testRegExpAddsGlobalFlag() {
	const result = replaceAll(/o/)("0")("foo bar boo")
	assertEquals(result, "f00 bar b00")
})

Deno.test("replaceAll - RegExp search with function replace", function testRegExpSearchFunctionReplace() {
	const result = replaceAll(/o/g)(function replaceFunction(match: string) {
		return match.toUpperCase()
	})("foo bar boo")
	assertEquals(result, "fOO bar bOO")
})

Deno.test("replaceAll - handles special characters in string search", function testSpecialCharsSearch() {
	const result = replaceAll("$$")("XX")("a$$b$$c")
	assertEquals(result, "aXXbXXc")
})

Deno.test("replaceAll - handles empty string input", function testEmptyStringInput() {
	const result = replaceAll("o")("0")("")
	assertEquals(result, "")
})

Deno.test("replaceAll - handles empty string search", function testEmptyStringSearch() {
	const result = replaceAll("")("X")("abc")
	// Empty string splits each character
	assertEquals(result, "XaXbXcX")
})

Deno.test("replaceAll - handles single character string", function testSingleChar() {
	const result = replaceAll("a")("b")("a")
	assertEquals(result, "b")
})

Deno.test("replaceAll - replaces all occurrences not just first", function testAllOccurrences() {
	const result = replaceAll("a")("b")("aaa")
	assertEquals(result, "bbb")
})

Deno.test("replaceAll - handles RegExp with character class", function testRegExpCharClass() {
	const result = replaceAll(/[aeiou]/g)("*")("hello world")
	assertEquals(result, "h*ll* w*rld")
})

Deno.test("replaceAll - handles consecutive matches", function testConsecutiveMatches() {
	const result = replaceAll("aa")("b")("aaaa")
	assertEquals(result, "bb")
})

Deno.test("replaceAll - handles overlapping patterns", function testOverlappingPatterns() {
	const result = replaceAll("aba")("X")("ababa")
	// First match: aba -> X, leaving "ba", no more matches
	assertEquals(result, "Xba")
})

Deno.test("replaceAll - function replacer gets correct arguments", function testFunctionReplacerArgs() {
	const result = replaceAll("o")(function replaceFunction(
		_match: string,
		index: number,
		_original: string,
	) {
		return index.toString()
	})("foo")
	assertEquals(result, "f12")
})

//++ Result Monad Path Tests

Deno.test("replaceAll - handles Result monad with ok value", function testResultOk() {
	const input = ok("foo bar boo")
	const result = replaceAll("o")("0")(input)
	assertEquals(result, ok("f00 bar b00"))
})

Deno.test("replaceAll - handles Result monad with empty string", function testResultOkEmpty() {
	const input = ok("")
	const result = replaceAll("o")("0")(input)
	assertEquals(result, ok(""))
})

Deno.test("replaceAll - passes through Result error unchanged", function testResultError() {
	const err = error({
		code: "UPSTREAM_ERROR",
		field: "input",
		messages: ["Upstream error occurred"],
		received: "null",
		expected: "string",
		suggestion: "Fix upstream issue",
		severity: "requirement" as const,
	})
	const result = replaceAll("o")("0")(err)
	assertEquals(result, err)
})

//++ Validation Monad Path Tests

Deno.test("replaceAll - handles Validation monad with success value", function testValidationSuccess() {
	const input = success("foo bar boo")
	const result = replaceAll("o")("0")(input)
	assertEquals(result, success("f00 bar b00"))
})

Deno.test("replaceAll - handles Validation monad with empty string", function testValidationSuccessEmpty() {
	const input = success("")
	const result = replaceAll("o")("0")(input)
	assertEquals(result, success(""))
})

Deno.test("replaceAll - passes through Validation failure unchanged", function testValidationFailure() {
	const err = failure([{
		code: "UPSTREAM_ERROR",
		field: "input",
		messages: ["Upstream error occurred"],
		received: "null",
		expected: "string",
		suggestion: "Fix upstream issue",
		severity: "requirement" as const,
	}])
	const result = replaceAll("o")("0")(err)
	assertEquals(result, err)
})

//++ Property-Based Tests

Deno.test("replaceAll - idempotence with same replacement", function testIdempotence() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.string(),
			function checkIdempotence(search: string, replacement: string) {
				if (search === "") return true // Skip empty search
				const str = "test string for testing"
				const once = replaceAll(search)(replacement)(str)
				const twice = replaceAll(search)(replacement)(once)
				// Applying replacement again should give same result
				return once === twice
			},
		),
	)
})

Deno.test("replaceAll - always returns string", function testAlwaysReturnsString() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.string(),
			fc.string(),
			function checkReturnsString(
				search: string,
				replacement: string,
				str: string,
			) {
				const result = replaceAll(search)(replacement)(str)
				return typeof result === "string"
			},
		),
	)
})

Deno.test("replaceAll - no matches returns original string", function testNoMatchesReturnsOriginal() {
	fc.assert(
		fc.property(
			fc.string(),
			function checkNoMatchesOriginal(str: string) {
				// Use a separator that definitely won't be in the string
				const separator = "\u0000\u0001\u0002" // Null characters unlikely in test strings
				const result = replaceAll(separator)("X")(str)
				return result === str
			},
		),
	)
})
