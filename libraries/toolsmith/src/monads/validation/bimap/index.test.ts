import { assert } from "https://deno.land/std@0.218.0/assert/mod.ts"

import failure from "../failure/index.ts"
import isInvalid from "../isInvalid/index.ts"
import isValid from "../isValid/index.ts"
import success from "../success/index.ts"
import bimap from "./index.ts"

Deno.test("bimap - transforms both Invalid and Valid values", async (t) => {
	await t.step("should transform valid values with the valid function", () => {
		const validation = success(21)

		const result = bimap((e: string) => e.toUpperCase())((n: number) => n * 2)(
			validation,
		)

		assert(isValid(result))
	})

	await t.step(
		"should transform invalid single error with the invalid function",
		() => {
			const validation = failure(["error"])

			const result = bimap((e: string) => e.toUpperCase())((n: number) =>
				n * 2
			)(validation)

			assert(isInvalid(result))
		},
	)

	await t.step(
		"should transform invalid multiple errors with the invalid function",
		() => {
			const validation = failure(["first", "second", "third"])

			const result = bimap((e: string) => e.toUpperCase())((n: number) =>
				n * 2
			)(validation)

			assert(isInvalid(result))
		},
	)

	await t.step("should transform complex types", () => {
		const validation = success(100)

		const result = bimap((e: string) => ({ code: e }))((n: number) =>
			n.toString()
		)(validation)

		assert(isValid(result))
	})

	await t.step("should transform error objects", () => {
		type ValidationError = { field: string; message: string }
		const validation = failure<ValidationError>([{
			field: "age",
			message: "too young",
		}])
		const addTimestamp = (err: ValidationError) => ({
			...err,
			timestamp: 1234567890,
		})
		const doubled = (n: number) => n * 2

		const result = bimap<
			ValidationError,
			{ field: string; message: string; timestamp: number }
		>(addTimestamp)(doubled)(validation)

		assert(isInvalid(result))
	})

	await t.step("should maintain validation structure", () => {
		const validation = success(255)
		const errorToString = (err: unknown) => JSON.stringify(err)
		const numberToHex = (n: number) => n.toString(16)

		const result = bimap<unknown, string>(errorToString)(numberToHex)(
			validation,
		)

		assert(isValid(result))
	})

	await t.step("should handle identity transformations", () => {
		const identity = <T>(x: T) => x
		const validation = success("unchanged")
		const result = bimap(identity)(identity)(validation)

		assert(isValid(result))
	})
})
