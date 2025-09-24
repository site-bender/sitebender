import { assert, assertEquals } from "@std/assert"

import isOk from "../isOk/index.ts"
import isError from "../isError/index.ts"
import tryCatch from "./index.ts"

Deno.test("tryCatch", async (t) => {
	await t.step("returns Ok for successful operation", () => {
		const withErrorHandler = tryCatch((e) => `Error: ${e}`)

		const result = withErrorHandler(() => 2 + 2)

		assert(isOk(result))
		assertEquals(result.value, 4)
	})

	await t.step("returns Error for throwing operation", () => {
		const withErrorHandler = tryCatch((e) => `Caught: ${e}`)

		const result = withErrorHandler(() => {
			throw new Error("Failed")
		})

		assert(isError(result))
		assertEquals(result.error, "Caught: Error: Failed")
	})

	await t.step("works with JSON parsing", () => {
		const safeJsonParse = tryCatch((e: unknown) => {
			if (e instanceof Error) {
				return `Parse error: ${e.message}`
			}
			return `Parse error: ${e}`
		})

		const validJson = safeJsonParse(() => JSON.parse('{"valid": "json"}'))

		assert(isOk(validJson))
		assertEquals(validJson.value, { valid: "json" })

		const invalidJson = safeJsonParse(() => JSON.parse('invalid'))

		assert(isError(invalidJson))
		assert(invalidJson.error.startsWith("Parse error:"))
	})

	await t.step("transforms error with onError function", () => {
		const withObjectError = tryCatch((e) => ({ type: "error", message: String(e) }))

		const result = withObjectError(() => {
			throw new Error("string error")
		})

		assert(isError(result))
		assertEquals(result.error, { type: "error", message: "Error: string error" })
	})

	await t.step("handles undefined and null returns", () => {
		const withErrorHandler = tryCatch((e) => `Error: ${e}`)

		const undefinedResult = withErrorHandler(() => undefined)

		assert(isOk(undefinedResult))
		assertEquals(undefinedResult.value, undefined)

		const nullResult = withErrorHandler(() => null)

		assert(isOk(nullResult))
		assertEquals(nullResult.value, null)
	})

	await t.step("can wrap unsafe array access", () => {
		const safeAccess = <T>(arr: Array<T>, index: number) => {
			const withErrorHandler = tryCatch((e) => String(e))

			return withErrorHandler(() => {
				if (index < 0 || index >= arr.length) {
					throw new Error(`Index ${index} out of bounds`)
				}

				return arr[index]
			})
		}

		const arr = [1, 2, 3]
		const validAccess = safeAccess(arr, 1)

		assert(isOk(validAccess))
		assertEquals(validAccess.value, 2)

		const invalidAccess = safeAccess(arr, 10)

		assert(isError(invalidAccess))
		assertEquals(invalidAccess.error, "Error: Index 10 out of bounds")
	})

	await t.step("preserves thrown error details", () => {
		const err = new Error("Custom error")
		const withIdentity = tryCatch((e) => e)

		const result = withIdentity(() => {
			throw err
		})

		assert(isError(result))
		assertEquals(result.error, err)
	})
})