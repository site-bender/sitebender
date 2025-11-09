import { assert, assertEquals } from "@std/assert"
import type { Validation } from "../../../types/fp/validation/index.ts"
import failure from "../failure/index.ts"
import isFailure from "../isFailure/index.ts"
import isSuccess from "../isSuccess/index.ts"
import success from "../success/index.ts"
import traverse from "./index.ts"

Deno.test("traverse", async (t) => {
	await t.step("maps and sequences all Success results", () => {
		const double = (n: number): Validation<string, number> => success(n * 2)
		const result = traverse(double)([1, 2, 3])
		assert(isSuccess(result))
		assertEquals(result.value, [2, 4, 6])
	})

	await t.step("accumulates all errors", () => {
		const validate = (n: number): Validation<string, number> =>
			n < 0 ? failure([`negative: ${n}`]) : success(n)
		const result = traverse(validate)([1, -2, 3, -4])
		assert(isFailure(result))
		assertEquals(result.errors, ["negative: -2", "negative: -4"])
	})

	await t.step("accumulates multiple errors from same element", () => {
		const validate = (n: number): Validation<string, number> =>
			n < 0 ? failure([`err1-${n}`, `err2-${n}`]) : success(n)
		const result = traverse(validate)([1, -2, -3])
		assert(isFailure(result))
		assertEquals(result.errors, ["err1--2", "err2--2", "err1--3", "err2--3"])
	})

	await t.step("handles empty array", () => {
		const double = (n: number): Validation<string, number> => success(n * 2)
		const result = traverse(double)([])
		assert(isSuccess(result))
		assertEquals(result.value, [])
	})

	await t.step("handles large array (stack safety)", () => {
		const double = (n: number): Validation<string, number> => success(n * 2)
		const input = Array.from({ length: 10000 }, (_, i) => i)
		const result = traverse(double)(input)
		assert(isSuccess(result))
		assertEquals(result.value.length, 10000)
	})
})
