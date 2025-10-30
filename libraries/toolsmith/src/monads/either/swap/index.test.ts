import { assertEquals } from "@std/assert"

import left from "../left/index.ts"
import right from "../right/index.ts"
import swap from "./index.ts"

Deno.test("swap", async (t) => {
	await t.step("converts Left to Right", () => {
		const original = left<string, number>("error")
		const result = swap(original)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, "error")
		}
	})

	await t.step("converts Right to Left", () => {
		const original = right<number, string>(42)
		const result = swap(original)

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left, 42)
		}
	})

	await t.step("swapping twice returns original", () => {
		const original = left<string, number>("error")
		const swapped = swap(original)
		const swappedAgain = swap(swapped)

		assertEquals(swappedAgain._tag, "Left")
		if (swappedAgain._tag === "Left") {
			assertEquals(swappedAgain.left, "error")
		}
	})

	await t.step("preserves value when swapping Left", () => {
		const value = "test error"
		const original = left<string, number>(value)
		const result = swap(original)

		if (result._tag === "Right") {
			assertEquals(result.right, value)
		}
	})

	await t.step("preserves value when swapping Right", () => {
		const value = 123
		const original = right<number, string>(value)
		const result = swap(original)

		if (result._tag === "Left") {
			assertEquals(result.left, value)
		}
	})

	await t.step("handles complex Left types", () => {
		type ErrorDetails = {
			readonly code: number
			readonly message: string
		}

		const error: ErrorDetails = {
			code: 404,
			message: "Not found",
		}

		const original = left<ErrorDetails, string>(error)
		const result = swap(original)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right.code, 404)
			assertEquals(result.right.message, "Not found")
		}
	})

	await t.step("handles complex Right types", () => {
		type User = {
			readonly name: string
			readonly age: number
		}

		const user: User = {
			name: "Alice",
			age: 30,
		}

		const original = right<User, string>(user)
		const result = swap(original)

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left.name, "Alice")
			assertEquals(result.left.age, 30)
		}
	})

	await t.step("swaps type parameters correctly", () => {
		const original = left<string, number>("error")
		const result = swap(original)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(typeof result.right, "string")
		}
	})

	await t.step("handles null in Left", () => {
		const original = left<null, number>(null)
		const result = swap(original)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, null)
		}
	})

	await t.step("handles undefined in Right", () => {
		const original = right<undefined, string>(undefined)
		const result = swap(original)

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left, undefined)
		}
	})
})
