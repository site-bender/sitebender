import { assert, assertEquals } from "@std/assert"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import subtractInteger from "./index.ts"

Deno.test("subtractInteger", async (t) => {
	await t.step("subtracts two positive integers", () => {
		const minuend = 10 as Integer
		const subtrahend = 3 as Integer
		const result = subtractInteger(minuend)(subtrahend)

		if (isOk(result)) {
			assertEquals(result.value, 7)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("subtracts resulting in negative", () => {
		const minuend = 5 as Integer
		const subtrahend = 10 as Integer
		const result = subtractInteger(minuend)(subtrahend)

		if (isOk(result)) {
			assertEquals(result.value, -5)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("subtracts negative from positive", () => {
		const minuend = 10 as Integer
		const subtrahend = -5 as Integer
		const result = subtractInteger(minuend)(subtrahend)

		if (isOk(result)) {
			assertEquals(result.value, 15)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("subtracts two negative integers", () => {
		const minuend = -10 as Integer
		const subtrahend = -5 as Integer
		const result = subtractInteger(minuend)(subtrahend)

		if (isOk(result)) {
			assertEquals(result.value, -5)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("handles subtraction with zero", () => {
		const minuend = 10 as Integer
		const subtrahend = 0 as Integer
		const result = subtractInteger(minuend)(subtrahend)

		if (isOk(result)) {
			assertEquals(result.value, 10)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("handles subtracting from zero", () => {
		const minuend = 0 as Integer
		const subtrahend = 10 as Integer
		const result = subtractInteger(minuend)(subtrahend)

		if (isOk(result)) {
			assertEquals(result.value, -10)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("returns error when result exceeds MAX_SAFE_INTEGER", () => {
		const minuend = 9007199254740991 as Integer
		const subtrahend = -1 as Integer
		const result = subtractInteger(minuend)(subtrahend)

		if (isError(result)) {
			assertEquals(result.error.code, "INTEGER_NOT_SAFE")
		} else {
			throw new Error("Expected Error result")
		}
	})

	await t.step("returns error when result is below MIN_SAFE_INTEGER", () => {
		const minuend = -9007199254740991 as Integer
		const subtrahend = 1 as Integer
		const result = subtractInteger(minuend)(subtrahend)

		if (isError(result)) {
			assertEquals(result.error.code, "INTEGER_NOT_SAFE")
		} else {
			throw new Error("Expected Error result")
		}
	})
})
