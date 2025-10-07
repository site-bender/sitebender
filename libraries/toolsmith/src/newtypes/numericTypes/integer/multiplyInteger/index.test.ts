import { assert, assertEquals } from "@std/assert"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import multiplyInteger from "./index.ts"

Deno.test("multiplyInteger", async (t) => {
	await t.step("multiplies two positive integers", () => {
		const multiplicand = 7 as Integer
		const multiplier = 3 as Integer
		const result = multiplyInteger(multiplicand)(multiplier)

		if (isOk(result)) {
			assertEquals(result.value, 21)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("multiplies positive and negative integers", () => {
		const multiplicand = 7 as Integer
		const multiplier = -3 as Integer
		const result = multiplyInteger(multiplicand)(multiplier)

		if (isOk(result)) {
			assertEquals(result.value, -21)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("multiplies two negative integers", () => {
		const multiplicand = -7 as Integer
		const multiplier = -3 as Integer
		const result = multiplyInteger(multiplicand)(multiplier)

		if (isOk(result)) {
			assertEquals(result.value, 21)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("handles multiplication by zero", () => {
		const multiplicand = 10 as Integer
		const multiplier = 0 as Integer
		const result = multiplyInteger(multiplicand)(multiplier)

		if (isOk(result)) {
			assertEquals(result.value, 0)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("handles multiplication by one", () => {
		const multiplicand = 10 as Integer
		const multiplier = 1 as Integer
		const result = multiplyInteger(multiplicand)(multiplier)

		if (isOk(result)) {
			assertEquals(result.value, 10)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("handles large integers", () => {
		const multiplicand = 1000 as Integer
		const multiplier = 2000 as Integer
		const result = multiplyInteger(multiplicand)(multiplier)

		if (isOk(result)) {
			assertEquals(result.value, 2000000)
		} else {
			throw new Error("Expected Ok result")
		}
	})

	await t.step("returns error when result exceeds MAX_SAFE_INTEGER", () => {
		const multiplicand = 9007199254740991 as Integer
		const multiplier = 2 as Integer
		const result = multiplyInteger(multiplicand)(multiplier)

		if (isError(result)) {
			assertEquals(result.error.code, "INTEGER_NOT_SAFE")
		} else {
			throw new Error("Expected Error result")
		}
	})

	await t.step("returns error when result is below MIN_SAFE_INTEGER", () => {
		const multiplicand = 9007199254740991 as Integer
		const multiplier = -2 as Integer
		const result = multiplyInteger(multiplicand)(multiplier)

		if (isError(result)) {
			assertEquals(result.error.code, "INTEGER_NOT_SAFE")
		} else {
			throw new Error("Expected Error result")
		}
	})
})
