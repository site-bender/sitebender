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

import multiply from "./index.ts"

Deno.test("multiply - curried form with plain values", () => {
	const result = multiply(2)(3)

	assert(isOk(result))
	assertEquals(resultGetOrElse(0)(result), 6)
})

Deno.test("multiply - curried form with Result monads", async (t) => {
	await t.step("Ok × Ok → Ok", () => {
		const result = multiply(ok(2))(ok(3))

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 6)
	})

	await t.step("Error × Ok → Error", () => {
		const result = multiply(error("bad input"))(ok(3))

		assert(isError(result))
	})

	await t.step("Ok × Error → Error", () => {
		const result = multiply(ok(2))(error("bad input"))

		assert(isError(result))
	})
})

Deno.test("multiply - curried form with Validation monads", async (t) => {
	await t.step("Valid × Valid → Valid", () => {
		const result = multiply(success(2))(success(3))

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 6)
	})

	await t.step("Invalid × Valid → Invalid", () => {
		const result = multiply(failure(["error1"]))(success(3))

		assert(isInvalid(result))
	})

	await t.step("Valid × Invalid → Invalid", () => {
		const result = multiply(success(2))(failure(["error2"]))

		assert(isInvalid(result))
	})

	await t.step("Invalid × Invalid → Invalid (errors accumulate)", () => {
		const result = multiply(failure(["error1"]))(failure(["error2"]))

		assert(isInvalid(result))
	})
})

Deno.test("multiply - Validation wins over Result", async (t) => {
	await t.step("Validation × plain → Validation", () => {
		const result = multiply(success(2))(3)

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 6)
	})

	await t.step("plain × Validation → Validation", () => {
		const result = multiply(2)(success(3))

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 6)
	})

	await t.step("Result × Validation → Validation", () => {
		const result = multiply(ok(2))(success(3))

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 6)
	})

	await t.step("Validation × Result → Validation", () => {
		const result = multiply(success(2))(ok(3))

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 6)
	})
})

Deno.test("multiply - currying preserved", () => {
	const double = multiply(2)
	const result = double(10)

	assert(isOk(result))
	assertEquals(resultGetOrElse(0)(result), 20)
})

Deno.test("multiply - property: commutativity", () => {
	fc.assert(
		fc.property(fc.integer(), fc.integer(), (a, b) => {
			const resultAB = multiply(a)(b)
			const resultBA = multiply(b)(a)

			assert(isOk(resultAB))
			assert(isOk(resultBA))
			assertEquals(resultGetOrElse(0)(resultAB), resultGetOrElse(0)(resultBA))
		}),
	)
})

Deno.test("multiply - property: associativity", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: -1000, max: 1000 }),
			fc.integer({ min: -1000, max: 1000 }),
			fc.integer({ min: -1000, max: 1000 }),
			(a, b, c) => {
				const left = multiply(a)(resultGetOrElse(1)(multiply(b)(c)))
				const right = multiply(resultGetOrElse(1)(multiply(a)(b)))(c)

				assertEquals(resultGetOrElse(1)(left), resultGetOrElse(1)(right))
			},
		),
	)
})

Deno.test("multiply - property: identity element (1)", () => {
	fc.assert(
		fc.property(fc.integer(), (n) => {
			const result = multiply(1)(n)

			assert(isOk(result))
			assertEquals(resultGetOrElse(null)(result), n)
		}),
	)
})

Deno.test("multiply - property: zero annihilates", () => {
	fc.assert(
		fc.property(fc.integer(), (n) => {
			const result = multiply(0)(n)

			assert(isOk(result))
			assertEquals(resultGetOrElse(null)(result), 0)
		}),
	)
})

Deno.test("multiply - edge cases", async (t) => {
	await t.step("handles zero × zero", () => {
		const result = multiply(0)(0)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 0)
	})

	await t.step("handles negative × negative = positive", () => {
		const result = multiply(-5)(-2)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 10)
	})

	await t.step("handles positive × negative", () => {
		const result = multiply(10)(-3)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), -30)
	})

	await t.step("handles large numbers", () => {
		const max = Number.MAX_SAFE_INTEGER
		const result = multiply(max)(1)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), max)
	})

	await t.step("handles floating point", () => {
		const result = multiply(0.5)(0.2)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 0.1)
	})
})

Deno.test("multiply - undefined results for invalid inputs", async (t) => {
	await t.step("NaN as second arg returns Ok(undefined)", () => {
		const result = multiply(5)(NaN)

		assert(isOk(result))
		assertEquals(resultGetOrElse(null)(result), undefined)
	})

	await t.step("Infinity as second arg returns Ok(undefined)", () => {
		const result = multiply(5)(Infinity)

		assert(isOk(result))
		assertEquals(resultGetOrElse(null)(result), undefined)
	})
})

Deno.test("multiply - composition in pipelines", () => {
	const double = multiply(2)
	const triple = multiply(3)

	const result1 = double(10)
	const result2 = triple(result1)

	assert(isOk(result2))
	assertEquals(resultGetOrElse(0)(result2), 60)
})
