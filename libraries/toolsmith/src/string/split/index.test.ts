import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import split from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Plain String Path Tests

Deno.test("split - splits string by comma separator", function testSplitByComma() {
	const result = split(",")("a,b,c")
	assertEquals(result, ["a", "b", "c"])
})

Deno.test("split - splits string by space separator", function testSplitBySpace() {
	const result = split(" ")("hello world foo")
	assertEquals(result, ["hello", "world", "foo"])
})

Deno.test("split - splits string by empty string separator", function testSplitByEmptyString() {
	const result = split("")("abc")
	assertEquals(result, ["a", "b", "c"])
})

Deno.test("split - handles string with no matching separator", function testNoMatchingSeparator() {
	const result = split(",")("hello world")
	assertEquals(result, ["hello world"])
})

Deno.test("split - handles empty string input", function testEmptyStringInput() {
	const result = split(",")("")
	assertEquals(result, [""])
})

Deno.test("split - splits by RegExp separator", function testSplitByRegExp() {
	const result = split(/\s+/)("hello   world  foo")
	assertEquals(result, ["hello", "world", "foo"])
})

Deno.test("split - handles RegExp with special characters", function testRegExpSpecialChars() {
	const result = split(/[,;]/)("a,b;c")
	assertEquals(result, ["a", "b", "c"])
})

Deno.test("split - handles string with special characters as separator", function testSpecialCharSeparator() {
	const result = split("$$")("a$$b$$c")
	assertEquals(result, ["a", "b", "c"])
})

Deno.test("split - handles consecutive separators", function testConsecutiveSeparators() {
	const result = split(",")("a,,b,c")
	assertEquals(result, ["a", "", "b", "c"])
})

Deno.test("split - handles separator at start and end", function testSeparatorAtEdges() {
	const result = split(",")(",a,b,c,")
	assertEquals(result, ["", "a", "b", "c", ""])
})

Deno.test("split - handles single character string", function testSingleChar() {
	const result = split(",")("a")
	assertEquals(result, ["a"])
})

Deno.test("split - handles long string with multiple splits", function testLongString() {
	const result = split("-")("one-two-three-four-five")
	assertEquals(result, ["one", "two", "three", "four", "five"])
})

//++ Result Monad Path Tests

Deno.test("split - handles Result monad with ok value", function testResultOk() {
	const input = ok("a,b,c")
	const result = split(",")(input)
	assertEquals(result, ok(["a", "b", "c"]))
})

Deno.test("split - handles Result monad with empty string", function testResultOkEmpty() {
	const input = ok("")
	const result = split(",")(input)
	assertEquals(result, ok([""]))
})

Deno.test("split - passes through Result error unchanged", function testResultError() {
	const err = error({
		code: "UPSTREAM_ERROR",
		field: "input",
		messages: ["Upstream error occurred"],
		received: "null",
		expected: "string",
		suggestion: "Fix upstream issue",
		severity: "requirement" as const,
	})
	const result = split(",")(err)
	assertEquals(result, err)
})

//++ Validation Monad Path Tests

Deno.test("split - handles Validation monad with success value", function testValidationSuccess() {
	const input = success("a,b,c")
	const result = split(",")(input)
	assertEquals(result, success(["a", "b", "c"]))
})

Deno.test("split - handles Validation monad with empty string", function testValidationSuccessEmpty() {
	const input = success("")
	const result = split(",")(input)
	assertEquals(result, success([""]))
})

Deno.test("split - passes through Validation failure unchanged", function testValidationFailure() {
	const err = failure([{
		code: "UPSTREAM_ERROR",
		field: "input",
		messages: ["Upstream error occurred"],
		received: "null",
		expected: "string",
		suggestion: "Fix upstream issue",
		severity: "requirement" as const,
	}])
	const result = split(",")(err)
	assertEquals(result, err)
})

//++ Property-Based Tests

Deno.test("split - result length is always positive", function testResultLengthPositive() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.string(),
			function checkResultLength(separator: string, str: string) {
				if (separator === "") {
					return true // Skip empty separator as it creates char array
				}
				const result = split(separator)(str)
				//++ [EXCEPTION] Using .length property for array length check
				return result.length > 0
			},
		),
	)
})

Deno.test("split - usually returns non-empty array", function testUsuallyNonEmpty() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.string(),
			function checkUsuallyNonEmpty(separator: string, str: string) {
				const result = split(separator)(str)
				//++ [EXCEPTION] Using .length property for array length check
				// Special case: "".split("") returns [] (empty array)
				if (separator === "" && str === "") {
					return result.length === 0
				}
				// All other cases return at least one element
				return result.length >= 1
			},
		),
	)
})

Deno.test("split - preserves all parts", function testSplitPreservesParts() {
	fc.assert(
		fc.property(
			fc.array(fc.string(), { minLength: 1, maxLength: 10 }),
			function checkPreservesParts(parts: ReadonlyArray<string>) {
				const separator = "||SEPARATOR||"
				//++ [EXCEPTION] Using .join() method for array joining
				const original = Array.from(parts).join(separator)
				const splitResult = split(separator)(original)
				//++ [EXCEPTION] Using .length property for array length check
				assertEquals(splitResult.length, parts.length)
			},
		),
	)
})
