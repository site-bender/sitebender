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

import add from "./index.ts"

Deno.test("add - curried form with plain values", () => {
	const result = add(2)(3)

	assert(isOk(result))
	assertEquals(resultGetOrElse(0)(result), 5)
})

Deno.test("add - curried form with Result monads", async (t) => {
	await t.step("Ok + Ok → Ok", () => {
		const result = add(ok(2))(ok(3))

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 5)
	})

	await t.step("Error + Ok → Error", () => {
		const result = add(error("bad input"))(ok(3))

		assert(isError(result))
	})

	await t.step("Ok + Error → Error", () => {
		const result = add(ok(2))(error("bad input"))

		assert(isError(result))
	})
})

Deno.test("add - curried form with Validation monads", async (t) => {
	await t.step("Valid + Valid → Valid", () => {
		const result = add(success(2))(success(3))

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 5)
	})

	await t.step("Invalid + Valid → Invalid", () => {
		const result = add(failure(["error1"]))(success(3))

		assert(isInvalid(result))
	})

	await t.step("Valid + Invalid → Invalid", () => {
		const result = add(success(2))(failure(["error2"]))

		assert(isInvalid(result))
	})

	await t.step("Invalid + Invalid → Invalid (errors accumulate)", () => {
		const result = add(failure(["error1"]))(failure(["error2"]))

		assert(isInvalid(result))
	})
})

Deno.test("add - Validation wins over Result", async (t) => {
	await t.step("Validation + plain → Validation", () => {
		const result = add(success(2))(3)

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 5)
	})

	await t.step("plain + Validation → Validation", () => {
		const result = add(2)(success(3))

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 5)
	})

	await t.step("Result + Validation → Validation", () => {
		const result = add(ok(2))(success(3))

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 5)
	})

	await t.step("Validation + Result → Validation", () => {
		const result = add(success(2))(ok(3))

		assert(isValid(result))
		assertEquals(validationGetOrElse(0)(result), 5)
	})
})

Deno.test("add - currying preserved", () => {
	const add5 = add(5)
	const result = add5(10)

	assert(isOk(result))
	assertEquals(resultGetOrElse(0)(result), 15)
})

Deno.test("add - property: commutativity", () => {
	fc.assert(
		fc.property(fc.integer(), fc.integer(), (a, b) => {
			const resultAB = add(a)(b)
			const resultBA = add(b)(a)

			assert(isOk(resultAB))
			assert(isOk(resultBA))
			assertEquals(resultGetOrElse(0)(resultAB), resultGetOrElse(0)(resultBA))
		}),
	)
})

Deno.test("add - property: associativity", () => {
	fc.assert(
		fc.property(fc.integer(), fc.integer(), fc.integer(), (a, b, c) => {
			const left = add(a)(resultGetOrElse(0)(add(b)(c)))
			const right = add(resultGetOrElse(0)(add(a)(b)))(c)

			assertEquals(resultGetOrElse(0)(left), resultGetOrElse(0)(right))
		}),
	)
})

Deno.test("add - property: identity element (0)", () => {
	fc.assert(
		fc.property(fc.integer(), (n) => {
			const result = add(0)(n)

			assert(isOk(result))
			assertEquals(resultGetOrElse(null)(result), n)
		}),
	)
})

Deno.test("add - edge cases", async (t) => {
	await t.step("handles zero + zero", () => {
		const result = add(0)(0)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 0)
	})

	await t.step("handles negative numbers", () => {
		const result = add(-5)(-10)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), -15)
	})

	await t.step("handles positive + negative", () => {
		const result = add(10)(-3)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), 7)
	})

	await t.step("handles large numbers", () => {
		const max = Number.MAX_SAFE_INTEGER
		const result = add(max)(0)

		assert(isOk(result))
		assertEquals(resultGetOrElse(0)(result), max)
	})

	await t.step("handles floating point", () => {
		const result = add(0.1)(0.2)

		assert(isOk(result))
	})
})

Deno.test("add - undefined results for invalid inputs", async (t) => {
	await t.step("NaN as second arg returns Ok(undefined)", () => {
		const result = add(5)(NaN)

		assert(isOk(result))
		assertEquals(resultGetOrElse(null)(result), undefined)
	})

	await t.step("Infinity as second arg returns Ok(undefined)", () => {
		const result = add(5)(Infinity)

		assert(isOk(result))
		assertEquals(resultGetOrElse(null)(result), undefined)
	})
})

Deno.test("add - composition in pipelines", () => {
	const add5 = add(5)
	const add3 = add(3)

	const result1 = add5(10)
	const result2 = add3(result1)

	assert(isOk(result2))
	assertEquals(resultGetOrElse(0)(result2), 18)
})
