import { assertEquals } from "@std/assert"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import divideInteger from "./index.ts"

Deno.test("divideInteger", async (t) => {
	await t.step("divides two positive integers evenly", () => {
		const dividend = 21 as Integer
		const divisor = 3 as Integer
		const result = divideInteger(dividend)(divisor)

		if (isOk(result)) {
			assertEquals(result.value, 7)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("divides with floor for non-even division", () => {
		const dividend = 22 as Integer
		const divisor = 3 as Integer
		const result = divideInteger(dividend)(divisor)

		if (isOk(result)) {
			assertEquals(result.value, 7)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("divides positive by negative", () => {
		const dividend = 21 as Integer
		const divisor = -3 as Integer
		const result = divideInteger(dividend)(divisor)

		if (isOk(result)) {
			assertEquals(result.value, -7)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("divides negative by positive", () => {
		const dividend = -21 as Integer
		const divisor = 3 as Integer
		const result = divideInteger(dividend)(divisor)

		if (isOk(result)) {
			assertEquals(result.value, -7)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("divides two negative integers", () => {
		const dividend = -21 as Integer
		const divisor = -3 as Integer
		const result = divideInteger(dividend)(divisor)

		if (isOk(result)) {
			assertEquals(result.value, 7)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("handles division by one", () => {
		const dividend = 10 as Integer
		const divisor = 1 as Integer
		const result = divideInteger(dividend)(divisor)

		if (isOk(result)) {
			assertEquals(result.value, 10)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("handles zero dividend", () => {
		const dividend = 0 as Integer
		const divisor = 5 as Integer
		const result = divideInteger(dividend)(divisor)

		if (isOk(result)) {
			assertEquals(result.value, 0)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("returns error when dividing by zero", () => {
		const dividend = 10 as Integer
		const divisor = 0 as Integer
		const result = divideInteger(dividend)(divisor)

		if (isError(result)) {
			assertEquals(result.error.code, "INTEGER_NOT_SAFE")
		} else {
			throw new Error("Expected Error result")
		}
	})

	await t.step("handles large integers", () => {
		const dividend = 1000000 as Integer
		const divisor = 2 as Integer
		const result = divideInteger(dividend)(divisor)

		if (isOk(result)) {
			assertEquals(result.value, 500000)
		} else {
			throw new Error("Expected Ok result")
		}
	})
})
