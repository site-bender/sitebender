import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import cartesianProduct from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for cartesianProduct (generates all possible pairs from two arrays)

//++ Plain array path tests

Deno.test("cartesianProduct with two arrays", function testCartesianProductBasic() {
	const result = cartesianProduct<number, string>([1, 2])(["a", "b"])

	assertEquals(result, [
		[1, "a"],
		[1, "b"],
		[2, "a"],
		[2, "b"],
	])
})

Deno.test("cartesianProduct with single elements", function testCartesianProductSingle() {
	const result = cartesianProduct<number, string>([1])(["a"])

	assertEquals(result, [[1, "a"]])
})

Deno.test("cartesianProduct with first array empty", function testCartesianProductFirstEmpty() {
	const result = cartesianProduct<number, string>([])(["a", "b"])

	assertEquals(result, [])
})

Deno.test("cartesianProduct with second array empty", function testCartesianProductSecondEmpty() {
	const result = cartesianProduct<number, string>([1, 2])([])

	assertEquals(result, [])
})

Deno.test("cartesianProduct with both arrays empty", function testCartesianProductBothEmpty() {
	const result = cartesianProduct<number, string>([])([])

	assertEquals(result, [])
})

Deno.test("cartesianProduct with three elements each", function testCartesianProductThree() {
	const result = cartesianProduct<number, string>([1, 2, 3])(["a", "b", "c"])

	assertEquals(result.length, 9)
	assertEquals(result[0], [1, "a"])
	assertEquals(result[8], [3, "c"])
})

Deno.test("cartesianProduct with different types", function testCartesianProductTypes() {
	const result = cartesianProduct<string, number>(["x", "y"])([1, 2, 3])

	assertEquals(result, [
		["x", 1],
		["x", 2],
		["x", 3],
		["y", 1],
		["y", 2],
		["y", 3],
	])
})

Deno.test("cartesianProduct with complex objects", function testCartesianProductObjects() {
	const result = cartesianProduct<{ id: number }, { name: string }>(
		[{ id: 1 }, { id: 2 }],
	)([{ name: "Alice" }, { name: "Bob" }])

	assertEquals(result, [
		[{ id: 1 }, { name: "Alice" }],
		[{ id: 1 }, { name: "Bob" }],
		[{ id: 2 }, { name: "Alice" }],
		[{ id: 2 }, { name: "Bob" }],
	])
})

Deno.test("cartesianProduct with asymmetric arrays", function testCartesianProductAsymmetric() {
	const result = cartesianProduct<number, string>([1])([
		"a",
		"b",
		"c",
		"d",
	])

	assertEquals(result.length, 4)
	assertEquals(result[0], [1, "a"])
	assertEquals(result[3], [1, "d"])
})

Deno.test("cartesianProduct preserves order", function testCartesianProductOrder() {
	const result = cartesianProduct<number, number>([1, 2])([3, 4])

	//++ First array elements iterate outer, second array inner
	assertEquals(result, [
		[1, 3],
		[1, 4],
		[2, 3],
		[2, 4],
	])
})

//++ Result monad path tests

Deno.test("cartesianProduct with Result ok generates pairs", function testCartesianProductResultOk() {
	const result = cartesianProduct<number, string>([1, 2])(ok(["a", "b"]))

	assertEquals(
		result,
		ok([
			[1, "a"],
			[1, "b"],
			[2, "a"],
			[2, "b"],
		]),
	)
})

Deno.test("cartesianProduct with Result ok and empty arrays", function testCartesianProductResultEmpty() {
	const result = cartesianProduct<number, string>([])(ok(["a", "b"]))

	assertEquals(result, ok([]))
})

Deno.test("cartesianProduct with Result error passes through", function testCartesianProductResultError() {
	const err = error({
		code: "UPSTREAM_ERROR",
		field: "data",
		messages: ["Upstream error occurred"],
		received: "null",
		expected: "Array",
		suggestion: "Fix upstream issue",
		severity: "requirement" as const,
	})
	const result = cartesianProduct<number, string>([1, 2])(err)

	assertEquals(result, err)
})

//++ Validation monad path tests

Deno.test("cartesianProduct with Validation success generates pairs", function testCartesianProductValidationSuccess() {
	const result = cartesianProduct<number, string>([1, 2])(success([
		"a",
		"b",
	]))

	assertEquals(
		result,
		success([
			[1, "a"],
			[1, "b"],
			[2, "a"],
			[2, "b"],
		]),
	)
})

Deno.test("cartesianProduct with Validation success and empty arrays", function testCartesianProductValidationEmpty() {
	const result = cartesianProduct<number, string>([])(success(["a", "b"]))

	assertEquals(result, success([]))
})

Deno.test("cartesianProduct with Validation failure passes through", function testCartesianProductValidationFailure() {
	const fail = failure([{
		code: "UPSTREAM_VALIDATION_ERROR",
		field: "data",
		messages: ["Validation failed upstream"],
		received: "null",
		expected: "Array",
		suggestion: "Fix validation issues",
		severity: "requirement" as const,
	}])
	const result = cartesianProduct<number, string>([1, 2])(fail)

	assertEquals(result, fail)
})

//++ Property-based tests

Deno.test("cartesianProduct count matches formula", function testCartesianProductCountProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 10 }),
			fc.array(fc.string(), { maxLength: 10 }),
			function propertyCartesianProductCount(
				arr1: ReadonlyArray<number>,
				arr2: ReadonlyArray<string>,
			) {
				const result = cartesianProduct<number, string>(arr1)(arr2)

				//++ Product size = size(arr1) * size(arr2)
				const expectedCount = arr1.length * arr2.length
				assertEquals(result.length, expectedCount)
			},
		),
	)
})

Deno.test("cartesianProduct all pairs are tuples", function testCartesianProductTuplesProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 5 }),
			fc.array(fc.string(), { minLength: 1, maxLength: 5 }),
			function propertyCartesianProductTuples(
				arr1: ReadonlyArray<number>,
				arr2: ReadonlyArray<string>,
			) {
				const result = cartesianProduct<number, string>(arr1)(arr2)

				result.forEach(function checkPair(pair: [number, string]) {
					assertEquals(Array.isArray(pair), true)
					assertEquals(pair.length, 2)
				})
			},
		),
	)
})

Deno.test("cartesianProduct elements from source arrays", function testCartesianProductElementsProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 5 }),
			fc.array(fc.string(), { minLength: 1, maxLength: 5 }),
			function propertyCartesianProductElements(
				arr1: ReadonlyArray<number>,
				arr2: ReadonlyArray<string>,
			) {
				const result = cartesianProduct<number, string>(arr1)(arr2)

				result.forEach(function checkPairElements(pair: [number, string]) {
					assertEquals(arr1.includes(pair[0]), true)
					assertEquals(arr2.includes(pair[1]), true)
				})
			},
		),
	)
})

Deno.test("cartesianProduct always returns array of tuples", function testCartesianProductTypeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 5 }),
			fc.array(fc.string(), { maxLength: 5 }),
			function propertyCartesianProductType(
				arr1: ReadonlyArray<number>,
				arr2: ReadonlyArray<string>,
			) {
				const result = cartesianProduct<number, string>(arr1)(arr2)

				assertEquals(Array.isArray(result), true)
			},
		),
	)
})
