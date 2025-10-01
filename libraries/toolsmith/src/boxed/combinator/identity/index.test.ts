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

import identity from "./index.ts"

Deno.test("identity - plain values default to Result", () => {
	const result = identity(42)

	assert(isResult(result), "Expected Result type")
	assert(isOk(result))
	assertEquals(resultGetOrElse(0)(result), 42)
})

Deno.test("identity - Result monad behavior", async (t) => {
	await t.step("Ok → Ok (value unchanged)", () => {
		const result = identity(ok(42))

		assert(isResult(result), "Expected Result type")
		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 42)
	})

	await t.step("Error → Error (propagates)", () => {
		const result = identity(error("error message"))

		assert(isResult(result), "Expected Result type")
		assert(isError(result))
	})
})

Deno.test("identity - Validation monad behavior", async (t) => {
	await t.step("Valid → Valid (value unchanged)", () => {
		const result = identity(success(42))

		assert(isValidation(result), "Expected Validation type")
		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 42)
	})

	await t.step("Invalid → Invalid (propagates)", () => {
		const result = identity(failure(["error message"]))

		assert(isValidation(result), "Expected Validation type")
		assert(isInvalid(result))
	})
})

Deno.test("identity - Validation wins rule", () => {
	const result = identity(success(42))

	assert(isValidation(result), "Expected Validation type")
	assert(isValid(result))
	assertEquals(validationGetOrElse(0)(result), 42)
})

Deno.test("identity - property: returns input unchanged", () => {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer(),
				fc.string(),
				fc.boolean(),
				fc.array(fc.integer()),
			),
			(value) => {
				const result = identity(value)

				assert(isResult(result), "Expected Result type")
				assert(isOk(result))
				assertEquals(resultGetOrElse(null)(result), value)
			},
		),
	)
})

Deno.test("identity - edge cases", async (t) => {
	await t.step("null", () => {
		const result = identity(null)

		assert(isResult(result), "Expected Result type")
		assert(isOk(result))
		assertEquals(resultGetOrElse(undefined)(result), null)
	})

	await t.step("undefined", () => {
		const result = identity(undefined)

		assert(isResult(result), "Expected Result type")
		assert(isOk(result))
		assertEquals(resultGetOrElse(null)(result), undefined)
	})

	await t.step("empty string", () => {
		const result = identity("")

		assert(isResult(result), "Expected Result type")
		assert(isOk(result))
		assertEquals(resultGetOrElse("default")(result), "")
	})

	await t.step("zero", () => {
		const result = identity(0)

		assert(isResult(result), "Expected Result type")
		assert(isOk(result))
		assertEquals(resultGetOrElse(-1)(result), 0)
	})

	await t.step("object", () => {
		const obj = { a: 1, b: 2 }
		const result = identity(obj)

		assert(isResult(result), "Expected Result type")
		assert(isOk(result))
		assertEquals(resultGetOrElse({})(result), obj)
	})
})

Deno.test("identity - idempotence", () => {
	const value = 42
	const once = identity(value)
	const twice = identity(once)

	assert(isResult(once), "Expected Result type")
	assert(isOk(once))
	assert(isResult(twice), "Expected Result type")
	assert(isOk(twice))
	assertEquals(resultGetOrElse(0)(twice), value)
})
