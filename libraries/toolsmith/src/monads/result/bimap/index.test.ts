import { assert, assertEquals } from "@std/assert"

import type { Result } from "../../../types/fp/result/index.ts"

import toUpper from "../../../string/toCase/toUpper/index.ts"
import error from "../error/index.ts"
import fold from "../fold/index.ts"
import isError from "../isError/index.ts"
import isOk from "../isOk/index.ts"
import ok from "../ok/index.ts"
import bimap from "./index.ts"

Deno.test("bimap", async (t) => {
	await t.step("transforms Ok value with onOk function", () => {
		const double = (x: number) => x * 2
		const transform = bimap(toUpper)(double)

		const result = transform(ok(5))

		assert(isOk(result))
		const value = fold<string, number>(
			(_: string) => 0,
		)(
			(v: number) => v,
		)(result)
		assertEquals(value, 10)
	})

	await t.step("transforms Error value with onError function", () => {
		const double = (x: number) => x * 2
		const transform = bimap(toUpper)(double)

		const result = transform(error("fail"))

		assert(isError(result))
		const errorValue = fold<string, string>(
			(e: string) => e,
		)(
			(_: number) => "should not be ok",
		)(result)
		assertEquals(errorValue, "FAIL")
	})

	await t.step("can change both types", () => {
		const toErrorObject = (e: string) => ({ error: e })
		const toString = (x: number) => x.toString()
		const transform = bimap(toErrorObject)(toString)

		const okResult = transform(ok(42))

		assert(isOk(okResult))
		const okValue = fold<{ error: string }, string>(
			(_: { error: string }) => "error",
		)(
			(v: string) => v,
		)(okResult)
		assertEquals(okValue, "42")

		const errorResult = transform(error("not found"))

		assert(isError(errorResult))
		const errorValue = fold<{ error: string }, { error: string } | null>(
			(e: { error: string }) => e,
		)(
			(_: string) => null,
		)(errorResult)
		assertEquals(errorValue, { error: "not found" })
	})

	await t.step("works with identity functions", () => {
		const identity = <T>(x: T): T => x
		const transform = bimap(identity)(identity)

		const okResult: Result<string, number> = ok(42)
		const errorResult: Result<string, number> = error("error")

		assertEquals(transform(okResult), okResult)
		assertEquals(transform(errorResult), errorResult)
	})

	await t.step("composes with itself", () => {
		const addPrefix = (e: string) => `Error: ${e}`
		const double = (x: number) => x * 2
		const first = bimap(addPrefix)(double)

		const addTen = (x: number) => x + 10
		const second = bimap(toUpper)(addTen)

		const okInput: Result<string, number> = ok(5)
		const firstOkResult = first(okInput)
		const finalOkResult = second(firstOkResult)

		assert(isOk(finalOkResult))
		const finalOkValue = fold<string, number>(
			(_: string) => 0,
		)(
			(v: number) => v,
		)(finalOkResult)
		assertEquals(finalOkValue, 20)

		const errorInput: Result<string, number> = error("failed")
		const firstErrorResult = first(errorInput)
		const finalErrorResult = second(firstErrorResult)

		assert(isError(finalErrorResult))
		const finalErrorValue = fold<string, string>(
			(e: string) => e,
		)(
			(_: number) => "should not be ok",
		)(finalErrorResult)
		assertEquals(finalErrorValue, "ERROR: FAILED")
	})

	await t.step("handles complex transformations", () => {
		type User = { id: number; name: string }
		type ApiError = { code: number; message: string }

		const toApiError = (e: string): ApiError => ({ code: 500, message: e })
		const getUserName = (u: User) => u.name.toUpperCase()
		const transform = bimap(toApiError)(getUserName)

		const okResult = transform(
			ok({ id: 1, name: "alice" }) as Result<string, User>,
		)

		assert(isOk(okResult))
		const okValue = fold<ApiError, string>(
			(_: ApiError) => "error",
		)(
			(v: string) => v,
		)(okResult)
		assertEquals(okValue, "ALICE")

		const errorResult = transform(
			error("Connection failed") as Result<string, User>,
		)

		assert(isError(errorResult))
		const errorValue = fold<ApiError, ApiError | null>(
			(e: ApiError) => e,
		)(
			(_: string) => null,
		)(errorResult)
		assertEquals(errorValue, { code: 500, message: "Connection failed" })
	})
})
