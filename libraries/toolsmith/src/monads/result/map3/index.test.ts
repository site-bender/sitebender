import { assert, assertEquals } from "jsr:@std/assert"
import * as fc from "npm:fast-check"

import error from "../error/index.ts"
import resultGetOrElse from "../getOrElse/index.ts"
import isError from "../isError/index.ts"
import isOk from "../isOk/index.ts"
import ok from "../ok/index.ts"

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

Deno.test("map3 - all Ok values", () => {
	const result = mappedClamp(ok(0))(ok(10))(ok(5))

	assert(isOk(result))
	assertEquals(resultGetOrElse(0)(result), 5)
})

Deno.test("map3 - first Error short-circuits", () => {
	const result = mappedClamp(error("error 1"))(ok(10))(ok(5))

	assert(isError(result))
})

Deno.test("map3 - second Error short-circuits", () => {
	const result = mappedClamp(ok(0))(error("error 2"))(ok(5))

	assert(isError(result))
})

Deno.test("map3 - third Error propagates", () => {
	const result = mappedClamp(ok(0))(ok(10))(error("error 3"))

	assert(isError(result))
})

Deno.test("map3 - first Error wins when multiple", () => {
	const result = mappedClamp(error("first"))(error("second"))(ok(5))

	assert(isError(result))
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

				const result = mappedClamp(ok(min))(ok(max))(ok(value))

				assert(isOk(result))

				const clamped = resultGetOrElse(0)(result)

				assert(clamped >= min)
				assert(clamped <= max)
			},
		),
	)
})
