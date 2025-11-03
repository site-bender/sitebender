import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import zip from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for zip (array zipping with three-path pattern)

//++ Plain array path tests

Deno.test("zip combines two arrays into pairs", function testZipBasic() {
	const result = zip([1, 2, 3])(["a", "b", "c"])

	assertEquals(result, [[1, "a"], [2, "b"], [3, "c"]])
})

Deno.test("zip with different lengths uses minimum length", function testZipDifferentLengths() {
	const result = zip([1, 2, 3, 4, 5])(["a", "b", "c"])

	assertEquals(result, [[1, "a"], [2, "b"], [3, "c"]])
})

Deno.test("zip with first array shorter", function testZipFirstShorter() {
	const result = zip([1, 2])(["a", "b", "c", "d"])

	assertEquals(result, [[1, "a"], [2, "b"]])
})

Deno.test("zip with second array shorter", function testZipSecondShorter() {
	const result = zip([1, 2, 3, 4])(["a", "b"])

	assertEquals(result, [[1, "a"], [2, "b"]])
})

Deno.test("zip with empty first array", function testZipEmptyFirst() {
	const result = zip<number>([])(["a", "b", "c"])

	assertEquals(result, [])
})

Deno.test("zip with empty second array", function testZipEmptySecond() {
	const result = zip([1, 2, 3])([])

	assertEquals(result, [])
})

Deno.test("zip with both arrays empty", function testZipBothEmpty() {
	const result = zip<number, string>([])([])

	assertEquals(result, [])
})

Deno.test("zip with single elements", function testZipSingleElements() {
	const result = zip([1])(["a"])

	assertEquals(result, [[1, "a"]])
})

Deno.test("zip with objects", function testZipObjects() {
	const result = zip([{ x: 1 }, { x: 2 }])([{ y: "a" }, { y: "b" }])

	assertEquals(result, [[{ x: 1 }, { y: "a" }], [{ x: 2 }, { y: "b" }]])
})

Deno.test("zip with same element types", function testZipSameTypes() {
	const result = zip([1, 2, 3])([4, 5, 6])

	assertEquals(result, [[1, 4], [2, 5], [3, 6]])
})

Deno.test("zip preserves order", function testZipOrder() {
	const result = zip(["first", "second", "third"])(["1st", "2nd", "3rd"])

	assertEquals(result, [["first", "1st"], ["second", "2nd"], ["third", "3rd"]])
})

Deno.test("zip with equal length arrays", function testZipEqualLengths() {
	const result = zip([1, 2])([3, 4])

	assertEquals(result, [[1, 3], [2, 4]])
})

//++ Result monad path tests

Deno.test("zip with Result ok returns ok with zipped pairs", function testZipResultOk() {
	const result = zip([1, 2, 3])(ok(["a", "b", "c"]))

	assertEquals(result, ok([[1, "a"], [2, "b"], [3, "c"]]))
})

Deno.test("zip with Result ok and empty first array", function testZipResultOkEmptyFirst() {
	const result = zip<number>([])(ok(["a", "b", "c"]))

	assertEquals(result, ok([]))
})

Deno.test("zip with Result ok and empty second array", function testZipResultOkEmptySecond() {
	const result = zip([1, 2, 3])(ok([]))

	assertEquals(result, ok([]))
})

Deno.test("zip with Result ok and different lengths", function testZipResultOkDifferentLengths() {
	const result = zip([1, 2])(ok(["a", "b", "c", "d"]))

	assertEquals(result, ok([[1, "a"], [2, "b"]]))
})

Deno.test("zip with Result error passes through error", function testZipResultError() {
	const testError = { _tag: "TestError" as const, message: "test error" }
	const result = zip([1, 2, 3])(error(testError))

	assertEquals(result, error(testError))
})

Deno.test("zip with Result ok preserves result structure", function testZipResultStructure() {
	const result = zip([1, 2])(ok(["a", "b"]))

	assertEquals(result, ok([[1, "a"], [2, "b"]]))
})

//++ Validation monad path tests

Deno.test("zip with Validation success returns success with zipped pairs", function testZipValidationSuccess() {
	const result = zip([1, 2, 3])(success(["a", "b", "c"]))

	assertEquals(result, success([[1, "a"], [2, "b"], [3, "c"]]))
})

Deno.test("zip with Validation success and empty first array", function testZipValidationSuccessEmptyFirst() {
	const result = zip<number>([])(success(["a", "b", "c"]))

	assertEquals(result, success([]))
})

Deno.test("zip with Validation success and empty second array", function testZipValidationSuccessEmptySecond() {
	const result = zip([1, 2, 3])(success([]))

	assertEquals(result, success([]))
})

Deno.test("zip with Validation success and different lengths", function testZipValidationSuccessDifferentLengths() {
	const result = zip([1, 2])(success(["a", "b", "c", "d"]))

	assertEquals(result, success([[1, "a"], [2, "b"]]))
})

Deno.test("zip with Validation failure passes through failure", function testZipValidationFailure() {
	const testError = { _tag: "TestError" as const, message: "test error" }
	const result = zip([1, 2, 3])(failure([testError]))

	assertEquals(result, failure([testError]))
})

Deno.test("zip with Validation success preserves validation structure", function testZipValidationStructure() {
	const result = zip([1, 2])(success(["a", "b"]))

	assertEquals(result, success([[1, "a"], [2, "b"]]))
})

//++ Property-based tests

Deno.test("zip result length equals minimum of input lengths", function testZipLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.string()),
			function checkZipLength(arr1, arr2) {
				const result = zip(arr1)(arr2)
				return result.length === Math.min(arr1.length, arr2.length)
			},
		),
	)
})

Deno.test("zip preserves first array elements in pairs", function testZipPreservesFirstElements() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.string()),
			function checkZipPreservesFirst(arr1, arr2) {
				const result = zip(arr1)(arr2)
				const length = Math.min(arr1.length, arr2.length)
				return result.every(function checkPairFirst(pair, index) {
					return pair[0] === arr1[index]
				}) && result.length === length
			},
		),
	)
})

Deno.test("zip preserves second array elements in pairs", function testZipPreservesSecondElements() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.string()),
			function checkZipPreservesSecond(arr1, arr2) {
				const result = zip(arr1)(arr2)
				const length = Math.min(arr1.length, arr2.length)
				return result.every(function checkPairSecond(pair, index) {
					return pair[1] === arr2[index]
				}) && result.length === length
			},
		),
	)
})

Deno.test("zip with empty first array always returns empty", function testZipEmptyFirstProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.string()),
			function checkZipEmptyFirst(arr) {
				const result = zip<number, string>([])(arr)
				return result.length === 0
			},
		),
	)
})

Deno.test("zip with empty second array always returns empty", function testZipEmptySecondProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkZipEmptySecond(arr) {
				const result = zip(arr)([])
				return result.length === 0
			},
		),
	)
})

Deno.test("zip with equal length arrays produces pairs equal to input length", function testZipEqualLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkZipEqualLength(arr1) {
				const arr2 = arr1.map(function doubleValue(x) {
					return x * 2
				})
				const result = zip(arr1)(arr2)
				return result.length === arr1.length && result.length === arr2.length
			},
		),
	)
})

Deno.test("zip with Result monad preserves length property", function testZipResultLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.string()),
			function checkZipResultLength(arr1, arr2) {
				const result = zip(arr1)(ok(arr2))
				if (result._tag === "Ok") {
					return result.value.length === Math.min(arr1.length, arr2.length)
				}
				return false
			},
		),
	)
})

Deno.test("zip with Validation monad preserves length property", function testZipValidationLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.string()),
			function checkZipValidationLength(arr1, arr2) {
				const result = zip(arr1)(success(arr2))
				if (result._tag === "Success") {
					return result.value.length === Math.min(arr1.length, arr2.length)
				}
				return false
			},
		),
	)
})
