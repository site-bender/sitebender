import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import permutations from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for permutations (generates all permutations of array elements)

//++ Plain array path tests

Deno.test("permutations with empty array", function testPermutationsEmpty() {
	const result = permutations<number>([])

	assertEquals(result, [[]])
})

Deno.test("permutations with single element", function testPermutationsSingle() {
	const result = permutations<number>([1])

	assertEquals(result, [[1]])
})

Deno.test("permutations with two elements", function testPermutationsTwo() {
	const result = permutations<number>([1, 2])

	assertEquals(result, [
		[2, 1],
		[1, 2],
	])
})

Deno.test("permutations with three elements", function testPermutationsThree() {
	const result = permutations<number>([1, 2, 3])

	assertEquals(result, [
		[3, 2, 1],
		[3, 1, 2],
		[2, 3, 1],
		[2, 1, 3],
		[1, 3, 2],
		[1, 2, 3],
	])
})

Deno.test("permutations with four elements", function testPermutationsFour() {
	const result = permutations<number>([1, 2, 3, 4])

	//++ Should have 4! = 24 permutations
	assertEquals(result.length, 24)

	//++ Check first and last permutations (reversed order due to stack)
	assertEquals(result[0], [4, 3, 2, 1])
	assertEquals(result[23], [1, 2, 3, 4])
})

Deno.test("permutations with strings", function testPermutationsStrings() {
	const result = permutations<string>(["a", "b"])

	assertEquals(result, [
		["b", "a"],
		["a", "b"],
	])
})

Deno.test("permutations with duplicates treats them as distinct", function testPermutationsDuplicates() {
	const result = permutations<number>([1, 1])

	//++ Each position is treated as unique even if values are same
	assertEquals(result.length, 2)
})

Deno.test("permutations preserves all elements", function testPermutationsPreservesElements() {
	const result = permutations<string>(["x", "y", "z"])

	//++ Every permutation should contain all original elements
	result.forEach(function checkPermutation(perm: ReadonlyArray<string>) {
		assertEquals(perm.length, 3)
		assertEquals(perm.includes("x"), true)
		assertEquals(perm.includes("y"), true)
		assertEquals(perm.includes("z"), true)
	})
})

Deno.test("permutations with complex objects", function testPermutationsObjects() {
	const objs = [{ id: 1 }, { id: 2 }]
	const result = permutations(objs)

	assertEquals(result.length, 2)
	assertEquals(result[0], [{ id: 2 }, { id: 1 }])
	assertEquals(result[1], [{ id: 1 }, { id: 2 }])
})

//++ Result monad path tests

Deno.test("permutations with Result ok generates permutations", function testPermutationsResultOk() {
	const result = permutations<number>(ok([1, 2, 3]))

	assertEquals(
		result,
		ok([
			[3, 2, 1],
			[3, 1, 2],
			[2, 3, 1],
			[2, 1, 3],
			[1, 3, 2],
			[1, 2, 3],
		]),
	)
})

Deno.test("permutations with Result ok and empty array", function testPermutationsResultEmpty() {
	const result = permutations<number>(ok([]))

	assertEquals(result, ok([[]]))
})

Deno.test("permutations with Result error passes through", function testPermutationsResultError() {
	const err = error({
		code: "UPSTREAM_ERROR",
		field: "data",
		messages: ["Upstream error occurred"],
		received: "null",
		expected: "Array",
		suggestion: "Fix upstream issue",
		severity: "requirement" as const,
	})
	const result = permutations<number>(err)

	assertEquals(result, err)
})

//++ Validation monad path tests

Deno.test("permutations with Validation success generates permutations", function testPermutationsValidationSuccess() {
	const result = permutations<number>(success([1, 2, 3]))

	assertEquals(
		result,
		success([
			[3, 2, 1],
			[3, 1, 2],
			[2, 3, 1],
			[2, 1, 3],
			[1, 3, 2],
			[1, 2, 3],
		]),
	)
})

Deno.test("permutations with Validation success and empty array", function testPermutationsValidationEmpty() {
	const result = permutations<number>(success([]))

	assertEquals(result, success([[]]))
})

Deno.test("permutations with Validation failure passes through", function testPermutationsValidationFailure() {
	const fail = failure([{
		code: "UPSTREAM_VALIDATION_ERROR",
		field: "data",
		messages: ["Validation failed upstream"],
		received: "null",
		expected: "Array",
		suggestion: "Fix validation issues",
		severity: "requirement" as const,
	}])
	const result = permutations<number>(fail)

	assertEquals(result, fail)
})

//++ Property-based tests

Deno.test("permutations count matches factorial", function testPermutationsCountProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 0, maxLength: 6 }),
			function propertyPermutationsCount(arr: ReadonlyArray<number>) {
				const result = permutations<number>(arr)

				//++ n! permutations for n elements
				const factorial = function fact(n: number): number {
					if (n <= 1) return 1
					let result = 1
					for (let i = 2; i <= n; i++) {
						result *= i
					}
					return result
				}

				const expectedCount = arr.length === 0 ? 1 : factorial(arr.length)
				assertEquals(result.length, expectedCount)
			},
		),
	)
})

Deno.test("permutations all same length", function testPermutationsSizeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 5 }),
			function propertyPermutationsSize(arr: ReadonlyArray<number>) {
				const result = permutations<number>(arr)

				result.forEach(function checkPermutationLength(
					perm: ReadonlyArray<number>,
				) {
					assertEquals(perm.length, arr.length)
				})
			},
		),
	)
})

Deno.test("permutations always returns array of arrays", function testPermutationsTypeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 5 }),
			function propertyPermutationsType(arr: ReadonlyArray<number>) {
				const result = permutations<number>(arr)

				assertEquals(Array.isArray(result), true)
				result.forEach(function checkArrayType(perm: ReadonlyArray<number>) {
					assertEquals(Array.isArray(perm), true)
				})
			},
		),
	)
})

Deno.test("permutations contain all original elements", function testPermutationsElementsProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 5 }),
			function propertyPermutationsElements(arr: ReadonlyArray<number>) {
				const result = permutations<number>(arr)

				result.forEach(function checkElements(perm: ReadonlyArray<number>) {
					//++ Each permutation should contain all elements from original
					arr.forEach(function checkElement(element: number) {
						//++ Count occurrences in original
						const originalCount = arr.filter(function countInOriginal(e) {
							return e === element
						}).length

						//++ Count occurrences in permutation
						const permCount = perm.filter(function countInPerm(e) {
							return e === element
						}).length

						assertEquals(permCount, originalCount)
					})
				})
			},
		),
	)
})
