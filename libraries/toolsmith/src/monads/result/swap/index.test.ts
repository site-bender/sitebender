import { assert, assertEquals } from "@std/assert"

import error from "../error/index.ts"
import isError from "../isError/index.ts"
import isOk from "../isOk/index.ts"
import ok from "../ok/index.ts"
import swap from "./index.ts"

Deno.test("swap", async (t) => {
	await t.step("swaps Ok to Error", () => {
		const result = swap(ok(42))

		assert(isError(result))
		assertEquals(result.error, 42)
	})

	await t.step("swaps Error to Ok", () => {
		const result = swap(error("failed"))

		assert(isOk(result))
		assertEquals(result.value, "failed")
	})

	await t.step("swaps Ok with object to Error", () => {
		const value = { id: 1, name: "Alice" }
		const result = swap(ok(value))

		assert(isError(result))
		assertEquals(result.error, value)
	})

	await t.step("swaps Error with object to Ok", () => {
		const err = { code: 404, message: "Not found" }
		const result = swap(error(err))

		assert(isOk(result))
		assertEquals(result.value, err)
	})

	await t.step("swaps twice returns original", () => {
		const originalOk = ok(42)
		const swappedOnce = swap(originalOk)
		const swappedTwice = swap(swappedOnce)

		assert(isOk(swappedTwice))
		assertEquals(swappedTwice.value, 42)

		const originalError = error("failed")
		const errorSwappedOnce = swap(originalError)
		const errorSwappedTwice = swap(errorSwappedOnce)

		assert(isError(errorSwappedTwice))
		assertEquals(errorSwappedTwice.error, "failed")
	})

	await t.step("works with null and undefined", () => {
		const nullOk = swap(ok(null))

		assert(isError(nullOk))
		assertEquals(nullOk.error, null)

		const nullError = swap(error(null))

		assert(isOk(nullError))
		assertEquals(nullError.value, null)
	})
})
