import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import concat from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for concat (array concatenation with three-path pattern)

//++ Plain array path tests

Deno.test("concat concatenates two arrays", function testConcatBasic() {
	const result = concat([1, 2, 3])([4, 5, 6])

	assertEquals(result, [1, 2, 3, 4, 5, 6])
})

Deno.test("concat with first array empty", function testConcatFirstEmpty() {
	const result = concat<number>([])([1, 2, 3])

	assertEquals(result, [1, 2, 3])
})

Deno.test("concat with second array empty", function testConcatSecondEmpty() {
	const result = concat([1, 2, 3])([])

	assertEquals(result, [1, 2, 3])
})

Deno.test("concat with both arrays empty", function testConcatBothEmpty() {
	const result = concat<number>([])([])

	assertEquals(result, [])
})

Deno.test("concat with strings", function testConcatStrings() {
	const result = concat(["a", "b"])(["c", "d"])

	assertEquals(result, ["a", "b", "c", "d"])
})

Deno.test("concat with objects", function testConcatObjects() {
	const result = concat([{ x: 1 }, { x: 2 }])([{ x: 3 }])

	assertEquals(result, [{ x: 1 }, { x: 2 }, { x: 3 }])
})

Deno.test("concat with single elements", function testConcatSingleElements() {
	const result = concat([1])([2])

	assertEquals(result, [1, 2])
})

Deno.test("concat with different lengths", function testConcatDifferentLengths() {
	const result = concat([1, 2, 3, 4, 5])([6])

	assertEquals(result, [1, 2, 3, 4, 5, 6])
})

Deno.test("concat preserves order", function testConcatOrder() {
	const result = concat(["first", "second"])(["third", "fourth"])

	assertEquals(result, ["first", "second", "third", "fourth"])
})

Deno.test("concat returns new array (immutability)", function testConcatImmutability() {
	const first = [1, 2, 3]
	const second = [4, 5, 6]
	const result = concat(first)(second)

	assertEquals(first, [1, 2, 3]) // Original unchanged
	assertEquals(second, [4, 5, 6]) // Original unchanged
	assertEquals(result, [1, 2, 3, 4, 5, 6])
})

//++ Result monad path tests

Deno.test("concat with Result ok returns ok with concatenated array", function testConcatResultOk() {
	const result = concat([1, 2, 3])(ok([4, 5, 6]))

	assertEquals(result, ok([1, 2, 3, 4, 5, 6]))
})

Deno.test("concat with Result ok and empty first array", function testConcatResultOkEmptyFirst() {
	const result = concat<number>([])(ok([1, 2, 3]))

	assertEquals(result, ok([1, 2, 3]))
})

Deno.test("concat with Result ok and empty second array", function testConcatResultOkEmptySecond() {
	const result = concat([1, 2, 3])(ok([]))

	assertEquals(result, ok([1, 2, 3]))
})

Deno.test("concat with Result error passes through error", function testConcatResultError() {
	const testError = { _tag: "TestError" as const, message: "test error" }
	const result = concat([1, 2, 3])(error(testError))

	assertEquals(result, error(testError))
})

Deno.test("concat with Result ok preserves result structure", function testConcatResultStructure() {
	const result = concat(["a", "b"])(ok(["c", "d"]))

	assertEquals(result, ok(["a", "b", "c", "d"]))
})

//++ Validation monad path tests

Deno.test("concat with Validation success returns success with concatenated array", function testConcatValidationSuccess() {
	const result = concat([1, 2, 3])(success([4, 5, 6]))

	assertEquals(result, success([1, 2, 3, 4, 5, 6]))
})

Deno.test("concat with Validation success and empty first array", function testConcatValidationSuccessEmptyFirst() {
	const result = concat<number>([])(success([1, 2, 3]))

	assertEquals(result, success([1, 2, 3]))
})

Deno.test("concat with Validation success and empty second array", function testConcatValidationSuccessEmptySecond() {
	const result = concat([1, 2, 3])(success([]))

	assertEquals(result, success([1, 2, 3]))
})

Deno.test("concat with Validation failure passes through failure", function testConcatValidationFailure() {
	const testError = { _tag: "TestError" as const, message: "test error" }
	const result = concat([1, 2, 3])(failure([testError]))

	assertEquals(result, failure([testError]))
})

Deno.test("concat with Validation success preserves validation structure", function testConcatValidationStructure() {
	const result = concat(["a", "b"])(success(["c", "d"]))

	assertEquals(result, success(["a", "b", "c", "d"]))
})

//++ Property-based tests

Deno.test("concat result length equals sum of input lengths", function testConcatLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			function checkConcatLength(arr1, arr2) {
				const result = concat(arr1)(arr2)
				return result.length === arr1.length + arr2.length
			},
		),
	)
})

Deno.test("concat preserves all elements from both arrays", function testConcatPreservesElements() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			function checkConcatPreservesElements(arr1, arr2) {
				const result = concat(arr1)(arr2)
				const allPresent = arr1.every(function checkFirst(element) {
					return result.includes(element)
				}) && arr2.every(function checkSecond(element) {
					return result.includes(element)
				})
				return allPresent
			},
		),
	)
})

Deno.test("concat with empty first array equals second array", function testConcatEmptyFirstProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkConcatEmptyFirst(arr) {
				const result = concat<number>([])(arr)
				return JSON.stringify(result) === JSON.stringify(arr)
			},
		),
	)
})

Deno.test("concat with empty second array equals first array", function testConcatEmptySecondProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkConcatEmptySecond(arr) {
				const result = concat(arr)([])
				return JSON.stringify(result) === JSON.stringify(arr)
			},
		),
	)
})

Deno.test("concat is associative: (a + b) + c = a + (b + c)", function testConcatAssociativity() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			function checkConcatAssociativity(arr1, arr2, arr3) {
				const left = concat(concat(arr1)(arr2))(arr3)
				const right = concat(arr1)(concat(arr2)(arr3))
				return JSON.stringify(left) === JSON.stringify(right)
			},
		),
	)
})

Deno.test("concat with Result monad preserves length property", function testConcatResultLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			function checkConcatResultLength(arr1, arr2) {
				const result = concat(arr1)(ok(arr2))
				if (result._tag === "Ok") {
					return result.value.length === arr1.length + arr2.length
				}
				return false
			},
		),
	)
})

Deno.test("concat with Validation monad preserves length property", function testConcatValidationLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			function checkConcatValidationLength(arr1, arr2) {
				const result = concat(arr1)(success(arr2))
				if (result._tag === "Success") {
					return result.value.length === arr1.length + arr2.length
				}
				return false
			},
		),
	)
})
