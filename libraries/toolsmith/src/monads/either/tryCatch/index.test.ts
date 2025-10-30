import { assertEquals } from "@std/assert"

import tryCatch from "./index.ts"

Deno.test("tryCatch", async (t) => {
	await t.step("returns Right when function succeeds", () => {
		const safeFn = tryCatch(function computeValue() {
			return 42
		})

		const result = safeFn(function handleError(_error: unknown): string {
			return "error"
		})

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, 42)
		}
	})

	await t.step("returns Left when function throws", () => {
		const safeFn = tryCatch(function throwError(): number {
			throw new Error("Something went wrong")
		})

		const result = safeFn(function handleError(error: unknown): string {
			return error instanceof Error ? error.message : "unknown error"
		})

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left, "Something went wrong")
		}
	})

	await t.step("passes thrown error to error handler", () => {
		const safeFn = tryCatch(function throwCustom(): number {
			throw new Error("Custom error")
		})

		const result = safeFn(function handleError(error: unknown): string {
			return error instanceof Error ? `Caught: ${error.message}` : "unknown"
		})

		if (result._tag === "Left") {
			assertEquals(result.left, "Caught: Custom error")
		}
	})

	await t.step("supports currying", () => {
		const parseJSON = tryCatch(function parse() {
			return JSON.parse('{"key": "value"}')
		})

		const withErrorHandler = parseJSON(function handleError(_error: unknown) {
			return { error: "parse failed" }
		})

		assertEquals(withErrorHandler._tag, "Right")
	})

	await t.step("handles thrown strings", () => {
		const safeFn = tryCatch(function throwString(): number {
			// [EXCEPTION] Approved exception ONLY in test files to test tryCatch behavior with non-Error throws
			// deno-lint-ignore no-throw-literal
			throw "string error"
		})

		const result = safeFn(function handleError(error: unknown): string {
			return typeof error === "string" ? error : "not a string"
		})

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left, "string error")
		}
	})

	await t.step("handles thrown objects", () => {
		const safeFn = tryCatch(function throwObject(): number {
			throw { code: 404, message: "Not found" }
		})

		const result = safeFn(function handleError(error: unknown) {
			return error as { code: number; message: string }
		})

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left.code, 404)
			assertEquals(result.left.message, "Not found")
		}
	})

	await t.step("returns Right with complex return types", () => {
		type User = {
			readonly name: string
			readonly age: number
		}

		const safeFn = tryCatch(function getUser(): User {
			return { name: "Alice", age: 30 }
		})

		const result = safeFn(function handleError(_error: unknown): string {
			return "error"
		})

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right.name, "Alice")
			assertEquals(result.right.age, 30)
		}
	})

	await t.step("error handler can transform error type", () => {
		const safeFn = tryCatch(function mayThrow(): number {
			throw new Error("Error occurred")
		})

		const result = safeFn(function handleError(_error: unknown): number {
			return 999
		})

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left, 999)
		}
	})

	await t.step("handles synchronous operations", () => {
		const safeFn = tryCatch(function compute() {
			const a = 10
			const b = 20
			return a + b
		})

		const result = safeFn(function handleError(_error: unknown): string {
			return "computation failed"
		})

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, 30)
		}
	})

	await t.step("handles null return values", () => {
		const safeFn = tryCatch(function returnNull() {
			return null
		})

		const result = safeFn(function handleError(_error: unknown): string {
			return "error"
		})

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, null)
		}
	})
})
