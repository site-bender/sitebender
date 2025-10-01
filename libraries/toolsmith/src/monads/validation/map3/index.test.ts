import { assert, assertEquals } from "jsr:@std/assert"
import * as fc from "npm:fast-check"

import failure from "../failure/index.ts"
import validationGetOrElse from "../getOrElse/index.ts"
import isInvalid from "../isInvalid/index.ts"
import isValid from "../isValid/index.ts"
import success from "../success/index.ts"

import map3 from "./index.ts"

const clamp = (min: number) => (max: number) => (value: number): number => {
	if (value < min) {
		return min
	}

	if (value > max) {
		return max
	}

	return value
}

const mappedClamp = map3(clamp)

Deno.test("map3 - all Valid values", () => {
	const result = mappedClamp(success(0))(success(10))(success(5))

	assert(isValid(result))
	assertEquals(validationGetOrElse(0)(result), 5)
})

Deno.test("map3 - first Invalid propagates", () => {
	const result = mappedClamp(failure(["error 1"]))(success(10))(success(5))

	assert(isInvalid(result))
})

Deno.test("map3 - second Invalid propagates", () => {
	const result = mappedClamp(success(0))(failure(["error 2"]))(success(5))

	assert(isInvalid(result))
})

Deno.test("map3 - third Invalid propagates", () => {
	const result = mappedClamp(success(0))(success(10))(failure(["error 3"]))

	assert(isInvalid(result))
})

Deno.test("map3 - two Invalid values accumulate errors", async (t) => {
	await t.step("first and second Invalid", () => {
		const result = mappedClamp(failure(["e1"]))(failure(["e2"]))(success(5))

		assert(isInvalid(result))
	})

	await t.step("first and third Invalid", () => {
		const result = mappedClamp(failure(["e1"]))(success(10))(failure(["e3"]))

		assert(isInvalid(result))
	})

	await t.step("second and third Invalid", () => {
		const result = mappedClamp(success(0))(failure(["e2"]))(failure(["e3"]))

		assert(isInvalid(result))
	})
})

Deno.test("map3 - all Invalid values accumulate all errors", () => {
	const result = mappedClamp(failure(["e1"]))(failure(["e2"]))(failure(["e3"]))

	assert(isInvalid(result))
})

Deno.test("map3 - property: applies function correctly", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 100 }),
			fc.integer({ min: 0, max: 100 }),
			fc.integer({ min: -1000, max: 1000 }),
			(min, max, value) => {
				if (min > max) {
					return true
				}

				const result = mappedClamp(success(min))(success(max))(success(value))

				assert(isValid(result))

				const clamped = validationGetOrElse(0)(result)

				assert(clamped >= min)
				assert(clamped <= max)
			},
		),
	)
})
