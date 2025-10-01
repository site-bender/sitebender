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

import charAt from "./index.ts"

Deno.test("charAt - plain values default to Result", () => {
	const result = charAt(0)("A")

	assert(isResult(result))
	assert(isOk(result))
	assertEquals(resultGetOrElse("")(result), "A")
})

Deno.test("charAt - Result monad behavior", async (t) => {
	await t.step("Ok + Ok → Ok", () => {
		const result = charAt(ok(0))(ok("hello"))

		assert(isResult(result))
		assert(isOk(result))
		assertEquals(resultGetOrElse("")(result), "h")
	})

	await t.step("Error + Ok → Error (index)", () => {
		const result = charAt(error("bad index"))(ok("hello"))

		assert(isResult(result))
		assert(isError(result))
	})

	await t.step("Ok + Error → Error (string)", () => {
		const result = charAt(ok(0))(error("bad string"))

		assert(isResult(result))
		assert(isError(result))
	})

	await t.step("Error + Error → Error", () => {
		const result = charAt(error("bad index"))(error("bad string"))

		assert(isResult(result))
		assert(isError(result))
	})
})

Deno.test("charAt - Validation monad behavior", async (t) => {
	await t.step("Valid + Valid → Valid", () => {
		const result = charAt(success(0))(success("hello"))

		assert(isValidation(result))
		assert(isValid(result))
		assertEquals(validationGetOrElse("")(result), "h")
	})

	await t.step("Invalid + Valid → Invalid", () => {
		const result = charAt(failure(["bad index"]))(success("hello"))

		assert(isValidation(result))
		assert(isInvalid(result))
	})

	await t.step("Valid + Invalid → Invalid", () => {
		const result = charAt(success(0))(failure(["bad string"]))

		assert(isValidation(result))
		assert(isInvalid(result))
	})

	await t.step("Invalid + Invalid → Invalid (accumulates errors)", () => {
		const result = charAt(failure(["error1"]))(failure(["error2"]))

		assert(isValidation(result))
		assert(isInvalid(result))
	})
})

Deno.test("charAt - Validation wins rule", async (t) => {
	await t.step("Ok index + Valid string → Valid", () => {
		const result = charAt(ok(0))(success("hello"))

		assert(isValidation(result))
		assert(isValid(result))
		assertEquals(validationGetOrElse("")(result), "h")
	})

	await t.step("Valid index + Ok string → Valid", () => {
		const result = charAt(success(0))(ok("hello"))

		assert(isValidation(result))
		assert(isValid(result))
		assertEquals(validationGetOrElse("")(result), "h")
	})

	await t.step("Valid index + plain string → Valid", () => {
		const result = charAt(success(0))("hello")

		assert(isValidation(result))
		assert(isValid(result))
		assertEquals(validationGetOrElse("")(result), "h")
	})
})

Deno.test("charAt - currying preserved", () => {
	const getCharAt0 = charAt(0)
	const result = getCharAt0("A")

	assert(isResult(result))
	assert(isOk(result))
	assertEquals(resultGetOrElse("")(result), "A")
})

Deno.test("charAt - out of bounds returns Error", async (t) => {
	await t.step("negative index", () => {
		const result = charAt(-1)("hello")

		assert(isResult(result))
		assert(isError(result))
	})

	await t.step("index too large", () => {
		const result = charAt(100)("hello")

		assert(isResult(result))
		assert(isError(result))
	})

	await t.step("empty string", () => {
		const result = charAt(0)("")

		assert(isResult(result))
		assert(isError(result))
	})
})

Deno.test("charAt - property: valid indices with monads", () => {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }),
			(str) => {
				const index = Math.floor(Math.random() * str.length)
				const result = charAt(index)(str)

				assert(isResult(result))
				assert(isOk(result))
			},
		),
	)
})
