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

import liftTernary from "./index.ts"

const clamp = (min: number) => (max: number) => (value: number): number => {
	if (value < min) {
		return min
	}

	if (value > max) {
		return max
	}

	return value
}

const liftedClamp = liftTernary(clamp)

Deno.test("liftTernary - plain values default to Result", () => {
	const result = liftedClamp(0)(10)(5)

	assert(isOk(result))
	assertEquals(resultGetOrElse(0)(result), 5)
})

Deno.test("liftTernary - Result monad behavior", async (t) => {
	await t.step("Ok + Ok + Ok → Ok", () => {
		const result = liftedClamp(ok(0))(ok(10))(ok(5))

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 5)
	})

	await t.step("Error + Ok + Ok → Error (first error wins)", () => {
		const result = liftedClamp(error("error 1"))(ok(10))(ok(5))

		assert(isError(result))
	})

	await t.step("Ok + Error + Ok → Error (second error wins)", () => {
		const result = liftedClamp(ok(0))(error("error 2"))(ok(5))

		assert(isError(result))
	})

	await t.step("Ok + Ok + Error → Error (third error wins)", () => {
		const result = liftedClamp(ok(0))(ok(10))(error("error 3"))

		assert(isError(result))
	})

	await t.step("Error + Error + Ok → Error (first error wins)", () => {
		const result = liftedClamp(error("error 1"))(error("error 2"))(ok(5))

		assert(isError(result))
	})
})

Deno.test("liftTernary - Validation monad behavior", async (t) => {
	await t.step("Valid + Valid + Valid → Valid", () => {
		const result = liftedClamp(success(0))(success(10))(success(5))

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 5)
	})

	await t.step("Invalid + Valid + Valid → Invalid", () => {
		const result = liftedClamp(failure(["error 1"]))(success(10))(success(5))

		assert(isInvalid(result))
	})

	await t.step("Valid + Invalid + Valid → Invalid", () => {
		const result = liftedClamp(success(0))(failure(["error 2"]))(success(5))

		assert(isInvalid(result))
	})

	await t.step("Valid + Valid + Invalid → Invalid", () => {
		const result = liftedClamp(success(0))(success(10))(failure(["error 3"]))

		assert(isInvalid(result))
	})

	await t.step("Invalid + Invalid + Valid → Invalid (errors accumulate)", () => {
		const result = liftedClamp(failure(["error 1"]))(failure(["error 2"]))(
			success(5),
		)

		assert(isInvalid(result))
	})

	await t.step("All Invalid → Invalid (all errors accumulate)", () => {
		const result = liftedClamp(failure(["error 1"]))(failure(["error 2"]))(
			failure(["error 3"]),
		)

		assert(isInvalid(result))
	})
})

Deno.test("liftTernary - Validation wins rule", async (t) => {
	await t.step("Validation + plain + plain → Validation", () => {
		const result = liftedClamp(success(0))(10)(5)

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 5)
	})

	await t.step("plain + Validation + plain → Validation", () => {
		const result = liftedClamp(0)(success(10))(5)

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 5)
	})

	await t.step("plain + plain + Validation → Validation", () => {
		const result = liftedClamp(0)(10)(success(5))

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 5)
	})

	await t.step("Result + Result + Validation → Validation", () => {
		const result = liftedClamp(ok(0))(ok(10))(success(5))

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 5)
	})

	await t.step("Validation + Result + Result → Validation", () => {
		const result = liftedClamp(success(0))(ok(10))(ok(5))

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 5)
	})
})

Deno.test("liftTernary - currying preserved", () => {
	const clamp0to10 = liftedClamp(0)(10)
	const result = clamp0to10(15)

	assert(isOk(result))
	assertEquals(resultGetOrElse(0)(result), 10)
})

Deno.test("liftTernary - property: clamps within bounds", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 100 }),
			fc.integer({ min: 0, max: 100 }),
			fc.integer({ min: -1000, max: 1000 }),
			(min, max, value) => {
				if (min > max) {
					return true
				}

				const result = liftedClamp(min)(max)(value)

				assert(isOk(result))

				const clamped = resultGetOrElse(0)(result)

				assert(clamped >= min)
				assert(clamped <= max)
			},
		),
	)
})

Deno.test("liftTernary - edge cases", async (t) => {
	await t.step("value below min returns min", () => {
		const result = liftedClamp(0)(10)(-5)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 0)
	})

	await t.step("value above max returns max", () => {
		const result = liftedClamp(0)(10)(15)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 10)
	})

	await t.step("value within range unchanged", () => {
		const result = liftedClamp(0)(10)(5)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 5)
	})

	await t.step("value equals min", () => {
		const result = liftedClamp(0)(10)(0)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 0)
	})

	await t.step("value equals max", () => {
		const result = liftedClamp(0)(10)(10)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 10)
	})

	await t.step("negative range", () => {
		const result = liftedClamp(-10)(-5)(-7)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), -7)
	})
})

Deno.test("liftTernary - with different function types", async (t) => {
	await t.step("string conditional selection", () => {
		const selectString = (a: string) => (b: string) => (c: boolean): string =>
			c ? a : b
		const liftedSelect = liftTernary(selectString)

		const result = liftedSelect("yes")("no")(true)

		assert(isOk(result))
		assertEquals(resultGetOrElse("")(result), "yes")
	})

	await t.step("object construction", () => {
		const makePoint = (x: number) => (y: number) => (z: number) => ({
			x,
			y,
			z,
		})
		const liftedMakePoint = liftTernary(makePoint)

		const result = liftedMakePoint(1)(2)(3)

		assert(isOk(result))
		assertEquals(resultGetOrElse({ x: 0, y: 0, z: 0 })(result), {
			x: 1,
			y: 2,
			z: 3,
		})
	})
})
