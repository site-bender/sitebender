import { assertEquals } from "@std/assert"

import left from "../left/index.ts"
import right from "../right/index.ts"
import either from "./index.ts"

Deno.test("either", async (t) => {
	await t.step("handles Left value with left handler", () => {
		const leftHandler = function handleLeft(e: string): number {
			return e.length
		}

		const rightHandler = function handleRight(a: number): number {
			return a * 2
		}

		const result = either<string, number, number>(leftHandler)(rightHandler)(
			left("error"),
		)

		assertEquals(result, 5)
	})

	await t.step("handles Right value with right handler", () => {
		const leftHandler = function handleLeft(e: string): number {
			return e.length
		}

		const rightHandler = function handleRight(a: number): number {
			return a * 2
		}

		const result = either<string, number, number>(leftHandler)(rightHandler)(
			right(10),
		)

		assertEquals(result, 20)
	})

	await t.step("transforms Left to different type", () => {
		const leftHandler = function handleLeft(e: number): string {
			return `Error: ${e}`
		}

		const rightHandler = function handleRight(a: string): string {
			return `Success: ${a}`
		}

		const result = either<number, string, string>(leftHandler)(rightHandler)(
			left(404),
		)

		assertEquals(result, "Error: 404")
	})

	await t.step("transforms Right to different type", () => {
		const leftHandler = function handleLeft(e: number): string {
			return `Error: ${e}`
		}

		const rightHandler = function handleRight(a: string): string {
			return `Success: ${a}`
		}

		const result = either<number, string, string>(leftHandler)(rightHandler)(
			right("data"),
		)

		assertEquals(result, "Success: data")
	})

	await t.step("supports currying", () => {
		const leftHandler = function handleLeft(_e: string): boolean {
			return false
		}

		const rightHandler = function handleRight(a: number): boolean {
			return a > 0
		}

		const eitherWithHandlers = either<string, number, boolean>(leftHandler)(
			rightHandler,
		)

		assertEquals(eitherWithHandlers(left("error")), false)
		assertEquals(eitherWithHandlers(right(5)), true)
		assertEquals(eitherWithHandlers(right(-3)), false)
	})

	await t.step("handles complex Left types", () => {
		type ValidationError = {
			readonly field: string
			readonly message: string
		}

		const leftHandler = function handleLeft(e: ValidationError): string {
			return `${e.field}: ${e.message}`
		}

		const rightHandler = function handleRight(a: number): string {
			return `Valid: ${a}`
		}

		const result = either<ValidationError, number, string>(leftHandler)(
			rightHandler,
		)(left({ field: "age", message: "must be positive" }))

		assertEquals(result, "age: must be positive")
	})

	await t.step("handles complex Right types", () => {
		type User = {
			readonly name: string
			readonly age: number
		}

		const leftHandler = function handleLeft(e: string): string {
			return `Error: ${e}`
		}

		const rightHandler = function handleRight(u: User): string {
			return `${u.name} is ${u.age}`
		}

		const result = either<string, User, string>(leftHandler)(rightHandler)(
			right({ name: "Alice", age: 30 }),
		)

		assertEquals(result, "Alice is 30")
	})

	await t.step("both handlers return same result type", () => {
		const leftHandler = function handleLeft(_e: string): number {
			return 0
		}

		const rightHandler = function handleRight(a: number): number {
			return a
		}

		const eitherValue = either<string, number, number>(leftHandler)(
			rightHandler,
		)

		assertEquals(eitherValue(left("error")), 0)
		assertEquals(eitherValue(right(42)), 42)
	})
})
