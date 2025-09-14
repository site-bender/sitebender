import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import tryCatch from "./index.ts"

Deno.test("tryCatch", async (t) => {
	await t.step("returns Ok for successful operation", () => {
		const result = tryCatch(
			() => 2 + 2,
			(e) => `Error: ${e}`
		)
		assertEquals(result._tag, "Right")
		assertEquals((result as any).right, 4)
	})

	await t.step("returns Err for throwing operation", () => {
		const result = tryCatch(
			() => { throw new Error("Failed") },
			(e) => `Caught: ${e}`
		)
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, "Caught: Error: Failed")
	})

	await t.step("works with JSON parsing", () => {
		const validJson = tryCatch(
			() => JSON.parse('{"valid": "json"}'),
			(e) => `Parse error: ${e}`
		)
		assertEquals(validJson._tag, "Right")
		assertEquals((validJson as any).right, { valid: "json" })

		const invalidJson = tryCatch(
			() => JSON.parse('invalid'),
			(e: any) => `Parse error: ${e.message}`
		)
		assertEquals(invalidJson._tag, "Left")
		assertEquals(typeof (invalidJson as any).left, "string")
		assertEquals((invalidJson as any).left.startsWith("Parse error:"), true)
	})

	await t.step("transforms error with onError function", () => {
		const result = tryCatch(
			() => { throw "string error" },
			(e) => ({ type: "error", message: String(e) })
		)
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, { type: "error", message: "string error" })
	})

	await t.step("handles undefined and null returns", () => {
		const undefinedResult = tryCatch(
			() => undefined,
			(e) => `Error: ${e}`
		)
		assertEquals(undefinedResult._tag, "Right")
		assertEquals((undefinedResult as any).right, undefined)

		const nullResult = tryCatch(
			() => null,
			(e) => `Error: ${e}`
		)
		assertEquals(nullResult._tag, "Right")
		assertEquals((nullResult as any).right, null)
	})

	await t.step("can wrap unsafe array access", () => {
		const safeAccess = <T>(arr: Array<T>, index: number) =>
			tryCatch(
				() => {
					if (index < 0 || index >= arr.length) {
						throw new Error(`Index ${index} out of bounds`)
					}
					return arr[index]
				},
				(e) => String(e)
			)

		const arr = [1, 2, 3]
		const validAccess = safeAccess(arr, 1)
		assertEquals(validAccess._tag, "Right")
		assertEquals((validAccess as any).right, 2)

		const invalidAccess = safeAccess(arr, 10)
		assertEquals(invalidAccess._tag, "Left")
		assertEquals((invalidAccess as any).left, "Error: Index 10 out of bounds")
	})

	await t.step("preserves thrown error details", () => {
		const error = new Error("Custom error")
		const result = tryCatch(
			() => { throw error },
			(e) => e
		)
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, error)
	})
})