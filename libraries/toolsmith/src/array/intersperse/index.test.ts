import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import intersperse from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for intersperse (inserts separator between array elements)

//++ Plain array path tests

Deno.test("intersperse with multiple elements", function testIntersperseMultiple() {
	const result = intersperse<number, string>("-")([1, 2, 3])

	assertEquals(result, [1, "-", 2, "-", 3])
})

Deno.test("intersperse with two elements", function testIntersperseTwo() {
	const result = intersperse<string, string>(",")(["a", "b"])

	assertEquals(result, ["a", ",", "b"])
})

Deno.test("intersperse with single element", function testIntersperseSingle() {
	const result = intersperse<number, string>("-")([1])

	assertEquals(result, [1])
})

Deno.test("intersperse with empty array", function testIntersperseEmpty() {
	const result = intersperse<number, string>("-")([])

	assertEquals(result, [])
})

Deno.test("intersperse with strings", function testIntersperseStrings() {
	const result = intersperse<string, string>(" and ")(["Alice", "Bob", "Carol"])

	assertEquals(result, ["Alice", " and ", "Bob", " and ", "Carol"])
})

Deno.test("intersperse with numbers and string separator", function testIntersperseNumbersString() {
	const result = intersperse<number, string>(", ")([1, 2, 3, 4, 5])

	assertEquals(result, [1, ", ", 2, ", ", 3, ", ", 4, ", ", 5])
})

Deno.test("intersperse with objects", function testIntersperseObjects() {
	const result = intersperse<{ id: number }, { sep: string }>(
		{ sep: "|" },
	)([{ id: 1 }, { id: 2 }, { id: 3 }])

	assertEquals(result, [
		{ id: 1 },
		{ sep: "|" },
		{ id: 2 },
		{ sep: "|" },
		{ id: 3 },
	])
})

Deno.test("intersperse preserves order", function testIntersperseOrder() {
	const result = intersperse<number, number>(0)([1, 2, 3])

	assertEquals(result, [1, 0, 2, 0, 3])
})

Deno.test("intersperse with null separator", function testIntersperseNull() {
	const result = intersperse<string, null>(null)(["a", "b", "c"])

	assertEquals(result, ["a", null, "b", null, "c"])
})

Deno.test("intersperse with boolean separator", function testIntersperseBoolean() {
	const result = intersperse<number, boolean>(false)([1, 2])

	assertEquals(result, [1, false, 2])
})

//++ Result monad path tests

Deno.test("intersperse with Result ok inserts separator", function testIntersperseResultOk() {
	const result = intersperse<number, string>("-")(ok([1, 2, 3]))

	assertEquals(result, ok([1, "-", 2, "-", 3]))
})

Deno.test("intersperse with Result ok and empty array", function testIntersperseResultEmpty() {
	const result = intersperse<number, string>("-")(ok([]))

	assertEquals(result, ok([]))
})

Deno.test("intersperse with Result error passes through", function testIntersperseResultError() {
	const err = error({
		code: "UPSTREAM_ERROR",
		field: "data",
		messages: ["Upstream error occurred"],
		received: "null",
		expected: "Array",
		suggestion: "Fix upstream issue",
		severity: "requirement" as const,
	})
	const result = intersperse<number, string>("-")(err)

	assertEquals(result, err)
})

//++ Validation monad path tests

Deno.test("intersperse with Validation success inserts separator", function testIntersperseValidationSuccess() {
	const result = intersperse<number, string>("-")(success([1, 2, 3]))

	assertEquals(result, success([1, "-", 2, "-", 3]))
})

Deno.test("intersperse with Validation success and empty array", function testIntersperseValidationEmpty() {
	const result = intersperse<number, string>("-")(success([]))

	assertEquals(result, success([]))
})

Deno.test("intersperse with Validation failure passes through", function testIntersperseValidationFailure() {
	const fail = failure([{
		code: "UPSTREAM_VALIDATION_ERROR",
		field: "data",
		messages: ["Validation failed upstream"],
		received: "null",
		expected: "Array",
		suggestion: "Fix validation issues",
		severity: "requirement" as const,
	}])
	const result = intersperse<number, string>("-")(fail)

	assertEquals(result, fail)
})

//++ Property-based tests

Deno.test("intersperse result length formula", function testIntersperseLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 20 }),
			fc.string(),
			function propertyIntersperseLength(
				arr: ReadonlyArray<number>,
				sep: string,
			) {
				const result = intersperse<number, string>(sep)(arr)

				//++ Empty array stays empty
				//++ Single element stays single
				//++ n elements becomes 2n-1 (n elements + n-1 separators)
				const expectedLength = arr.length === 0
					? 0
					: arr.length === 1
					? 1
					: arr.length * 2 - 1

				assertEquals(result.length, expectedLength)
			},
		),
	)
})

Deno.test("intersperse preserves all original elements", function testInterspersePreservesElements() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 10 }),
			fc.string(),
			function propertyIntersperseElements(
				arr: ReadonlyArray<number>,
				sep: string,
			) {
				const result = intersperse<number, string>(sep)(arr)

				//++ Every original element should appear in result
				arr.forEach(function checkElement(element: number) {
					const found = result.some(function findElement(x) {
						return x === element
					})
					assertEquals(found, true)
				})
			},
		),
	)
})

Deno.test("intersperse always returns array", function testIntersperseTypeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 10 }),
			fc.string(),
			function propertyIntersperseType(
				arr: ReadonlyArray<number>,
				sep: string,
			) {
				const result = intersperse<number, string>(sep)(arr)

				assertEquals(Array.isArray(result), true)
			},
		),
	)
})
