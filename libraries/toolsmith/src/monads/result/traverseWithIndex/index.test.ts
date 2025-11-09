import { assert, assertEquals } from "@std/assert"

import type { Result } from "../../../types/fp/result/index.ts"

import error from "../error/index.ts"
import isError from "../isError/index.ts"
import isOk from "../isOk/index.ts"
import ok from "../ok/index.ts"
import traverseWithIndex from "./index.ts"

Deno.test("traverseWithIndex", async function testTraverseWithIndex(t) {
	await t.step(
		"maps indexed function and sequences all Ok results",
		function testAllOk() {
			function addIndex(n: number, index: number): Result<string, number> {
				return ok(n + index)
			}

			const input = [10, 20, 30]
			const result = traverseWithIndex(addIndex)(input)

			assert(isOk(result))
			assertEquals(result.value, [10, 21, 32])
		},
	)

	await t.step(
		"provides correct index to function",
		function testCorrectIndex() {
			function captureIndex(
				_value: string,
				index: number,
			): Result<string, number> {
				return ok(index)
			}

			const input = ["a", "b", "c", "d"]
			const result = traverseWithIndex(captureIndex)(input)

			assert(isOk(result))
			assertEquals(result.value, [0, 1, 2, 3])
		},
	)

	await t.step("fails fast on first Error", function testFailFast() {
		function validateWithIndex(
			n: number,
			index: number,
		): Result<string, number> {
			if (index === 2) {
				return error(`Error at index ${index}`)
			}
			return ok(n)
		}

		const input = [1, 2, 3, 4]
		const result = traverseWithIndex(validateWithIndex)(input)

		assert(isError(result))
		assertEquals(result.error, "Error at index 2")
	})

	await t.step(
		"uses index in validation logic",
		function testIndexValidation() {
			function validateEven(n: number, index: number): Result<string, number> {
				if (index % 2 !== 0) {
					return error(`Odd index: ${index}`)
				}
				return ok(n)
			}

			const input = [1, 2, 3, 4]
			const result = traverseWithIndex(validateEven)(input)

			assert(isError(result))
			assertEquals(result.error, "Odd index: 1")
		},
	)

	await t.step("handles empty array", function testEmptyArray() {
		function addIndex(n: number, index: number): Result<string, number> {
			return ok(n + index)
		}

		const input: ReadonlyArray<number> = []
		const result = traverseWithIndex(addIndex)(input)

		assert(isOk(result))
		assertEquals(result.value, [])
	})

	await t.step("handles single element", function testSingleElement() {
		function addIndex(n: number, index: number): Result<string, number> {
			return ok(n + index)
		}

		const input = [100]
		const result = traverseWithIndex(addIndex)(input)

		assert(isOk(result))
		assertEquals(result.value, [100])
	})

	await t.step("transforms types with index", function testTypeTransform() {
		function formatWithIndex(
			s: string,
			index: number,
		): Result<string, string> {
			return ok(`${index}: ${s}`)
		}

		const input = ["a", "b", "c"]
		const result = traverseWithIndex(formatWithIndex)(input)

		assert(isOk(result))
		assertEquals(result.value, ["0: a", "1: b", "2: c"])
	})

	await t.step(
		"creates objects with index",
		function testCreateObjectsWithIndex() {
			function toObject(
				value: string,
				index: number,
			): Result<string, { index: number; value: string }> {
				return ok({ index, value })
			}

			const input = ["x", "y", "z"]
			const result = traverseWithIndex(toObject)(input)

			assert(isOk(result))
			assertEquals(result.value, [
				{ index: 0, value: "x" },
				{ index: 1, value: "y" },
				{ index: 2, value: "z" },
			])
		},
	)

	await t.step(
		"returns first Error when multiple present",
		function testMultipleErrors() {
			function validate(n: number, index: number): Result<string, number> {
				if (n < 0) {
					return error(`negative at ${index}`)
				}
				return ok(n)
			}

			const input = [1, -2, 3, -4]
			const result = traverseWithIndex(validate)(input)

			assert(isError(result))
			assertEquals(result.error, "negative at 1")
		},
	)

	await t.step("handles Error at beginning", function testErrorAtStart() {
		function validate(n: number, index: number): Result<string, number> {
			if (index === 0) {
				return error("first")
			}
			return ok(n)
		}

		const input = [1, 2, 3]
		const result = traverseWithIndex(validate)(input)

		assert(isError(result))
		assertEquals(result.error, "first")
	})

	await t.step("handles Error at end", function testErrorAtEnd() {
		function validate(n: number, index: number): Result<string, number> {
			if (index === 2) {
				return error("last")
			}
			return ok(n)
		}

		const input = [1, 2, 3]
		const result = traverseWithIndex(validate)(input)

		assert(isError(result))
		assertEquals(result.error, "last")
	})

	await t.step("handles large array (stack safety)", function testLargeArray() {
		function addIndex(n: number, index: number): Result<string, number> {
			return ok(n + index)
		}

		const input = Array.from(
			{ length: 10000 },
			function createValue(_value, i) {
				return i * 10
			},
		)
		const result = traverseWithIndex(addIndex)(input)

		assert(isOk(result))
		assertEquals(result.value.length, 10000)
		assertEquals(result.value[0], 0)
		assertEquals(result.value[100], 1100)
	})

	await t.step(
		"uses index for conditional logic",
		function testConditionalLogic() {
			function processEveryOther(
				s: string,
				index: number,
			): Result<string, string> {
				if (index % 2 === 0) {
					return ok(s.toUpperCase())
				}
				return ok(s.toLowerCase())
			}

			const input = ["Hello", "World", "Test", "Data"]
			const result = traverseWithIndex(processEveryOther)(input)

			assert(isOk(result))
			assertEquals(result.value, ["HELLO", "world", "TEST", "data"])
		},
	)

	await t.step(
		"handles structured error types with index",
		function testStructuredErrors() {
			function validate(
				n: number,
				index: number,
			): Result<{ index: number; code: number; message: string }, number> {
				if (n < 0) {
					return error({ index, code: 400, message: "Invalid" })
				}
				return ok(n)
			}

			const input = [1, -2, 3]
			const result = traverseWithIndex(validate)(input)

			assert(isError(result))
			assertEquals(result.error, { index: 1, code: 400, message: "Invalid" })
		},
	)
})
