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

import liftQuaternary from "./index.ts"

const sumFour = (a: number) => (b: number) => (c: number) => (d: number): number =>
	a + b + c + d

const liftedSumFour = liftQuaternary(sumFour)

Deno.test("liftQuaternary - plain values default to Result", () => {
	const result = liftedSumFour(1)(2)(3)(4)

	assert(isOk(result))
	assertEquals(resultGetOrElse(0)(result), 10)
})

Deno.test("liftQuaternary - Result monad behavior", async (t) => {
	await t.step("all Ok → Ok", () => {
		const result = liftedSumFour(ok(1))(ok(2))(ok(3))(ok(4))

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 10)
	})

	await t.step("first Error short-circuits", () => {
		const result = liftedSumFour(error("e1"))(ok(2))(ok(3))(ok(4))

		assert(isError(result))
	})

	await t.step("second Error short-circuits", () => {
		const result = liftedSumFour(ok(1))(error("e2"))(ok(3))(ok(4))

		assert(isError(result))
	})

	await t.step("third Error short-circuits", () => {
		const result = liftedSumFour(ok(1))(ok(2))(error("e3"))(ok(4))

		assert(isError(result))
	})

	await t.step("fourth Error propagates", () => {
		const result = liftedSumFour(ok(1))(ok(2))(ok(3))(error("e4"))

		assert(isError(result))
	})
})

Deno.test("liftQuaternary - Validation monad behavior", async (t) => {
	await t.step("all Valid → Valid", () => {
		const result = liftedSumFour(success(1))(success(2))(success(3))(success(4))

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 10)
	})

	await t.step("one Invalid propagates", () => {
		const result = liftedSumFour(failure(["e1"]))(success(2))(success(3))(
			success(4),
		)

		assert(isInvalid(result))
	})

	await t.step("multiple Invalid accumulate errors", () => {
		const result = liftedSumFour(failure(["e1"]))(failure(["e2"]))(success(3))(
			success(4),
		)

		assert(isInvalid(result))
	})

	await t.step("all Invalid accumulate all errors", () => {
		const result = liftedSumFour(failure(["e1"]))(failure(["e2"]))(
			failure(["e3"]),
		)(failure(["e4"]))

		assert(isInvalid(result))
	})
})

Deno.test("liftQuaternary - Validation wins rule", async (t) => {
	await t.step("any Validation makes result Validation", () => {
		const result = liftedSumFour(success(1))(2)(3)(4)

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 10)
	})

	await t.step("Result + Result + Validation + plain → Validation", () => {
		const result = liftedSumFour(ok(1))(ok(2))(success(3))(4)

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 10)
	})
})

Deno.test("liftQuaternary - currying preserved", () => {
	const sumThreeTo = liftedSumFour(1)(2)(3)
	const result = sumThreeTo(4)

	assert(isOk(result))
	assertEquals(resultGetOrElse(0)(result), 10)
})

Deno.test("liftQuaternary - property: applies function correctly", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: -100, max: 100 }),
			fc.integer({ min: -100, max: 100 }),
			fc.integer({ min: -100, max: 100 }),
			fc.integer({ min: -100, max: 100 }),
			(a, b, c, d) => {
				const result = liftedSumFour(a)(b)(c)(d)

				assert(isOk(result))
				assertEquals(resultGetOrElse(0)(result), a + b + c + d)
			},
		),
	)
})
