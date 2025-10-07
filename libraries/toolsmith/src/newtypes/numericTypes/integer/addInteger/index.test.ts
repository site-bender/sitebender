import { assert, assertEquals } from "@std/assert"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import addInteger from "./index.ts"

Deno.test("addInteger", async (t) => {
	await t.step("adds two positive integers", () => {
		const augend = 10 as Integer
		const addend = 5 as Integer
		const result = addInteger(augend)(addend)

		if (isOk(result)) {
			assertEquals(result.value, 15)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("adds positive and negative integers", () => {
		const augend = 10 as Integer
		const addend = -3 as Integer
		const result = addInteger(augend)(addend)

		if (isOk(result)) {
			assertEquals(result.value, 7)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("adds two negative integers", () => {
		const augend = -10 as Integer
		const addend = -5 as Integer
		const result = addInteger(augend)(addend)

		if (isOk(result)) {
			assertEquals(result.value, -15)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("handles addition with zero", () => {
		const augend = 10 as Integer
		const addend = 0 as Integer
		const result = addInteger(augend)(addend)

		if (isOk(result)) {
			assertEquals(result.value, 10)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("handles large integers", () => {
		const augend = 1000000 as Integer
		const addend = 2000000 as Integer
		const result = addInteger(augend)(addend)

		if (isOk(result)) {
			assertEquals(result.value, 3000000)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("returns error when result exceeds MAX_SAFE_INTEGER", () => {
		const augend = 9007199254740991 as Integer
		const addend = 1 as Integer
		const result = addInteger(augend)(addend)

		if (isError(result)) {
			assertEquals(result.error.code, "INTEGER_NOT_SAFE")
		} else {
			throw new Error("Expected Error result")
		}
	})

	await t.step("returns error when result is below MIN_SAFE_INTEGER", () => {
		const augend = -9007199254740991 as Integer
		const addend = -1 as Integer
		const result = addInteger(augend)(addend)

		if (isError(result)) {
			assertEquals(result.error.code, "INTEGER_NOT_SAFE")
		} else {
			throw new Error("Expected Error result")
		}
	})
})
