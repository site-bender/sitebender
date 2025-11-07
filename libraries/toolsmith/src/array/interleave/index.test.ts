import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import interleave from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for interleave (alternates elements from two arrays)

//++ Plain array path tests

Deno.test("interleave with two arrays of same length", function testInterleaveEqual() {
	const result = interleave<number, string>([1, 2, 3])(["a", "b", "c"])

	assertEquals(result, [1, "a", 2, "b", 3, "c"])
})

Deno.test("interleave with first array longer", function testInterleaveFirstLonger() {
	const result = interleave<number, string>([1, 2, 3, 4])(["a", "b"])

	assertEquals(result, [1, "a", 2, "b", 3, 4])
})

Deno.test("interleave with second array longer", function testInterleaveSecondLonger() {
	const result = interleave<number, string>([1, 2])(["a", "b", "c", "d"])

	assertEquals(result, [1, "a", 2, "b", "c", "d"])
})

Deno.test("interleave with first array empty", function testInterleaveFirstEmpty() {
	const result = interleave<number, string>([])(["a", "b", "c"])

	assertEquals(result, ["a", "b", "c"])
})

Deno.test("interleave with second array empty", function testInterleaveSecondEmpty() {
	const result = interleave<number, string>([1, 2, 3])([])

	assertEquals(result, [1, 2, 3])
})

Deno.test("interleave with both arrays empty", function testInterleaveBothEmpty() {
	const result = interleave<number, string>([])([])

	assertEquals(result, [])
})

Deno.test("interleave with single elements", function testInterleaveSingle() {
	const result = interleave<number, string>([1])(["a"])

	assertEquals(result, [1, "a"])
})

Deno.test("interleave preserves order", function testInterleaveOrder() {
	const result = interleave<number, number>([1, 3, 5])([2, 4, 6])

	assertEquals(result, [1, 2, 3, 4, 5, 6])
})

Deno.test("interleave with different types", function testInterleaveTypes() {
	const result = interleave<string, boolean>(["x", "y", "z"])([
		true,
		false,
	])

	assertEquals(result, ["x", true, "y", false, "z"])
})

Deno.test("interleave with complex objects", function testInterleaveObjects() {
	const result = interleave<{ id: number }, { name: string }>([
		{ id: 1 },
		{ id: 2 },
	])([{ name: "Alice" }, { name: "Bob" }])

	assertEquals(result, [
		{ id: 1 },
		{ name: "Alice" },
		{ id: 2 },
		{ name: "Bob" },
	])
})

//++ Result monad path tests

Deno.test("interleave with Result ok alternates elements", function testInterleaveResultOk() {
	const result = interleave<number, string>([1, 2, 3])(ok(["a", "b", "c"]))

	assertEquals(result, ok([1, "a", 2, "b", 3, "c"]))
})

Deno.test("interleave with Result ok and empty arrays", function testInterleaveResultEmpty() {
	const result = interleave<number, string>([])(ok(["a", "b"]))

	assertEquals(result, ok(["a", "b"]))
})

Deno.test("interleave with Result error passes through", function testInterleaveResultError() {
	const err = error({
		code: "UPSTREAM_ERROR",
		field: "data",
		messages: ["Upstream error occurred"],
		received: "null",
		expected: "Array",
		suggestion: "Fix upstream issue",
		severity: "requirement" as const,
	})
	const result = interleave<number, string>([1, 2])(err)

	assertEquals(result, err)
})

//++ Validation monad path tests

Deno.test("interleave with Validation success alternates elements", function testInterleaveValidationSuccess() {
	const result = interleave<number, string>([1, 2, 3])(success([
		"a",
		"b",
		"c",
	]))

	assertEquals(result, success([1, "a", 2, "b", 3, "c"]))
})

Deno.test("interleave with Validation success and empty arrays", function testInterleaveValidationEmpty() {
	const result = interleave<number, string>([])(success(["a", "b"]))

	assertEquals(result, success(["a", "b"]))
})

Deno.test("interleave with Validation failure passes through", function testInterleaveValidationFailure() {
	const fail = failure([{
		code: "UPSTREAM_VALIDATION_ERROR",
		field: "data",
		messages: ["Validation failed upstream"],
		received: "null",
		expected: "Array",
		suggestion: "Fix validation issues",
		severity: "requirement" as const,
	}])
	const result = interleave<number, string>([1, 2])(fail)

	assertEquals(result, fail)
})

//++ Property-based tests

Deno.test("interleave length equals sum of input lengths", function testInterleaveLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 10 }),
			fc.array(fc.string(), { maxLength: 10 }),
			function propertyInterleaveLength(
				arr1: ReadonlyArray<number>,
				arr2: ReadonlyArray<string>,
			) {
				const result = interleave<number, string>(arr1)(arr2)

				//++ Result length = length(arr1) + length(arr2)
				const expectedLength = arr1.length + arr2.length
				assertEquals(result.length, expectedLength)
			},
		),
	)
})

Deno.test("interleave preserves all elements", function testInterleavePreservesElements() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 10 }),
			fc.array(fc.string(), { minLength: 1, maxLength: 10 }),
			function propertyInterleaveElements(
				arr1: ReadonlyArray<number>,
				arr2: ReadonlyArray<string>,
			) {
				const result = interleave<number, string>(arr1)(arr2)

				//++ All elements from arr1 should be in result
				arr1.forEach(function checkElement1(element: number) {
					const found = result.some(function findElement(x) {
						return x === element
					})
					assertEquals(found, true)
				})

				//++ All elements from arr2 should be in result
				arr2.forEach(function checkElement2(element: string) {
					const found = result.some(function findElement(x) {
						return x === element
					})
					assertEquals(found, true)
				})
			},
		),
	)
})

Deno.test("interleave always returns array", function testInterleaveTypeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 10 }),
			fc.array(fc.string(), { maxLength: 10 }),
			function propertyInterleaveType(
				arr1: ReadonlyArray<number>,
				arr2: ReadonlyArray<string>,
			) {
				const result = interleave<number, string>(arr1)(arr2)

				assertEquals(Array.isArray(result), true)
			},
		),
	)
})
