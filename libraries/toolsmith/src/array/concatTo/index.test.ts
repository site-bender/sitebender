import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import concatTo from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for concatTo (array appending with three-path pattern)

//++ Plain array path tests

Deno.test("concatTo appends fixed array to base array", function testConcatToBasic() {
	const result = concatTo([4, 5, 6])([1, 2, 3])

	assertEquals(result, [1, 2, 3, 4, 5, 6])
})

Deno.test("concatTo with empty toAppend", function testConcatToEmptyAppend() {
	const result = concatTo<number>([])([1, 2, 3])

	assertEquals(result, [1, 2, 3])
})

Deno.test("concatTo with empty base array", function testConcatToEmptyBase() {
	const result = concatTo([1, 2, 3])([])

	assertEquals(result, [1, 2, 3])
})

Deno.test("concatTo with both arrays empty", function testConcatToBothEmpty() {
	const result = concatTo<number>([])([])

	assertEquals(result, [])
})

Deno.test("concatTo with strings", function testConcatToStrings() {
	const result = concatTo(["c", "d"])(["a", "b"])

	assertEquals(result, ["a", "b", "c", "d"])
})

Deno.test("concatTo with objects", function testConcatToObjects() {
	const result = concatTo([{ x: 3 }])([{ x: 1 }, { x: 2 }])

	assertEquals(result, [{ x: 1 }, { x: 2 }, { x: 3 }])
})

Deno.test("concatTo with single elements", function testConcatToSingleElements() {
	const result = concatTo([2])([1])

	assertEquals(result, [1, 2])
})

Deno.test("concatTo with different lengths", function testConcatToDifferentLengths() {
	const result = concatTo([6])([1, 2, 3, 4, 5])

	assertEquals(result, [1, 2, 3, 4, 5, 6])
})

Deno.test("concatTo preserves order", function testConcatToOrder() {
	const result = concatTo(["third", "fourth"])(["first", "second"])

	assertEquals(result, ["first", "second", "third", "fourth"])
})

Deno.test("concatTo returns new array (immutability)", function testConcatToImmutability() {
	const toAppend = [4, 5, 6]
	const baseArray = [1, 2, 3]
	const result = concatTo(toAppend)(baseArray)

	assertEquals(toAppend, [4, 5, 6]) // Original unchanged
	assertEquals(baseArray, [1, 2, 3]) // Original unchanged
	assertEquals(result, [1, 2, 3, 4, 5, 6])
})

//++ Result monad path tests

Deno.test("concatTo with Result ok returns ok with appended array", function testConcatToResultOk() {
	const result = concatTo([4, 5, 6])(ok([1, 2, 3]))

	assertEquals(result, ok([1, 2, 3, 4, 5, 6]))
})

Deno.test("concatTo with Result ok and empty toAppend", function testConcatToResultOkEmptyAppend() {
	const result = concatTo<number>([])(ok([1, 2, 3]))

	assertEquals(result, ok([1, 2, 3]))
})

Deno.test("concatTo with Result ok and empty base array", function testConcatToResultOkEmptyBase() {
	const result = concatTo([1, 2, 3])(ok([]))

	assertEquals(result, ok([1, 2, 3]))
})

Deno.test("concatTo with Result error passes through error", function testConcatToResultError() {
	const testError = { _tag: "TestError" as const, message: "test error" }
	const result = concatTo([4, 5, 6])(error(testError))

	assertEquals(result, error(testError))
})

Deno.test("concatTo with Result ok preserves result structure", function testConcatToResultStructure() {
	const result = concatTo(["c", "d"])(ok(["a", "b"]))

	assertEquals(result, ok(["a", "b", "c", "d"]))
})

//++ Validation monad path tests

Deno.test("concatTo with Validation success returns success with appended array", function testConcatToValidationSuccess() {
	const result = concatTo([4, 5, 6])(success([1, 2, 3]))

	assertEquals(result, success([1, 2, 3, 4, 5, 6]))
})

Deno.test("concatTo with Validation success and empty toAppend", function testConcatToValidationSuccessEmptyAppend() {
	const result = concatTo<number>([])(success([1, 2, 3]))

	assertEquals(result, success([1, 2, 3]))
})

Deno.test("concatTo with Validation success and empty base array", function testConcatToValidationSuccessEmptyBase() {
	const result = concatTo([1, 2, 3])(success([]))

	assertEquals(result, success([1, 2, 3]))
})

Deno.test("concatTo with Validation failure passes through failure", function testConcatToValidationFailure() {
	const testError = { _tag: "TestError" as const, message: "test error" }
	const result = concatTo([4, 5, 6])(failure([testError]))

	assertEquals(result, failure([testError]))
})

Deno.test("concatTo with Validation success preserves validation structure", function testConcatToValidationStructure() {
	const result = concatTo(["c", "d"])(success(["a", "b"]))

	assertEquals(result, success(["a", "b", "c", "d"]))
})

//++ Property-based tests

Deno.test("concatTo result length equals sum of input lengths", function testConcatToLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			function checkConcatToLength(toAppend, baseArray) {
				const result = concatTo(toAppend)(baseArray)
				return result.length === baseArray.length + toAppend.length
			},
		),
	)
})

Deno.test("concatTo preserves all elements from both arrays", function testConcatToPreservesElements() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			function checkConcatToPreservesElements(toAppend, baseArray) {
				const result = concatTo(toAppend)(baseArray)
				const allPresent = baseArray.every(function checkBase(element) {
					return result.includes(element)
				}) && toAppend.every(function checkAppend(element) {
					return result.includes(element)
				})
				return allPresent
			},
		),
	)
})

Deno.test("concatTo with empty toAppend equals base array", function testConcatToEmptyAppendProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkConcatToEmptyAppend(arr) {
				const result = concatTo<number>([])(arr)
				return JSON.stringify(result) === JSON.stringify(arr)
			},
		),
	)
})

Deno.test("concatTo with empty base array equals toAppend", function testConcatToEmptyBaseProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function checkConcatToEmptyBase(arr) {
				const result = concatTo(arr)([])
				return JSON.stringify(result) === JSON.stringify(arr)
			},
		),
	)
})

Deno.test("concatTo with Result monad preserves length property", function testConcatToResultLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			function checkConcatToResultLength(toAppend, baseArray) {
				const result = concatTo(toAppend)(ok(baseArray))
				if (result._tag === "Ok") {
					return result.value.length === baseArray.length + toAppend.length
				}
				return false
			},
		),
	)
})

Deno.test("concatTo with Validation monad preserves length property", function testConcatToValidationLengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			function checkConcatToValidationLength(toAppend, baseArray) {
				const result = concatTo(toAppend)(success(baseArray))
				if (result._tag === "Success") {
					return result.value.length === baseArray.length + toAppend.length
				}
				return false
			},
		),
	)
})
