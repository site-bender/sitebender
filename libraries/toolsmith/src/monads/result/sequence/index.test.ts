import { assert, assertEquals } from "@std/assert"

import type { Result } from "../../../types/fp/result/index.ts"

import error from "../error/index.ts"
import isError from "../isError/index.ts"
import isOk from "../isOk/index.ts"
import ok from "../ok/index.ts"
import sequence from "./index.ts"

Deno.test("sequence", async function testSequence(t) {
	await t.step(
		"converts array of Ok values to Ok of array",
		function testAllOk() {
			const input = [ok(1), ok(2), ok(3)]
			const result = sequence()(input)

			assert(isOk(result))
			assertEquals(result.value, [1, 2, 3])
		},
	)

	await t.step("returns first Error on fail-fast", function testFailFast() {
		const input = [ok(1), error("bad"), ok(3)]
		const result = sequence()(input)

		assert(isError(result))
		assertEquals(result.error, "bad")
	})

	await t.step(
		"returns Error from middle of array",
		function testErrorInMiddle() {
			const input = [ok(1), ok(2), error("middle"), ok(4), ok(5)]
			const result = sequence()(input)

			assert(isError(result))
			assertEquals(result.error, "middle")
		},
	)

	await t.step("handles empty array", function testEmptyArray() {
		const input: ReadonlyArray<Result<string, number>> = []
		const result = sequence()(input)

		assert(isOk(result))
		assertEquals(result.value, [])
	})

	await t.step("handles single Ok element", function testSingleOk() {
		const input = [ok(42)]
		const result = sequence()(input)

		assert(isOk(result))
		assertEquals(result.value, [42])
	})

	await t.step("handles single Error element", function testSingleError() {
		const input = [error("fail")]
		const result = sequence()(input)

		assert(isError(result))
		assertEquals(result.error, "fail")
	})

	await t.step(
		"preserves type with string values",
		function testStringValues() {
			const input = [ok("hello"), ok("world")]
			const result = sequence()(input)

			assert(isOk(result))
			assertEquals(result.value, ["hello", "world"])
		},
	)

	await t.step(
		"preserves type with object values",
		function testObjectValues() {
			const input = [ok({ id: 1 }), ok({ id: 2 }), ok({ id: 3 })]
			const result = sequence()(input)

			assert(isOk(result))
			assertEquals(result.value, [{ id: 1 }, { id: 2 }, { id: 3 }])
		},
	)

	await t.step(
		"returns first Error when multiple Errors present",
		function testMultipleErrors() {
			const input = [ok(1), error("first"), ok(3), error("second")]
			const result = sequence()(input)

			assert(isError(result))
			assertEquals(result.error, "first")
		},
	)

	await t.step(
		"handles Error at beginning of array",
		function testErrorAtStart() {
			const input = [error("start"), ok(1), ok(2)]
			const result = sequence()(input)

			assert(isError(result))
			assertEquals(result.error, "start")
		},
	)

	await t.step("handles Error at end of array", function testErrorAtEnd() {
		const input = [ok(1), ok(2), ok(3), error("end")]
		const result = sequence()(input)

		assert(isError(result))
		assertEquals(result.error, "end")
	})

	await t.step("handles large array (stack safety)", function testLargeArray() {
		const input = Array.from({ length: 10000 }, function createOk(_value, i) {
			return ok(i)
		})
		const result = sequence()(input)

		assert(isOk(result))
		assertEquals(result.value.length, 10000)
		assertEquals(result.value[0], 0)
		assertEquals(result.value[9999], 9999)
	})

	await t.step(
		"handles structured error types",
		function testStructuredErrors() {
			const err = { code: 404, message: "Not found" }
			const input = [ok(1), error(err), ok(3)]
			const result = sequence()(input)

			assert(isError(result))
			assertEquals(result.error, err)
		},
	)
})
