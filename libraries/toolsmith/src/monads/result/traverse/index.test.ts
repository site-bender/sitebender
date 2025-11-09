import { assert, assertEquals } from "@std/assert"

import type { Result } from "../../../types/fp/result/index.ts"

import error from "../error/index.ts"
import isError from "../isError/index.ts"
import isOk from "../isOk/index.ts"
import ok from "../ok/index.ts"
import traverse from "./index.ts"

Deno.test("traverse", async function testTraverse(t) {
	await t.step(
		"maps function and sequences all Ok results",
		function testAllOk() {
			function double(n: number): Result<string, number> {
				return ok(n * 2)
			}

			const input = [1, 2, 3]
			const result = traverse(double)(input)

			assert(isOk(result))
			assertEquals(result.value, [2, 4, 6])
		},
	)

	await t.step("fails fast on first Error", function testFailFast() {
		function parseNumber(s: string): Result<string, number> {
			const n = Number(s)
			if (Number.isNaN(n)) {
				return error(`Cannot parse "${s}"`)
			}
			return ok(n)
		}

		const input = ["1", "bad", "3"]
		const result = traverse(parseNumber)(input)

		assert(isError(result))
		assertEquals(result.error, 'Cannot parse "bad"')
	})

	await t.step(
		"returns Error from middle of array",
		function testErrorInMiddle() {
			function validate(n: number): Result<string, number> {
				if (n < 0) {
					return error(`Negative number: ${n}`)
				}
				return ok(n)
			}

			const input = [1, 2, -5, 4, 5]
			const result = traverse(validate)(input)

			assert(isError(result))
			assertEquals(result.error, "Negative number: -5")
		},
	)

	await t.step("handles empty array", function testEmptyArray() {
		function double(n: number): Result<string, number> {
			return ok(n * 2)
		}

		const input: ReadonlyArray<number> = []
		const result = traverse(double)(input)

		assert(isOk(result))
		assertEquals(result.value, [])
	})

	await t.step("handles single element success", function testSingleOk() {
		function double(n: number): Result<string, number> {
			return ok(n * 2)
		}

		const input = [5]
		const result = traverse(double)(input)

		assert(isOk(result))
		assertEquals(result.value, [10])
	})

	await t.step("handles single element failure", function testSingleError() {
		function validate(n: number): Result<string, number> {
			if (n < 0) {
				return error("negative")
			}
			return ok(n)
		}

		const input = [-1]
		const result = traverse(validate)(input)

		assert(isError(result))
		assertEquals(result.error, "negative")
	})

	await t.step("transforms types correctly", function testTypeTransform() {
		function toString(n: number): Result<string, string> {
			return ok(n.toString())
		}

		const input = [1, 2, 3]
		const result = traverse(toString)(input)

		assert(isOk(result))
		assertEquals(result.value, ["1", "2", "3"])
	})

	await t.step(
		"handles complex transformations",
		function testComplexTransform() {
			function process(
				n: number,
			): Result<string, { value: number; doubled: number }> {
				return ok({ value: n, doubled: n * 2 })
			}

			const input = [1, 2, 3]
			const result = traverse(process)(input)

			assert(isOk(result))
			assertEquals(result.value, [
				{ value: 1, doubled: 2 },
				{ value: 2, doubled: 4 },
				{ value: 3, doubled: 6 },
			])
		},
	)

	await t.step(
		"returns first Error when multiple Errors present",
		function testMultipleErrors() {
			function validate(n: number): Result<string, number> {
				if (n < 0) {
					return error(`negative: ${n}`)
				}
				return ok(n)
			}

			const input = [1, -2, 3, -4]
			const result = traverse(validate)(input)

			assert(isError(result))
			assertEquals(result.error, "negative: -2")
		},
	)

	await t.step("handles Error at beginning", function testErrorAtStart() {
		function validate(n: number): Result<string, number> {
			if (n < 0) {
				return error("negative")
			}
			return ok(n)
		}

		const input = [-1, 2, 3]
		const result = traverse(validate)(input)

		assert(isError(result))
		assertEquals(result.error, "negative")
	})

	await t.step("handles Error at end", function testErrorAtEnd() {
		function validate(n: number): Result<string, number> {
			if (n < 0) {
				return error("negative")
			}
			return ok(n)
		}

		const input = [1, 2, -3]
		const result = traverse(validate)(input)

		assert(isError(result))
		assertEquals(result.error, "negative")
	})

	await t.step("handles large array (stack safety)", function testLargeArray() {
		function double(n: number): Result<string, number> {
			return ok(n * 2)
		}

		const input = Array.from(
			{ length: 10000 },
			function createValue(_value, i) {
				return i
			},
		)
		const result = traverse(double)(input)

		assert(isOk(result))
		assertEquals(result.value.length, 10000)
		assertEquals(result.value[0], 0)
		assertEquals(result.value[9999], 19998)
	})

	await t.step(
		"handles structured error types",
		function testStructuredErrors() {
			function validate(
				n: number,
			): Result<{ code: number; message: string }, number> {
				if (n < 0) {
					return error({ code: 400, message: "Invalid" })
				}
				return ok(n)
			}

			const input = [1, -2, 3]
			const result = traverse(validate)(input)

			assert(isError(result))
			assertEquals(result.error, { code: 400, message: "Invalid" })
		},
	)
})
