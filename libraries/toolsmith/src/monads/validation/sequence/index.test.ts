import { assert, assertEquals } from "@std/assert"

import type { Validation } from "../../../types/fp/validation/index.ts"

import failure from "../failure/index.ts"
import isFailure from "../isFailure/index.ts"
import isSuccess from "../isSuccess/index.ts"
import success from "../success/index.ts"
import sequence from "./index.ts"

Deno.test("sequence", async function testSequence(t) {
	await t.step(
		"converts array of Success values to Success of array",
		function testAllSuccess() {
			const input = [success(1), success(2), success(3)]
			const result = sequence()(input)

			assert(isSuccess(result))
			assertEquals(result.value, [1, 2, 3])
		},
	)

	await t.step(
		"accumulates all errors (not fail-fast)",
		function testErrorAccumulation() {
			const input = [
				success(1),
				failure(["error1"]),
				success(3),
				failure(["error2"]),
			]
			const result = sequence()(input)

			assert(isFailure(result))
			assertEquals(result.errors, ["error1", "error2"])
		},
	)

	await t.step(
		"accumulates multiple errors from single Failure",
		function testMultipleErrorsInFailure() {
			const input = [
				success(1),
				failure(["error1", "error2"]),
				success(3),
			]
			const result = sequence()(input)

			assert(isFailure(result))
			assertEquals(result.errors, ["error1", "error2"])
		},
	)

	await t.step(
		"accumulates errors from multiple Failures with multiple errors each",
		function testComplexAccumulation() {
			const input = [
				failure(["e1", "e2"]),
				success(2),
				failure(["e3"]),
				success(4),
				failure(["e4", "e5"]),
			]
			const result = sequence()(input)

			assert(isFailure(result))
			assertEquals(result.errors, ["e1", "e2", "e3", "e4", "e5"])
		},
	)

	await t.step("handles empty array", function testEmptyArray() {
		const input: ReadonlyArray<Validation<string, number>> = []
		const result = sequence()(input)

		assert(isSuccess(result))
		assertEquals(result.value, [])
	})

	await t.step("handles single Success element", function testSingleSuccess() {
		const input = [success(42)]
		const result = sequence()(input)

		assert(isSuccess(result))
		assertEquals(result.value, [42])
	})

	await t.step("handles single Failure element", function testSingleFailure() {
		const input = [failure(["error"])]
		const result = sequence()(input)

		assert(isFailure(result))
		assertEquals(result.errors, ["error"])
	})

	await t.step(
		"preserves type with string values",
		function testStringValues() {
			const input = [success("hello"), success("world")]
			const result = sequence()(input)

			assert(isSuccess(result))
			assertEquals(result.value, ["hello", "world"])
		},
	)

	await t.step(
		"preserves type with object values",
		function testObjectValues() {
			const input = [success({ id: 1 }), success({ id: 2 }), success({ id: 3 })]
			const result = sequence()(input)

			assert(isSuccess(result))
			assertEquals(result.value, [{ id: 1 }, { id: 2 }, { id: 3 }])
		},
	)

	await t.step(
		"processes entire array collecting all errors",
		function testProcessEntireArray() {
			const input = [
				failure(["start"]),
				success(1),
				failure(["middle"]),
				success(2),
				failure(["end"]),
			]
			const result = sequence()(input)

			assert(isFailure(result))
			assertEquals(result.errors, ["start", "middle", "end"])
		},
	)

	await t.step(
		"handles Failure at beginning",
		function testFailureAtStart() {
			const input = [failure(["start"]), success(1), success(2)]
			const result = sequence()(input)

			assert(isFailure(result))
			assertEquals(result.errors, ["start"])
		},
	)

	await t.step("handles Failure at end", function testFailureAtEnd() {
		const input = [success(1), success(2), failure(["end"])]
		const result = sequence()(input)

		assert(isFailure(result))
		assertEquals(result.errors, ["end"])
	})

	await t.step("handles large array (stack safety)", function testLargeArray() {
		const input = Array.from(
			{ length: 10000 },
			function createSuccess(_value, i) {
				return success(i)
			},
		)
		const result = sequence()(input)

		assert(isSuccess(result))
		assertEquals(result.value.length, 10000)
		assertEquals(result.value[0], 0)
		assertEquals(result.value[9999], 9999)
	})

	await t.step(
		"handles large array with errors",
		function testLargeArrayWithErrors() {
			const input = Array.from(
				{ length: 100 },
				function createValidation(_value, i) {
					if (i % 10 === 0) {
						return failure([`error-${i}`])
					}
					return success(i)
				},
			)
			const result = sequence()(input)

			assert(isFailure(result))
			assertEquals(result.errors.length, 10)
			assertEquals(result.errors[0], "error-0")
			assertEquals(result.errors[9], "error-90")
		},
	)

	await t.step(
		"handles structured error types",
		function testStructuredErrors() {
			const err1 = { code: 400, message: "Bad request" }
			const err2 = { code: 404, message: "Not found" }
			const input = [
				success(1),
				failure([err1]),
				success(3),
				failure([err2]),
			]
			const result = sequence()(input)

			assert(isFailure(result))
			assertEquals(result.errors, [err1, err2])
		},
	)

	await t.step(
		"preserves error order during accumulation",
		function testErrorOrder() {
			const input = [
				failure(["a"]),
				failure(["b"]),
				failure(["c"]),
			]
			const result = sequence()(input)

			assert(isFailure(result))
			assertEquals(result.errors, ["a", "b", "c"])
		},
	)
})
