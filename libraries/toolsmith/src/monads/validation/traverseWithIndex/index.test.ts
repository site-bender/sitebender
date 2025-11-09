import { assert, assertEquals } from "@std/assert"
import type { Validation } from "../../../types/fp/validation/index.ts"
import failure from "../failure/index.ts"
import isFailure from "../isFailure/index.ts"
import isSuccess from "../isSuccess/index.ts"
import success from "../success/index.ts"
import traverseWithIndex from "./index.ts"

Deno.test("traverseWithIndex", async (t) => {
	await t.step("maps indexed function and sequences all Success", () => {
		const addIndex = (n: number, i: number): Validation<string, number> =>
			success(n + i)
		const result = traverseWithIndex(addIndex)([10, 20, 30])
		assert(isSuccess(result))
		assertEquals(result.value, [10, 21, 32])
	})

	await t.step("provides correct index", () => {
		const captureIndex = (_v: string, i: number): Validation<string, number> =>
			success(i)
		const result = traverseWithIndex(captureIndex)(["a", "b", "c"])
		assert(isSuccess(result))
		assertEquals(result.value, [0, 1, 2])
	})

	await t.step("accumulates all errors with index info", () => {
		const validate = (n: number, i: number): Validation<string, number> =>
			n < 0 ? failure([`error at ${i}`]) : success(n)
		const result = traverseWithIndex(validate)([1, -2, 3, -4])
		assert(isFailure(result))
		assertEquals(result.errors, ["error at 1", "error at 3"])
	})

	await t.step("handles empty array", () => {
		const addIndex = (n: number, i: number): Validation<string, number> =>
			success(n + i)
		const result = traverseWithIndex(addIndex)([])
		assert(isSuccess(result))
		assertEquals(result.value, [])
	})

	await t.step("handles large array (stack safety)", () => {
		const addIndex = (n: number, i: number): Validation<string, number> =>
			success(n + i)
		const input = Array.from({ length: 10000 }, (_, i) => i * 10)
		const result = traverseWithIndex(addIndex)(input)
		assert(isSuccess(result))
		assertEquals(result.value.length, 10000)
	})
})
