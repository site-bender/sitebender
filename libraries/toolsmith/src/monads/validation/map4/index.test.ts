import { assert, assertEquals } from "jsr:@std/assert"
import * as fc from "npm:fast-check"

import failure from "../failure/index.ts"
import validationGetOrElse from "../getOrElse/index.ts"
import isInvalid from "../isInvalid/index.ts"
import isValid from "../isValid/index.ts"
import success from "../success/index.ts"

import map4 from "./index.ts"

const sumFour = (a: number) => (b: number) => (c: number) => (d: number): number =>
	a + b + c + d

const mappedSum = map4(sumFour)

Deno.test("map4 - all Valid values", () => {
	const result = mappedSum(success(1))(success(2))(success(3))(success(4))

	assert(isValid(result))
	assertEquals(validationGetOrElse(0)(result), 10)
})

Deno.test("map4 - first Invalid propagates", () => {
	const result = mappedSum(failure(["e1"]))(success(2))(success(3))(success(4))

	assert(isInvalid(result))
})

Deno.test("map4 - second Invalid propagates", () => {
	const result = mappedSum(success(1))(failure(["e2"]))(success(3))(success(4))

	assert(isInvalid(result))
})

Deno.test("map4 - third Invalid propagates", () => {
	const result = mappedSum(success(1))(success(2))(failure(["e3"]))(success(4))

	assert(isInvalid(result))
})

Deno.test("map4 - fourth Invalid propagates", () => {
	const result = mappedSum(success(1))(success(2))(success(3))(failure(["e4"]))

	assert(isInvalid(result))
})

Deno.test("map4 - errors accumulate from multiple Invalid", async (t) => {
	await t.step("two Invalid values", () => {
		const result = mappedSum(failure(["e1"]))(failure(["e2"]))(success(3))(
			success(4),
		)

		assert(isInvalid(result))
	})

	await t.step("three Invalid values", () => {
		const result = mappedSum(failure(["e1"]))(failure(["e2"]))(failure(["e3"]))(
			success(4),
		)

		assert(isInvalid(result))
	})

	await t.step("all four Invalid values", () => {
		const result = mappedSum(failure(["e1"]))(failure(["e2"]))(failure(["e3"]))(
			failure(["e4"]),
		)

		assert(isInvalid(result))
	})
})

Deno.test("map4 - property: applies function correctly", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: -100, max: 100 }),
			fc.integer({ min: -100, max: 100 }),
			fc.integer({ min: -100, max: 100 }),
			fc.integer({ min: -100, max: 100 }),
			(a, b, c, d) => {
				const result = mappedSum(success(a))(success(b))(success(c))(success(d))

				assert(isValid(result))
				assertEquals(validationGetOrElse(0)(result), a + b + c + d)
			},
		),
	)
})
