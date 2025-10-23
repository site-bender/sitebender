import { assert, assertEquals } from "@std/assert"
import * as fc from "npm:fast-check"

import error from "../error/index.ts"
import resultGetOrElse from "../getOrElse/index.ts"
import isError from "../isError/index.ts"
import isOk from "../isOk/index.ts"
import ok from "../ok/index.ts"
import map4 from "./index.ts"

const sumFour =
	(a: number) => (b: number) => (c: number) => (d: number): number =>
		a + b + c + d

const mappedSum = map4(sumFour)

Deno.test("map4 - all Ok values", () => {
	const result = mappedSum(ok(1))(ok(2))(ok(3))(ok(4))

	assert(isOk(result))
	assertEquals(resultGetOrElse(0)(result), 10)
})

Deno.test("map4 - first Error short-circuits", () => {
	const result = mappedSum(error("e1"))(ok(2))(ok(3))(ok(4))

	assert(isError(result))
})

Deno.test("map4 - second Error short-circuits", () => {
	const result = mappedSum(ok(1))(error("e2"))(ok(3))(ok(4))

	assert(isError(result))
})

Deno.test("map4 - third Error short-circuits", () => {
	const result = mappedSum(ok(1))(ok(2))(error("e3"))(ok(4))

	assert(isError(result))
})

Deno.test("map4 - fourth Error propagates", () => {
	const result = mappedSum(ok(1))(ok(2))(ok(3))(error("e4"))

	assert(isError(result))
})

Deno.test("map4 - first Error wins when multiple", () => {
	const result = mappedSum(error("first"))(error("second"))(ok(3))(ok(4))

	assert(isError(result))
})

Deno.test("map4 - property: applies function correctly", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: -100, max: 100 }),
			fc.integer({ min: -100, max: 100 }),
			fc.integer({ min: -100, max: 100 }),
			fc.integer({ min: -100, max: 100 }),
			(a, b, c, d) => {
				const result = mappedSum(ok(a))(ok(b))(ok(c))(ok(d))

				assert(isOk(result))
				assertEquals(resultGetOrElse(0)(result), a + b + c + d)
			},
		),
	)
})
