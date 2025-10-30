import { assertEquals } from "@std/assert"

import left from "../left/index.ts"
import right from "../right/index.ts"
import fromNullable from "./index.ts"

Deno.test("fromNullable", async (t) => {
	await t.step("converts null to Left with error", () => {
		const result = fromNullable<string, number>("value was null")(null)

		assertEquals(result, left("value was null"))
	})

	await t.step("converts undefined to Left with error", () => {
		const result = fromNullable<string, number>("value was undefined")(
			undefined,
		)

		assertEquals(result, left("value was undefined"))
	})

	await t.step("converts non-nullish value to Right", () => {
		const result = fromNullable<string, number>("error")(42)

		assertEquals(result, right(42))
	})

	await t.step("handles zero as Right", () => {
		const result = fromNullable<string, number>("error")(0)

		assertEquals(result, right(0))
	})

	await t.step("handles empty string as Right", () => {
		const result = fromNullable<string, string>("error")("")

		assertEquals(result, right(""))
	})

	await t.step("handles false as Right", () => {
		const result = fromNullable<string, boolean>("error")(false)

		assertEquals(result, right(false))
	})

	await t.step("supports currying", () => {
		const toEitherWithError = fromNullable<string, number>("no value")

		assertEquals(toEitherWithError(null), left("no value"))
		assertEquals(toEitherWithError(undefined), left("no value"))
		assertEquals(toEitherWithError(42), right(42))
	})

	await t.step("handles complex error types", () => {
		type ErrorDetails = {
			readonly code: number
			readonly message: string
		}

		const error: ErrorDetails = {
			code: 404,
			message: "Not found",
		}

		const result = fromNullable<ErrorDetails, string>(error)(null)

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left.code, 404)
			assertEquals(result.left.message, "Not found")
		}
	})

	await t.step("handles complex value types", () => {
		type User = {
			readonly name: string
			readonly age: number
		}

		const user: User = {
			name: "Alice",
			age: 30,
		}

		const result = fromNullable<string, User>("no user")(user)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right.name, "Alice")
			assertEquals(result.right.age, 30)
		}
	})

	await t.step("distinguishes between null and undefined", () => {
		const checkNull = fromNullable<string, number>("was null")
		const checkUndefined = fromNullable<string, number>("was undefined")

		const nullResult = checkNull(null)
		const undefinedResult = checkUndefined(undefined)

		assertEquals(nullResult, left("was null"))
		assertEquals(undefinedResult, left("was undefined"))
	})
})
