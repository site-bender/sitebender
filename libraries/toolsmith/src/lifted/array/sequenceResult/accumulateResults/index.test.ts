import { assertEquals } from "@std/assert"

import err from "../../../../monads/result/err/index.ts"
import ok from "../../../../monads/result/ok/index.ts"
import accumulateResults from "./index.ts"

Deno.test("accumulateResults should accumulate when both are Ok", () => {
	const accumulator = ok([1, 2])
	const current = ok(3)

	const result = accumulateResults(accumulator, current)

	assertEquals(result, ok([1, 2, 3]))
})

Deno.test("accumulateResults should return accumulator error when accumulator is Err", () => {
	const accumulator = err("first error")
	const current = ok(3)

	const result = accumulateResults(accumulator, current)

	assertEquals(result, err("first error"))
})

Deno.test("accumulateResults should return current error when current is Err", () => {
	const accumulator = ok([1, 2])
	const current = err("new error")

	const result = accumulateResults(accumulator, current)

	assertEquals(result, err("new error"))
})

Deno.test("accumulateResults should return accumulator error when both are Err", () => {
	const accumulator = err("first error")
	const current = err("second error")

	const result = accumulateResults(accumulator, current)

	assertEquals(result, err("first error"))
})
