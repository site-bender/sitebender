import { assert, assertEquals } from "jsr:@std/assert"
import * as fc from "npm:fast-check"

import error from "../../../monads/result/error/index.ts"
import resultGetOrElse from "../../../monads/result/getOrElse/index.ts"
import isError from "../../../monads/result/isError/index.ts"
import isOk from "../../../monads/result/isOk/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import failure from "../../../monads/validation/failure/index.ts"
import validationGetOrElse from "../../../monads/validation/getOrElse/index.ts"
import isInvalid from "../../../monads/validation/isInvalid/index.ts"
import isValid from "../../../monads/validation/isValid/index.ts"
import success from "../../../monads/validation/success/index.ts"
import negate from "./index.ts"

Deno.test("negate - plain values default to Result", () => {
	const result = negate(5)

	assert(isOk(result))
	assertEquals(resultGetOrElse(0)(result), -5)
})

Deno.test("negate - Result monad behavior", async (t) => {
	await t.step("Ok value negates correctly", () => {
		const result = negate(ok(5))

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), -5)
	})

	await t.step("Error propagates", () => {
		const result = negate(error("bad input"))

		assert(isError(result))
	})
})

Deno.test("negate - Validation monad behavior", async (t) => {
	await t.step("Valid value negates correctly", () => {
		const result = negate(success(5))

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), -5)
	})

	await t.step("Invalid propagates", () => {
		const result = negate(failure(["error 1"]))

		assert(isInvalid(result))
	})
})

Deno.test("negate - Validation wins over Result", () => {
	const result = negate(success(5))

	assert(isValid(result))
	assertEquals(validationGetOrElse(0)(result), -5)
})

Deno.test("negate - property: involutive (double negation is identity)", () => {
	fc.assert(
		fc.property(fc.integer(), (n) => {
			const result1 = negate(n)
			const result2 = negate(result1)

			assert(isOk(result2))
			assertEquals(resultGetOrElse(0)(result2), n)
		}),
	)
})

Deno.test("negate - property: sign change", () => {
	fc.assert(
		fc.property(fc.integer({ min: 1, max: 1000000 }), (n) => {
			const result = negate(n)

			assert(isOk(result))
			assertEquals(resultGetOrElse(0)(result), -n)
		}),
	)
})

Deno.test("negate - edge cases", async (t) => {
	await t.step("zero becomes negative zero", () => {
		const result = negate(0)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), -0)
	})

	await t.step("negative zero becomes positive zero", () => {
		const result = negate(-0)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 0)
	})

	await t.step("negative becomes positive", () => {
		const result = negate(-42)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 42)
	})

	await t.step("positive becomes negative", () => {
		const result = negate(42)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), -42)
	})

	await t.step("Infinity becomes -Infinity", () => {
		const result = negate(Infinity)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), -Infinity)
	})

	await t.step("-Infinity becomes Infinity", () => {
		const result = negate(-Infinity)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), Infinity)
	})

	await t.step("NaN returns Ok(NaN)", () => {
		const result = negate(NaN)

		assert(isOk(result))
		assert(Number.isNaN(resultGetOrElse(0)(result)))
	})
})

Deno.test("negate - composition", () => {
	const result1 = negate(10)
	const result2 = negate(result1)
	const result3 = negate(result2)

	assert(isOk(result3))
	assertEquals(resultGetOrElse(0)(result3), -10)
})
