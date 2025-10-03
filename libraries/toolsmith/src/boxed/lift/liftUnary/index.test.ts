import { assert, assertEquals } from "jsr:@std/assert"
import * as fc from "npm:fast-check"

import error from "../../../monads/result/error/index.ts"
import resultGetOrElse from "../../../monads/result/getOrElse/index.ts"
import isError from "../../../monads/result/isError/index.ts"
import isOk from "../../../monads/result/isOk/index.ts"
import isResult from "../../../monads/result/isResult/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import failure from "../../../monads/validation/failure/index.ts"
import validationGetOrElse from "../../../monads/validation/getOrElse/index.ts"
import isInvalid from "../../../monads/validation/isInvalid/index.ts"
import isValid from "../../../monads/validation/isValid/index.ts"
import isValidation from "../../../monads/validation/isValidation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import liftUnary from "./index.ts"

const double = (x: number): number => x * 2
const liftedDouble = liftUnary(double)

Deno.test("liftUnary - plain values default to Result", () => {
	const result = liftedDouble(5)

	assert(isResult(result), "Expected Result type")
	assert(isOk(result))
	assertEquals(resultGetOrElse(0)(result), 10)
})

Deno.test("liftUnary - Result monad behavior", async (t) => {
	await t.step("Ok value maps correctly", () => {
		const result = liftedDouble(ok(5))

		assert(isResult(result), "Expected Result type")
		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 10)
	})

	await t.step("Error propagates", () => {
		const result = liftedDouble(error("test error"))

		assert(isResult(result), "Expected Result type")
		assert(isError(result))
		assert(isOk(result) === false)
	})

	await t.step("Error preserves error value", () => {
		const result = liftedDouble(error({ code: 404, message: "not found" }))

		assert(isResult(result), "Expected Result type")
		assert(isError(result))
	})
})

Deno.test("liftUnary - Validation monad behavior", async (t) => {
	await t.step("Valid value maps correctly", () => {
		const result = liftedDouble(success(5))

		assert(isValidation(result), "Expected Validation type")

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 10)
	})

	await t.step("Invalid propagates errors", () => {
		const result = liftedDouble(failure(["error 1"]))

		assert(isValidation(result), "Expected Validation type")

		assert(isInvalid(result))
		assert(isValid(result) === false)
	})

	await t.step("Invalid preserves error array", () => {
		const result = liftedDouble(failure(["error 1", "error 2"]))

		assert(isValidation(result), "Expected Validation type")

		assert(isInvalid(result))
	})
})

Deno.test("liftUnary - monad type selection", async (t) => {
	await t.step("plain value returns Result", () => {
		const result = liftedDouble(5)

		assert(isResult(result), "Expected Result type")

		assert(isOk(result))
	})

	await t.step("Result input returns Result", () => {
		const result = liftedDouble(ok(5))

		assert(isResult(result), "Expected Result type")

		assert(isOk(result))
	})

	await t.step("Validation input returns Validation", () => {
		const result = liftedDouble(success(5))

		assert(isValidation(result), "Expected Validation type")

		assert(isValid(result))
	})
})

Deno.test("liftUnary - function composition", () => {
	const triple = (x: number): number => x * 3
	const add10 = (x: number): number => x + 10

	const liftedTriple = liftUnary(triple)
	const liftedAdd10 = liftUnary(add10)

	const result1 = liftedTriple(5)
	const result2 = liftedAdd10(result1)

	assert(isResult(result2), "Expected Result type")

	assert(isOk(result2))
	assertEquals(resultGetOrElse(0)(result2), 25)
})

Deno.test("liftUnary - property: preserves function behavior", () => {
	fc.assert(
		fc.property(fc.integer(), (n) => {
			const result = liftedDouble(n)
			const expected = double(n)

			if (result._tag === "Success" || result._tag === "Failure") {
				throw new Error("Expected Result, got Validation")
			}

			assert(isOk(result))
			assertEquals(resultGetOrElse(0)(result), expected)
		}),
	)
})

Deno.test("liftUnary - property: Result propagation", () => {
	fc.assert(
		fc.property(fc.integer(), (n) => {
			const result = liftedDouble(ok(n))

			if (result._tag === "Success" || result._tag === "Failure") {
				throw new Error("Expected Result, got Validation")
			}

			assert(isOk(result))
			assertEquals(resultGetOrElse(0)(result), double(n))
		}),
	)
})

Deno.test("liftUnary - property: Validation propagation", () => {
	fc.assert(
		fc.property(fc.integer(), (n) => {
			const result = liftedDouble(success(n))

			if (result._tag === "Ok" || result._tag === "Error") {
				throw new Error("Expected Validation, got Result")
			}

			assert(isValid(result))
			assertEquals(validationGetOrElse(0)(result), double(n))
		}),
	)
})

Deno.test("liftUnary - edge cases", async (t) => {
	await t.step("handles zero", () => {
		const result = liftedDouble(0)

		assert(isResult(result), "Expected Result type")

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 0)
	})

	await t.step("handles negative numbers", () => {
		const result = liftedDouble(-5)

		assert(isResult(result), "Expected Result type")

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), -10)
	})

	await t.step("handles large numbers", () => {
		const result = liftedDouble(Number.MAX_SAFE_INTEGER)

		assert(isResult(result), "Expected Result type")

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), Number.MAX_SAFE_INTEGER * 2)
	})

	await t.step("handles floating point", () => {
		const result = liftedDouble(3.14)

		assert(isResult(result), "Expected Result type")

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 6.28)
	})
})

Deno.test("liftUnary - with different function types", async (t) => {
	await t.step("string transformation", () => {
		const toUpper = (s: string): string => s.toUpperCase()
		const liftedToUpper = liftUnary(toUpper)

		const result = liftedToUpper("hello")

		assert(isResult(result), "Expected Result type")

		assert(isOk(result))
		assertEquals(resultGetOrElse("")(result), "HELLO")
	})

	await t.step("boolean transformation", () => {
		const negate = (b: boolean): boolean => !b
		const liftedNegate = liftUnary(negate)

		const result = liftedNegate(true)

		assert(isResult(result), "Expected Result type")

		assert(isOk(result))
		assertEquals(resultGetOrElse(false)(result), false)
	})

	await t.step("object transformation", () => {
		const addAge = (
			person: { name: string },
		): { name: string; age: number } => ({
			...person,
			age: 30,
		})
		const liftedAddAge = liftUnary(addAge)

		const result = liftedAddAge({ name: "Alice" })

		assert(isResult(result), "Expected Result type")

		assert(isOk(result))
		assertEquals(resultGetOrElse({ name: "", age: 0 })(result), {
			name: "Alice",
			age: 30,
		})
	})
})
