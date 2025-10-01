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

import liftBinary from "./index.ts"

const add = (a: number) => (b: number) => a + b
const liftedAdd = liftBinary(add)

Deno.test("liftBinary - plain values default to Result", () => {
	const result = liftedAdd(5)(10)

	assert(isResult(result), "Expected Result type")
	assert(isOk(result))
	assertEquals(resultGetOrElse(0)(result), 15)
})

Deno.test("liftBinary - Result monad behavior", async (t) => {
	await t.step("Ok + Ok → Ok", () => {
		const result = liftedAdd(ok(5))(ok(10))

		assert(isResult(result), "Expected Result type")
		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 15)
	})

	await t.step("Error + Ok → Error (first error wins)", () => {
		const result = liftedAdd(error("first error"))(ok(10))

		assert(isResult(result), "Expected Result type")
		assert(isError(result))
	})

	await t.step("Ok + Error → Error (second error wins)", () => {
		const result = liftedAdd(ok(5))(error("second error"))

		assert(isResult(result), "Expected Result type")
		assert(isError(result))
	})

	await t.step("Error + Error → Error (first error wins)", () => {
		const result = liftedAdd(error("first"))(error("second"))

		assert(isResult(result), "Expected Result type")
		assert(isError(result))
	})
})

Deno.test("liftBinary - Validation monad behavior", async (t) => {
	await t.step("Valid + Valid → Valid", () => {
		const result = liftedAdd(success(5))(success(10))

		assert(isValidation(result), "Expected Validation type")
		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 15)
	})

	await t.step("Invalid + Valid → Invalid", () => {
		const result = liftedAdd(failure(["error 1"]))(success(10))

		assert(isValidation(result), "Expected Validation type")
		assert(isInvalid(result))
	})

	await t.step("Valid + Invalid → Invalid", () => {
		const result = liftedAdd(success(5))(failure(["error 2"]))

		assert(isValidation(result), "Expected Validation type")
		assert(isInvalid(result))
	})

	await t.step("Invalid + Invalid → Invalid (errors accumulate)", () => {
		const result = liftedAdd(failure(["error 1"]))(failure(["error 2"]))

		assert(isValidation(result), "Expected Validation type")
		assert(isInvalid(result))
	})
})

Deno.test("liftBinary - Validation wins rule", async (t) => {
	await t.step("Validation + plain → Validation", () => {
		const result = liftedAdd(success(5))(10)

		assert(isValidation(result), "Expected Validation type")
		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 15)
	})

	await t.step("plain + Validation → Validation", () => {
		const result = liftedAdd(5)(success(10))

		assert(isValidation(result), "Expected Validation type")
		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 15)
	})

	await t.step("Result.Ok + Validation.Valid → Validation", () => {
		const result = liftedAdd(ok(5))(success(10))

		assert(isValidation(result), "Expected Validation type")
		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 15)
	})

	await t.step("Validation.Valid + Result.Ok → Validation", () => {
		const result = liftedAdd(success(5))(ok(10))

		assert(isValidation(result), "Expected Validation type")
		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 15)
	})

	await t.step("Result.Error + Validation → Validation (converts Error to Valid)", () => {
		const result = liftedAdd(error("ignored"))(success(10))

		assert(isValidation(result), "Expected Validation type")
	})
})

Deno.test("liftBinary - currying preserved", () => {
	const add5 = liftedAdd(5)
	const result = add5(10)

	assert(isResult(result), "Expected Result type")
	assert(isOk(result))
	assertEquals(resultGetOrElse(0)(result), 15)
})

Deno.test("liftBinary - property: commutativity for addition", () => {
	fc.assert(
		fc.property(fc.integer(), fc.integer(), (a, b) => {
			const resultAB = liftedAdd(a)(b)
			const resultBA = liftedAdd(b)(a)

			assert(isResult(resultAB), "Expected Result type")
			assert(isResult(resultBA), "Expected Result type")
			assert(isOk(resultAB))
			assert(isOk(resultBA))
			assertEquals(resultGetOrElse(0)(resultAB), resultGetOrElse(0)(resultBA))
		}),
	)
})

Deno.test("liftBinary - property: Result propagation", () => {
	fc.assert(
		fc.property(fc.integer(), fc.integer(), (a, b) => {
			const result = liftedAdd(ok(a))(ok(b))

			assert(isResult(result), "Expected Result type")
			assert(isOk(result))
			assertEquals(resultGetOrElse(0)(result), a + b)
		}),
	)
})

Deno.test("liftBinary - property: Validation propagation", () => {
	fc.assert(
		fc.property(fc.integer(), fc.integer(), (a, b) => {
			const result = liftedAdd(success(a))(success(b))

			assert(isValidation(result), "Expected Validation type")
			assert(isValid(result))
			assertEquals(validationGetOrElse(0)(result), a + b)
		}),
	)
})

Deno.test("liftBinary - edge cases", async (t) => {
	await t.step("handles zero", () => {
		const result = liftedAdd(0)(0)

		assert(isResult(result), "Expected Result type")
		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 0)
	})

	await t.step("handles negative numbers", () => {
		const result = liftedAdd(-5)(-10)

		assert(isResult(result), "Expected Result type")
		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), -15)
	})

	await t.step("handles large numbers", () => {
		const max = Number.MAX_SAFE_INTEGER
		const result = liftedAdd(max)(0)

		assert(isResult(result), "Expected Result type")
		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), max)
	})
})

Deno.test("liftBinary - with different function types", async (t) => {
	await t.step("string concatenation", () => {
		const concat = (a: string) => (b: string) => a + b
		const liftedConcat = liftBinary(concat)

		const result = liftedConcat("Hello")(" World")

		assert(isResult(result), "Expected Result type")
		assert(isOk(result))
		assertEquals(resultGetOrElse("")(result), "Hello World")
	})

	await t.step("object merging", () => {
		const merge = (a: { x: number }) => (b: { y: number }) => ({ ...a, ...b })
		const liftedMerge = liftBinary(merge)

		const result = liftedMerge({ x: 1 })({ y: 2 })

		assert(isResult(result), "Expected Result type")
		assert(isOk(result))
		assertEquals(resultGetOrElse({ x: 0, y: 0 })(result), { x: 1, y: 2 })
	})
})
